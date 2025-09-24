import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlockchainConfigEntity } from "./blockchain-config.entity";
import { NFTOwnerEntity } from "./nft-owner.entity";

@Entity({ name: "BlockchainContracts" })
export class BlockchainContractEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 100 })
  contractAddress!: string;

  @Column({ type: "varchar", length: 20 })
  contractType!: "ERC721" | "ERC1155" | "OTHER";

  @Column({ type: "int" })
  chainId!: number;

  // store big blocks as text to avoid bigint issues across platforms
  @Column({ type: "text", nullable: true })
  lastSyncBlock!: string | null;

  @Column({ type: "timestamptz", nullable: true })
  lastSyncTime!: Date | null;

  @ManyToOne(() => BlockchainConfigEntity, cfg => cfg.contracts, { nullable: true, onDelete: "SET NULL" })
  config!: BlockchainConfigEntity | null;

  @OneToMany(() => NFTOwnerEntity, o => o.contract, { cascade: ["insert", "update"] })
  owners!: NFTOwnerEntity[];
}
