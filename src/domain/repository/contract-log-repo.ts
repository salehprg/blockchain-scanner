import { IBaseRepository } from "./base-repository";
import { ContractLog } from "@/domain/entities/contract-log";

export interface IContractLogRepository extends IBaseRepository<ContractLog> {
  bulkInsert(logs: ContractLog[]): Promise<void>;
  filterLogs(params: { contractId?: string; contractAddress?: string; fromDate?: Date; toDate?: Date; limit?: number; offset?: number }): Promise<ContractLog[]>;
}


