import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "../config";
import ProjectCover from "../components/ProjectCover";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import "../styles/editorial.css";
import "./ProjectDetail.css";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, href } = useLocale();
  const root = useRef<HTMLDivElement>(null);
  const project = config.projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".r-rise-line", {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".pd-hero", start: "top 95%" }
      });
      gsap.to(".r-grow-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.05,
        scrollTrigger: { trigger: ".pd-hero", start: "top 95%" }
      });

      // Parallax on hero cover
      gsap.to(".pd-cover-inner", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".pd-cover",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.utils
        .toArray<HTMLElement>(".pd-feature")
        .forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.05,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%" }
            }
          );
        });
    }, root);
    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <div className="editorial pd-page">
        <div className="grain" />
        <div className="editorial-container pd-missing">
          <h1 className="editorial-display">
            {t(dict.projectDetail.notFound, locale)}
          </h1>
          <Link
            to={href("/myworks")}
            className="editorial-back"
            data-cursor="disable"
          >
            {t(dict.projectDetail.allWorks, locale)}
          </Link>
        </div>
      </div>
    );
  }

  const title = t(project.title, locale);
  const techList = project.technologies.split(",").map((s) => s.trim());

  const idx = config.projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? config.projects[idx - 1] : null;
  const next =
    idx < config.projects.length - 1 ? config.projects[idx + 1] : null;
  const indexNum = String(idx + 1).padStart(2, "0");
  const totalNum = String(config.projects.length).padStart(2, "0");

  const mailto = `mailto:${config.contact.email}?subject=${encodeURIComponent(
    locale === "ru"
      ? `Запрос — похожий на ${title}`
      : `Project Inquiry — similar to ${title}`
  )}&body=${encodeURIComponent(
    locale === "ru"
      ? `Привет, Арис!\n\nУвидел работу "${title}" и хочу обсудить похожий проект.\n\nКраткое описание:\n- \n\nСпасибо!`
      : `Hi Aris,\n\nI saw your work on "${title}" and I'd like to discuss something similar.\n\nProject brief:\n- \n\nThanks!`
  )}`;

  return (
    <div ref={root} className="editorial pd-page">
      <div className="grain" />

      <header className="editorial-rail">
        <Link to={href("/myworks")} className="editorial-back">
          {t(dict.projectDetail.allWorks, locale)}
        </Link>
        <span className="editorial-rail-center">
          {locale === "ru" ? "Кейс" : "Case Study"}
        </span>
        <span className="editorial-rail-right">
          {indexNum} / {totalNum}
        </span>
      </header>

      <div className="editorial-container">
        {/* Hero */}
        <section className="pd-hero">
          <div className="pd-hero-grid">
            <div className="pd-hero-main">
              <div className="r-rise-line">
                <span className="editorial-eyebrow">
                  {t(project.category, locale)}
                  <span className="editorial-index">№ {indexNum}</span>
                </span>
              </div>
              <h1 className="editorial-display pd-title r-rise-line">
                {title}
              </h1>
              <p className="editorial-lead pd-lead r-rise-line">
                {t(project.description, locale)}
              </p>

              <div className="pd-actions r-rise-line">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-cta"
                    data-cursor="disable"
                  >
                    {t(dict.projectDetail.viewGithub, locale).replace(
                      " →",
                      ""
                    )}
                    <span className="editorial-cta-arrow">→</span>
                  </a>
                )}
                <a
                  href={mailto}
                  className="editorial-cta-ghost"
                  data-cursor="disable"
                >
                  {t(dict.projectDetail.hireSimilar, locale).replace(
                    " →",
                    ""
                  )}
                </a>
              </div>
            </div>

            <aside className="pd-hero-rail r-rise-line">
              <div>
                <span className="editorial-marginalia">
                  {locale === "ru" ? "Год" : "Year"}
                </span>
                <span>{project.year}</span>
              </div>
              <div>
                <span className="editorial-marginalia">
                  {locale === "ru" ? "Роль" : "Role"}
                </span>
                <span>{t(project.role, locale)}</span>
              </div>
              <div>
                <span className="editorial-marginalia">
                  {locale === "ru" ? "Категория" : "Category"}
                </span>
                <span>{t(project.category, locale)}</span>
              </div>
            </aside>
          </div>

          <div className="pd-hero-rule r-grow-line" />
        </section>

        {/* Cover */}
        <section className="pd-cover">
          <div className="pd-cover-inner">
            <ProjectCover
              title={title}
              category={t(project.category, locale)}
              technologies={project.technologies}
              variant="hero"
            />
          </div>
        </section>

        {/* Problem / Solution as editorial chapters */}
        <section className="pd-narrative">
          <article className="pd-chapter">
            <header>
              <span className="pd-chapter-mark">i.</span>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Контекст" : "Context"}
              </span>
            </header>
            <h2 className="editorial-display pd-chapter-title">
              {t(dict.projectDetail.problem, locale)}
            </h2>
            <p className="pd-chapter-body">{t(project.problem, locale)}</p>
          </article>

          <article className="pd-chapter">
            <header>
              <span className="pd-chapter-mark">ii.</span>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Подход" : "Approach"}
              </span>
            </header>
            <h2 className="editorial-display pd-chapter-title">
              {t(dict.projectDetail.solution, locale)}
            </h2>
            <p className="pd-chapter-body">{t(project.solution, locale)}</p>
          </article>
        </section>

        {/* Key features */}
        <section className="pd-features">
          <div className="pd-features-head">
            <span className="editorial-eyebrow">
              {locale === "ru" ? "Что внутри" : "Highlights"}
            </span>
            <h2 className="editorial-display pd-features-title">
              {t(dict.projectDetail.keyFeatures, locale)}
            </h2>
          </div>
          <ol className="pd-features-list">
            {t(project.keyFeatures, locale).map((feature, i) => (
              <li key={feature} className="pd-feature">
                <span className="pd-feature-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pd-feature-body">{feature}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Stack */}
        <section className="pd-stack">
          <div className="editorial-rule">
            <span className="editorial-rule-label">
              {t(dict.projectDetail.techStack, locale)}
            </span>
          </div>
          <div className="pd-stack-list">
            {techList.map((tech) => (
              <span key={tech} className="pd-stack-item">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pd-cta">
          <div>
            <span className="editorial-eyebrow">
              {locale === "ru" ? "Заказать" : "Commission"}
            </span>
            <h2 className="editorial-display pd-cta-title">
              {locale === "ru" ? (
                <>
                  Хотите похожий&nbsp;<em>проект?</em>
                </>
              ) : (
                <>
                  Want something&nbsp;<em>like this?</em>
                </>
              )}
            </h2>
            <p className="editorial-lead pd-cta-lead">
              {t(dict.projectDetail.currentlyAvailable, locale)}
            </p>
          </div>
          <div className="pd-cta-actions">
            <a
              href={mailto}
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
        </section>

        {/* Pager */}
        <nav className="pd-pager">
          {prev ? (
            <Link
              to={href(`/works/${prev.slug}`)}
              className="pd-pager-link pd-pager-prev"
              data-cursor="disable"
            >
              <span className="editorial-marginalia">
                {t(dict.projectDetail.previous, locale)}
              </span>
              <span className="pd-pager-title">{t(prev.title, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={href(`/works/${next.slug}`)}
              className="pd-pager-link pd-pager-next"
              data-cursor="disable"
            >
              <span className="editorial-marginalia">
                {t(dict.projectDetail.next, locale)}
              </span>
              <span className="pd-pager-title">{t(next.title, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <footer className="editorial-foot">
          <span>
            © {new Date().getFullYear()} — {t(config.developer.fullName, locale)}
          </span>
          <span className="editorial-foot-right">
            <Link to={href("/myworks")} data-cursor="disable">
              {t(dict.projectDetail.allWorks, locale).replace("← ", "")}
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default ProjectDetail;
