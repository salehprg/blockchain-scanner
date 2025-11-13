import { IRpcUrlResolver } from "@/domain/ports/rpc-url-resolver";
import { IBlockchainConfigRepository } from "@/domain/repository/blockchain-config-repo";

export class RpcUrlResolver implements IRpcUrlResolver {
  constructor(private readonly configRepo: IBlockchainConfigRepository) {}

  async resolve(chainId: number): Promise<string> {
    const cfg = (await this.configRepo.filterConfigs({ chainId }))[0];
    if (cfg?.rpcUrlBase) return cfg.rpcUrlBase;
    throw new Error(`Missing RPC URL for chainId=${chainId}`);
  }
}


