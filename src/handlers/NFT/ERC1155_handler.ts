import { ContractLogRecorder } from "@/application/services/contract-log-recorder";
import { BaseEVMAdapter } from "@/chainAdapters/EVM/BaseEVMAdapter";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { NFT } from "@/domain/entities/nft";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { INFTRepository } from "@/domain/repository/nft-repo";
import { ZERO_ADDRESS } from "@/infrastructure/blockchain/evm-events";
import { Address, getAddress } from "viem";
import { randomUUID } from "crypto";
import { ERC1155_ABI } from "@/application/blockchain-abis/ERC1155";
import { AdapterRegistery } from "@/chainAdapters/AdapterRegistery";
import { BaseHandler } from "../BaseHandler";
import { AppContainer } from "@/main/container";

export type Transfer1155SingleLog = {
    blockHash: string;
    logIndex: number;
    blockNumber: bigint;
    args: { operator: Address; from: Address; to: Address; id: bigint; value: bigint };
};

export class ERC1155_Handler extends BaseHandler {
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

    async applyTransfer1155Single(params: {
        contractId: string;
        nftContractAddress: string;
        transactionHash: string;
        from: Address;
        to: Address;
        id: bigint;
        value: bigint;
    }): Promise<void> {
        const tokenIdStr = params.id.toString();
        const amount = params.value;
        if (amount === 0n) return;

        // decrement from "from"
        if (!this.isZero(params.from)) {
            const from = getAddress(params.from);
            const prev = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.nftContractAddress, tokenId: tokenIdStr });

            if (prev.length != 0) {
                await this.ownerRepo.delete(prev[0].id);
            }
            else await this.ownerRepo.update(prev[0]);
        }

        // increment to "to"
        if (!this.isZero(params.to)) {
            const to = getAddress(params.to);
            const ex = (await this.ownerRepo.filterOwners({ ownerAddress: to, contractAddress: params.nftContractAddress, tokenId: tokenIdStr }))[0];
            if (ex) {
                ex.count = ex.count + amount;
                ex.lastTransactionHash = params.transactionHash
                await this.ownerRepo.update(ex);
            } else {
                await this.ownerRepo.create(new NFTOwner(
                    crypto.randomUUID(),
                    params.contractId,
                    to,
                    params.nftContractAddress,
                    tokenIdStr,
                    amount,
                    params.transactionHash,
                    new Date()
                ));
            }
        }
    }

    private async sync1155NFT(contractEntity: BlockchainContract) {
        const baseEVMAdapter = this.adapterRegistry.Get(contractEntity.chainId) as BaseEVMAdapter;

        const tokenIds = await baseEVMAdapter.getAllTokenIds(contractEntity.contractAddress as Address);
        const existing = await this.nftRepo.filterNFTs({ contractAddress: contractEntity.contractAddress });
        const toUpsert: NFT[] = [];

        for (const tokenId of tokenIds) {
            const uri = await baseEVMAdapter.readContract<string>(contractEntity.contractAddress as Address, ERC1155_ABI as any, "uri", [BigInt(tokenId)]);
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
            const exist_token = existing.find(x => x.tokenId == tokenId)

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

        const logs = await evm_adapter.getERC1155TransferLogs(contractEntity.contractAddress as `0x${string}`, BigInt(contractEntity.lastSyncBlock ?? "0"))

        const con_logs = await this.logRecorder.recordBatch({
            contractId: contractEntity.id,
            chainId: contractEntity.chainId,
            nftContractAddress: contractEntity.contractAddress as Address,
            logs: logs.map(l => {
                return {
                    transactionHash: l.blockHash,
                    logIndex: l.logIndex,
                    blockNumber: l.blockNumber,
                    type: "ERC1155.TransferSingle" as const,
                    from: l.args.from,
                    to: l.args.to,
                    operator: l.args.operator,
                    tokenId: l.args.id.toString(),
                    value: l.args.value,
                    processed: false
                };
            })
        });

        return con_logs
    }
    private async syncOwnerShips(contractEntity: BlockchainContract) {
        var logs = await this.logRecorder.getLogs(contractEntity.id, "ERC1155.TransferSingle", false)

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
            let maxApplied = 0n
            for (const log of logsToApply) {
                if (log.tokenId && log.value) {
                    if (BigInt(log.blockNumber) > maxApplied) maxApplied = BigInt(log.blockNumber);

                    await this.applyTransfer1155Single({
                        contractId: contractEntity.id,
                        nftContractAddress: contractEntity.contractAddress,
                        transactionHash: log.transactionHash,
                        from: log.fromAddress as Address,
                        to: log.toAddress as Address,
                        id: BigInt(log.tokenId),
                        value: BigInt(log.value)
                    });

                    log.processed = true
                    await this.logRecorder.updateLog(log)
                }
            }

            contractEntity.lastSyncTime = new Date()
            contractEntity.lastSyncBlock = maxApplied.toString()
            await this.contractRepo.update(contractEntity);
        }
    }

    public async proccessLog(contractEntity: BlockchainContract) {
        await this.syncOwnerShips(contractEntity)
        await this.sync1155NFT(contractEntity)
    }
}