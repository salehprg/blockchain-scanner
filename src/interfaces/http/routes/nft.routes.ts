import { Router } from "express";
import * as ctrl from "@/interfaces/http/controllers/nft.controller";

const r = Router();

r.get("/by-contract/:contractAddress", ctrl.listByContract);
r.get("/by-contract/:contractAddress/with-metadata", ctrl.listByContractWithMetadata);
r.get("/metadata", ctrl.getMetadata); // ?contractAddress=&tokenId=
r.post("/reset-metadata", ctrl.resetMetadataFlag);

export default r;


