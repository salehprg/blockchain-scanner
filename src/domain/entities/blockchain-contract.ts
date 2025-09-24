export type ContractType = 'ERC721' | 'ERC1155' | 'OTHER';

export class BlockchainContract {
  constructor(
    public id: string,
    public contractAddress: string,
    public contractType: ContractType,
    public chainId: number,
    public lastSyncBlock: string | null,  // use string to hold bigints safely
    public lastSyncTime: Date | null
  ) {}
}
