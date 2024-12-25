import { FlowAgentKit } from '../agent/index.js';
import * as fcl from '@onflow/fcl';
import * as types from '@onflow/types';

/**
 * Transfer FLOW or other tokens to a recipient
 * @param agent FlowAgentKit instance
 * @param to Recipient's address
 * @param amount Amount to transfer
 * @param tokenIdentifier Optional token identifier for non-FLOW tokens
 * @returns Transaction ID
 */
export async function transfer(
  agent: FlowAgentKit,
  to: string,
  amount: number,
  tokenIdentifier?: string
): Promise<string> {
  try {
    let cadence: string;
    let args: Parameters<typeof fcl.arg>[];

    if (!tokenIdentifier) {
      // Transfer native FLOW
      cadence = `
        #!cadence v1.0

        import FungibleToken from 0xFungibleToken
        import FlowToken from 0xFlowToken
        
        transaction(amount: UFix64, recipient: Address) {
          prepare(signer: AuthAccount) {
            let payment <- signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!
              .withdraw(amount: amount)
            
            let recipientAccount = getAccount(recipient)
            let receiverRef = recipientAccount.getCapability(/public/flowTokenReceiver)!
              .borrow<&{FungibleToken.Receiver}>()
              ?? panic("Could not borrow receiver reference")
            
            receiverRef.deposit(from: <-payment)
          }
        }
      `;

      args = [
        [amount.toFixed(8), types.UFix64],
        [to, types.Address],
      ];
    } else {
      // Transfer custom token
      cadence = `
        #!cadence v1.0

        import FungibleToken from 0xFungibleToken
        
        transaction(amount: UFix64, recipient: Address) {
          prepare(signer: AuthAccount) {
            let token = signer.borrow<&FungibleToken.Vault>(from: /storage/${tokenIdentifier}Vault)
              ?? panic("Could not borrow token vault")
            
            let payment <- token.withdraw(amount: amount)
            
            let recipientAccount = getAccount(recipient)
            let receiverRef = recipientAccount.getCapability(/public/${tokenIdentifier}Receiver)
              .borrow<&{FungibleToken.Receiver}>()
              ?? panic("Could not borrow receiver reference")
            
            receiverRef.deposit(from: <-payment)
          }
        }
      `;

      args = [
        [amount.toFixed(8), types.UFix64],
        [to, types.Address],
      ];
    }

    const transactionId = await fcl.mutate({
      cadence,
      args: () => args.map(([value, type]) => fcl.arg(value, type)),
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 9999,
    });

    return transactionId;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Transfer failed: ${errorMessage}`);
  }
}
