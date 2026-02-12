import { Request, Response, NextFunction } from "express";
import type { AppContainer } from "@/main/container";
import { NFTOwner } from "@/domain/entities/nft-owner";
import { mapNFTOwnerRecordToDTO } from "@/domain/dto/nft-owner.dto";
import { randomUUID } from "crypto";
import { Address } from "viem";

export async function resyncContract(req: Request, res: Response, next: NextFunction) {
  try {
    const {services } = (req.app.locals.container as AppContainer);
    const { contractAddress, fromBlock, toBlock } = req.body;

    await services.syncer.resyncContract({
      contractAddress: contractAddress as Address,
      fromBlock: BigInt(fromBlock),
      toBlock: BigInt(toBlock)
    });
    res.json({ success: true });
  } catch (e) { next(e); }
}
