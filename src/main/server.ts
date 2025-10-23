import * as dotenv from "dotenv";
dotenv.config();

import { buildContainer, type AppContainer } from "@/main/container";
import { createApp } from "./app";
import { envs } from "@/env";
import { BlockchainLogReader } from "@/infrastructure/blockchain/log-reader";
import { SyncContracts } from "@/application/use-case/sync/sync-contract";
import { ContractSyncJob } from "@/jobs/contract-sync.job";
import { ensureDatabase } from "@/infrastructure/db/ensure-db";
import { NFTMetadataSyncer } from "@/application/services/nft-metadata-syncer";
import { NFTMetadataSyncJob } from "@/jobs/nft-metadata-sync.job";
import { prisma } from "@/infrastructure/db/prisma";

const PORT = parseInt(envs.PORT);

(async () => {
  
  await ensureDatabase(); 
  // Initialize DataSource & repositories
  const container: AppContainer = await buildContainer();

  // Inject container into app (via locals or a DI lib)
  const app = createApp();
  app.locals.container = container;
  ;(global as any).container = container;

  const logReader = new BlockchainLogReader(container.services.blockchainReader);
  const syncUseCase = new SyncContracts(
    container.repos.contractRepo,
    container.repos.ownerRepo,
    logReader,
    container.repos.contractLogRepo
  );
  const job = new ContractSyncJob(syncUseCase, 10_000);
  job.start();

  // start NFT metadata sync job
  const metaSyncer = new NFTMetadataSyncer(
    container.services.blockchainReader,
    container.repos.nftRepo,
    container.repos.nftMetadataRepo,
    container.repos.ownerRepo
  );
  const metaJob = new NFTMetadataSyncJob(
    metaSyncer,
    async () => (await container.repos.contractRepo.findAll()).map(c => ({ id: c.id, address: c.contractAddress as any, type: c.contractType as any, chainId: c.chainId })),
    60_000
  );
  metaJob.start();

  const server = app.listen(PORT, async () => {
    console.log(`HTTP listening on http://localhost:${PORT}`);
  });

  // graceful shutdown
  const shutdown = async () => {
    console.log("Shutting down...");
    await prisma.$disconnect().catch(() => { });
    server.close(() => process.exit(0));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
})();
