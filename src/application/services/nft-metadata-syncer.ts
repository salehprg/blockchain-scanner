import { Address } from "viem";
import { randomUUID } from "crypto";
import { IBlockchainReader } from "@/domain/ports/blockchain-reader";
import { ISolanaReader } from "@/domain/ports/solana-reader";
import { INFTRepository } from "@/domain/repository/nft-repo";
import { NFT } from "@/domain/entities/nft";
import { contract_abis as ERC1155_ABI } from "@/application/blockchain-abis/abis";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { ERC721_ABI } from "../blockchain-abis/ERC721";
import { ContractType } from "@/domain/entities/blockchain-contract";


export class NFTMetadataSyncer {
  constructor(
    private readonly reader: IBlockchainReader,
    private readonly nftRepo: INFTRepository,
    private readonly ownerRepo: INFTOwnerRepository,
    private readonly solanaReader?: ISolanaReader
  ) { }

  async syncContract(params: {
    chainId: number;
    contractId: string;
    contractAddress: Address;
    contractType: ContractType;
  }): Promise<void> {
    const addr = (params.contractType === "SOLANA"
      ? params.contractAddress
      : (params.contractAddress as string).toLowerCase()) as Address;

    const tokenIds = await this.fetchAllTokenIds(params.chainId, addr, params.contractType);

    const existing = await this.nftRepo.filterNFTs({ contractAddress: addr });
    const toUpsert: NFT[] = [];

    for (const tokenId of tokenIds) {
      const exist_token = existing.find(x => x.tokenId == tokenId)

      if (exist_token && !exist_token.metadataUpdated) {
        const tokenUri = await this.fetchTokenUri(params.chainId, addr, params.contractType, tokenId).catch(() => null);
        const tmp_nft = new NFT(
          exist_token.id,
          params.contractId,
          addr,
          tokenId,
          tokenUri,
          false,
          null
        )

        toUpsert.push(tmp_nft);
      }
      else if (!exist_token) {
        const tokenUri = await this.fetchTokenUri(params.chainId, addr, params.contractType, tokenId).catch(() => null);
        const tmp_nft = new NFT(
          randomUUID(),
          params.contractId,
          addr,
          tokenId,
          tokenUri,
          false,
          null
        )

        toUpsert.push(tmp_nft);
      }
    }

    for (const nft of toUpsert) {
      if (!nft || !nft.tokenUri) continue;

      try {
        const meta = await this.fetchMetadataFromUri(nft.tokenUri).catch(() => null);
        if (!meta) continue;

        nft.name = meta.name ?? null;
        nft.description = meta.description ?? null;
        nft.image = meta.image ?? null;
        nft.externalUrl = meta.external_url ?? null;
        nft.attributes = Array.isArray(meta.attributes) ? meta.attributes : null
        nft.lastMetadataSyncTime = new Date()
        nft.metadataUpdated = true
        nft.raw = meta

        await this.nftRepo.upsert(nft);
      }
      catch { }
    }
  }

  private async fetchAllTokenIds(chainId: number, contract: Address, type: ContractType): Promise<string[]> {
    if (type === "ERC1155" || type == "ERC721") {
      // try to infer range from getBaseURICount / getBatchIdAtIndex / TokensLazyMinted pattern
      try {
        const nextId = await this.reader.readContract<bigint>({ chainId, address: contract, abi: ERC1155_ABI as any, functionName: "nextTokenIdToMint" });
        const ids: string[] = [];
        for (let i = 0n; i < nextId; i++) ids.push(i.toString());
        return ids;
      } catch { }
    }
    // fallback: derive from owners table (observed transfers)
    const owners = await this.ownerRepo.filterOwners({ contractAddress: contract });
    const set = new Set<string>();
    for (const o of owners) set.add(type === "SOLANA" ? o.tokenId : o.tokenId.toLowerCase());
    return Array.from(set.values());
  }

  private async fetchTokenUri(chainId: number, contract: Address, type: ContractType, tokenId: string): Promise<string | null> {
    if (type === "SOLANA") {
      if (!this.solanaReader) return null;
      return await this.solanaReader.getMetadataUri(chainId, tokenId);
    }
    if (type === "ERC1155") {
      try {
        const uri = await this.reader.readContract<string>({ chainId, address: contract, abi: ERC1155_ABI as any, functionName: "uri", args: [BigInt(tokenId)] });
        return this.normalizeTokenUri(uri, tokenId);
      } catch { return null; }
    }
    if (type === "ERC721") {
      try {
        const uri = await this.reader.readContract<string>({ chainId, address: contract, abi: ERC721_ABI as any, functionName: "tokenURI", args: [BigInt(tokenId)] });
        return this.normalizeTokenUri(uri, tokenId);
      } catch { return null; }
    }
    return null;
  }

  private normalizeTokenUri(uri: string, tokenId: string): string {
    // ERC1155 may have {id} placeholder which should be hex-32 lowercased
    if (uri.includes("{id}")) {
      const idHex = BigInt(tokenId).toString(16).padStart(64, "0");
      uri = uri.replace("{id}", idHex);
    }
    if (uri.startsWith("ipfs://")) {
      return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    return uri;
  }

  private async fetchMetadataFromUri(uri: string): Promise<any> {
    const res = await fetch(uri);
    if (!res.ok) throw new Error(`metadata fetch failed ${res.status}`);
    return await res.json();
  }

  async syncSolanaNFT(params: { chainId: number; contractId: string; programAddress: string; mint: string }): Promise<void> {
    const addr = params.programAddress as Address;
    const tokenId = params.mint;

    const existing = (await this.nftRepo.filterNFTs({ contractAddress: addr, tokenId }))[0];
    if (existing && existing.metadataUpdated) return;

    const tokenUri = await this.fetchTokenUri(params.chainId, addr, "SOLANA", tokenId);

    if (!existing) {
      const nft = new NFT(
        randomUUID(),
        params.contractId,
        addr,
        tokenId,
        tokenUri ?? null,
        false,
        null
      );
      await this.nftRepo.upsert(nft);
    }

    if (tokenUri) {
      try {
        const meta = await this.fetchMetadataFromUri(tokenUri).catch(() => null);
        if (!meta) return;

        const toUpdate = (await this.nftRepo.filterNFTs({ contractAddress: addr, tokenId }))[0];
        if (!toUpdate) return;

        toUpdate.name = meta.name ?? null;
        toUpdate.description = meta.description ?? null;
        toUpdate.image = meta.image ?? null;
        toUpdate.externalUrl = meta.external_url ?? null;
        toUpdate.attributes = Array.isArray(meta.attributes) ? meta.attributes : null;
        toUpdate.lastMetadataSyncTime = new Date();
        toUpdate.metadataUpdated = true;
        toUpdate.raw = meta;

        await this.nftRepo.upsert(toUpdate);
      } catch {}
    }
  }
}


