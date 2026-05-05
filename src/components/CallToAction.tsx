import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const mailto = `mailto:${config.contact.email}?subject=${encodeURIComponent(
    "Project Inquiry"
  )}&body=${encodeURIComponent(
    "Hi Aris,\n\nI'd like to discuss a project.\n\nProject brief:\n- \n\nTimeline:\n- \n\nBudget range:\n- \n\nThanks!"
  )}`;

  return (
    <div className="cta-section">
      <div className="cta-content">
        <h3>Have an idea? Let's bring it to life.</h3>
        <p>
          {config.availability.label} · {config.availability.responseTime}
        </p>
      </div>
      <div className="cta-buttons">
        <Link to="/play" className="cta-btn cta-btn-play" data-cursor="disable">
          Play With Me →
        </Link>

        <a
          href={config.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-btn-whatsapp"
          data-cursor="disable"
        >
          WhatsApp
        </a>

        <a href={mailto} className="cta-btn cta-btn-hire" data-cursor="disable">
          Hire Me →
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
