import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { DynamicBorder } from "@earendil-works/pi-coding-agent";
import {
  Container,
  type SelectItem,
  SelectList,
  Text,
  wrapTextWithAnsi,
} from "@earendil-works/pi-tui";
import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const SEEDS_DIR = "docs/sdlight/seeds";
const STATUS_KEY = "sdlight-seeds";
// Content lines the seed preview always occupies. Fixed so the popup
// keeps a constant height as you move between seeds of different lengths.
const PREVIEW_LINES = 10;

export interface Seed {
  /** Filename without .md, used as the seed's title. */
  slug: string;
  /** Repo-relative path, e.g. docs/sdlight/seeds/foo.md. */
  path: string;
  /** Content beneath the frontmatter block. */
  body: string;
}

/** Strip a leading YAML frontmatter block (--- ... ---) and return the rest. */
function stripFrontmatter(content: string): string {
  const match = content.match(/^---\n[\s\S]*?\n---\n?/);
  return (match ? content.slice(match[0].length) : content).trim();
}

/**
 * List every seed under docs/sdlight/seeds/ as { slug, path, body },
 * sorted by slug. Returns [] when the directory is missing.
 */
async function listSeeds(cwd: string): Promise<Seed[]> {
  let names: string[];
  try {
    names = await readdir(join(cwd, SEEDS_DIR));
  } catch {
    return [];
  }

  const seeds: Seed[] = [];
  for (const name of names) {
    if (!name.endsWith(".md")) continue;
    const relPath = `${SEEDS_DIR}/${name}`;
    const content = await readFile(join(cwd, relPath), "utf8");
    seeds.push({
      slug: name.slice(0, -".md".length),
      path: relPath,
      body: stripFrontmatter(content),
    });
  }
  return seeds.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * A preview pane that always renders the same number of content lines,
 * so the popup doesn't resize as the selection moves between seeds of
 * different lengths. Long bodies wrap and truncate with an ellipsis;
 * short ones pad out with blank lines.
 */
class FixedHeightPreview {
  private text = "";

  constructor(
    private readonly lines: number,
    private readonly dim: (s: string) => string,
    private readonly padX = 1,
    private readonly padY = 1,
  ) {}

  setText(text: string): void {
    this.text = text;
  }

  invalidate(): void {}

  render(width: number): string[] {
    const innerWidth = Math.max(1, width - this.padX * 2);
    const wrapped = this.text ? wrapTextWithAnsi(this.text, innerWidth) : [];
    const truncated = wrapped.length > this.lines;
    const shown = truncated ? wrapped.slice(0, this.lines - 1) : wrapped;

    const body = [...shown];
    if (truncated) body.push(this.dim("\u2026"));
    while (body.length < this.lines) body.push("");

    const pad = " ".repeat(this.padX);
    const blank = "";
    const content = body.map((line) => (line ? pad + line : blank));
    return [
      ...Array<string>(this.padY).fill(blank),
      ...content,
      ...Array<string>(this.padY).fill(blank),
    ];
  }
}

/**
 * Open a popup that lists seeds by slug with a live preview of the
 * selected seed's body. Returns the chosen seed on Enter, or null on Esc.
 */
async function openSeedPicker(
  ctx: ExtensionContext,
  seeds: Seed[],
): Promise<Seed | null> {
  const bySlug = new Map(seeds.map((s) => [s.slug, s]));
  const items: SelectItem[] = seeds.map((s) => ({ value: s.slug, label: s.slug }));

  return ctx.ui.custom<Seed | null>((tui, theme, _kb, done) => {
    const container = new Container();
    container.addChild(new DynamicBorder((s: string) => theme.fg("accent", s)));
    container.addChild(
      new Text(theme.fg("accent", theme.bold("Browse seeds")), 1, 0),
    );

    const listTheme = {
      selectedPrefix: (t: string) => theme.fg("accent", t),
      selectedText: (t: string) => theme.fg("accent", t),
      description: (t: string) => theme.fg("muted", t),
      scrollInfo: (t: string) => theme.fg("dim", t),
      noMatch: (t: string) => theme.fg("warning", t),
    };
    const list = new SelectList(items, Math.min(items.length, 10), listTheme);

    const preview = new FixedHeightPreview(
      PREVIEW_LINES,
      (t: string) => theme.fg("dim", t),
    );
    const showPreview = (item: SelectItem | null) => {
      const seed = item ? bySlug.get(item.value) : undefined;
      preview.setText(seed ? seed.body : "");
    };

    list.onSelectionChange = (item) => {
      showPreview(item);
      tui.requestRender();
    };
    list.onSelect = (item) => done(bySlug.get(item.value) ?? null);
    list.onCancel = () => done(null);

    container.addChild(list);
    container.addChild(
      new Text(
        theme.fg("dim", "up/down navigate • r random • enter brainstorm • esc cancel"),
        1,
        0,
      ),
    );
    container.addChild(preview);
    container.addChild(new DynamicBorder((s: string) => theme.fg("accent", s)));

    showPreview(list.getSelectedItem());

    return {
      render: (w: number) => container.render(w),
      invalidate: () => container.invalidate(),
      handleInput: (data: string) => {
        if (data === "r") {
          // Randomize: jump the selection to a uniformly random seed and
          // refresh the preview. setSelectedIndex does not fire
          // onSelectionChange, so update the preview here. This never
          // selects or cancels, so no brainstorm starts.
          const idx = Math.floor(Math.random() * items.length);
          list.setSelectedIndex(idx);
          showPreview(list.getSelectedItem());
          tui.requestRender();
          return;
        }
        list.handleInput(data);
        tui.requestRender();
      },
    };
  }, { overlay: true });
}

type SeedStatus =
  | { kind: "no-seeds" }
  // total: seed files in the vault. uncommitted: repo-relative paths of
  // seeds not yet committed, or null when cwd isn't a git work tree.
  | { kind: "ok"; total: number; uncommitted: string[] | null };

/** Count the .md seed files in the vault. 0 when the directory is missing. */
async function countSeeds(cwd: string): Promise<number> {
  try {
    const names = await readdir(join(cwd, SEEDS_DIR));
    return names.filter((n) => n.endsWith(".md")).length;
  } catch {
    return 0;
  }
}

/**
 * Return the seed files under docs/sdlight/seeds/ that have uncommitted
 * changes in the working tree (new/untracked, staged, or modified), or
 * null when cwd isn't a git work tree. Deletions are not counted.
 */
async function getUncommittedSeeds(cwd: string): Promise<string[] | null> {
  // Confirm we're inside a git work tree first.
  try {
    await execFileAsync("git", ["rev-parse", "--is-inside-work-tree"], { cwd });
  } catch {
    return null;
  }

  const { stdout } = await execFileAsync(
    "git",
    ["status", "--porcelain=v1", "--untracked-files=all", "--", SEEDS_DIR],
    { cwd, maxBuffer: 10 * 1024 * 1024 },
  );

  const files = new Set<string>();
  for (const line of stdout.split("\n")) {
    if (!line.trim()) continue;
    // Format: "XY <path>" where XY is a two-char status code.
    const index = line[0];
    const worktree = line[1];
    let path = line.slice(3).trim();
    // Renames render as "old -> new"; keep the new path.
    const arrow = path.indexOf(" -> ");
    if (arrow !== -1) path = path.slice(arrow + 4);
    // Strip surrounding quotes git adds for paths with special chars.
    if (path.startsWith('"') && path.endsWith('"')) path = path.slice(1, -1);
    if (!path.endsWith(".md")) continue;
    // Skip pure deletions: the seed is gone, not pending.
    if (index === "D" || worktree === "D") continue;
    files.add(path);
  }

  return [...files].sort();
}

/** Vault size plus how many of those seeds are still uncommitted. */
async function getSeedStatus(cwd: string): Promise<SeedStatus> {
  const total = await countSeeds(cwd);
  if (total === 0) return { kind: "no-seeds" };
  const uncommitted = await getUncommittedSeeds(cwd);
  return { kind: "ok", total, uncommitted };
}

function statusText(status: SeedStatus): string | undefined {
  if (status.kind !== "ok") return undefined; // no seeds, show nothing
  const u = status.uncommitted?.length ?? 0;
  if (u === 0) return `🌱 seeds: ${status.total}`;
  return `🌱 seeds: ${status.total} (${u} uncommitted)`;
}

async function refresh(ctx: ExtensionContext): Promise<SeedStatus> {
  const status = await getSeedStatus(ctx.cwd);
  const text = statusText(status);
  ctx.ui.setStatus(STATUS_KEY, text ?? ""); // clear when no seeds
  return status;
}

export default function (pi: ExtensionAPI) {
  // Show the count as soon as a session starts...
  pi.on("session_start", async (_event, ctx) => {
    await refresh(ctx);
  });

  // ...and keep it current after each turn, since the agent (or a skill)
  // may have just written a new seed file.
  pi.on("turn_end", async (_event, ctx) => {
    await refresh(ctx);
  });

  // On-demand detail: names of the uncommitted seeds.
  pi.registerCommand("seeds", {
    description: "Show the seed vault and any uncommitted seeds (docs/sdlight/seeds/)",
    handler: async (_args, ctx) => {
      const status = await refresh(ctx);
      if (status.kind === "no-seeds") {
        ctx.ui.notify("No seeds yet. 🌱", "info");
        return;
      }
      const uncommitted = status.uncommitted ?? [];
      if (uncommitted.length === 0) {
        ctx.ui.notify(`${status.total} seed(s), all committed. 🌱`, "info");
        return;
      }
      const list = uncommitted
        .map((f) => `  • ${f.replace(`${SEEDS_DIR}/`, "")}`)
        .join("\n");
      ctx.ui.notify(
        `${status.total} seed(s), ${uncommitted.length} uncommitted, commit them to keep them:\n${list}`,
        "info",
      );
    },
  });

  // Browse the seed vault in a popup and take one to brainstorming.
  pi.registerCommand("browse-seeds", {
    description: "Browse seeds and take one to brainstorming",
    handler: async (_args, ctx) => {
      if (ctx.mode !== "tui") {
        ctx.ui.notify("Browsing seeds needs the interactive TUI.", "info");
        return;
      }
      const seeds = await listSeeds(ctx.cwd);
      if (seeds.length === 0) {
        ctx.ui.notify("No seeds to browse.", "info");
        return;
      }
      const picked = await openSeedPicker(ctx, seeds);
      if (!picked) return;
      // Take the chosen seed to brainstorming via an explicit skill
      // invocation, naming the seed by its path/slug.
      pi.sendUserMessage(`/skill:sdlc-brainstorm ${picked.path}`, {
        expandPromptTemplates: true,
      });
    },
  });
}
