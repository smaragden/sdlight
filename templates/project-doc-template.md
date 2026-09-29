---
generated: <date, filled in by the refinement agent each run>
phase: pre-release
source: derived from docs/sdlight/features/*.md. Only phase is hand-set.
---

# Project: <project name>

## What this is
1-3 sentences, plain language.

## Feature map
One line per active feature doc: name, one-sentence summary, link. Group
into subsystems only where the feature-doc set has already been
consolidated that way.

## Architecture at a glance
A few sentences to a short paragraph. Only the shape a newcomer (human
or agent) needs before touching any single feature: major components and
how they relate. Implementation detail lives in the feature docs.

## Open threads
Anything active project-wide that isn't yet a feature (in spec or plan
stage). Pointer only. The spec or plan has the detail. Each open umbrella
spec gets one line: its name, how many of its stages have shipped out of
the total, and the next stage's slug, for example "Umbrella name: 2 of 4
stages shipped, next `<stage-slug>`".

---
Regeneration note for the refinement agent (delete this block in output):
Copy `phase` from the previous version unchanged. It is `pre-release`
or `released`, a human sets it, and it defaults to `pre-release` when
there is no previous version. Keep structure and phrasing stable where
underlying facts haven't changed. This doc is regenerated from scratch
each run, anchored on its own previous version for style and structure
continuity. Minimize unnecessary diff.
