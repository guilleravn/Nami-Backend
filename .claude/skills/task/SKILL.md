---
name: task
description: Implement one task end to end, from the developer's description to PRs in both repos, with approval checkpoints.
argument-hint: <what to build>
disable-model-invocation: true
---

# Task

Implement one task end to end: $ARGUMENTS

One task per session. Stop at each checkpoint marked **wait**.

## 1. Understand

- Restate the task as a short list of acceptance criteria.
- Read only the affected code and the docs it touches (`CLAUDE.md` in each touched repo, `docs/decisions.md`, the testing rules).
- Ask about gaps instead of guessing.

## 2. Plan (wait for approval)

Present:

- the acceptance criteria;
- the ordered commits: repo, what it does, its tests;
- which test covers each criterion;
- the docs to change;
- the branch name (`<type>/<short-kebab-description>`, same in both repos).

## 3. Set up

`git fetch`, then in each touched repo `git switch -c <branch> origin/develop`.

## 4. Build slice by slice

For each commit in the plan:

1. Read that repo's `.claude/rules/testing.md`.
2. Write the tests first, then the minimal implementation.
3. Run that repo's pre-commit gate until it's green.
4. Commit following the Git workflow in `CLAUDE.md`.

## 5. Verify (wait for approval to push)

- Self-review `git diff origin/develop...HEAD` in each repo against the acceptance criteria and both `CLAUDE.md` files.
- Report: what was built, the commits, how to test it, and what was left out.

## 6. Ship

- `git push -u origin <branch>` in each touched repo.
- `gh pr create --base develop` using `.github/pull_request_template.md`. Title it like a Conventional Commit subject. Put the acceptance criteria in "What and why".
- Cross-link the two PRs in "Related PR (other repo)" with `gh pr edit`.
