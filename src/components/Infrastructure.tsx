import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LuServer,
  LuContainer,
  LuCloud,
  LuShieldCheck,
  LuGitBranch,
  LuActivity
} from "react-icons/lu";
import { useLocale } from "../i18n/LocaleContext";
import "./styles/Infrastructure.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Configuration: edit to match your real platform ──────────── */

interface ServiceNode {
  id: string;
  label: string;
  kind: "web" | "api" | "db" | "ai" | "obs" | "cache" | "files";
  port?: string;
}

const services: ServiceNode[] = [
  { id: "portfolio", label: "Portfolio", kind: "web", port: ":443" },
  { id: "rag-bot", label: "WhatsApp RAG Bot", kind: "ai", port: ":8000" },
  { id: "analytics-api", label: "Analytics API", kind: "api", port: ":4000" },
  { id: "postgres", label: "Postgres", kind: "db", port: ":5432" },
  { id: "redis", label: "Redis", kind: "cache", port: ":6379" },
  { id: "minio", label: "MinIO", kind: "files", port: ":9000" },
  { id: "uptime", label: "Uptime Kuma", kind: "obs", port: ":3001" }
];

interface Capability {
  label: string;
  detail: string;
  icon: typeof LuServer;
}

const capabilities = (locale: "en" | "ru"): Capability[] =>
  locale === "ru"
    ? [
        { label: "Multi-Service", detail: "Один домен, много сервисов", icon: LuServer },
        { label: "Automated CI/CD", detail: "git push → live", icon: LuGitBranch },
        { label: "Containerized", detail: "Docker · изолированные сети", icon: LuContainer },
        { label: "Cloud-Native", detail: "GCP · Cloudflare · Coolify", icon: LuCloud },
        { label: "TLS Everywhere", detail: "Wildcard SSL по умолчанию", icon: LuShieldCheck },
        { label: "Observability", detail: "Логи · метрики · статус деплоя", icon: LuActivity }
      ]
    : [
        { label: "Multi-Service", detail: "One domain, many services", icon: LuServer },
        { label: "Automated CI/CD", detail: "git push → live", icon: LuGitBranch },
        { label: "Containerized", detail: "Docker · isolated networks", icon: LuContainer },
        { label: "Cloud-Native", detail: "GCP · Cloudflare · Coolify", icon: LuCloud },
        { label: "TLS Everywhere", detail: "Wildcard SSL by default", icon: LuShieldCheck },
        { label: "Observability", detail: "Logs · metrics · deploy status", icon: LuActivity }
      ];

/* ─── Component ────────────────────────────────────────────────── */

