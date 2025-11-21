import { BlockchainLogReader } from "@/infrastructure/blockchain/log-reader";
import { OwnershipUpdater } from "@/application/services/ownership-updater";
import { Address } from "viem";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { IContractLogRepository } from "@/domain/repository/contract-log-repo";
import { ContractLogRecorder } from "@/application/services/contract-log-recorder";
import { NFTMetadataSyncer } from "@/application/services/nft-metadata-syncer";
import { ContractType } from "@/domain/entities/blockchain-contract";
import { IContractLister } from "@/domain/ports/contract-lister";
import { Transfer1155SingleLog, Transfer721Log } from "@/infrastructure/blockchain/log-reader";
import { INFTRepository } from "@/domain/repository/nft-repo";
import { log } from "console";

const CHUNK = 1_000n;     // blocks per request (tune as needed)
const CONF = 5n;          // confirmations before considering final (tune)

export class SyncContracts {
  private readonly updater: OwnershipUpdater;
  private readonly logRecorder: ContractLogRecorder;
  private readonly metadataSyncer: NFTMetadataSyncer;

  constructor(
    private readonly contractLister: IContractLister,
    private readonly contractRepo: IBlockchainContractRepository,
    ownerRepo: INFTOwnerRepository,
    private readonly logReader: BlockchainLogReader,
    logRepo: IContractLogRepository,
    metadataSyncer: NFTMetadataSyncer,
    private readonly nftRepo: INFTRepository
  ) {
    this.updater = new OwnershipUpdater(ownerRepo);
    this.logRecorder = new ContractLogRecorder(logRepo);
    this.metadataSyncer = metadataSyncer;
  }

  async execute(): Promise<void> {
    const contracts = await this.contractLister.listContracts();
    const ethsContracts = contracts.filter(c => (c.contractType?.toUpperCase?.() ?? c.contractType) !== "SOLANA");
    for (const c of ethsContracts) {
      try {
        await this.syncOne(c.id, c.contractAddress as Address, c.contractType, c.chainId, c.lastSyncBlock);
        // After ownership sync, try metadata if ERC1155/721
        if (c.contractType !== "OTHER") {
          await this.metadataSyncer.syncContract({
            chainId: c.chainId,
            contractId: c.id,
            contractAddress: c.contractAddress as Address,
            contractType: c.contractType as any
          }).catch((e: any) => {
            console.log(e)
          });
        }
      } catch (e) {
        console.warn(`[sync] contract ${c.contractAddress} failed: ${(e as Error).message}`);
      }
    }
  }

  private async syncOne(
    contractId: string,
    contractAddress: Address,
    contractType: ContractType,
    chainId: number,
    lastSyncBlock: string | null
  ) {
    if (contractType === "OTHER") return; // skip unsupported

    const latest = await this.logReader.getLatestBlock(chainId);
    const safeTo = latest > CONF ? latest - CONF : 0n;

    let cursor = BigInt(lastSyncBlock ?? "0");
    if (safeTo <= cursor) return;

    while (cursor < safeTo) {
      const from = cursor + 1n;
      const to = from + CHUNK - 1n <= safeTo ? from + CHUNK - 1n : safeTo;

      try {

        console.log(`Start Chain ${chainId} scan blocks ${from}-${to} Until: ${safeTo}`)
        const resultTo = await this.scanWindow(contractId, contractAddress, contractType, chainId, from, to, safeTo);
        cursor = resultTo;

      } catch (err) {
        const msg = String((err as Error)?.message ?? err);
        if (/block range|too many|range|timeout|429|exceeded/i.test(msg)) {
          // halve window (simple backoff): split and keep progress
          const mid = from + (to - from) / 2n;
          const resultTo_Mid = await this.scanWindow(contractId, contractAddress, contractType, chainId, from, mid, safeTo);
          const resultTo = await this.scanWindow(contractId, contractAddress, contractType, chainId, resultTo_Mid + 1n, to, safeTo);

          cursor = resultTo;

        } else {
          console.warn(`[sync] window ${from}-${to} failed: ${msg}`);
          // brief pause to avoid hot loop
          await new Promise(r => setTimeout(r, 2_000));
          break;
        }
      }
    }
  }

