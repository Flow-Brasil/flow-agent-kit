# Flow Agent Kit

Kit de desenvolvimento para criar agentes de IA que interagem com a blockchain Flow.

## Características

- Integração com Flow Client Library (FCL)
- Suporte a tokens fungíveis e não fungíveis
- Integração com LangChain para agentes de IA
- Tipagem completa em TypeScript
- Documentação automática com TypeDoc

## Requisitos

- Node.js >= 23.1.0
- pnpm >= 8.0.0

## Instalação

```bash
pnpm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
FLOW_NETWORK=testnet # ou mainnet
FLOW_PRIVATE_KEY=your_private_key
OPENAI_API_KEY=your_openai_api_key
```

## Uso

### Desenvolvimento

```bash
# Iniciar em modo desenvolvimento com hot-reload
pnpm dev

# Executar testes
pnpm test

# Gerar documentação
pnpm docs
```

### Build

```bash
# Limpar diretório de build
pnpm clean

# Compilar TypeScript
pnpm build
```

### Linting e Formatação

```bash
# Executar linter
pnpm lint

# Corrigir problemas de linting
pnpm lint:fix

# Formatar código
pnpm format
```

## Estrutura do Projeto

```
src/
├── agent/         # Classe principal do agente
├── langchain/     # Ferramentas LangChain
├── tools/         # Ferramentas de interação com Flow
├── types/         # Definições de tipos
└── utils/         # Utilitários

test/              # Testes
docs/              # Documentação gerada
```

## Licença

ISC
