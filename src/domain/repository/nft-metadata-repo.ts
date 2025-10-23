import { IBaseRepository } from "./base-repository";
import { NFTMetadata } from "../entities/nft-metadata";

export interface INFTMetadataRepository extends IBaseRepository<NFTMetadata> {
  filterNFTMetadata(params: { id?: string; nftId?: string; name?: string }): Promise<NFTMetadata[]>;
  upsert(entity: NFTMetadata): Promise<NFTMetadata>;
}


