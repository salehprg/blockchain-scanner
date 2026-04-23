import { ERC1155_TRANSFER_SINGLE_EVENT, ERC721_TRANSFER_EVENT, ZERO_ADDRESS } from '@/infrastructure/blockchain/evm-events';
import { Abi, AbiEvent, Address, createPublicClient, defineChain, http, PublicClient } from 'viem';
import { BaseEVMAdapter, GetLogsResult } from './BaseEVMAdapter';
import { bigint } from 'zod';
import { AdapterTransaction } from '../AdapterTransaction';

const somnia = defineChain({
    id: 5031,
    name: 'Somnia',
    nativeCurrency: {
        decimals: 18,
        name: 'Somi',
        symbol: 'SOMI',
    },
    rpcUrls: {
        default: {
            http: ['https://api.infra.mainnet.somnia.network/'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.somnia.network/' },
    },
    contracts: {
        multicall3: {
            address: '0x5e44F178E8cF9B2F5409B6f18ce936aB817C5a11',
            blockCreated: 38516341,
        },
    },
})

export type LogReturn = {
    logs: any[],
    latest_block: bigint
}

export class SomniaAdapter extends BaseEVMAdapter {
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
        this.client = createPublicClient({ ...somnia, transport: http(somnia.rpcUrls.default.http[0]) });
    }

    override async getLogs<TEvent extends AbiEvent>(address: `0x${string}`, event: TEvent | undefined, fromBlock: bigint, toBlock?: bigint | null, chunkSize?: bigint, confBlock?: bigint): Promise<GetLogsResult<AdapterTransaction>> {
        try {
            const result = await super.getLogs(address, event, fromBlock, toBlock, chunkSize, confBlock)
            return result
        }
        catch (error) {
            var lastBlock = await this.getLastBlockNumber()
            var apiLogs = await this.getLogsViaAPI(address, `https://mainnet.somnia.w3us.site/api/v2/addresses/${address}/logs`, fromBlock)

            return {
                logs: apiLogs,
                nextLastBlockNumber: lastBlock,
                success: true
            }
        }
    }

    async getLogsViaAPI(
        contractAddress: string,
        urlRequest: string,
        fromBlock: bigint
    ): Promise<AdapterTransaction[]> {
        const baseUrl = urlRequest;

        const headers: Record<string, string> = {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "connection": "keep-alive",
            "dnt": "1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
        };

        const sleep = async (ms: number) => new Promise(r => setTimeout(r, ms));
        const jitterMs = () => 1_000 + Math.floor(Math.random() * 1_000);

        let block_number: number | undefined = undefined;
        let index: number | undefined = undefined;
        const allItems: any[] = [];

        while (true) {
            const url = new URL(baseUrl);
            if (block_number != null) url.searchParams.set("block_number", String(block_number));
            if (index != null) url.searchParams.set("index", String(index));

            try {
                const resp = await fetch(url.toString(), { method: "GET", headers });
                if (!resp.ok) {
                    throw new Error(`Somnia API HTTP ${resp.status} ${resp.statusText}`);
                }

                const body: any = await resp.json();
                const items: any[] = Array.isArray(body?.items) ? body.items : [];

                allItems.push(...items);

                const next = body?.next_page_params;
                if (!next || next.block_number == null || next.index == null) {
                    break;
                }

                if (typeof next.block_number === "number" && BigInt(next.block_number) < fromBlock) {
                    break;
                }

                const sleepSec = jitterMs()
                console.log(`[api sync] Fetch Somnia Logs ${sleepSec / 1000}s.  BlockNumber: ${block_number}`)
                await sleep(sleepSec);

                block_number = next.block_number;
                index = next.index;
            } catch (error) {
                console.warn(`[sync] Somnia API fetch error: ${(error as Error).message}`);
                throw error
            }
        }

        const filtered = allItems.filter(i => {
            const bn = BigInt(i?.block_number ?? 0);
            return bn >= fromBlock;
        });

        // Normalize API tx-like items into event/log-like objects.
        // Low-fidelity: args are best-effort, logIndex may be synthetic if missing.
        return filtered.map((i, idx) => {
            const txHash = String(i?.transaction_hash ?? "");
            const logIndex = Number(i?.index ?? i?.logIndex ?? idx);
            const blockNumber = BigInt(i?.block_number ?? i?.blockNumber ?? 0);

            return {
                transactionHash: txHash,
                blockNumber,
                logIndex,
                address: contractAddress as Address,
                blockHash: i?.block_hash ?? undefined,
                value: i.value,
                args: i.decoded ?? i.decoded_input,
                source: "api",
            } satisfies AdapterTransaction;
        });
    }

}