export interface SolanaSignatureInfoDTO {
  signature: string;
  slot: number;
}

export interface SolanaTokenBalanceDTO {
  mint: string;
  owner: string;
  amount: string; // raw amount as string
  decimals: number;
}

export interface SolanaParsedTxDTO {
  slot: number;
  signature: string;
  logs: string[];
  preTokenBalances: SolanaTokenBalanceDTO[];
  postTokenBalances: SolanaTokenBalanceDTO[];
}

export interface SolanaActivityDTO {
  slot: number; // maps to block_id
  signature: string; // maps to trans_id
  activityType: string;
  fromAddress: string | null;
  toAddress: string | null;
  tokenAddress: string | null;
  tokenDecimals: number | null;
  amount: number | null;
  flow: string | null;
}

export interface SolanaReaderActivityDTO {
  activities: SolanaActivityDTO[];
  lastSignature: string | null;
  lastSlotNumber: number
  firstSlotNumber: number
}

export interface ISolanaReader {
  getSignaturesForAddress(chainId: number, address: string, opts?: { limit?: number; before?: string }): Promise<SolanaSignatureInfoDTO[]>;
  getTransaction(chainId: number, signature: string): Promise<SolanaParsedTxDTO | null>;
  getMetadataUri(chainId: number, mint: string): Promise<string | null>;
  getAddressActivities(chainId: number, address: string, opts?: { pageSize?: number; before?: string }): Promise<SolanaReaderActivityDTO>;
}


