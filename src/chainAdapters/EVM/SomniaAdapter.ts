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

    override async getLogs<TEvent extends AbiEvent>(address: `0x${string}`, event: TEvent | undefined, fromBlock: bigint, toBlock?: bigint | null, chunkSize?: bigint, confBlock?: bigint): Promise<GetLogsResult<AdapterTransaction>> {
        try {
            const result = await super.getLogs(address, event, fromBlock, toBlock, chunkSize, confBlock)
            return result
        }
        catch (error) {
            var lastBlock = await this.getLastBlockNumber()
            var apiLogs = await this.getLogsViaAPI(address, `https://mainnet.somnia.w3us.site/api/v2/addresses/${address}/transactions`, fromBlock)

            return {
                logs: apiLogs,
                nextLastBlockNumber: lastBlock,
                success: true
            }
        }
    }

    override async getERC721TransferLogs(address: `0x${string}`,
        fromBlock: bigint,
        toBlock: bigint | null = null,
        chunkSize: bigint = 1_000n,
        confBlock: bigint = 5n): Promise<GetLogsResult<AdapterTransaction>> {

        var result = await this.getLogs(address, ERC721_TRANSFER_EVENT, fromBlock, toBlock, chunkSize, confBlock)
        return result
    }

    override async getERC1155TransferLogs(address: `0x${string}`,
        fromBlock: bigint,
        toBlock: bigint | null = null,
        chunkSize: bigint = 1_000n,
        confBlock: bigint = 5n): Promise<GetLogsResult<AdapterTransaction>> {

        try {
            var result = await super.getERC1155TransferLogs(address, fromBlock, toBlock, chunkSize, confBlock)
            return result
        } catch (error) {
            var lastBlock = await this.getLastBlockNumber()
            var apilogs = await this.getLogsViaAPI(address, `https://mainnet.somnia.w3us.site/api/v2/addresses/${address}/transactions`, fromBlock)

            const mapped: AdapterTransaction[] = [];

            for (const tx of apilogs) {
                if ((tx as any).method === "claim" && (tx as any).decoded_input?.parameters) {
                    const getVal = (n: string) => (tx as any).decoded_input.parameters.find((p: any) => p.name === n)?.value;
                    const receiver = getVal("_receiver");
                    const tokenId = getVal("_tokenId");
                    const quantity = getVal("_quantity");

                    if (receiver && tokenId && quantity) {
                        mapped.push({
                            transactionHash: (tx as any).hash,
                            logIndex: Number((tx as any).log_index ?? 0),
                            blockNumber: BigInt((tx as any).block_number ?? 0),
                            address: address as Address,
                            value: tx.value,
                            eventName: tx.eventName,
                            args: {
                                operator: (tx as any).from?.hash as Address,
                                from: ZERO_ADDRESS as Address,
                                to: receiver as Address,
                                id: BigInt(tokenId),
                                value: BigInt(quantity)
                            },
                            source: "api",
                        });
                    }
                }
            }

            return {
                logs: mapped,
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
                break
            }
        }

        const filtered = allItems.filter(i => {
            const bn = BigInt(i?.block_number ?? 0);
            return bn >= fromBlock && i?.result === "success";
        });

        // Normalize API tx-like items into event/log-like objects.
        // Low-fidelity: args are best-effort, logIndex may be synthetic if missing.
        return filtered.map((i, idx) => {
            const txHash = String(i?.hash ?? i?.transaction_hash ?? "");
            const logIndex = Number(i?.log_index ?? i?.logIndex ?? idx);
            const blockNumber = BigInt(i?.block_number ?? i?.blockNumber ?? 0);

            const fromAddr: string = i?.from?.hash ?? i?.from_address ?? ZERO_ADDRESS;
            const toAddr: string = i?.to?.hash ?? i?.to_address ?? ZERO_ADDRESS;
            const tokenIdStr: string = i?.total?.token_id ?? i?.token_id ?? "0";

            return {
                transactionHash: txHash,
                blockNumber,
                logIndex,
                address: contractAddress as Address,
                blockHash: i?.block_hash ?? undefined,
                value: i.value,
                args: {
                    from: fromAddr as Address,
                    to: toAddr as Address,
                    tokenId: BigInt(tokenIdStr),
                    decoded_input: i.decoded_input
                },
                eventName: i.method,
                source: "api",
            } satisfies AdapterTransaction;
        });
    }

}