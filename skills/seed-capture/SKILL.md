---
name: seed-capture
description: Capture a rough, small, or half-formed idea into the seed vault (docs/sdlight/seeds/) as a short paragraph, fast. Use this whenever the user drops in a quick idea, a "what if we...", a passing thought about a feature, or explicitly says to save, note, or seed an idea ("seed it"), even if it's vague or clearly out of scope for now. Also use it on your own initiative during any other work, whenever an idea comes up that is out of scope for the task at hand: a related feature, a cleanup, a "we should also...". Seed it instead of doing it or losing it. Do not use this for fully formed feature requests ready to be worked on now. Those go through sdlc-brainstorm instead. This skill is about speed and low friction, not analysis.
---

# Seed capture

A seed is one paragraph that captures the essence of an idea, written fast
with no ceremony. The point is to never lose a thought and never slow the
user down doing it.

## What to do

1. Write the idea as a tight paragraph. Capture the essence, not a
   transcript of the conversation. Compress, don't paste what the user said.
2. Save it to `docs/sdlight/seeds/<slug>.md` with this exact shape:

```
---
seed: <slug>
created: <date>
---

<the paragraph>
```

3. Don't commit. A seed is a note, not a checkpoint: write the file and
   leave it uncommitted. Never move `HEAD` as a side effect of capture.
   That keeps capture safe mid-session, next to another session, and on
   protected branches. Seeds normally enter history later, through a
   brainstorm that consumes or forks one, a plan commit, promotion, or a
   refine pass. Commit a
   seed directly only when the user explicitly asks, for example to keep
   it across clones or machines.
4. Confirm in one short line that names the file, says it's uncommitted,
   and nudges the user to commit it themselves if they want it to
   persist. For example: "Seeded as `docs/sdlight/seeds/<slug>.md`
   (uncommitted, commit it yourself if you want it to persist)." That
   line is the whole reply. No brainstorm prompt, no other next-step
   hint. Do not brainstorm it, do not ask clarifying questions, do not
   expand it into a spec. If the user wants that, they'll ask for a
   brainstorm session (sdlc-brainstorm) separately, possibly much later.

## Capturing mid-task

When you seed an idea on your own during other work, don't stop that
work. Write the seed, mention it in one line ("Seeded
`docs/sdlight/seeds/<slug>.md` to revisit later."), and carry on with
the task. The idea is out of scope for now, which is the point of
seeding it.

## Slugging

Short, lowercase, hyphenated, drawn from the idea's essence, not a
timestamp. If the slug already exists, append `-2`, `-3`, and so on.

## What not to do

- Don't evaluate whether the idea is good.
- Don't ask "should this be in scope". That's the brainstorm session's job.
- Don't create a spec, plan, or feature doc from this skill.
- Don't polish the idea beyond the user's actual thought. Compression
  should preserve intent, not add scope.
- Don't auto-commit or stage on your own. Write the file and leave git
  alone unless the user explicitly asks you to commit.
- Don't call an idea "seeded" unless the file exists at
  `docs/sdlight/seeds/<slug>.md`. Recording it in a spec, a summary, or
  the conversation is not seeding it. A seed is the file, nothing else.
