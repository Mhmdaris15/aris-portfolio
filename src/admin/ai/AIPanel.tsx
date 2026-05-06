import { useState } from "react";
import {
  LuSparkles,
  LuLanguages,
  LuTags,
  LuFileText,
  LuWand,
  LuSettings2
} from "react-icons/lu";
import type { BlogPost, BlogSection } from "../../data/blog";
import {
  translatePost,
  generateExcerpt,
  suggestTags,
  polishPost,
  suggestTitles
} from "./tasks";
import { hasApiKey, getModelInfo, getModel, estimateCost } from "./settings";
import { AIError } from "./client";
import AISettingsModal from "./AISettingsModal";

type Lang = "en" | "ru";

interface Props {
  post: BlogPost;
  lang: Lang;
  /** Apply a translate / polish result onto the target language. */
  onApplyContent: (
    targetLang: Lang,
    update: { title: string; excerpt: string; sections: BlogSection[] }
  ) => void;
  /** Set excerpt only on a specific language. */
  onApplyExcerpt: (lang: Lang, excerpt: string) => void;
  /** Replace tags. */
  onApplyTags: (tags: string[]) => void;
  /** Replace title for a specific language. */
  onApplyTitle: (lang: Lang, title: string) => void;
}

interface BusyState {
  task: string;
  message: string;
}

interface ResultState {
  title: string;
  body: React.ReactNode;
  onAccept?: () => void;
  acceptLabel?: string;
}

