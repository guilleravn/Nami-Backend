# nami-backend

REST API for Ñami: Node 22, NestJS 12, TypeScript 6 (ESM), Prisma 7 with `@prisma/adapter-pg`, PostgreSQL 17 (Docker), Vitest + supertest, oxlint, zod, Swagger. Deploys to Railway. The web app lives in `../NamiFront`. Run fullstack tasks in one session started here with `--add-dir ../NamiFront`.

## Commands

```bash
npm run db:up            # start Postgres (Docker)
npm run start:dev        # API on :3000, Swagger at /docs
npm run db:migrate       # create + apply a migration after editing prisma/schema.prisma
npm test                 # unit tests
npm run test:e2e         # e2e against DATABASE_URL_TEST
```

Before every commit: `npm run lint && npm test && npm run test:e2e`.

## Architecture

- One Nest module per domain in `src/<domain>/`.
- The controller handles HTTP: routes, DTO validation, guards, Swagger decorators. The service holds the rules and queries Prisma directly. No repository layer.
- Global behavior (prefix, pipes, CORS, Swagger) is registered in `src/app.setup.ts`, which `main.ts` and the e2e tests share.
- Never edit `src/generated/prisma`; run `npm run db:generate`. Never edit an applied migration; create a new one.
- New env vars go in `src/config/env.validation.ts` and `.env.example`.
- ESM: relative imports end in `.js`.

## Conventions

- Business rules are enforced here, never only in the UI.
- Money is integer cents. Timestamps are UTC. Enum values are English UPPER_SNAKE; labels belong to the frontend.

## Docs, read on demand

- `docs/decisions.md`: why the stack and the process are the way they are.
- `.claude/rules/testing.md`: how to write tests.
- `../NamiFront/src/components/README.md`: the frontend component catalog.

Keep docs in sync in the same commit as the change that affects them.

## Git workflow

Keep this section identical in both repos.

- `develop` is integration. `main` is production and only receives PRs from `develop`.
- Branch from `origin/develop` as `<type>/<short-kebab-description>` (`feat/user-signup`, `fix/health-timeout`), with the same name in both repos.
- Small slices: each commit does one coherent thing, builds, passes lint and tests, includes its own tests, and never mixes a refactor with a feature.
- Conventional Commits with a scope, in English, imperative mood, subject ≤72 characters. Example: `feat(orders): reject reservations over portions left`.
- Review fixes go in `git commit --fixup <sha>`. Before merging, run `git rebase --autosquash origin/develop`, then `git push --force-with-lease`. No "wip" or "fix review" commits reach `develop`.
- PRs target `develop`, are opened with `gh pr create`, and are merged with "Create a merge commit": never squash, never rebase-and-merge. One PR per repo per task, with the two PRs linked to each other.
- Never: `--no-verify`, pushing directly to `develop` or `main`, or committing `.env` files.
