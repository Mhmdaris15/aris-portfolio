import "./styles/ProjectCover.css";

type Theme = {
  from: string;
  to: string;
  accent: string;
  glyph: string;
};

const THEMES: Record<string, Theme> = {
  fullstack: { from: "#1e1b4b", to: "#7c3aed", accent: "#c2a4ff", glyph: "</>" },
  ai: { from: "#0f3d2e", to: "#10b981", accent: "#5eead4", glyph: "✦" },
  data: { from: "#0c1e3d", to: "#0ea5e9", accent: "#67e8f9", glyph: "Σ" },
  landing: { from: "#3f0d2e", to: "#ec4899", accent: "#fda4af", glyph: "◆" },
  realtime: { from: "#3f1700", to: "#f97316", accent: "#fdba74", glyph: "⚡" },
  devops: { from: "#1f2937", to: "#94a3b8", accent: "#cbd5e1", glyph: "⚙" },
  cms: { from: "#1e293b", to: "#22d3ee", accent: "#a5f3fc", glyph: "▤" },
  edu: { from: "#3a0764", to: "#a855f7", accent: "#e9d5ff", glyph: "✎" },
  default: { from: "#111827", to: "#6366f1", accent: "#a5b4fc", glyph: "◉" },
};

function pickTheme(category: string): Theme {
  const c = category.toLowerCase();
  if (c.includes("real-time") || c.includes("realtime")) return THEMES.realtime;
  if (c.includes("ai") || c.includes("ml") || c.includes("rag") || c.includes("llm"))
    return THEMES.ai;
  if (c.includes("data") || c.includes("analytics")) return THEMES.data;
  if (c.includes("landing") || c.includes("marketing")) return THEMES.landing;
  if (c.includes("devops") || c.includes("infrastructure")) return THEMES.devops;
  if (c.includes("cms")) return THEMES.cms;
  if (c.includes("educational") || c.includes("hackathon") || c.includes("social"))
    return THEMES.edu;
  if (c.includes("full-stack") || c.includes("e-commerce") || c.includes("web"))
    return THEMES.fullstack;
  return THEMES.default;
}

function initials(title: string): string {
  const cleaned = title.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface Props {
  title: string;
  category: string;
  technologies: string;
  variant?: "card" | "hero";
}

const ProjectCover = ({ title, category, technologies, variant = "card" }: Props) => {
  const theme = pickTheme(category);
  const techs = technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, variant === "hero" ? 6 : 4);
  const id = `pc-${title.replace(/\W/g, "")}`;

  return (
    <div className={`project-cover project-cover--${variant}`}>
      <svg
        viewBox="0 0 600 380"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`${title} cover`}
      >
        <defs>
          <linearGradient id={`${id}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.from} />
            <stop offset="100%" stopColor={theme.to} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="80%" cy="20%" r="60%">
            <stop offset="0%" stopColor={theme.accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
          </radialGradient>
          <pattern
            id={`${id}-grid`}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="600" height="380" fill={`url(#${id}-bg)`} />
        <rect width="600" height="380" fill={`url(#${id}-grid)`} />
        <rect width="600" height="380" fill={`url(#${id}-glow)`} />

        {/* Decorative shapes */}
        <circle
          cx="500"
          cy="60"
          r="120"
          fill={theme.accent}
          opacity="0.08"
        />
        <circle
          cx="80"
          cy="320"
          r="80"
          fill={theme.accent}
          opacity="0.05"
        />

        {/* Glyph watermark */}
        <text
          x="540"
          y="350"
          fontSize="110"
          fontWeight="700"
          fill={theme.accent}
          opacity="0.18"
          textAnchor="end"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {theme.glyph}
        </text>

        {/* Initials badge */}
        <g transform="translate(40, 50)">
          <rect
            width="64"
            height="64"
            rx="14"
            fill="rgba(255,255,255,0.12)"
            stroke={theme.accent}
            strokeOpacity="0.4"
          />
          <text
            x="32"
            y="42"
            fontSize="26"
            fontWeight="700"
            fill="#fff"
            textAnchor="middle"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {initials(title)}
          </text>
        </g>

        {/* Category */}
        <text
          x="40"
          y="170"
          fontSize="14"
          fontWeight="500"
          fill={theme.accent}
          fontFamily="Inter, system-ui, sans-serif"
          letterSpacing="2"
        >
          {category.toUpperCase()}
        </text>

        {/* Title — split over up to 2 lines without foreignObject */}
        {(() => {
          const fontSize = title.length > 28 ? 28 : 36;
          const maxChars = title.length > 28 ? 24 : 18;
          const words = title.split(" ");
          const lines: string[] = [];
          let current = "";
          for (const w of words) {
            if ((current + " " + w).trim().length <= maxChars) {
              current = (current + " " + w).trim();
            } else {
              if (current) lines.push(current);
              current = w;
            }
            if (lines.length === 2) break;
          }
          if (current && lines.length < 2) lines.push(current);
          return (
            <text
              x="40"
              y="220"
              fontSize={fontSize}
              fontWeight="700"
              fill="#fff"
              fontFamily="Inter, system-ui, sans-serif"
              letterSpacing="-0.5"
            >
              {lines.map((line, i) => (
                <tspan key={i} x="40" dy={i === 0 ? 0 : fontSize * 1.1}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })()}

        {/* Tech chips */}
        <g transform="translate(40, 320)">
          {techs.map((tech, i) => {
            const x = i * 130;
            return (
              <g key={tech} transform={`translate(${x}, 0)`}>
                <rect
                  width={Math.min(120, 18 + tech.length * 7)}
                  height="28"
                  rx="14"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.15)"
                />
                <text
                  x={Math.min(120, 18 + tech.length * 7) / 2}
                  y="18"
                  fontSize="11"
                  fontWeight="500"
                  fill="#fff"
                  textAnchor="middle"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {tech.length > 14 ? tech.slice(0, 13) + "…" : tech}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default ProjectCover;
