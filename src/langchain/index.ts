import { Tool } from '@langchain/core/base';
import { FlowAgentKit } from '../agent';

export class FlowBalanceTool extends Tool {
  name = 'flow_balance';
  description = `Get the balance of a Flow account.
  
  If you want to get the balance of your wallet, you don't need to provide an address.
  If no token identifier is provided, the balance will be in FLOW.`;

  constructor(private flowKit: FlowAgentKit) {
    super();
  }

  protected async _call(_input: string): Promise<string> {
    try {
      const balance = await this.flowKit.getBalance();

      return JSON.stringify({
        status: 'success',
        balance: balance,
        token: 'FLOW',
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return JSON.stringify({
        status: 'error',
        message: errorMessage,
        code: 'UNKNOWN_ERROR',
      });
    }
  }
}

export class FlowTransferTool extends Tool {
  name = 'flow_transfer';
  description = `Transfer tokens to another address.
  
  Inputs (input is a JSON string):
  to: string, eg "0x1234..." (required)
  amount: number, eg 1 (required)
  tokenIdentifier?: string (optional)`;

  constructor(private flowKit: FlowAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = JSON.parse(input) as {
        to: string;
        amount: number;
        tokenIdentifier?: string;
      };

      const tx = await this.flowKit.transfer(
        parsedInput.to,
        parsedInput.amount,
        parsedInput.tokenIdentifier
      );

      return JSON.stringify({
        status: 'success',
        message: 'Transfer completed successfully',
        transactionId: tx,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return JSON.stringify({
        status: 'error',
        message: errorMessage,
        code: 'UNKNOWN_ERROR',
      });
    }
  }
}

export function createFlowTools(flowKit: FlowAgentKit): Tool[] {
  return [new FlowBalanceTool(flowKit), new FlowTransferTool(flowKit)];
}
