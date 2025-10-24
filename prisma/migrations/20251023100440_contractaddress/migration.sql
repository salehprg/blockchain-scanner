BEGIN;

-- ContractLogs: rename column
ALTER TABLE "ContractLogs"
  RENAME COLUMN "nftContractAddress" TO "contractAddress";

-- NFTOwners: rename columns
ALTER TABLE "NFTOwners"
  RENAME COLUMN "nftContractAddress" TO "contractAddress";
ALTER TABLE "NFTOwners"
  RENAME COLUMN "nftItemId" TO "tokenId";

-- NFTs: rename column
ALTER TABLE "NFTs"
  RENAME COLUMN "nftContractAddress" TO "contractAddress";

-- Rename existing indexes to match new column names
-- (their column references are updated automatically by the column renames)
ALTER INDEX "public"."NFTOwners_ownerAddress_nftContractAddress_nftItemId_idx"
  RENAME TO "NFTOwners_ownerAddress_contractAddress_tokenId_idx";

ALTER INDEX "public"."NFTs_nftContractAddress_tokenId_key"
  RENAME TO "NFTs_contractAddress_tokenId_key";

COMMIT;
