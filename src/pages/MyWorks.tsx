import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "../config";
import ProjectCover from "../components/ProjectCover";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import SeoHead from "../seo/SeoHead";
import { itemListSchema, breadcrumbSchema } from "../seo/schema";
import { absolute } from "../seo/siteConfig";
import "../styles/editorial.css";
import "./MyWorks.css";

gsap.registerPlugin(ScrollTrigger);

const MyWorks = () => {
  const { locale, href } = useLocale();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  // Scroll choreography
  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".r-grow-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.05,
        scrollTrigger: { trigger: ".myworks-hero", start: "top 80%" }
      });
      gsap.to(".r-rise-line", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".myworks-hero", start: "top 80%" }
      });
      gsap.utils.toArray<HTMLElement>(".myworks-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" }
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const hoveredProject = config.projects.find((p) => p.id === hoveredId);

  const seoTitle =
    locale === "ru"
      ? "Все работы — портфолио проектов"
      : "Works — full project archive";
  const seoDesc =
    locale === "ru"
      ? "Архив проектов: self-hosted облачная платформа, real-time WebSocket системы, RAG-боты, full-stack приложения, data-пайплайны и AI-системы в production."
      : "Archive of shipped projects: self-hosted cloud platform, real-time WebSocket systems, RAG bots, full-stack apps, data pipelines, and production AI systems.";

  return (
    <div ref={root} className="editorial myworks">
      <SeoHead
        path="/myworks"
        title={seoTitle}
        description={seoDesc}
        jsonLd={[
          itemListSchema(
            seoTitle,
            config.projects.slice(0, 30).map((p) => ({
              name: t(p.title, locale),
              url: absolute(`/works/${p.slug}`)
            }))
          ),
          breadcrumbSchema([
            { name: "Home", url: absolute("/") },
            { name: seoTitle, url: absolute("/myworks") }
          ])
        ]}
      />
      <div className="grain" />

      {/* Top rail */}
      <header className="editorial-rail">
        <Link to={href("/")} className="editorial-back">
          {locale === "ru" ? "На главную" : "Index"}
        </Link>
        <span className="editorial-rail-center">
          {locale === "ru" ? "Архив работ" : "Works Archive"}
        </span>
        <span className="editorial-rail-right">
          № {String(config.projects.length).padStart(2, "0")}
        </span>
      </header>

      <div className="editorial-container">
        {/* Hero */}
        <section className="myworks-hero">
          <div className="myworks-hero-grid">
            <div>
              <div className="r-rise-line">
                <span className="editorial-eyebrow">
                  {locale === "ru" ? "Полный архив" : "Complete Archive"}
                  <span className="editorial-index">
                    01 / {String(config.projects.length).padStart(2, "0")}
                  </span>
                </span>
              </div>
              <h1 className="editorial-display myworks-title r-rise-line">
                {locale === "ru" ? (
                  <>
                    Все&nbsp;
                    <em>работы</em>
                  </>
                ) : (
                  <>
                    Selected
                    <br />
                    <em>Works.</em>
                  </>
                )}
              </h1>
              <p className="editorial-lead myworks-lead r-rise-line">
                {locale === "ru"
                  ? "Тридцать проектов на пересечении продуктовой инженерии, AI-систем и data-автоматизации. Прокрутите ниже, чтобы открыть полный кейс."
                  : "Thirty projects at the intersection of product engineering, AI systems, and data automation. Scroll to enter any case study."}
              </p>
            </div>

            <aside className="myworks-aside r-rise-line">
              {config.availability.open && (
                <div className="myworks-status">
                  <span className="myworks-status-dot" />
                  <div>
                    <div className="myworks-status-label">
                      {t(config.availability.label, locale)}
                    </div>
                    <div className="myworks-status-meta">
                      {t(config.availability.responseTime, locale)}
                    </div>
                  </div>
                </div>
              )}
              <div className="myworks-aside-meta">
                <div>
                  <span className="editorial-marginalia">
                    {locale === "ru" ? "Период" : "Span"}
                  </span>
                  <span>2022 — 2026</span>
                </div>
                <div>
                  <span className="editorial-marginalia">
                    {locale === "ru" ? "География" : "Geography"}
                  </span>
                  <span>ID · US · RU</span>
                </div>
              </div>
            </aside>
          </div>

          <div className="myworks-divider r-grow-line" />
        </section>

        {/* Index list with floating preview */}
        <section className="myworks-index">
          <div
            className="myworks-preview"
            data-active={hoveredProject ? "true" : "false"}
            aria-hidden
          >
            {hoveredProject && (
              <ProjectCover
                title={t(hoveredProject.title, locale)}
                category={t(hoveredProject.category, locale)}
                technologies={hoveredProject.technologies}
              />
            )}
          </div>

          <ol className="myworks-list">
            {config.projects.map((project, index) => (
              <li
                key={project.id}
                className="myworks-row"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() =>
                  setHoveredId((id) => (id === project.id ? null : id))
                }
              >
                <Link
                  to={href(`/works/${project.slug}`)}
                  className="myworks-row-link"
                  data-cursor="disable"
                >
                  <span className="myworks-row-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="myworks-row-body">
                    <h3 className="myworks-row-title">
                      {t(project.title, locale)}
                    </h3>
                    <p className="myworks-row-meta">
                      {t(project.category, locale)} · {project.technologies}
                    </p>
                  </div>
                  <span className="myworks-row-year">{project.year}</span>
                  <span className="myworks-row-arrow">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="myworks-cta-section">
          <div className="myworks-cta-grid">
            <div>
              <span className="editorial-eyebrow">
                {locale === "ru" ? "Заказать проект" : "Commission"}
              </span>
              <h2 className="editorial-display myworks-cta-title">
                {locale === "ru" ? (
                  <>
                    Создадим&nbsp;
                    <em>что-то крутое</em>
                  </>
                ) : (
                  <>
                    Let's make
                    <br />
                    <em>something rare.</em>
                  </>
                )}
              </h2>
            </div>
            <div className="myworks-cta-actions">
              <a
                href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
                  "Project Inquiry"
                )}`}
                className="editorial-cta"
                data-cursor="disable"
              >
                {t(dict.myWorks.emailMe, locale)}
                <span className="editorial-cta-arrow">→</span>
              </a>
              <a
                href={config.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-cta-ghost"
                data-cursor="disable"
              >
                WhatsApp
              </a>
              <a
                href={config.contact.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-cta-ghost"
                data-cursor="disable"
              >
                Telegram
              </a>
            </div>
          </div>
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

export default MyWorks;
