import { Router } from "express";
import * as ctrl from "@/interfaces/http/controllers/nft.controller";

const r = Router();

r.get("/filter", ctrl.filterNFTs); // ?contractAddress=&tokenId=
r.post("/reset-metadata", ctrl.resetMetadataFlag);

export default r;


