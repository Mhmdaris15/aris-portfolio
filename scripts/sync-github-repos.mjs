/**
 * Sync curated GitHub repos with fresh metadata from GitHub API.
 *
 * Reads `src/data/github.ts`, calls `GET /repos/{owner}/{repo}` for
 * each entry, and rewrites only the `metrics` and `lastSyncedAt`
 * fields — never touches narrative copy.
 *
 * Usage:
 *   $env:GITHUB_TOKEN = "ghp_…"     # personal access token (read-only is enough)
 *   node scripts/sync-github-repos.mjs
 *
 * Anonymous (no token) works too, but rate-limits at 60 req/h.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TS_PATH = join(ROOT, "src/data/github.ts");

const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const API = "https://api.github.com";

const headers = () => {
    const h = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "aris-portfolio-sync"
    };
    if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
    return h;
};

const fetchRepo = async (fullName) => {
    const res = await fetch(`${API}/repos/${fullName}`, { headers: headers() });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`${fullName}: ${res.status} ${await res.text()}`);
    return res.json();
};

const src = readFileSync(TS_PATH, "utf8");

// Extract repo full names from `repo:` lines
const repoFullNames = [];
const repoLineRe = /repo:\s*"([^"]+)"/g;
let m;
while ((m = repoLineRe.exec(src)) !== null) repoFullNames.push(m[1]);

console.log(`→ syncing ${repoFullNames.length} repos${TOKEN ? " (authenticated)" : " (anonymous, low rate limit)"}`);

const updates = [];
let okCount = 0, missCount = 0, errCount = 0;
for (const full of repoFullNames) {
    process.stdout.write(`  · ${full} … `);
    try {
        const r = await fetchRepo(full);
        if (!r) {
            console.log("404 (private or gone — leaving prior metrics)");
            missCount++;
            continue;
        }
        updates.push({
            full,
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            pushedAt: r.pushed_at,
            createdAt: r.created_at,
            language: r.language || "Other",
            sizeKb: r.size,
            openIssues: r.open_issues_count
        });
        console.log(`★${r.stargazers_count} · ${r.language}`);
        okCount++;
        await new Promise((r) => setTimeout(r, 120));
    } catch (e) {
        console.log("✗ " + e.message);
        errCount++;
    }
}

// Build a regex-driven patch — find each `repo: "<full>"` block, replace its
// metrics object. Uses a non-greedy lookahead pattern.
let next = src;
for (const u of updates) {
    const blockRe = new RegExp(
        `(repo:\\s*"${u.full.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}"[\\s\\S]*?metrics:\\s*\\{)([\\s\\S]*?)(\\s+\\},\\s*lastSyncedAt:\\s*)"[^"]+"`,
        "m"
    );
    const fresh = `\n            stars: ${u.stars}, forks: ${u.forks},\n            pushedAt: "${u.pushedAt}",\n            createdAt: "${u.createdAt}",\n            language: "${u.language}"${u.sizeKb !== undefined ? `,\n            sizeKb: ${u.sizeKb}` : ""}${u.openIssues !== undefined ? `,\n            openIssues: ${u.openIssues}` : ""}`;
    const replaced = next.replace(blockRe, `$1${fresh}$3"${new Date().toISOString()}"`);
    if (replaced !== next) next = replaced;
}

writeFileSync(TS_PATH, next);
console.log(`\n✓ ok ${okCount} · missing ${missCount} · errors ${errCount} · ${TS_PATH}`);
