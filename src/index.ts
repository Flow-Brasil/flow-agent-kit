import { FlowAgentKit } from './agent/index.js';
import dotenv from 'dotenv';

export { FlowAgentKit };

// Carregar variáveis de ambiente
dotenv.config();

async function main() {
  try {
    const agent = new FlowAgentKit(
      process.env.FLOW_PRIVATE_KEY || '',
      'testnet',
      process.env.GEMINI_API_KEY || ''
    );

    console.log('Flow Agent Kit iniciado com sucesso!');
    console.log(`Endereço da conta: ${agent.address}`);

    // Exemplo: Gerar conteúdo com Gemini
    const response = await agent.generateContent('Explique como funciona a blockchain Flow em uma frase.');
    console.log('Resposta do Gemini:', response);

    // Exemplo: Verificar saldo
    const balance = await agent.getBalance();
    console.log(`Saldo: ${balance} FLOW`);
  } catch (error) {
    console.error('Erro ao iniciar o Flow Agent Kit:', error);
  }
}

main();
