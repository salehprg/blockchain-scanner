import { Address } from "viem"

export type AdapterTransactionSource = "rpc" | "api"

// Normalized EVM event/log output (RPC or API fallback)
export type AdapterTransaction = {
    transactionHash: string
    blockNumber: bigint
    logIndex: number
    address: Address
    args: any
    value: bigint
    source: AdapterTransactionSource
    eventName: string

    // Optional metadata (best-effort; may be missing for API fallback)
    blockHash?: string
    topics?: string[]
    data?: string
    eventSignature?: string
}