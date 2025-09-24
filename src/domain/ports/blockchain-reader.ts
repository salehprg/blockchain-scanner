export interface IBlockchainReader {
  readContract<T = unknown>(params: {
    chainId: number;
    address: `0x${string}`;
    abi: any;
    functionName: string;
    args?: any[];
  }): Promise<T>;

  getBlockNumber?(chainId: number): Promise<bigint>;
  getLogs?(params: {
    chainId: number;
    address: `0x${string}`;
    event: any;
    fromBlock: bigint;
    toBlock: bigint;
  }): Promise<any[]>;
}