const AIPanel = ({
  post,
  lang,
  onApplyContent,
  onApplyExcerpt,
  onApplyTags,
  onApplyTitle
}: Props) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [busy, setBusy] = useState<BusyState | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const otherLang: Lang = lang === "en" ? "ru" : "en";

  const guard = (task: string, message: string) => {
    if (!hasApiKey()) {
      setSettingsOpen(true);
      return false;
    }
    setError(null);
    setBusy({ task, message });
    return true;
  };

  const finish = () => setBusy(null);

  const handleError = (err: unknown) => {
    setBusy(null);
    if (err instanceof AIError) {
      if (err.type === "no_key") setSettingsOpen(true);
      setError(err.message);
    } else {
      setError((err as Error).message);
    }
  };

  /* Actions */

  const onTranslate = async () => {
    if (!guard("translate", `Translating ${lang.toUpperCase()} → ${otherLang.toUpperCase()}…`)) return;
    try {
      const out = await translatePost(post, lang, otherLang);
      finish();
      setResult({
        title: `Translation ready (${otherLang.toUpperCase()})`,
        body: (
          <div className="ai-preview">
            <p className="ai-preview-meta">
              Title:{" "}
              <strong>{out.title}</strong>
            </p>
            <p className="ai-preview-meta">Excerpt: {out.excerpt}</p>
            <p className="ai-preview-meta">
              {out.sections.length} sections translated.
            </p>
            <p className="ai-preview-hint">
              Click <em>Apply to {otherLang.toUpperCase()} tab</em> to fill
              the title, excerpt, and body. You can edit afterwards.
            </p>
          </div>
        ),
        acceptLabel: `Apply to ${otherLang.toUpperCase()} tab`,
        onAccept: () => {
          onApplyContent(otherLang, out);
          setResult(null);
        }
      });
    } catch (err) {
      handleError(err);
    }
  };

  const onExcerpt = async () => {
    if (!guard("excerpt", "Writing excerpt…")) return;
    try {
      const text = await generateExcerpt(post, lang);
      finish();
      onApplyExcerpt(lang, text);
      setResult({
        title: "Excerpt generated",
        body: (
          <div className="ai-preview">
            <p>The excerpt field has been filled with:</p>
            <p className="ai-preview-output">"{text}"</p>
            <p className="ai-preview-hint">Edit it directly in the form if needed.</p>
          </div>
        )
      });
    } catch (err) {
      handleError(err);
    }
  };

  const onTags = async () => {
    if (!guard("tags", "Suggesting tags…")) return;
    try {
      const tags = await suggestTags(post, lang);
      finish();
      onApplyTags(tags);
      setResult({
        title: "Tags suggested",
        body: (
          <div className="ai-preview">
            <p>Replaced existing tags with:</p>
            <p className="ai-preview-output">{tags.join(", ")}</p>
          </div>
        )
      });
    } catch (err) {
      handleError(err);
    }
  };

  const onTitles = async () => {
    if (!guard("titles", "Generating title ideas…")) return;
    try {
      const titles = await suggestTitles(post, lang);
      finish();
      setResult({
        title: "Title alternatives",
        body: (
          <div className="ai-preview">
            <p>Click any to apply to the {lang.toUpperCase()} tab:</p>
            <ul className="ai-title-list">
              {titles.map((title) => (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyTitle(lang, title);
                      setResult(null);
                    }}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      });
    } catch (err) {
      handleError(err);
    }
  };

  const onPolish = async () => {
    if (!guard("polish", `Polishing ${lang.toUpperCase()} prose…`)) return;
    try {
      const out = await polishPost(post, lang);
      finish();
      setResult({
        title: `Polished version (${lang.toUpperCase()})`,
        body: (
          <div className="ai-preview">
            <p className="ai-preview-meta">
              <strong>{out.title}</strong>
            </p>
            <p className="ai-preview-meta">{out.excerpt}</p>
            <p className="ai-preview-meta">
              {out.sections.length} sections rewritten.
            </p>
            <p className="ai-preview-hint">
              Apply replaces the current {lang.toUpperCase()} title, excerpt,
              and body. The original isn't backed up — copy first if you want
              to keep it.
            </p>
          </div>
        ),
        acceptLabel: `Apply to ${lang.toUpperCase()} tab`,
        onAccept: () => {
          onApplyContent(lang, out);
          setResult(null);
        }
      });
    } catch (err) {
      handleError(err);
    }
  };

  const modelInfo = getModelInfo(getModel());
  const sampleCost = estimateCost(modelInfo.id, 1500, 1500);

  return (
    <>
      <div className="ai-panel">
        <div className="ai-panel-head">
          <h4>
            <LuSparkles />
            <span>AI tools</span>
          </h4>
          <button
            type="button"
            className="ai-panel-cog"
            onClick={() => setSettingsOpen(true)}
            aria-label="AI settings"
          >
            <LuSettings2 />
          </button>
        </div>

        {!hasApiKey() && (
          <div className="ai-panel-notice">
            Connect your Anthropic API key to enable AI features.
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="admin-btn primary"
              style={{ width: "100%", marginTop: 8 }}
            >
              Set API key
            </button>
          </div>
        )}

        <button
          type="button"
          className="ai-action"
          onClick={onTranslate}
          disabled={Boolean(busy)}
          title="Translate this post to the other language"
        >
          <LuLanguages />
          <span>
            <strong>Translate to {otherLang.toUpperCase()}</strong>
            <small>From {lang.toUpperCase()} content</small>
          </span>
        </button>

        <button
          type="button"
          className="ai-action"
          onClick={onExcerpt}
          disabled={Boolean(busy)}
          title="Generate a 1-sentence excerpt from this language's body"
        >
          <LuFileText />
          <span>
            <strong>Generate excerpt</strong>
            <small>{lang.toUpperCase()} · auto-fills field</small>
          </span>
        </button>

        <button
          type="button"
          className="ai-action"
          onClick={onTags}
          disabled={Boolean(busy)}
          title="Suggest 3–5 tags based on the post"
        >
          <LuTags />
          <span>
            <strong>Suggest tags</strong>
            <small>Replaces existing tags</small>
          </span>
        </button>

        <button
          type="button"
          className="ai-action"
          onClick={onTitles}
          disabled={Boolean(busy)}
          title="Show alternative titles for this language"
        >
          <LuSparkles />
          <span>
            <strong>Title ideas</strong>
            <small>{lang.toUpperCase()} · pick one to apply</small>
          </span>
        </button>

        <button
          type="button"
          className="ai-action"
          onClick={onPolish}
          disabled={Boolean(busy)}
          title="Rewrite this language's body for clarity (review before accepting)"
        >
          <LuWand />
          <span>
            <strong>Polish prose</strong>
            <small>{lang.toUpperCase()} · review before applying</small>
          </span>
        </button>

        <p className="ai-panel-foot">
          Model: {modelInfo.label} · ~${sampleCost.toFixed(4)} per typical task
        </p>

        {error && <p className="ai-panel-error">{error}</p>}
      </div>

      {/* Busy overlay */}
      {busy && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal" style={{ maxWidth: 380, textAlign: "center" }}>
            <div className="ai-spinner" />
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              {busy.message}
            </p>
            <small style={{ opacity: 0.55 }}>
              Calling {modelInfo.label}…
            </small>
          </div>
        </div>
      )}

      {/* Result modal */}
      {result && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setResult(null)}
        >
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 600 }}
          >
            <header>
              <h3>{result.title}</h3>
              <button type="button" onClick={() => setResult(null)}>×</button>
            </header>
            {result.body}
            <div className="admin-modal-actions">
              <button
                type="button"
                onClick={() => setResult(null)}
                className="admin-btn ghost"
              >
                Close
              </button>
              {result.onAccept && (
                <button
                  type="button"
                  onClick={result.onAccept}
                  className="admin-btn primary"
                >
                  {result.acceptLabel || "Apply"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <AISettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSaved={() => setError(null)}
      />
    </>
  );
};

export default AIPanel;
