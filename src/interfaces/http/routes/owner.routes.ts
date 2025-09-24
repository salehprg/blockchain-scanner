import { Router } from "express";
import * as ctrl from "@/interfaces/http/controllers/owner.controller";

const r = Router();

r.get("/", ctrl.listOwners);
r.get("/by-contract/:contractAddress", ctrl.getByContract);
r.get("/by-owner", ctrl.getByOwnerAndItem); // ?owner=&nftContractAddress=&nftItemId=
r.post("/", ctrl.upsertOwner);
r.delete("/:id", ctrl.deleteOwner);

export default r;
