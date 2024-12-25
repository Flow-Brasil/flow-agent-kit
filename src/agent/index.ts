import * as fcl from '@onflow/fcl';
import * as types from '@onflow/types';
import { FlowNetwork } from '../types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

/**
 * Main class for interacting with Flow blockchain
 * Provides a unified interface for token operations, NFT management, and trading
 */
export class FlowAgentKit {
  public address: string;
  private genAI: GoogleGenerativeAI;
  private model: any;

  /**
   * Creates an instance of FlowAgentKit
   * @param private_key - Flow account private key
   * @param network - Flow network to connect to
   * @param gemini_api_key - Gemini API key for AI features
   */
  constructor(private_key: string, network: FlowNetwork = 'mainnet', gemini_api_key: string) {
    // Configure FCL
    const accessNode = process.env.FLOW_ACCESS_NODE || (
      network === 'testnet'
        ? 'https://rest-testnet.onflow.org'
        : network === 'mainnet'
          ? 'https://rest-mainnet.onflow.org'
          : 'http://localhost:8888'
    );

    const walletDiscovery = network === 'mainnet'
      ? 'https://fcl-discovery.onflow.org/authn'
      : network === 'testnet'
        ? 'https://fcl-discovery.onflow.org/testnet/authn'
        : 'http://localhost:8701/fcl/authn';

    fcl.config({
      'flow.network': network,
      'app.detail.title': 'Flow Agent Kit',
      'accessNode.api': accessNode,
      'discovery.wallet': walletDiscovery,
    } as any);

    // Initialize account
    this.address = private_key;

    // Initialize Gemini
    this.genAI = new GoogleGenerativeAI(gemini_api_key);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  /**
   * Generate content using Gemini
   * @param prompt - The prompt to send to Gemini
   * @returns Generated content
   */
  public async generateContent(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to generate content: ${errorMessage}`);
    }
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
