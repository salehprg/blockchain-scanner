import { Router } from "express";
import * as ctrl from "@/interfaces/http/controllers/config.controller";

const r = Router();

r.get("/", ctrl.listConfigs);
r.get("/:chainId", ctrl.getByChainId);
r.post("/", ctrl.createConfig);
r.put("/:id", ctrl.updateConfig);
r.delete("/:id", ctrl.deleteConfig);

export default r;
