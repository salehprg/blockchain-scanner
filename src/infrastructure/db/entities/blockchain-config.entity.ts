import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlockchainContractEntity } from "./blockchain-contract.entity";

@Entity({ name: "BlockchainConfigs" })
export class BlockchainConfigEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ type: "int" })
  chainId!: number;

  @Column({ type: "text" })
  rpcUrlBase!: string;

  @Column({ type: "text", nullable: true })
  rpcUrlAlter!: string | null;

  @OneToMany(() => BlockchainContractEntity, c => c.config)
  contracts!: BlockchainContractEntity[];
}
