export type NFTAttribute = { trait_type?: string; value?: string | number | boolean; [k: string]: any };

export class NFT {
  constructor(
    public id: string,
    public contractId: string,
    public nftContractAddress: string,
    public tokenId: string,
    public tokenUri: string | null,
    public metadataUpdated: boolean,
    public lastMetadataSyncTime: Date | null,
    public name: string | null,
    public description: string | null,
    public image: string | null,
    public externalUrl: string | null,
    public attributes: NFTAttribute[] | null,
    public raw: any | null
  ) { }
}


