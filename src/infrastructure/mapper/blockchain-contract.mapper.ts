import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { BlockchainContractEntity } from "@/infrastructure/db/entities/blockchain-contract.entity";

export const BlockchainContractMapper = {
  toDomain(e: BlockchainContractEntity): BlockchainContract {
    return new BlockchainContract(
      e.id,
      e.contractAddress,
      e.contractType,
      e.chainId,
      e.lastSyncBlock,
      e.lastSyncTime
    );
  },
  toEntity(d: BlockchainContract): BlockchainContractEntity {
    const e = new BlockchainContractEntity();
    e.id = d.id;
    e.contractAddress = d.contractAddress;
    e.contractType = d.contractType;
    e.chainId = d.chainId;
    e.lastSyncBlock = d.lastSyncBlock;
    e.lastSyncTime = d.lastSyncTime;
    return e;
  }
};
