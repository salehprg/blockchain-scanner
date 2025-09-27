import { Repository } from "typeorm";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { NFTOwnerMapper } from "../mapper/nft-owner.mapper";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { NFTOwnerEntity } from "../db/entities/nft-owner.entity";

export class NFTOwnerRepository implements INFTOwnerRepository {
  constructor(private readonly ormRepo: Repository<NFTOwnerEntity>) {}

  async create(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await this.ormRepo.save(NFTOwnerMapper.toEntity(entity));
    return NFTOwnerMapper.toDomain(saved);
  }
  async upsert(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await this.ormRepo.save(NFTOwnerMapper.toEntity(entity));
    return NFTOwnerMapper.toDomain(saved);
  }
  async findById(id: string): Promise<NFTOwner | null> {
    const e = await this.ormRepo.findOne({ where: { id } });
    return e ? NFTOwnerMapper.toDomain(e) : null;
  }
  async findAll(): Promise<NFTOwner[]> {
    const list = await this.ormRepo.find();
    return list.map(NFTOwnerMapper.toDomain);
  }
  async update(entity: NFTOwner): Promise<NFTOwner> {
    const saved = await this.ormRepo.save(NFTOwnerMapper.toEntity(entity));
    return NFTOwnerMapper.toDomain(saved);
  }
  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
  async findByOwnerAndItem(owner: string, nftContractAddress: string, nftItemId: string): Promise<NFTOwner | null> {
    const e = await this.ormRepo.findOne({ where: { ownerAddress: owner.toLowerCase(), nftContractAddress: nftContractAddress.toLowerCase(), nftItemId: nftItemId.toLowerCase() } });
    return e ? NFTOwnerMapper.toDomain(e) : null;
  }
  async findByContractAddress(contractAddress: string): Promise<NFTOwner[]> {
    const list = await this.ormRepo.find({ where: { nftContractAddress: contractAddress.toLowerCase() } });
    return list.map(NFTOwnerMapper.toDomain);
  }
}
