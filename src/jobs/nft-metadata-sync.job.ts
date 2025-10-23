import { NFTMetadataSyncer } from "@/application/services/nft-metadata-syncer";
import { Address } from "viem";

export class NFTMetadataSyncJob {
  private lock = false;
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly syncer: NFTMetadataSyncer,
    private readonly listContracts: () => Promise<Array<{ id: string; address: Address; type: "ERC721" | "ERC1155"; chainId: number }>>,
    private readonly intervalMs = 60_000
  ) {}

  start() {
    if (this.timer) return;
    this.tick();
    this.timer = setInterval(() => this.tick(), this.intervalMs);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = undefined;
  }

  private async tick() {
    if (this.lock) return;
    this.lock = true;
    try {
      const contracts = await this.listContracts();
      for (const c of contracts) {
        try {
          await this.syncer.syncContract({ chainId: c.chainId, contractId: c.id, contractAddress: c.address, contractType: c.type });
        } catch (e) {
          console.warn(`[nft-meta-sync] ${c.address} failed: ${(e as Error).message}`);
        }
      }
    } finally {
      this.lock = false;
    }
  }
}


