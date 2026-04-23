import { ERC1155_TRANSFER_SINGLE_EVENT, ERC721_TRANSFER_EVENT, ZERO_ADDRESS } from '@/infrastructure/blockchain/evm-events';
import { Abi, AbiEvent, Address, createPublicClient, defineChain, http, PublicClient, ExtractAbiItemForArgs } from 'viem';
import { ERC1155_ABI } from "@/application/blockchain-abis/ERC1155";
import { AdapterTransaction } from '../AdapterTransaction';

export type GetLogsResult<T> = {
    success: boolean;
    logs: T[];
    nextLastBlockNumber: bigint;
};

export abstract class BaseEVMAdapter {
    abstract client: PublicClient

    abstract readContract<T = unknown>(
        address: `0x${string}`,
        abi: Abi,
        functionName: string,
        args?: any[],
    ): Promise<T>;

    async getLastBlockNumber(): Promise<bigint> {
        return this.client.getBlockNumber();
    }

    abstract getLogsViaAPI(
        contractAddress: string,
        urlRequest: string,
        fromBlock: bigint
    ): Promise<AdapterTransaction[]>

    async getLogs<TEvent extends AbiEvent>(
        address: `0x${string}`,
        event: TEvent | undefined,
        fromBlock: bigint,
        toBlock: bigint | null = null,
        chunkSize: bigint = 1_000n,
        confBlock: bigint = 5n
    ): Promise<GetLogsResult<AdapterTransaction>> {

        const latest = await this.getLastBlockNumber();
        var safeTo = latest > confBlock ? latest - confBlock : 0n;

        if (toBlock != null) {
            safeTo = toBlock;
        }

        let cursor = BigInt(fromBlock ?? "0");
        var logs: AdapterTransaction[] = []
        while (cursor < safeTo) {
            const from = cursor;
            const to = from + chunkSize - 1n <= safeTo ? from + chunkSize - 1n : safeTo;

            console.log(`Start Chain ${this.client.chain?.id} scan blocks ${from}-${to} Until: ${safeTo}`)
            const results = await this.scanWindow(address, from, to, event);
            cursor = to + 1n;
            logs = logs.concat(results)
        }

        return {
            logs: logs,
            nextLastBlockNumber: safeTo,
            success: true
        }
    }
    private async scanWindow(
        contractAddress: Address,
        fromBlock: bigint,
        to: bigint,
        event: any
    ): Promise<AdapterTransaction[]> {
        var bc_logs = await this.client.getLogs({
            address: contractAddress,
            fromBlock: fromBlock,
            toBlock: to,
            event: event
        });

        var logs: AdapterTransaction[] = bc_logs.map((l: any) => ({
            transactionHash: l.transactionHash,
            blockHash: l.blockHash,
            value: l.value,
            logIndex: Number(l.logIndex ?? -1),
            blockNumber: BigInt(l.blockNumber),
            address: (l.address ?? contractAddress) as Address,
            topics: Array.isArray(l.topics) ? l.topics : undefined,
            data: l.data,
            args: l.args,
            eventName: l.eventName,
            source: "rpc",
        }));

        return logs
    }
}