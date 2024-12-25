import { FlowAgentKit } from '../agent/index.js';

/**
 * Get the balance of FLOW or a fungible token for the agent's wallet
 * @param agent FlowAgentKit instance
 * @param token_identifier Optional token identifier. If not provided, returns FLOW balance
 * @returns Balance as a number
 */
export async function get_balance(
  agent: FlowAgentKit,
  token_identifier?: string
): Promise<number> {
  return agent.getBalance(undefined, token_identifier);
}
