import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RichEditor from "./components/RichEditor";
import {
  upsertDraft,
  getDraft,
  setStatus,
  deleteDraft,
  DraftPost
} from "./storage";
import { tiptapToSections, sectionsToTiptap, exportToTs } from "./converter";
import type { BlogPost } from "../data/blog";
import { useLocale } from "../i18n/LocaleContext";
import AIPanel from "./ai/AIPanel";

type Lang = "en" | "ru";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

const blankPost = (): DraftPost => ({
  slug: `draft-${Date.now()}`,
  date: new Date().toISOString().slice(0, 10),
  readMinutes: 5,
  tags: [],
  en: { title: "", excerpt: "", sections: [] },
  ru: { title: "", excerpt: "", sections: [] },
  updatedAt: new Date().toISOString(),
  status: "draft"
});

const BlogEditor = () => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { href } = useLocale();

  const [post, setPost] = useState<DraftPost>(() => {
    if (paramSlug) {
      const existing = getDraft(paramSlug);
      if (existing) return existing;
    }
    return blankPost();
  });

  const [lang, setLang] = useState<Lang>("en");
  const [tagsRaw, setTagsRaw] = useState(post.tags.join(", "));
  const [editorDoc, setEditorDoc] = useState<object>(() =>
    sectionsToTiptap(post[lang].sections)
  );
  const [exportOpen, setExportOpen] = useState(false);
  const [savedAt, setSavedAt] = useState<string>(post.updatedAt);
  const skipNextEditorPush = useRef(false);

  // Switch the rich editor doc when the language tab changes.
  useEffect(() => {
    skipNextEditorPush.current = true;
    setEditorDoc(sectionsToTiptap(post[lang].sections));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Persist editor changes back into the post structure.
  const onEditorChange = useCallback(
    (json: object) => {
      if (skipNextEditorPush.current) {
        skipNextEditorPush.current = false;
        setEditorDoc(json);
        return;
      }
      setEditorDoc(json);
      const sections = tiptapToSections(json as never);
      setPost((p) => ({
        ...p,
        [lang]: { ...p[lang], sections }
      }));
    },
    [lang]
  );

  // Auto-save (debounced).
  useEffect(() => {
    const handle = setTimeout(() => {
      const saved = upsertDraft({
        ...post,
        tags: tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      });
      setSavedAt(saved.updatedAt);
    }, 800);
    return () => clearTimeout(handle);
  }, [post, tagsRaw]);

  const updateMeta = <K extends keyof DraftPost>(key: K, value: DraftPost[K]) =>
    setPost((p) => ({ ...p, [key]: value }));

  const updateLang = <K extends keyof BlogPost["en"]>(
    key: K,
    value: BlogPost["en"][K]
  ) =>
    setPost((p) => ({
      ...p,
      [lang]: { ...p[lang], [key]: value }
    }));

  const onPublishToggle = () => {
    const next = post.status === "published" ? "draft" : "published";
    setStatus(post.slug, next);
    setPost((p) => ({ ...p, status: next }));
  };

  const onSlugBlur = () => {
    if (!post.slug.trim() || post.slug.startsWith("draft-")) {
      const fromTitle = slugify(post.en.title);
      if (fromTitle) {
        // Only safe to re-slug if the new slug isn't already taken
        const taken = getDraft(fromTitle);
        if (!taken) {
          deleteDraft(post.slug); // remove old draft
          updateMeta("slug", fromTitle);
        }
      }
    }
  };

  const tsSnippet = useMemo(() => exportToTs(post), [post]);

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(tsSnippet);
      alert("Copied. Paste this into the `posts` array in src/data/blog.ts.");
    } catch {
      alert("Couldn't copy automatically — select the text and copy manually.");
    }
  };

  const onDelete = () => {
    if (!confirm("Delete this draft permanently?")) return;
    deleteDraft(post.slug);
    navigate("/admin");
  };

  const previewHref = href(`/blog/${post.slug}`);

  return (
    <div className="admin-editor">
      <header className="admin-editor-head">
        <div>
          <Link to="/admin" className="admin-back">
            ← All drafts
          </Link>
          <h1>{post.en.title || post.ru.title || "Untitled draft"}</h1>
          <p className="admin-meta">
            {post.status === "published" ? "Published" : "Draft"} · auto-saved{" "}
            {new Date(savedAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="admin-editor-actions">
          <Link to={previewHref} target="_blank" className="admin-btn ghost">
            Preview ↗
          </Link>
          <button
            type="button"
            onClick={onPublishToggle}
            className={`admin-btn ${post.status === "published" ? "ghost" : "primary"}`}
          >
            {post.status === "published" ? "Unpublish" : "Publish"}
          </button>
          <button
            type="button"
            onClick={() => setExportOpen(true)}
            className="admin-btn"
          >
            Export to code
          </button>
          <button type="button" onClick={onDelete} className="admin-btn danger">
            Delete
          </button>
        </div>
      </header>

      <div className="admin-editor-grid">
        {/* Metadata sidebar */}
        <aside className="admin-meta-panel">
          <h3>Metadata</h3>

          <label className="admin-field">
            <span>Slug</span>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => updateMeta("slug", e.target.value)}
              onBlur={onSlugBlur}
              className="mono"
            />
            <small>URL: /blog/{post.slug}</small>
          </label>

          <label className="admin-field">
            <span>Date</span>
            <input
              type="date"
              value={post.date}
              onChange={(e) => updateMeta("date", e.target.value)}
            />
          </label>

          <label className="admin-field">
            <span>Read time (minutes)</span>
            <input
              type="number"
              min={1}
              max={60}
              value={post.readMinutes}
              onChange={(e) =>
                updateMeta("readMinutes", parseInt(e.target.value) || 1)
              }
            />
          </label>

          <label className="admin-field">
            <span>Tags (comma-separated)</span>
            <input
              type="text"
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="AI, RAG, Production"
            />
          </label>

          <div className="admin-callout">
            <strong>Tip:</strong> drafts auto-save in your browser.
            Publish makes it visible only on this device. To make it public,
            use <em>Export to code</em> and paste into{" "}
            <code>src/data/blog.ts</code>, then commit + deploy.
          </div>

          <AIPanel
            post={post}
            lang={lang}
            onApplyContent={(targetLang, update) => {
              setPost((p) => ({
                ...p,
                [targetLang]: {
                  title: update.title,
                  excerpt: update.excerpt,
                  sections: update.sections
                }
              }));
              if (targetLang === lang) {
                skipNextEditorPush.current = true;
                setEditorDoc(sectionsToTiptap(update.sections));
              }
            }}
            onApplyExcerpt={(targetLang, excerpt) =>
              setPost((p) => ({
                ...p,
                [targetLang]: { ...p[targetLang], excerpt }
              }))
            }
            onApplyTags={(tags) => {
              setTagsRaw(tags.join(", "));
              setPost((p) => ({ ...p, tags }));
            }}
            onApplyTitle={(targetLang, title) =>
              setPost((p) => ({
                ...p,
                [targetLang]: { ...p[targetLang], title }
              }))
            }
          />

          <div className="admin-cheatsheet">
            <h4>Markdown shortcuts</h4>
            <ul>
              <li><code>## </code> heading 2</li>
              <li><code>### </code> heading 3</li>
              <li><code>**bold**</code> &nbsp; <code>*italic*</code></li>
              <li><code>`code`</code></li>
              <li><code>- </code> bullet list</li>
              <li><code>1. </code> numbered list</li>
              <li><code>{">"} </code> quote</li>
              <li><code>```</code> code block</li>
              <li><code>---</code> divider</li>
            </ul>
            <p>
              Pasting markdown? Use the <em>Paste markdown</em> button in the
              toolbar — pasted plain text is auto-detected too.
            </p>
          </div>
        </aside>

        {/* Main editor */}
        <main className="admin-editor-main">
          <div className="admin-lang-tabs">
            <button
              type="button"
              className={`admin-lang-tab ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              🇺🇸 English
              {!post.en.title && <span className="dot" />}
            </button>
            <button
              type="button"
              className={`admin-lang-tab ${lang === "ru" ? "active" : ""}`}
              onClick={() => setLang("ru")}
            >
              🇷🇺 Русский
              {!post.ru.title && <span className="dot" />}
            </button>
          </div>

          <input
            type="text"
            className="admin-title-input"
            placeholder={
              lang === "en"
                ? "Post title (English)"
                : "Заголовок поста (Русский)"
            }
            value={post[lang].title}
            onChange={(e) => updateLang("title", e.target.value)}
          />

          <textarea
            className="admin-excerpt-input"
            placeholder={
              lang === "en"
                ? "One-sentence excerpt — what's this post about?"
                : "Краткое описание — о чём этот пост?"
            }
            value={post[lang].excerpt}
            onChange={(e) => updateLang("excerpt", e.target.value)}
            rows={2}
          />

          <RichEditor
            content={editorDoc}
            onChange={onEditorChange}
            placeholder={
              lang === "en"
                ? "Start writing your post…"
                : "Начните писать статью…"
            }
          />
        </main>
      </div>

      {/* Export modal */}
      {exportOpen && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setExportOpen(false)}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <header>
              <h3>Export to code</h3>
              <button type="button" onClick={() => setExportOpen(false)}>
                ×
              </button>
            </header>
            <p>
              Copy this and paste it as a new entry in the <code>posts</code>{" "}
              array in <code>src/data/blog.ts</code>. Then commit and deploy
              to make it public.
            </p>
            <textarea readOnly value={tsSnippet} rows={20} className="mono" />
            <div className="admin-modal-actions">
              <button type="button" onClick={copyExport} className="admin-btn primary">
                Copy to clipboard
              </button>
              <button
                type="button"
                onClick={() => setExportOpen(false)}
                className="admin-btn ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
