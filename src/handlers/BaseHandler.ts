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
        await this.updateLastSync(contractEntity, logs)
        return logs
    }

    private async updateLastSync(contractEntity: BlockchainContract, logs: ContractLog[]): Promise<ContractLog[]> {
        if (logs.length == 0) return logs;

        let maxApplied = 0n
        for (const log of logs) {
            if (BigInt(log.blockNumber) > maxApplied) maxApplied = BigInt(log.blockNumber);
        }

        contractEntity.lastSyncTime = new Date()
        contractEntity.lastSyncBlock = maxApplied.toString()
        await this.appContainer.repos.contractRepo.update(contractEntity);

        return logs
    }

}