import { defineChain } from "viem";

export const somnia = defineChain({
  id: 5031,
  name: 'Somnia',
  nativeCurrency: {
    decimals: 18,
    name: 'Somi',
    symbol: 'SOMI',
  },
  rpcUrls: {
    default: {
      http: ['https://api.infra.mainnet.somnia.network/'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.somnia.network/' },
  },
  contracts: {
    multicall3: {
      address: '0x5e44F178E8cF9B2F5409B6f18ce936aB817C5a11',
      blockCreated: 38516341,
    },
  },
})