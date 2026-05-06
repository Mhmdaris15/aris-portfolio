import "./styles/Career.css";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { t } from "../i18n/dictionary";

const getDisplayYear = (period: string) => {
  if (period.includes("Present") || period.includes("наст")) return "NOW";
  if (period.includes(" - ")) return period.split(" - ")[0];
  if (period.includes(" — ")) return period.split(" — ")[0];
  return period;
};

const Career = () => {
  const { locale } = useLocale();
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          {locale === "ru" ? "Карьера" : "My career"} <span>&</span>
          <br /> {locale === "ru" ? "опыт" : "experience"}
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{t(exp.position, locale)}</h4>
                  <h5>{exp.company}</h5>
                </div>
                <h3>{getDisplayYear(t(exp.period, locale))}</h3>
              </div>
              <p>{t(exp.description, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
