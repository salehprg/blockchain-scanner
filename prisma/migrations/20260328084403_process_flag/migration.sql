/*
  Warnings:

  - Made the column `tokenId` on table `NFTOwners` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContractLogs" ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "NFTOwners" ALTER COLUMN "tokenId" SET NOT NULL;
