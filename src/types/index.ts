export type FlowNetwork = "mainnet" | "testnet" | "emulator";

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
  status: "success" | "error";
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

export interface TokenData {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  icon?: string;
  website?: string;
  description?: string;
}
