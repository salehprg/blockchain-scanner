import { Address, Abi } from "viem";
import { IBlockchainReader } from "@/domain/ports/blockchain-reader";
import { ERC721_TRANSFER_EVENT, ERC1155_TRANSFER_SINGLE_EVENT } from "./evm-events";

export type SupportedContractType = "ERC721" | "ERC1155";

export type Transfer721Log = {
  blockHash: string;
  logIndex: number;
  blockNumber: bigint;
  args: { from: Address; to: Address; tokenId: bigint };
};

export type Transfer1155SingleLog = {
  blockHash: string;
  logIndex: number;
  blockNumber: bigint;
  args: { operator: Address; from: Address; to: Address; id: bigint; value: bigint };
};

export class BlockchainLogReader {
  constructor(private readonly reader: IBlockchainReader) {}

  async getLatestBlock(chainId: number): Promise<bigint> {
    // viem's public client exposes getBlockNumber via "simulate" readContract trick.
    // Add it to IBlockchainReader later if you want; for now just read via getLogs safe window.
    // We'll infer safeTo from a "latest" param provided by a small helper in the viem provider.
    // Simpler: add a small extension to IBlockchainReader:
    // @ts-ignore - we rely on viem provider having getBlockNumber(keyed by chainId)
    const anyReader = this.reader;
    if (!anyReader.getBlockNumber) {
      throw new Error("IBlockchainReader needs getBlockNumber(chainId) support");
    }
    return anyReader.getBlockNumber(chainId) as Promise<bigint>;
  }

  async getTransferLogs(params: {
    chainId: number;
    contractType: SupportedContractType;
    contractAddress: Address;
    fromBlock: bigint;
    toBlock: bigint;
  }): Promise<Array<Transfer721Log | Transfer1155SingleLog>> {
    const event: Abi = params.contractType === "ERC721"
      ? [ERC721_TRANSFER_EVENT as any]
      : [ERC1155_TRANSFER_SINGLE_EVENT as any];

    // @ts-ignore - we piggyback on the reader's getLogs (exposed in the viem impl below)
    const anyReader = this.reader;
    if (!anyReader.getLogs) {
      throw new Error("IBlockchainReader needs getLogs(...) support");
    }

    const logs = await anyReader.getLogs({
      chainId: params.chainId,
      address: params.contractAddress,
      event: (event as any)[0],
      fromBlock: params.fromBlock,
      toBlock: params.toBlock
    });

    // viem already parses args; give them a stable shape
    return logs.map((l: any) => ({
      blockHash: l.transactionHash,
      logIndex: Number(l.logIndex ?? -1),
      blockNumber: BigInt(l.blockNumber),
      args: l.args
    }));
  }
}
