# NewBook - Biblioteca Pessoal

## Boas Práticas

- Escrever código limpo e bem documentado
- Seguir padrões de nomenclatura consistentes
- Implementar validação de dados em todas as entradas
- Proteger rotas sensíveis com autenticação
- Tratar erros adequadamente
- Fazer commits frequentes com mensagens descritivas
- escreva os testes jest
- Ultilize git semantico

LINK_GIT_SEMANTICO: https://andra-sun.github.io/posts/commit-semantico/

## Visão Geral do Projeto

NewBook é uma aplicação web que permite aos usuários gerenciar sua biblioteca pessoal de livros. Os usuários podem criar uma conta, adicionar livros à sua coleção, marcar livros como lidos ou não lidos, e gerenciar suas informações pessoais.

## Requisitos Técnicos

### Obrigatórios

- Utilizar Node.js para o backend
- Criar uma API RESTful
- Implementar autenticação de usuários (login/registro)
- Armazenar dados em um banco de dados (MongoDB, PostgreSQL ou MySQL)
- Implementar validação de dados
- Criar interface de usuário responsiva
- Criar schemas e interfaces

### Opcionais (Recomendados)

- Usar TypeScript ao invés de JavaScript puro (recomendado para melhor tipagem)
- Implementar Docker para containerização da aplicação
- Adicionar testes automatizados (Jest, Mocha, etc.)
- Implementar CI/CD testes automatizados

## Estrutura do Projeto

```
newbook/
├── frontend/           # Frontend da aplicação
│   ├── public/         # Arquivos estáticos
│   └── src/            # Código fonte do frontend
├── backend/            # Backend da aplicação
│   ├── controllers/    # Controladores da API
│   ├── models/         # Modelos de dados
│   ├── routes/         # Rotas da API
│   └── middleware/     # Middlewares da aplicação
├── docker/             # Arquivos de configuração Docker (opcional)
└── README.md           # Documentação do projeto
```

## Funcionalidades

### Sistema de Usuários

- **Registro de usuário**: Nome, email, senha (com confirmação)
- **Login**: Autenticação via email/senha
- **Perfil**: Edição de informações pessoais
- **Níveis de acesso**: Usuário comum e Administrador

### Gerenciamento de Livros

- **Cadastro de livros**: Cada usuário pode adicionar seus próprios livros
- **Informações do livro**:
  - Título (obrigatório)
  - Autor (obrigatório)
  - Gênero (obrigatório)
  - Descrição
  - Status de leitura (lido/não lido)
  - Imagem de capa (upload ou URL) (obrigatorio)
  - Data de adição
  - Avaliação pessoal (1-5 estrelas)
  - Notas pessoais
- **Operações CRUD**: Criar, ler, atualizar e deletar livros
- **Filtros e busca**: Buscar por título, autor, gênero, status de leitura

### Painel de Administração

- **Gerenciamento de usuários**: Ver, editar e excluir contas
- **Estatísticas**: Visualizar dados sobre usuários e livros cadastrados
- **Moderação**: Capacidade de remover conteúdo inadequado

## Tecnologias Sugeridas

### Backend

- Node.js com Express
- JWT para autenticação
- prisma
- Multer para upload de arquivos

### Frontend

- React.js ou Vue.js
- CSS: Tailwind CSS ou Bootstrap
- Axios para requisições HTTP

### DevOps (Opcional)

- Docker e Docker Compose
- GitHub Actions para CI/CD

## Passo a Passo para Iniciantes

1. **Configuração do ambiente**:

   - Instalar Node.js e npm
   - Configurar editor de código (VSCode recomendado)
   - Instalar MongoDB ou outro banco de dados

2. **Iniciar o projeto**:

   - Criar estrutura de pastas
   - Inicializar package.json
   - Instalar dependências básicas

3. **Desenvolver o backend**:

   - Criar modelos de dados (User, Book)
   - Implementar rotas da API
   - Configurar autenticação

4. **Desenvolver o frontend**:

   - Criar componentes de interface
   - Implementar formulários de cadastro e login
   - Desenvolver páginas de listagem e detalhes de livros

5. **Testar a aplicação**:

   - Testar funcionalidades básicas
   - Verificar responsividade
   - Corrigir bugs encontrados

6. **Deploy (opcional)**:
   - Preparar aplicação para produção
   - Fazer deploy em serviço de hospedagem (Heroku, Vercel, etc.)

## Recursos de Aprendizado

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [MongoDB University](https://university.mongodb.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
