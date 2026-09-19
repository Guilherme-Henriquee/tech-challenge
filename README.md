# 📚 Blog da Escola — Tech Challenge (Fase 03)

Aplicação de blogging dinâmico desenvolvida ao longo das três fases do curso
Full Stack Development (Pós Tech / FIAP), permitindo que professores(as)
publiquem aulas e que alunos(as) as consultem de forma prática e centralizada.

| Fase | Entrega |
|------|---------|
| 01 | Protótipo em OutSystems |
| 02 | API REST em Node.js + MongoDB |
| **03** | **Interface gráfica em React, consumindo a API da Fase 02** |

> Documentação de arquitetura detalhada (com fluxogramas) em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Stack utilizada

**Back-end**
- Node.js + Express
- MongoDB + Mongoose
- JWT (autenticação) + bcrypt (hash de senha)
- Jest + Supertest + mongodb-memory-server (testes)
- Docker

**Front-end**
- React 18 (hooks e componentes funcionais)
- React Router v6
- Styled Components
- Context API (autenticação)
- Axios
- Vite
- Docker + Nginx (produção)

**Infra**
- Docker Compose (orquestração local)
- GitHub Actions (CI/CD)

---

## Estrutura do repositório

```
tech-challenge/
├── backend/            # API REST
├── frontend/            # SPA React
├── docs/
│   └── ARCHITECTURE.md  # arquitetura + fluxogramas (Mermaid)
├── .github/workflows/   # pipeline CI/CD
└── docker-compose.yml
```

---

## Como rodar o projeto

### Opção A — Docker Compose (recomendado)

Pré-requisitos: Docker e Docker Compose instalados.

```bash
# na raiz do repositório
docker compose up --build
```

Isso sobe três serviços:

| Serviço | URL |
|---|---|
| Front-end | http://localhost:5173 |
| Back-end (API) | http://localhost:3001 |
| MongoDB | localhost:27017 |

### Opção B — Rodando manualmente

**1. Back-end**

```bash
cd backend
cp .env.example .env     # ajuste MONGO_URI se necessário
npm install
npm run dev               # http://localhost:3001
```

> É necessário ter uma instância do MongoDB rodando localmente ou usar o Atlas
> (ajuste `MONGO_URI` no `.env`).

**2. Front-end**

```bash
cd frontend
cp .env.example .env     # VITE_API_URL apontando para o backend
npm install
npm run dev                # http://localhost:5173
```

### Criando o primeiro professor(a)

Como a Fase 03 exige login para acessar a área administrativa, crie um usuário
via endpoint de registro (não há tela de cadastro no front, por padrão de
segurança — o registro é feito pela própria escola/administração):

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Profa. Ana","email":"ana@escola.com","password":"senha123"}'
```

Depois é só acessar `http://localhost:5173/login` com esse e-mail e senha.

---

## Rodando os testes (back-end)

```bash
cd backend
npm test
```

Os testes cobrem os fluxos de autenticação e o CRUD completo de posts
(criação, listagem, leitura, busca, edição e exclusão), com cobertura acima
do mínimo de 20% exigido.

---

## Documentação da API

Base URL: `http://localhost:3001`

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| GET | `/posts` | Não | Lista todos os posts |
| GET | `/posts/:id` | Não | Retorna um post específico |
| GET | `/posts/search?q=termo` | Não | Busca posts por título/conteúdo |
| POST | `/posts` | **Sim** | Cria uma nova postagem |
| PUT | `/posts/:id` | **Sim** | Edita uma postagem existente |
| DELETE | `/posts/:id` | **Sim** | Exclui uma postagem |
| POST | `/auth/register` | Não | Cria um usuário professor(a) |
| POST | `/auth/login` | Não | Autentica e retorna um JWT |

Corpo esperado para criar/editar post:

```json
{
  "title": "Introdução à Física",
  "content": "As leis de Newton explicadas de forma simples...",
  "author": "Prof. Ana"
}
```

Rotas protegidas exigem o header:

```
Authorization: Bearer <token-jwt>
```

---

## Páginas do front-end

| Rota | Acesso | Descrição |
|---|---|---|
| `/` | Público | Lista de posts + busca por palavra-chave |
| `/posts/:id` | Público | Leitura completa de um post |
| `/login` | Público | Login de professores(as) |
| `/admin` | Autenticado | Lista todas as postagens, com editar/excluir |
| `/admin/novo` | Autenticado | Formulário de criação de post |
| `/admin/editar/:id` | Autenticado | Formulário de edição de post |

A aplicação é responsiva, funcionando bem tanto em desktop quanto em
dispositivos móveis.

---

## Processo de trabalho do grupo e dificuldades encontradas

*(Seção a ser personalizada pelo grupo antes da entrega — descreva aqui como
foi a divisão de tarefas, decisões de arquitetura tomadas em conjunto,
principais dificuldades técnicas encontradas ao integrar front-end e
back-end, e como foram resolvidas.)*

- Divisão de tarefas entre os integrantes.
- Decisões de arquitetura (ex.: por que JWT, por que MongoDB).
- Dificuldades ao integrar autenticação entre front e back.
- Ajustes de CORS entre ambientes de desenvolvimento e produção.
- Aprendizados do grupo ao longo da fase.

---

## Entregáveis desta fase

1. **Código-fonte**: este repositório, incluindo Dockerfiles e workflow de CI/CD.
2. **Apresentação gravada**: vídeo (5–10 min) demonstrando o funcionamento
   completo da aplicação (login, criação, edição, exclusão e visualização de
   posts).
3. **Documentação**: este README + [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).
