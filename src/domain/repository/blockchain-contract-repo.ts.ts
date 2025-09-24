import { IBaseRepository } from "./base-repository";
import { BlockchainContract } from "../entities/blockchain-contract";

export interface IBlockchainContractRepository extends IBaseRepository<BlockchainContract> {
  findByAddress(address: string): Promise<BlockchainContract | null>;
  findByChainId(chainId: number): Promise<BlockchainContract[]>;
}
