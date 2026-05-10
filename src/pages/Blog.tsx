import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllPosts } from "../data/blog";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import BlogCover from "../components/BlogCover";
import SeoHead from "../seo/SeoHead";
import {
  webSiteSchema,
  itemListSchema,
  breadcrumbSchema
} from "../seo/schema";
import { absolute } from "../seo/siteConfig";
import "../styles/editorial.css";
import "./Blog.css";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const { locale, href } = useLocale();
  const root = useRef<HTMLDivElement>(null);

  const sorted = [...getAllPosts()].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".r-rise-line", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".blog-mast", start: "top 90%" }
      });
      gsap.to(".r-grow-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.05,
        scrollTrigger: { trigger: ".blog-mast", start: "top 90%" }
      });
      gsap.utils.toArray<HTMLElement>(".blog-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 90%" }
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const seoTitle =
    locale === "ru"
      ? "Блог — заметки об инженерии, AI и system design"
      : "Blog — notes on engineering, AI, and system design";
  const seoDesc =
    locale === "ru"
      ? "Статьи об инженерии, AI и production-системах: внутренности Postgres, Redis, Kafka, vLLM, RAG-пайплайны, system design в реальной жизни."
      : "Notes on engineering, AI, and production systems: Postgres internals, Redis, Kafka, vLLM, RAG pipelines, real-world system design.";

  return (
    <div ref={root} className="editorial blog">
      <SeoHead
        path="/blog"
        title={seoTitle}
        description={seoDesc}
        jsonLd={[
          webSiteSchema(),
          itemListSchema(
            seoTitle,
            sorted.slice(0, 20).map((p) => ({
              name: p[locale].title,
              url: absolute(`/blog/${p.slug}`)
            }))
          ),
          breadcrumbSchema([
            { name: "Home", url: absolute("/") },
            { name: "Blog", url: absolute("/blog") }
          ])
        ]}
      />
      <div className="grain" />

      <header className="editorial-rail">
        <Link to={href("/")} className="editorial-back">
          {locale === "ru" ? "На главную" : "Index"}
        </Link>
        <span className="editorial-rail-center">
          {locale === "ru" ? "Журнал" : "Journal"}
        </span>
        <span className="editorial-rail-right">
          {sorted.length} {locale === "ru" ? "записей" : "entries"}
        </span>
      </header>

      <div className="editorial-container">
        {/* Masthead */}
        <section className="blog-mast">
          <div className="r-rise-line">
            <span className="editorial-eyebrow">
              {locale === "ru" ? "Журнал" : "Journal"}
              <span className="editorial-index">
                Vol. {new Date().getFullYear()}
              </span>
            </span>
          </div>
          <h1 className="editorial-display blog-mast-title r-rise-line">
            {locale === "ru" ? (
              <>
                Заметки об инженерии,&nbsp;<em>AI</em>,
                <br />и о том, что работает.
              </>
            ) : (
              <>
                Notes on engineering,&nbsp;<em>AI</em>,
                <br />and what's actually <em>shipping.</em>
              </>
            )}
          </h1>
          <p className="editorial-lead blog-mast-lead r-rise-line">
            {t(dict.blog.subtitle, locale)}
          </p>
          <div className="blog-mast-rule r-grow-line" />
        </section>

        {/* Featured spread */}
        {featured && (
          <Link
            to={href(`/blog/${featured.slug}`)}
            className="blog-featured-spread"
            data-cursor="disable"
          >
            <div className="blog-featured-cover">
              <BlogCover
                slug={featured.slug}
                alt={featured[locale].title}
                loading="eager"
              />
            </div>
            <div className="blog-featured-side">
              <div className="blog-featured-meta">
                <span className="editorial-marginalia">
                  {locale === "ru" ? "Главная статья" : "Featured"}
                </span>
                <span className="blog-featured-date">
                  {formatDate(featured.date)}
                </span>
                <span className="blog-featured-time">
                  {featured.readMinutes} {t(dict.blog.minRead, locale)}
                </span>
              </div>
              <div className="blog-featured-tags">
                {featured.tags.map((tag) => (
                  <span key={tag} className="editorial-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="blog-featured-main">
              <span className="blog-featured-num">
                № 01
              </span>
              <h2 className="editorial-display blog-featured-title">
                {featured[locale].title}
              </h2>
              <p className="editorial-lead blog-featured-excerpt">
                {featured[locale].excerpt}
              </p>
              <span className="blog-featured-cta">
                {t(dict.blog.readArticle, locale)}
                <span className="blog-featured-arrow">→</span>
              </span>
            </div>
          </Link>
        )}

        {/* Index of remaining */}
        {rest.length > 0 && (
          <section className="blog-index">
            <div className="editorial-rule">
              <span className="editorial-rule-label">
                {locale === "ru" ? "Архив" : "Archive"}
              </span>
            </div>

            <ol className="blog-list">
              {rest.map((post, i) => (
                <li key={post.slug} className="blog-row">
                  <Link
                    to={href(`/blog/${post.slug}`)}
                    className="blog-row-link"
                    data-cursor="disable"
                  >
                    <span className="blog-row-num">
                      № {String(i + 2).padStart(2, "0")}
                    </span>
                    <div className="blog-row-thumb">
                      <BlogCover
                        slug={post.slug}
                        alt={post[locale].title}
                      />
                    </div>
                    <div className="blog-row-body">
                      <div className="blog-row-meta">
                        <span>{formatDate(post.date)}</span>
                        <span className="blog-row-dot">·</span>
                        <span>
                          {post.readMinutes} {t(dict.blog.min, locale)}
                        </span>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="blog-row-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="blog-row-title">{post[locale].title}</h3>
                      <p className="blog-row-excerpt">{post[locale].excerpt}</p>
                    </div>
                    <span className="blog-row-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Closing CTA */}
        <section className="blog-cta">
          <div>
            <span className="editorial-eyebrow">
              {locale === "ru" ? "Сотрудничество" : "Collaboration"}
            </span>
            <h2 className="editorial-display blog-cta-title">
              {locale === "ru" ? (
                <>
                  Хотите работать&nbsp;<em>вместе?</em>
                </>
              ) : (
                <>
                  Want to work&nbsp;<em>together?</em>
                </>
              )}
            </h2>
            <p className="editorial-lead blog-cta-lead">
              {t(config.availability.label, locale)} ·{" "}
              {t(config.availability.responseTime, locale)}
            </p>
          </div>
          <a
            href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
              "Project Inquiry"
            )}`}
            className="editorial-cta"
            data-cursor="disable"
          >
            {t(dict.blog.getInTouch, locale)}
            <span className="editorial-cta-arrow">→</span>
          </a>
        </section>

        <footer className="editorial-foot">
          <span>
            © {new Date().getFullYear()} — {t(config.developer.fullName, locale)}
          </span>
          <span className="editorial-foot-right">
            <Link to={href("/")} data-cursor="disable">
              {locale === "ru" ? "Вернуться домой" : "Return Home"}
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Blog;
