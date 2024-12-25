/**
 * Common token addresses on Flow
 */
export const TOKENS = {
  FLOW: '0x1654653399040a61',
  USDC: '0xb19436aae4d94622',
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
