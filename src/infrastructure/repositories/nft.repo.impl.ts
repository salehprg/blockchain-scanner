import { INFTRepository } from "@/domain/repository/nft-repo";
import { NFT } from "@/domain/entities/nft";
import { prisma } from "@/infrastructure/db/prisma";
import { Prisma } from "@/generated/client";

export class NFTRepository implements INFTRepository {
  constructor() { }

  async create(entity: NFT): Promise<NFT> {
    const saved = await prisma.nFTs.create({
      data: {
        id: entity.id,
        contractId: entity.contractId,
        nftContractAddress: entity.nftContractAddress.toLowerCase(),
        tokenId: entity.tokenId.toLowerCase(),
        tokenUri: entity.tokenUri,
        metadataUpdated: entity.metadataUpdated,
        lastMetadataSyncTime: entity.lastMetadataSyncTime,
      },
    });
    return new NFT(saved.id, saved.contractId, saved.nftContractAddress, saved.tokenId, saved.tokenUri, saved.metadataUpdated, saved.lastMetadataSyncTime);
  }

  async upsert(entity: NFT): Promise<NFT> {
    const saved = await prisma.nFTs.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        contractId: entity.contractId,
        nftContractAddress: entity.nftContractAddress.toLowerCase(),
        tokenId: entity.tokenId.toLowerCase(),
        tokenUri: entity.tokenUri,
        metadataUpdated: entity.metadataUpdated,
        lastMetadataSyncTime: entity.lastMetadataSyncTime,
      },
      update: {
        contractId: entity.contractId,
        nftContractAddress: entity.nftContractAddress.toLowerCase(),
        tokenId: entity.tokenId.toLowerCase(),
        tokenUri: entity.tokenUri,
        metadataUpdated: entity.metadataUpdated,
        lastMetadataSyncTime: entity.lastMetadataSyncTime,
      },
    });
    return new NFT(saved.id, saved.contractId, saved.nftContractAddress, saved.tokenId, saved.tokenUri, saved.metadataUpdated, saved.lastMetadataSyncTime);
  }

  async upsertMany(items: NFT[]): Promise<void> {
    if (items.length === 0) return;
    await prisma.nFTs.createMany({
      data: items.map(i => ({
        id: i.id,
        contractId: i.contractId,
        nftContractAddress: i.nftContractAddress.toLowerCase(),
        tokenId: i.tokenId.toLowerCase(),
        tokenUri: i.tokenUri,
        metadataUpdated: i.metadataUpdated,
        lastMetadataSyncTime: i.lastMetadataSyncTime,
      })),
      skipDuplicates: true,
    });
    // For updates on conflict: perform follow-up updates where metadataUpdated or tokenUri changed
    // This keeps logic simple without DB-specific upsert updates.
    for (const i of items) {
      await prisma.nFTs.updateMany({
        where: { nftContractAddress: i.nftContractAddress.toLowerCase(), tokenId: i.tokenId.toLowerCase() },
        data: { tokenUri: i.tokenUri, metadataUpdated: i.metadataUpdated, lastMetadataSyncTime: i.lastMetadataSyncTime },
      });
    }
  }

  async findById(id: string): Promise<NFT | null> {
    const e = await prisma.nFTs.findUnique({ where: { id } });
    return e ? new NFT(e.id, e.contractId, e.nftContractAddress, e.tokenId, e.tokenUri, e.metadataUpdated, e.lastMetadataSyncTime) : null;
  }

  async findAll(): Promise<NFT[]> {
    const list = await prisma.nFTs.findMany();
    return list.map((e: any) => new NFT(e.id, e.contractId, e.nftContractAddress, e.tokenId, e.tokenUri, e.metadataUpdated, e.lastMetadataSyncTime));
  }

  async filterNFTs(params: { id?: string; contractId?: string; contractAddress?: string; tokenId?: string }, options?: { limit?: number; offset?: number }): Promise<NFT[]> {

    const where: Prisma.NFTsWhereInput = {};
    if (params.id) where.id = params.id.toLowerCase();
    if (params.contractId) where.contractId = params.contractId.toLowerCase();
    if (params.contractAddress) where.nftContractAddress = params.contractAddress.toLowerCase();
    if (params.tokenId) where.tokenId = params.tokenId.toLowerCase();

    const list = await prisma.nFTs.findMany({
      where,
      orderBy: { tokenId: "asc" },
      take: options?.limit,
      skip: options?.offset,
    });
    return list.map((e: any) => new NFT(e.id, e.contractId, e.nftContractAddress, e.tokenId, e.tokenUri, e.metadataUpdated, e.lastMetadataSyncTime));
  }

  async update(entity: NFT): Promise<NFT> {
    const saved = await prisma.nFTs.update({
      where: { id: entity.id },
      data: {
        contractId: entity.contractId,
        nftContractAddress: entity.nftContractAddress.toLowerCase(),
        tokenId: entity.tokenId.toLowerCase(),
        tokenUri: entity.tokenUri,
        metadataUpdated: entity.metadataUpdated,
        lastMetadataSyncTime: entity.lastMetadataSyncTime,
      },
    });
    return new NFT(saved.id, saved.contractId, saved.nftContractAddress, saved.tokenId, saved.tokenUri, saved.metadataUpdated, saved.lastMetadataSyncTime);
  }

  async delete(id: string): Promise<void> {
    await prisma.nFTs.delete({ where: { id } });
  }

  async resetMetadataFlag(contractAddress: string, tokenId: string): Promise<void> {
    await prisma.nFTs.updateMany({
      where: { nftContractAddress: contractAddress.toLowerCase(), tokenId: tokenId.toLowerCase() },
      data: { metadataUpdated: false },
    });
  }
}


