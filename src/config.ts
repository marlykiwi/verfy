import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

const INFURA_API_KEY = "753cc78f52604510b0dc93c72f623740"

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask()
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})