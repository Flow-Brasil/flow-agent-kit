import { FlowAgentKit } from './agent/index.js';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = process.env.FLOW_PRIVATE_KEY || '';
const geminiApiKey = process.env.GEMINI_API_KEY || '';

if (!privateKey) {
  throw new Error('FLOW_PRIVATE_KEY não encontrada no arquivo .env');
}

if (!geminiApiKey) {
  throw new Error('GEMINI_API_KEY não encontrada no arquivo .env');
}

async function main() {
  try {
    const agent = new FlowAgentKit(privateKey, 'testnet', geminiApiKey);
    console.log('Flow Agent Kit iniciado com sucesso!');
    console.log('Endereço da conta:', agent.address);

    // Teste do Gemini
    const resposta = await agent.generateContent('O que é Flow blockchain?');
    console.log('Resposta do Gemini:', resposta);

    // Teste do saldo
    const saldo = await agent.getBalance(agent.address);
    console.log('Saldo da conta:', saldo);

  } catch (error) {
    console.error('Erro ao iniciar o Flow Agent Kit:', error);
  }
}

main();
