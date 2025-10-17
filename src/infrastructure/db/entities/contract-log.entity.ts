import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlockchainContractEntity } from "./blockchain-contract.entity";

@Entity({ name: "ContractLogs" })
@Index(["contractId", "blockNumber" as any])
@Index(["transactionHash", "logIndex"], { unique: true })
export class ContractLogEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  contractId!: string;

  @ManyToOne(() => BlockchainContractEntity, c => c.id, { onDelete: "CASCADE" })
  contract!: BlockchainContractEntity;

  @Column({ type: "int" })
  chainId!: number;

  @Column({ type: "varchar", length: 100 })
  nftContractAddress!: string;

  // store big blocks as text for portability
  @Column({ type: "text" })
  blockNumber!: string;

  @Column({ type: "varchar", length: 100 })
  transactionHash!: string;

  @Column({ type: "int" })
  logIndex!: number;

  @Column({ type: "varchar", length: 50 })
  eventType!: string; // enum-like

  @Column({ type: "varchar", length: 100, nullable: true })
  fromAddress!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  toAddress!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  operatorAddress!: string | null;

  @Column({ type: "text", nullable: true })
  tokenId!: string | null;

  @Column({ type: "text", nullable: true })
  value!: string | null;

  @Column({ type: "timestamptz" })
  loggedAt!: Date;
}


