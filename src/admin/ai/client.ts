import { getApiKey, getModel, ModelId } from "./settings";

/**
 * Direct browser → Anthropic Messages API client.
 * Uses `anthropic-dangerous-direct-browser-access` so this only works
 * because the API key lives on the user's device, not on a backend.
 */

interface UsageInfo {
    input_tokens: number;
    output_tokens: number;
}

export interface AIResponse {
    text: string;
    usage: UsageInfo;
    model: ModelId;
}

interface CallOptions {
    system: string;
    user: string;
    /** Override default model (e.g., use Haiku for cheap quick tasks). */
    model?: ModelId;
    maxTokens?: number;
    /** Force a JSON-only response by prefilling assistant content. */
    jsonMode?: boolean;
}

export class AIError extends Error {
    constructor(
        message: string,
        public status?: number,
        public type?: string
    ) {
        super(message);
        this.name = "AIError";
    }
}

const ENDPOINT = "https://api.anthropic.com/v1/messages";

export const callAI = async (opts: CallOptions): Promise<AIResponse> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new AIError(
            "No API key set. Add it in AI settings.",
            401,
            "no_key"
        );
    }
    const model = opts.model || getModel();

    const messages: { role: string; content: string }[] = [
        { role: "user", content: opts.user }
    ];

    if (opts.jsonMode) {
        // Prefill nudges the model to start with `{` and stay in JSON.
        messages.push({ role: "assistant", content: "{" });
    }

    const body = {
        model,
        max_tokens: opts.maxTokens ?? 4096,
        system: opts.system,
        messages
    };

    let res: Response;
    try {
        res = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
                "anthropic-dangerous-direct-browser-access": "true"
            },
            body: JSON.stringify(body)
        });
    } catch (err) {
        throw new AIError(
            `Network error: ${(err as Error).message}`,
            0,
            "network"
        );
    }

    if (!res.ok) {
        let detail = `HTTP ${res.status}`;
        try {
            const errBody = await res.json();
            detail =
                errBody?.error?.message ||
                errBody?.error?.type ||
                JSON.stringify(errBody);
        } catch {
            /* ignore */
        }
        throw new AIError(detail, res.status, "api");
    }

    const json = await res.json();
    const blocks = (json.content as { type: string; text?: string }[]) || [];
    const text = blocks
        .filter((b) => b.type === "text")
        .map((b) => b.text || "")
        .join("");

    return {
        text: opts.jsonMode ? "{" + text : text,
        usage: json.usage as UsageInfo,
        model: json.model as ModelId
    };
};

/** Strip ```json fences and parse. Throws if not parseable. */
export const parseJson = <T>(raw: string): T => {
    let cleaned = raw.trim();
    // Remove optional ```json ... ``` fences
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");

    // Sometimes the model wraps JSON in extra commentary; grab the first
    // matching { ... } block as a fallback.
    if (!cleaned.startsWith("{") && !cleaned.startsWith("[")) {
        const m = cleaned.match(/[\{\[][\s\S]*[\}\]]/);
        if (m) cleaned = m[0];
    }

    return JSON.parse(cleaned) as T;
};
