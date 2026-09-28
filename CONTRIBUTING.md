# Contributing

Issues and pull requests are welcome. For anything bigger than a fix,
open an issue first so we can agree on the approach.

## Trying a change

Install sdlight from your clone and use it on a small test project:

- Claude Code: `/plugin marketplace add /path/to/your/clone`, then
  `/plugin install sdlight@sdlight-marketplace`.
- Pi: `pi install /path/to/your/clone -l` from the test project.

A skill change is only tested once you've run the part of the workflow it
affects.

## Rules

- **Versions.** Don't edit them. release-please reads the commit types
  on `main`, bumps both manifests, and writes `CHANGELOG.md` in a release
  PR. A change to how a skill behaves is `fix` or `feat`, not `docs`, so
  it gets the right version bump and changelog section.
- **Prose.** Plain and short. No em dashes, arrow symbols, or curly
  quotes. Text in a skill leaks into everything the skill produces.
- **Diagrams.** The README diagrams are generated. Edit
  `scripts/diagrams.py`, run `python3 scripts/diagrams.py`, and commit
  the SVGs in `docs/img/`.
- **Commits.** Use [conventional commit](https://www.conventionalcommits.org)
  messages. Pull requests are squash merged, so the PR title becomes the
  commit message on `main`, and it must be conventional too.

`AGENTS.md` has the same rules for coding agents working in this repo.
