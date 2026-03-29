import { HardhatAdapter } from "./EVM/HardhatAdapter"
import { SomniaAdapter } from "./EVM/SomniaAdapter"
import { SolanaAdapter } from "./Solana/SolanaAdapter"

export class AdapterRegistery {
    somnia: SomniaAdapter
    hardHat: HardhatAdapter
    solana: SolanaAdapter

    constructor() {
        this.somnia = new SomniaAdapter()
        this.hardHat = new HardhatAdapter()
        this.solana = new SolanaAdapter()
    }

    Get(chainId: number) {
        switch (chainId) {
            case 5031:
                return this.somnia
            case 17172:
                return this.solana
            case 5777:
                return this.hardHat
            default:
                throw new Error("ChainID not found in Adapter registry");
        }
    }

}
