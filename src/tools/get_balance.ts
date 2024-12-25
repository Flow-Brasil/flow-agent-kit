import { LAMPORTS_PER_SOL, PublicKey } from '@Flow/web3.js';
import { FlowAgentKit } from '../index';

/**
 * Get the balance of SOL or an SPL token for the agent's wallet
 * @param agent - FlowAgentKit instance
 * @param token_address - Optional SPL token mint address. If not provided, returns SOL balance
 * @returns Promise resolving to the balance as a number (in UI units) or null if account doesn't exist
 */
export async function get_balance(agent: FlowAgentKit, token_address?: PublicKey): Promise<number> {
  if (!token_address)
    return (await agent.connection.getBalance(agent.wallet_address)) / LAMPORTS_PER_SOL;

  const token_account = await agent.connection.getTokenAccountBalance(token_address);
  return token_account.value.uiAmount || 0;
}
