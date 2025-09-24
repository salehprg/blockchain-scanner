import { Repository } from "typeorm";
import { BlockchainConfig } from "@/domain/entities/blockchain-config";
import { BlockchainConfigEntity } from "@/infrastructure/db/entities/blockchain-config.entity";
import { BlockchainConfigMapper } from "../mapper/blockchain-config.mapper";
import { IBlockchainConfigRepository } from "@/domain/repository/blockchain-config-repo";

export class BlockchainConfigRepository implements IBlockchainConfigRepository {
  constructor(private readonly ormRepo: Repository<BlockchainConfigEntity>) {}

  async create(entity: BlockchainConfig): Promise<BlockchainConfig> {
    const saved = await this.ormRepo.save(BlockchainConfigMapper.toEntity(entity));
    return BlockchainConfigMapper.toDomain(saved);
    }
  async upsert(entity: BlockchainConfig): Promise<BlockchainConfig> {
    const saved = await this.ormRepo.save(BlockchainConfigMapper.toEntity(entity));
    return BlockchainConfigMapper.toDomain(saved);
  }
  async findById(id: string): Promise<BlockchainConfig | null> {
    const e = await this.ormRepo.findOne({ where: { id } });
    return e ? BlockchainConfigMapper.toDomain(e) : null;
  }
  async findAll(): Promise<BlockchainConfig[]> {
    const list = await this.ormRepo.find();
    return list.map(BlockchainConfigMapper.toDomain);
  }
  async update(entity: BlockchainConfig): Promise<BlockchainConfig> {
    const saved = await this.ormRepo.save(BlockchainConfigMapper.toEntity(entity));
    return BlockchainConfigMapper.toDomain(saved);
  }
  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
  async findByChainId(chainId: number): Promise<BlockchainConfig | null> {
    const e = await this.ormRepo.findOne({ where: { chainId } });
    return e ? BlockchainConfigMapper.toDomain(e) : null;
  }
}
