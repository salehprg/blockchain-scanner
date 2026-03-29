import { Transfer1155SingleLog } from '@/handlers/NFT/ERC1155_handler';
import { Transfer721Log } from '@/handlers/NFT/ERC721_handler';
import { ERC1155_TRANSFER_SINGLE_EVENT, ERC721_TRANSFER_EVENT, ZERO_ADDRESS } from '@/infrastructure/blockchain/evm-events';
import { Abi, AbiEvent, Address, createPublicClient, defineChain, http, PublicClient, ExtractAbiItemForArgs } from 'viem';
import { ERC1155_ABI } from "@/application/blockchain-abis/ERC1155";


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

    async getLogs<TEvent extends AbiEvent>(
        address: `0x${string}`,
        event: TEvent,
        fromBlock: bigint,
        toBlock: bigint | null = null,
        chunkSize: bigint = 1_000n,
        confBlock: bigint = 5n
    ): Promise<any[]> {

        const latest = await this.getLastBlockNumber();
        var safeTo = latest > confBlock ? latest - confBlock : 0n;

        if (toBlock != null && toBlock > safeTo) {
            safeTo = toBlock;
        }

        let cursor = BigInt(fromBlock ?? "0");
        var logs: any[] = []
        while (cursor < safeTo) {
            const from = cursor;
            const to = from + chunkSize - 1n <= safeTo ? from + chunkSize - 1n : safeTo;

            try {
                console.log(`Start Chain ${this.client.chain?.id} scan blocks ${from}-${to} Until: ${safeTo}`)
                const resultTo = await this.scanWindow(address, from, to, event);
                cursor = resultTo.latest_block + 1n;
                logs = logs.concat(resultTo.logs)
            } catch (err) {
                const msg = String((err as Error)?.message ?? err);

                console.warn(`[sync] window ${from}-${to} failed: ${msg}`);
                // brief pause to avoid hot loop
                await new Promise(r => setTimeout(r, 2_000));
                throw new Error("RPC GetLog failed")
            }
        }

        return logs
    }
    private async scanWindow(
        contractAddress: Address,
        fromBlock: bigint,
        to: bigint,
        event: any
    ): Promise<{
        latest_block: bigint
        logs: any[]
    }> {
        var bc_logs = await this.client.getLogs({
            address: contractAddress,
            fromBlock: fromBlock,
            toBlock: to,
            event: event
        });

        var logs = bc_logs.map((l: any) => ({
            blockHash: l.transactionHash,
            logIndex: Number(l.logIndex ?? -1),
            blockNumber: BigInt(l.blockNumber),
            args: l.args
        }));

        let maxApplied = fromBlock
        for (const l of logs) {
            if (l.blockNumber > maxApplied) maxApplied = l.blockNumber;
        }
        return {
            latest_block: maxApplied,
            logs: logs
        }
    }

    async getAllTokenIds(address: `0x${string}`): Promise<string[]> {
        const nextId = await this.readContract<bigint>(address, ERC1155_ABI, "nextTokenIdToMint");
        const ids: string[] = [];
        for (let i = 0n; i < nextId; i++) ids.push(i.toString());
        return ids;
    }

    async getERC721TransferLogs(address: `0x${string}`,
        fromBlock: bigint,
        toBlock: bigint | null = null,
        chunkSize: bigint = 1_000n,
        confBlock: bigint = 5n): Promise<Transfer721Log[]> {

        var logs = await this.getLogs(address, ERC721_TRANSFER_EVENT, fromBlock, toBlock, chunkSize, confBlock)
        return logs
    }

    async getERC1155TransferLogs(address: `0x${string}`,
        fromBlock: bigint,
        toBlock: bigint | null = null,
        chunkSize: bigint = 1_000n,
        confBlock: bigint = 5n): Promise<Transfer1155SingleLog[]> {

        var logs = await this.getLogs(address, ERC1155_TRANSFER_SINGLE_EVENT, fromBlock, toBlock, chunkSize, confBlock)
        return logs
    }

}