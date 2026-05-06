import type { BlogPost } from "../data/blog";

/**
 * Posts authored in the in-browser editor. Stored under one key as an array.
 * Source of truth for the merged blog list (along with the static TS posts).
 */

const KEY = "aris_blog_drafts_v1";

export interface DraftPost extends BlogPost {
    /** ISO timestamp of last save. */
    updatedAt: string;
    /** "draft" = visible only when authed, "published" = visible to all on this browser. */
    status: "draft" | "published";
}

const safeRead = (): DraftPost[] => {
    if (typeof localStorage === "undefined") return [];
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as DraftPost[]) : [];
    } catch {
        return [];
    }
};

const safeWrite = (drafts: DraftPost[]) => {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(drafts));
};

export const listDrafts = (): DraftPost[] =>
    safeRead().sort(
        (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

export const listPublished = (): DraftPost[] =>
    safeRead().filter((d) => d.status === "published");

export const getDraft = (slug: string): DraftPost | undefined =>
    safeRead().find((d) => d.slug === slug);

export const upsertDraft = (post: DraftPost) => {
    const all = safeRead();
    const idx = all.findIndex((d) => d.slug === post.slug);
    const next = { ...post, updatedAt: new Date().toISOString() };
    if (idx >= 0) all[idx] = next;
    else all.push(next);
    safeWrite(all);
    return next;
};

export const deleteDraft = (slug: string) => {
    safeWrite(safeRead().filter((d) => d.slug !== slug));
};

export const setStatus = (slug: string, status: "draft" | "published") => {
    const all = safeRead();
    const idx = all.findIndex((d) => d.slug === slug);
    if (idx >= 0) {
        all[idx] = {
            ...all[idx],
            status,
            updatedAt: new Date().toISOString()
        };
        safeWrite(all);
    }
};
