import { Request, Response, NextFunction } from "express";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { randomUUID } from "crypto";
import { Address } from "viem";

export async function listOwners(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = req.app.locals.container;
    res.json(await repos.ownerRepo.findAll());
  } catch (e) { next(e); }
}

export async function getByContract(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = req.app.locals.container;
    res.json(await repos.ownerRepo.findByContractAddress(req.params.contractAddress.toLowerCase()));
  } catch (e) { next(e); }
}

export async function getByOwnerAndItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { owner, nftContractAddress, nftItemId } = req.query as Record<string, string>;
    const { repos } = req.app.locals.container;
    const found = await repos.ownerRepo.findByOwnerAndItem(owner.toLowerCase(), nftContractAddress.toLowerCase(), nftItemId.toLowerCase());
    if (!found) return res.status(404).json({ error: "Not found" });
    res.json(found);
  } catch (e) { next(e); }
}

export async function upsertOwner(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = req.app.locals.container;
    const body = req.body as Partial<NFTOwner>;

    const model = new NFTOwner(
      body.id ?? randomUUID(),
      String(body.contractId),
      String(body.ownerAddress),
      String(body.nftContractAddress),
      String(body.nftItemId),
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
    const { repos } = req.app.locals.container;
    await repos.ownerRepo.delete(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
}
