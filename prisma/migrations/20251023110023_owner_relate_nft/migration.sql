-- AddForeignKey
ALTER TABLE "NFTOwners" ADD CONSTRAINT "NFTOwners_contractAddress_tokenId_fkey" FOREIGN KEY ("contractAddress", "tokenId") REFERENCES "NFTs"("contractAddress", "tokenId") ON DELETE RESTRICT ON UPDATE CASCADE;
