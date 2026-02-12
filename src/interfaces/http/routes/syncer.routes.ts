import { Router } from "express";
import * as ctrl from "@/interfaces/http/controllers/syncer.controller";

const r = Router();

r.post("/", ctrl.resyncContract);
export default r;
