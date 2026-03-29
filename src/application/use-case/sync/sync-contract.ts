import { Address } from "viem";
import { IBlockchainContractRepository } from "@/domain/repository/blockchain-contract-repo.ts";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { ContractLogRecorder } from "@/application/services/contract-log-recorder";
import { INFTRepository } from "@/domain/repository/nft-repo";
import { ERC1155_Handler } from '../../../handlers/NFT/ERC1155_handler';
import { ERC721_Handler } from "@/handlers/NFT/ERC721_handler";
import { AdapterRegistery } from "@/chainAdapters/AdapterRegistery";
import { BaseEVMAdapter } from "@/chainAdapters/EVM/BaseEVMAdapter";
import { SolanaAdapter } from "@/chainAdapters/Solana/SolanaAdapter";
import { Solana_Handler } from "@/handlers/NFT/Solana_handler";
import { BlockchainContract } from "@/domain/entities/blockchain-contract";
import { HandlersRegistry } from '../../../handlers/HandlerRegistry';

const CHUNK = 1_000n;     // blocks per request (tune as needed)
const CONF = 5n;          // confirmations before considering final (tune)

export class SyncContracts {

  constructor(
    private readonly contractRepo: IBlockchainContractRepository,
    private readonly handlersRegistry: HandlersRegistry,
  ) {

  }

  async resyncContract(params: {
    contractAddress: Address;
    fromBlock: bigint;
    toBlock: bigint;
  }): Promise<void> {
    const contracts = await this.contractRepo.filterContracts({ contractAddress: params.contractAddress });
    if (contracts.length === 0) {
      console.warn(`[resync] No contract found for address ${params.contractAddress}`);
      return;
    }
    const c = contracts[0];

    this.contractRouting(c)

  }

  async execute(): Promise<void> {
    const contracts = await this.contractRepo.findAll()
    for (const c of contracts) {
      try {
        this.contractRouting(c)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async contractRouting(contractEntity: BlockchainContract) {
    await this.handlersRegistry.GetHandler(contractEntity.contractType).scanTransactions(contractEntity)
    await this.handlersRegistry.GetHandler(contractEntity.contractType).proccessLog(contractEntity)
  }

}
