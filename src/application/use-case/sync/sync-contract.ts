import { BlockchainLogReader } from "@/infrastructure/blockchain/log-reader";
import { OwnershipUpdater } from "@/application/services/ownership-updater";
import { AppDataSource } from "@/infrastructure/db/data-source"; // for transactions
import { Address } from "viem";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { QueryRunner } from "typeorm";
import { IContractLogRepository } from "@/domain/repository/contract-log-repo";
import { ContractLogRecorder } from "@/application/services/contract-log-recorder";

const CHUNK = 1_000n;     // blocks per request (tune as needed)
const CONF = 5n;          // confirmations before considering final (tune)

export class SyncContracts {
  private readonly updater: OwnershipUpdater;
  private readonly logRecorder: ContractLogRecorder;

  constructor(
    private readonly contractRepo: IBlockchainContractRepository,
    ownerRepo: INFTOwnerRepository,
    private readonly logReader: BlockchainLogReader,
    logRepo: IContractLogRepository
  ) {
    this.updater = new OwnershipUpdater(ownerRepo);
    this.logRecorder = new ContractLogRecorder(logRepo);
  }

  async execute(): Promise<void> {
    const contracts = await this.contractRepo.findAll();
    for (const c of contracts) {
      try {
        await this.syncOne(c.id, c.contractAddress as Address, c.contractType, c.chainId, c.lastSyncBlock);
      } catch (e) {
        console.warn(`[sync] contract ${c.contractAddress} failed: ${(e as Error).message}`);
      }
    }
  }

  private async syncOne(
    contractId: string,
    contractAddress: Address,
    contractType: "ERC721" | "ERC1155" | "OTHER",
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

      const qr = AppDataSource.createQueryRunner();
      try {

        console.log(`Start Chain ${chainId} scan blocks ${from}-${to} Until: ${safeTo}`)
        await this.scanWindow(qr, contractId, contractAddress, contractType, chainId, from, to);
        cursor = to;

      } catch (err) {
        await qr.rollbackTransaction();

        const msg = String((err as Error)?.message ?? err);
        if (/block range|too many|range|timeout|429|exceeded/i.test(msg)) {
          // halve window (simple backoff): split and keep progress
          const mid = from + (to - from) / 2n;
          await this.scanWindow(qr, contractId, contractAddress, contractType, chainId, from, mid);
          await this.scanWindow(qr, contractId, contractAddress, contractType, chainId, mid + 1n, to);

          cursor = to;

        } else {
          console.warn(`[sync] window ${from}-${to} failed: ${msg}`);
          // brief pause to avoid hot loop
          await new Promise(r => setTimeout(r, 2_000));
        }
      } finally {
        await qr.release();
      }
    }
  }

  private async scanWindow(
    qr: QueryRunner,
    contractId: string,
    contractAddress: Address,
    contractType: "ERC721" | "ERC1155" | "OTHER",
    chainId: number,
    from: bigint,
    to: bigint
  ) {

    if (to < from) return;

    const logs = await this.logReader.getTransferLogs({
      chainId, contractType: contractType as any, contractAddress, fromBlock: from, toBlock: to
    });
    await qr.connect();
    await qr.startTransaction();

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
              tokenId: l.args.tokenId,
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
              tokenId: l.args.id,
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

      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
      throw e;
    } finally {
      await qr.release();
    }
  }
}
