export type ContractLogEventType = "ERC721.Transfer" | "ERC1155.TransferSingle" | "SOLANA.Log" | "SOLANA.NFTTransfer";

export class ContractLog {
  constructor(
    public id: string,
    public contractId: string,
    public chainId: number,
    public contractAddress: string,
    public blockNumber: string,
    public transactionHash: string,
    public logIndex: number,
    public eventType: ContractLogEventType,
    public fromAddress: string | null,
    public toAddress: string | null,
    public operatorAddress: string | null,
    public tokenId: string | null,
    public value: string | null,
    public loggedAt: Date
  ) {}
}


