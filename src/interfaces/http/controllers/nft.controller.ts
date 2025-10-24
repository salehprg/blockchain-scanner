import { Request, Response, NextFunction } from "express";
import type { AppContainer } from "@/main/container";
import { prisma } from "@/infrastructure/db/prisma";

export async function listByContract(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const { contractAddress } = req.params;
    res.json(await repos.nftRepo.filterNFTs({ contractAddress: contractAddress.toLowerCase() }));
  } catch (e) { next(e); }
}

export async function filterNFTs(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const { contractAddress, tokenId } = req.query as Record<string, string>;

    const metas = await repos.nftRepo.filterNFTs({ contractAddress, tokenId });
    if (!metas.length) return res.status(404).json({ error: "Not found" });
    res.json(metas);
  } catch (e) { next(e); }
}

export async function resetMetadataFlag(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const { contractAddress, tokenId } = req.body as { contractAddress: string; tokenId: string };
    await repos.nftRepo.resetMetadataFlag(contractAddress, tokenId);
    res.status(204).send();
  } catch (e) { next(e); }
}


