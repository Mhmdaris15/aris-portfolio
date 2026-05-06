import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getPostBySlug,
  getRelatedPosts,
  BlogSection
} from "../data/blog";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import { renderInline } from "../utils/inlineMarkdown";
import BlogCover from "../components/BlogCover";
import "../styles/editorial.css";
import "./BlogPost.css";

gsap.registerPlugin(ScrollTrigger);

const slugifyHeading = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\sа-я]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

const renderSection = (section: BlogSection, idx: number) => {
  switch (section.type) {
    case "p":
      return (
        <p key={idx} className="post-para">
          {renderInline(section.content)}
        </p>
      );
    case "h2":
      return (
        <h2 key={idx} id={slugifyHeading(section.content)} className="post-h2">
          <span className="post-h2-mark" aria-hidden>§</span>
          {renderInline(section.content)}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="post-h3">
          {renderInline(section.content)}
        </h3>
      );
    case "list":
      return (
        <ul key={idx} className="post-list">
          {section.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "ordered":
      return (
        <ol key={idx} className="post-list post-list-ordered">
          {section.items.map((item, i) => (
            <li key={i}>
              <span className="post-list-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre key={idx} className="post-code">
          {section.lang && (
            <span className="post-code-lang">{section.lang}</span>
          )}
          <code data-lang={section.lang}>{section.content}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote key={idx} className="post-quote">
          <span className="post-quote-mark" aria-hidden>“</span>
          {renderInline(section.content)}
        </blockquote>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, href } = useLocale();
  const root = useRef<HTMLDivElement>(null);
  const post = slug ? getPostBySlug(slug) : undefined;
  const [progress, setProgress] = useState(0);

  // Reading progress
  useEffect(() => {
    const handle = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, window.scrollY / total));
      setProgress(p);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, [slug]);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".r-rise-line", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".post-hero", start: "top 95%" }
      });
      gsap.to(".r-grow-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".post-hero", start: "top 95%" }
      });
    }, root);
    return () => ctx.revert();
  }, [slug]);

  const headings = useMemo(() => {
    if (!post) return [];
    return post[locale].sections
      .filter((s): s is BlogSection & { type: "h2" } => s.type === "h2")
      .map((s) => ({ id: slugifyHeading(s.content), label: s.content }));
  }, [post, locale]);

  if (!post) {
    return (
      <div className="editorial post-page">
        <div className="grain" />
        <div className="editorial-container post-missing">
          <h1 className="editorial-display">{t(dict.blog.notFound, locale)}</h1>
          <Link
            to={href("/blog")}
            className="editorial-back"
            data-cursor="disable"
          >
            {t(dict.blog.backToBlog, locale)}
          </Link>
        </div>
      </div>
    );
  }

  const content = post[locale];
  const related = getRelatedPosts(post.slug, 3);
  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === "ru" ? "ru-RU" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article ref={root} className="editorial post-page">
      <div className="grain" />

      {/* Reading progress strip */}
      <div className="post-progress" aria-hidden>
        <div
          className="post-progress-bar"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header className="editorial-rail">
        <Link to={href("/blog")} className="editorial-back">
          {t(dict.blog.allArticles, locale)}
        </Link>
        <span className="editorial-rail-center">
          {locale === "ru" ? "Журнал" : "Journal"}
        </span>
        <span className="editorial-rail-right">
          {formattedDate}
        </span>
      </header>

      <div className="editorial-container post-shell">
        {/* Hero */}
        <section className="post-hero">
          <div className="r-rise-line">
            <span className="editorial-eyebrow">
              {post.tags[0] || (locale === "ru" ? "Статья" : "Essay")}
              <span className="editorial-index">
                {post.readMinutes} {t(dict.blog.minRead, locale)}
              </span>
            </span>
          </div>
          <h1 className="editorial-display post-title r-rise-line">
            {content.title}
          </h1>
          <p className="editorial-lead post-lead r-rise-line">
            {content.excerpt}
          </p>
          <div className="post-hero-rule r-grow-line" />

          {/* Optional generated cover image */}
          <div className="post-hero-cover r-rise-line">
            <BlogCover slug={post.slug} alt={content.title} loading="eager" />
          </div>

          <div className="post-hero-meta r-rise-line">
            <div>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Автор" : "Author"}
              </span>
              <span>{t(config.developer.fullName, locale)}</span>
            </div>
            <div>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Дата" : "Date"}
              </span>
              <span>{formattedDate}</span>
            </div>
            <div>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Темы" : "Topics"}
              </span>
              <span className="post-hero-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="editorial-chip">
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </section>

        {/* Body + side rail */}
        <div className="post-body-grid">
          <aside className="post-rail">
            {headings.length > 0 && (
              <nav className="post-toc" aria-label="Section index">
                <span className="editorial-marginalia post-toc-label">
                  {locale === "ru" ? "Содержание" : "Contents"}
                </span>
                <ol>
                  {headings.map((h, i) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} data-cursor="disable">
                        <span className="post-toc-num">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{h.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>

          <div className="post-body">
            {content.sections.map((section, idx) =>
              renderSection(section, idx)
            )}
          </div>
        </div>

        {/* Author card */}
        <section className="post-author-card">
          <div className="post-author-info">
            <span className="editorial-eyebrow">
              {locale === "ru" ? "Автор" : "Written by"}
            </span>
            <h3 className="editorial-display post-author-name">
              {t(config.developer.fullName, locale)}
            </h3>
            <p className="editorial-lead post-author-title">
              {t(config.developer.title, locale)}
            </p>
            <p className="post-author-bio">
              {t(config.availability.label, locale)} ·{" "}
              {t(config.availability.responseTime, locale)}
            </p>
          </div>
          <div className="post-author-actions">
            <a
              href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
                "Project Inquiry"
              )}`}
              className="editorial-cta"
              data-cursor="disable"
            >
              {t(dict.cta.hireMe, locale).replace(" →", "")}
              <span className="editorial-cta-arrow">→</span>
            </a>
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-cta-ghost"
              data-cursor="disable"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="post-related">
            <div className="editorial-rule">
              <span className="editorial-rule-label">
                {t(dict.blog.relatedReading, locale)}
              </span>
            </div>
            <ol className="post-related-list">
              {related.map((r, i) => (
                <li key={r.slug}>
                  <Link
                    to={href(`/blog/${r.slug}`)}
                    className="post-related-link"
                    data-cursor="disable"
                  >
                    <span className="post-related-num">
                      № {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="post-related-title">
                        {r[locale].title}
                      </h3>
                      <p className="post-related-excerpt">
                        {r[locale].excerpt}
                      </p>
                    </div>
                    <span className="post-related-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}

        <footer className="editorial-foot">
          <span>
            © {new Date().getFullYear()} — {t(config.developer.fullName, locale)}
          </span>
          <span className="editorial-foot-right">
            <Link to={href("/blog")} data-cursor="disable">
              {t(dict.blog.backToBlog, locale)}
            </Link>
          </span>
        </footer>
      </div>
    </article>
  );
};

export default BlogPost;
