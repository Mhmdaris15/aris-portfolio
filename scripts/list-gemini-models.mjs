/**
 * List all Gemini API models available on your key, with their supported
 * methods. Use this to discover the current image-generation model name
 * if the cover-generator scripts hit 404.
 *
 *   $env:GEMINI_API_KEY = "..."
 *   node scripts/list-gemini-models.mjs
 *
 * Filters by --filter <substring>:
 *   node scripts/list-gemini-models.mjs --filter image
 *   node scripts/list-gemini-models.mjs --filter imagen
 */

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    console.error("✗ GEMINI_API_KEY not set");
    process.exit(1);
}

const args = process.argv.slice(2);
const filterIdx = args.indexOf("--filter");
const filter = filterIdx >= 0 ? args[filterIdx + 1]?.toLowerCase() : null;

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}&pageSize=200`;
const res = await fetch(url);
if (!res.ok) {
    console.error(`✗ ${res.status}: ${await res.text()}`);
    process.exit(1);
}
const { models = [] } = await res.json();

const sorted = models
    .filter((m) => !filter || m.name.toLowerCase().includes(filter))
    .sort((a, b) => a.name.localeCompare(b.name));

console.log(`→ ${sorted.length} model(s)${filter ? ` matching "${filter}"` : ""}\n`);
for (const m of sorted) {
    const id = m.name.replace(/^models\//, "");
    const methods = (m.supportedGenerationMethods || []).join(", ");
    console.log(`  ${id}`);
    console.log(`    methods: ${methods}`);
    if (m.displayName) console.log(`    name:    ${m.displayName}`);
    console.log();
}

console.log("\nFor Nano Banana image gen, look for: supports generateContent, name contains 'image' (e.g. gemini-2.5-flash-image)");
console.log("For Imagen, look for: supports predict, name starts 'imagen-' (e.g. imagen-4.0-generate-001)");
