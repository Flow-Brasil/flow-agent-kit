import { FlowAgentKit } from '../agent/index.js';
import * as fcl from '@onflow/fcl';

/**
 * Get the current transactions per second (TPS) of the Flow network
 * @param agent FlowAgentKit instance
 * @returns Current TPS as a number
 */
export async function get_tps(agent: FlowAgentKit): Promise<number> {
  try {
    const latestBlock = await fcl.send([fcl.getBlock(true)]).then(fcl.decode);
    const previousBlock = await fcl.send([fcl.getBlock(false, latestBlock.height - 1)]).then(fcl.decode);

    const timeDiff = (latestBlock.timestamp - previousBlock.timestamp) / 1000; // em segundos
    const txCount = latestBlock.collectionGuarantees.length;

    return txCount / timeDiff;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to get TPS: ${errorMessage}`);
  }
}
