import { INFTMetadataRepository } from "@/domain/repository/nft-metadata-repo";
import { NFTMetadata } from "@/domain/entities/nft-metadata";
import { prisma } from "@/infrastructure/db/prisma";
import { Prisma } from "@/generated/client";

export class NFTMetadataRepository implements INFTMetadataRepository {
  constructor() { }

  async create(entity: NFTMetadata): Promise<NFTMetadata> {
    const saved = await prisma.nFTMetadata.create({
      data: {
        id: entity.id,
        nftId: entity.nftId,
        name: entity.name,
        description: entity.description,
        image: entity.image,
        externalUrl: entity.externalUrl,
        attributes: entity.attributes as any,
        raw: entity.raw as any,
      },
    });
    return new NFTMetadata(saved.id, saved.nftId, saved.name, saved.description, saved.image, saved.externalUrl, (saved.attributes as any) ?? null, saved.raw as any);
  }

  async upsert(entity: NFTMetadata): Promise<NFTMetadata> {
    const saved = await prisma.nFTMetadata.upsert({
      where: { id: entity.id },
      create: {
        id: entity.id,
        nftId: entity.nftId,
        name: entity.name,
        description: entity.description,
        image: entity.image,
        externalUrl: entity.externalUrl,
        attributes: entity.attributes as any,
        raw: entity.raw as any,
      },
      update: {
        nftId: entity.nftId,
        name: entity.name,
        description: entity.description,
        image: entity.image,
        externalUrl: entity.externalUrl,
        attributes: entity.attributes as any,
        raw: entity.raw as any,
      },
    });
    return new NFTMetadata(saved.id, saved.nftId, saved.name, saved.description, saved.image, saved.externalUrl, (saved.attributes as any) ?? null, saved.raw as any);
  }

  async findById(id: string): Promise<NFTMetadata | null> {
    const e = await prisma.nFTMetadata.findUnique({ where: { id } });
    return e ? new NFTMetadata(e.id, e.nftId, e.name, e.description, e.image, e.externalUrl, (e.attributes as any) ?? null, e.raw as any) : null;
  }

  async findAll(): Promise<NFTMetadata[]> {
    const list = await prisma.nFTMetadata.findMany();
    return list.map((e: any) => new NFTMetadata(e.id, e.nftId, e.name, e.description, e.image, e.externalUrl, (e.attributes as any) ?? null, e.raw as any));
  }

  async filterNFTMetadata(params: { id?: string; nftId?: string; name?: string }): Promise<NFTMetadata[]> {
    const where: Prisma.NFTMetadataWhereInput = {};
    if (params.id) where.id = params.id.toLowerCase();
    if (params.nftId) where.nftId = params.nftId.toLowerCase();
    if (params.name) where.name = params.name.toLowerCase();

    const list = await prisma.nFTMetadata.findMany({
      where
    });
    return list.map((e: any) => new NFTMetadata(e.id, e.nftId, e.name, e.description, e.image, e.externalUrl, (e.attributes as any) ?? null, e.raw as any));
  }

  async update(entity: NFTMetadata): Promise<NFTMetadata> {
    const saved = await prisma.nFTMetadata.update({
      where: { id: entity.id },
      data: {
        nftId: entity.nftId,
        name: entity.name,
        description: entity.description,
        image: entity.image,
        externalUrl: entity.externalUrl,
        attributes: entity.attributes as any,
        raw: entity.raw as any,
      },
    });
    return new NFTMetadata(saved.id, saved.nftId, saved.name, saved.description, saved.image, saved.externalUrl, (saved.attributes as any) ?? null, saved.raw as any);
  }

  async delete(id: string): Promise<void> {
    await prisma.nFTMetadata.delete({ where: { id } });
  }
}


