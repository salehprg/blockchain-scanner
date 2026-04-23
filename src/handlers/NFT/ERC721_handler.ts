import { ERC721_ABI } from "@/application/blockchain-abis/ERC721";
import { ContractLogRecorder } from "@/application/services/contract-log-recorder";
import { AdapterRegistery } from "@/chainAdapters/AdapterRegistery";
import { BaseEVMAdapter } from "@/chainAdapters/EVM/BaseEVMAdapter";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { NFT } from "@/domain/entities/nft";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { INFTRepository } from "@/domain/repository/nft-repo";
import { ZERO_ADDRESS } from "@/infrastructure/blockchain/evm-events";
import { randomUUID } from "crypto";
import { Address, getAddress } from "viem";
import { BaseHandler } from "../BaseHandler";
import { AppContainer } from "@/main/container";
import { ChestBuyV2_ABI } from "@/application/blockchain-abis/ChestBuyV2";

export class ERC721_Handler extends BaseHandler {
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

    private isZero(addr: string) {
        return addr.toLowerCase() === ZERO_ADDRESS.toLowerCase();
    }

    private normalizeTokenUri(uri: string, tokenId: string): string {
        // ERC1155 may have {id} placeholder which should be hex-32 lowercased
        if (uri.includes("{id}")) {
            const idHex = BigInt(tokenId).toString(16).padStart(64, "0");
            uri = uri.replace("{id}", idHex);
        }
        if (uri.startsWith("ipfs://")) {
            return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        }
        return uri;
    }

    async applyTransfer721ingle(params: {
        contractId: string;
        transactionHash: string;
        nftContractAddress: Address;
        from: Address;
        to: Address;
        tokenId: bigint;
    }): Promise<void> {
        const tokenIdStr = params.tokenId.toString();
        const to = getAddress(params.to);
        const from = getAddress(params.from);

        if (this.isZero(to)) {
            // burn
            const rec = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.nftContractAddress, tokenId: tokenIdStr });
            if (rec.length != 0) {
                await this.ownerRepo.delete(rec[0].id);
            }
            else
                this.ownerRepo.update(rec[0]);

