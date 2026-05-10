import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  events,
  getEventBySlug,
  EventSection,
  EventType
} from "../data/events";
import { config } from "../config";
import { useLocale, pick } from "../i18n/LocaleContext";
import SeoHead from "../seo/SeoHead";
import { eventSchema, breadcrumbSchema } from "../seo/schema";
import { absolute } from "../seo/siteConfig";
import "../styles/editorial.css";
import "./EventDetail.css";

gsap.registerPlugin(ScrollTrigger);

const TYPE_LABEL: Record<EventType, { en: string; ru: string }> = {
  hackathon: { en: "Hackathon", ru: "Хакатон" },
  competition: { en: "Competition", ru: "Соревнование" },
  conference: { en: "Conference", ru: "Конференция" },
  meetup: { en: "Meetup", ru: "Митап" },
  workshop: { en: "Workshop", ru: "Воркшоп" }
};

const renderSection = (section: EventSection, idx: number) => {
  switch (section.type) {
    case "p":
      return (
        <p key={idx} className="ed-para">
          {section.content}
        </p>
      );
    case "h2":
      return (
        <h2 key={idx} className="ed-h2">
          <span className="ed-h2-mark" aria-hidden>§</span>
          {section.content}
        </h2>
      );
    case "list":
      return (
        <ul key={idx} className="ed-list">
          {section.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={idx} className="ed-quote">
          <span className="ed-quote-mark" aria-hidden>“</span>
          {section.content}
        </blockquote>
      );
    case "image":
      return (
        <figure key={idx} className="ed-figure">
          <img src={section.src} alt={section.caption || ""} />
          {section.caption && <figcaption>{section.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
};

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, href } = useLocale();
  const root = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const event = slug ? getEventBySlug(slug) : undefined;

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".r-rise-line", {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".ed-hero", start: "top 95%" }
      });
      gsap.to(".r-grow-line", {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".ed-hero", start: "top 95%" }
      });
      gsap.utils.toArray<HTMLElement>(".ed-gallery-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.04,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" }
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, [slug]);

  // Close lightbox with Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (!event) {
    return (
      <div className="editorial ed-page">
        <div className="grain" />
        <div className="editorial-container ed-missing">
          <h1 className="editorial-display">
            {locale === "ru" ? "Событие не найдено" : "Event not found"}
          </h1>
          <Link
            to={href("/events")}
            className="editorial-back"
            data-cursor="disable"
          >
            {locale === "ru" ? "К списку событий" : "Back to events"}
          </Link>
        </div>
      </div>
    );
  }

  const idx = events.findIndex((e) => e.slug === slug);
  const total = events.length;
  const indexNum = String(idx + 1).padStart(2, "0");
  const totalNum = String(total).padStart(2, "0");

  const prev = idx > 0 ? events[idx - 1] : null;
  const next = idx < total - 1 ? events[idx + 1] : null;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  const dateLabel = event.endDate
    ? `${formatDate(event.date)} → ${formatDate(event.endDate)}`
    : formatDate(event.date);

  const sections =
    locale === "ru" ? event.ru?.sections : event.en?.sections;

  const eventUrl = absolute(`/events/${event.slug}`);
  const eventName = pick(event.name, locale);
  const eventDesc = pick(event.description, locale);

  return (
    <div ref={root} className="editorial ed-page">
      <SeoHead
        path={`/events/${event.slug}`}
        title={`${eventName} — ${pick(event.city, locale)}`}
        description={eventDesc}
        image={event.cover || undefined}
        imageAlt={eventName}
        ogType="article"
        tags={event.tags}
        jsonLd={[
          eventSchema({
            name: eventName,
            description: eventDesc,
            url: eventUrl,
            startDate: event.date,
            endDate: event.endDate,
            locationName: pick(event.venue, locale),
            locationAddress: pick(event.city, locale),
            locale
          }),
          breadcrumbSchema([
            { name: "Home", url: absolute("/") },
            {
              name: locale === "ru" ? "События" : "Events",
              url: absolute("/events")
            },
            { name: eventName, url: eventUrl }
          ])
        ]}
      />
      <div className="grain" />

      <header className="editorial-rail">
        <Link to={href("/events")} className="editorial-back">
          {locale === "ru" ? "Все события" : "All events"}
        </Link>
        <span className="editorial-rail-center">
          {TYPE_LABEL[event.type][locale]}
        </span>
        <span className="editorial-rail-right">
          {indexNum} / {totalNum}
        </span>
      </header>

      <div className="editorial-container">
        {/* Hero */}
        <section className="ed-hero">
          <div className="ed-hero-grid">
            <div className="ed-hero-main">
              <div className="r-rise-line">
                <span className="editorial-eyebrow">
                  {TYPE_LABEL[event.type][locale]}
                  <span className="editorial-index">№ {indexNum}</span>
                </span>
              </div>
              <h1 className="editorial-display ed-title r-rise-line">
                {pick(event.name, locale)}
              </h1>
              <p className="editorial-lead ed-lead r-rise-line">
                {pick(event.description, locale)}
              </p>
              <div className="ed-tags r-rise-line">
                {event.tags.map((t) => (
                  <span key={t} className="editorial-chip">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <aside className="ed-hero-rail r-rise-line">
              <div>
                <span className="editorial-marginalia">
                  {locale === "ru" ? "Дата" : "Date"}
                </span>
                <span>{dateLabel}</span>
              </div>
              <div>
                <span className="editorial-marginalia">
                  {locale === "ru" ? "Место" : "Venue"}
                </span>
                <span>{pick(event.venue, locale)}</span>
              </div>
              <div>
                <span className="editorial-marginalia">
                  {locale === "ru" ? "Город" : "City"}
                </span>
                <span>
                  {pick(event.city, locale)}
                  {event.country && event.country !== "—" ? ` · ${event.country}` : ""}
                </span>
              </div>
              <div>
                <span className="editorial-marginalia">
                  {locale === "ru" ? "Роль" : "Role"}
                </span>
                <span>{pick(event.role, locale)}</span>
              </div>
              {event.result && (
                <div>
                  <span className="editorial-marginalia">
                    {locale === "ru" ? "Результат" : "Result"}
                  </span>
                  <span className="ed-rail-result">
                    {pick(event.result, locale)}
                  </span>
                </div>
              )}
            </aside>
          </div>

          <div className="ed-hero-rule r-grow-line" />
        </section>

        {/* Highlights */}
        <section className="ed-highlights">
          <div className="ed-section-head">
            <span className="editorial-eyebrow">
              {locale === "ru" ? "Что произошло" : "Highlights"}
            </span>
          </div>
          <ol className="ed-highlights-list">
            {pick(event.highlights, locale).map((h, i) => (
              <li key={h} className="ed-highlight">
                <span className="ed-highlight-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ed-highlight-body">{h}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Long-form sections (if any) */}
        {sections && sections.length > 0 && (
          <section className="ed-body">
            <div className="ed-section-head">
              <span className="editorial-eyebrow">
                {locale === "ru" ? "Хроника" : "Field notes"}
              </span>
            </div>
            <div className="ed-body-content">
              {sections.map((s, i) => renderSection(s, i))}
            </div>
          </section>
        )}

        {/* Photo gallery */}
        {event.gallery && event.gallery.length > 0 && (
          <section className="ed-gallery">
            <div className="ed-section-head">
              <span className="editorial-eyebrow">
                {locale === "ru" ? "Фотохроника" : "Documentation"}
              </span>
              <span className="editorial-marginalia">
                {String(event.gallery.length).padStart(2, "0")}{" "}
                {locale === "ru" ? "снимков" : "frames"}
              </span>
            </div>
            <div className="ed-gallery-grid">
              {event.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className="ed-gallery-item"
                  onClick={() => setLightbox(src)}
                  data-cursor="disable"
                  aria-label={`Open photo ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                  <span className="ed-gallery-num">
                    № {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        {event.links.length > 0 && (
          <section className="ed-links">
            <div className="editorial-rule">
              <span className="editorial-rule-label">
                {locale === "ru" ? "Ссылки" : "Links"}
              </span>
            </div>
            <ul className="ed-links-list">
              {event.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="disable"
                  >
                    <span>{pick(link.label, locale)}</span>
                    <span className="ed-link-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pager */}
        <nav className="ed-pager">
          {prev ? (
            <Link
              to={href(`/events/${prev.slug}`)}
              className="ed-pager-link ed-pager-prev"
              data-cursor="disable"
            >
              <span className="editorial-marginalia">
                {locale === "ru" ? "← Предыдущее" : "← Previous"}
              </span>
              <span className="ed-pager-title">{pick(prev.name, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={href(`/events/${next.slug}`)}
              className="ed-pager-link ed-pager-next"
              data-cursor="disable"
            >
              <span className="editorial-marginalia">
                {locale === "ru" ? "Следующее →" : "Next →"}
              </span>
              <span className="ed-pager-title">{pick(next.name, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <footer className="editorial-foot">
          <span>
            © {new Date().getFullYear()} —{" "}
            {pick(config.developer.fullName, locale)}
          </span>
          <span className="editorial-foot-right">
            <Link to={href("/events")} data-cursor="disable">
              {locale === "ru" ? "Все события" : "All events"}
            </Link>
          </span>
        </footer>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="ed-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            className="ed-lightbox-close"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <img src={lightbox} alt="" />
        </div>
      )}
    </div>
  );
};

export default EventDetail;