const Infrastructure = () => {
  const { locale, href } = useLocale();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".infra-rise > *", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".infra-section", start: "top 78%" }
      });

      gsap.fromTo(
        ".infra-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".infra-section", start: "top 78%" }
        }
      );

      // Topology — node fade in, edges sweep
      gsap.from(".topo-node", {
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ".infra-topology", start: "top 78%" }
      });
      gsap.fromTo(
        ".topo-edge",
        { strokeDashoffset: 200 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          stagger: 0.04,
          scrollTrigger: { trigger: ".infra-topology", start: "top 78%" }
        }
      );

      // Pipeline stations rise
      gsap.from(".pipeline-stop", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".infra-pipeline", start: "top 90%" }
      });

      // Capability cards
      gsap.from(".cap-card", {
        opacity: 0,
        y: 22,
        duration: 0.55,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ".infra-caps", start: "top 88%" }
      });

      // Terminal lines reveal one by one — typewriter feel without the cost
      gsap.from(".term-line", {
        opacity: 0,
        x: -8,
        duration: 0.35,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".infra-terminal", start: "top 88%" }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="infra-section" id="infrastructure" ref={root}>
      {/* Subtle technical grid background */}
      <div className="infra-grid-bg" aria-hidden />

      <div className="infra-shell">
        {/* Header */}
        <header className="infra-rise infra-head">
          <span className="infra-eyebrow">
            <span className="infra-status-dot" />
            <span>{locale === "ru" ? "Инфраструктура · Live" : "Infrastructure · Live"}</span>
            <span className="infra-eyebrow-num">№ 02</span>
          </span>
          <h2 className="infra-title">
            {locale === "ru" ? (
              <>
                Своё <em>облако.</em>
                <br />
                Один git push до live.
              </>
            ) : (
              <>
                My own <em>cloud.</em>
                <br />
                One git push to live.
              </>
            )}
          </h2>
          <p className="infra-lead">
            {locale === "ru"
              ? "Coolify-оркестрируемая VM на Google Cloud, на которой живут все мои production-сервисы — веб-приложения, API, базы, AI и мониторинг — под одним wildcard-доменом."
              : "A Coolify-orchestrated GCP VM that hosts every production service I run — web apps, APIs, databases, AI workloads, and monitoring — under one wildcard domain."}
          </p>
        </header>

        <div className="infra-rule" />

        {/* Two-column: topology diagram + terminal pane */}
        <div className="infra-stage">
          {/* Topology — animated SVG architecture */}
          <div className="infra-topology">
            <div className="topo-frame-label">
              <span>topology.svg</span>
              <span className="topo-frame-meta">8 nodes · 7 edges</span>
            </div>

            <svg
              className="topo-svg"
              viewBox="0 0 600 420"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Cloud platform topology"
            >
              {/* Edges first so nodes render on top */}
              <defs>
                <linearGradient id="edge-grad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(194,164,255,0.15)" />
                  <stop offset="50%" stopColor="rgba(194,164,255,0.65)" />
                  <stop offset="100%" stopColor="rgba(194,164,255,0.15)" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Cloudflare cloud (entry) */}
              <g className="topo-node" data-id="cf">
                <rect x="20" y="180" width="120" height="60" rx="6" className="topo-rect topo-rect--ext" />
                <text x="80" y="206" className="topo-label">Cloudflare</text>
                <text x="80" y="222" className="topo-sub">DNS · Wildcard SSL</text>
              </g>

              {/* GCP VM (the box) */}
              <g className="topo-node" data-id="vm">
                <rect x="220" y="40" width="160" height="340" rx="10" className="topo-rect topo-rect--vm" />
                <text x="300" y="62" className="topo-label">GCP VM</text>
                <text x="300" y="78" className="topo-sub">Coolify · Reverse Proxy</text>
                <line x1="240" y1="92" x2="360" y2="92" className="topo-divider" />
              </g>

              {/* Service nodes inside the VM */}
              {[
                { x: 240, y: 105, label: "portfolio", sub: ":443", cls: "web" },
                { x: 240, y: 155, label: "rag-bot", sub: ":8000", cls: "ai" },
                { x: 240, y: 205, label: "analytics-api", sub: ":4000", cls: "api" },
                { x: 240, y: 255, label: "postgres", sub: ":5432", cls: "db" },
                { x: 240, y: 305, label: "redis", sub: ":6379", cls: "cache" },
                { x: 240, y: 355, label: "minio", sub: ":9000", cls: "files" }
              ].map((s) => (
                <g className="topo-node" key={s.label}>
                  <rect
                    x={s.x}
                    y={s.y}
                    width="120"
                    height="36"
                    rx="4"
                    className={`topo-svc topo-svc--${s.cls}`}
                  />
                  <circle cx={s.x + 12} cy={s.y + 18} r="3" className="topo-dot" />
                  <text x={s.x + 22} y={s.y + 16} className="topo-svc-label">
                    {s.label}
                  </text>
                  <text x={s.x + 22} y={s.y + 28} className="topo-svc-sub">
                    {s.sub}
                  </text>
                </g>
              ))}

              {/* Right side: external cluster */}
              <g className="topo-node" data-id="gh">
                <rect x="460" y="80" width="120" height="60" rx="6" className="topo-rect topo-rect--ext" />
                <text x="520" y="106" className="topo-label">GitHub</text>
                <text x="520" y="122" className="topo-sub">Actions · CI</text>
              </g>

              <g className="topo-node" data-id="obs">
                <rect x="460" y="260" width="120" height="60" rx="6" className="topo-rect topo-rect--ext" />
                <text x="520" y="286" className="topo-label">Uptime Kuma</text>
                <text x="520" y="302" className="topo-sub">Live · 99.6%</text>
              </g>

              {/* Edges */}
              <path className="topo-edge" d="M 140 210 Q 180 210 220 210" />
              <path className="topo-edge" d="M 460 110 Q 410 110 380 200" />
              <path className="topo-edge" d="M 460 290 Q 410 290 380 290" />
              <path className="topo-edge topo-edge--pulse" d="M 140 200 Q 180 130 220 130" />
              <path className="topo-edge topo-edge--pulse" d="M 140 220 Q 180 280 220 280" />
            </svg>
          </div>

          {/* Terminal pane */}
          <div className="infra-terminal">
            <div className="term-chrome">
              <span className="term-dot term-dot--r" />
              <span className="term-dot term-dot--y" />
              <span className="term-dot term-dot--g" />
              <span className="term-title">aris@coolify · ~/platform</span>
              <span className="term-status">
                <span className="infra-status-dot" /> live
              </span>
            </div>
            <div className="term-body">
              <span className="term-line">
                <span className="term-prompt">$</span>{" "}
                <span className="term-cmd">git push origin main</span>
              </span>
              <span className="term-line term-line--out">
                Enumerating objects: 12, done.
              </span>
              <span className="term-line term-line--out">
                Total 8 (delta 5), reused 0 (delta 0)
              </span>
              <span className="term-line term-line--info">
                <span className="term-tag term-tag--info">webhook</span> coolify received push event
              </span>
              <span className="term-line term-line--info">
                <span className="term-tag term-tag--info">build</span> docker image: portfolio:abc1234
              </span>
              <span className="term-line term-line--ok">
                <span className="term-tag term-tag--ok">deploy</span> healthy · /health → 200 OK
              </span>
              <span className="term-line term-line--ok">
                <span className="term-tag term-tag--ok">live</span> aris-portfolio.app · 4.2s
              </span>
              <span className="term-line term-cursor-line">
                <span className="term-prompt">$</span>{" "}
                <span className="term-cursor" aria-hidden />
              </span>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="infra-pipeline">
          {[
            { label: "commit", note: locale === "ru" ? "локально" : "local" },
            { label: "push", note: "github" },
            { label: "build", note: "actions" },
            { label: "image", note: "docker" },
            { label: "deploy", note: "coolify" },
            { label: "live", note: "https" }
          ].map((s, i, arr) => (
            <div key={s.label} className={`pipeline-stop ${i === arr.length - 1 ? "is-last" : ""}`}>
              <span className="pipeline-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="pipeline-label">{s.label}</span>
              <span className="pipeline-note">{s.note}</span>
            </div>
          ))}
        </div>

        <div className="infra-rule" />

        {/* Capability grid */}
        <div className="infra-caps">
          {capabilities(locale === "ru" ? "ru" : "en").map(({ label, detail, icon: Icon }) => (
            <div className="cap-card" key={label}>
              <div className="cap-icon">
                <Icon />
              </div>
              <div className="cap-text">
                <span className="cap-label">{label}</span>
                <span className="cap-detail">{detail}</span>
              </div>
              <span className="cap-live" aria-hidden>
                <span className="infra-status-dot" />
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="infra-foot">
          <span className="infra-foot-meta">
            <span className="infra-status-dot" />
            {locale === "ru" ? "Сервисов в production" : "Services in production"} ·{" "}
            <strong>{services.length}</strong>
          </span>
          <Link
            to={href("/works/self-hosted-cloud-platform")}
            className="infra-cta"
            data-cursor="disable"
          >
            {locale === "ru" ? "Подробный кейс" : "Read the case study"}
            <span className="infra-cta-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
