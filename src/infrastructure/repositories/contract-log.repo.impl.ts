import { ContractLog, ContractLogEventType } from "@/domain/entities/contract-log";
import { ContractFilterParams, IContractLogRepository } from "@/domain/repository/contract-log-repo";
import { Prisma } from "@/generated/client";
import { prisma } from "@/infrastructure/db/prisma";


export class ContractLogRepository implements IContractLogRepository {
  constructor() { }

  async create(entity: ContractLog): Promise<ContractLog> {
    const saved = await prisma.contractLogs.create({
      data: {
        id: entity.id,
        contractId: entity.contractId,
        chainId: entity.chainId,
        contractAddress: entity.contractAddress,
        blockNumber: entity.blockNumber,
        transactionHash: entity.transactionHash,
        logIndex: entity.logIndex,
        eventType: entity.eventType,
        fromAddress: entity.fromAddress,
        toAddress: entity.toAddress,
        operatorAddress: entity.operatorAddress,
        tokenId: entity.tokenId,
        value: entity.value,
        processed: entity.processed,
        loggedAt: entity.loggedAt,
        args: entity.args
      },
    });
    return new ContractLog(
      saved.id, saved.contractId, saved.chainId, saved.contractAddress,
      saved.blockNumber, saved.transactionHash, saved.logIndex,
      saved.eventType as any, saved.fromAddress, saved.toAddress,
      saved.operatorAddress, saved.tokenId, saved.value, saved.processed, saved.loggedAt, saved.args
    );
  }
  async upsert(entity: ContractLog): Promise<ContractLog> {
    const saved = await prisma.contractLogs.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        contractId: entity.contractId,
        chainId: entity.chainId,
        contractAddress: entity.contractAddress,
        blockNumber: entity.blockNumber,
        transactionHash: entity.transactionHash,
        logIndex: entity.logIndex,
        eventType: entity.eventType,
        fromAddress: entity.fromAddress,
        toAddress: entity.toAddress,
        operatorAddress: entity.operatorAddress,
        tokenId: entity.tokenId,
        value: entity.value,
        loggedAt: entity.loggedAt,
        args: entity.args
      },
      update: {
        contractId: entity.contractId,
        chainId: entity.chainId,
        contractAddress: entity.contractAddress,
        blockNumber: entity.blockNumber,
        transactionHash: entity.transactionHash,
        logIndex: entity.logIndex,
        eventType: entity.eventType,
        fromAddress: entity.fromAddress,
        toAddress: entity.toAddress,
        operatorAddress: entity.operatorAddress,
        tokenId: entity.tokenId,
        value: entity.value,
        loggedAt: entity.loggedAt,
        processed: entity.processed,
        args: entity.args
      },
    });
    return new ContractLog(
      saved.id, saved.contractId, saved.chainId, saved.contractAddress,
      saved.blockNumber, saved.transactionHash, saved.logIndex,
      saved.eventType as any, saved.fromAddress, saved.toAddress,
      saved.operatorAddress, saved.tokenId, saved.value, saved.processed, saved.loggedAt, saved.args
    );
  }
  async findById(id: string): Promise<ContractLog | null> {
    const e = await prisma.contractLogs.findUnique({ where: { id } });
    return e ? new ContractLog(
      e.id, e.contractId, e.chainId, e.contractAddress,
      e.blockNumber, e.transactionHash, e.logIndex,
      e.eventType as any, e.fromAddress, e.toAddress,
      e.operatorAddress, e.tokenId, e.value, e.processed, e.loggedAt, e.args
    ) : null;
  }
  async findAll(): Promise<ContractLog[]> {
    const list = await prisma.contractLogs.findMany({ orderBy: { loggedAt: "desc" } });
    return list.map(e => new ContractLog(
      e.id, e.contractId, e.chainId, e.contractAddress,
      e.blockNumber, e.transactionHash, e.logIndex,
      e.eventType as any, e.fromAddress, e.toAddress,
      e.operatorAddress, e.tokenId, e.value, e.processed, e.loggedAt, e.args
    ));
  }
  async filterLogs(params: ContractFilterParams): Promise<ContractLog[]> {

    const where: Prisma.ContractLogsWhereInput = {};
    if (params.contractId) where.contractId = { equals: params.contractId, mode: 'insensitive' };
    if (params.contractAddress) where.contractAddress = { equals: params.contractAddress, mode: 'insensitive' };
    if (params.isProcessed !== undefined) where.processed = { equals: params.isProcessed };
    if (params.eventType) where.eventType = { equals: params.eventType, mode: 'insensitive' };
    if (params.chainId) where.chainId = { equals: params.chainId };
    if (params.fromAddress) where.fromAddress = { equals: params.fromAddress, mode: 'insensitive' };
    if (params.toAddress) where.toAddress = { equals: params.toAddress, mode: 'insensitive' };

    // Only add date filter if dates are provided
    if (params.fromDate || params.toDate) {
      where.loggedAt = {};
      if (params.fromDate) where.loggedAt.gt = params.fromDate;
      if (params.toDate) where.loggedAt.lt = params.toDate;
    }

    const list = await prisma.contractLogs.findMany({
      where,
      orderBy: { loggedAt: "desc" },
      take: params.limit,
      skip: params.offset,
    });
    return list.map(e => new ContractLog(
      e.id, e.contractId, e.chainId, e.contractAddress,
      e.blockNumber, e.transactionHash, e.logIndex,
      e.eventType as any, e.fromAddress, e.toAddress,
      e.operatorAddress, e.tokenId, e.value, e.processed, e.loggedAt, e.args
    ));
  }
  async update(entity: ContractLog): Promise<ContractLog> {
    const saved = await prisma.contractLogs.update({
      where: { id: entity.id },
      data: {
        contractId: entity.contractId,
        chainId: entity.chainId,
        contractAddress: entity.contractAddress,
        blockNumber: entity.blockNumber,
        transactionHash: entity.transactionHash,
        logIndex: entity.logIndex,
        eventType: entity.eventType,
        fromAddress: entity.fromAddress,
        toAddress: entity.toAddress,
        operatorAddress: entity.operatorAddress,
        tokenId: entity.tokenId,
        value: entity.value,
        loggedAt: entity.loggedAt,
        processed: entity.processed
      },
    });
    return new ContractLog(
      saved.id, saved.contractId, saved.chainId, saved.contractAddress,
      saved.blockNumber, saved.transactionHash, saved.logIndex,
      saved.eventType as any, saved.fromAddress, saved.toAddress,
      saved.operatorAddress, saved.tokenId, saved.value, saved.processed, saved.loggedAt, saved.args
    );
  }
  async delete(id: string): Promise<void> {
    await prisma.contractLogs.delete({ where: { id } });
  }

  async bulkInsert(logs: ContractLog[]): Promise<void> {
    if (logs.length === 0) return;
    await prisma.contractLogs.createMany({
      data: logs.map(l => ({
        id: l.id,
        processed: l.processed,
        contractId: l.contractId,
        chainId: l.chainId,
        contractAddress: l.contractAddress,
        blockNumber: l.blockNumber,
        transactionHash: l.transactionHash,
        logIndex: l.logIndex,
        eventType: l.eventType,
        fromAddress: l.fromAddress,
        toAddress: l.toAddress,
        operatorAddress: l.operatorAddress,
        tokenId: l.tokenId,
        value: l.value,
        loggedAt: l.loggedAt,
        args: l.args
      } as ContractLog)),
      skipDuplicates: true,
    });
  }
}


