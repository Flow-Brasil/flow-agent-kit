import { FlowAgentKit } from '../agent/index.js';

/**
 * Request test tokens from the Flow testnet faucet
 * @param agent FlowAgentKit instance
 * @returns Transaction ID of the faucet request
 */
export async function request_faucet_funds(agent: FlowAgentKit): Promise<string> {
  if (!agent.address) {
    throw new Error('Agent address not initialized');
  }

  const response = await fetch('https://testnet-faucet.onflow.org/fund-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address: agent.address,
    }),
  });

  if (!response.ok) {
    throw new Error(`Faucet request failed: ${response.statusText}`);
  }

  const data = await response.json() as { transactionId: string };
  return data.transactionId;
}
