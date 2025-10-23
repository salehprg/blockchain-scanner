import { Address } from "viem";
import { randomUUID } from "crypto";
import { IBlockchainReader } from "@/domain/ports/blockchain-reader";
import { INFTRepository } from "@/domain/repository/nft-repo";
import { INFTMetadataRepository } from "@/domain/repository/nft-metadata-repo";
import { NFT } from "@/domain/entities/nft";
import { NFTMetadata } from "@/domain/entities/nft-metadata";
import { contract_abis as ERC1155_ABI } from "@/application/blockchain-abis/abis";
import { INFTOwnerRepository } from "@/domain/repository/nft-owner-repo.ts";
import { ERC721_ABI } from "../blockchain-abis/ERC721";

type ContractType = "ERC721" | "ERC1155";

export class NFTMetadataSyncer {
  constructor(
    private readonly reader: IBlockchainReader,
    private readonly nftRepo: INFTRepository,
    private readonly metadataRepo: INFTMetadataRepository,
    private readonly ownerRepo: INFTOwnerRepository
  ) { }

  async syncContract(params: {
    chainId: number;
    contractId: string;
    contractAddress: Address;
    contractType: ContractType;
  }): Promise<void> {
    const addr = params.contractAddress.toLowerCase() as Address;

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

    await this.nftRepo.upsertMany(toUpsert);

    const nftByToken = new Map(toUpsert.map(n => [n.tokenId, n] as const));

    for (const tokenId of tokenIds) {
      const nft = nftByToken.get(tokenId);
      if (!nft || !nft.tokenUri) continue;
      const meta = await this.fetchMetadataFromUri(nft.tokenUri).catch(() => null);
      if (!meta) continue;

      const oldnftmetadata = (await this.metadataRepo.filterNFTMetadata({ nftId: nft.id }))[0];

      if (oldnftmetadata) {
        await this.metadataRepo.upsert(new NFTMetadata(
          oldnftmetadata.id,
          nft.id,
          meta.name ?? null,
          meta.description ?? null,
          meta.image ?? null,
          meta.external_url ?? null,
          Array.isArray(meta.attributes) ? meta.attributes : null,
          meta
        ));
      }
      else {
        await this.metadataRepo.upsert(new NFTMetadata(
          randomUUID(),
          nft.id,
          meta.name ?? null,
          meta.description ?? null,
          meta.image ?? null,
          meta.external_url ?? null,
          Array.isArray(meta.attributes) ? meta.attributes : null,
          meta
        ));
      }

      await this.nftRepo.update(new NFT(
        nft.id,
        nft.contractId,
        nft.nftContractAddress,
        nft.tokenId,
        nft.tokenUri,
        true,
        new Date()
      ));
    }
  }

  private async fetchAllTokenIds(chainId: number, contract: Address, type: ContractType): Promise<string[]> {
    if (type === "ERC1155") {
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
    for (const o of owners) set.add(o.nftItemId.toLowerCase());
    return Array.from(set.values());
  }

  private async fetchTokenUri(chainId: number, contract: Address, type: ContractType, tokenId: string): Promise<string | null> {
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
}