  private async scanWindow(
    contractId: string,
    contractAddress: Address,
    contractType: ContractType,
    chainId: number,
    from: bigint,
    to: bigint,
    safeTo: bigint
  ): Promise<bigint> {

    if (to < from) return to;

    let usedFallback = false;
    let logs: (Transfer721Log | Transfer1155SingleLog)[] = [];
    try {
      logs = await this.logReader.getTransferLogs({
        chainId, contractType: contractType as any, contractAddress, fromBlock: from, toBlock: to
      });
    } catch (rpcErr: any) {

      if (chainId == 5031) {
        console.warn(`[sync] RPC getTransferLogs failed (${from}-${to}). Trying Somnia API fallback: ${rpcErr?.message ?? rpcErr}`);
        // Fallback: Somnia HTTP API (only for Somnia/known endpoint, primarily ERC721)
        try {
          logs = await this.fetchSomniaTransferLogsViaApi(contractAddress, from, contractType);
          usedFallback = true;
        } catch (apiErr: any) {
          console.warn(`[sync] Somnia API fallback failed: ${apiErr?.message ?? apiErr}`);
          throw apiErr;
        }
      }
      else {
        console.warn(`[sync] RPC getTransferLogs failed (${from}-${to}).`);
        throw rpcErr;
      }

    }
    try {
      // Persist raw logs batch first (best-effort, ignores duplicates)
      await this.logRecorder.recordBatch({
        contractId,
        chainId,
        nftContractAddress: contractAddress,
        logs: logs.map(l => {
          if (contractType === "ERC721" && "args" in l && "tokenId" in l.args) {
            return {
              transactionHash: l.blockHash,
              logIndex: l.logIndex,
              blockNumber: l.blockNumber,
              type: "ERC721.Transfer" as const,
              from: l.args.from,
              to: l.args.to,
              operator: null,
              tokenId: l.args.tokenId.toString(),
              value: null
            };
          }
          if (contractType === "ERC1155" && "args" in l && "id" in l.args) {
            return {
              transactionHash: l.blockHash,
              logIndex: l.logIndex,
              blockNumber: l.blockNumber,
              type: "ERC1155.TransferSingle" as const,
              from: l.args.from,
              to: l.args.to,
              operator: l.args.operator,
              tokenId: l.args.id.toString(),
              value: l.args.value
            };
          }
          return {
            transactionHash: l.blockHash,
            logIndex: l.logIndex,
            blockNumber: l.blockNumber,
            type: (contractType === "ERC721" ? "ERC721.Transfer" : "ERC1155.TransferSingle") as any,
            from: null,
            to: null,
            operator: null,
            tokenId: null,
            value: null
          };
        })
      });

      // Apply transfers ONLY for logs whose NFTs already exist in NFTs table
      const existingTokenIdSet = new Set<string>();
      if (contractType === "ERC721") {
        const uniqueTokenIds = Array.from(new Set(
          logs
            .filter((l): l is Transfer721Log => "args" in l && "tokenId" in l.args)
            .map(l => l.args.tokenId.toString())
        ));
        for (const tid of uniqueTokenIds) {
          const found = await this.nftRepo.filterNFTs({ contractAddress: contractAddress, tokenId: tid }, { limit: 1 });
          if (found.length > 0) existingTokenIdSet.add(tid);
        }
      } else if (contractType === "ERC1155") {
        const uniqueTokenIds = Array.from(new Set(
          logs
            .filter((l): l is Transfer1155SingleLog => "args" in l && "id" in l.args)
            .map(l => l.args.id.toString())
        ));
        for (const tid of uniqueTokenIds) {
          const found = await this.nftRepo.filterNFTs({ contractAddress: contractAddress, tokenId: tid }, { limit: 1 });
          if (found.length > 0) existingTokenIdSet.add(tid);
        }
      }

      const logsToApply = logs.filter(l => {
        if (contractType === "ERC721" && "args" in l && "tokenId" in l.args) {
          return existingTokenIdSet.has(l.args.tokenId.toString());
        }
        if (contractType === "ERC1155" && "args" in l && "id" in l.args) {
          return existingTokenIdSet.has(l.args.id.toString());
        }
        return false;
      });

      for (const log of logsToApply) {
        if (contractType === "ERC721" && "args" in log && "tokenId" in log.args) {
          await this.updater.applyTransfer721({
            contractId,
            nftContractAddress: contractAddress,
            from: log.args.from,
            to: log.args.to,
            tokenId: log.args.tokenId,
            transactionHash: log.blockHash
          });
        } else if (contractType === "ERC1155" && "args" in log && "id" in log.args) {
          await this.updater.applyTransfer1155Single({
            contractId,
            nftContractAddress: contractAddress,
            transactionHash: log.blockHash,
            from: log.args.from,
            to: log.args.to,
            id: log.args.id,
            value: log.args.value
          });
        }
      }

      // Update lastSyncBlock according to APPLIED logs only.
      // If none applied, fall back to "to" so we don't stall the cursor.
      let lastBlockToSave: bigint = to;
      if (logsToApply.length > 0) {
        let maxApplied = 0n;
        for (const l of logsToApply) {
          if (l.blockNumber > maxApplied) maxApplied = l.blockNumber;
        }
        lastBlockToSave = maxApplied;
      }

      if (usedFallback && logs.length == 0) {
        lastBlockToSave = safeTo
      }

      await this.contractRepo.update({
        id: contractId,
        contractAddress,
        contractType,
        chainId,
        lastSyncBlock: lastBlockToSave.toString(),
        lastSyncTime: new Date()
      } as any);

      return lastBlockToSave;

    } catch (e) {
      throw e;
    }
  }