            return;
        }

        // remove from old owner (if any)
        if (!this.isZero(from)) {
            const prev = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.nftContractAddress, tokenId: tokenIdStr });

            if (prev.length != 0) {
                await this.ownerRepo.delete(prev[0].id);
            }
        }

        // add to new owner
        const existing = (await this.ownerRepo.filterOwners({ ownerAddress: to, contractAddress: params.nftContractAddress, tokenId: tokenIdStr }))[0];
        if (existing) {
            existing.count = 1n;
            existing.lastTransactionHash = params.transactionHash;

            await this.ownerRepo.update(existing);
        } else {
            await this.ownerRepo.create(new NFTOwner(
                crypto.randomUUID(),
                params.contractId,
                to,
                params.nftContractAddress,
                tokenIdStr,
                1n,
                params.transactionHash,
                new Date()
            ));
        }
    }

    private async sync721NFT(contractEntity: BlockchainContract) {
        const evm_adapter = this.adapterRegistry.Get(contractEntity.chainId) as BaseEVMAdapter;

        const contractabi = contractEntity.contractType == "CHEST_ERC721" ? ChestBuyV2_ABI : ERC721_ABI;

        const ids: string[] = [];
        if (contractEntity.contractType == "CHEST_ERC721") {
            const nextId = await evm_adapter.readContract<bigint>(contractEntity.contractAddress as Address, contractabi, "nextTokenIdToMint");
            for (let i = 0n; i < nextId; i++) ids.push(i.toString());
        }
        else {
            const nextId = await evm_adapter.readContract<bigint>(contractEntity.contractAddress as Address, contractabi, "totalSupply");
            for (let i = 1n; i < nextId; i++) ids.push(i.toString());
        }

        const existing = await this.nftRepo.filterNFTs({ contractAddress: contractEntity.contractAddress });
        const toUpsert: NFT[] = [];

        for (const tokenId of ids) {
            var exist_token = existing.find(x => x.tokenId == tokenId)
            if (exist_token && exist_token.metadataUpdated) {
                continue
            }

            const uri = await evm_adapter.readContract<string>(contractEntity.contractAddress as Address, contractabi as any, "tokenURI", [BigInt(tokenId)]);
            const tokenUri = this.normalizeTokenUri(uri, tokenId);
            const tmp_nft = new NFT(
                randomUUID(),
                contractEntity.id,
                contractEntity.contractAddress,
                tokenId,
                tokenUri,
                false,
                null
            )

            exist_token = existing.find(x => x.tokenId == tokenId)

            if (exist_token && !exist_token.metadataUpdated) {
                tmp_nft.id = exist_token.id
                toUpsert.push(tmp_nft);
            }
            else if (!exist_token) {
                toUpsert.push(tmp_nft);
            }
        }

        for (const nft of toUpsert) {
            if (!nft) continue;

            try {
                let meta = {} as any
                if (nft.tokenUri) {
                    const res = await fetch(nft.tokenUri);
                    if (!res.ok) throw new Error(`metadata fetch failed ${res.status}`);
                    meta = await res.json();
                }

                nft.name = meta.name ?? null;
                nft.description = meta.description ?? null;
                nft.image = meta.image ?? null;
                nft.externalUrl = meta.external_url ?? null;
                nft.attributes = Array.isArray(meta.attributes) ? meta.attributes : null
                nft.lastMetadataSyncTime = new Date()
                nft.metadataUpdated = true
                nft.raw = meta

                await this.nftRepo.upsert(nft);
            }
            catch { }
        }
    }

    async scanAndRecord(contractEntity: BlockchainContract) {
        const evm_adapter = this.adapterRegistry.Get(contractEntity.chainId) as BaseEVMAdapter;

        const result = await evm_adapter.getERC721TransferLogs(contractEntity.contractAddress as `0x${string}`, BigInt(contractEntity.lastSyncBlock ?? "0"))

        const con_logs = await this.logRecorder.recordBatch({
            contractId: contractEntity.id,
            chainId: contractEntity.chainId,
            nftContractAddress: contractEntity.contractAddress as Address,
            logs: result.logs.map(l => {
                return {
                    transactionHash: l.transactionHash,
                    logIndex: l.logIndex,
                    blockNumber: l.blockNumber,
                    type: "ERC721.Transfer" as const,
                    from: l.args?.from ?? null,
                    to: l.args?.to ?? null,
                    operator: null,
                    tokenId: l.args?.tokenId != null ? l.args.tokenId.toString() : null,
                    value: null,
                    processed: false,
                    args: {}
                };
            })
        }); 

        await super.updateLastSync(contractEntity, result.nextLastBlockNumber)

        return con_logs
    }

    private async syncOwnerShips(contractEntity: BlockchainContract) {
        var logs = await this.logRecorder.getLogs(contractEntity.id, "ERC721.Transfer", false)

        const uniqueTokenIds = new Set<string>();
        const mintedTokenIds = new Set<string>();

        for (const l of logs) {
            if (l.tokenId != null) {
                uniqueTokenIds.add(l.tokenId)

                if (l.fromAddress?.toLowerCase() === ZERO_ADDRESS)
                    mintedTokenIds.add(l.tokenId.toString());
            }
        }

        const existingTokenIdSet = new Set<string>();

        for (const tid of uniqueTokenIds) {
            const found = await this.nftRepo.filterNFTs({ contractAddress: contractEntity.contractAddress, tokenId: tid }, { limit: 1 });
            if (found.length > 0) {
                existingTokenIdSet.add(tid);
            } else if (mintedTokenIds.has(tid)) {
                // Create missing NFT if it was minted in this batch
                await this.nftRepo.create(new NFT(
                    crypto.randomUUID(),
                    contractEntity.id,
                    contractEntity.contractAddress,
                    tid,
                    null,
                    false,
                    null
                ));
                existingTokenIdSet.add(tid);
            }
        }

        const logsToApply = logs.filter(l => {
            if (l.tokenId) {
                return existingTokenIdSet.has(l.tokenId.toString());
            }
            return false;
        });

        if (logsToApply.length > 0) {
            for (const log of logsToApply) {
                if (log.tokenId) {

                    await this.applyTransfer721ingle({
                        contractId: contractEntity.id,
                        nftContractAddress: contractEntity.contractAddress as Address,
                        from: log.fromAddress as Address,
                        to: log.toAddress as Address,
                        tokenId: BigInt(log.tokenId),
                        transactionHash: log.transactionHash,
                    });

                    log.processed = true
                    await this.logRecorder.updateLog(log)
                }
            }
        }

    }

    async proccessLog(contractEntity: BlockchainContract) {
        await this.syncOwnerShips(contractEntity)
        await this.sync721NFT(contractEntity)
    }
}