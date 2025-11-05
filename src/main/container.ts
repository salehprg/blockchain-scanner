import { prisma } from "@/infrastructure/db/prisma";
import { BlockchainConfigRepository } from "@/infrastructure/repositories/blockchain-config.repo.impl";
import { BlockchainContractRepository } from "@/infrastructure/repositories/blockchain-contract.repo.impl";
import { NFTOwnerRepository } from "@/infrastructure/repositories/nft-owner.repo.impl";
import { ContractLogRepository } from "@/infrastructure/repositories/contract-log.repo.impl";
import { NFTRepository } from "@/infrastructure/repositories/nft.repo.impl";
import { ViemPublicClientProvider } from "@/infrastructure/blockchain/BlochchainClient";
import { PrismaClient } from "@/generated/client";
import { SolanaReader } from "@/infrastructure/blockchain/solana-reader";

export interface AppContainer {
  dataSource: PrismaClient;
  repos: {
    configRepo: BlockchainConfigRepository;
    contractRepo: BlockchainContractRepository;
    ownerRepo: NFTOwnerRepository;
    contractLogRepo: ContractLogRepository;
    nftRepo: NFTRepository;
  };
  services: {
    blockchainReader: ViemPublicClientProvider;
    solanaReader: SolanaReader;
  };
}

export async function buildContainer(): Promise<AppContainer> {
  const configRepo = new BlockchainConfigRepository();
  const contractRepo = new BlockchainContractRepository();
  const ownerRepo = new NFTOwnerRepository();
  const contractLogRepo = new ContractLogRepository();
  const nftRepo = new NFTRepository();

  // rpc url resolver → prefer DB config, fallback to ENV
  const rpcUrlResolver = async (chainId: number) => {
    // You can block on DB lookups at startup if you prefer to warm the cache.
    // For simplicity here: on-demand lazy fetch with a sync fallback.
    // In production, preload a dict from DB.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    var cfg = (await configRepo.filterConfigs({ chainId }))[0]
    if (cfg)
      return cfg.rpcUrlBase;
    return ""; // fallback (or throw if missing)
  };

  const blockchainReader = new ViemPublicClientProvider(rpcUrlResolver);
  const solanaReader = new SolanaReader(rpcUrlResolver);

  return {
    dataSource: prisma,
    repos: { configRepo, contractRepo, ownerRepo, contractLogRepo, nftRepo },
    services: { blockchainReader, solanaReader }
  };
}
