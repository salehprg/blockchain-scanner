import { BlockchainConfig } from "@/domain/entities/blockchain-config";
import { BlockchainConfigEntity } from "@/infrastructure/db/entities/blockchain-config.entity";

export const BlockchainConfigMapper = {
  toDomain(e: BlockchainConfigEntity): BlockchainConfig {
    return new BlockchainConfig(e.id, e.chainId, e.rpcUrlBase, e.rpcUrlAlter);
  },
  toEntity(d: BlockchainConfig): BlockchainConfigEntity {
    const e = new BlockchainConfigEntity();
    e.id = d.id;
    e.chainId = d.chainId;
    e.rpcUrlBase = d.rpcUrlBase;
    e.rpcUrlAlter = d.rpcUrlAlter;
    return e;
  }
};
