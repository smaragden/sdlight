---
plan: umbrella-seeds-and-order
spec: docs/sdlight/specs/umbrella-seeds-and-order.md
---

# Plan: Umbrella specs

## Approach
Umbrella specs are text in the existing skills and templates, so each
step adds one short section or paragraph to one file, in the order an
umbrella moves through the pipeline: template, brainstorm, plan, final
review, promote, refine, then the workflow doc. The lookup rules (B3,
B7) are stated once in the template and repeated in each skill that
needs them, since every skill is loaded on its own. The alternative, a
shared reference file the skills point to, is rejected because Pi and
Claude Code load each SKILL.md independently and a forked reviewer
would have to be told to read it.

## Spec coverage
- B1 Brainstorm writes an umbrella spec with a Stages section when a feature is too big (Step 2)
- B2 Brainstorm writes one seed per stage, deletes the source seed, commits in one spec commit (Step 2)
- B3 A spec is an umbrella if and only if it has Stages, stages found by lookup, no back-reference (Steps 1, 2, 3, 4, 5, 6)
- B4 Brainstorming a stage reads the umbrella, stays in scope, warns once when out of order (Step 2)
- B5 A stage that is too big adds stages to the umbrella instead of nesting (Step 2)
- B6 sdlc-plan refuses an umbrella and names the next stage to brainstorm (Step 3)
- B7 A stage has shipped when its feature doc exists, and the last stage is defined (Steps 1, 4, 5, 6)
- B8 Final review of the last stage also checks the umbrella's Acceptance criteria (Step 4)
- B9 Promote of the last stage salvages umbrella deferrals and deletes the umbrella (Step 5)
- B10 Refine keeps stage seeds and open umbrellas, holds merges while open, proposes a merge from the slug and Stages promote passes it (Steps 5, 6)
- B11 Project doc Open threads lists each open umbrella with progress and next stage (Step 6)
- A1 Spec template has an umbrella-only Stages section in the ordered one-slug-per-line form (Step 1)
- A2 Brainstorm skill instructs B1, B2, B4, B5 (Step 2)
- A3 Plan skill instructs B6 (Step 3)
- A4 Final review skill instructs B8 using the B7 definitions (Step 4)
- A5 Promote skill instructs B9 (Step 5)
- A6 Refine skill instructs B10 and B11, project doc template describes the umbrella line (Step 6)
- A7 Workflow doc describes umbrella specs (Step 7)
- A8 No changed file adds a status field, a new document type, or nesting (Steps 1 to 7)
- A9 No changed file contains an em dash, arrow symbol, or curly quote (Steps 1 to 7)

## Steps

Every step is also verified for A8 and A9: `git diff HEAD~1` for the
step shows no `status:` field, no new file outside the named ones, no
instruction that makes a stage an umbrella, and
`grep -nP '\x{2014}|\x{2013}|\x{2192}|[\x{201C}\x{201D}\x{2018}\x{2019}]'`
on the changed files prints nothing.

1. **Stages section in the spec template.**
   Verify: `templates/spec-template.md` has a `## Stages` section after
   Acceptance criteria that says it appears only in umbrella specs, shows
   an ordered list with one slug per line, and states the B3 and B7
   rules in one sentence each.
   Change: add that section to `templates/spec-template.md`.
   Closes: A1, B3, B7, A8, A9.

2. **Umbrella specs in brainstorm.**
   Verify: read the new section of `skills/sdlc-brainstorm/SKILL.md` and
   confirm it instructs, in order, proposing the split when a feature is
   too big (B1), writing the umbrella spec with Stages and whole-feature
   Acceptance criteria (B1), writing one seed per stage that mentions the
   umbrella's slug in its paragraph, deleting the source seed, and one
   `docs(sdlight): spec <slug>` commit (B2), reading the umbrella,
   keeping the stage spec within the umbrella's scope, and warning once
   when an earlier stage has no feature doc (B4), and adding
   stages to the umbrella instead of nesting (B5). Confirm step 9's seed
   check still covers stage seeds.
   Change: add an "Umbrella specs" section to
   `skills/sdlc-brainstorm/SKILL.md`, and one line in Flow step 6 that
   points to it.
   Closes: B1, B2, B3, B4, B5, A2, A8, A9.

3. **Plan refuses umbrellas.**
   Verify: `skills/sdlc-plan/SKILL.md` Preconditions says a spec with a
   Stages section is an umbrella, is never planned, and that the skill
   names the first stage without a feature doc and says to brainstorm
   it.
   Change: add that paragraph to Preconditions.
   Closes: B3, B6, A3, A8, A9.

4. **Final review checks the umbrella on the last stage.**
   Verify: `skills/sdlc-final-review/SKILL.md` tells the reviewer to find
   the spec whose Stages lists the slug, to treat this as the last stage
   when every other stage has a feature doc, and then to walk the
   umbrella's Acceptance criteria with the same evidence rules, writing
   any unmet or unverifiable one as a FAIL or HOLD line naming the
   umbrella. The reading list at the top allows reading the umbrella.
   Change: extend the opening paragraph and add an umbrella paragraph to
   Checks.
   Closes: B3, B7, B8, A4, A8, A9.

5. **Promote closes the umbrella.**
   Verify: `skills/sdlc-promote/SKILL.md` has a step between the current
   steps 2 and 3 that finds this slug's umbrella as the spec whose Stages
   lists it (B3), treats this slug as the last stage when every other
   stage has a feature doc, counting the one just written in step 1
   (B7), and in that case salvages the umbrella's deferrals into seeds
   and deletes the umbrella spec. Step 4's commit list includes the
   umbrella deletion. The step that runs sdlc-refine passes it the
   closed umbrella's slug and Stages list (B10).
   Change: add that step, renumber, and extend the commit and refine
   steps.
   Closes: B3, B7, B9, B10, A5, A8, A9.

6. **Refine respects umbrellas and reports progress.**
   Verify: `skills/sdlc-refine/SKILL.md` Seeds, Specs, and Feature docs
   items each carry the B10 exception, a new item describes proposing
   the post-close merge from the umbrella slug and Stages list that
   promote passes in, and the Project doc item instructs the B11
   Open threads line with the B7 rule. `templates/project-doc-template.md`
   Open threads describes the umbrella line.
   Change: edit those items in the refine skill and the Open threads
   section of the project doc template.
   Closes: B3, B7, B10, B11, A6, A8, A9.

7. **Workflow doc.**
   Verify: `docs/workflow.md` has an "Umbrella specs" section covering
   when brainstorm makes one, how stages ship as ordinary features, and
   how the last stage's final review and promotion close it.
   Change: add that section after "What runs on its own".
   Closes: A7, A8, A9.

## Decisions
- Stage seeds mention the umbrella's slug only in their paragraph, for a
  human reader. There is no frontmatter field, and lookups use only the
  umbrella's Stages section (2026-09-29, user).
- Refine does not read git history to find a closed umbrella. Promote
  passes the slug and Stages list to the refine run it starts, and the
  spec's B10 was amended to say so (2026-09-29, user).

## Risks
None.
