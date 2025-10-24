import { randomUUID } from "crypto";
import { IBlockchainConfigRepository } from "../../../domain/repository/blockchain-config-repo";
import { BlockchainConfig } from "../../../domain/entities/blockchain-config";

export class CreateBlockchainConfig {
    constructor(private readonly repo: IBlockchainConfigRepository) { }

    async execute(input: { chainId: number; rpcUrlBase: string; rpcUrlAlter?: string | null; }): Promise<BlockchainConfig> {
        const entity = new BlockchainConfig(
            randomUUID(),
            input.chainId,
            input.rpcUrlBase,
            input.rpcUrlAlter ?? null
        );
        return this.repo.create(entity);
    }
}

export class GetBlockchainConfigByChain {
    constructor(private readonly repo: IBlockchainConfigRepository) { }

    execute(chainId: number): Promise<BlockchainConfig | null> {
        return this.repo.getBlockChainConfigByChainId({chainId});
    }
}

export class UpdateBlockchainConfig {
  constructor(private readonly repo: IBlockchainConfigRepository) {}

  async execute(entity: BlockchainConfig): Promise<BlockchainConfig> {
    // Add validation / invariants here if needed
    return this.repo.update(entity);
  }
}
