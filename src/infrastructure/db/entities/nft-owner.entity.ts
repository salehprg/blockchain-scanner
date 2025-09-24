import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BlockchainContractEntity } from "./blockchain-contract.entity";

@Entity({ name: "NFTOwners" })
@Index(["contractId"])
@Index(["ownerAddress", "nftContractAddress", "nftItemId"], { unique: false })
export class NFTOwnerEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  contractId!: string;

  @ManyToOne(() => BlockchainContractEntity, c => c.owners, { onDelete: "CASCADE" })
  contract!: BlockchainContractEntity;

  @Column({ type: "varchar", length: 100 })
  ownerAddress!: string;

  @Column({ type: "varchar", length: 100 })
  nftContractAddress!: string;

  @Column({ type: "text" })
  nftItemId!: string;

  @Column({ type: "int" })
  count!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  lastTransactionHash!: string | null;

  @Column({ type: "timestamptz", nullable: true })
  lastSyncTime!: Date | null;
}
