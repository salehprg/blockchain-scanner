import { NFTMetadataSyncer } from "@/application/services/nft-metadata-syncer";
import { IContractLister } from "@/domain/ports/contract-lister";
import { Address } from "viem";

export class NFTMetadataSyncJob {
  private lock = false;
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly syncer: NFTMetadataSyncer,
    private readonly contractLister: IContractLister,
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
      const contracts = await this.contractLister.listContracts();
      for (const c of contracts) {
        try {
          await this.syncer.syncContract({ chainId: c.chainId, contractId: c.id, contractAddress: c.contractAddress as Address, contractType: c.contractType });
        } catch (e) {
          console.warn(`[nft-meta-sync] ${c.contractAddress} failed: ${(e as Error).message}`);
        }
      }
    } finally {
      this.lock = false;
    }
  }
}


