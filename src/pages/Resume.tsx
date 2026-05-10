import { Link } from "react-router-dom";
import {
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineGlobeAlt,
  HiOutlinePrinter,
  HiOutlineArrowDownTray,
  HiOutlineSparkles
} from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { resume } from "../data/resume";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import LanguageSwitcher from "../components/LanguageSwitcher";
import SeoHead from "../seo/SeoHead";
import { personSchema, breadcrumbSchema } from "../seo/schema";
import { absolute } from "../seo/siteConfig";
import "../styles/editorial.css";
import "./Resume.css";

const Resume = () => {
  const { locale, href } = useLocale();
  const handlePrint = () => window.print();

  const mailto = `mailto:${resume.email}?subject=${encodeURIComponent(
    locale === "ru"
      ? "Здравствуйте, Арис — посмотрел резюме"
      : "Hello Aris — saw your resume"
  )}`;

  let sectionCount = 0;
  const num = () => String(++sectionCount).padStart(2, "0");

  const seoTitle =
    locale === "ru"
      ? "Резюме — AI Engineer · Platform Engineer · Full-Stack"
      : "Resume — AI Engineer · Platform Engineer · Full-Stack";
  const seoDesc =
    locale === "ru"
      ? "Резюме Мухаммада Ариса Септанугрохо: AI Systems Engineer и Platform Engineer с 3+ годами production-опыта в data, AI и cloud-инфраструктуре."
      : "Resume of Muhammad Aris Septanugroho — AI Systems Engineer and Platform Engineer with 3+ years of production experience in data, AI, and cloud infrastructure.";

  return (
    <div className="resume-page">
      <SeoHead
        path="/resume"
        title={seoTitle}
        description={seoDesc}
        ogType="profile"
        jsonLd={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", url: absolute("/") },
            { name: seoTitle, url: absolute("/resume") }
          ])
        ]}
      />
      <div className="grain" />

      <div className="resume-toolbar no-print">
        <Link to={href("/")} className="resume-back">
          {t(dict.resume.backHome, locale).replace("← ", "")}
        </Link>
        <span className="resume-toolbar-title">
          {locale === "ru" ? "Резюме" : "Curriculum Vitæ"}
        </span>
        <div className="resume-toolbar-actions">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={handlePrint}
            className="resume-toolbar-btn"
            data-cursor="disable"
          >
            <HiOutlinePrinter />
            <span>{t(dict.resume.print, locale)}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="resume-toolbar-btn primary"
            data-cursor="disable"
          >
            <HiOutlineArrowDownTray />
            <span>{t(dict.resume.savePdf, locale)}</span>
          </button>
        </div>
      </div>

      <article className="resume-doc">
        <header className="resume-header">
          <span className="resume-header-eyebrow">
            {locale === "ru" ? "Резюме" : "Curriculum Vitæ"} ·{" "}
            {t(resume.lastUpdated, locale)}
          </span>
          <h1>{t(resume.name, locale)}</h1>
          <p className="resume-headline">{t(resume.headline, locale)}</p>

          <div className="resume-header-contact">
            <span className="resume-contact-item">
              <HiOutlineMapPin />
              {t(resume.location, locale)}
              {resume.remoteOpen
                ? ` · ${t(dict.resume.openToRemote, locale)}`
                : ""}
            </span>
            <a
              href={`mailto:${resume.email}`}
              className="resume-contact-item"
              data-cursor="disable"
            >
              <HiOutlineEnvelope />
              {resume.email}
            </a>
            <span className="resume-contact-item">
              <HiOutlinePhone />
              {resume.phone}
            </span>
            <a
              href={`https://wa.me/${resume.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-contact-item"
              data-cursor="disable"
            >
              <FaWhatsapp />
              {resume.whatsapp}
            </a>
            <a
              href={resume.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-contact-item"
              data-cursor="disable"
            >
              <FaGithub />
              {resume.github}
            </a>
            <a
              href={resume.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-contact-item"
              data-cursor="disable"
            >
              <FaLinkedin />
              {resume.linkedin}
            </a>
            <a
              href={resume.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-contact-item"
              data-cursor="disable"
            >
              <HiOutlineGlobeAlt />
              {resume.portfolio}
            </a>
          </div>
        </header>

        <div className="resume-availability">
          <HiOutlineSparkles />
          <span>{t(resume.openTo, locale)}</span>
        </div>

        <Section
          mark="§"
          number={num()}
          title={t(dict.resume.sectionSummary, locale)}
        >
          <p className="resume-summary">{t(resume.summary, locale)}</p>
        </Section>

        <Section
          mark="✦"
          number={num()}
          title={t(dict.resume.sectionImpact, locale)}
        >
          <ul className="resume-impact">
            {t(resume.impact, locale).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section
          mark="¶"
          number={num()}
          title={t(dict.resume.sectionExperience, locale)}
        >
          {resume.experiences.map((exp) => (
            <div className="resume-exp" key={exp.company + t(exp.role, locale)}>
              <div className="resume-exp-period">
                <span>{t(exp.period, locale)}</span>
                <span className="resume-exp-period-loc">
                  {t(exp.location, locale)}
                </span>
              </div>
              <div className="resume-exp-content">
                <h3>{exp.company}</h3>
                <p className="resume-exp-role">{t(exp.role, locale)}</p>
                <ul className="resume-bullets">
                  {t(exp.bullets, locale).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="resume-stack">
                  {exp.stack.map((tech) => (
                    <span className="resume-chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Section>

        <Section
          mark="◆"
          number={num()}
          title={t(dict.resume.sectionProjects, locale)}
        >
          {resume.projects.map((p) => (
            <div className="resume-project" key={t(p.title, locale)}>
              <div className="resume-exp-period">
                <span>
                  {p.note
                    ? t(p.note, locale).toUpperCase()
                    : locale === "ru"
                      ? "Кейс"
                      : "Case"}
                </span>
              </div>
              <div className="resume-exp-content">
                <div className="resume-project-head">
                  <h3>{t(p.title, locale)}</h3>
                </div>
                <p>{t(p.description, locale)}</p>
              </div>
            </div>
          ))}
          <p className="resume-portfolio-link">
            {t(dict.resume.fullCases, locale)}{" "}
            <Link to={href("/myworks")} data-cursor="disable">
              /myworks →
            </Link>
          </p>
        </Section>

        <Section
          mark="¬"
          number={num()}
          title={t(dict.resume.sectionSkills, locale)}
        >
          <div className="resume-skills">
            {resume.skillGroups.map((group) => (
              <div className="resume-skill-group" key={t(group.label, locale)}>
                <h4>{t(group.label, locale)}</h4>
                <div className="resume-skill-items">
                  {group.items.map((item) => (
                    <span className="resume-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          mark="◊"
          number={num()}
          title={t(dict.resume.sectionServices, locale)}
        >
          <div className="resume-services">
            {resume.services.map((s) => {
              const price = locale === "ru" ? s.priceFromRub : s.priceFromUsd;
              return (
                <div className="resume-service" key={t(s.title, locale)}>
                  <span className="resume-service-title">
                    {t(s.title, locale)}
                  </span>
                  <span className="resume-service-meta">
                    {t(dict.resume.from, locale)}{" "}
                    <strong>{price}</strong> · {t(s.timeline, locale)}
                  </span>
                </div>
              );
            })}
          </div>
        </Section>

        <Section
          mark="❦"
          number={num()}
          title={t(dict.resume.sectionEducation, locale)}
        >
          {resume.education.map((edu) => (
            <div className="resume-edu" key={edu.institution}>
              <div className="resume-exp-period">
                {edu.period && <span>{t(edu.period, locale)}</span>}
                {edu.location && (
                  <span className="resume-exp-period-loc">
                    {t(edu.location, locale)}
                  </span>
                )}
              </div>
              <div className="resume-exp-content">
                <h3>{edu.institution}</h3>
                <p>{t(edu.program, locale)}</p>
                {edu.notes && (
                  <ul className="resume-bullets" style={{ marginTop: 14 }}>
                    {t(edu.notes, locale).map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </Section>

        <div className="resume-two-col">
          <Section
            mark="✕"
            number={num()}
            title={t(dict.resume.sectionAwards, locale)}
          >
            <ul className="resume-bullets">
              {t(resume.awards, locale).map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Section>

          <Section
            mark="✕"
            number={num()}
            title={t(dict.resume.sectionCerts, locale)}
          >
            <ul className="resume-bullets">
              {t(resume.certifications, locale).map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className="resume-two-col">
          <Section
            mark="❀"
            number={num()}
            title={t(dict.resume.sectionLanguages, locale)}
          >
            <div className="resume-langs">
              {resume.languages.map((l) => (
                <div className="resume-lang" key={t(l.name, locale)}>
                  <span className="resume-lang-name">{t(l.name, locale)}</span>
                  <span className="resume-lang-level">
                    {t(l.level, locale)}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section
            mark="✺"
            number={num()}
            title={t(dict.resume.sectionBeyond, locale)}
          >
            <ul className="resume-bullets">
              {t(resume.beyond, locale).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Section>
        </div>

        <footer className="resume-footer">
          <span>
            {t(dict.resume.lastUpdated, locale)}: {t(resume.lastUpdated, locale)}
          </span>
          <span className="no-print">
            <a href={mailto} data-cursor="disable">
              {t(dict.resume.getInTouch, locale)}
            </a>
          </span>
        </footer>
      </article>
    </div>
  );
};

const Section = ({
  mark,
  number,
  title,
  children
}: {
  mark: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="resume-section">
    <h2 className="resume-section-title">
      <span className="resume-section-title-text">
        <span className="resume-section-title-text-mark">{mark}</span>
        <span>{title}</span>
      </span>
      <span />
      <span className="resume-section-title-num">№ {number}</span>
    </h2>
    <div className="resume-section-body">{children}</div>
  </section>
);

export default Resume;
