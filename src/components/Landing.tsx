import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";

const Landing = ({ children }: PropsWithChildren) => {
  const { locale } = useLocale();
  const fullName = t(config.developer.fullName, locale);
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || t(config.developer.name, locale);
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>{t(dict.landing.hello, locale)}</h2>
            <h1>
              {firstName.toUpperCase()} <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>{t(dict.landing.an, locale)}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">
                {t(dict.landing.softwareEngineer, locale)}
              </div>
            </h2>
            <h2>
              <div className="landing-h2-info">
                {t(dict.landing.fullStackDeveloper, locale)}
              </div>
            </h2>
          </div>
          <div className="mobile-photo">
            <img
              src="/images/photo-aris-professional.jpeg"
              alt={fullName}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
