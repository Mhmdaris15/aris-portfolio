import type { BlogPost, BlogSection } from "../../data/blog";
import { callAI, parseJson, AIError } from "./client";
import { ModelId } from "./settings";

/**
 * Each task accepts the current post + a target language and returns
 * a partial post update the caller applies. The model is asked for
 * strict JSON; we parse defensively.
 */

type Lang = "en" | "ru";

const langName = (l: Lang) => (l === "en" ? "English" : "Russian (Русский)");

/* ─── Translate full post ─── */

export interface TranslateResult {
    title: string;
    excerpt: string;
    sections: BlogSection[];
}

const translateSystem = (from: Lang, to: Lang) => `You are a professional translator
specializing in software engineering, AI, and tech blog content. Translate the
provided JSON blog post from ${langName(from)} to ${langName(to)}.

Strict rules:
- Preserve the JSON structure exactly. Same section types and order.
- Translate "title", "excerpt", and every section's "content" or "items".
- Keep technical terms (RAG, LLM, dbt, FastAPI, WebSocket, MCP, etc.) untranslated.
- Preserve inline markdown markers (**bold**, *italic*, \`code\`, [link](url)).
- Do NOT translate URLs, code blocks, or code marker contents.
- Output ONLY valid JSON. No commentary, no markdown fences.`;

export async function translatePost(
    post: BlogPost,
    from: Lang,
    to: Lang,
    model?: ModelId
): Promise<TranslateResult> {
    const source = {
        title: post[from].title,
        excerpt: post[from].excerpt,
        sections: post[from].sections
    };

    const res = await callAI({
        system: translateSystem(from, to),
        user: `Translate this post:\n\n${JSON.stringify(source, null, 2)}`,
        jsonMode: true,
        maxTokens: 8000,
        model
    });

    return parseJson<TranslateResult>(res.text);
}

/* ─── Generate excerpt ─── */

const excerptSystem = (lang: Lang) => `You write punchy, 1–2 sentence
blog excerpts in ${langName(lang)}. Style: confident, specific, no fluff.
The excerpt should hint at the post's most concrete takeaway, not summarize.

Output ONLY the excerpt text, nothing else. No quotes, no JSON, no markdown.`;

export async function generateExcerpt(
    post: BlogPost,
    lang: Lang,
    model?: ModelId
): Promise<string> {
    const sectionsText = post[lang].sections
        .map((s) => {
            if (s.type === "list" || s.type === "ordered") return s.items.join(" • ");
            if (s.type === "code") return ""; // skip code in excerpt input
            return s.content;
        })
        .join("\n\n");

    const res = await callAI({
        system: excerptSystem(lang),
        user: `Title: ${post[lang].title}\n\nBody:\n${sectionsText}`,
        maxTokens: 200,
        model
    });

    return res.text.trim().replace(/^["']|["']$/g, "");
}

/* ─── Suggest tags ─── */

const tagsSystem = `You suggest 3–5 short, useful blog tags based on a post's
content. Tags should be:
- Single words or short hyphen-free phrases (e.g., "RAG", "Go", "WebSockets", "Production")
- Title-cased technical terms where applicable
- Reusable across multiple posts

Output ONLY a JSON array of strings. No commentary, no fences.
Example: ["RAG", "AI", "Production"]`;

export async function suggestTags(
    post: BlogPost,
    lang: Lang,
    model?: ModelId
): Promise<string[]> {
    const sectionsText = post[lang].sections
        .map((s) => {
            if (s.type === "list" || s.type === "ordered")
                return s.items.join(" • ");
            return s.content;
        })
        .join("\n\n");

    const res = await callAI({
        system: tagsSystem,
        user: `Title: ${post[lang].title}\n\nBody:\n${sectionsText.slice(0, 4000)}`,
        maxTokens: 200,
        model
    });

    let parsed: unknown;
    try {
        parsed = parseJson<string[]>(res.text);
    } catch {
        // Fallback: split on commas / newlines
        const raw = res.text.replace(/[\[\]"`]/g, "");
        return raw
            .split(/[,\n]/)
            .map((s) => s.trim())
            .filter(Boolean)
            .slice(0, 5);
    }

    if (!Array.isArray(parsed)) {
        throw new AIError("Model didn't return a JSON array of tags.");
    }
    return (parsed as unknown[])
        .map((s) => String(s).trim())
        .filter(Boolean)
        .slice(0, 6);
}

/* ─── Polish prose ─── */

export interface PolishResult {
    title: string;
    excerpt: string;
    sections: BlogSection[];
}

const polishSystem = (lang: Lang) => `You are an editor sharpening a blog post
written in ${langName(lang)}. Improve:
- Clarity, concision, and flow
- Active voice; prefer concrete claims over hedges
- Stronger opening / closing sentences
- Consistent voice (confident, direct, no fluff)

Strict rules:
- Preserve the JSON structure exactly. Same section types, same order, same length.
- Preserve technical terms and code blocks verbatim.
- Preserve inline markdown markers (**bold**, *italic*, \`code\`, [link](url)).
- Don't add new sections or remove existing ones.
- Output ONLY valid JSON. No commentary, no markdown fences.`;

export async function polishPost(
    post: BlogPost,
    lang: Lang,
    model?: ModelId
): Promise<PolishResult> {
    const source = {
        title: post[lang].title,
        excerpt: post[lang].excerpt,
        sections: post[lang].sections
    };

    const res = await callAI({
        system: polishSystem(lang),
        user: `Polish this post:\n\n${JSON.stringify(source, null, 2)}`,
        jsonMode: true,
        maxTokens: 8000,
        model
    });

    return parseJson<PolishResult>(res.text);
}

/* ─── Suggest title alternatives ─── */

const titlesSystem = (lang: Lang) => `You suggest 5 alternative blog post
titles in ${langName(lang)}. Each should be:
- Specific and action-oriented (not generic)
- 6–14 words
- A mix of styles: declarative, lessons-from, list-style, contrarian
- Keep technical terms (RAG, Go, WebSocket, etc.) as-is

Output ONLY a JSON array of strings. No commentary.`;

export async function suggestTitles(
    post: BlogPost,
    lang: Lang,
    model?: ModelId
): Promise<string[]> {
    const sectionsText = post[lang].sections
        .map((s) => {
            if (s.type === "list" || s.type === "ordered")
                return s.items.join(" • ");
            if (s.type === "code") return "";
            return s.content;
        })
        .join("\n\n")
        .slice(0, 3000);

    const res = await callAI({
        system: titlesSystem(lang),
        user: `Current title: ${post[lang].title}\n\nBody preview:\n${sectionsText}`,
        maxTokens: 400,
        model
    });

    return parseJson<string[]>(res.text)
        .map((s) => String(s).trim())
        .filter(Boolean)
        .slice(0, 5);
}
