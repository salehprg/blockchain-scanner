import { IBaseRepository } from "./base-repository";
import { BlockchainContract } from "../entities/blockchain-contract";

export interface IBlockchainContractRepository extends IBaseRepository<BlockchainContract> {
  filterActiveContracts(): Promise<BlockchainContract[]>;
  filterContracts(params: { id?: string; contractAddress?: string; contractType?: 'ERC721' | 'ERC1155' | 'OTHER'; chainId?: number }): Promise<BlockchainContract[]>;
}
