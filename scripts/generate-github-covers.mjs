/**
 * Generate cinematic cover images for every GitHub showcase entry.
 * Uses the same Nano Banana / Imagen 4 pipeline as blog covers.
 *
 * Usage:
 *   $env:GEMINI_API_KEY = "..."
 *   node scripts/generate-github-covers.mjs                     # nano-banana, all missing
 *   node scripts/generate-github-covers.mjs --model imagen      # imagen 4
 *   node scripts/generate-github-covers.mjs --slug ragemini     # one slug only
 *   node scripts/generate-github-covers.mjs --force             # regenerate all
 *
 * Output: PNGs at public/images/github/<slug>.png
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildPrompt } from "./cover-prompts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "images", "github");
const GH_TS = join(ROOT, "src", "data", "github.ts");

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n, fb) => {
    const i = args.indexOf(n);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : fb;
};

const MODEL = opt("--model", "nano");
const ONLY_SLUG = opt("--slug", null);
const FORCE = flag("--force");
const DRY_RUN = flag("--dry-run");

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY && !DRY_RUN) {
    console.error("✗ GEMINI_API_KEY not set. https://aistudio.google.com/apikey");
    process.exit(1);
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

/* Extract entries from github.ts */
const src = readFileSync(GH_TS, "utf8");
const entryRe = /\{\s*slug:\s*"([^"]+)"[\s\S]*?repoName:\s*"([^"]+)"[\s\S]*?tagline:\s*\{\s*en:\s*"([^"]+)"[\s\S]*?\}[\s\S]*?tags:\s*\[([^\]]*)\]/g;
const projects = [];
let m;
while ((m = entryRe.exec(src)) !== null) {
    projects.push({
        slug: m[1],
        title: m[3],
        tags: m[4]
            .split(",")
            .map((s) => s.trim().replace(/^"|"$/g, ""))
            .filter(Boolean)
    });
}

const targets = ONLY_SLUG ? projects.filter((p) => p.slug === ONLY_SLUG) : projects;
if (targets.length === 0) {
    console.error(`✗ No projects matched (slug filter: ${ONLY_SLUG || "none"})`);
    process.exit(1);
}

// Try newest stable first, then preview, then 2.0 fallback. First success wins.
const NANO_BANANA_CANDIDATES = [
    "gemini-2.5-flash-image",
    "gemini-2.5-flash-image-preview",
    "gemini-2.0-flash-exp-image-generation",
    "gemini-2.0-flash-preview-image-generation"
];

let resolvedNanoModel = null;

async function callNanoBanana(prompt) {
    const candidates = resolvedNanoModel ? [resolvedNanoModel] : NANO_BANANA_CANDIDATES;
    let lastErr;
    for (const model of candidates) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { responseModalities: ["IMAGE"] }
            })
        });
        if (res.status === 404) {
            lastErr = `404 on ${model}`;
            continue;
        }
        if (!res.ok) throw new Error(`Nano Banana ${res.status} (${model}): ${(await res.text()).slice(0, 300)}`);
        const json = await res.json();
        const parts = json.candidates?.[0]?.content?.parts || [];
        const part = parts.find((p) => p.inlineData || p.inline_data);
        if (!part) throw new Error(`No image in response from ${model}`);
        if (!resolvedNanoModel) {
            resolvedNanoModel = model;
            console.log(`  (using model: ${model})`);
        }
        return Buffer.from((part.inlineData || part.inline_data).data, "base64");
    }
    throw new Error(`No Nano Banana model worked. Last: ${lastErr}. Run: node scripts/list-gemini-models.mjs`);
}

const IMAGEN_CANDIDATES = [
    "imagen-4.0-generate-001",
    "imagen-4.0-generate-preview-06-06",
    "imagen-3.0-generate-002",
    "imagen-3.0-generate-001"
];

let resolvedImagenModel = null;

async function callImagen(prompt) {
    const candidates = resolvedImagenModel ? [resolvedImagenModel] : IMAGEN_CANDIDATES;
    let lastErr;
    for (const model of candidates) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${API_KEY}`;
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                instances: [{ prompt }],
                parameters: { sampleCount: 1, aspectRatio: "16:9" }
            })
        });
        if (res.status === 404) {
            lastErr = `404 on ${model}`;
            continue;
        }
        if (!res.ok) throw new Error(`Imagen ${res.status} (${model}): ${(await res.text()).slice(0, 300)}`);
        const json = await res.json();
        const pred = json.predictions?.[0];
        const b64 = pred?.bytesBase64Encoded || pred?.image?.imageBytes;
        if (!b64) throw new Error(`No image in response from ${model}`);
        if (!resolvedImagenModel) {
            resolvedImagenModel = model;
            console.log(`  (using model: ${model})`);
        }
        return Buffer.from(b64, "base64");
    }
    throw new Error(`No Imagen model worked. Last: ${lastErr}. Run: node scripts/list-gemini-models.mjs`);
}

const gens = { nano: callNanoBanana, imagen: callImagen };
const gen = gens[MODEL];
if (!gen) {
    console.error(`✗ Unknown model: ${MODEL}`);
    process.exit(1);
}

console.log(`→ ${targets.length} repo(s) · model: ${MODEL}${DRY_RUN ? " (DRY RUN)" : ""}`);

let made = 0, skipped = 0, failed = 0;
for (const p of targets) {
    const out = join(OUT_DIR, `${p.slug}.png`);
    if (existsSync(out) && !FORCE) {
        console.log(`· skip ${p.slug}`);
        skipped++;
        continue;
    }
    const prompt = buildPrompt({ slug: p.slug, title: p.title, tags: p.tags });
    if (DRY_RUN) {
        console.log(`  dry  ${p.slug}`);
        console.log(`       ${prompt.slice(0, 160)}…`);
        continue;
    }
    process.stdout.write(`· make ${p.slug} … `);
    try {
        const buf = await gen(prompt);
        writeFileSync(out, buf);
        console.log(`✓ ${(buf.length / 1024).toFixed(0)} KB`);
        made++;
    } catch (e) {
        console.log(`✗ ${e.message}`);
        failed++;
    }
    await new Promise((r) => setTimeout(r, 1500));
}

console.log(`\n✓ made ${made} · skipped ${skipped} · failed ${failed}`);
