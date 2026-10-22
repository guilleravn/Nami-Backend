# nami-backend

REST API for Ñami: NestJS, Prisma and PostgreSQL. The web app lives in [`../NamiFront`](../NamiFront).

## Prerequisites

- Node 22 (see `.nvmrc`)
- Docker (for the local Postgres)

## Setup

```bash
cp .env.example .env
npm ci
npm run db:up
npm run db:migrate
npm run start:dev      # http://localhost:3000/health, Swagger at /docs
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run start:dev` | Start the API in watch mode |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run the compiled API |
| `npm run lint` | oxlint (type-aware) |
| `npm run format` | Prettier |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | e2e tests against the `DATABASE_URL_TEST` database |
| `npm run test:cov` | Unit tests with coverage |
| `npm run db:up` / `db:down` / `db:logs` | Start, stop or tail the Postgres container |
| `npm run db:migrate` | Create and apply a migration (dev) |
| `npm run db:migrate:deploy` | Apply pending migrations (CI, prod) |
| `npm run db:migrate:reset` | Drop the dev database and reapply every migration |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:studio` | Open Prisma Studio |

Deploys to Railway (`railway.json`): build, apply migrations, start, health check on `/health`.
