import { Tool } from '@langchain/core/tools';
import { FlowAgentKit } from '../agent/index.js';
import { getBalance } from '../tools/get_balance.js';

export class FlowBalanceTool extends Tool {
  name = 'flow_balance';
  description = 'Obtém o saldo de uma conta Flow';
  flowKit: FlowAgentKit;

  constructor(flowKit: FlowAgentKit) {
    super();
    this.flowKit = flowKit;
  }

  protected async _call(_input: string): Promise<string> {
    try {
      const balance = await getBalance(this.flowKit);
      return `O saldo da conta é ${balance} FLOW`;
    } catch (error) {
      return `Erro ao obter saldo: ${error}`;
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
