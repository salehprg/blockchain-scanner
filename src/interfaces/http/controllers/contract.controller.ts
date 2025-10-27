import { Request, Response, NextFunction } from "express";
import type { AppContainer } from "@/main/container";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { randomUUID } from "crypto";
import { DeleteBlockchainContract} from "@/application/use-case/blockchain-config/blockchain-contract-config"


export async function listContracts(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    res.json(await repos.contractRepo.findAll());
  } catch (e) { next(e); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const data = await repos.contractRepo.findById(req.params.id.toLowerCase());
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (e) { next(e); }
}

export async function getByAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const data = await repos.contractRepo.findByAddress(req.params.address.toLowerCase());
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (e) { next(e); }
}

export async function upsertContract(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const body = req.body as Partial<BlockchainContract>;

    const model = new BlockchainContract(
      body.id ?? randomUUID(),
      String(body.contractAddress),
      body.contractType ?? "OTHER",
      Number(body.chainId),
      body.lastSyncBlock ?? null,
      body.lastSyncTime ? new Date(body.lastSyncTime) : null
    );

    const saved = await repos.contractRepo.upsert(model);
    res.status(body.id ? 200 : 201).json(saved);
  } catch (e) { next(e); }
}

export async function deleteContract(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const useCase = new DeleteBlockchainContract(repos.contractRepo);
    await useCase.execute(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
}

export async function getContractLogs(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const { contractAddress } = req.params;
    const { fromDate, toDate, limit, offset } = req.query as Record<string, string>;

    const options: any = {};
    if (fromDate) options.fromDate = new Date(fromDate);
    if (toDate) options.toDate = new Date(toDate);
    if (limit) options.limit = Number(limit);
    if (offset) options.offset = Number(offset);

    const logs = await repos.contractLogRepo.filterLogs({...options, contractAddress: contractAddress.toLowerCase()});
    res.json(logs);
  } catch (e) { next(e); }
}