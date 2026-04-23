import { ERC721_Handler } from "./NFT/ERC721_handler";
import { ERC1155_Handler } from "./NFT/ERC1155_handler";
import { Solana_Handler } from "./NFT/Solana_handler";
import { AppContainer } from "@/main/container";
import { AdapterRegistery } from '../chainAdapters/AdapterRegistery';
import { Payment_Handler } from "./NFT/Payment_handler";
import { ContractType } from '../domain/entities/blockchain-contract';
import { BaseHandler } from "./BaseHandler";

export class HandlersRegistry {
    registers: Map<ContractType, BaseHandler>

    constructor(private readonly adapterRegistry: AdapterRegistery) {
        this.registers = new Map<ContractType, BaseHandler>();
    }

    RegisterSolana(appContainer: AppContainer) {
        this.registers.set("SOLANA", new Solana_Handler(appContainer, this.adapterRegistry))
    }
    RegisterERC1155(appContainer: AppContainer) {
        this.registers.set("ERC1155", new ERC1155_Handler(appContainer, this.adapterRegistry))
    }
    RegisterERC721(appContainer: AppContainer) {
        this.registers.set("ERC721", new ERC721_Handler(appContainer, this.adapterRegistry))
    }
    RegisterChestERC721(appContainer: AppContainer) {
        this.registers.set("CHEST_ERC721", new ERC721_Handler(appContainer, this.adapterRegistry))
    }
    RegisterPayment(appContainer: AppContainer) {
        this.registers.set("PAYMENT", new Payment_Handler(appContainer, this.adapterRegistry))
    }

    GetHandler(contractType: ContractType) {
        var result = this.registers.get(contractType)
        if (!result)
            throw new Error("Contract handler not exist")

        return result
    }
}