import { IBlockchainReader } from "@/domain/ports/blockchain-reader";
import { Address, Abi, Chain, Transport, createPublicClient, http } from "viem";
import * as ViemChains from "viem/chains";
import { somnia } from "./custom-blockchains/somnia";

type ChainResolver = (chainId: number) => Chain | undefined;
type RpcUrlResolver = (chainId: number) => Promise<string>; // from envs or DB

const defaultChainResolver: ChainResolver = (chainId) => {
  var viemChain = Object.values(ViemChains).find(
    (c: any) => typeof c === "object" && "id" in c && c.id === chainId
  ) as Chain | undefined;
  
  if(!viemChain)
  {
    const customChains = [somnia]
    viemChain = customChains.find(element => element.id == chainId);
  }

  return viemChain
}

export class ViemPublicClientProvider implements IBlockchainReader {
  private cache = new Map<number, ReturnType<typeof createPublicClient>>();

  constructor(
    private readonly rpcUrlResolver: RpcUrlResolver,
    private readonly chainResolver: ChainResolver = defaultChainResolver,
    private readonly transportFactory: (url: string) => Transport = (url) => http(url)
  ) { }

  private async getClient(chainId: number) {
    let client = this.cache.get(chainId);
    if (!client) {
      const chain = this.chainResolver(chainId);
      if (!chain) {
        throw new Error(`Unsupported chainId: ${chainId}`);
      }
      const rpcUrl = await this.rpcUrlResolver(chainId);
      client = createPublicClient({ chain, transport: this.transportFactory(rpcUrl) });
      this.cache.set(chainId, client);
    }
    return client;
  }

  async getBlockNumber(chainId: number): Promise<bigint> {
    const client = await this.getClient(chainId);
    return client.getBlockNumber();
  }

  async getLogs(params: {
    chainId: number;
    address: `0x${string}`;
    event: any;
    fromBlock: bigint;
    toBlock: bigint;
  }) {
    const client = await this.getClient(params.chainId);
    var logs = await client.getLogs({
      address: params.address,
      fromBlock: params.fromBlock,
      toBlock: params.toBlock,
      event: params.event
    });

    return logs
  }

  async readContract<T = unknown>(params: {
    chainId: number;
    address: `0x${string}`;
    abi: Abi;
    functionName: string;
    args?: any[];
  }): Promise<T> {
    const client = await this.getClient(params.chainId);
    return client.readContract({
      address: params.address as Address,
      abi: params.abi,
      functionName: params.functionName as any,
      args: params.args as any
    }) as Promise<T>;
  }
}
