import { IBaseRepository } from "./base-repository";
import { BlockchainConfig } from "../entities/blockchain-config";

export interface IBlockchainConfigRepository extends IBaseRepository<BlockchainConfig> {
  findByChainId(chainId: number): Promise<BlockchainConfig | null>;
}
