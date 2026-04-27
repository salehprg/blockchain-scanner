import { HardhatAdapter } from "./EVM/HardhatAdapter"
import { SomniaAdapter } from "./EVM/SomniaAdapter"
import { SolanaAdapter } from "./Solana/SolanaAdapter"
import { BaseEVMAdapter } from './EVM/BaseEVMAdapter';
import { MegaethAdapter } from "./EVM/MegaethAdapter";

export class AdapterRegistery {
    megaeth: BaseEVMAdapter
    somnia: SomniaAdapter
    hardHat: HardhatAdapter
    solana: SolanaAdapter

    constructor() {
        this.megaeth = new MegaethAdapter()
        this.somnia = new SomniaAdapter()
        this.hardHat = new HardhatAdapter()
        this.solana = new SolanaAdapter()
    }

    Get(chainId: number) {
        switch (chainId) {
            case 4326:
                return this.megaeth
            case 5031:
                return this.somnia
            case 17172:
                return this.solana
            case 5777:
                return this.hardHat
            default:
                throw new Error(`${chainId} ChainID not found in Adapter registry`);
        }
    }

}
