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
committing to the first route that works. When an idea allows different
approaches, put real alternatives on the table first, then choose. When
it doesn't, don't invent them.

## Flow

1. **Start from the seed** (if one is named) or the user's fresh idea.
   Read it, don't just restate it. Form your own read on what it's
   trying to do.
2. **Converse until the essence is clear.** Don't rush to a spec. If the
   idea is already sharp, this can be short. If it's vague, keep asking
   until it isn't.
3. **Judge how open the idea is, then explore routes.** Some ideas are
   wide open and want several routes on the table. Others are a
   straightforward implementation with one sensible path. Scale the
   exploration to fit. Where there is room, lay out two or three
   distinct approaches, each with what it optimizes for and its
   tradeoffs or risks, then agree on one with the user. Don't settle for
   the first one that works. Where there is only one sensible path, name
   it and move on to the spec. Don't invent alternatives to fill a
   quota. This judgment belongs to the brainstorm and is not recorded on
   the seed.
4. **Watch for out-of-scope tangents and deferrals as they come up.**
   The moment something surfaces that isn't core to this feature, a
   related but separate idea, a "we should also...", or a route you set
   aside as "later, not now", capture it as a seed right away. Seeding
   means one concrete thing: writing the file
   `docs/sdlight/seeds/<slug>.md` (a short paragraph, seed-capture's
   format). An idea noted only in the spec, in the conversation, or in a
   summary is not seeded. Say a seed exists only after you have written
   the file, and name its actual path. Never call something seeded as a
   figure of speech. A deferral kept only in the spec's Roads not taken
   dies when promotion deletes the spec, so it has to become a real
   seed. Keep the spec lean and move on.
5. **Settle any constraints.** Ask whether to set deliberate limits on
   this feature that sharpen the work: no new dependencies, one file, no
   network, and so on. These are chosen limits, not incidental facts.
   Record what you agree on. "None" is a fine answer.
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
   the session, in one commit, message `docs(sdlight): spec <slug>`.
   Before you commit, run `ls docs/sdlight/seeds/` and confirm every idea
   you told the user was seeded is a real file there and is staged. A
   seed you named but never wrote, or wrote but left unstaged, is the
   failure this check exists to catch. A spec that isn't committed isn't
   in history, and promotion deletes it later.
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

Confirm the spec's path, then list the seeds you forked by their actual
committed paths. Report a seed as captured only if its file exists and is
in the commit. Then stop and hand back to the user in one line, for
example "Next: plan it with sdlc-plan when you're ready."

Don't start planning or run sdlc-plan yourself. From the plan onward the
pipeline runs on its own, checked at every step against this spec, so
the spec is where the user's attention is worth spending.
