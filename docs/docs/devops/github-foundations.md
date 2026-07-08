---
sidebar_position: 3
---

# GitHub Foundations

## Overview

The GitHub Foundations certification validates knowledge of Git, GitHub collaboration workflows, GitHub Actions, and repository management. Completed March 2025.

---

## Git Core Concepts

```bash
git init / git clone <url>
git add . && git commit -m "message"
git push origin main / git pull
git branch feature/x && git checkout feature/x
git merge feature/x / git rebase main
git stash / git stash pop
git log --oneline --graph
git reset --soft HEAD~1   # undo commit, keep changes staged
git reset --hard HEAD~1   # undo commit, discard changes
```

### Branching Strategies

- **GitHub Flow** — main + short-lived feature branches + PRs.
- **Git Flow** — main + develop + feature/release/hotfix branches.
- **Trunk-Based** — commit directly to main with feature flags.

---

## GitHub Features

| Feature | Purpose |
|---|---|
| **Issues** | Track bugs, features, tasks |
| **Pull Requests** | Code review + merge workflow |
| **Actions** | CI/CD automation via YAML workflows |
| **Projects** | Kanban/table project management |
| **Packages** | Publish npm, Docker, Maven packages |
| **Pages** | Static site hosting |
| **Codespaces** | Cloud dev environments |

---

## GitHub Actions

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '17'
      - run: mvn test
```

---

## Cheat Sheet

```
Branches: git branch | checkout | merge | rebase
Remote: git push | pull | fetch | clone
Undo: reset --soft | --hard | revert | stash
GitHub: Issues | PRs | Actions | Projects | Packages
```
