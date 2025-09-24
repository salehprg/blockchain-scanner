import { AppDataSource } from "@/infrastructure/db/data-source";
import { Repository } from "typeorm";
import { BlockchainConfigEntity } from "@/infrastructure/db/entities/blockchain-config.entity";
import { BlockchainContractEntity } from "@/infrastructure/db/entities/blockchain-contract.entity";
import { NFTOwnerEntity } from "@/infrastructure/db/entities/nft-owner.entity";
import { BlockchainConfigRepository } from "@/infrastructure/repositories/blockchain-config.repo.impl";
import { BlockchainContractRepository } from "@/infrastructure/repositories/blockchain-contract.repo.impl";
import { NFTOwnerRepository } from "@/infrastructure/repositories/nft-owner.repo.impl";
import { ViemPublicClientProvider } from "@/infrastructure/blockchain/BlochchainClient";

export async function buildContainer() {
  const ds = await AppDataSource.initialize();

  const configRepo = new BlockchainConfigRepository(ds.getRepository(BlockchainConfigEntity));
  const contractRepo = new BlockchainContractRepository(ds.getRepository(BlockchainContractEntity));
  const ownerRepo = new NFTOwnerRepository(ds.getRepository(NFTOwnerEntity));

  // rpc url resolver → prefer DB config, fallback to ENV
  const rpcUrlResolver = async (chainId: number) => {
    // You can block on DB lookups at startup if you prefer to warm the cache.
    // For simplicity here: on-demand lazy fetch with a sync fallback.
    // In production, preload a dict from DB.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    var cfg = await configRepo.findByChainId(chainId)
    if(cfg)
      return cfg.rpcUrlBase;
    return ""; // fallback (or throw if missing)
  };

  const blockchainReader = new ViemPublicClientProvider(rpcUrlResolver);

  return {
    dataSource: ds,
    repos: { configRepo, contractRepo, ownerRepo },
    services: { blockchainReader }
  };
}
