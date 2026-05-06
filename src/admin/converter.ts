import type { BlogSection, BlogPost } from "../data/blog";

/**
 * TipTap stores its document as a JSON tree. We translate it to the
 * blog renderer's section array (h2/h3/p/list/ordered/code/quote).
 *
 * Anything we don't recognize is dropped silently — that's fine
 * for a tightly scoped editor where we control the toolbar.
 */

interface TTMark {
    type: string;
    attrs?: Record<string, unknown>;
}

interface TTNode {
    type: string;
    content?: TTNode[];
    text?: string;
    marks?: TTMark[];
    attrs?: Record<string, unknown>;
}

const textOf = (node: TTNode): string => {
    if (node.type === "text") {
        let txt = node.text ?? "";
        if (node.marks) {
            // Apply marks innermost-first so wrapping nests correctly:
            // code → italic → bold → link.
            const has = (type: string) => node.marks!.some((m) => m.type === type);
            if (has("code")) txt = `\`${txt}\``;
            if (has("italic")) txt = `*${txt}*`;
            if (has("bold")) txt = `**${txt}**`;
            const link = node.marks.find((m) => m.type === "link");
            if (link) {
                const href = (link.attrs?.href as string | undefined) || "";
                if (href) txt = `[${txt}](${href})`;
            }
        }
        return txt;
    }
    if (node.content) return node.content.map(textOf).join("");
    return "";
};

const listItemsOf = (node: TTNode): string[] => {
    if (!node.content) return [];
    return node.content
        .filter((c) => c.type === "listItem")
        .map((li) => textOf(li).trim())
        .filter(Boolean);
};

export const tiptapToSections = (doc: TTNode | null): BlogSection[] => {
    if (!doc || !doc.content) return [];
    const out: BlogSection[] = [];
    for (const node of doc.content) {
        switch (node.type) {
            case "heading": {
                const level = (node.attrs?.level as number) ?? 2;
                const content = textOf(node).trim();
                if (!content) break;
                if (level <= 2) out.push({ type: "h2", content });
                else out.push({ type: "h3", content });
                break;
            }
            case "paragraph": {
                const content = textOf(node).trim();
                if (content) out.push({ type: "p", content });
                break;
            }
            case "bulletList": {
                const items = listItemsOf(node);
                if (items.length) out.push({ type: "list", items });
                break;
            }
            case "orderedList": {
                const items = listItemsOf(node);
                if (items.length) out.push({ type: "ordered", items });
                break;
            }
            case "blockquote": {
                const content = textOf(node).trim();
                if (content) out.push({ type: "quote", content });
                break;
            }
            case "codeBlock": {
                const content = textOf(node);
                const lang = (node.attrs?.language as string) || "text";
                if (content) out.push({ type: "code", lang, content });
                break;
            }
            default:
                break;
        }
    }
    return out;
};

/** Reverse direction: existing sections → TipTap doc. Used to load drafts back into the editor. */
export const sectionsToTiptap = (sections: BlogSection[]): TTNode => {
    const content: TTNode[] = sections.map((s) => {
        switch (s.type) {
            case "h2":
                return {
                    type: "heading",
                    attrs: { level: 2 },
                    content: [{ type: "text", text: s.content }]
                };
            case "h3":
                return {
                    type: "heading",
                    attrs: { level: 3 },
                    content: [{ type: "text", text: s.content }]
                };
            case "p":
                return {
                    type: "paragraph",
                    content: [{ type: "text", text: s.content }]
                };
            case "quote":
                return {
                    type: "blockquote",
                    content: [
                        {
                            type: "paragraph",
                            content: [{ type: "text", text: s.content }]
                        }
                    ]
                };
            case "code":
                return {
                    type: "codeBlock",
                    attrs: { language: s.lang },
                    content: [{ type: "text", text: s.content }]
                };
            case "list":
                return {
                    type: "bulletList",
                    content: s.items.map((it) => ({
                        type: "listItem",
                        content: [
                            {
                                type: "paragraph",
                                content: [{ type: "text", text: it }]
                            }
                        ]
                    }))
                };
            case "ordered":
                return {
                    type: "orderedList",
                    content: s.items.map((it) => ({
                        type: "listItem",
                        content: [
                            {
                                type: "paragraph",
                                content: [{ type: "text", text: it }]
                            }
                        ]
                    }))
                };
        }
    });
    return { type: "doc", content };
};

/** Format a value as a TS string literal (escaping backslashes, backticks, etc). */
const tsString = (s: string) => "`" + s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";

const indent = (n: number) => " ".repeat(n);

const sectionsToTs = (sections: BlogSection[], depth: number): string => {
    const pad = indent(depth);
    if (sections.length === 0) return "[]";
    const items = sections
        .map((s) => {
            switch (s.type) {
                case "h2":
                case "h3":
                case "p":
                case "quote":
                    return `${pad}{ type: "${s.type}", content: ${tsString(s.content)} }`;
                case "code":
                    return `${pad}{ type: "code", lang: ${tsString(s.lang)}, content: ${tsString(s.content)} }`;
                case "list":
                case "ordered": {
                    const inner = s.items
                        .map((i) => `${indent(depth + 4)}${tsString(i)}`)
                        .join(",\n");
                    return `${pad}{\n${indent(depth + 2)}type: "${s.type}",\n${indent(depth + 2)}items: [\n${inner}\n${indent(depth + 2)}]\n${pad}}`;
                }
            }
        })
        .join(",\n");
    return `[\n${items}\n${indent(depth - 2)}]`;
};

/**
 * Generate a TS object literal that the user can paste into
 * the `posts` array of `src/data/blog.ts`.
 */
export const exportToTs = (post: BlogPost): string => {
    const tagsLine = post.tags.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(", ");
    return `{
    slug: "${post.slug}",
    date: "${post.date}",
    readMinutes: ${post.readMinutes},
    tags: [${tagsLine}],
    en: {
        title: ${tsString(post.en.title)},
        excerpt: ${tsString(post.en.excerpt)},
        sections: ${sectionsToTs(post.en.sections, 12)}
    },
    ru: {
        title: ${tsString(post.ru.title)},
        excerpt: ${tsString(post.ru.excerpt)},
        sections: ${sectionsToTs(post.ru.sections, 12)}
    }
}`;
};
