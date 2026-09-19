---
name: sdlc-brainstorm
description: Run a brainstorming session that takes a seed (or a fresh idea) and converges it into a feature spec in docs/sdlight/specs/. Use whenever the user wants to develop an idea into something buildable, says "let's brainstorm X", picks a seed to work on, or asks to turn a rough idea into a spec. This is a conversation, not a form to fill out. Find the essence of the idea, and explore two or three genuinely distinct routes, before writing anything down. Also use this skill's out-of-scope handling whenever a brainstorm session surfaces a tangent, so it gets captured as a new seed instead of lost or crammed into the spec.
---

# SDLC brainstorm: seed to spec

## Stance

This is a conversation aimed at finding the essence of an idea, not an
interview that fills out a template. Ask questions that sharpen the idea.
What problem is this solving? What does "done" look like? Where
are the edges? Push back if the idea is vague or if two different ideas
are tangled together.

Explore before you converge. The fastest way to a weak spec is
committing to the first route that works. Put real alternatives on the
table first, then choose.

## Flow

1. **Start from the seed** (if one is named) or the user's fresh idea.
   Read it, don't just restate it. Form your own read on what it's
   trying to do.
2. **Converse until the essence is clear.** Don't rush to a spec. If the
   idea is already sharp, this can be short. If it's vague, keep asking
   until it isn't.
3. **Explore routes before converging.** Before committing to a single
   direction, lay out two or three genuinely distinct approaches, each
   with what it optimizes for and its tradeoffs or risks. This is the
   experimentation phase: generate possibilities, don't prune to the
   first one that works. Converge with the user on one route. If the
   idea honestly has only one sensible route, say so plainly rather
   than inventing weak alternatives to pad the list.
4. **Watch for out-of-scope tangents as they come up.** The moment
   something surfaces that isn't core to this feature, whether a related
   but separate idea or a "we should also...", say so and capture it as a
   new seed right away. Same format as seed-capture: a short paragraph
   in `docs/sdlight/seeds/<slug>.md`. Don't let it bloat the spec, and
   don't lose it either. Mention it to the user in passing ("that's a
   separate thing, I've seeded it") and keep going.
5. **Settle any temporary rules.** Ask whether to impose deliberate
   constraints on this feature: a palette that sharpens the work (no
   new dependencies, one file, no network, and so on). These are chosen
   limits, not incidental facts. Record what you agree on; "none" is a
   fine answer.
6. **Write the spec** once the essence is clear, using
   `docs/sdlight/templates/spec-template.md`. Fill every section,
   including Roads not taken and Constraints. If a section is empty (no
   open questions, one obvious route, no constraints), state that under
   the heading rather than omitting it.
7. **Save** to `docs/sdlight/specs/<slug>.md`, matching the originating
   seed's slug where there was one.
8. **Delete the seed this spec came from**, if there was one. The spec
   now supersedes it. Leave unrelated seeds alone.
9. **Commit** the spec, the seed deletion, and any seeds forked during
   the session, in one commit, message `Spec: <slug>`. A spec that
   isn't committed isn't in history, and promotion deletes it later.
10. **Run sdlc-refine.**

## Writing the spec

- Concise over complete. Both humans and an implementing agent read this,
  and bloat costs both.
- Behavior, Acceptance criteria, and Constraints are the sections the
  plan-review gate checks against. Be concrete there, even if Intent and
  Scope stay brief. Roads not taken is background, not gated: keep it to
  one line per route.
- Don't describe implementation approach. That's the plan's job.
- Check the project's phase, the `phase` line in the frontmatter of
  `docs/sdlight/PROJECT.md`. Missing file or missing line means
  `pre-release`. In pre-release, breaking existing behavior is free:
  don't ask about backward compatibility, and don't write migration,
  aliases, or deprecation into the spec. Describe the new behavior as
  the behavior. In `released`, a spec that changes behavior a feature
  doc documents must say so under Behavior, and say what happens to
  existing users of the old behavior.

## Ending the session

Confirm the spec's path, name anything that got forked into new seeds,
and stop. Don't start planning implementation in the same breath. That's
a separate, deliberate step.
