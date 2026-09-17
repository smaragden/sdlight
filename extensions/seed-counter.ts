import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const SEEDS_DIR = "docs/sdlight/seeds";
const STATUS_KEY = "sdlight-seeds";

export interface Seed {
  /** Filename without .md — used as the seed's title. */
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

type SeedStatus =
  | { kind: "not-a-repo" }
  | { kind: "no-seeds-dir" }
  | { kind: "ok"; files: string[] };

/**
 * Return the seed files under docs/sdlight/seeds/ that have uncommitted
 * changes in the working tree (new/untracked, staged, or modified). These
 * are the seeds seed-capture wrote but that no workflow step has committed
 * yet. Deletions are not counted as "uncommitted seeds".
 */
async function getUncommittedSeeds(cwd: string): Promise<SeedStatus> {
  // Confirm we're inside a git work tree first.
  try {
    await execFileAsync("git", ["rev-parse", "--is-inside-work-tree"], { cwd });
  } catch {
    return { kind: "not-a-repo" };
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
    // Skip pure deletions — the seed is gone, not pending.
    if (index === "D" || worktree === "D") continue;
    files.add(path);
  }

  return { kind: "ok", files: [...files].sort() };
}

function statusText(status: SeedStatus): string | undefined {
  if (status.kind !== "ok") return undefined;
  const n = status.files.length;
  if (n === 0) return "🌱 seeds: clean";
  return `🌱 seeds: ${n} uncommitted`;
}

async function refresh(ctx: ExtensionContext): Promise<SeedStatus> {
  const status = await getUncommittedSeeds(ctx.cwd);
  const text = statusText(status);
  if (text) ctx.ui.setStatus(STATUS_KEY, text);
  else ctx.ui.setStatus(STATUS_KEY, ""); // clear when not applicable
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
    description: "Show uncommitted seeds in this repo (docs/sdlight/seeds/)",
    handler: async (_args, ctx) => {
      const status = await refresh(ctx);
      if (status.kind === "not-a-repo") {
        ctx.ui.notify("Not a git repository — can't count seeds.", "warn");
        return;
      }
      if (status.kind === "no-seeds-dir" || status.files.length === 0) {
        ctx.ui.notify("No uncommitted seeds. 🌱", "info");
        return;
      }
      const list = status.files
        .map((f) => `  • ${f.replace(`${SEEDS_DIR}/`, "")}`)
        .join("\n");
      ctx.ui.notify(
        `${status.files.length} uncommitted seed(s):\n${list}`,
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
      // Step 3 opens the picker overlay here.
    },
  });
}
