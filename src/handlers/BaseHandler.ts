import { AdapterRegistery } from "@/chainAdapters/AdapterRegistery";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { ContractLog } from "@/domain/entities/contract-log";
import { AppContainer } from "@/main/container";

export abstract class BaseHandler {
    constructor(readonly appContainer: AppContainer,
        readonly adapterRegistry: AdapterRegistery
    ) {

    }

    abstract proccessLog(contractEntity: BlockchainContract): any;
    abstract scanAndRecord(contractEntity: BlockchainContract): Promise<ContractLog[]>;

    async scanTransactions(contractEntity: BlockchainContract): Promise<ContractLog[]> {
        const logs = await this.scanAndRecord(contractEntity)
        return logs
    }

    protected async updateLastSync(contractEntity: BlockchainContract, lastAppliedBlock: bigint) {
        contractEntity.lastSyncTime = new Date()
        contractEntity.lastSyncBlock = lastAppliedBlock.toString()
        await this.appContainer.repos.contractRepo.update(contractEntity);
    }

}