import { Transfer1155SingleLog } from '@/handlers/NFT/ERC1155_handler';
import { Transfer721Log } from '@/handlers/NFT/ERC721_handler';
import { ERC1155_TRANSFER_SINGLE_EVENT, ERC721_TRANSFER_EVENT, ZERO_ADDRESS } from '@/infrastructure/blockchain/evm-events';
import { Abi, Address, createPublicClient, defineChain, http, PublicClient } from 'viem';
import { BaseEVMAdapter } from './BaseEVMAdapter';

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
            http: ['https://somnia-rpc.publicnode.com/'],
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


    async GetERC721TransferLogs(address: `0x${string}`,
        fromBlock: bigint,
        toBlock: bigint | null = null,
        chunkSize: bigint = 1_000n,
        confBlock: bigint = 5n): Promise<Transfer721Log[]> {

        try {
            var logs = await this.getLogs(address, ERC721_TRANSFER_EVENT, fromBlock, toBlock, chunkSize, confBlock)
            return logs
        } catch (error) {
            var fallBackLogs = this.fetchSomniaERC721Transfers(address, fromBlock)
            return fallBackLogs
        }
    }

    override async getERC1155TransferLogs(address: `0x${string}`,
        fromBlock: bigint,
        toBlock: bigint | null = null,
        chunkSize: bigint = 1_000n,
        confBlock: bigint = 5n): Promise<Transfer1155SingleLog[]> {

        try {
            var logs = await super.getERC1155TransferLogs(address, fromBlock, toBlock, chunkSize, confBlock)
            return logs
        } catch (error) {
            var fallBackLogs = this.fetchSomniaERC1155Transactions(address, fromBlock)
            return fallBackLogs
        }
    }

    private async fetchSomniaERC721Transfers(
        contractAddress: string,
        fromBlock: bigint
    ): Promise<Transfer721Log[]> {
        const baseUrl = `https://mainnet.somnia.w3us.site/api/v2/tokens/${contractAddress}/transfers`;

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
        const jitterMs = () => 5_000 + Math.floor(Math.random() * 5_000);

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

                await sleep(jitterMs());

                block_number = next.block_number;
                index = next.index;
            } catch (error) {
                console.warn(`[sync] Somnia API fetch error: ${(error as Error).message}`);
                throw error;
            }
        }

        const filtered = allItems.filter(i => {
            const bn = BigInt(i?.block_number ?? 0);
            return bn >= fromBlock && i?.token?.type === "ERC-721";
        });

        return filtered.map(i => {
            const txHash: string = i?.transaction_hash;
            const logIndex: number = Number(i?.log_index ?? -1);
            const bn: bigint = BigInt(i?.block_number ?? 0);
            const fromAddr: string = i?.from?.hash ?? ZERO_ADDRESS;
            const toAddr: string = i?.to?.hash ?? ZERO_ADDRESS;
            const tokenIdStr: string = i?.total?.token_id ?? i?.token_id ?? "0";
            const tokenId = BigInt(tokenIdStr);
            return {
                blockHash: txHash,
                logIndex,
                blockNumber: bn,
                args: {
                    from: fromAddr as any,
                    to: toAddr as any,
                    tokenId
                }
            };
        });
    }
    private async fetchSomniaERC1155Transactions(
        contractAddress: string,
        fromBlock: bigint
    ): Promise<Transfer1155SingleLog[]> {
        const baseUrl = `https://mainnet.somnia.w3us.site/api/v2/addresses/${contractAddress}/transactions`;

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
        const jitterMs = () => 5_000 + Math.floor(Math.random() * 5_000);

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

                await sleep(jitterMs());

                block_number = next.block_number;
                index = next.index;
            } catch (error) {
                console.warn(`[sync] Somnia API fetch error: ${(error as Error).message}`);
                throw error;
            }
        }

        const filtered = allItems.filter(i => {
            const bn = BigInt(i?.block_number ?? 0);
            return bn >= fromBlock && i?.result === "success";
        });

        const mapped: Transfer1155SingleLog[] = [];

        for (const tx of filtered) {
            if (tx.method === "claim" && tx.decoded_input?.parameters) {
                const getVal = (n: string) => tx.decoded_input.parameters.find((p: any) => p.name === n)?.value;
                const receiver = getVal("_receiver");
                const tokenId = getVal("_tokenId");
                const quantity = getVal("_quantity");

                if (receiver && tokenId && quantity) {
                    mapped.push({
                        blockHash: tx.hash,
                        logIndex: 0,
                        blockNumber: BigInt(tx.block_number),
                        args: {
                            operator: tx.from?.hash as Address,
                            from: ZERO_ADDRESS as Address,
                            to: receiver as Address,
                            id: BigInt(tokenId),
                            value: BigInt(quantity)
                        }
                    });
                }
            }
        }

        return mapped;
    }

}