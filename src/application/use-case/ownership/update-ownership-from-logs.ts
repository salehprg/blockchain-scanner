import { Address } from "viem";
import { OwnershipUpdater } from "@/application/services/ownership-updater";
import { IContractLogRepository } from "@/domain/repository/contract-log-repo";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { ContractLog } from "@/domain/entities/contract-log";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";

export class UpdateOwnershipFromLogs {
  constructor(
    private readonly contractRepo: IBlockchainContractRepository,
    private readonly logRepo: IContractLogRepository,
    private readonly ownershipUpdater: OwnershipUpdater
  ) {}

  async execute(params: {
    contractAddress: string;
    startDate: Date;
    endDate: Date;
  }): Promise<{ processedLogs: number; updatedOwnerships: number }> {
    // Get contract information using filterContracts
    const contracts = await this.contractRepo.filterContracts({
      contractAddress: params.contractAddress,
    });
    const contract = contracts[0];
    if (!contract) {
      throw new Error(`Contract not found: ${params.contractAddress}`);
    }

    if (contract.contractType === "OTHER" || contract.contractType === "SOLANA") {
      throw new Error(`Unsupported contract type: ${contract.contractType}`);
    }

    // Fetch logs from database for the date range using contract logs repository
    const logs = await this.logRepo.filterLogs({
      contractAddress: params.contractAddress,
      fromDate: params.startDate,
      toDate: params.endDate,
    });

    if (logs.length === 0) {
      return { processedLogs: 0, updatedOwnerships: 0 };
    }

    // Sort logs by block number and log index to process in chronological order
    const sortedLogs = [...logs].sort((a, b) => {
      const blockDiff = BigInt(a.blockNumber) - BigInt(b.blockNumber);
      if (blockDiff !== 0n) return Number(blockDiff);
      return a.logIndex - b.logIndex;
    });

    const updatedCount = await this.processLogs(sortedLogs, contract);

    return {
      processedLogs: sortedLogs.length,
      updatedOwnerships: updatedCount,
    };
  }

  private async processLogs(
    sortedLogs: ContractLog[],
    contract: BlockchainContract
  ): Promise<number> {
    let updatedCount = 0;

    for (const log of sortedLogs) {
      if (!log.fromAddress || !log.toAddress || !log.tokenId) {
        continue; // Skip invalid logs
      }

      try {
        if (contract.contractType === "ERC721" && log.eventType === "ERC721.Transfer") {
          await this.processERC721Transfer(log, contract);
          updatedCount++;
        } else if (
          contract.contractType === "ERC1155" &&
          log.eventType === "ERC1155.TransferSingle"
        ) {
          const processed = await this.processERC1155Transfer(log, contract);
          if (processed) updatedCount++;
        }
      } catch (error) {
        console.warn(
          `Failed to process log ${log.transactionHash}:${log.logIndex}: ${(error as Error).message}`
        );
        // Continue processing other logs
      }
    }

    return updatedCount;
  }

  private async processERC721Transfer(
    log: ContractLog,
    contract: BlockchainContract
  ): Promise<void> {
    await this.ownershipUpdater.applyTransfer721({
      contractId: contract.id,
      nftContractAddress: log.contractAddress as Address,
      from: log.fromAddress as Address,
      to: log.toAddress as Address,
      tokenId: BigInt(log.tokenId!),
      transactionHash: log.transactionHash,
    });
  }

  private async processERC1155Transfer(
    log: ContractLog,
    contract: BlockchainContract
  ): Promise<boolean> {
    const value = log.value ? BigInt(log.value) : 0n;
    if (value <= 0n) return false;

    await this.ownershipUpdater.applyTransfer1155Single({
      contractId: contract.id,
      nftContractAddress: log.contractAddress as Address,
      from: log.fromAddress as Address,
      to: log.toAddress as Address,
      id: BigInt(log.tokenId!),
      value: value,
      transactionHash: log.transactionHash,
    });
    return true;
  }
}

