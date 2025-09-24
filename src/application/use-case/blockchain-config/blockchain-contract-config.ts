import { IBlockchainContractRepository } from "../../../domain/repository/blockchain-contract-repo.ts";

export class DeleteBlockchainContract {
  constructor(private readonly repo: IBlockchainContractRepository) {}

  execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}