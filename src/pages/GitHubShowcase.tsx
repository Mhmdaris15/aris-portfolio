import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  LuLock,
  LuStar,
  LuGitFork,
  LuExternalLink,
  LuGithub,
  LuSearch
} from "react-icons/lu";
import {
  githubProjects,
  ghCategories,
  ghCategoryLabel,
  totalLanguages,
  featuredGithubProjects,
  type GhProject,
  type GhCategory
} from "../data/github";
import { useLocale, pick } from "../i18n/LocaleContext";
import SeoHead from "../seo/SeoHead";
import { itemListSchema, breadcrumbSchema } from "../seo/schema";
import { absolute } from "../seo/siteConfig";
import "../styles/editorial.css";
import "./GitHubShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const fmtDate = (iso: string, locale: "en" | "ru") =>
  new Date(iso).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "short"
  });

const yearsOnGithub = () => {
  const oldest = githubProjects.reduce(
    (acc, p) =>
      new Date(p.metrics.createdAt) < new Date(acc) ? p.metrics.createdAt : acc,
    githubProjects[0].metrics.createdAt
  );
  return new Date().getFullYear() - new Date(oldest).getFullYear();
};

const GitHubShowcase = () => {
  const { locale } = useLocale();
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [filter, setFilter] = useState<GhCategory | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return githubProjects.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        p.repoName.toLowerCase().includes(q) ||
        pick(p.tagline, locale).toLowerCase().includes(q) ||
        pick(p.summary, locale).toLowerCase().includes(q) ||
        p.stack.join(" ").toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
      );
    });
  }, [filter, query, locale]);

  const langs = useMemo(() => totalLanguages().slice(0, 6), []);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".gh-rise > *", {
        opacity: 0,
        y: 26,
        duration: 0.85,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gh-mast", start: "top 85%" }
      });
      gsap.fromTo(
        ".gh-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.15,
          scrollTrigger: { trigger: ".gh-mast", start: "top 85%" }
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const seoTitle =
    locale === "ru"
      ? "GitHub showcase — открытый код и инженерные проекты"
      : "GitHub showcase — open work and engineering projects";

  return (
    <div ref={root} className="editorial gh-page">
      <SeoHead
        path="/github"
        title={seoTitle}
        description={
          locale === "ru"
            ? "Курированные GitHub-репозитории — Platform Engineering, AI/RAG системы, real-time платформы, и production-инфраструктура."
            : "Curated GitHub repositories — Platform Engineering, AI/RAG systems, real-time platforms, and production infrastructure."
        }
        jsonLd={[
          itemListSchema(
            seoTitle,
            githubProjects.slice(0, 25).map((p) => ({
              name: p.repoName,
              url: `https://github.com/${p.repo}`
            }))
          ),
          breadcrumbSchema([
            { name: "Home", url: absolute("/") },
            { name: "GitHub", url: absolute("/github") }
          ])
        ]}
      />

      <div className="grain" />

      <header className="editorial-rail">
        <Link to="/" className="editorial-back">
          {locale === "ru" ? "На главную" : "Index"}
        </Link>
        <span className="editorial-rail-center">
          {locale === "ru" ? "Открытый код" : "Open Work"}
        </span>
        <span className="editorial-rail-right">
          @Mhmdaris15 · {githubProjects.length}
        </span>
      </header>

      <div className="editorial-container">
        {/* Masthead */}
        <section className="gh-mast gh-rise">
          <span className="editorial-eyebrow">
            <span>{locale === "ru" ? "Инженерный showcase" : "Engineering showcase"}</span>
            <span className="editorial-index">№ 03</span>
          </span>
          <h1 className="editorial-display gh-mast-title">
            {locale === "ru" ? (
              <>
                {githubProjects.length}+&nbsp;<em>репозиториев.</em>
                <br />
                Один <em>инженерный путь.</em>
              </>
            ) : (
              <>
                {githubProjects.length}+&nbsp;<em>repositories.</em>
                <br />
                One <em>engineering arc.</em>
              </>
            )}
          </h1>
          <p className="editorial-lead gh-mast-lead">
            {locale === "ru"
              ? "Курированный срез открытого кода — Platform Engineering, AI/RAG-системы, real-time платформы и production-инфраструктура. Каждый репозиторий выбран за то, что говорит о подходе к проектированию систем."
              : "A curated cut of open work — Platform Engineering, AI/RAG systems, real-time platforms, and production infrastructure. Each repo earned its place because of what it says about how I approach system design."}
          </p>

          {/* Stats strip */}
          <div className="gh-stats">
            <div>
              <span className="gh-stat-num">{githubProjects.length}</span>
              <span className="gh-stat-label">
                {locale === "ru" ? "Курированных репо" : "Curated repos"}
              </span>
            </div>
            <div>
              <span className="gh-stat-num">{featuredGithubProjects.length}</span>
              <span className="gh-stat-label">
                {locale === "ru" ? "Featured" : "Featured"}
              </span>
            </div>
            <div>
              <span className="gh-stat-num">{ghCategories.length}</span>
              <span className="gh-stat-label">
                {locale === "ru" ? "Категорий" : "Categories"}
              </span>
            </div>
            <div>
              <span className="gh-stat-num">{yearsOnGithub()}+</span>
              <span className="gh-stat-label">
                {locale === "ru" ? "Лет на GitHub" : "Years shipping"}
              </span>
            </div>
          </div>

          {/* Language ticker */}
          <div className="gh-langs">
            <span className="editorial-marginalia">
              {locale === "ru" ? "Стек" : "Languages"}
            </span>
            {langs.map((l) => (
              <span key={l.name} className="gh-lang">
                <span className={`gh-lang-dot gh-lang-dot--${l.name.toLowerCase().replace(/[^a-z]/g, "")}`} />
                <span>{l.name}</span>
                <span className="gh-lang-count">{l.count}</span>
              </span>
            ))}
          </div>

          <div className="gh-rule" />
        </section>

        {/* Featured spotlight */}
        <section className="gh-featured-section">
          <div className="gh-section-head">
            <span className="editorial-eyebrow">
              <span>{locale === "ru" ? "Featured" : "Featured"}</span>
              <span className="editorial-index">
                {String(featuredGithubProjects.length).padStart(2, "0")}
              </span>
            </span>
            <h2 className="editorial-display gh-section-title">
              {locale === "ru" ? "Сильнее всего показывают, как я думаю." : "Show how I think most clearly."}
            </h2>
          </div>

          <div className="gh-featured-grid">
            {featuredGithubProjects.map((p, i) => (
              <FeaturedCard key={p.slug} project={p} locale={locale} index={i} reduced={reduced} />
            ))}
          </div>
        </section>

        {/* Filter + search */}
        <section className="gh-controls">
          <div className="gh-filters" role="tablist" aria-label="Filter by category">
            <FilterChip
              label={locale === "ru" ? "Все" : "All"}
              count={githubProjects.length}
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            {ghCategories.map((c) => {
              const count = githubProjects.filter((p) => p.category === c).length;
              if (count === 0) return null;
              return (
                <FilterChip
                  key={c}
                  label={ghCategoryLabel[c][locale]}
                  count={count}
                  active={filter === c}
                  onClick={() => setFilter(c)}
                />
              );
            })}
          </div>

          <label className="gh-search" aria-label="Search repositories">
            <LuSearch />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={locale === "ru" ? "Поиск репозиториев…" : "Search repositories…"}
              aria-label="Search"
            />
            {query && (
              <button
                type="button"
                className="gh-search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>
        </section>

        {/* Grid */}
        <section className="gh-grid-section">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key={`${filter}-${query}`}
                className="gh-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filtered.map((p, i) => (
                  <RepoCard
                    key={p.slug}
                    project={p}
                    locale={locale}
                    index={i}
                    reduced={reduced}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="gh-empty">
                <p>
                  {locale === "ru"
                    ? "Нет совпадений. Попробуйте другой фильтр."
                    : "No matches. Try a different filter."}
                </p>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* Footer CTA */}
        <section className="gh-foot-cta">
          <a
            href="https://github.com/Mhmdaris15"
            target="_blank"
            rel="noopener noreferrer"
            className="gh-foot-link"
            data-cursor="disable"
          >
            <LuGithub />
            <span>{locale === "ru" ? "Полный архив на GitHub" : "Full archive on GitHub"}</span>
            <LuExternalLink className="gh-foot-arrow" />
          </a>
        </section>
      </div>
    </div>
  );
};

/* ─── Subcomponents ────────────────────────────────────────── */

const FilterChip = ({
  label,
  count,
  active,
  onClick
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    className={`gh-chip ${active ? "is-active" : ""}`}
    onClick={onClick}
    role="tab"
    aria-selected={active}
  >
    <span>{label}</span>
    <span className="gh-chip-count">{count}</span>
  </button>
);

const FeaturedCard = ({
  project,
  locale,
  index,
  reduced
}: {
  project: GhProject;
  locale: "en" | "ru";
  index: number;
  reduced: boolean | null;
}) => (
  <motion.a
    href={`https://github.com/${project.repo}`}
    target="_blank"
    rel="noopener noreferrer"
    className="gh-featured-card"
    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    whileHover={reduced ? {} : { y: -4 }}
    data-cursor="disable"
  >
    <div className="gh-feat-cover" data-category={project.category}>
      <img
        src={`/images/github/${project.slug}.png`}
        alt={pick(project.tagline, locale)}
        loading="lazy"
        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
      />
      <div className="gh-feat-glow" />
      <span className="gh-feat-cat">{ghCategoryLabel[project.category][locale]}</span>
    </div>

    <div className="gh-feat-body">
      <div className="gh-feat-head">
        <h3 className="gh-feat-name">
          <span className="gh-feat-org">Mhmdaris15/</span>
          {project.repoName}
        </h3>
        {project.private && (
          <span className="gh-private" title="Private repository">
            <LuLock />
          </span>
        )}
      </div>

      <p className="gh-feat-tagline">{pick(project.tagline, locale)}</p>
      <p className="gh-feat-summary">{pick(project.summary, locale)}</p>

      <div className="gh-feat-stack">
        {project.stack.slice(0, 5).map((s) => (
          <span key={s} className="gh-stack-chip">{s}</span>
        ))}
      </div>

      <div className="gh-feat-foot">
        <span className="gh-meta">
          <span className={`gh-lang-dot gh-lang-dot--${project.metrics.language.toLowerCase().replace(/[^a-z]/g, "")}`} />
          {project.metrics.language}
        </span>
        {project.metrics.stars > 0 && (
          <span className="gh-meta">
            <LuStar />
            {project.metrics.stars}
          </span>
        )}
        {project.metrics.forks > 0 && (
          <span className="gh-meta">
            <LuGitFork />
            {project.metrics.forks}
          </span>
        )}
        <span className="gh-meta gh-meta-pushed">
          {locale === "ru" ? "обновлён" : "pushed"} {fmtDate(project.metrics.pushedAt, locale)}
        </span>
      </div>
    </div>
  </motion.a>
);

const RepoCard = ({
  project,
  locale,
  index,
  reduced
}: {
  project: GhProject;
  locale: "en" | "ru";
  index: number;
  reduced: boolean | null;
}) => (
  <motion.a
    href={`https://github.com/${project.repo}`}
    target="_blank"
    rel="noopener noreferrer"
    className="gh-card"
    layout
    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3), ease: "easeOut" }}
    data-cursor="disable"
  >
    <div className="gh-card-spotlight" />

    <div className="gh-card-cover" data-category={project.category}>
      <img
        src={`/images/github/${project.slug}.png`}
        alt={pick(project.tagline, locale)}
        loading="lazy"
        decoding="async"
        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
      />
      <div className="gh-card-cover-fade" />
      <span className="gh-card-cat" data-category={project.category}>
        {ghCategoryLabel[project.category][locale]}
      </span>
      {project.private && (
        <span className="gh-private gh-private--on-cover" title="Private">
          <LuLock />
        </span>
      )}
    </div>

    <h3 className="gh-card-name">{project.repoName}</h3>
    <p className="gh-card-tagline">{pick(project.tagline, locale)}</p>

    <div className="gh-card-stack">
      {project.stack.slice(0, 4).map((s) => (
        <span key={s} className="gh-stack-chip gh-stack-chip--small">{s}</span>
      ))}
    </div>

    <div className="gh-card-foot">
      <span className="gh-meta">
        <span className={`gh-lang-dot gh-lang-dot--${project.metrics.language.toLowerCase().replace(/[^a-z]/g, "")}`} />
        {project.metrics.language}
      </span>
      {project.metrics.stars > 0 && (
        <span className="gh-meta">
          <LuStar />
          {project.metrics.stars}
        </span>
      )}
      <span className="gh-meta gh-meta-arrow" aria-hidden>↗</span>
    </div>
  </motion.a>
);

export default GitHubShowcase;
