import { mapNFTOwnerRecordToDTO, NFTOwnerDTO } from "@/domain/dto/nft-owner.dto";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { NFT } from "@/domain/entities/nft";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { Prisma } from "@/generated/client";
import { prisma } from "@/infrastructure/db/prisma";

export class NFTOwnerRepository implements INFTOwnerRepository {
  constructor() { }

  private mapRecordToEntity(e: any): NFTOwner {
    const owner = new NFTOwner(
      e.id,
      e.contractId,
      e.ownerAddress,
      e.contractAddress,
      e.tokenId,
      BigInt(e.count ?? "0"),
      e.lastTransactionHash ?? null,
      e.lastSyncTime ?? null,
    );
    
    if (e.nft) {
      owner.nft = new NFT(
        e.nft.id,
        e.nft.contractId,
        e.nft.contractAddress,
        e.nft.tokenId,
        e.nft.tokenUri ?? null,
        !!e.nft.metadataUpdated,
        e.nft.lastMetadataSyncTime ?? null,
        e.nft.name ?? null,
        e.nft.description ?? null,
        e.nft.image ?? null,
        e.nft.externalUrl ?? null,
        Array.isArray(e.nft.attributes) ? e.nft.attributes : null,
        null
      );
    }
    
    return owner;
  }

  async create(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await prisma.nFTOwners.create({
      data: {
        id: entity.id,
        contractId: entity.contractId,
        ownerAddress: entity.ownerAddress,
        contractAddress: entity.contractAddress,
        tokenId: entity.tokenId,
        count: entity.count.toString(),
        lastTransactionHash: entity.lastTransactionHash,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return this.mapRecordToEntity(saved);
  }
  async upsert(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await prisma.nFTOwners.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        contractId: entity.contractId,
        ownerAddress: entity.ownerAddress,
        contractAddress: entity.contractAddress,
        tokenId: entity.tokenId,
        count: entity.count.toString(),
        lastTransactionHash: entity.lastTransactionHash,
        lastSyncTime: entity.lastSyncTime,
      },
      update: {
        contractId: entity.contractId,
        ownerAddress: entity.ownerAddress,
        contractAddress: entity.contractAddress,
        tokenId: entity.tokenId,
        count: entity.count.toString(),
        lastTransactionHash: entity.lastTransactionHash,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return this.mapRecordToEntity(saved);
  }
  async findById(id: string): Promise<NFTOwner | null> {
    const e = await prisma.nFTOwners.findUnique({
      where: { id },
      include: { nft: true },
    });
    return e ? this.mapRecordToEntity(e) : null;
  }
  async findAll(): Promise<NFTOwner[]> {
    const list = await prisma.nFTOwners.findMany({ include: { nft: true } });
    return list.map(e => this.mapRecordToEntity(e));
  }
  async update(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await prisma.nFTOwners.update({
      where: { id: entity.id },
      data: {
        contractId: entity.contractId,
        ownerAddress: entity.ownerAddress,
        contractAddress: entity.contractAddress,
        tokenId: entity.tokenId,
        count: entity.count.toString(),
        lastTransactionHash: entity.lastTransactionHash,
        lastSyncTime: entity.lastSyncTime,
      },
    });
    return this.mapRecordToEntity(saved);
  }
  async delete(id: string): Promise<void> {
    await prisma.nFTOwners.delete({ where: { id } });
  }

  async filterOwners(params: { contractAddress?: string; ownerAddress?: string; tokenId?: string }): Promise<NFTOwner[]> {
    const where: Prisma.NFTOwnersWhereInput = {};
    if (params.contractAddress) where.contractAddress = { equals: params.contractAddress, mode: 'insensitive' };
    if (params.ownerAddress) where.ownerAddress = { equals: params.ownerAddress, mode: 'insensitive' };
    if (params.tokenId) where.tokenId = { equals: params.tokenId, mode: 'insensitive' };

    const list = await prisma.nFTOwners.findMany({ where, include: { nft: true } });
    return list.map(e => this.mapRecordToEntity(e));
  }
}
