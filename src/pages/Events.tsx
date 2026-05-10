import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { events, eventsByYear, EventType } from "../data/events";
import { config } from "../config";
import { useLocale, pick } from "../i18n/LocaleContext";
import SeoHead from "../seo/SeoHead";
import { itemListSchema, breadcrumbSchema } from "../seo/schema";
import { absolute } from "../seo/siteConfig";
import "../styles/editorial.css";
import "./Events.css";

gsap.registerPlugin(ScrollTrigger);

const TYPE_LABEL: Record<EventType, { en: string; ru: string }> = {
  hackathon: { en: "Hackathon", ru: "Хакатон" },
  competition: { en: "Competition", ru: "Соревнование" },
  conference: { en: "Conference", ru: "Конференция" },
  meetup: { en: "Meetup", ru: "Митап" },
  workshop: { en: "Workshop", ru: "Воркшоп" }
};

const Events = () => {
  const { locale, href } = useLocale();
  const root = useRef<HTMLDivElement>(null);

  const grouped = eventsByYear();
  const total = events.length;
  const wins = events.filter(
    (e) => e.result?.en?.includes("1st") || e.result?.en?.includes("Winner")
  ).length;
  const hackathons = events.filter((e) => e.type === "hackathon").length;
  const competitions = events.filter((e) => e.type === "competition").length;

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".r-rise-line", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".ev-mast", start: "top 90%" }
      });
      gsap.to(".r-grow-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".ev-mast", start: "top 90%" }
      });
      gsap.utils.toArray<HTMLElement>(".ev-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 92%" }
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
      month: "short",
      day: "numeric"
    });

  const seoTitle =
    locale === "ru"
      ? "События, хакатоны и конференции"
      : "Events, hackathons, and conferences";
  const seoDesc =
    locale === "ru"
      ? "Хакатоны, соревнования и тех-конференции, на которых я строил, проигрывал и учился. Включая 1-е место LKS Data Science 2023 и Kaggle AIMO."
      : "Hackathons, competitions, and tech conferences I've built at, lost at, and learned from. Including 1st place LKS Data Science 2023 and Kaggle AIMO.";

  return (
    <div ref={root} className="editorial events-page">
      <SeoHead
        path="/events"
        title={seoTitle}
        description={seoDesc}
        jsonLd={[
          itemListSchema(
            seoTitle,
            events.slice(0, 20).map((e) => ({
              name: pick(e.name, locale),
              url: absolute(`/events/${e.slug}`)
            }))
          ),
          breadcrumbSchema([
            { name: "Home", url: absolute("/") },
            { name: seoTitle, url: absolute("/events") }
          ])
        ]}
      />
      <div className="grain" />

      <header className="editorial-rail">
        <Link to={href("/")} className="editorial-back">
          {locale === "ru" ? "На главную" : "Index"}
        </Link>
        <span className="editorial-rail-center">
          {locale === "ru" ? "Хроника событий" : "Field Notes"}
        </span>
        <span className="editorial-rail-right">
          {total} {locale === "ru" ? "событий" : "entries"}
        </span>
      </header>

      <div className="editorial-container">
        {/* Masthead */}
        <section className="ev-mast">
          <div className="r-rise-line">
            <span className="editorial-eyebrow">
              {locale === "ru" ? "Хакатоны · Конференции · Митапы" : "Hackathons · Conferences · Meetups"}
              <span className="editorial-index">
                {String(total).padStart(2, "0")} / ∞
              </span>
            </span>
          </div>
          <h1 className="editorial-display ev-mast-title r-rise-line">
            {locale === "ru" ? (
              <>
                Из&nbsp;<em>зала</em>,
                <br />в код.
              </>
            ) : (
              <>
                From the&nbsp;<em>floor,</em>
                <br />into the codebase.
              </>
            )}
          </h1>
          <p className="editorial-lead ev-mast-lead r-rise-line">
            {locale === "ru"
              ? "Архив хакатонов, соревнований и тех-конференций, на которых я строил, проигрывал и учился. Записываю каждое — потому что лучшие системные инсайты приходят, когда ты вне своей зоны комфорта."
              : "An archive of hackathons, competitions, and tech conferences where I built, lost, and learned. I document each one — because the sharpest systems-thinking lessons land when you're outside your comfort zone."}
          </p>

          <div className="ev-stats r-rise-line">
            <div>
              <span className="ev-stat-num">{String(total).padStart(2, "0")}</span>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Всего" : "Total events"}
              </span>
            </div>
            <div>
              <span className="ev-stat-num">{String(hackathons).padStart(2, "0")}</span>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Хакатонов" : "Hackathons"}
              </span>
            </div>
            <div>
              <span className="ev-stat-num">{String(competitions).padStart(2, "0")}</span>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Соревнований" : "Competitions"}
              </span>
            </div>
            <div>
              <span className="ev-stat-num accent">
                {String(wins).padStart(2, "0")}
              </span>
              <span className="editorial-marginalia">
                {locale === "ru" ? "Побед" : "Wins"}
              </span>
            </div>
          </div>

          <div className="ev-mast-rule r-grow-line" />
        </section>

        {/* Timeline grouped by year */}
        <section className="ev-timeline">
          {grouped.map(({ year, items }) => (
            <div key={year} className="ev-year-group">
              <div className="ev-year-head">
                <span className="ev-year-label">
                  {locale === "ru" ? "Год" : "Year"}
                </span>
                <h2 className="ev-year">{year}</h2>
                <span className="ev-year-count">
                  {String(items.length).padStart(2, "0")}{" "}
                  {locale === "ru" ? "событий" : "entries"}
                </span>
              </div>

              <ol className="ev-list">
                {items.map((event, i) => (
                  <li key={event.slug} className="ev-row">
                    <Link
                      to={href(`/events/${event.slug}`)}
                      className="ev-row-link"
                      data-cursor="disable"
                    >
                      <span className="ev-row-num">
                        № {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="ev-row-body">
                        <div className="ev-row-meta">
                          <span className="ev-type-badge">
                            {TYPE_LABEL[event.type][locale]}
                          </span>
                          <span>{formatDate(event.date)}</span>
                          <span className="ev-row-dot">·</span>
                          <span>{pick(event.city, locale)}</span>
                        </div>
                        <h3 className="ev-row-title">
                          {pick(event.name, locale)}
                        </h3>
                        <p className="ev-row-desc">
                          {pick(event.description, locale)}
                        </p>
                        <div className="ev-row-footer">
                          <span className="ev-row-role">
                            {pick(event.role, locale)}
                          </span>
                          {event.result && (
                            <span className="ev-row-result">
                              {pick(event.result, locale)}
                            </span>
                          )}
                          {event.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="editorial-chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="ev-row-arrow">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="ev-cta">
          <div>
            <span className="editorial-eyebrow">
              {locale === "ru" ? "Совместное участие" : "Co-attend"}
            </span>
            <h2 className="editorial-display ev-cta-title">
              {locale === "ru" ? (
                <>
                  Видимся&nbsp;<em>на следующем?</em>
                </>
              ) : (
                <>
                  See you at the&nbsp;<em>next one?</em>
                </>
              )}
            </h2>
            <p className="editorial-lead ev-cta-lead">
              {locale === "ru"
                ? "Если организуете хакатон, конференцию или митап — напишите. Я почти всегда соглашаюсь."
                : "If you're running a hackathon, conference, or meetup — drop a line. I almost always say yes."}
            </p>
          </div>
          <a
            href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
              "Event invitation"
            )}`}
            className="editorial-cta"
            data-cursor="disable"
          >
            {locale === "ru" ? "Связаться" : "Get in touch"}
            <span className="editorial-cta-arrow">→</span>
          </a>
        </section>

        <footer className="editorial-foot">
          <span>
            © {new Date().getFullYear()} — {pick(config.developer.fullName, locale)}
          </span>
          <span className="editorial-foot-right">
            <Link to={href("/")} data-cursor="disable">
              {locale === "ru" ? "Вернуться домой" : "Return Home"}
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Events;
