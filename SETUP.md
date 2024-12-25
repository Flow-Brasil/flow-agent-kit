# Guia de Instalação e Execução

Este guia fornece instruções detalhadas para configurar e executar o Flow Agent Kit em sua máquina.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão >= 18.18.0)
- pnpm (versão >= 8.0.0)
- Git

Para instalar o Node.js no macOS:

```bash
brew install node
```

Para instalar o pnpm:

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

## Configuração do Projeto

1. Clone o repositório:

```bash
git clone https://github.com/Flow-Brasil/flow-agent-kit.git
cd flow-agent-kit
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas chaves:

```env
FLOW_NETWORK=testnet
FLOW_PRIVATE_KEY=sua_chave_privada_flow
OPENAI_API_KEY=sua_chave_api_openai
```

## Execução

Para iniciar o projeto em modo desenvolvimento:

```bash
pnpm dev
```

Para compilar o projeto:

```bash
pnpm build
```

Para executar os testes:

```bash
pnpm test
```

## Verificação da Instalação

Para verificar se tudo está funcionando corretamente:

1. Execute o linter:

```bash
pnpm lint
```

2. Execute a formatação:

```bash
pnpm format
```

3. Verifique a documentação gerada:

```bash
pnpm docs
```

## Estrutura do Projeto

```
flow-agent-kit/
├── src/
│   ├── agent/         # Classe principal do agente
│   ├── langchain/     # Ferramentas LangChain
│   ├── tools/         # Ferramentas Flow
│   └── types/         # Definições de tipos
├── docs/              # Documentação gerada
└── test/              # Testes
```

## Solução de Problemas

### Erro de versão do Node.js

Se você encontrar erros relacionados à versão do Node.js, certifique-se de estar usando a versão correta:

```bash
node --version  # Deve ser >= 18.18.0
```

Para mudar para a versão correta:

```bash
nvm use 18  # Se você usa nvm
# ou
brew unlink node && brew link node@18  # Se instalou via Homebrew
```

### Erro de permissão no macOS

Se encontrar erros de permissão ao executar os comandos:

```bash
sudo chown -R $(whoami) ~/.pnpm ~/.npm
```

### Erro de dependências

Se encontrar erros de dependências:

```bash
pnpm clean  # Limpa o cache
pnpm install  # Reinstala as dependências
```

## Próximos Passos

1. Explore a documentação em `docs/`
2. Verifique os exemplos em `examples/`
3. Configure sua carteira Flow para interagir com o testnet

## Suporte

Se encontrar problemas:

1. Verifique as [issues](https://github.com/Flow-Brasil/flow-agent-kit/issues)
2. Consulte a [documentação do Flow](https://docs.onflow.org)
3. Abra uma nova issue com detalhes do problema
