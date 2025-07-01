# InitialProject

## Em caso de dúvidas

`Se você tiver qualquer dúvida sobre este projeto, entre em contato com os administradores ou membros do grupo através dos canais oficiais. Faremos o possível para responder sua solicitação o mais rápido possível.`

## Sobre o Projeto

Este repositório serve como um template para a criação de novos projetos. Ele vem pré-configurado com Husky para padronizar commits semânticos, garantindo consistência e facilitando a manutenção do código.

## Como Usar

Basta clicar no botão `Use this template` e selecione a organização da `hublast` para criar um novo projeto baseado neste template. Em seguida, leia as regras abaixo para entender como configurar e utilizar corretamente o projeto.

## Configuração do Projeto

Após criar seu projeto a partir deste template, é importante substituir este README pelas instruções específicas do seu projeto. Mantenha apenas as seções relevantes, como a de padrão de commits.

### Configuração Inicial

Para preparar o ambiente de desenvolvimento rode `npm install` na raiz do seu projeto pra instala o padronizador de commit `husky`:

```bash
npm install
```

## Padrão de Commits

Os commits devem seguir o formato:

```
tipo(escopo): "descrição"
```

`Não use letras maisculas`

Onde:

- **tipo**: indica o propósito do commit:
  - `feat`: nova funcionalidade
  - `fix`: correção de bug
  - `docs`: alterações na documentação
  - `style`: formatação, ponto e vírgula, etc; sem alteração de código
  - `refactor`: refatoração de código de produção
  - `test`: adição/refatoração de testes
  - `chore`: atualizações de tarefas de build, configurações, etc
  - `revert`: reverte um commit anterior
  - `cleanup`: limpeza de código
  - `build`: alterações no sistema de build ou dependências externas
  - `remover`: remoção de código ou arquivos
- **escopo**: componente, módulo ou arquivo modificado
- **descrição**: resumo claro e conciso das alterações

Exemplos:

```
"feat(auth): implementar autenticação com JWT"
"fix(api): corrigir erro na validação de formulários"
"docs(readme): atualizar instruções de instalação"
```

Para mais informações sobre commits semânticos, consulte:

- [AdraSun Commit Guidelines](https://andra-sun.github.io/posts/commit-semantico/)

## Regras do Projeto

### Tecnologias e Implementação

- A equipe tem liberdade para escolher a stack tecnológica que melhor se adeque ao projeto
- Todas as tecnologias utilizadas (backend e frontend) devem ser documentadas no README
  - Inclua instruções claras de instalação, configuração e execução
  - Documente dependências e requisitos do sistema

### Infraestrutura

- **Recomendado**: Utilizar Docker para containerização do banco de dados e serviços

  - Facilita a configuração do ambiente de desenvolvimento
  - Garante consistência entre ambientes diferentes

- **Obrigatório**: O código deve ser organizado em pastas separadas:
  - `frontend/`: Todo o código relacionado à interface do usuário
  - `backend/`: Todo o código relacionado ao servidor e API
  - Cada parte deve ter seu próprio conjunto de dependências e configurações

### Gerenciamento de Projeto

- É obrigatória a criação de um quadro no Trello para gerenciamento de tarefas
- Entre em contato com um administrador da Hublast para:
  - Solicitar a criação do quadro Trello na organização
  - Obter acesso para todos os membros da equipe

### Processo de Pull Request

- Cada membro do grupo deve:

  - Criar uma nova branch para desenvolver suas funcionalidades
  - Abrir uma pull request para enviar seu código para a branch principal
  - Recomenda-se solicitar review de pelo menos um membro do grupo antes do merge
  - A revisão e aprovação por outro membro da equipe é fortemente recomendada para garantir a qualidade do código e compartilhar conhecimento
  - Antes de aprovar um PR, verifique:
    - Se o código segue os padrões do projeto
    - Se a documentação foi atualizada adequadamente

  Para aprender a criar e gerenciar Pull Requests no GitHub, assista este [tutorial em vídeo](https://www.youtube.com/watch?v=xM-bZSDGjzA).
