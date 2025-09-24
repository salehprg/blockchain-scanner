export class BlockchainConfig {
  constructor(
    public id: string,
    public chainId: number,
    public rpcUrlBase: string,
    public rpcUrlAlter: string | null
  ) {}
}
