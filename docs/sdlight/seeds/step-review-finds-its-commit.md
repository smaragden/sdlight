---
seed: step-review-finds-its-commit
created: 2026-09-29
---

The agent building a plan hands sdlc-step-review a commit hash it types itself, and it has passed the wrong hash several times. It then has to send a correction to a reviewer already running, and afterwards check which commit was actually reviewed. Step review should find the step's commit on its own so no hash is passed by hand: for example, each step commit carries a marker such as a `Step: <slug> <n>` trailer that the reviewer finds with `git log --grep`, or the reviewer takes the branch's latest commit when it is called right after the step is committed.
