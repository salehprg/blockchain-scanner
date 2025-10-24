import { Request, Response, NextFunction } from "express";
import type { AppContainer } from "@/main/container";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { randomUUID } from "crypto";
import { Address } from "viem";

export async function listOwners(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    res.json(await repos.ownerRepo.findAll());
  } catch (e) { next(e); }
}


export async function filterOwners(req: Request, res: Response, next: NextFunction) {
  try {
    const { ownerAddress, contractAddress, tokenId } = req.query as Record<string, string>;
    const { repos } = (req.app.locals.container as AppContainer);
    if (!ownerAddress && !contractAddress && !tokenId) {
      return res.status(400).json({ error: "owner, contractAddress and tokenId are required" });
    }

    const found = await repos.ownerRepo.filterOwners({ contractAddress, ownerAddress, tokenId });
    if (!found) return res.status(404).json({ error: "Not found" });
    res.json(found);
  } catch (e) { next(e); }
}

export async function upsertOwner(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const body = req.body as Partial<NFTOwner>;

    const model = new NFTOwner(
      body.id ?? randomUUID(),
      String(body.contractId),
      String(body.ownerAddress),
      String(body.contractAddress),
      String(body.tokenId),
      Number(body.count ?? 0),
      body.lastTransactionHash ?? null,
      body.lastSyncTime ? new Date(body.lastSyncTime) : null
    );

    const saved = await repos.ownerRepo.upsert(model);
    res.status(body.id ? 200 : 201).json(saved);
  } catch (e) { next(e); }
}

export async function deleteOwner(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    await repos.ownerRepo.delete(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
}
