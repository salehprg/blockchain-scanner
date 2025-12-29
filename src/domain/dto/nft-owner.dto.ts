import { NFTDTO } from "@/domain/dto/nft.dto";

export interface NFTOwnerDTO {
  id: string;
  contractId: string;
  ownerAddress: string;
  contractAddress: string;
  tokenId: string;
  count: string;
  lastTransactionHash: string | null;
  lastSyncTime: Date | null;
  nft?: NFTDTO | null;
}

export function mapNFTOwnerRecordToDTO(record: any): NFTOwnerDTO {
  const dto: NFTOwnerDTO = {
    id: record.id,
    contractId: record.contractId,
    ownerAddress: record.ownerAddress,
    contractAddress: record.contractAddress,
    tokenId: record.tokenId,
    count: (record.count ?? "0").toString(),
    lastTransactionHash: record.lastTransactionHash ?? null,
    lastSyncTime: record.lastSyncTime ?? null,
  };
  if (record.nft) {
    // avoid import cycle by mapping inline similar to mapNFTRecordToDTO
    dto.nft = {
      id: record.nft.id,
      contractId: record.nft.contractId,
      contractAddress: record.nft.contractAddress,
      tokenId: record.nft.tokenId,
      tokenUri: record.nft.tokenUri ?? null,
      metadataUpdated: !!record.nft.metadataUpdated,
      lastMetadataSyncTime: record.nft.lastMetadataSyncTime ?? null,
      name: record.nft.name ?? null,
      description: record.nft.description ?? null,
      image: record.nft.image ?? null,
      externalUrl: record.nft.externalUrl ?? null,
      attributes: Array.isArray(record.nft?.attributes) ? record.nft.attributes : null,
      raw: null,
    };
  } else {
    dto.nft = null;
  }
  return dto;
}


