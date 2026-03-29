import { SolanaActivityDTO, SolanaParsedTxDTO, SolanaReaderActivityDTO, SolanaSignatureInfoDTO, SolanaTokenBalanceDTO } from "@/domain/ports/solana-reader";
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Finality, PublicKey } from "@solana/web3.js";

const COMMITMENT: Finality = "confirmed";
export class SolanaAdapter {
    connection: Connection
    constructor() {
        this.connection = new Connection("https://mainnetbeta-rpc.eclipse.xyz", { commitment: COMMITMENT })
    }

    async getMetadataUri(mint: string): Promise<string | null> {
        try {
            const mintKey = new PublicKey(mint);
            const onchain = await getTokenMetadata(this.connection, mintKey);

            return onchain?.uri ?? null;
        } catch (e: any) {
            console.log(e)
            return null;
        }
    }

    async GetAddressActivities(address: string, lastSlot: bigint): Promise<SolanaActivityDTO[]> {
        let activities: SolanaActivityDTO[] = []

        let newestBlock = lastSlot
        let before: string | undefined = undefined;
        console.log(`Start Solana logs...`)
        while (true) {
            const parsed = await this.getSignaturesForAddress(address, 1000, before)
            const result = await this.parseAddressActivities(address, parsed);
            if (result.length == 0) break;

            activities = activities.concat(result)

            const lastSignature = result[result.length - 1];
            const firstSign = result[0];

            console.log(`Solana from block ${lastSignature?.slot} | length: ${activities.length}`)

            if (firstSign.slot > newestBlock)
                newestBlock = BigInt(firstSign.slot);

            before = lastSignature.signature

            if (lastSignature.slot < lastSlot) break;
        }
        return activities;
    }

    private async parseAddressActivities(address: string, parsedTx: SolanaParsedTxDTO[]): Promise<SolanaActivityDTO[]> {

        try {
            const out: SolanaActivityDTO[] = [];
            const token2022ProgramId = TOKEN_2022_PROGRAM_ID.toBase58();

            for (const tx of parsedTx) {
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

            const lastSignature = parsedTx.length > 0 ? parsedTx[parsedTx.length - 1] : null;

            const result: SolanaReaderActivityDTO = {
                activities: out,
                firstSlotNumber: parsedTx[0].slot,
                lastSlotNumber: parsedTx[parsedTx.length - 1].slot,
                lastSignature: lastSignature?.signature ?? ""
            }
            return out;
        } catch (e) {
            console.log(e);
            return []
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

    private async getSignaturesForAddress(address: string, limit?: number, before?: string): Promise<SolanaParsedTxDTO[]> {
        try {
            const sigs = await this.connection.getSignaturesForAddress(new PublicKey(address), { limit: limit, before: before });
            const signatures = sigs.map(s => s.signature);

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
                const txs = await this.connection.getTransactions(batch, { commitment: COMMITMENT, maxSupportedTransactionVersion: 0 });
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
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}