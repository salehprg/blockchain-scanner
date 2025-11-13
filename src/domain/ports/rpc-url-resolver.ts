export interface IRpcUrlResolver {
  resolve(chainId: number): Promise<string>;
}


