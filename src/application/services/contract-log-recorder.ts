import { Address } from "viem";
import { ContractLog, ContractLogEventType } from "@/domain/entities/contract-log";
import { IContractLogRepository } from "@/domain/repository/contract-log-repo";

export class ContractLogRecorder {
  constructor(private readonly repo: IContractLogRepository) { }

  async getLogs(contractAddress: string, eventType: ContractLogEventType, isProcessed: boolean): Promise<ContractLog[]> {
    var logs = await this.repo.filterLogs({ contractAddress, eventType, isProcessed })
    return logs
  }

  async updateLog(contractLog: ContractLog): Promise<ContractLog> {
    return await this.repo.update(contractLog)
  }

  async recordBatch(params: {
    contractId: string;
    chainId: number;
    nftContractAddress: Address;
    logs: Array<{
      transactionHash: string;
      logIndex: number;
      blockNumber: bigint;
      type: ContractLogEventType;
      processed: boolean;
      from?: Address | null;
      to?: Address | null;
      operator?: Address | null;
      tokenId?: string | null;
      value?: bigint | null;
    }>;
  }): Promise<ContractLog[]> {
    const now = new Date();
    const toPersist = params.logs.map(l => new ContractLog(
      crypto.randomUUID(),
      params.contractId,
      params.chainId,
      params.nftContractAddress,
      l.blockNumber.toString(),
      l.transactionHash,
      l.logIndex,
      l.type,
      l.from ? l.from : null,
      l.to ? l.to : null,
      l.operator ? l.operator : null,
      l.tokenId != null ? l.tokenId.toString() : null,
      l.value != null ? l.value.toString() : null,
      l.processed,
      now,
    ));

    await this.repo.bulkInsert(toPersist);
    return toPersist
  }
}


