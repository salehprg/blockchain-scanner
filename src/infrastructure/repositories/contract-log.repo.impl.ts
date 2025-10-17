import { Repository } from "typeorm";
import { ContractLog } from "@/domain/entities/contract-log";
import { IContractLogRepository } from "@/domain/repository/contract-log-repo";
import { ContractLogEntity } from "@/infrastructure/db/entities/contract-log.entity";
import { ContractLogMapper } from "@/infrastructure/mapper/contract-log.mapper";

export class ContractLogRepository implements IContractLogRepository {
  constructor(private readonly ormRepo: Repository<ContractLogEntity>) {}

  async create(entity: ContractLog): Promise<ContractLog> {
    const saved = await this.ormRepo.save(ContractLogMapper.toEntity(entity));
    return ContractLogMapper.toDomain(saved);
  }
  async upsert(entity: ContractLog): Promise<ContractLog> {
    const saved = await this.ormRepo.save(ContractLogMapper.toEntity(entity));
    return ContractLogMapper.toDomain(saved);
  }
  async findById(id: string): Promise<ContractLog | null> {
    const e = await this.ormRepo.findOne({ where: { id } });
    return e ? ContractLogMapper.toDomain(e) : null;
  }
  async findAll(): Promise<ContractLog[]> {
    const list = await this.ormRepo.find({ order: { loggedAt: "DESC" } });
    return list.map(ContractLogMapper.toDomain);
  }
  async update(entity: ContractLog): Promise<ContractLog> {
    const saved = await this.ormRepo.save(ContractLogMapper.toEntity(entity));
    return ContractLogMapper.toDomain(saved);
  }
  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async bulkInsert(logs: ContractLog[]): Promise<void> {
    if (logs.length === 0) return;
    const entities = logs.map(ContractLogMapper.toEntity);
    await this.ormRepo
      .createQueryBuilder()
      .insert()
      .into(ContractLogEntity)
      .values(entities as any)
      .orIgnore() // rely on unique (txHash, logIndex)
      .execute();
  }

  async findByContractAddress(
    contractAddress: string,
    options?: { fromDate?: Date; toDate?: Date; limit?: number; offset?: number }
  ): Promise<ContractLog[]> {
    const qb = this.ormRepo.createQueryBuilder("log").where("log.nftContractAddress = :contractAddress", { contractAddress });
    if (options?.fromDate) qb.andWhere("log.loggedAt >= :from", { from: options.fromDate });
    if (options?.toDate) qb.andWhere("log.loggedAt <= :to", { to: options.toDate });
    qb.orderBy("log.loggedAt", "DESC");
    if (options?.limit) qb.limit(options.limit);
    if (options?.offset) qb.offset(options.offset);
    const list = await qb.getMany();
    return list.map(ContractLogMapper.toDomain);
  }

  async findByContractId(
    contractId: string,
    options?: { fromDate?: Date; toDate?: Date; limit?: number; offset?: number }
  ): Promise<ContractLog[]> {
    const qb = this.ormRepo.createQueryBuilder("log").where("log.contractId = :contractId", { contractId });
    if (options?.fromDate) qb.andWhere("log.loggedAt >= :from", { from: options.fromDate });
    if (options?.toDate) qb.andWhere("log.loggedAt <= :to", { to: options.toDate });
    qb.orderBy("log.loggedAt", "DESC");
    if (options?.limit) qb.limit(options.limit);
    if (options?.offset) qb.offset(options.offset);
    const list = await qb.getMany();
    return list.map(ContractLogMapper.toDomain);
  }
}


