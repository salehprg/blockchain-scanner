import { ContractLog } from "@/domain/entities/contract-log";
import { ContractLogEntity } from "@/infrastructure/db/entities/contract-log.entity";

export const ContractLogMapper = {
  toDomain(e: ContractLogEntity): ContractLog {
    return new ContractLog(
      e.id,
      e.contractId,
      e.chainId,
      e.nftContractAddress,
      e.blockNumber,
      e.transactionHash,
      e.logIndex,
      e.eventType as any,
      e.fromAddress,
      e.toAddress,
      e.operatorAddress,
      e.tokenId,
      e.value,
      e.loggedAt
    );
  },
  toEntity(d: ContractLog): ContractLogEntity {
    const e = new ContractLogEntity();
    e.id = d.id;
    e.contractId = d.contractId;
    e.chainId = d.chainId;
    e.nftContractAddress = d.nftContractAddress;
    e.blockNumber = d.blockNumber;
    e.transactionHash = d.transactionHash;
    e.logIndex = d.logIndex;
    e.eventType = d.eventType;
    e.fromAddress = d.fromAddress;
    e.toAddress = d.toAddress;
    e.operatorAddress = d.operatorAddress;
    e.tokenId = d.tokenId;
    e.value = d.value;
    e.loggedAt = d.loggedAt;
    return e;
  }
};


