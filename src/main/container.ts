import { prisma } from "@/infrastructure/db/prisma";
import { BlockchainConfigRepository } from "@/infrastructure/repositories/blockchain-config.repo.impl";
import { BlockchainContractRepository } from "@/infrastructure/repositories/blockchain-contract.repo.impl";
import { NFTOwnerRepository } from "@/infrastructure/repositories/nft-owner.repo.impl";
import { ContractLogRepository } from "@/infrastructure/repositories/contract-log.repo.impl";
import { NFTRepository } from "@/infrastructure/repositories/nft.repo.impl";
import { ViemPublicClientProvider } from "@/infrastructure/blockchain/BlochchainClient";
import { PrismaClient } from "@/generated/client";
import { SolanaReader } from "@/infrastructure/blockchain/solana-reader";
import { RpcUrlResolver } from "@/application/services/rpc-url-resolver";
import { ContractLister } from "@/application/services/contract-lister";

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
    rpcUrlResolver: RpcUrlResolver;
    contractLister: ContractLister;
  };
}

export async function buildContainer(): Promise<AppContainer> {
  const configRepo = new BlockchainConfigRepository();
  const contractRepo = new BlockchainContractRepository();
  const ownerRepo = new NFTOwnerRepository();
  const contractLogRepo = new ContractLogRepository();
  const nftRepo = new NFTRepository();

  // services
  const rpcUrlResolver = new RpcUrlResolver(configRepo);
  const contractLister = new ContractLister(contractRepo);

  const blockchainReader = new ViemPublicClientProvider(chainId => rpcUrlResolver.resolve(chainId));
  const solanaReader = new SolanaReader(chainId => rpcUrlResolver.resolve(chainId));

  return {
    dataSource: prisma,
    repos: { configRepo, contractRepo, ownerRepo, contractLogRepo, nftRepo },
    services: { blockchainReader, solanaReader, rpcUrlResolver, contractLister }
  };
}
