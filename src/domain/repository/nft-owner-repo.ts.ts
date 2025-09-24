import { IBaseRepository } from "./base-repository";
import { NFTOwner } from "../entities/nft-owner";

export interface INFTOwnerRepository extends IBaseRepository<NFTOwner> {
  findByOwnerAndItem(owner: string, nftContractAddress: string, nftItemId: string): Promise<NFTOwner | null>;
  findByContract(contractId: string): Promise<NFTOwner[]>;
}
