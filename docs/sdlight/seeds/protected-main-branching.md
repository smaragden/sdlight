---
seed: protected-main-branching
created: 2026-09-29
---

sdlight assumes it can commit seeds, specs, and refine passes on the current branch, and that plan review creates a fresh `<slug>` branch. On a repo where `main` is protected and PR-only, specs can't land on `main`, so the work starts on a feature branch before planning, and plan review then tries to create a branch that already exists. Decide how sdlight behaves when `main` is protected: start the `<slug>` branch at brainstorm time, reuse the current branch when it already matches the slug, or read a rule from AGENTS.md.
