export type NFTAttribute = { trait_type?: string; value?: string | number | boolean; [k: string]: any };

export class NFTMetadata {
  constructor(
    public id: string,
    public nftId: string,
    public name: string | null,
    public description: string | null,
    public image: string | null,
    public externalUrl: string | null,
    public attributes: NFTAttribute[] | null,
    public raw: any | null
  ) {}
}


