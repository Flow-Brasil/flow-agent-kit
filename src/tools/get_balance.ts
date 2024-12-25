import { FlowAgentKit } from '../agent/index.js';

/**
 * Get the balance of FLOW or a fungible token for the agent's wallet
 * @param agent FlowAgentKit instance
 * @param token_identifier Optional token identifier. If not provided, returns FLOW balance
 * @returns Balance as a number
 */
export async function getBalance(
  agent: FlowAgentKit,
  address?: string,
  token_identifier?: string
): Promise<number> {
  if (!address) {
    address = agent.address;
  }

  return agent.getBalance(address);
}
