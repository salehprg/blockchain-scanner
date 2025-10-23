import { BlockchainConfig } from "@/domain/entities/blockchain-config";
import { IBlockchainConfigRepository } from "@/domain/repository/blockchain-config-repo";
import { Prisma } from "@/generated/client";
import { prisma } from "@/infrastructure/db/prisma";

export class BlockchainConfigRepository implements IBlockchainConfigRepository {
  constructor() { }

  async create(entity: BlockchainConfig): Promise<BlockchainConfig> {
    const saved = await prisma.blockchainConfigs.create({
      data: {
        id: entity.id,
        chainId: entity.chainId,
        rpcUrlBase: entity.rpcUrlBase,
        rpcUrlAlter: entity.rpcUrlAlter ?? null,
      },
    });
    return new BlockchainConfig(saved.id, saved.chainId, saved.rpcUrlBase, saved.rpcUrlAlter);
  }
  async upsert(entity: BlockchainConfig): Promise<BlockchainConfig> {
    const saved = await prisma.blockchainConfigs.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        chainId: entity.chainId,
        rpcUrlBase: entity.rpcUrlBase,
        rpcUrlAlter: entity.rpcUrlAlter ?? null,
      },
      update: {
        chainId: entity.chainId,
        rpcUrlBase: entity.rpcUrlBase,
        rpcUrlAlter: entity.rpcUrlAlter ?? null,
      },
    });
    return new BlockchainConfig(saved.id, saved.chainId, saved.rpcUrlBase, saved.rpcUrlAlter);
  }
  async findById(id: string): Promise<BlockchainConfig | null> {
    const e = await prisma.blockchainConfigs.findUnique({ where: { id } });
    return e ? new BlockchainConfig(e.id, e.chainId, e.rpcUrlBase, e.rpcUrlAlter) : null;
  }
  async filterConfigs(params: { id?: string; chainId?: number }): Promise<BlockchainConfig[]> {
    const where: Prisma.BlockchainConfigsWhereInput = {};
    if (params.id) where.id = params.id.toLowerCase();
    if (params.chainId) where.chainId = params.chainId;

    const list = await prisma.blockchainConfigs.findMany({
      where: {
        id: params.id,
        chainId: params.chainId,
      },
    });
    return list.map((e: any) => new BlockchainConfig(e.id, e.chainId, e.rpcUrlBase, e.rpcUrlAlter));
  }
  async findAll(): Promise<BlockchainConfig[]> {
    const list = await prisma.blockchainConfigs.findMany();
    return list.map((e: any) => new BlockchainConfig(e.id, e.chainId, e.rpcUrlBase, e.rpcUrlAlter));
  }
  async update(entity: BlockchainConfig): Promise<BlockchainConfig> {
    const saved = await prisma.blockchainConfigs.update({
      where: { id: entity.id },
      data: {
        chainId: entity.chainId,
        rpcUrlBase: entity.rpcUrlBase,
        rpcUrlAlter: entity.rpcUrlAlter ?? null,
      },
    });
    return new BlockchainConfig(saved.id, saved.chainId, saved.rpcUrlBase, saved.rpcUrlAlter);
  }
  async delete(id: string): Promise<void> {
    await prisma.blockchainConfigs.delete({ where: { id } });
  }
  // deprecated: use filterConfigs
}
