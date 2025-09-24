import { SyncContracts } from "@/application/use-case/sync/sync-contract";

export class ContractSyncJob {
  private lock = false;
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly syncUseCase: SyncContracts,
    private readonly intervalMs = 10_000
  ) {}

  start() {
    if (this.timer) return;
    // run immediately once, then on interval
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
      await this.syncUseCase.execute();
    } catch (e) {
      console.warn(`[contract-sync] tick error: ${(e as Error).message}`);
    } finally {
      this.lock = false;
    }
  }
}
