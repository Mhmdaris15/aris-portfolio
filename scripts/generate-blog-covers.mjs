/**
 * Generate cover images for every blog post via Google Generative AI.
 *
 * Models supported:
 *   --model nano   → gemini-2.5-flash-image-preview (Nano Banana, fast, Gemini API)
 *   --model imagen → imagen-4.0-generate-001        (Imagen 4, higher quality, Gemini API)
 *
 * Usage (PowerShell):
 *   $env:GEMINI_API_KEY = "your-aistudio-key"
 *   node scripts/generate-blog-covers.mjs                  # nano-banana, all missing
 *   node scripts/generate-blog-covers.mjs --model imagen   # imagen 4
 *   node scripts/generate-blog-covers.mjs --slug postgres-storage-internals
 *   node scripts/generate-blog-covers.mjs --force          # regenerate all
 *
 * Output: PNGs under public/images/blog/<slug>.png
 *
 * Get a free Gemini API key: https://aistudio.google.com/apikey
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildPrompt } from "./cover-prompts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "images", "blog");
const BLOG_TS = join(ROOT, "src", "data", "blog.ts");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, fallback) => {
    const i = args.indexOf(name);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
};

const MODEL = opt("--model", "nano"); // "nano" or "imagen"
const ONLY_SLUG = opt("--slug", null);
const FORCE = flag("--force");
const DRY_RUN = flag("--dry-run");

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY && !DRY_RUN) {
    console.error("✗ GEMINI_API_KEY (or GOOGLE_API_KEY) is not set.");
    console.error("  Get a free key at https://aistudio.google.com/apikey");
    console.error('  Then run: $env:GEMINI_API_KEY="..." ; node scripts/generate-blog-covers.mjs');
    process.exit(1);
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

/* ─── Extract posts from blog.ts via a light TS parse ─── */

function loadPosts() {
    const src = readFileSync(BLOG_TS, "utf8");
    // Match top-level entries: { slug: "...", date: "...", ..., en: { title: "...", ... }, ... tags: [...] }
    // Light approach: regex out the slug+title+tags trio per post.
    const posts = [];
    const slugRe = /\{\s*slug:\s*"([^"]+)",\s*date:\s*"([^"]+)",\s*readMinutes:\s*\d+,\s*tags:\s*\[([^\]]*)\][\s\S]*?en:\s*\{\s*title:\s*"([^"]+)"/g;
    let m;
    while ((m = slugRe.exec(src)) !== null) {
        const tags = m[3]
            .split(",")
            .map((s) => s.trim().replace(/^"|"$/g, ""))
            .filter(Boolean);
        posts.push({ slug: m[1], date: m[2], tags, title: m[4] });
    }
    return posts;
}

/* ─── API callers ─── */

async function callNanoBanana(prompt) {
    // gemini-2.5-flash-image (Nano Banana). Returns inline_data with PNG.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${API_KEY}`;
    const body = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseModalities: ["IMAGE"]
        }
    };
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Nano Banana ${res.status}: ${errText.slice(0, 400)}`);
    }
    const json = await res.json();
    const parts = json.candidates?.[0]?.content?.parts || [];
    const imgPart = parts.find((p) => p.inlineData || p.inline_data);
    if (!imgPart) {
        throw new Error("No image in response: " + JSON.stringify(json).slice(0, 400));
    }
    const data = (imgPart.inlineData || imgPart.inline_data).data;
    return Buffer.from(data, "base64");
}

async function callImagen(prompt) {
    // imagen-4.0-generate-001 via Gemini API (predict endpoint)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
    const body = {
        instances: [{ prompt }],
        parameters: {
            sampleCount: 1,
            aspectRatio: "16:9",
            safetyFilterLevel: "block_only_high",
            personGeneration: "allow_adult"
        }
    };
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Imagen 4 ${res.status}: ${errText.slice(0, 400)}`);
    }
    const json = await res.json();
    const pred = json.predictions?.[0];
    const b64 = pred?.bytesBase64Encoded || pred?.image?.imageBytes;
    if (!b64) {
        throw new Error("No image in response: " + JSON.stringify(json).slice(0, 400));
    }
    return Buffer.from(b64, "base64");
}

const generators = { nano: callNanoBanana, imagen: callImagen };

/* ─── Run ─── */

async function main() {
    const posts = loadPosts();
    const targets = ONLY_SLUG ? posts.filter((p) => p.slug === ONLY_SLUG) : posts;

    if (targets.length === 0) {
        console.error(`✗ No posts matched (slug filter: ${ONLY_SLUG || "none"})`);
        process.exit(1);
    }

    console.log(`→ ${targets.length} post(s) to process · model: ${MODEL}`);
    if (DRY_RUN) console.log("  (DRY RUN — no API calls)");

    const gen = generators[MODEL];
    if (!gen) {
        console.error(`✗ Unknown model: ${MODEL}. Use 'nano' or 'imagen'.`);
        process.exit(1);
    }

    let made = 0,
        skipped = 0,
        failed = 0;

    for (const post of targets) {
        const outPath = join(OUT_DIR, `${post.slug}.png`);
        if (existsSync(outPath) && !FORCE) {
            console.log(`· skip   ${post.slug} (exists, use --force to regenerate)`);
            skipped++;
            continue;
        }

        const prompt = buildPrompt(post);

        if (DRY_RUN) {
            console.log(`  dry    ${post.slug}`);
            console.log(`         ${prompt.slice(0, 160)}…`);
            continue;
        }

        process.stdout.write(`· make   ${post.slug} … `);
        try {
            const start = Date.now();
            const buf = await gen(prompt);
            writeFileSync(outPath, buf);
            const ms = Date.now() - start;
            console.log(`✓ ${(buf.length / 1024).toFixed(0)} KB · ${ms} ms`);
            made++;
        } catch (err) {
            console.log(`✗`);
            console.error(`  ${err.message}`);
            failed++;
        }

        // Polite pacing — both models have rate limits on free tier.
        await new Promise((r) => setTimeout(r, 1500));
    }

    console.log(`\n✓ Done · made ${made} · skipped ${skipped} · failed ${failed}`);
    console.log(`  Output: public/images/blog/`);
    if (made > 0) {
        console.log(`\nNext: the BlogPost / Blog pages already render covers when /images/blog/<slug>.png exists.`);
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
