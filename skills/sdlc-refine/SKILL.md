---
name: sdlc-refine
description: Run the refinement pass across the whole seed vault and spec set. Find duplicate ideas, surface correlations, clean up outdated seeds and specs, and regenerate the project doc. Trigger this automatically at the end of every sdlc-brainstorm session, and also whenever the user explicitly asks to "refine", "clean up the seeds", "tidy the vault", or "update the project doc". Keep this pass narrow and mechanical. It is a maintenance step, not a brainstorm, and it should not invent new feature ideas or rewrite specs' substance.
---

# SDLC refinement pass

A bounded, mechanical gardening pass over `seeds/`, `specs/`, and
`docs/features/`. Not a creative task, and not an excuse to re-litigate
any spec's content.

## Scope of this pass

1. **Seeds**
   - Merge seeds that duplicate or overlap each other into one, and
     delete the rest.
   - Delete seeds that an existing spec or feature doc already covers.
   - Seeds that correlate (related, but not duplicates) both stay. Record
     the relationship in each seed's frontmatter as
     `related: [<other-seed-slug>]`.
2. **Specs**
   - Flag specs that overlap or duplicate for the user rather than
     auto-merging. Specs represent committed direction, and merging them
     is a judgment call. Do not merge specs without asking.
   - Delete specs that are stale, meaning a shipped feature doc or another
     spec has superseded them.
3. **Feature docs** (`docs/features/`)
   - Where several feature docs overlap enough that one subsystem doc
     would describe them better, propose the merge to the user. If
     confirmed, write the merged doc and delete the old ones outright. No
     stubs, no `superseded-by` markers. Git history is the record.
4. **Project doc** (`PROJECT.md` or equivalent)
   - Regenerate from the current `docs/features/*.md` set, using
     `templates/project-doc-template.md`.
   - Anchor on the previous version for structure and phrasing. Unchanged
     facts stay worded the same, so diffs show only what
     changed. This is not a blank-page rewrite each time.

## What this pass does not do

- Does not brainstorm new features or expand any spec's scope.
- Does not touch plans or in-progress implementation.
- Does not merge specs or feature docs without user confirmation. Seeds
  are low-stakes enough to auto-merge and delete. Specs and feature docs
  are not.
- Does not invent history. If something's ambiguous, ask rather than
  guess.

## Output

End with a short, concrete summary: what got merged, what got deleted,
what got flagged for the user's judgment, and confirmation the project
doc was regenerated. If nothing changed, say so in one line.
