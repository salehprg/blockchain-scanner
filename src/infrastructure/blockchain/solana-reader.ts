import { Connection, Finality, PublicKey } from "@solana/web3.js";
import { ISolanaReader, SolanaActivityDTO, SolanaParsedTxDTO, SolanaReaderActivityDTO, SolanaSignatureInfoDTO, SolanaTokenBalanceDTO } from "@/domain/ports/solana-reader";
import {
  TOKEN_2022_PROGRAM_ID,
  getMint,
  getMetadataPointerState,
  getTokenMetadata,
  MetadataPointer,
} from '@solana/spl-token';
import { request as httpsRequest } from "https";
import { number } from "zod";

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

  private async httpGetJson(url: string, extraHeaders?: Record<string, string>): Promise<{ ok: boolean; status: number; json: any | null }> {
    return await new Promise((resolve) => {
      const { hostname, pathname, search, protocol } = new URL(url);
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Connection": "keep-alive",
        ...extraHeaders
      };

      const req = httpsRequest({
        protocol,
        hostname,
        path: pathname + search,
        method: "GET",
        headers
      }, (res) => {
        const status = res.statusCode ?? 0;
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          try {
            const json = data.length ? JSON.parse(data) : null;
            resolve({ ok: status >= 200 && status < 300, status, json });
          } catch {
            resolve({ ok: false, status, json: null });
          }
        });
      });

      req.on("error", () => resolve({ ok: false, status: 0, json: null }));
      req.end();
    });
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
      url.searchParams.set("page", String(page));
      url.searchParams.set("page_size", pageSize.toString());
      url.searchParams.set("remove_spam", "false");
      url.searchParams.set("exclude_amount_zero", "false");
      if (before) url.searchParams.set("before", before);

      const res = await this.httpGetJson(url.toString(), {
        "Origin": "https://eclipsescan.xyz",
        "Referer": `https://eclipsescan.xyz/address/${encodeURIComponent(address)}`
      });
      if (!res.ok) break;
      const json: any = res.json;
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

  async getAddressActivities(chainId: number, address: string, opts?: { pageSize?: number; before?: string }): Promise<SolanaReaderActivityDTO> {
    const PAGE = 1000;
    const before = opts?.before;

    try {
      const token2022ProgramId = TOKEN_2022_PROGRAM_ID.toBase58();
      const sigs = await this.getSignaturesForAddress(chainId, address, { limit: PAGE, before });
      const signatures = sigs.map(s => s.signature);

      const out: SolanaActivityDTO[] = [];
      const txs = await this.getTransactions(chainId, signatures);

      for (const tx of txs) {
        // Only include transactions that interacted with Token-2022 and performed TransferChecked
        if (tx.logs.length < 24) continue;

        const logs = tx.logs ?? [];
        const hasTransferChecked = logs[logs.length - 3].toLowerCase().includes("transferchecked");
        const touchedToken2022 = logs[logs.length - 1].toLowerCase().includes(token2022ProgramId.toLowerCase());

        if (!touchedToken2022 && tx.postTokenBalances.length <= 2 && tx.preTokenBalances.length <= 2) continue;
        if (!hasTransferChecked) continue;

        const acts = this.buildActivitiesFromTx(tx, address);
        const nftActs = acts.filter(a => (a.tokenDecimals ?? -1) === 0 && (a.amount ?? 0) === 1).slice(0, 2);
        out.push(...nftActs);
      }

      const lastSignature = signatures.length > 0 ? signatures[signatures.length - 1] : null;

      const result: SolanaReaderActivityDTO = {
        activities: out,
        firstSlotNumber: txs[0].slot,
        lastSlotNumber: txs[txs.length - 1].slot,
        lastSignature: lastSignature
      }
      return result;
    } catch (e) {
      console.log(e);
      return { activities: [], lastSignature: "", lastSlotNumber: 0, firstSlotNumber: 0 };
    }
  }

  async getSignaturesForAddress(chainId: number, address: string, opts?: { limit?: number; before?: string }): Promise<SolanaSignatureInfoDTO[]> {
    const conn = await this.getConnection(chainId);
    try {
      const sigs = await conn.getSignaturesForAddress(new PublicKey(address), { limit: opts?.limit, before: opts?.before });

      return sigs.map(s => ({ signature: s.signature, slot: s.slot }));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getTransaction(chainId: number, signature: string): Promise<SolanaParsedTxDTO | null> {
    const txs = await this.getTransactions(chainId, [signature]);
    return txs[0] ?? null;
  }

  async getTransactions(chainId: number, signatures: string[]): Promise<SolanaParsedTxDTO[]> {
    const conn = await this.getConnection(chainId);
    if (!signatures || signatures.length === 0) return [];

    const mapBalances = (arr: any[] | undefined): SolanaTokenBalanceDTO[] => {
      if (!arr) return [];
      return arr.map((b: any) => ({
        mint: String(b.mint),
        owner: String(b.owner),
        amount: String(b.uiTokenAmount?.amount ?? "0"),
        decimals: Number(b.uiTokenAmount?.decimals ?? 0)
      }));
    };

    const results: SolanaParsedTxDTO[] = [];
    const BATCH_SIZE = 100;
    for (let i = 0; i < signatures.length; i += BATCH_SIZE) {
      const batch = signatures.slice(i, i + BATCH_SIZE);
      const txs = await conn.getTransactions(batch, { commitment: COMMITMENT, maxSupportedTransactionVersion: 0 });
      txs.forEach((tx, idx) => {
        if (!tx) return;
        const sig = batch[idx];
        results.push({
          slot: tx.slot,
          signature: sig,
          logs: tx.meta?.logMessages ?? [],
          preTokenBalances: mapBalances(tx.meta?.preTokenBalances as any),
          postTokenBalances: mapBalances(tx.meta?.postTokenBalances as any)
        });
      });
    }

    return results;
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

  private buildActivitiesFromTx(tx: SolanaParsedTxDTO, address: string): SolanaActivityDTO[] {
    const result: SolanaActivityDTO[] = [];

    // Build owner -> amount maps per mint for pre and post
    const byMintPre = new Map<string, Map<string, { amount: number; decimals: number }>>();
    for (const b of tx.preTokenBalances) {
      const owners = byMintPre.get(b.mint) ?? new Map<string, { amount: number; decimals: number }>();
      owners.set(b.owner, { amount: Number(b.amount ?? "0"), decimals: b.decimals });
      byMintPre.set(b.mint, owners);
    }
    const byMintPost = new Map<string, Map<string, { amount: number; decimals: number }>>();
    for (const b of tx.postTokenBalances) {
      const owners = byMintPost.get(b.mint) ?? new Map<string, { amount: number; decimals: number }>();
      owners.set(b.owner, { amount: Number(b.amount ?? "0"), decimals: b.decimals });
      byMintPost.set(b.mint, owners);
    }

    // Union of mints seen in pre/post
    const mints = new Set<string>([...byMintPre.keys(), ...byMintPost.keys()]);
    for (const mint of mints) {
      const preOwners = byMintPre.get(mint) ?? new Map<string, { amount: number; decimals: number }>();
      const postOwners = byMintPost.get(mint) ?? new Map<string, { amount: number; decimals: number }>();

      // Union of owners for this mint
      const owners = new Set<string>([...preOwners.keys(), ...postOwners.keys()]);
      const deltas: Array<{ owner: string; delta: number; decimals: number }> = [];
      for (const owner of owners) {
        const pre = preOwners.get(owner)?.amount ?? 0;
        const post = postOwners.get(owner)?.amount ?? 0;
        const decimals = postOwners.get(owner)?.decimals ?? preOwners.get(owner)?.decimals ?? 0;
        const delta = post - pre;
        if (delta !== 0) {
          deltas.push({ owner, delta, decimals });
        }
      }

      if (deltas.length === 0) continue;

      const decreases = deltas.filter(d => d.delta < 0).map(d => ({ owner: d.owner, amount: -d.delta, decimals: d.decimals }));
      const increases = deltas.filter(d => d.delta > 0).map(d => ({ owner: d.owner, amount: d.delta, decimals: d.decimals }));

      // Pair decreases and increases in order of magnitude
      for (const dec of decreases) {
        let remaining = dec.amount;
        for (const inc of increases) {
          if (result.length >= 2) break; // cap maximum two activities per transaction
          if (remaining <= 0) break;
          if (inc.amount <= 0) continue;

          const moved = Math.min(remaining, inc.amount);
          // Only consider NFTs: decimals==0 and moved exactly 1 unit
          if (inc.decimals === 0 && moved === 1) {
            result.push({
              slot: tx.slot,
              signature: tx.signature,
              activityType: "ACTIVITY_SPL_TRANSFER",
              fromAddress: dec.owner,
              toAddress: inc.owner,
              tokenAddress: mint,
              tokenDecimals: inc.decimals, // decimals same for mint
              amount: moved,
              flow: inc.owner === address ? "IN" : (dec.owner === address ? "OUT" : null)
            });
          }

          remaining -= moved;
          inc.amount -= moved;
        }
        if (result.length >= 2) break; // cap to two total
      }
    }

    return result;
  }
}


