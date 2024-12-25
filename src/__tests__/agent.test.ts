import { FlowAgentKit } from '../agent/index.js';

describe('FlowAgentKit', () => {
  let agent: FlowAgentKit;

  beforeEach(() => {
    agent = new FlowAgentKit('test_key', 'testnet', 'test_gemini_key');
  });

  it('should initialize with correct network', () => {
    expect(agent.address).toBe('test_key');
  });

  it('should generate content with Gemini', async () => {
    const prompt = 'O que é Flow blockchain?';
    const response = await agent.generateContent(prompt);
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  it('should get balance', async () => {
    const balance = await agent.getBalance('0x1234');
    expect(typeof balance).toBe('number');
  });
}); 