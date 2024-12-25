import * as fcl from '@onflow/fcl';
import * as types from '@onflow/types';
import { FlowNetwork } from '../types';

/**
 * Main class for interacting with Flow blockchain
 * Provides a unified interface for token operations, NFT management, and trading
 */
export class FlowAgentKit {
  public address: string;
  public openai_api_key: string;

  /**
   * Creates an instance of FlowAgentKit
   * @param private_key - Flow account private key
   * @param network - Flow network to connect to
   * @param openai_api_key - OpenAI API key for AI features
   */
  constructor(private_key: string, network: FlowNetwork = 'mainnet', openai_api_key: string) {
    // Configure FCL
    if (network === 'testnet') {
      fcl.config({
        'flow.network': 'testnet',
        'app.detail.title': 'Flow Agent Kit',
        'accessNode.api': 'https://rest-testnet.onflow.org',
        'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
      } as any);
    } else if (network === 'mainnet') {
      fcl.config({
        'flow.network': 'mainnet',
        'app.detail.title': 'Flow Agent Kit',
        'accessNode.api': 'https://rest-mainnet.onflow.org',
        'discovery.wallet': 'https://fcl-discovery.onflow.org/authn',
      } as any);
    } else {
      fcl.config({
        'flow.network': 'emulator',
        'app.detail.title': 'Flow Agent Kit',
        'accessNode.api': 'http://localhost:8888',
        'discovery.wallet': 'http://localhost:8701/fcl/authn',
      } as any);
    }

    // Initialize account
    this.address = private_key;
    this.openai_api_key = openai_api_key;
  }

  /**
   * Deploy a new fungible token
   * @param name - Token name
   * @param symbol - Token symbol
   * @param initialSupply - Initial token supply
   * @returns Transaction ID
   */
  public async deployToken(
    name: string,
    symbol: string,
    initialSupply = 1000000
  ): Promise<string> {
    const transactionId = await fcl.mutate({
      cadence: `
        import FungibleToken from 0xFungibleToken
        
        transaction(name: String, symbol: String, initialSupply: UFix64) {
          prepare(signer: AuthAccount) {
            // Token deployment logic here
          }
        }
      `,
      args: (arg: typeof fcl.arg, t: typeof types) => [
        arg(name, t.String),
        arg(symbol, t.String),
        arg(initialSupply.toFixed(8), t.UFix64),
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });

    return transactionId;
  }

  /**
   * Get token balance for an address
   * @param address - Optional address to check balance for
   * @param tokenIdentifier - Optional token identifier
   * @returns Token balance
   */
  public async getBalance(address?: string, tokenIdentifier?: string): Promise<number> {
    const targetAddress = address || this.address;

    const balance = await fcl.query({
      cadence: `
        import FungibleToken from 0xFungibleToken
        
        pub fun main(address: Address): UFix64 {
          // Balance query logic here
          return 0.0
        }
      `,
      args: (arg: typeof fcl.arg, t: typeof types) => [arg(targetAddress, t.Address)],
    }) as string;

    return parseFloat(balance);
  }

  /**
   * Transfer tokens to another address
   * @param to - Recipient address
   * @param amount - Amount to transfer
   * @param tokenIdentifier - Optional token identifier
   * @returns Transaction ID
   */
  public async transfer(to: string, amount: number, tokenIdentifier?: string): Promise<string> {
    const transactionId = await fcl.mutate({
      cadence: `
        import FungibleToken from 0xFungibleToken
        
        transaction(recipient: Address, amount: UFix64) {
          prepare(signer: AuthAccount) {
            // Transfer logic here
          }
        }
      `,
      args: (arg: typeof fcl.arg, t: typeof types) => [
        arg(to, t.Address),
        arg(amount.toFixed(8), t.UFix64),
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });

    return transactionId;
  }

  /**
   * Deploy a new NFT collection
   * @param name - Collection name
   * @param description - Collection description
   * @param baseURI - Base URI for NFT metadata
   * @returns Transaction ID
   */
  public async deployCollection(name: string, description: string, baseURI: string): Promise<string> {
    const transactionId = await fcl.mutate({
      cadence: `
        import NonFungibleToken from 0xNonFungibleToken
        
        transaction(name: String, description: String, baseURI: String) {
          prepare(signer: AuthAccount) {
            // Collection deployment logic here
          }
        }
      `,
      args: (arg: typeof fcl.arg, t: typeof types) => [
        arg(name, t.String),
        arg(description, t.String),
        arg(baseURI, t.String),
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });

    return transactionId;
  }
}
