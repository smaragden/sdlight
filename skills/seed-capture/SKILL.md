---
name: seed-capture
description: Capture a rough, small, or half-formed idea into the seed vault (docs/sdlight/seeds/) as a short paragraph, fast. Use this whenever the user drops in a quick idea, a "what if we...", a passing thought about a feature, or explicitly says to save, note, or seed an idea, even if it's vague or clearly out of scope for now. Do not use this for fully formed feature requests ready to be worked on now. Those go through sdlc-brainstorm instead. This skill is about speed and low friction, not analysis.
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

3. Commit the file on its own, message `Seed: <slug>`.
4. Confirm in one short line ("Seeded as
   `docs/sdlight/seeds/<slug>.md`.") and stop. That line is the whole
   reply. No "say brainstorm X when ready", no
   next-step hint. Do not brainstorm it, do not ask clarifying questions,
   do not expand it into a spec. If the user wants that, they'll ask for
   a brainstorm session (sdlc-brainstorm) separately, possibly much
   later.

## Slugging

Short, lowercase, hyphenated, drawn from the idea's essence, not a
timestamp. If the slug already exists, append `-2`, `-3`, and so on.

## What not to do

- Don't evaluate whether the idea is good.
- Don't ask "should this be in scope". That's the brainstorm session's job.
- Don't create a spec, plan, or feature doc from this skill.
- Don't polish the idea beyond the user's actual thought. Compression
  should preserve intent, not add scope.
