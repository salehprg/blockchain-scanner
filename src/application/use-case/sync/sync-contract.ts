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
    metadataSyncer: NFTMetadataSyncer
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
        await this.scanWindow(contractId, contractAddress, contractType, chainId, from, to);
        cursor = to;

      } catch (err) {
        const msg = String((err as Error)?.message ?? err);
        if (/block range|too many|range|timeout|429|exceeded/i.test(msg)) {
          // halve window (simple backoff): split and keep progress
          const mid = from + (to - from) / 2n;
          await this.scanWindow(contractId, contractAddress, contractType, chainId, from, mid);
          await this.scanWindow(contractId, contractAddress, contractType, chainId, mid + 1n, to);

          cursor = to;

        } else {
          console.warn(`[sync] window ${from}-${to} failed: ${msg}`);
          // brief pause to avoid hot loop
          await new Promise(r => setTimeout(r, 2_000));
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
    to: bigint
  ) {

    if (to < from) return;

    const logs = await this.logReader.getTransferLogs({
      chainId, contractType: contractType as any, contractAddress, fromBlock: from, toBlock: to
    });
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

      for (const log of logs) {
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

      await this.contractRepo.update({
        id: contractId,
        contractAddress,
        contractType,
        chainId,
        lastSyncBlock: to.toString(),
        lastSyncTime: new Date()
      } as any);
    } catch (e) {
      throw e;
    }
  }
}
