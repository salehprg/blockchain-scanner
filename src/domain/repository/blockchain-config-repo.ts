import { IBaseRepository } from "./base-repository";
import { BlockchainConfig } from "../entities/blockchain-config";

export interface IBlockchainConfigRepository extends IBaseRepository<BlockchainConfig> {
  filterConfigs(params: { id?: string; chainId?: number }): Promise<BlockchainConfig[]>;
}
