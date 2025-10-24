import { NFTAttribute } from "@/domain/entities/nft";

export interface NFTDTO {
  id: string;
  contractId: string;
  contractAddress: string;
  tokenId: string;
  tokenUri: string | null;
  metadataUpdated: boolean;
  lastMetadataSyncTime: Date | null;
  name: string | null;
  description: string | null;
  image: string | null;
  externalUrl: string | null;
  attributes: NFTAttribute[] | null;
  raw: any | null;
}

export function mapNFTRecordToDTO(record: any): NFTDTO {
  return {
    id: record.id,
    contractId: record.contractId,
    contractAddress: record.contractAddress?.toLowerCase(),
    tokenId: record.tokenId?.toLowerCase(),
    tokenUri: record.tokenUri ?? null,
    metadataUpdated: !!record.metadataUpdated,
    lastMetadataSyncTime: record.lastMetadataSyncTime ?? null,
    name: record.name ?? null,
    description: record.description ?? null,
    image: record.image ?? null,
    externalUrl: record.externalUrl ?? null,
    attributes: Array.isArray(record?.attributes) ? (record.attributes as NFTAttribute[]) : null,
    raw: null,
  };
}


