import { Request, Response, NextFunction } from "express";
import type { AppContainer } from "@/main/container";
import { CreateBlockchainConfig, UpdateBlockchainConfig } from "@/application/use-case/blockchain-config/blockchain-config";
import { BlockchainConfig } from "@/domain/entities/blockchain-config";

export async function listConfigs(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const all = await repos.configRepo.findAll();
    res.json(all);
  } catch (e) { next(e); }
}

export async function getByChainId(req: Request, res: Response, next: NextFunction) {
  try {
    const chainId = Number(req.params.chainId);
    const { repos } = (req.app.locals.container as AppContainer);
    const found = await repos.configRepo.filterConfigs({ chainId });
    if (!found) return res.status(404).json({ error: "Not found" });
    res.json(found);
  } catch (e) { next(e); }
}

export async function createConfig(req: Request, res: Response, next: NextFunction) {
  try {
    const { chainId, rpcUrlBase, rpcUrlAlter } = req.body;
    const { repos } = (req.app.locals.container as AppContainer);
    const useCase = new CreateBlockchainConfig(repos.configRepo);
    const created = await useCase.execute({ chainId, rpcUrlBase, rpcUrlAlter });
    res.status(201).json(created);
  } catch (e) { next(e); }
}

export async function updateConfig(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const { id } = req.params;
    const existing = await repos.configRepo.findById(id);
    if (!existing) return res.status(404).json({ error: "Not found" });

    const updated = new BlockchainConfig(
      id,
      req.body.chainId ?? existing.chainId,
      req.body.rpcUrlBase ?? existing.rpcUrlBase,
      req.body.rpcUrlAlter ?? existing.rpcUrlAlter
    );
    const useCase = new UpdateBlockchainConfig(repos.configRepo);
    res.json(await useCase.execute(updated));
  } catch (e) { next(e); }
}

export async function deleteConfig(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = req.app.locals.container;
    await repos.configRepo.delete(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
}
