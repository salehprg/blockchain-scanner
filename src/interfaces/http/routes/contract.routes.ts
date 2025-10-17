import { Router } from "express";
import * as ctrl from "@/interfaces/http/controllers/contract.controller";

const r = Router();

r.get("/", ctrl.listContracts);
r.get("/by-address/:address", ctrl.getByAddress);
r.get("/:id", ctrl.getById);
r.get("/:contractAddress/logs", ctrl.getContractLogs);
r.post("/", ctrl.upsertContract);  // upsert for simplicity
r.delete("/:id", ctrl.deleteContract);

export default r;
