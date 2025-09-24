import "reflect-metadata";
import { DataSource } from "typeorm";
import { BlockchainConfigEntity } from "./entities/blockchain-config.entity";
import { BlockchainContractEntity } from "./entities/blockchain-contract.entity";
import { NFTOwnerEntity } from "./entities/nft-owner.entity";
import { envs } from "@/env";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DB_HOST,
    port: Number(envs.DB_PORT ?? 5432),
    username: envs.DB_USER,
    password: envs.DB_PASS,
    database: envs.DB_NAME,
    entities: [BlockchainConfigEntity, BlockchainContractEntity, NFTOwnerEntity],
    synchronize: true, // DEV ONLY. Use migrations in production.
    logging: false
});
