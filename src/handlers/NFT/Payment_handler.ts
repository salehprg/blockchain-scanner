import { ERC721_ABI } from "@/application/blockchain-abis/ERC721";
import { ContractLogRecorder } from "@/application/services/contract-log-recorder";
import { AdapterRegistery } from "@/chainAdapters/AdapterRegistery";
import { BaseEVMAdapter, GetLogsResult } from "@/chainAdapters/EVM/BaseEVMAdapter";
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
import { AdapterTransaction } from "@/chainAdapters/AdapterTransaction";
export class Payment_Handler extends BaseHandler {
    private readonly logRecorder: ContractLogRecorder;
    private readonly blockchainRepo: IBlockchainConfigRepository;

    constructor(readonly appContainer: AppContainer,
        readonly adapterRegistry: AdapterRegistery) {
        super(appContainer, adapterRegistry);

        this.blockchainRepo = appContainer.repos.configRepo
        this.logRecorder = appContainer.services.logRecorder
    }

    async scanAndRecord(contractEntity: BlockchainContract) {
        const evm_adapter = this.adapterRegistry.Get(contractEntity.chainId) as BaseEVMAdapter;

        const PAYMENT_RECEIVED_EVENT = getAbiItem({
            abi: payment_abi as Abi,
            name: "PurchasedComplete",
        }) as AbiEvent;

        var fromBlock = contractEntity.lastSyncBlock
        if (fromBlock == undefined || fromBlock == '0') {
            fromBlock = contractEntity.contractCreateBlockNumber ?? "0"
        }

        var nextBlock = 0n

        const toBlock = 288364832n
        // const toBlock = null
        const result = await evm_adapter.getLogs(contractEntity.contractAddress as `0x${string}`,
            PAYMENT_RECEIVED_EVENT, BigInt(fromBlock), toBlock, 1000n, 0n)

        const filteredlogs: AdapterTransaction[] = []

        result.logs.forEach((l, index) => {
            if (l.source == "rpc") {
                l.value = l.args.price
                filteredlogs.push(l)
            }

            if (l.source == "api") {
                if (l.eventName == "purchaseWithSignature" && l.args && l.args.decoded_input) {
                    const reqFuncParams = l.args.decoded_input.parameters.find((p: any) => p.name === "_req")?.value
                    l.args.buyer = reqFuncParams[0]
                    l.args.itemId = reqFuncParams[1]
                    l.args.itemType = reqFuncParams[2]
                    l.args.price = reqFuncParams[3]
                    l.args.currency = reqFuncParams[4]
                    l.args.validityStartTimestamp = reqFuncParams[5]
                    l.args.validityEndTimestamp = reqFuncParams[6]
                    l.args.uid = reqFuncParams[7]
                    filteredlogs.push(l)
                }
            }
        });

        nextBlock = result.nextLastBlockNumber

        const con_logs = await this.logRecorder.recordBatch({
            contractId: contractEntity.id,
            chainId: contractEntity.chainId,
            nftContractAddress: contractEntity.contractAddress as Address,
            logs: filteredlogs.map(l => {
                return {
                    transactionHash: l.transactionHash,
                    logIndex: l.logIndex,
                    blockNumber: l.blockNumber,
                    type: "PAYMENT" as const,
                    from: l.args?.buyer ?? l.args?.from ?? null,
                    to: null,
                    operator: null,
                    tokenId: null,
                    value: l.value ?? null,
                    processed: false,
                    args: serializeBigIntToJSON(l.args)
                };
            })
        });

        await super.updateLastSync(contractEntity, nextBlock)

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