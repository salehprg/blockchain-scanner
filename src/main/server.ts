import * as dotenv from "dotenv";
dotenv.config();

import { buildContainer, type AppContainer } from "@/main/container";
import { createApp } from "./app";
import { envs } from "@/env";
import { ContractSyncJob } from "@/jobs/contract-sync.job";
import { ensureDatabase } from "@/infrastructure/db/ensure-db";
import { prisma } from "@/infrastructure/db/prisma";

const PORT = parseInt(envs.PORT);

(async () => {

  await ensureDatabase();
  // Initialize DataSource & repositories
  const container: AppContainer = await buildContainer();

  // Inject container into app (via locals or a DI lib)
  const app = createApp();
  app.locals.container = container;

  container.services.handlerRegistry.RegisterERC1155(container)
  container.services.handlerRegistry.RegisterERC721(container)
  container.services.handlerRegistry.RegisterChestERC721(container)
  container.services.handlerRegistry.RegisterSolana(container)
  container.services.handlerRegistry.RegisterPayment(container)

  const job = new ContractSyncJob(container.services.syncer, 10_000);
  job.start();
  // Start Solana program sync job (ensures NFTs exist + metadata before owners)

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
