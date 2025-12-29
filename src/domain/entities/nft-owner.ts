export class NFTOwner {
  constructor(
    public id: string,
    public contractId: string,
    public ownerAddress: string,
    public contractAddress: string,
    public tokenId: string,          // string (can be large)
    public count: bigint,
    public lastTransactionHash: string | null,
    public lastSyncTime: Date | null
  ) {}
}
