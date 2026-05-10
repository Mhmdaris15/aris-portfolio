import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import SeoHead from "../seo/SeoHead";
import "../styles/editorial.css";
import "./NotFound.css";

const NotFound = () => {
  const { locale, href } = useLocale();
  const { pathname } = useLocation();

  return (
    <>
      <SeoHead
        path="/404"
        title={
          locale === "ru" ? "Страница не найдена — 404" : "Page not found — 404"
        }
        description={
          locale === "ru"
            ? "Эта страница не существует. Вернитесь на главную или загляните в блог."
            : "This page doesn't exist. Head back home or browse the blog."
        }
        noIndex
      />

      <main className="editorial nf-page">
        <div className="grain" />

        <header className="editorial-rail">
          <Link to={href("/")} className="editorial-back">
            {locale === "ru" ? "На главную" : "Index"}
          </Link>
          <span className="editorial-rail-center">
            {locale === "ru" ? "Не найдено" : "Not Found"}
          </span>
          <span className="editorial-rail-right">404</span>
        </header>

        <div className="editorial-container nf-shell">
          <span className="editorial-eyebrow">
            <span>{locale === "ru" ? "Ошибка 404" : "Error 404"}</span>
            <span className="editorial-index">№ —</span>
          </span>

          <h1 className="editorial-display nf-title">
            {locale === "ru" ? (
              <>
                Этой страницы
                <br />
                <em>здесь нет.</em>
              </>
            ) : (
              <>
                This page
                <br />
                <em>doesn't exist.</em>
              </>
            )}
          </h1>

          <p className="editorial-lead nf-lead">
            {locale === "ru"
              ? `URL «${pathname}» не ведёт никуда. Возможно, ссылка устарела или вы перешли по опечатке. Вот несколько мест, где точно что-то есть:`
              : `The URL "${pathname}" goes nowhere. Maybe the link is stale or has a typo. Here's where something definitely lives:`}
          </p>

          <nav className="nf-links" aria-label="Suggested destinations">
            <Link to={href("/")} className="nf-link" data-cursor="disable">
              <span className="nf-link-num">01</span>
              <span className="nf-link-label">
                {locale === "ru" ? "Главная" : "Home"}
              </span>
              <span className="nf-link-arrow">→</span>
            </Link>
            <Link
              to={href("/myworks")}
              className="nf-link"
              data-cursor="disable"
            >
              <span className="nf-link-num">02</span>
              <span className="nf-link-label">
                {locale === "ru" ? "Все работы" : "All works"}
              </span>
              <span className="nf-link-arrow">→</span>
            </Link>
            <Link to={href("/blog")} className="nf-link" data-cursor="disable">
              <span className="nf-link-num">03</span>
              <span className="nf-link-label">
                {locale === "ru" ? "Блог" : "Blog"}
              </span>
              <span className="nf-link-arrow">→</span>
            </Link>
            <Link
              to={href("/resume")}
              className="nf-link"
              data-cursor="disable"
            >
              <span className="nf-link-num">04</span>
              <span className="nf-link-label">
                {locale === "ru" ? "Резюме" : "Resume"}
              </span>
              <span className="nf-link-arrow">→</span>
            </Link>
          </nav>
        </div>
      </main>
    </>
  );
};

export default NotFound;
