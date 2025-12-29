import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { NFTOwner } from "@/domain/entities/nft-owner";

function isZero(addr: string) {
  return !addr || /^0x0+$/.test(addr) || addr === "11111111111111111111111111111111";
}

export class SolanaOwnershipUpdater {
  constructor(private readonly ownerRepo: INFTOwnerRepository) {}

  async applyTransfer(params: {
    contractId: string;
    transactionSignature: string;
    programAddress: string;
    from: string;
    to: string;
    mint: string; // tokenId equivalent for Solana
  }): Promise<void> {
    const tokenIdStr = params.mint;
    const to = params.to;
    const from = params.from;

    if (isZero(to)) {
      const rec = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.programAddress, tokenId: tokenIdStr });
      if (rec.length != 0) {
        await this.ownerRepo.delete(rec[0].id);
      }
      else if (rec[0]) {
        await this.ownerRepo.update(rec[0]);
      }
      return;
    }

    if (!isZero(from)) {
      const prev = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.programAddress, tokenId: tokenIdStr });
      if (prev.length != 0) {
        await this.ownerRepo.delete(prev[0].id);
      }
    }

    const existing = (await this.ownerRepo.filterOwners({ ownerAddress: to, contractAddress: params.programAddress, tokenId: tokenIdStr }))[0];
    if (existing) {
      existing.count = BigInt(existing.count) + 1n;
      existing.lastTransactionHash = params.transactionSignature;
      await this.ownerRepo.update(existing);
    } else {
      await this.ownerRepo.create(new NFTOwner(
        crypto.randomUUID(),
        params.contractId,
        to,
        params.programAddress,
        tokenIdStr,
        1n,
        params.transactionSignature,
        new Date()
      ));
    }
  }
}


