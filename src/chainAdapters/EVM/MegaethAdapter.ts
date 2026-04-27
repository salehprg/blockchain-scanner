import { ERC1155_TRANSFER_SINGLE_EVENT, ERC721_TRANSFER_EVENT, ZERO_ADDRESS } from '@/infrastructure/blockchain/evm-events';
import { Abi, AbiEvent, Address, createPublicClient, decodeEventLog, defineChain, http, PublicClient } from 'viem';
import { BaseEVMAdapter, GetLogsResult } from './BaseEVMAdapter';
import { bigint } from 'zod';
import { AdapterTransaction } from '../AdapterTransaction';

const megaeth = defineChain({
    id: 4326,
    name: 'Megaeth',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: ['https://mainnet.megaeth.com/rpc'],
        },
    },
    blockExplorers: {
        default: { name: 'Explorer', url: 'https://mega.etherscan.io' },
    },
})

export type LogReturn = {
    logs: any[],
    latest_block: bigint
}

export class MegaethAdapter extends BaseEVMAdapter {
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
        this.client = createPublicClient({ ...megaeth, transport: http(megaeth.rpcUrls.default.http[0]) });
    }

    convertToNormilizedLogs(element: any, conytactAbi: any): AdapterTransaction {
        var decoded = decodeEventLog({
            abi: conytactAbi,
            data: element.data,
            topics: element.topics,
        }) as AdapterTransaction

        decoded.transactionHash = element.transactionHash
        decoded.blockNumber = this.hexToBigInt(element.blockNumber)
        decoded.address = element.address
        decoded.logIndex = Number(this.hexToBigInt(element.logIndex))
        decoded.blockHash = element.blockHash
        decoded.topics = element.topics

        return decoded as AdapterTransaction
    }

    override async getLogs<TEvent extends AbiEvent>(conytactAbi: any, address: `0x${string}`, event: TEvent | undefined, fromBlock: bigint, toBlock?: bigint | null, chunkSize?: bigint, confBlock?: bigint): Promise<GetLogsResult<AdapterTransaction>> {
        try {
            const result = await super.getLogs(conytactAbi, address, event, fromBlock, toBlock, chunkSize, confBlock)
            const resultLogs: AdapterTransaction[] = []

            for (let i = 0; i < result.logs.length; i++) {
                const decoded = this.convertToNormilizedLogs(result.logs[i], conytactAbi)
                decoded.source = "rpc"
                resultLogs.push(decoded)
            }

            result.logs = resultLogs
            return result
        }
        catch (error) {
            var lastBlock = await this.getLastBlockNumber()
            var apiLogs = await this.getLogsViaAPI(conytactAbi, address, `https://api.etherscan.io/v2/api?apikey=87DBX6Q7R48CKTKTYT8XBAS7MQ4XP12RPC&chainid=4326&module=logs&action=getLogs&address=${address}`, fromBlock)

            return {
                logs: apiLogs,
                nextLastBlockNumber: lastBlock,
                success: true
            }
        }
    }

    async getLogsViaAPI(
        conytactAbi: any,
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

                for (let i = 0; i < body.result.length; i++) {

                    const decoded = this.convertToNormilizedLogs(body.result[i], conytactAbi)
                    allItems.push(decoded)
                }


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
            const bn = BigInt(i?.blockNumber ?? 0);
            return bn >= fromBlock;
        });

        // Normalize API tx-like items into event/log-like objects.
        // Low-fidelity: args are best-effort, logIndex may be synthetic if missing.
        return filtered.map((i, idx) => {
            const txHash = String(i?.transactionHash ?? "");
            const logIndex = Number(i?.logIndex ?? i?.index ?? idx);
            const blockNumber = BigInt(i?.blockNumber ?? i?.block_number ?? 0);

            return {
                transactionHash: txHash,
                blockNumber,
                logIndex,
                address: contractAddress as Address,
                blockHash: i?.blockHash ?? undefined,
                value: i.value,
                args: i.args,
                source: "api",
                eventName: i?.eventName ?? "unknown_event",
                topics: i?.topics ?? [],
            } satisfies AdapterTransaction;
        });
    }

}