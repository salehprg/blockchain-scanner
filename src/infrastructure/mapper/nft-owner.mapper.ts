import { NFTOwner } from "@/domain/entities/nft-owner";
import { NFTOwnerEntity } from "@/infrastructure/db/entities/nft-owner.entity";

export const NFTOwnerMapper = {
  toDomain(e: NFTOwnerEntity): NFTOwner {
    return new NFTOwner(
      e.id, e.contractId, e.ownerAddress, e.nftContractAddress, e.nftItemId,
      e.count, e.lastTransactionHash, e.lastSyncTime
    );
  },
  toEntity(d: NFTOwner): NFTOwnerEntity {
    const e = new NFTOwnerEntity();
    e.id = d.id;
    e.contractId = d.contractId;
    e.ownerAddress = d.ownerAddress;
    e.nftContractAddress = d.nftContractAddress;
    e.nftItemId = d.nftItemId;
    e.count = d.count;
    e.lastTransactionHash = d.lastTransactionHash;
    e.lastSyncTime = d.lastSyncTime;
    return e;
  }
};
