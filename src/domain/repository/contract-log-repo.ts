import { IBaseRepository } from "./base-repository";
import { ContractLog } from "@/domain/entities/contract-log";

export interface IContractLogRepository extends IBaseRepository<ContractLog> {
  bulkInsert(logs: ContractLog[]): Promise<void>;
  findByContractId(
    contractId: string,
    options?: { fromDate?: Date; toDate?: Date; limit?: number; offset?: number }
  ): Promise<ContractLog[]>;
}


