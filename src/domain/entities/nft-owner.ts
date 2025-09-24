export class NFTOwner {
  constructor(
    public id: string,
    public contractId: string,
    public ownerAddress: string,
    public nftContractAddress: string,
    public nftItemId: string,          // string (can be large)
    public count: number,
    public lastTransactionHash: string | null,
    public lastSyncTime: Date | null
  ) {}
}
