import { Abi, Address, createPublicClient, defineChain, http, PublicClient } from 'viem';
import { BaseEVMAdapter } from './BaseEVMAdapter';
import { AdapterTransaction } from '../AdapterTransaction';

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

    async getLogsViaAPI(
        _contractAddress: string,
        _urlRequest: string,
        _fromBlock: bigint
    ): Promise<AdapterTransaction[]> {
        return []
    }

}