---
name: sdlc-refine
description: Run the refinement pass across the whole seed vault and spec set. Find duplicate ideas, surface correlations, clean up outdated seeds and specs, regenerate the seed map, and regenerate the project doc. Trigger this automatically at the end of every sdlc-brainstorm session, after every sdlc-promote, and whenever the user explicitly asks to "refine", "clean up the seeds", "tidy the vault", or "update the project doc". Keep this pass narrow and mechanical. It is a maintenance step, not a brainstorm, and it should not invent new feature ideas or rewrite specs' substance.
---

# SDLC refinement pass

A bounded, mechanical gardening pass over `docs/sdlight/seeds/`,
`docs/sdlight/specs/`, and `docs/sdlight/features/`. Not a creative
task, and not an excuse to re-litigate any spec's content.

## Scope of this pass

1. **Seeds**
   - Merge seeds that duplicate or overlap each other into one, and
     delete the rest.
   - Delete seeds that an existing spec or feature doc already covers.
   - Seeds that correlate (related, but not duplicates) both stay. Record
     the relationship in each seed's frontmatter as
     `related: [<other-seed-slug>]`.
   - Regenerate the seed map at `docs/sdlight/SEEDS.md` from the current
     seed set, after all merges and deletions. See "Seed map" below.
2. **Specs**
   - Flag specs that overlap or duplicate for the user rather than
     auto-merging. Specs represent committed direction, and merging them
     is a judgment call. Do not merge specs without asking.
   - Delete specs that are stale, meaning a shipped feature doc or another
     spec has superseded them.
3. **Feature docs** (`docs/sdlight/features/`)
   - A feature doc describes the code as it is. Where a newer feature
     doc or the code itself contradicts a statement in an older doc,
     correct that statement in place. Do this without asking. Change
     only the contradicted sentence, not the doc's structure or scope,
     and name every such edit in the summary with the doc and the fact.
   - Where several feature docs overlap enough that one subsystem doc
     would describe them better, propose the merge to the user. If
     confirmed, write the merged doc and delete the old ones outright. No
     stubs, no `superseded-by` markers. Git history is the record.
4. **Seed map** (`docs/sdlight/SEEDS.md`)
   - A single Mermaid graph of the current seeds, seeds only. Every seed
     in `docs/sdlight/seeds/` is a node, identified by its slug, so
     isolated seeds still appear. Draw one edge per `related:` pair.
     `related:` is reciprocal, so treat edges as undirected and emit each
     pair once (order the two endpoints alphabetically, e.g.
     `auth-tokens --- session-store`).
   - Shape (a `# Seed map` heading, then a fenced `mermaid` block):
     ````
     # Seed map

     ```mermaid
     graph LR
       <one line per node, then one line per edge>
     ```
     ````
   - Sort nodes alphabetically by slug, then edges alphabetically, so the
     output is deterministic and diffs show only real changes. Anchor on
     the previous version's wording where nothing changed.
   - When there are no seeds, delete `docs/sdlight/SEEDS.md` if it exists;
     don't write an empty graph.
5. **Project doc** (`docs/sdlight/PROJECT.md` or equivalent)
   - Regenerate from the current `docs/sdlight/features/*.md` set, using
     `docs/sdlight/templates/project-doc-template.md`.
   - Anchor on the previous version for structure and phrasing. Unchanged
     facts stay worded the same, so diffs show only what
     changed. This is not a blank-page rewrite each time.
   - Copy the `phase` frontmatter line from the previous version
     unchanged. It is the one hand-set field in the file, and a human
     moves it from `pre-release` to `released`. When there is no
     previous version, write `pre-release`. Never change it yourself.

## What this pass does not do

- Does not brainstorm new features or expand any spec's scope.
- Does not touch plans or in-progress implementation.
- Does not merge specs or feature docs without user confirmation. Seeds
  are low-stakes enough to auto-merge and delete. Specs and feature docs
  are not. Correcting a false sentence in a feature doc is not a merge.
- Does not invent history. If something's ambiguous, ask rather than
  guess.

## Commit

Commit everything this pass changed in one commit, message
`docs(sdlight): refine <one line saying what changed>`. If nothing
changed, there is no commit.

## Output

End with a short, concrete summary: what got merged, what got deleted,
what got flagged for the user's judgment, and confirmation the seed map
and project doc were regenerated. If nothing changed, say so in one line.
