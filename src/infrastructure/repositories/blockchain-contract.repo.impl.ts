import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { Prisma } from "@/generated/client";
import { prisma } from "@/infrastructure/db/prisma";

export class BlockchainContractRepository implements IBlockchainContractRepository {
  constructor() { }

  async create(entity: BlockchainContract): Promise<BlockchainContract> {
    const saved = await prisma.blockchainContracts.create({
      data: {
        id: entity.id,
        contractAddress: entity.contractAddress,
        contractType: entity.contractType,
        chainId: entity.chainId,
        lastSyncBlock: entity.lastSyncBlock,
        lastSyncTime: entity.lastSyncTime,
        contractCreateBlockNumber: entity.contractCreateBlockNumber,
        contractName: entity.contractName,
      },
    });
    return new BlockchainContract(saved.id, saved.contractAddress, saved.contractType as any, saved.chainId, saved.lastSyncBlock, saved.lastSyncTime, saved.contractCreateBlockNumber, saved.contractName);
  }
  async upsert(entity: BlockchainContract): Promise<BlockchainContract> {
    const saved = await prisma.blockchainContracts.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        contractAddress: entity.contractAddress,
        contractType: entity.contractType,
        chainId: entity.chainId,
        lastSyncBlock: entity.lastSyncBlock,
        lastSyncTime: entity.lastSyncTime,
        contractCreateBlockNumber: entity.contractCreateBlockNumber,
        contractName: entity.contractName,
      },
      update: {
        contractAddress: entity.contractAddress,
        contractType: entity.contractType,
        chainId: entity.chainId,
        lastSyncBlock: entity.lastSyncBlock,
        lastSyncTime: entity.lastSyncTime,
        contractCreateBlockNumber: entity.contractCreateBlockNumber,
        contractName: entity.contractName,
      },
    });
    return new BlockchainContract(saved.id, saved.contractAddress, saved.contractType as any, saved.chainId, saved.lastSyncBlock, saved.lastSyncTime, saved.contractCreateBlockNumber, saved.contractName);
  }
  async findById(id: string): Promise<BlockchainContract | null> {
    const e = await prisma.blockchainContracts.findUnique({ where: { id } });
    return e ? new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime, e.contractCreateBlockNumber, e.contractName) : null;
  }
  async findAll(): Promise<BlockchainContract[]> {
    const list = await prisma.blockchainContracts.findMany();
    return list.map(e => new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime, e.contractCreateBlockNumber, e.contractName));
  }
  async filterContracts(params: { id?: string; contractAddress?: string; contractType?: 'ERC721' | 'ERC1155' | 'OTHER'; chainId?: number }): Promise<BlockchainContract[]> {

    const where: Prisma.BlockchainContractsWhereInput = {};
    if (params.id) where.id = params.id;
    if (params.contractAddress) where.contractAddress = { equals: params.contractAddress, mode: 'insensitive' };
    if (params.contractType) where.contractType = { equals: params.contractType, mode: 'insensitive' };
    if (params.chainId) where.chainId = { equals: params.chainId };

    const list = await prisma.blockchainContracts.findMany({
      where,
    });
    return list.map(e => new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime, e.contractCreateBlockNumber, e.contractName));
  }
  async update(entity: BlockchainContract): Promise<BlockchainContract> {
    const saved = await prisma.blockchainContracts.update({
      where: { id: entity.id },
      data: {
        contractAddress: entity.contractType == "SOLANA" ? entity.contractAddress : entity.contractAddress,
        contractType: entity.contractType,
        chainId: entity.chainId,
        lastSyncBlock: entity.lastSyncBlock,
        lastSyncTime: entity.lastSyncTime,
        contractCreateBlockNumber: entity.contractCreateBlockNumber,
        contractName: entity.contractName,
      },
    });
    return new BlockchainContract(saved.id, saved.contractAddress, saved.contractType as any, saved.chainId, saved.lastSyncBlock, saved.lastSyncTime, saved.contractCreateBlockNumber, saved.contractName);
  }
  async delete(id: string): Promise<void> {
    await prisma.blockchainContracts.delete({ where: { id } });
  }
  async findByAddress(address: string): Promise<BlockchainContract | null> {
    const e = await prisma.blockchainContracts.findUnique({ where: { contractAddress: address } });
    return e ? new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime, e.contractCreateBlockNumber, e.contractName) : null;
  }
  async findByChainId(chainId: number): Promise<BlockchainContract[]> {
    const list = await prisma.blockchainContracts.findMany({ where: { chainId } });
    return list.map(e => new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime, e.contractCreateBlockNumber, e.contractName));
  }
}
