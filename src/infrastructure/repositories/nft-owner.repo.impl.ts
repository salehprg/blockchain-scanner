import { NFTOwner } from "@/domain/entities/nft-owner";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { Prisma } from "@/generated/client";
import { prisma } from "@/infrastructure/db/prisma";

export class NFTOwnerRepository implements INFTOwnerRepository {
  constructor() { }

  async create(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await prisma.nFTOwners.create({
      data: {
        id: entity.id,
        contractId: entity.contractId,
        ownerAddress: entity.ownerAddress.toLowerCase(),
        nftContractAddress: entity.nftContractAddress.toLowerCase(),
        nftItemId: entity.nftItemId.toLowerCase(),
        count: entity.count,
        lastTransactionHash: entity.lastTransactionHash,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return new NFTOwner(saved.id, saved.contractId, saved.ownerAddress, saved.nftContractAddress, saved.nftItemId, saved.count, saved.lastTransactionHash, saved.lastSyncTime);
  }
  async upsert(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await prisma.nFTOwners.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        contractId: entity.contractId,
        ownerAddress: entity.ownerAddress.toLowerCase(),
        nftContractAddress: entity.nftContractAddress.toLowerCase(),
        nftItemId: entity.nftItemId.toLowerCase(),
        count: entity.count,
        lastTransactionHash: entity.lastTransactionHash,
        lastSyncTime: entity.lastSyncTime,
      },
      update: {
        contractId: entity.contractId,
        ownerAddress: entity.ownerAddress.toLowerCase(),
        nftContractAddress: entity.nftContractAddress.toLowerCase(),
        nftItemId: entity.nftItemId.toLowerCase(),
        count: entity.count,
        lastTransactionHash: entity.lastTransactionHash,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return new NFTOwner(saved.id, saved.contractId, saved.ownerAddress, saved.nftContractAddress, saved.nftItemId, saved.count, saved.lastTransactionHash, saved.lastSyncTime);
  }
  async findById(id: string): Promise<NFTOwner | null> {
    const e = await prisma.nFTOwners.findUnique({ where: { id } });
    return e ? new NFTOwner(e.id, e.contractId, e.ownerAddress, e.nftContractAddress, e.nftItemId, e.count, e.lastTransactionHash, e.lastSyncTime) : null;
  }
  async findAll(): Promise<NFTOwner[]> {
    const list = await prisma.nFTOwners.findMany();
    return list.map(e => new NFTOwner(e.id, e.contractId, e.ownerAddress, e.nftContractAddress, e.nftItemId, e.count, e.lastTransactionHash, e.lastSyncTime));
  }
  async update(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await prisma.nFTOwners.update({
      where: { id: entity.id },
      data: {
        contractId: entity.contractId,
        ownerAddress: entity.ownerAddress.toLowerCase(),
        nftContractAddress: entity.nftContractAddress.toLowerCase(),
        nftItemId: entity.nftItemId.toLowerCase(),
        count: entity.count,
        lastTransactionHash: entity.lastTransactionHash,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return new NFTOwner(saved.id, saved.contractId, saved.ownerAddress, saved.nftContractAddress, saved.nftItemId, saved.count, saved.lastTransactionHash, saved.lastSyncTime);
  }
  async delete(id: string): Promise<void> {
    await prisma.nFTOwners.delete({ where: { id } });
  }
  
  async filterOwners(params: { contractAddress?: string; ownerAddress?: string; tokenId?: string }): Promise<NFTOwner[]> {
    const where: Prisma.NFTOwnersWhereInput = {};
    if (params.contractAddress) where.nftContractAddress = params.contractAddress.toLowerCase();
    if (params.ownerAddress) where.ownerAddress = params.ownerAddress.toLowerCase();
    if (params.tokenId) where.nftItemId = params.tokenId.toLowerCase();

    const list = await prisma.nFTOwners.findMany({ where });
    return list.map(e => new NFTOwner(e.id, e.contractId, e.ownerAddress, e.nftContractAddress, e.nftItemId, e.count, e.lastTransactionHash, e.lastSyncTime));
  }
}
