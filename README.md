# Flow Agent Kit

Flow Agent Kit is a development tool that enables the creation of AI agents that interact with the Flow blockchain.

## What is it for?

### AI + Blockchain Integration

- Allows AI agents (using LangChain) to directly interact with the Flow blockchain
- Can perform operations such as transfers, balance queries, and smart contract deployment

### NPM Package Benefits

Using Flow Agent Kit as an NPM package offers several advantages:

1. **Easy Installation**

   - Install with a single command: `pnpm add @coflow/flow-agent-kit`
   - Automatic dependency management
   - No manual repository cloning needed

### Main Features

```typescript
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
    const accessNode =
      process.env.FLOW_ACCESS_NODE ||
      (network === 'testnet'
        ? 'https://rest-testnet.onflow.org'
        : network === 'mainnet'
          ? 'https://rest-mainnet.onflow.org'
          : 'http://localhost:8888');

    const walletDiscovery =
      network === 'mainnet'
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
  }
}
```

### How to Use?

After installation, you can use the kit in two ways:

#### Chat Mode

- Interactive command-line interface
- You can chat with the agent and request blockchain operations
- Example: "What's my balance?" or "Transfer 10 FLOW to 0x1234..."

#### Autonomous Mode

- The agent operates independently, executing programmed actions
- Useful for automation and monitoring

### Basic Usage Example:

```typescript
import { FlowAgentKit } from '@coflow/flow-agent-kit';

// Initialize the agent
const agent = new FlowAgentKit('your_private_key', 'mainnet', 'your_gemini_api_key');

// Check balance
const balance = await agent.getBalance();
console.log('Balance:', balance);

// Generate content with AI
const response = await agent.generateContent('What is Flow blockchain?');
console.log('Response:', response);
```

## Installation

You can install the package directly from NPM:

```bash
pnpm add @coflow/flow-agent-kit
```

Or clone the repository for development:

1. Clone the repository:
```bash
git clone https://github.com/Flow-Brasil/flow-agent-kit.git
```

2. Enter the folder:
```bash
cd flow-agent-kit
```

3. Install dependencies:
```bash
pnpm install
```

4. Configure environment variables:
```bash
cp .env.example .env
```

5. Configure your `.env` file:
```env
# Flow wallet private key
FLOW_PRIVATE_KEY=xxx

# Google AI (Gemini) API key
GEMINI_API_KEY=xxx

# Flow network (mainnet, testnet, or emulator)
FLOW_NETWORK=testnet
```

## Development

To test:

```bash
# Start the project in development mode
pnpm dev

# OR run tests
pnpm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Requirements

- Node.js ≥ 18.18.0
- pnpm ≥ 8.0.0

## License

MIT
