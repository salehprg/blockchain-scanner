import { IContractLister, ContractBrief } from "@/domain/ports/contract-lister";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { Address } from "viem";
import { BlockchainContract, ContractType } from "@/domain/entities/blockchain-contract";

export class ContractLister implements IContractLister {
  constructor(private readonly contractRepo: IBlockchainContractRepository) {}

  async listContracts(): Promise<BlockchainContract[]> {
    const contracts = (await this.contractRepo.findAll()).filter(c => c.chainId != 0);
    return contracts;
  }
}


