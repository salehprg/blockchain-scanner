import { INFTRepository } from "@/domain/repository/nft-repo";
import { NFT, NFTAttribute } from "@/domain/entities/nft";
import { prisma } from "@/infrastructure/db/prisma";
import { Prisma } from "@/generated/client";
import { mapNFTRecordToDTO, NFTDTO } from "@/domain/dto/nft.dto";

export class NFTRepository implements INFTRepository {
  constructor() { }

  private mapRecordToEntity(entity: any): NFT {
    const attributes: NFTAttribute[] | null = Array.isArray(entity?.attributes) ? (entity.attributes as NFTAttribute[]) : null;
    const raw: any | null = entity?.raw ?? null;

    return {
      id: entity.id,
      contractId: entity.contractId,
      contractAddress: entity.contractAddress?.toLowerCase(),
      tokenId: entity.tokenId?.toLowerCase(),
      tokenUri: entity.tokenUri ?? null,
      attributes,
      description: entity.description ?? null,
      externalUrl: entity.externalUrl ?? null,
      raw,
      image: entity.image ?? null,
      name: entity.name ?? null,
      metadataUpdated: !!entity.metadataUpdated,
      lastMetadataSyncTime: entity.lastMetadataSyncTime ?? null,
    } as NFT;
  }

  async create(entity: NFT): Promise<NFT> {
    const saved = await prisma.nFTs.create({
      data: {
        id: entity.id,
        contractId: entity.contractId,
        contractAddress: entity.contractAddress.toLowerCase(),
        tokenId: entity.tokenId.toLowerCase(),
        tokenUri: entity.tokenUri,
        metadataUpdated: entity.metadataUpdated,
        lastMetadataSyncTime: entity.lastMetadataSyncTime,
      },
    });
    return this.mapRecordToEntity(saved);
  }

  async upsert(entity: NFT): Promise<NFT> {
    const saved = await prisma.nFTs.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        contractId: entity.contractId,
        contractAddress: entity.contractAddress.toLowerCase(),
        tokenId: entity.tokenId.toLowerCase(),
        tokenUri: entity.tokenUri,
        attributes: entity.attributes === null ? Prisma.DbNull : entity.attributes,
        description: entity.description,
        externalUrl: entity.externalUrl,
        raw: entity.raw === null ? Prisma.DbNull : entity.raw,
        image: entity.image,
        name: entity.name,
        metadataUpdated: entity.metadataUpdated,
        lastMetadataSyncTime: entity.lastMetadataSyncTime,
      },
      update: {
        contractId: entity.contractId,
        contractAddress: entity.contractAddress.toLowerCase(),
        tokenId: entity.tokenId.toLowerCase(),
        tokenUri: entity.tokenUri,
        attributes: entity.attributes === null ? Prisma.DbNull : entity.attributes,
        description: entity.description,
        externalUrl: entity.externalUrl,
        raw: entity.raw === null ? Prisma.DbNull : entity.raw,
        image: entity.image,
        name: entity.name,
        metadataUpdated: entity.metadataUpdated,
        lastMetadataSyncTime: entity.lastMetadataSyncTime,
      },
    });
    return this.mapRecordToEntity(saved);
  }

  async upsertMany(items: NFT[]): Promise<void> {
    if (items.length === 0) return;
    await prisma.nFTs.createMany({
      data: items.map(i => ({
        id: i.id,
        contractId: i.contractId,
        contractAddress: i.contractAddress.toLowerCase(),
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
        where: { contractAddress: i.contractAddress.toLowerCase(), tokenId: i.tokenId.toLowerCase() },
        data: { tokenUri: i.tokenUri, metadataUpdated: i.metadataUpdated, lastMetadataSyncTime: i.lastMetadataSyncTime },
      });
    }
  }

  async findById(id: string): Promise<NFTDTO | null> {
    const entity = await prisma.nFTs.findUnique({ where: { id } });
    if (!entity) return null;
    return mapNFTRecordToDTO(entity);
  }

  async findAll(): Promise<NFT[]> {
    const list = await prisma.nFTs.findMany();
    return list.map(e => mapNFTRecordToDTO(e));
  }

  async filterNFTs(params: { id?: string; contractId?: string; contractAddress?: string; tokenId?: string }, options?: { limit?: number; offset?: number }): Promise<NFTDTO[]> {

    const where: Prisma.NFTsWhereInput = {};
    if (params.id) where.id = params.id.toLowerCase();
    if (params.contractId) where.contractId = params.contractId.toLowerCase();
    if (params.contractAddress) where.contractAddress = params.contractAddress.toLowerCase();
    if (params.tokenId) where.tokenId = params.tokenId.toLowerCase();

    const list = await prisma.nFTs.findMany({
      where,
      orderBy: { tokenId: "asc" },
      take: options?.limit,
      skip: options?.offset,
    });
    return list.map(e => mapNFTRecordToDTO(e));
  }

  async update(entity: NFT): Promise<NFT> {
    const saved = await prisma.nFTs.update({
      where: { id: entity.id },
      data: {
        contractId: entity.contractId,
        contractAddress: entity.contractAddress.toLowerCase(),
        tokenId: entity.tokenId.toLowerCase(),
        tokenUri: entity.tokenUri,
        metadataUpdated: entity.metadataUpdated,
        lastMetadataSyncTime: entity.lastMetadataSyncTime,
      },
    });
    return this.mapRecordToEntity(saved);
  }

  async delete(id: string): Promise<void> {
    await prisma.nFTs.delete({ where: { id } });
  }

  async resetMetadataFlag(contractAddress: string, tokenId: string): Promise<void> {
    await prisma.nFTs.updateMany({
      where: { contractAddress: contractAddress.toLowerCase(), tokenId: tokenId.toLowerCase() },
      data: { metadataUpdated: false },
    });
  }
}


