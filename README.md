# Flow Agent Kit

Kit de desenvolvimento para criar agentes de IA que interagem com a blockchain Flow.

## Características

- 🤖 Integração com IA (Google Gemini)
- 🔗 Interação com a blockchain Flow
- 💰 Gerenciamento de tokens (fungíveis e não fungíveis)
- 🔑 Suporte a múltiplas redes (mainnet, testnet, emulator)

## Instalação

```bash
pnpm add flow-agent-kit
```

## Configuração

1. Crie um arquivo `.env` na raiz do seu projeto:

```env
# Flow Network (mainnet, testnet, emulator)
FLOW_NETWORK=testnet

# Flow Account Private Key
FLOW_PRIVATE_KEY=sua_chave_privada

# Flow Access Node (opcional)
FLOW_ACCESS_NODE=https://rest-testnet.onflow.org

# Gemini API Key
GEMINI_API_KEY=sua_chave_api_gemini
```

2. Importe e inicialize o FlowAgentKit:

```typescript
import { FlowAgentKit } from 'flow-agent-kit';

// Inicializar o agente
const agent = new FlowAgentKit(
  process.env.FLOW_PRIVATE_KEY || '',
  'testnet',
  process.env.GEMINI_API_KEY || ''
);

// Consultar saldo
const saldo = await agent.getBalance(agent.address);
console.log('Saldo:', saldo);

// Gerar conteúdo com IA
const resposta = await agent.generateContent('O que é Flow blockchain?');
console.log('Resposta:', resposta);
```

## Funcionalidades

### Consulta de Saldo

```typescript
const saldo = await agent.getBalance(address);
```

### Transferência de Tokens

```typescript
const tx = await agent.transfer(destinatario, quantidade);
```

### Implantação de Tokens

```typescript
const tx = await agent.deployToken(nome, simbolo, suprimentoInicial);
```

### Implantação de Coleções NFT

```typescript
const tx = await agent.deployCollection(nome, descricao, baseURI);
```

### Geração de Conteúdo com IA

```typescript
const resposta = await agent.generateContent(prompt);
```

## Requisitos

- Node.js ≥ 18.18.0
- pnpm ≥ 8.0.0

## Contribuindo

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## Licença

MIT
