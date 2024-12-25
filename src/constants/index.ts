/**
 * Common token addresses on Flow
 */
export const TOKENS = {
  FLOW: '0x1654653399040a61',
  FUSD: '0x3c5959b568896393',
  USDC: '0xb19436aae4d94622',
  tUSDT: '0x95e019a17d0e23d7',
  BLT: '0x0f9df91c9121c460',
} as const;

/**
 * Network configuration
 */
export const NETWORK = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
  EMULATOR: 'emulator',
} as const;

/**
 * API endpoints
 */
export const API = {
  TESTNET_FAUCET: 'https://testnet-faucet.onflow.org/fund-account',
  MAINNET_API: 'https://rest-mainnet.onflow.org',
  TESTNET_API: 'https://rest-testnet.onflow.org',
} as const;
