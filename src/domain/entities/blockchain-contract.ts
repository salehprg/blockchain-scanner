export type ContractType = 'CHEST_ERC721' | 'ERC721' | 'ERC1155' | 'SOLANA' | 'OTHER' | 'PAYMENT';

export class BlockchainContract {
  constructor(
    public id: string,
    public contractAddress: string,
    public contractType: ContractType,
    public chainId: number,
    public lastSyncBlock: string | null,  // use string to hold bigints safely
    public lastSyncTime: Date | null,
    public contractCreateBlockNumber: string | null,  // use string to hold bigints safely
    public contractName: string | null
  ) { }
}
