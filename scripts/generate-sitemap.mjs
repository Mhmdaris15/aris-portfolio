/**
 * Generate sitemap.xml from all known routes — static + dynamic from
 * blog.ts, events.ts, and the projects array in config.ts.
 *
 * Run after `vite build`:
 *   node scripts/generate-sitemap.mjs
 *
 * Output: public/sitemap.xml + dist/sitemap.xml (so it's in the build).
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ORIGIN = "https://aris.permiraspb.org";

/* ─── Extract slugs from data files via light regex parse ─── */

const blogSrc = readFileSync(join(ROOT, "src/data/blog.ts"), "utf8");
const eventsSrc = readFileSync(join(ROOT, "src/data/events.ts"), "utf8");
const configSrc = readFileSync(join(ROOT, "src/config.ts"), "utf8");

const matchAll = (src, re) => {
    const out = [];
    let m;
    while ((m = re.exec(src)) !== null) out.push(m[1]);
    return [...new Set(out)];
};

const blogSlugs = matchAll(
    blogSrc,
    /\{\s*slug:\s*"([^"]+)",\s*date:\s*"\d{4}-\d{2}-\d{2}"/g
);

const eventSlugs = matchAll(
    eventsSrc,
    /\{\s*slug:\s*"([^"]+)",\s*name:/g
);

const projectSlugs = matchAll(
    configSrc,
    /id:\s*\d+,\s*slug:\s*"([^"]+)",\s*title:/g
);

const blogDates = {};
const blogDateRe =
    /\{\s*slug:\s*"([^"]+)",\s*date:\s*"(\d{4}-\d{2}-\d{2})"/g;
let bm;
while ((bm = blogDateRe.exec(blogSrc)) !== null) blogDates[bm[1]] = bm[2];

/* ─── Route definitions ─── */

const today = new Date().toISOString().split("T")[0];

/** Each entry produces 2 URLs: the EN canonical + RU prefixed. */
const staticRoutes = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/myworks", changefreq: "weekly", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.9" },
    { path: "/events", changefreq: "monthly", priority: "0.7" },
    { path: "/resume", changefreq: "monthly", priority: "0.8" },
    { path: "/qr", changefreq: "yearly", priority: "0.3" }
];

const projectRoutes = projectSlugs.map((slug) => ({
    path: `/works/${slug}`,
    changefreq: "monthly",
    priority: "0.8"
}));

const blogRoutes = blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: blogDates[slug] || today
}));

const eventRoutes = eventSlugs.map((slug) => ({
    path: `/events/${slug}`,
    changefreq: "yearly",
    priority: "0.6"
}));

const allRoutes = [
    ...staticRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...eventRoutes
];

/* ─── XML generator ─── */

const escape = (s) =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

const urlEntry = (route) => {
    const en = ORIGIN + route.path;
    const ru = route.path === "/" ? ORIGIN + "/ru" : ORIGIN + "/ru" + route.path;
    const lastmod = route.lastmod || today;
    return `  <url>
    <loc>${escape(en)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${escape(en)}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${escape(ru)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(en)}"/>
  </url>
  <url>
    <loc>${escape(ru)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${escape(en)}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${escape(ru)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(en)}"/>
  </url>`;
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes.map(urlEntry).join("\n")}
</urlset>
`;

/* ─── Write to public/ AND dist/ if it exists ─── */

const targets = [join(ROOT, "public/sitemap.xml")];
const distPath = join(ROOT, "dist/sitemap.xml");
if (existsSync(join(ROOT, "dist"))) targets.push(distPath);

for (const t of targets) {
    const dir = dirname(t);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(t, xml);
}

console.log(`✓ sitemap.xml written (${allRoutes.length * 2} URLs):`);
console.log(`  - ${staticRoutes.length} static × 2 locales`);
console.log(`  - ${projectRoutes.length} projects × 2 locales`);
console.log(`  - ${blogRoutes.length} blog posts × 2 locales`);
console.log(`  - ${eventRoutes.length} events × 2 locales`);
targets.forEach((t) => console.log(`  → ${t.replace(ROOT, ".")}`));
