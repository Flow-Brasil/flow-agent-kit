export type FlowNetwork = 'mainnet' | 'testnet' | 'emulator';

export interface TokenDeployment {
  tokenId: string;
  transactionId: string;
}

export interface CollectionDeployment {
  collectionId: string;
  transactionId: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface TransactionResult {
  status: 'success' | 'error';
  transactionId?: string;
  error?: string;
}

export interface Creator {
  address: string;
  percentage: number;
}

export interface CollectionOptions {
  name: string;
  uri: string;
  royaltyBasisPoints?: number;
  creators?: Creator[];
}

export interface MintCollectionNFTResponse {
  mint: string;
  metadata: string;
}

export interface PumpFunTokenOptions {
  twitter?: string;
  telegram?: string;
  website?: string;
  initialLiquiditySOL?: number;
  slippageBps?: number;
  priorityFee?: number;
}

export interface PumpfunLaunchResponse {
  signature: string;
  mint: string;
  metadataUri?: string;
  error?: string;
}

export interface LuloAccountDetailsResponse {
  totalValue: number;
  interestEarned: number;
  realtimeApy: number;
  settings: {
    owner: string;
    allowedProtocols: string | null;
    homebase: string | null;
    minimumRate: string;
  };
}

export interface JupiterTokenData {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  tags: string[];
  logoURI: string;
  daily_volume: number;
  freeze_authority: string | null;
  mint_authority: string | null;
  permanent_delegate: string | null;
  extensions: {
    coingeckoId?: string;
  };
}

export interface FetchPriceResponse {
  status: 'success' | 'error';
  tokenId?: string;
  priceInUSDC?: string;
  message?: string;
  code?: string;
}

export interface PythFetchPriceResponse {
  status: 'success' | 'error';
  priceFeedID: string;
  price?: string;
  message?: string;
  code?: string;
}
