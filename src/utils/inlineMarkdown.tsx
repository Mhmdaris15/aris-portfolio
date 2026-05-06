import { ReactNode } from "react";

/**
 * Render a string with inline markdown — bold, italic, code, links —
 * into React nodes. Used by the blog renderer so author-written
 * `**bold**`, `*italic*`, `` `code` ``, `[text](url)` come out as proper
 * HTML elements instead of literal markers.
 *
 * Intentionally tiny: this is a single-pass tokenizer over a small set
 * of patterns. Anything not matched is rendered as plain text.
 */

interface Pattern {
    regex: RegExp;
    render: (match: RegExpMatchArray, key: string) => ReactNode;
}

// Order matters within a tie — `**` must match before `*`.
const patterns: Pattern[] = [
    {
        regex: /\*\*([^*]+)\*\*/,
        render: (m, key) => <strong key={key}>{m[1]}</strong>
    },
    {
        regex: /__([^_]+)__/,
        render: (m, key) => <strong key={key}>{m[1]}</strong>
    },
    {
        regex: /\*([^*\s][^*]*)\*/,
        render: (m, key) => <em key={key}>{m[1]}</em>
    },
    {
        regex: /(?<!_)_([^_\s][^_]*)_(?!_)/,
        render: (m, key) => <em key={key}>{m[1]}</em>
    },
    {
        regex: /`([^`]+)`/,
        render: (m, key) => (
            <code key={key} className="inline-code">
                {m[1]}
            </code>
        )
    },
    {
        regex: /\[([^\]]+)\]\(([^)]+)\)/,
        render: (m, key) => (
            <a
                key={key}
                href={m[2]}
                target={m[2].startsWith("http") ? "_blank" : undefined}
                rel={m[2].startsWith("http") ? "noopener noreferrer" : undefined}
            >
                {m[1]}
            </a>
        )
    }
];

export const renderInline = (text: string): ReactNode => {
    if (!text) return text;

    const out: ReactNode[] = [];
    let remaining = text;
    let counter = 0;

    while (remaining.length > 0) {
        let earliest: {
            pattern: Pattern;
            match: RegExpMatchArray;
            index: number;
        } | null = null;

        for (const p of patterns) {
            const m = remaining.match(p.regex);
            if (m && m.index !== undefined) {
                if (!earliest || m.index < earliest.index) {
                    earliest = { pattern: p, match: m, index: m.index };
                }
            }
        }

        if (!earliest) {
            out.push(remaining);
            break;
        }

        if (earliest.index > 0) {
            out.push(remaining.slice(0, earliest.index));
        }
        out.push(earliest.pattern.render(earliest.match, `inline-${counter++}`));
        remaining = remaining.slice(
            earliest.index + earliest.match[0].length
        );
    }

    return <>{out}</>;
};
