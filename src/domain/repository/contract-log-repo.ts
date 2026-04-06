import { IBaseRepository } from "./base-repository";
import { ContractLog, ContractLogEventType } from "@/domain/entities/contract-log";

export type ContractFilterParams = {
  contractId?: string
  chainId?: number
  contractAddress?: string
  eventType?: ContractLogEventType
  fromAddress?: string
  toAddress?: string
  fromBlockNumber?: number
  toBlockNumber?: number
  isProcessed?: boolean
  fromDate?: Date
  toDate?: Date
  limit?: number
  offset?: number
}

export interface IContractLogRepository extends IBaseRepository<ContractLog> {
  bulkInsert(logs: ContractLog[]): Promise<void>;
  filterLogs(params: ContractFilterParams): Promise<ContractLog[]>;
}


