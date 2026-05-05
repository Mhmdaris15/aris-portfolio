import { Link } from "react-router-dom";
import { config } from "../config";
import ProjectCover from "../components/ProjectCover";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
        {config.availability.open && (
          <div className="myworks-availability">
            <span className="availability-dot" /> {config.availability.label}
          </div>
        )}
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <Link
            to={`/works/${project.slug}`}
            className="myworks-card"
            key={project.id}
            data-cursor="disable"
          >
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <ProjectCover
                title={project.title}
                category={project.category}
                technologies={project.technologies}
              />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              <span className="myworks-card-link">View case study →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="myworks-cta">
        <h2>Have a project in mind?</h2>
        <p>Let's build something great together.</p>
        <div className="myworks-cta-buttons">
          <a
            href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
              "Project Inquiry"
            )}`}
            className="myworks-cta-btn primary"
            data-cursor="disable"
          >
            Email me
          </a>
          <a
            href={config.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="myworks-cta-btn"
            data-cursor="disable"
          >
            WhatsApp
          </a>
          <a
            href={config.contact.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="myworks-cta-btn"
            data-cursor="disable"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyWorks;
