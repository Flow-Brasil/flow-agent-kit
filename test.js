import { FlowAgentKit } from '@coflow/flow-agent-kit';

// Inicializar o agente
const agent = new FlowAgentKit('test_key', 'testnet', 'test_gemini_key');

// Testar geração de conteúdo
const response = await agent.generateContent('O que é Flow blockchain?');
console.log('Resposta:', response);
