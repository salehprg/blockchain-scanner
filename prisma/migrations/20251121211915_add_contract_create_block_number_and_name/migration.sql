BEGIN;

-- Add contractCreateBlockNumber column to BlockchainContracts table
ALTER TABLE "BlockchainContracts"
  ADD COLUMN "contractCreateBlockNumber" TEXT;

-- Add contractName column to BlockchainContracts table
ALTER TABLE "BlockchainContracts"
  ADD COLUMN "contractName" VARCHAR(255);

COMMIT;

