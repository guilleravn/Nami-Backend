---
paths:
  - 'src/**/*.spec.ts'
  - 'test/**'
---

# Testing (backend)

- e2e with supertest against real Postgres is the default for anything with a rule. Never mock Prisma. Unit tests only for pure logic with no I/O. Never test the framework.
- Build the app with `createApp()` from `test/utils/create-app.ts`, which uses `setupApp`.
- One test per branch of a rule. Each asserts the status, the body (including the error `code`) and, when something is written, the DB state.
- Name tests by behavior (`rejects a reservation when no portions are left`). Arrange / Act / Assert.
- Data comes from small factories in `test/factories/`, never from a seed or another test. Call `resetDb` in `beforeEach`; tests pass in any order.
- Never work around the `DATABASE_URL_TEST` guard in `vitest.config.e2e.ts`.
- Authenticated requests use real tokens issued by the app, never a stubbed guard.
- Test concurrency with `Promise.all`.
- Tests first when possible. No snapshots, no committed `skip`/`only`, no sleeps.
