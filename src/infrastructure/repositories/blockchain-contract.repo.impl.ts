import { Repository } from "typeorm";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { BlockchainContractMapper } from "../mapper/blockchain-contract.mapper";
import { BlockchainContractEntity } from "../db/entities/blockchain-contract.entity";

export class BlockchainContractRepository implements IBlockchainContractRepository {
  constructor(private readonly ormRepo: Repository<BlockchainContractEntity>) {}

  async create(entity: BlockchainContract): Promise<BlockchainContract> {
    const saved = await this.ormRepo.save(BlockchainContractMapper.toEntity(entity));
    return BlockchainContractMapper.toDomain(saved);
  }
  async upsert(entity: BlockchainContract): Promise<BlockchainContract> {
    const saved = await this.ormRepo.save(BlockchainContractMapper.toEntity(entity));
    return BlockchainContractMapper.toDomain(saved);
  }
  async findById(id: string): Promise<BlockchainContract | null> {
    const e = await this.ormRepo.findOne({ where: { id } });
    return e ? BlockchainContractMapper.toDomain(e) : null;
  }
  async findAll(): Promise<BlockchainContract[]> {
    const list = await this.ormRepo.find();
    return list.map(BlockchainContractMapper.toDomain);
  }
  async update(entity: BlockchainContract): Promise<BlockchainContract> {
    const saved = await this.ormRepo.save(BlockchainContractMapper.toEntity(entity));
    return BlockchainContractMapper.toDomain(saved);
  }
  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
  async findByAddress(address: string): Promise<BlockchainContract | null> {
    const e = await this.ormRepo.findOne({ where: { contractAddress: address } });
    return e ? BlockchainContractMapper.toDomain(e) : null;
  }
  async findByChainId(chainId: number): Promise<BlockchainContract[]> {
    const list = await this.ormRepo.find({ where: { chainId } });
    return list.map(BlockchainContractMapper.toDomain);
  }
}
