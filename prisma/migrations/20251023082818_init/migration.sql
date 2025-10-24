-- CreateTable
CREATE TABLE "BlockchainConfigs" (
    "id" UUID NOT NULL,
    "chainId" INTEGER NOT NULL,
    "rpcUrlBase" TEXT NOT NULL,
    "rpcUrlAlter" TEXT,

    CONSTRAINT "BlockchainConfigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockchainContracts" (
    "id" UUID NOT NULL,
    "contractAddress" VARCHAR(100) NOT NULL,
    "contractType" VARCHAR(20) NOT NULL,
    "chainId" INTEGER NOT NULL,
    "lastSyncBlock" TEXT,
    "lastSyncTime" TIMESTAMPTZ,

    CONSTRAINT "BlockchainContracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTOwners" (
    "id" UUID NOT NULL,
    "contractId" UUID NOT NULL,
    "ownerAddress" VARCHAR(100) NOT NULL,
    "nftContractAddress" VARCHAR(100) NOT NULL,
    "nftItemId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "lastTransactionHash" VARCHAR(100),
    "lastSyncTime" TIMESTAMPTZ,

    CONSTRAINT "NFTOwners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractLogs" (
    "id" UUID NOT NULL,
    "contractId" UUID NOT NULL,
    "chainId" INTEGER NOT NULL,
    "nftContractAddress" VARCHAR(100) NOT NULL,
    "blockNumber" TEXT NOT NULL,
    "transactionHash" VARCHAR(100) NOT NULL,
    "logIndex" INTEGER NOT NULL,
    "eventType" VARCHAR(50) NOT NULL,
    "fromAddress" VARCHAR(100),
    "toAddress" VARCHAR(100),
    "operatorAddress" VARCHAR(100),
    "tokenId" TEXT,
    "value" TEXT,
    "loggedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ContractLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTs" (
    "id" UUID NOT NULL,
    "contractId" UUID NOT NULL,
    "nftContractAddress" VARCHAR(100) NOT NULL,
    "tokenId" TEXT NOT NULL,
    "tokenUri" TEXT,
    "metadataUpdated" BOOLEAN NOT NULL DEFAULT false,
    "lastMetadataSyncTime" TIMESTAMPTZ,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "externalUrl" TEXT,
    "attributes" JSONB,
    "raw" JSONB,

    CONSTRAINT "NFTs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlockchainConfigs_chainId_key" ON "BlockchainConfigs"("chainId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockchainContracts_contractAddress_key" ON "BlockchainContracts"("contractAddress");

-- CreateIndex
CREATE INDEX "NFTOwners_contractId_idx" ON "NFTOwners"("contractId");

-- CreateIndex
CREATE INDEX "NFTOwners_ownerAddress_nftContractAddress_nftItemId_idx" ON "NFTOwners"("ownerAddress", "nftContractAddress", "nftItemId");

-- CreateIndex
CREATE INDEX "ContractLogs_contractId_blockNumber_idx" ON "ContractLogs"("contractId", "blockNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ContractLogs_transactionHash_logIndex_key" ON "ContractLogs"("transactionHash", "logIndex");

-- CreateIndex
CREATE UNIQUE INDEX "NFTs_nftContractAddress_tokenId_key" ON "NFTs"("nftContractAddress", "tokenId");
