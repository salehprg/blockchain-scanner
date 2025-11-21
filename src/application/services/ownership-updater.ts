import { Address, getAddress } from "viem";
import { ZERO_ADDRESS } from "@/infrastructure/blockchain/evm-events";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";

function isZero(addr: string) { return addr.toLowerCase() === ZERO_ADDRESS.toLowerCase(); }

export class OwnershipUpdater {
  constructor(private readonly ownerRepo: INFTOwnerRepository) { }

  // === ERC721 ===
  // transfer/mint/burn tokenId (count == 1)
  async applyTransfer721(params: {
    contractId: string;
    transactionHash: string;
    nftContractAddress: Address;
    from: Address;
    to: Address;
    tokenId: bigint;
  }): Promise<void> {
    const tokenIdStr = params.tokenId.toString();
    const to = getAddress(params.to);
    const from = getAddress(params.from);

    if (isZero(to)) {
      // burn
      const rec = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.nftContractAddress, tokenId: tokenIdStr });
      if (rec.length != 0) {
        await this.ownerRepo.delete(rec[0].id);
      }
      else
        this.ownerRepo.update(rec[0]);

      return;
    }

    // remove from old owner (if any)
    if (!isZero(from)) {
      const prev = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.nftContractAddress, tokenId: tokenIdStr });

      if (prev.length != 0) {
        await this.ownerRepo.delete(prev[0].id);
      }
    }

    // add to new owner
    const existing = (await this.ownerRepo.filterOwners({ ownerAddress: to, contractAddress: params.nftContractAddress, tokenId: tokenIdStr }))[0];
    if (existing) {
      existing.count = 1;
      existing.lastTransactionHash = params.transactionHash;

      await this.ownerRepo.update(existing);
    } else {
      await this.ownerRepo.create(new NFTOwner(
        crypto.randomUUID(),
        params.contractId,
        to,
        params.nftContractAddress,
        tokenIdStr,
        1,
        params.transactionHash,
        new Date()
      ));
    }
  }

  // === ERC1155 (TransferSingle) ===
  async applyTransfer1155Single(params: {
    contractId: string;
    nftContractAddress: Address;
    transactionHash: string;
    from: Address;
    to: Address;
    id: bigint;
    value: bigint;
  }): Promise<void> {
    const tokenIdStr = params.id.toString();
    const amount = Number(params.value);
    if (amount === 0) return;

    // decrement from "from"
    if (!isZero(params.from)) {
      const from = getAddress(params.from);
      const prev = await this.ownerRepo.filterOwners({ ownerAddress: from, contractAddress: params.nftContractAddress, tokenId: tokenIdStr });

      if (prev.length != 0) {
        await this.ownerRepo.delete(prev[0].id);
      }
      else await this.ownerRepo.update(prev[0]);
    }

    // increment to "to"
    if (!isZero(params.to)) {
      const to = getAddress(params.to);
      const ex = (await this.ownerRepo.filterOwners({ ownerAddress: to, contractAddress: params.nftContractAddress, tokenId: tokenIdStr }))[0];
      if (ex) {
        ex.count = ex.count + amount;
        ex.lastTransactionHash = params.transactionHash
        await this.ownerRepo.update(ex);
      } else {
        await this.ownerRepo.create(new NFTOwner(
          crypto.randomUUID(),
          params.contractId,
          to,
          params.nftContractAddress,
          tokenIdStr,
          amount,
          params.transactionHash,
          new Date()
        ));
      }
    }
  }
}
