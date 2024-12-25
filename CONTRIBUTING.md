# Contribuindo para o Flow Agent Kit

Obrigado por considerar contribuir para o Flow Agent Kit! Este documento fornece diretrizes para contribuir com o projeto.

## Código de Conduta

Este projeto e todos os participantes estão sob o [Código de Conduta do Flow](https://flow.com/policies/code-of-conduct). Ao participar, você concorda em seguir suas diretrizes.

## Como posso contribuir?

### Reportando Bugs

Antes de criar um bug report, por favor verifique a [lista de issues](../../issues) para ver se o problema já foi reportado. Se você encontrar uma issue fechada que parece ser igual ao seu problema, abra uma nova issue e inclua um link para a issue original.

#### Como submeter um bom bug report

- Use um título claro e descritivo
- Descreva os passos exatos para reproduzir o problema
- Forneça exemplos específicos (código ou ações executadas)
- Descreva o comportamento observado e o comportamento esperado
- Inclua screenshots e logs de erro se possível

### Sugerindo Melhorias

Se você tem uma ideia para melhorar o projeto, gostaríamos de ouvir! Crie uma issue descrevendo sua sugestão.

### Pull Requests

1. Fork o repositório
2. Crie um branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça suas alterações
4. Execute os testes e o linter
5. Commit suas mudanças (`git commit -m 'feat: add amazing feature'`)
6. Push para o branch (`git push origin feature/AmazingFeature`)
7. Abra um Pull Request

#### Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/). Exemplos:

- `feat: adicionar suporte a novos tokens Flow`
- `fix: corrigir erro na transferência de tokens`
- `docs: atualizar documentação da API`
- `style: formatar código`
- `refactor: melhorar estrutura do código`
- `test: adicionar testes para transferência`
- `chore: atualizar dependências`

### Desenvolvimento Local

1. Clone o repositório
2. Instale as dependências: `pnpm install`
3. Execute os testes: `pnpm test`
4. Execute o linter: `pnpm lint`

### Estrutura do Projeto

```
src/
├── agent/         # Classe principal do agente
├── langchain/     # Ferramentas LangChain
├── tools/         # Ferramentas de interação com Flow
├── types/         # Definições de tipos
└── utils/         # Utilitários
```

### Documentação

- Mantenha a documentação atualizada
- Use JSDoc para documentar funções e classes
- Atualize o README.md quando necessário
- Mantenha o CHANGELOG.md atualizado

## Dúvidas?

Se você tiver alguma dúvida sobre como contribuir, sinta-se à vontade para:

1. Ler nossa [documentação](../../docs)
2. Abrir uma issue com sua dúvida
3. Entrar em contato com a equipe

## Licença

Ao contribuir para este projeto, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

---
