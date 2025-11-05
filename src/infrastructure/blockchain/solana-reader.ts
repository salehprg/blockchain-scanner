import { Connection, Finality, PublicKey } from "@solana/web3.js";
import { ISolanaReader, SolanaActivityDTO, SolanaParsedTxDTO, SolanaSignatureInfoDTO, SolanaTokenBalanceDTO } from "@/domain/ports/solana-reader";
import {
  TOKEN_2022_PROGRAM_ID,
  getMint,
  getMetadataPointerState,
  getTokenMetadata,
  MetadataPointer,
} from '@solana/spl-token';

const COMMITMENT: Finality = "confirmed";

export class SolanaReader implements ISolanaReader {
  private readonly connections = new Map<number, Connection>();

  constructor(private readonly rpcUrlResolver: (chainId: number) => Promise<string>) { }

  private async getConnection(chainId: number): Promise<Connection> {
    let conn = this.connections.get(chainId);
    if (!conn) {
      const url = await this.rpcUrlResolver(chainId);
      conn = new Connection(url, { commitment: COMMITMENT });
      this.connections.set(chainId, conn);
    }
    return conn;
  }

  private async getSignatureTransfersForAddressViaEclipseScan(address: string, opts?: { pagesize?: number; before?: string }): Promise<SolanaActivityDTO[]> {
    const out: SolanaActivityDTO[] = [];
    let pageSize = opts?.pagesize ?? 40;
    let hasData = true;
    let before = opts?.before;
    let page = 1;

    while (hasData) {
      const url = new URL("https://api.eclipsescan.xyz/v1/account/transfer");
      url.searchParams.set("address", address);
      url.searchParams.set("page_size", pageSize.toString());
      url.searchParams.set("page", String(page));
      if (before) url.searchParams.set("before", before);

      const res = await fetch(url.toString(), { method: "GET" });
      if (!res.ok) break;
      const json: any = await res.json();
      // New response model: data is an array of activities
      const txs: any[] = Array.isArray(json?.data) ? json.data : [];
      if (!Array.isArray(txs) || txs.length === 0) break;

      // Map activities to our DTO and filter out malformed entries
      const filtered = txs.filter(t => typeof t?.trans_id === "string" && (typeof t?.block_id === "number" || typeof t?.block_id === "string"));
      for (const t of filtered) {
        const slotNum = typeof t.block_id === "string" ? Number(t.block_id) : Number(t.block_id);
        out.push({
          signature: t.trans_id,
          slot: slotNum,
          activityType: t.activity_type ?? null,
          fromAddress: t.from_address ?? null,
          toAddress: t.to_address ?? null,
          tokenAddress: t.token_address ?? null,
          tokenDecimals: typeof t.token_decimals === "number" ? t.token_decimals : (typeof t.token_decimals === "string" ? Number(t.token_decimals) : null),
          amount: typeof t.amount === "number" ? t.amount : (typeof t.amount === "string" ? Number(t.amount) : null),
          flow: t.flow ?? null
        });
      }

      const last = txs[txs.length - 1];
      before = last?.trans_id ?? before;
      page += 1;
      hasData = pageSize == txs.length;

      await new Promise(r => setTimeout(r, 100 + Math.floor(Math.random() * 100)));
    }

    return out;
  }

  async getAddressActivities(chainId: number, address: string, opts?: { pageSize?: number; before?: string }): Promise<SolanaActivityDTO[]> {
    if (chainId !== 17172) return [];
    try {
      return await this.getSignatureTransfersForAddressViaEclipseScan(address, { pagesize: opts?.pageSize, before: opts?.before });
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getSignaturesForAddress(chainId: number, address: string, opts?: { limit?: number; before?: string }): Promise<SolanaSignatureInfoDTO[]> {
    const conn = await this.getConnection(chainId);
    try {
      const sigs = await conn.getSignaturesForAddress(new PublicKey(address), { limit: opts?.limit, before: opts?.before });
      
      const tmp = await this.getSignatureTransfersForAddressViaEclipseScan(address, opts);
      // if (sigs.length == 0 && chainId === 17172) {
      //   try {
      //     return await this.getSignaturesForAddressViaEclipseScan(address, opts);
      //   } catch (error) {
      //     console.log(error);
      //     return [];
      //   }
      // }

      return sigs.map(s => ({ signature: s.signature, slot: s.slot }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getTransaction(chainId: number, signature: string): Promise<SolanaParsedTxDTO | null> {
    const conn = await this.getConnection(chainId);
    const tx = await conn.getTransaction(signature, { commitment: COMMITMENT, maxSupportedTransactionVersion: 0 });
    if (!tx) return null;

    const mapBalances = (arr: any[] | undefined): SolanaTokenBalanceDTO[] => {
      if (!arr) return [];
      return arr.map((b: any) => ({
        mint: String(b.mint),
        owner: String(b.owner),
        amount: String(b.uiTokenAmount?.amount ?? "0"),
        decimals: Number(b.uiTokenAmount?.decimals ?? 0)
      }));
    };

    return {
      slot: tx.slot,
      signature,
      logs: tx.meta?.logMessages ?? [],
      preTokenBalances: mapBalances(tx.meta?.preTokenBalances as any),
      postTokenBalances: mapBalances(tx.meta?.postTokenBalances as any)
    };
  }

  async getMetadataUri(chainId: number, mint: string): Promise<string | null> {
    const conn = await this.getConnection(chainId);
    try {
      const mintKey = new PublicKey(mint);
      const onchain = await getTokenMetadata(conn, mintKey);

      return onchain?.uri ?? null;
    } catch (e: any) {
      console.log(e)
      return null;
    }
  }
}


