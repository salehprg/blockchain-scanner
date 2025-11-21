import { Request, Response, NextFunction } from "express";
import type { AppContainer } from "@/main/container";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { randomUUID } from "crypto";
import { DeleteBlockchainContract} from "@/application/use-case/blockchain-config/blockchain-contract-config"
import { UpdateOwnershipFromLogs } from "@/application/use-case/ownership/update-ownership-from-logs";
import { CalculateOwnershipFromLogs } from "@/application/use-case/ownership/calculate-ownership-from-logs";
import { OwnershipUpdater } from "@/application/services/ownership-updater";


export async function listContracts(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    res.json(await repos.contractRepo.findAll());
  } catch (e) { next(e); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const data = await repos.contractRepo.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Not found" });
    res.json(data);
  } catch (e) { next(e); }
}

export async function getByAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const data = await repos.contractRepo.findByAddress(req.params.address);
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

    const logs = await repos.contractLogRepo.filterLogs({...options, contractAddress: contractAddress});
    res.json(logs);
  } catch (e) { next(e); }
}

export async function updateOwnershipFromLogs(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const { contractAddress } = req.params;
    const { startDate, endDate } = req.body as { startDate: string; endDate: string };

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }

    const ownershipUpdater = new OwnershipUpdater(repos.ownerRepo);
    const useCase = new UpdateOwnershipFromLogs(
      repos.contractRepo,
      repos.contractLogRepo,
      ownershipUpdater
    );

    const result = await useCase.execute({
      contractAddress,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    res.json({
      success: true,
      contractAddress,
      processedLogs: result.processedLogs,
      updatedOwnerships: result.updatedOwnerships,
    });
  } catch (e) {
    next(e);
  }
}

export async function calculateOwnershipFromLogs(req: Request, res: Response, next: NextFunction) {
  try {
    const { repos } = (req.app.locals.container as AppContainer);
    const { contractAddress } = req.params;
    const { startDate, endDate } = req.body as { startDate: string; endDate: string };

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }

    const useCase = new CalculateOwnershipFromLogs(
      repos.contractRepo,
      repos.contractLogRepo
    );

    const ownerships = await useCase.execute({
      contractAddress,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    res.json({
      success: true,
      contractAddress,
      ownerships,
      count: ownerships.length,
    });
  } catch (e) {
    next(e);
  }
}