# Arquitetura da Aplicação — Blog da Escola

## Visão geral

A aplicação evoluiu em três fases:

| Fase | Entrega | Tecnologia |
|------|---------|------------|
| 01 | Protótipo de CRUD de posts | OutSystems |
| 02 | API REST + persistência | Node.js, Express, MongoDB |
| 03 | Interface gráfica | React, React Router, Styled Components, Context API |

Esta pasta documenta a **Fase 03**, que consome os endpoints REST criados na Fase 02.

## Diagrama de componentes

```mermaid
flowchart LR
    subgraph Cliente["Navegador (React SPA)"]
        A[Home - Lista de Posts]
        B[PostView - Leitura de Post]
        C[Login]
        D[AdminList - Área administrativa]
        E[PostForm - Criar/Editar]
        F[AuthContext]
    end

    subgraph API["Back-end (Node.js + Express)"]
        G[/GET /posts/]
        H[/GET /posts/:id/]
        I[/GET /posts/search/]
        J[/POST /posts/]
        K[/PUT /posts/:id/]
        L[/DELETE /posts/:id/]
        M[/POST /auth/login/]
    end

    subgraph DB["MongoDB"]
        N[(posts)]
        O[(users)]
    end

    A -->|axios| G
    A -->|axios| I
    B -->|axios| H
    C -->|axios| M
    D -->|axios, JWT| G
    E -->|axios, JWT| J
    E -->|axios, JWT| K
    D -->|axios, JWT| L

    F -.provê token.-> D
    F -.provê token.-> E

    G --> N
    H --> N
    I --> N
    J --> N
    K --> N
    L --> N
    M --> O
```

## Fluxo de autenticação

```mermaid
sequenceDiagram
    participant P as Professor(a)
    participant F as Front-end (React)
    participant A as API (/auth/login)
    participant DB as MongoDB

    P->>F: Informa e-mail e senha
    F->>A: POST /auth/login
    A->>DB: Busca usuário por e-mail
    DB-->>A: Usuário + hash de senha
    A->>A: Compara senha (bcrypt)
    A-->>F: Retorna JWT + dados do usuário
    F->>F: Armazena token em localStorage
    F->>A: Requisições seguintes com Authorization: Bearer <token>
```

## Fluxo de uma postagem

```mermaid
sequenceDiagram
    participant Aluno
    participant F as Front-end
    participant A as API
    participant DB as MongoDB

    Aluno->>F: Acessa "/"
    F->>A: GET /posts
    A->>DB: find()
    DB-->>A: lista de posts
    A-->>F: JSON com posts
    F-->>Aluno: Renderiza lista

    Aluno->>F: Clica em um post
    F->>A: GET /posts/:id
    A->>DB: findById(id)
    DB-->>A: post
    A-->>F: JSON do post
    F-->>Aluno: Renderiza conteúdo completo
```

## Decisões técnicas

- **Banco de dados**: MongoDB (NoSQL), pela flexibilidade do schema de posts e simplicidade de operação com Mongoose.
- **Autenticação**: JWT (JSON Web Token) assinado no back-end, armazenado no `localStorage` do front-end e anexado via header `Authorization: Bearer <token>` em toda requisição protegida (criar, editar, excluir posts).
- **Estilização**: Styled Components, para escopo de CSS por componente e fácil theming.
- **Gerenciamento de estado**: Context API (`AuthContext`), suficiente para o escopo do projeto — sem necessidade de Redux.
- **Roteamento**: React Router v6, com rota protegida (`PrivateRoute`) redirecionando usuários não autenticados para `/login`.
- **Containerização**: cada camada (backend, frontend, banco) roda em um contêiner Docker isolado, orquestrados via `docker-compose.yml` na raiz do repositório.
- **CI/CD**: GitHub Actions roda lint/testes do backend, build do frontend e build das imagens Docker a cada push/PR nas branches `main` e `develop`.

## Estrutura de pastas

```
tech-challenge/
├── backend/            # API REST (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/      # conexão com banco
│   │   ├── controllers/ # regras de negócio
│   │   ├── middleware/  # auth, tratamento de erros
│   │   ├── models/      # schemas Mongoose
│   │   └── routes/      # definição das rotas REST
│   └── tests/           # testes automatizados (Jest + Supertest)
├── frontend/            # SPA React
│   └── src/
│       ├── api/          # cliente axios
│       ├── components/   # componentes reutilizáveis
│       ├── context/       # AuthContext
│       ├── pages/         # páginas da aplicação
│       └── styles/        # estilos globais
├── docs/                # esta documentação
├── .github/workflows/   # pipeline de CI/CD
└── docker-compose.yml   # orquestração dos serviços
```
