import { Address } from "viem";
import { BlockchainContract, ContractType } from "@/domain/entities/blockchain-contract";

export type ContractBrief = { id: string; address: Address; type: ContractType; chainId: number };

export interface IContractLister {
  listContracts(): Promise<BlockchainContract[]>;
}


