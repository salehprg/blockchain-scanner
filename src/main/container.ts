import { prisma } from "@/infrastructure/db/prisma";
import { BlockchainConfigRepository } from "@/infrastructure/repositories/blockchain-config.repo.impl";
import { BlockchainContractRepository } from "@/infrastructure/repositories/blockchain-contract.repo.impl";
import { NFTOwnerRepository } from "@/infrastructure/repositories/nft-owner.repo.impl";
import { ContractLogRepository } from "@/infrastructure/repositories/contract-log.repo.impl";
import { NFTRepository } from "@/infrastructure/repositories/nft.repo.impl";
import { PrismaClient } from "@/generated/client";
import { SyncContracts } from "@/application/use-case/sync/sync-contract";
import { HandlersRegistry } from "@/handlers/HandlerRegistry";
import { ContractLogRecorder } from "@/application/services/contract-log-recorder";
import { AdapterRegistery } from "@/chainAdapters/AdapterRegistery";

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
    syncer: SyncContracts;
    logRecorder: ContractLogRecorder
    handlerRegistry: HandlersRegistry
  };
}

export async function buildContainer(): Promise<AppContainer> {
  const configRepo = new BlockchainConfigRepository();
  const contractRepo = new BlockchainContractRepository();
  const ownerRepo = new NFTOwnerRepository();
  const contractLogRepo = new ContractLogRepository();
  const nftRepo = new NFTRepository();

  // services
  const logRecorder = new ContractLogRecorder(contractLogRepo);
  const adapterRegsitry = new AdapterRegistery();
  const handlerRegistry = new HandlersRegistry(adapterRegsitry);

  const syncUseCase = new SyncContracts(
    contractRepo,
    handlerRegistry
  );

  const appContainer = {
    dataSource: prisma,
    repos: { configRepo, contractRepo, ownerRepo, contractLogRepo, nftRepo },
    services: { syncer: syncUseCase, logRecorder, handlerRegistry }
  } as AppContainer

  return appContainer;
}
