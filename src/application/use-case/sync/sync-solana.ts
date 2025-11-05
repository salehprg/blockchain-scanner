import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { ISolanaReader } from "@/domain/ports/solana-reader";
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
    let before: string | undefined = undefined;
    let newestSlot = params.lastSlot;
    const BATCH = 20; // Solana limit upper-bound is 1000

    // Use EclipseScan activity API for Eclipse chain
    if (params.chainId === 17172) {
      while (true) {
        const activities = await this.solanaReader.getAddressActivities(params.chainId, params.programAddress, { pageSize: 40, before });
        if (activities.length === 0) break;

        // process oldest to newest for order within page
        const orderedActs = [...activities].reverse();

        for (const a of orderedActs) {
          const slotBig = BigInt(a.slot);
          if (slotBig <= params.lastSlot) {
            continue;
          }

          // Persist a generic log entry for the tx
          await this.logRecorder.recordBatch({
            contractId: params.contractId,
            chainId: params.chainId,
            nftContractAddress: params.programAddress as any,
            logs: [
              {
                transactionHash: a.signature,
                logIndex: 0,
                blockNumber: BigInt(a.slot),
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
            a.activityType === "ACTIVITY_SPL_TRANSFER" &&
            (a.tokenDecimals ?? -1) === 0 &&
            (a.amount ?? 0) === 1 &&
            a.tokenAddress &&
            a.fromAddress &&
            a.toAddress
          ) {
            await this.metadataSyncer.syncSolanaNFT({
              chainId: params.chainId,
              contractId: params.contractId,
              programAddress: params.programAddress,
              mint: a.tokenAddress
            });

            await this.ownerUpdater.applyTransfer({
              contractId: params.contractId,
              transactionSignature: a.signature,
              programAddress: params.programAddress,
              from: a.fromAddress,
              to: a.toAddress,
              mint: a.tokenAddress
            });

            await this.logRecorder.recordBatch({
              contractId: params.contractId,
              chainId: params.chainId,
              nftContractAddress: params.programAddress as any,
              logs: [
                {
                  transactionHash: a.signature,
                  logIndex: 1,
                  blockNumber: BigInt(a.slot),
                  type: "SOLANA.NFTTransfer",
                  from: a.fromAddress as any,
                  to: a.toAddress as any,
                  operator: null,
                  tokenId: a.tokenAddress!,
                  value: BigInt(a.amount ?? 1)
                }
              ]
            });
          }

          newestSlot = slotBig > newestSlot ? slotBig : newestSlot;
        }

        // paginate and persist last scanned block
        before = activities[activities.length - 1]?.signature;
        const lastBlock = activities[activities.length - 1]?.slot;

        await this.contractRepo.update({
          id: params.contractId,
          contractAddress: params.programAddress as any,
          contractType: "SOLANA" as any,
          chainId: params.chainId,
          lastSyncBlock: lastBlock.toString(),
          lastSyncTime: new Date()
        } as any);

        if ((activities[activities.length - 1]?.slot ?? 0) <= Number(params.lastSlot)) break;
      }

      return;
    }

    while (true) {
      const sigs = await this.solanaReader.getSignaturesForAddress(params.chainId, params.programAddress, { limit: BATCH, before });
      if (sigs.length === 0) break;

      // process from oldest to newest within the page to maintain order
      const ordered = [...sigs].reverse();

      for (const s of ordered) {
        const slotBig = BigInt(s.slot);
        if (slotBig <= params.lastSlot) {
          continue;
        }

        const tx = await this.solanaReader.getTransaction(params.chainId, s.signature);
        if (!tx) {
          newestSlot = slotBig > newestSlot ? slotBig : newestSlot;
          continue;
        }

        // Persist a generic log entry for the tx
        await this.logRecorder.recordBatch({
          contractId: params.contractId,
          chainId: params.chainId,
          nftContractAddress: params.programAddress as any,
          logs: [
            {
              transactionHash: tx.signature,
              logIndex: 0,
              blockNumber: BigInt(tx.slot),
              type: "SOLANA.Log",
              from: null,
              to: null,
              operator: null,
              tokenId: null,
              value: null
            }
          ]
        });

        // Attempt to derive NFT transfers from token balance changes
        const preByMint = new Map<string, { owner: string; amount: string; decimals: number }>();
        for (const b of tx.preTokenBalances) {
          if (b.amount == '1')
            preByMint.set(b.mint, { owner: b.owner, amount: b.amount, decimals: b.decimals });
        }
        const postByMint = new Map<string, { owner: string; amount: string; decimals: number }>();
        for (const b of tx.postTokenBalances) {
          if (b.amount == '1')
            postByMint.set(b.mint, { owner: b.owner, amount: b.amount, decimals: b.decimals });
        }

        for (const [mint, post] of postByMint) {
          const pre = preByMint.get(mint);
          // Heuristic: NFT transfer if decimals==0 and amount at new owner is "1", and pre existed with different owner having "1".
          if (post.decimals === 0 && post.amount === "1") {
            const preOwner = pre?.owner;
            const preAmt = pre?.amount ?? "0";
            if (preOwner && preOwner !== post.owner && preAmt === "1") {
              // ensure NFT exists with metadata before updating owner
              await this.metadataSyncer.syncSolanaNFT({
                chainId: params.chainId,
                contractId: params.contractId,
                programAddress: params.programAddress,
                mint
              });

              await this.ownerUpdater.applyTransfer({
                contractId: params.contractId,
                transactionSignature: tx.signature,
                programAddress: params.programAddress,
                from: preOwner,
                to: post.owner,
                mint
              });
              // Persist a specific NFTTransfer log for traceability
              await this.logRecorder.recordBatch({
                contractId: params.contractId,
                chainId: params.chainId,
                nftContractAddress: params.programAddress as any,
                logs: [
                  {
                    transactionHash: tx.signature,
                    logIndex: 1,
                    blockNumber: BigInt(tx.slot),
                    type: "SOLANA.NFTTransfer",
                    from: preOwner as any,
                    to: post.owner as any,
                    operator: null,
                    tokenId: mint,
                    value: BigInt(post.amount)
                  }
                ]
              });
            }
          }
        }

        newestSlot = slotBig > newestSlot ? slotBig : newestSlot;
      }

      // paginate
      before = sigs[sigs.length - 1]?.signature;
      const lastBlock = sigs[sigs.length - 1]?.slot

      await this.contractRepo.update({
        id: params.contractId,
        contractAddress: params.programAddress as any,
        contractType: "SOLANA" as any,
        chainId: params.chainId,
        lastSyncBlock: lastBlock.toString(),
        lastSyncTime: new Date()
      })

      // early exit when we have scanned past lastSlot in current page and there are no newer signatures beyond
      if ((sigs[sigs.length - 1]?.slot ?? 0) <= Number(params.lastSlot)) break;
    }
  }
}


