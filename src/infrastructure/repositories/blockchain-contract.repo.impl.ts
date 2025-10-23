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
        contractAddress: entity.contractAddress.toLowerCase(),
        contractType: entity.contractType,
        chainId: entity.chainId,
        lastSyncBlock: entity.lastSyncBlock,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return new BlockchainContract(saved.id, saved.contractAddress, saved.contractType as any, saved.chainId, saved.lastSyncBlock, saved.lastSyncTime);
  }
  async upsert(entity: BlockchainContract): Promise<BlockchainContract> {
    const saved = await prisma.blockchainContracts.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        contractAddress: entity.contractAddress.toLowerCase(),
        contractType: entity.contractType,
        chainId: entity.chainId,
        lastSyncBlock: entity.lastSyncBlock,
        lastSyncTime: entity.lastSyncTime,
      },
      update: {
        contractAddress: entity.contractAddress.toLowerCase(),
        contractType: entity.contractType,
        chainId: entity.chainId,
        lastSyncBlock: entity.lastSyncBlock,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return new BlockchainContract(saved.id, saved.contractAddress, saved.contractType as any, saved.chainId, saved.lastSyncBlock, saved.lastSyncTime);
  }
  async findById(id: string): Promise<BlockchainContract | null> {
    const e = await prisma.blockchainContracts.findUnique({ where: { id } });
    return e ? new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime) : null;
  }
  async findAll(): Promise<BlockchainContract[]> {
    const list = await prisma.blockchainContracts.findMany();
    return list.map(e => new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime));
  }
  async filterContracts(params: { id?: string; contractAddress?: string; contractType?: 'ERC721' | 'ERC1155' | 'OTHER'; chainId?: number }): Promise<BlockchainContract[]> {

    const where: Prisma.BlockchainContractsWhereInput = {};
    if (params.id) where.id = params.id.toLowerCase();
    if (params.contractAddress) where.contractAddress = params.contractAddress.toLowerCase();
    if (params.contractType) where.contractType = params.contractType.toLowerCase();
    if (params.chainId) where.chainId = params.chainId;

    const list = await prisma.blockchainContracts.findMany({
      where,
    });
    return list.map(e => new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime));
  }
  async update(entity: BlockchainContract): Promise<BlockchainContract> {
    const saved = await prisma.blockchainContracts.update({
      where: { id: entity.id },
      data: {
        contractAddress: entity.contractAddress.toLowerCase(),
        contractType: entity.contractType,
        chainId: entity.chainId,
        lastSyncBlock: entity.lastSyncBlock,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return new BlockchainContract(saved.id, saved.contractAddress, saved.contractType as any, saved.chainId, saved.lastSyncBlock, saved.lastSyncTime);
  }
  async delete(id: string): Promise<void> {
    await prisma.blockchainContracts.delete({ where: { id } });
  }
  async findByAddress(address: string): Promise<BlockchainContract | null> {
    const e = await prisma.blockchainContracts.findUnique({ where: { contractAddress: address.toLowerCase() } });
    return e ? new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime) : null;
  }
  async findByChainId(chainId: number): Promise<BlockchainContract[]> {
    const list = await prisma.blockchainContracts.findMany({ where: { chainId } });
    return list.map(e => new BlockchainContract(e.id, e.contractAddress, e.contractType as any, e.chainId, e.lastSyncBlock, e.lastSyncTime));
  }
}
