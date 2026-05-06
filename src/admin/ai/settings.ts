/**
 * AI settings — provider key + model preference live in localStorage.
 * Never leaves the device.
 */

const KEY_STORAGE = "aris_anthropic_key";
const MODEL_STORAGE = "aris_anthropic_model";

export type ModelId =
    | "claude-sonnet-4-6"
    | "claude-haiku-4-5-20251001"
    | "claude-opus-4-7";

export interface ModelInfo {
    id: ModelId;
    label: string;
    description: string;
    /** Approximate cost per 1k input tokens, USD. */
    costInPer1k: number;
    /** Approximate cost per 1k output tokens, USD. */
    costOutPer1k: number;
}

export const MODELS: ModelInfo[] = [
    {
        id: "claude-haiku-4-5-20251001",
        label: "Claude Haiku 4.5",
        description: "Fastest & cheapest — good for excerpts, tags, quick edits",
        costInPer1k: 0.001,
        costOutPer1k: 0.005
    },
    {
        id: "claude-sonnet-4-6",
        label: "Claude Sonnet 4.6",
        description: "Best balance — translation, polish, longer prose",
        costInPer1k: 0.003,
        costOutPer1k: 0.015
    },
    {
        id: "claude-opus-4-7",
        label: "Claude Opus 4.7",
        description: "Highest quality — when output really matters",
        costInPer1k: 0.015,
        costOutPer1k: 0.075
    }
];

export const getApiKey = () =>
    typeof localStorage !== "undefined"
        ? localStorage.getItem(KEY_STORAGE) || ""
        : "";

export const setApiKey = (key: string) => {
    if (key) localStorage.setItem(KEY_STORAGE, key);
    else localStorage.removeItem(KEY_STORAGE);
};

export const getModel = (): ModelId => {
    const raw =
        typeof localStorage !== "undefined"
            ? localStorage.getItem(MODEL_STORAGE)
            : null;
    if (raw && MODELS.some((m) => m.id === raw)) return raw as ModelId;
    return "claude-sonnet-4-6";
};

export const setModel = (id: ModelId) => localStorage.setItem(MODEL_STORAGE, id);

export const getModelInfo = (id: ModelId): ModelInfo =>
    MODELS.find((m) => m.id === id) || MODELS[1];

export const hasApiKey = () => Boolean(getApiKey());

/** Mask a key for display: `sk-ant-…AB12`. */
export const maskKey = (key: string) => {
    if (key.length < 12) return key;
    return key.slice(0, 7) + "…" + key.slice(-4);
};

/** Estimate USD cost. Both counts in tokens. */
export const estimateCost = (
    modelId: ModelId,
    inTokens: number,
    outTokens: number
): number => {
    const m = getModelInfo(modelId);
    return (inTokens / 1000) * m.costInPer1k + (outTokens / 1000) * m.costOutPer1k;
};
