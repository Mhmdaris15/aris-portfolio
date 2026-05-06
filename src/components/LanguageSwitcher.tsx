import { useLocale, Locale } from "../i18n/LocaleContext";
import "./styles/LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocale();

  const select = (l: Locale) => {
    if (l !== locale) setLocale(l);
  };

  return (
    <div className="lang-switcher" data-cursor="disable">
      <button
        type="button"
        className={`lang-switcher-btn ${locale === "en" ? "active" : ""}`}
        onClick={() => select("en")}
        aria-label="English"
      >
        EN
      </button>
      <span className="lang-switcher-divider" />
      <button
        type="button"
        className={`lang-switcher-btn ${locale === "ru" ? "active" : ""}`}
        onClick={() => select("ru")}
        aria-label="Русский"
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;
