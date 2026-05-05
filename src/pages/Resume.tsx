import { Link } from "react-router-dom";
import {
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineGlobeAlt,
  HiOutlinePrinter,
  HiOutlineArrowDownTray,
  HiOutlineBriefcase,
  HiOutlineCommandLine,
  HiOutlineRocketLaunch,
  HiOutlineAcademicCap,
  HiOutlineTrophy,
  HiOutlineDocumentCheck,
  HiOutlineLanguage,
  HiOutlineSparkles,
  HiOutlineCheckBadge
} from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { resume } from "../data/resume";
import "./Resume.css";

const Resume = () => {
  const handlePrint = () => window.print();

  const mailto = `mailto:${resume.email}?subject=${encodeURIComponent(
    "Hello Aris — saw your resume"
  )}`;

  return (
    <div className="resume-page">
      {/* Toolbar — hidden in print */}
      <div className="resume-toolbar no-print">
        <Link to="/" className="resume-back" data-cursor="disable">
          ← Back to Home
        </Link>
        <div className="resume-toolbar-actions">
          <button
            type="button"
            onClick={handlePrint}
            className="resume-toolbar-btn"
            data-cursor="disable"
          >
            <HiOutlinePrinter />
            <span>Print</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="resume-toolbar-btn primary"
            data-cursor="disable"
            title="Use 'Save as PDF' in the print dialog"
          >
            <HiOutlineArrowDownTray />
            <span>Save as PDF</span>
          </button>
        </div>
      </div>

      <article className="resume-doc">
        {/* Header */}
        <header className="resume-header">
          <div className="resume-header-main">
            <h1>{resume.name}</h1>
            <p className="resume-headline">{resume.headline}</p>
          </div>

          <div className="resume-header-contact">
            <span className="resume-contact-item">
              <HiOutlineMapPin />
              {resume.location}
              {resume.remoteOpen ? " · Open to Remote" : ""}
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
              WhatsApp {resume.whatsapp}
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

        {/* Open-to badge */}
        <div className="resume-availability">
          <HiOutlineSparkles />
          <span>{resume.openTo}</span>
        </div>

        {/* Summary */}
        <Section icon={<HiOutlineCheckBadge />} title="Summary">
          <p className="resume-summary">{resume.summary}</p>
        </Section>

        {/* Selected Impact */}
        <Section icon={<HiOutlineTrophy />} title="Selected Impact">
          <ul className="resume-impact">
            {resume.impact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        {/* Experience */}
        <Section icon={<HiOutlineBriefcase />} title="Experience">
          {resume.experiences.map((exp) => (
            <div className="resume-exp" key={exp.company + exp.role}>
              <div className="resume-exp-head">
                <div>
                  <h3>{exp.company}</h3>
                  <p className="resume-exp-role">{exp.role}</p>
                </div>
                <div className="resume-exp-meta">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>
              </div>
              <ul className="resume-bullets">
                {exp.bullets.map((b) => (
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
          ))}
        </Section>

        {/* Selected Projects */}
        <Section icon={<HiOutlineRocketLaunch />} title="Selected Projects">
          {resume.projects.map((p) => (
            <div className="resume-project" key={p.title}>
              <div className="resume-project-head">
                <h3>{p.title}</h3>
                {p.note && (
                  <span className="resume-project-note">{p.note}</span>
                )}
              </div>
              <p>{p.description}</p>
            </div>
          ))}
          <p className="resume-portfolio-link">
            Full case studies and 25+ additional projects:{" "}
            <Link to="/myworks" data-cursor="disable">
              /myworks
            </Link>
          </p>
        </Section>

        {/* Skills */}
        <Section icon={<HiOutlineCommandLine />} title="Skills">
          <div className="resume-skills">
            {resume.skillGroups.map((group) => (
              <div className="resume-skill-group" key={group.label}>
                <h4>{group.label}</h4>
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

        {/* Freelance services */}
        <Section icon={<HiOutlineSparkles />} title="Freelance Services">
          <div className="resume-services">
            {resume.services.map((s) => (
              <div className="resume-service" key={s.title}>
                <span className="resume-service-title">{s.title}</span>
                <span className="resume-service-meta">
                  from <strong>{s.priceFrom}</strong> · {s.timeline}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section icon={<HiOutlineAcademicCap />} title="Education">
          {resume.education.map((edu) => (
            <div className="resume-edu" key={edu.institution}>
              <div className="resume-exp-head">
                <div>
                  <h3>{edu.institution}</h3>
                  <p className="resume-exp-role">
                    {edu.program}
                    {edu.location ? ` · ${edu.location}` : ""}
                  </p>
                </div>
                {edu.period && (
                  <div className="resume-exp-meta">
                    <span>{edu.period}</span>
                  </div>
                )}
              </div>
              {edu.notes && edu.notes.length > 0 && (
                <ul className="resume-bullets">
                  {edu.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>

        {/* Two-up: Awards + Certifications */}
        <div className="resume-two-col">
          <Section icon={<HiOutlineTrophy />} title="Awards">
            <ul className="resume-bullets">
              {resume.awards.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Section>

          <Section icon={<HiOutlineDocumentCheck />} title="Certifications">
            <ul className="resume-bullets">
              {resume.certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Two-up: Languages + Beyond */}
        <div className="resume-two-col">
          <Section icon={<HiOutlineLanguage />} title="Languages">
            <div className="resume-langs">
              {resume.languages.map((l) => (
                <div className="resume-lang" key={l.name}>
                  <span className="resume-lang-name">{l.name}</span>
                  <span className="resume-lang-level">{l.level}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<HiOutlineSparkles />} title="Beyond the Code">
            <ul className="resume-bullets">
              {resume.beyond.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Footer */}
        <footer className="resume-footer">
          <span>Last updated: {resume.lastUpdated}</span>
          <span className="no-print">
            <a href={mailto} data-cursor="disable">
              Get in touch →
            </a>
          </span>
        </footer>
      </article>
    </div>
  );
};

const Section = ({
  icon,
  title,
  children
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="resume-section">
    <h2 className="resume-section-title">
      <span className="resume-section-icon">{icon}</span>
      {title}
    </h2>
    <div className="resume-section-body">{children}</div>
  </section>
);

export default Resume;
