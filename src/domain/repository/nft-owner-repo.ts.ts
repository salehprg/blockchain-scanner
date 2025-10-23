import { IBaseRepository } from "./base-repository";
import { NFTOwner } from "../entities/nft-owner";

export interface INFTOwnerRepository extends IBaseRepository<NFTOwner> {
  filterOwners(params: { contractAddress?: string; ownerAddress?: string; tokenId?: string }): Promise<NFTOwner[]>;
}