  private async fetchSomniaTransferLogsViaApi(
    contractAddress: string,
    fromBlock: bigint,
    contractType: ContractType
  ): Promise<(Transfer721Log | Transfer1155SingleLog)[]> {
    // For now, we support ERC721 via this endpoint. Extend if Somnia exposes 1155 payloads.
    if (contractType !== "ERC721") {
      throw new Error(`Somnia API fallback currently supports ERC721 only (got ${contractType})`);
    }

    const baseUrl = `https://mainnet.somnia.w3us.site/api/v2/tokens/${contractAddress}/transfers`;

    const headers: Record<string, string> = {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "connection": "keep-alive",
      "dnt": "1",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
    };

    const sleep = async (ms: number) => new Promise(r => setTimeout(r, ms));
    const jitterMs = () => 5_000 + Math.floor(Math.random() * 5_000);

    let block_number: number | undefined = undefined;
    let index: number | undefined = undefined;
    const allItems: any[] = [];

    while (true) {
      const url = new URL(baseUrl);
      if (block_number != null) url.searchParams.set("block_number", String(block_number));
      if (index != null) url.searchParams.set("index", String(index));

      const resp = await fetch(url.toString(), { method: "GET", headers });
      if (!resp.ok) {
        throw new Error(`Somnia API HTTP ${resp.status} ${resp.statusText}`);
      }
      const body: any = await resp.json();
      const items: any[] = Array.isArray(body?.items) ? body.items : [];

      // Gather items; we'll filter by block range after pagination step.
      allItems.push(...items);

      // Stop if there is no pagination
      const next = body?.next_page_params;
      if (!next || next.block_number == null || next.index == null) {
        break;
      }

      // If the next page is already older than our fromBlock, we can break
      if (typeof next.block_number === "number" && BigInt(next.block_number) < fromBlock) {
        break;
      }

      // Apply required pacing (5s + random 1-5s)
      await sleep(jitterMs());

      block_number = next.block_number;
      index = next.index;
    }

    // Filter to our block window and map to internal DTOs
    const filtered = allItems.filter(i => {
      const bn = BigInt(i?.block_number ?? 0);
      return bn >= fromBlock && i?.token?.type === "ERC-721";
    });

    const mapped: Transfer721Log[] = filtered.map(i => {
      const txHash: string = i?.transaction_hash;
      const logIndex: number = Number(i?.log_index ?? -1);
      const bn: bigint = BigInt(i?.block_number ?? 0);
      const fromAddr: string = i?.from?.hash ?? "0x0000000000000000000000000000000000000000";
      const toAddr: string = i?.to?.hash ?? "0x0000000000000000000000000000000000000000";
      const tokenIdStr: string = i?.total?.token_id ?? i?.token_id ?? "0";
      const tokenId = BigInt(tokenIdStr);
      return {
        blockHash: txHash,
        logIndex,
        blockNumber: bn,
        args: {
          from: fromAddr as any,
          to: toAddr as any,
          tokenId
        }
      };
    });

    return mapped;
  }
}
