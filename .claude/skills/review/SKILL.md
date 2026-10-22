---
name: review
description: Review a task's PRs in both repos, read-only, and post only the findings the developer approves.
argument-hint: <branch or PR number>
disable-model-invocation: true
---

# Review

Review the PRs for: $ARGUMENTS

Read-only. Never check out the branch, approve, merge or push.

## 1. Gather

- `git fetch --prune` in both repos (`.` and `../NamiFront`).
- Find the PRs with `gh pr list --head <branch>` in each repo, or `gh pr view <n>`.
- Take the acceptance criteria from the PR body.
- Read the code from the remote: `git log -p origin/develop..origin/<branch>` and `git show origin/<branch>:<path>`.

## 2. Review commit by commit

Check:

- the acceptance criteria;
- correctness: authorization (403 vs 404), races, validation, error handling, regressions;
- the conventions in both `CLAUDE.md` files;
- the testing rules in each repo's `.claude/rules/testing.md`;
- docs kept in sync;
- commit hygiene: small, Conventional, no fixup/WIP left.

Verify every finding against the code before reporting it.

## 3. Report

- Verdict.
- Checklist of the acceptance criteria.
- Findings grouped **Blocking**, **Should fix** and **Nit**, each with `repo/path:line`.
- CI status from `gh pr checks`.

## 4. Wait, then post

Post only the findings the developer approves, with `gh pr review <n> --comment` or `--request-changes`. Never `--approve`.
