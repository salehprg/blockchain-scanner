import { Address } from "viem";
import { ContractLog, ContractLogEventType } from "@/domain/entities/contract-log";
import { IContractLogRepository } from "@/domain/repository/contract-log-repo";

export class ContractLogRecorder {
  constructor(private readonly repo: IContractLogRepository) {}

  async recordBatch(params: {
    contractId: string;
    chainId: number;
    nftContractAddress: Address;
    logs: Array<{
      transactionHash: string;
      logIndex: number;
      blockNumber: bigint;
      type: ContractLogEventType;
      from?: Address | null;
      to?: Address | null;
      operator?: Address | null;
      tokenId?: string | null;
      value?: bigint | null;
    }>;
  }): Promise<void> {
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
      now
    ));

    await this.repo.bulkInsert(toPersist);
  }
}


