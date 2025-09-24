import { Router } from "express";
import configRoutes from "./config.routes";
import contractRoutes from "./contract.routes";
import ownerRoutes from "./owner.routes";

const router = Router();
router.use("/configs", configRoutes);
router.use("/contracts", contractRoutes);
router.use("/owners", ownerRoutes);

export default router;
