import * as dotenv from "dotenv";
dotenv.config();

import { buildContainer } from "@/main/container";
import { createApp } from "./app";
import { envs } from "@/env";
import { BlockchainLogReader } from "@/infrastructure/blockchain/log-reader";
import { SyncContracts } from "@/application/use-case/sync/sync-contract";
import { ContractSyncJob } from "@/jobs/contract-sync.job";
import { ensureDatabase } from "@/infrastructure/db/ensure-db";

const PORT = parseInt(envs.PORT);

(async () => {
  
  await ensureDatabase(); 
  // Initialize DataSource & repositories
  const container = await buildContainer();

  // Inject container into app (via locals or a DI lib)
  const app = createApp();
  app.locals.container = container;

  const logReader = new BlockchainLogReader(container.services.blockchainReader);
  const syncUseCase = new SyncContracts(
    container.repos.contractRepo,
    container.repos.ownerRepo,
    logReader
  );
  const job = new ContractSyncJob(syncUseCase, 10_000);
  job.start();

  const server = app.listen(PORT, async () => {
    console.log(`HTTP listening on http://localhost:${PORT}`);
  });

  // graceful shutdown
  const shutdown = async () => {
    console.log("Shutting down...");
    await container.dataSource.destroy().catch(() => { });
    server.close(() => process.exit(0));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
})();
