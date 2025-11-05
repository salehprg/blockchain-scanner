import { SyncSolanaPrograms } from "@/application/use-case/sync/sync-solana";

export class SolanaSyncJob {
  private lock = false;
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly syncUseCase: SyncSolanaPrograms,
    private readonly intervalMs = 15_000
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
      await this.syncUseCase.execute();
    } catch (e) {
      console.warn(`[solana-sync] tick error: ${(e as Error).message}`);
    } finally {
      this.lock = false;
    }
  }
}


