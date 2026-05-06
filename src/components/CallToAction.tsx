import { Link } from "react-router-dom";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const { locale, href } = useLocale();

  const subject = encodeURIComponent("Project Inquiry");
  const body = encodeURIComponent(
    locale === "ru"
      ? "Привет, Арис!\n\nХочу обсудить проект.\n\nКраткое описание:\n- \n\nСроки:\n- \n\nБюджет:\n- \n\nСпасибо!"
      : "Hi Aris,\n\nI'd like to discuss a project.\n\nProject brief:\n- \n\nTimeline:\n- \n\nBudget range:\n- \n\nThanks!"
  );
  const mailto = `mailto:${config.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="cta-section">
      <div className="cta-content">
        <h3>{t(dict.cta.idea, locale)}</h3>
        <p>
          {t(config.availability.label, locale)} ·{" "}
          {t(config.availability.responseTime, locale)}
        </p>
      </div>
      <div className="cta-buttons">
        <Link
          to={href("/play")}
          className="cta-btn cta-btn-play"
          data-cursor="disable"
        >
          {t(dict.cta.playWithMe, locale)}
        </Link>

        <a
          href={config.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-btn-whatsapp"
          data-cursor="disable"
        >
          {t(dict.cta.whatsapp, locale)}
        </a>

        <a href={mailto} className="cta-btn cta-btn-hire" data-cursor="disable">
          {t(dict.cta.hireMe, locale)}
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
