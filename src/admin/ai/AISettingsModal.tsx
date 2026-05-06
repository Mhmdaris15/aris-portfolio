import { useState } from "react";
import {
  getApiKey,
  setApiKey,
  getModel,
  setModel,
  MODELS,
  ModelId,
  maskKey
} from "./settings";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

const AISettingsModal = ({ open, onClose, onSaved }: Props) => {
  const [key, setKey] = useState(getApiKey());
  const [model, setModelState] = useState<ModelId>(getModel());
  const [showKey, setShowKey] = useState(false);

  if (!open) return null;

  const save = () => {
    setApiKey(key.trim());
    setModel(model);
    onSaved?.();
    onClose();
  };

  const clear = () => {
    if (!confirm("Clear the saved API key?")) return;
    setApiKey("");
    setKey("");
  };

  const masked = maskKey(key);

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 560 }}
      >
        <header>
          <h3>AI settings</h3>
          <button type="button" onClick={onClose}>
            ×
          </button>
        </header>

        <p>
          AI features call the <strong>Anthropic Messages API</strong> directly
          from your browser. Your API key is stored only in this device's
          localStorage and is sent only to Anthropic.{" "}
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get a key →
          </a>
        </p>

        <label className="admin-field">
          <span>Anthropic API key</span>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type={showKey ? "text" : "password"}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-ant-…"
              className="mono"
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="admin-btn ghost"
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
          {key && !showKey && (
            <small>Saved: {masked}</small>
          )}
        </label>

        <label className="admin-field">
          <span>Default model</span>
          <select
            value={model}
            onChange={(e) => setModelState(e.target.value as ModelId)}
            className="ai-model-select"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} — ${m.costInPer1k}/1k in · ${m.costOutPer1k}/1k out
              </option>
            ))}
          </select>
          <small>
            {MODELS.find((m) => m.id === model)?.description}
          </small>
        </label>

        <div className="admin-callout" style={{ marginTop: 8 }}>
          <strong>Cost rough guide:</strong> a typical translate of a 600-word
          post on Sonnet 4.6 costs ~$0.02–0.04. Excerpt and tag tasks are
          ~$0.001 each.
        </div>

        <div className="admin-modal-actions">
          {getApiKey() && (
            <button
              type="button"
              onClick={clear}
              className="admin-btn danger"
              style={{ marginRight: "auto" }}
            >
              Clear key
            </button>
          )}
          <button type="button" onClick={onClose} className="admin-btn ghost">
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            className="admin-btn primary"
            disabled={!key.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISettingsModal;
