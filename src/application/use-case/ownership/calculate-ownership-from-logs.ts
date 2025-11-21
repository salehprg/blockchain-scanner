import { Address, getAddress } from "viem";
import { IContractLogRepository } from "@/domain/repository/contract-log-repo";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { ContractLog } from "@/domain/entities/contract-log";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { ZERO_ADDRESS } from "@/infrastructure/blockchain/evm-events";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";

function isZero(addr: string): boolean {
  return addr.toLowerCase() === ZERO_ADDRESS.toLowerCase();
}

/**
 * Calculates NFT ownership from contract logs without modifying the database.
 * This simulates the ownership state by processing logs chronologically.
 */
export class CalculateOwnershipFromLogs {
  constructor(
    private readonly contractRepo: IBlockchainContractRepository,
    private readonly logRepo: IContractLogRepository
  ) {}

  async execute(params: {
    contractAddress: string;
    startDate: Date;
    endDate: Date;
  }): Promise<NFTOwner[]> {
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
      return [];
    }

    // Sort logs by block number and log index to process in chronological order
    const sortedLogs = [...logs].sort((a, b) => {
      const blockDiff = BigInt(a.blockNumber) - BigInt(b.blockNumber);
      if (blockDiff !== 0n) return Number(blockDiff);
      return a.logIndex - b.logIndex;
    });

    // Track ownership state in memory
    // Key: `${contractAddress}:${tokenId}:${ownerAddress}`
    const ownershipMap = new Map<string, NFTOwner>();

    // Process each log to calculate ownership
    for (const log of sortedLogs) {
      if (!log.fromAddress || !log.toAddress || !log.tokenId) {
        continue; // Skip invalid logs
      }

      const from = getAddress(log.fromAddress as Address);
      const to = getAddress(log.toAddress as Address);
      const tokenId = log.tokenId;
      const key = `${log.contractAddress}:${tokenId}:${to}`;
      const fromKey = `${log.contractAddress}:${tokenId}:${from}`;

      if (contract.contractType === "ERC721" && log.eventType === "ERC721.Transfer") {
        // ERC721: Remove from old owner, add to new owner
        if (!isZero(from)) {
          const existingFrom = ownershipMap.get(fromKey);
          if (existingFrom && existingFrom.count > 0) {
            existingFrom.count = Math.max(0, existingFrom.count - 1);
            if (existingFrom.count === 0) {
              ownershipMap.delete(fromKey);
            } else {
              ownershipMap.set(fromKey, existingFrom);
            }
          }
        }

        if (!isZero(to)) {
          const existing = ownershipMap.get(key);
          if (existing) {
            existing.count = existing.count + 1;
            existing.lastTransactionHash = log.transactionHash;
            existing.lastSyncTime = log.loggedAt;
            ownershipMap.set(key, existing);
          } else {
            ownershipMap.set(
              key,
              new NFTOwner(
                "", // No ID needed for calculated ownership
                contract.id,
                to,
                log.contractAddress,
                tokenId,
                1,
                log.transactionHash,
                log.loggedAt
              )
            );
          }
        }
      } else if (
        contract.contractType === "ERC1155" &&
        log.eventType === "ERC1155.TransferSingle"
      ) {
        // ERC1155: Decrement from old owner, increment to new owner
        const value = log.value ? Number(log.value) : 0;
        if (value === 0) continue;

        if (!isZero(from)) {
          const existingFrom = ownershipMap.get(fromKey);
          if (existingFrom) {
            existingFrom.count = Math.max(0, existingFrom.count - value);
            if (existingFrom.count === 0) {
              ownershipMap.delete(fromKey);
            } else {
              ownershipMap.set(fromKey, existingFrom);
            }
          }
        }

        if (!isZero(to)) {
          const existing = ownershipMap.get(key);
          if (existing) {
            existing.count = existing.count + value;
            existing.lastTransactionHash = log.transactionHash;
            existing.lastSyncTime = log.loggedAt;
            ownershipMap.set(key, existing);
          } else {
            ownershipMap.set(
              key,
              new NFTOwner(
                "", // No ID needed for calculated ownership
                contract.id,
                to,
                log.contractAddress,
                tokenId,
                value,
                log.transactionHash,
                log.loggedAt
              )
            );
          }
        }
      }
    }

    // Return only ownerships with count > 0
    return Array.from(ownershipMap.values()).filter((owner) => owner.count > 0);
  }
}

