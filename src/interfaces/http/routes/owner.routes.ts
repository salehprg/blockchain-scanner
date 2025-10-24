import { Router } from "express";
import * as ctrl from "@/interfaces/http/controllers/owner.controller";

const r = Router();

r.get("/", ctrl.listOwners);
r.get("/filter", ctrl.filterOwners);
r.post("/", ctrl.upsertOwner);
r.delete("/:id", ctrl.deleteOwner);

export default r;
