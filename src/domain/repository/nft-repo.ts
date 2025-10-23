import { IBaseRepository } from "./base-repository";
import { NFT } from "../entities/nft";

export interface INFTRepository extends IBaseRepository<NFT> {
  filterNFTs(params: { id?: string; contractId?: string; contractAddress?: string; tokenId?: string }, options?: { limit?: number; offset?: number }): Promise<NFT[]>;
  upsertMany(items: NFT[]): Promise<void>;
  resetMetadataFlag(contractAddress: string, tokenId: string): Promise<void>;
}


