import { Router } from "express";
import type { AppContainer } from "@/main/container";
import configRoutes from "./config.routes";
import contractRoutes from "./contract.routes";
import ownerRoutes from "./owner.routes";
import nftRoutes from "./nft.routes";

const router = Router() as Router & { locals?: { container: AppContainer } };
router.use("/configs", configRoutes);
router.use("/contracts", contractRoutes);
router.use("/owners", ownerRoutes);
router.use("/nfts", nftRoutes);

export default router;
