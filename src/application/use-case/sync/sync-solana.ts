import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { ISolanaReader, SolanaActivityDTO } from "@/domain/ports/solana-reader";
import { ContractLogRecorder } from "@/application/services/contract-log-recorder";
import { IContractLogRepository } from "@/domain/repository/contract-log-repo";
import { SolanaOwnershipUpdater } from "@/application/services/solana-ownership-updater";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { NFTMetadataSyncer } from "@/application/services/nft-metadata-syncer";

export class SyncSolanaPrograms {
  private readonly logRecorder: ContractLogRecorder;
  private readonly ownerUpdater: SolanaOwnershipUpdater;

  constructor(
    private readonly contractRepo: IBlockchainContractRepository,
    private readonly solanaReader: ISolanaReader,
    logRepo: IContractLogRepository,
    ownerRepo: INFTOwnerRepository,
    private readonly metadataSyncer: NFTMetadataSyncer
  ) {
    this.logRecorder = new ContractLogRecorder(logRepo);
    this.ownerUpdater = new SolanaOwnershipUpdater(ownerRepo);
  }

  async execute(): Promise<void> {
    const contracts = await this.contractRepo.findAll();
    const solanaContracts = contracts.filter(c => (c.contractType?.toUpperCase?.() ?? c.contractType) === "SOLANA");
    for (const c of solanaContracts) {
      try {
        await this.syncOne({
          contractId: c.id,
          programAddress: c.contractAddress,
          chainId: c.chainId,
          lastSlot: c.lastSyncBlock ? BigInt(c.lastSyncBlock) : 0n
        });
      } catch (e) {
        console.warn(`[solana-sync] program ${c.contractAddress} failed: ${(e as Error).message}`);
      }
    }
  }

  private async syncOne(params: { contractId: string; programAddress: string; chainId: number; lastSlot: bigint }): Promise<void> {
    let lastCheckSlot = params.lastSlot;

    // Use EclipseScan activity API for Eclipse chain
    if (params.chainId === 17172) {

      let activities: SolanaActivityDTO[] = []

      let newestBlock = lastCheckSlot
      let before: string | undefined = undefined;
      while (true) {
        const result = await this.solanaReader.getAddressActivities(params.chainId, params.programAddress, { pageSize: 500, before });
        activities = activities.concat(result.activities)

        if (result.firstSlotNumber > newestBlock)
          newestBlock = BigInt(result.firstSlotNumber);

        before = result.lastSignature ?? ""

        if (result.lastSlotNumber < lastCheckSlot) break;
      }

      // process oldest to newest for order within page
      const orderedActsOldestFirst = [...activities].reverse();

      for (const nftAction of orderedActsOldestFirst) {
        const currentSlot = BigInt(nftAction.slot);
        if (currentSlot <= lastCheckSlot) {
          continue;
        }

        // Persist a generic log entry for the tx
        await this.logRecorder.recordBatch({
          contractId: params.contractId,
          chainId: params.chainId,
          nftContractAddress: params.programAddress as any,
          logs: [
            {
              transactionHash: nftAction.signature,
              logIndex: 0,
              blockNumber: BigInt(nftAction.slot),
              type: "SOLANA.Log",
              from: null,
              to: null,
              operator: null,
              tokenId: null,
              value: null
            }
          ]
        });

        // NFT transfer detection from activity (decimals==0 and amount==1)
        if (
          nftAction.activityType === "ACTIVITY_SPL_TRANSFER" &&
          (nftAction.tokenDecimals ?? -1) === 0 &&
          (nftAction.amount ?? 0) === 1 &&
          nftAction.tokenAddress &&
          nftAction.fromAddress &&
          nftAction.toAddress
        ) {
          await this.metadataSyncer.syncSolanaNFT({
            chainId: params.chainId,
            contractId: params.contractId,
            programAddress: params.programAddress,
            mint: nftAction.tokenAddress
          });

          await this.ownerUpdater.applyTransfer({
            contractId: params.contractId,
            transactionSignature: nftAction.signature,
            programAddress: params.programAddress,
            from: nftAction.fromAddress,
            to: nftAction.toAddress,
            mint: nftAction.tokenAddress
          });

          await this.logRecorder.recordBatch({
            contractId: params.contractId,
            chainId: params.chainId,
            nftContractAddress: params.programAddress as any,
            logs: [
              {
                transactionHash: nftAction.signature,
                logIndex: 1,
                blockNumber: BigInt(nftAction.slot),
                type: "SOLANA.NFTTransfer",
                from: nftAction.fromAddress as any,
                to: nftAction.toAddress as any,
                operator: null,
                tokenId: nftAction.tokenAddress!,
                value: BigInt(nftAction.amount ?? 1)
              }
            ]
          });
        }
      }

      await this.contractRepo.update({
        id: params.contractId,
        contractAddress: params.programAddress as any,
        contractType: "SOLANA" as any,
        chainId: params.chainId,
        lastSyncBlock: newestBlock.toString(),
        lastSyncTime: new Date()
      } as any);
    }
  }
}


