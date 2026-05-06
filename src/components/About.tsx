import "./styles/About.css";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { t } from "../i18n/dictionary";

const About = () => {
  const { locale } = useLocale();
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{t(config.about.title, locale)}</h3>
        <p className="para">{t(config.about.description, locale)}</p>
      </div>
    </div>
  );
};

export default About;
