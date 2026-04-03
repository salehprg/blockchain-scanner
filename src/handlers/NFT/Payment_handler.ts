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
import { Abi, AbiEvent, Address, formatUnits, getAbiItem, getAddress } from "viem";
import { BaseHandler } from "../BaseHandler";
import { AppContainer } from "@/main/container";
import { IBlockchainConfigRepository } from "@/domain/repository/blockchain-config-repo";
import payment_abi from "./ABIs/payment_abi.json"
import { serializeBigIntToJSON } from "@/infrastructure/db/utils/json-helper";
export class Payment_Handler extends BaseHandler {
    private readonly logRecorder: ContractLogRecorder;
    private readonly blockchainRepo: IBlockchainConfigRepository;

    constructor(readonly appContainer: AppContainer,
        readonly adapterRegistry: AdapterRegistery) {
        super(appContainer, adapterRegistry);

        this.blockchainRepo = appContainer.repos.configRepo
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

    async scanAndRecord(contractEntity: BlockchainContract) {
        const evm_adapter = this.adapterRegistry.Get(contractEntity.chainId) as BaseEVMAdapter;

        const PAYMENT_RECEIVED_EVENT = getAbiItem({
            abi: payment_abi as Abi,
            name: "PurchasedComplete",
        }) as AbiEvent;

        const logs = await evm_adapter.getLogs(contractEntity.contractAddress as `0x${string}`, PAYMENT_RECEIVED_EVENT, BigInt(contractEntity.lastSyncBlock ?? "0"), null, 1000n, 0n)

        const con_logs = await this.logRecorder.recordBatch({
            contractId: contractEntity.id,
            chainId: contractEntity.chainId,
            nftContractAddress: contractEntity.contractAddress as Address,
            logs: logs.map(l => {
                return {
                    transactionHash: l.blockHash,
                    logIndex: l.logIndex,
                    blockNumber: l.blockNumber,
                    type: "PAYMENT" as const,
                    from: l.args.buyer ,
                    to: null,
                    operator: null,
                    tokenId: null,
                    value: l.args.price,
                    processed: false,
                    args: serializeBigIntToJSON(l.args)
                };
            })
        });

        return con_logs
    }


    async proccessLog(contractEntity: BlockchainContract) {
        var logs = await this.logRecorder.getLogs(contractEntity.contractAddress, "PAYMENT", false)
        const evm_adapter = this.adapterRegistry.Get(contractEntity.chainId) as BaseEVMAdapter;

        for (const log of logs) {
            const currency = formatUnits(
                BigInt(log.value ?? 0n),
                evm_adapter.client.chain?.nativeCurrency.decimals ?? 18
            );
            console.log(`Received ${currency} ${evm_adapter.client.chain?.nativeCurrency.name} from ${log.fromAddress}`)

            log.processed = true
            await this.logRecorder.updateLog(log)
        }
    }
}