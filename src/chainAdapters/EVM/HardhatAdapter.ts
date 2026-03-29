import { Transfer1155SingleLog } from '@/handlers/NFT/ERC1155_handler';
import { Transfer721Log } from '@/handlers/NFT/ERC721_handler';
import { ERC1155_TRANSFER_SINGLE_EVENT, ERC721_TRANSFER_EVENT, ZERO_ADDRESS } from '@/infrastructure/blockchain/evm-events';
import { Abi, Address, createPublicClient, defineChain, http, PublicClient } from 'viem';
import { BaseEVMAdapter } from './BaseEVMAdapter';

const hardhat = defineChain({
    id: 5777,
    name: 'Hardhat',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['http://127.0.0.1:8545/'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.somnia.network/' },
    },
    contracts: {},
})

export type LogReturn = {
    logs: any[],
    latest_block: bigint
}

export class HardhatAdapter extends BaseEVMAdapter {
    client: PublicClient

    async readContract<T = unknown>(address: `0x${string}`, abi: Abi, functionName: string, args?: any[]): Promise<T> {
        return await this.client.readContract({
            address: address as Address,
            abi: abi,
            functionName: functionName as any,
            args: args as any
        }) as Promise<T>;
    }

    constructor() {
        super();
        this.client = createPublicClient({ ...hardhat, chain: { nativeCurrency: hardhat.nativeCurrency, id: hardhat.id, name: hardhat.name, rpcUrls: hardhat.rpcUrls }, transport: http(hardhat.rpcUrls.default.http[0]) });
    }

}