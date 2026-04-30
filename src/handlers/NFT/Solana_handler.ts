import { ContractLogRecorder } from "@/application/services/contract-log-recorder";
import { AdapterRegistery } from "@/chainAdapters/AdapterRegistery";
import { SolanaAdapter } from "@/chainAdapters/Solana/SolanaAdapter";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { NFT } from "@/domain/entities/nft";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { INFTRepository } from "@/domain/repository/nft-repo";
import { AppContainer } from "@/main/container";
import { randomUUID } from "crypto";
import { Address } from "viem";
import { BaseHandler } from "../BaseHandler";
import { ContractLog } from "@/domain/entities/contract-log";

function isZero(addr: string) {
    return !addr || /^0x0+$/.test(addr) || addr === "11111111111111111111111111111111";
}

export class Solana_Handler extends BaseHandler {
    private readonly nftRepo: INFTRepository;
    private readonly ownerRepo: INFTOwnerRepository;
    private readonly contractRepo: IBlockchainContractRepository;
    private readonly logRecorder: ContractLogRecorder;

    constructor(readonly appContainer: AppContainer,
        readonly adapterRegistry: AdapterRegistery) {
        super(appContainer, adapterRegistry);

        this.nftRepo = appContainer.repos.nftRepo
        this.ownerRepo = appContainer.repos.ownerRepo
        this.contractRepo = appContainer.repos.contractRepo
        this.logRecorder = appContainer.services.logRecorder
    }

    private async applyTransfer(params: {
        contractId: string;
        transactionSignature: string;
        programAddress: string;
        from: string;
        to: string;
        mint: string; // tokenId equivalent for Solana
    }): Promise<void> {
        const tokenIdStr = params.mint;
        const to = params.to;
        const from = params.from;

        if (isZero(to)) {
            const rec = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.programAddress, tokenId: tokenIdStr });
            if (rec.length != 0) {
                await this.ownerRepo.delete(rec[0].id);
            }
            else if (rec[0]) {
                await this.ownerRepo.update(rec[0]);
            }
            return;
        }

        if (!isZero(from)) {
            const prev = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.programAddress, tokenId: tokenIdStr });
            if (prev.length != 0) {
                await this.ownerRepo.delete(prev[0].id);
            }
        }

        const existing = (await this.ownerRepo.filterOwners({ ownerAddress: to, contractAddress: params.programAddress, tokenId: tokenIdStr }))[0];
        if (existing) {
            existing.count = BigInt(existing.count) + 1n;
            existing.lastTransactionHash = params.transactionSignature;
            await this.ownerRepo.update(existing);
        } else {
            await this.ownerRepo.create(new NFTOwner(
                crypto.randomUUID(),
                params.contractId,
                to,
                params.programAddress,
                tokenIdStr,
                1n,
                params.transactionSignature,
                new Date()
            ));
        }
    }

    private async syncSolanaNFT(solanaAdapter: SolanaAdapter, contractId: string, programAddress: string, tokenId: string): Promise<void> {
        const addr = programAddress as Address;

        const existing = (await this.nftRepo.filterNFTs({ contractAddress: addr, tokenId }))[0];
        if (existing && existing.metadataUpdated) return;

        const tokenUri = await solanaAdapter.getMetadataUri(tokenId);

        if (!existing) {
            const nft = new NFT(
                randomUUID(),
                contractId,
                addr,
                tokenId,
                tokenUri ?? null,
                false,
                null
            );
            await this.nftRepo.upsert(nft);
        }

        try {
            let meta = {} as any;
            if (tokenUri) {
                const res = await fetch(tokenUri);
                if (!res.ok) throw new Error(`metadata fetch failed ${res.status}`);
                meta = await res.json();
            }

            const toUpdate = (await this.nftRepo.filterNFTs({ contractAddress: addr, tokenId }))[0];
            if (!toUpdate) return;

            toUpdate.name = meta.name ?? null;
            toUpdate.description = meta.description ?? null;
            toUpdate.image = meta.image ?? null;
            toUpdate.externalUrl = meta.external_url ?? null;
            toUpdate.attributes = Array.isArray(meta.attributes) ? meta.attributes : null;
            toUpdate.lastMetadataSyncTime = new Date();
            toUpdate.metadataUpdated = true;
            toUpdate.raw = meta;

            await this.nftRepo.upsert(toUpdate);
        } catch { }

    }

    async syncOwnerShip(contractEntity: BlockchainContract) {
        const solana_adapter = this.adapterRegistry.Get(contractEntity.chainId) as SolanaAdapter;

        var logs = await this.logRecorder.getLogs(contractEntity.contractAddress, "SOLANA.NFTTransfer", false)

        for (const log of logs) {
            if (log.tokenId) {
                await this.syncSolanaNFT(solana_adapter, contractEntity.id, contractEntity.contractAddress, log.tokenId);

                await this.applyTransfer({
                    contractId: contractEntity.id,
                    transactionSignature: log.transactionHash,
                    programAddress: contractEntity.contractAddress,
                    from: log.fromAddress as Address,
                    to: log.toAddress as Address,
                    mint: log.tokenId
                });

                log.processed = true
                await this.logRecorder.updateLog(log)
            }
        }

    }

    async scanAndRecord(contractEntity: BlockchainContract) {
        const solana_adapter = this.adapterRegistry.Get(contractEntity.chainId) as SolanaAdapter;

        const logs = await solana_adapter.GetAddressActivities(contractEntity.contractAddress, BigInt(contractEntity.lastSyncBlock ?? "0"))

        const orderedActsOldestFirst = [...logs].reverse();
        const lastSignature = logs[logs.length - 1];

        let result_logs: ContractLog[] = []
        for (const nftAction of orderedActsOldestFirst) {
            const currentSlot = BigInt(nftAction.slot);
            if (currentSlot <= lastSignature.slot) {
                continue;
            }

            // Persist a generic log entry for the tx
            const con_logs = await this.logRecorder.recordBatch({
                contractId: contractEntity.id,
                chainId: contractEntity.chainId,
                nftContractAddress: contractEntity.contractAddress as any,
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
                        value: null,
                        processed: true,
                        args: {}
                    }
                ]
            });

            result_logs = result_logs.concat(con_logs)

            // NFT transfer detection from activity (decimals==0 and amount==1)
            if (
                nftAction.activityType === "ACTIVITY_SPL_TRANSFER" &&
                (nftAction.tokenDecimals ?? -1) === 0 &&
                (nftAction.amount ?? 0) === 1 &&
                nftAction.tokenAddress &&
                nftAction.fromAddress &&
                nftAction.toAddress
            ) {
                await this.logRecorder.recordBatch({
                    contractId: contractEntity.id,
                    chainId: contractEntity.chainId,
                    nftContractAddress: contractEntity.contractAddress as any,
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
                            value: BigInt(nftAction.amount ?? 1),
                            processed: false,
                            args: {}
                        }
                    ]
                });
            }
        }

        await super.updateLastSync(contractEntity, BigInt(lastSignature.slot ?? contractEntity.lastSyncBlock ?? "0"))

        return result_logs
    }
    async proccessLog(contractEntity: BlockchainContract) {
        await this.syncOwnerShip(contractEntity)

    }


}