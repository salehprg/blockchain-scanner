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

export async function getMetadata(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const { nftId } = req.query as Record<string, string>;
    if (!nftId) return res.status(400).json({ error: "nftId is required" });
    const metas = await repos.nftMetadataRepo.filterNFTMetadata({ nftId });
    if (!metas.length) return res.status(404).json({ error: "Not found" });
    res.json(metas[0]);
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


export async function listByContractWithMetadata(req: Request, res: Response, next: NextFunction) {
  try {
    const { dataSource } = (req.app.locals.container as AppContainer);
    const { contractAddress } = req.params;
    const { limit, offset } = req.query as Record<string, string>;

    const rows = await prisma.nFTs.findMany({
      where: { nftContractAddress: contractAddress.toLowerCase() },
      include: { metadata: true },
      orderBy: { tokenId: "asc" },
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined,
    });

    const result = rows.map((r: any) => ({
      nftContractAddress: r.nftContractAddress,
      tokenId: r.tokenId,
      tokenUri: r.tokenUri,
      metadataUpdated: r.metadataUpdated,
      lastMetadataSyncTime: r.lastMetadataSyncTime,
      metadata: r.metadata
        ? {
          name: r.metadata.name,
          description: r.metadata.description,
          image: r.metadata.image,
          externalUrl: r.metadata.externalUrl,
          attributes: r.metadata.attributes ?? null,
          raw: r.metadata.raw ?? null
        }
        : null
    }));

    res.json(result);
  } catch (e) { next(e); }
}


