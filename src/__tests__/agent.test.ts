import { FlowAgentKit } from '../agent/index.js';

jest.mock('@onflow/fcl', () => ({
  config: jest.fn(),
  query: jest.fn().mockResolvedValue('0.0'),
}));

jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn().mockResolvedValue({
          response: {
            text: jest.fn().mockResolvedValue('Resposta mockada do Gemini'),
          },
        }),
      }),
    })),
  };
});

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
    expect(response).toBe('Resposta mockada do Gemini');
  });

  it('should get balance', async () => {
    const balance = await agent.getBalance('0x1234');
    expect(typeof balance).toBe('number');
    expect(balance).toBe(0);
  });
}); 