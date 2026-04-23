-- AlterTable
ALTER TABLE "BlockchainContracts" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "NFTOwners" ADD CONSTRAINT "NFTOwners_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "BlockchainContracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractLogs" ADD CONSTRAINT "ContractLogs_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "BlockchainContracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
