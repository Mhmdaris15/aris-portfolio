import { Link, useParams } from "react-router-dom";
import { config } from "../config";
import ProjectCover from "../components/ProjectCover";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = config.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="project-detail-missing">
          <h1>Project not found</h1>
          <Link to="/myworks" className="back-button" data-cursor="disable">
            ← Back to all works
          </Link>
        </div>
      </div>
    );
  }

  const techList = project.technologies.split(",").map((t) => t.trim());

  const idx = config.projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? config.projects[idx - 1] : null;
  const next = idx < config.projects.length - 1 ? config.projects[idx + 1] : null;

  const mailto = `mailto:${config.contact.email}?subject=${encodeURIComponent(
    `Project Inquiry — similar to ${project.title}`
  )}&body=${encodeURIComponent(
    `Hi Aris,\n\nI saw your work on "${project.title}" and I'd like to discuss something similar.\n\nProject brief:\n- \n\nThanks!`
  )}`;

  return (
    <div className="project-detail-page">
      <div className="project-detail-nav">
        <Link to="/myworks" className="back-button" data-cursor="disable">
          ← All works
        </Link>
        <Link to="/" className="back-home" data-cursor="disable">
          Home
        </Link>
      </div>

      <div className="project-detail-hero">
        <div className="project-detail-meta">
          <span className="meta-pill">{project.category}</span>
          <span className="meta-pill">{project.year}</span>
          <span className="meta-pill">{project.role}</span>
        </div>

        <h1>{project.title}</h1>
        <p className="project-detail-lead">{project.description}</p>

        <div className="project-detail-actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              data-cursor="disable"
            >
              View on GitHub →
            </a>
          )}
          <a
            href={mailto}
            className="btn btn-secondary"
            data-cursor="disable"
          >
            Hire me for similar →
          </a>
        </div>
      </div>

      <div className="project-detail-cover">
        <ProjectCover
          title={project.title}
          category={project.category}
          technologies={project.technologies}
          variant="hero"
        />
      </div>

      <div className="project-detail-grid">
        <section className="project-detail-section">
          <h2>The Problem</h2>
          <p>{project.problem}</p>
        </section>

        <section className="project-detail-section">
          <h2>The Solution</h2>
          <p>{project.solution}</p>
        </section>
      </div>

      <section className="project-detail-features">
        <h2>Key Features</h2>
        <ul>
          {project.keyFeatures.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="project-detail-stack">
        <h2>Tech Stack</h2>
        <div className="stack-tags">
          {techList.map((tech) => (
            <span className="stack-tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="project-detail-cta">
        <h2>Want something like this?</h2>
        <p>
          I'm currently {config.availability.label.toLowerCase()}.{" "}
          {config.availability.responseTime}.
        </p>
        <div className="project-detail-cta-buttons">
          <a href={mailto} className="btn btn-primary" data-cursor="disable">
            Email me
          </a>
          <a
            href={config.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            data-cursor="disable"
          >
            WhatsApp
          </a>
          <a
            href={config.contact.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            data-cursor="disable"
          >
            Telegram
          </a>
        </div>
      </section>

      <nav className="project-detail-pager">
        {prev ? (
          <Link
            to={`/works/${prev.slug}`}
            className="pager-link pager-prev"
            data-cursor="disable"
          >
            <span className="pager-label">← Previous</span>
            <span className="pager-title">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/works/${next.slug}`}
            className="pager-link pager-next"
            data-cursor="disable"
          >
            <span className="pager-label">Next →</span>
            <span className="pager-title">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
};

export default ProjectDetail;
