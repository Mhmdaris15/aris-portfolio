import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineRocketLaunch,
  HiOutlineSquare3Stack3D,
  HiOutlineCpuChip,
  HiOutlineChartBar,
  HiOutlineBolt,
  HiArrowRight
} from "react-icons/hi2";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import "./styles/Services.css";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, JSX.Element> = {
  rocket: <HiOutlineRocketLaunch />,
  stack: <HiOutlineSquare3Stack3D />,
  ai: <HiOutlineCpuChip />,
  data: <HiOutlineChartBar />,
  bolt: <HiOutlineBolt />
};

const Services = () => {
  const { locale } = useLocale();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(
      ".services-eyebrow, .services-section h2, .services-subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }
    );

    tl.fromTo(
      ".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out"
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const mailto = (service: string) =>
    `mailto:${config.contact.email}?subject=${encodeURIComponent(
      `Project Inquiry — ${service}`
    )}&body=${encodeURIComponent(
      locale === "ru"
        ? `Привет, Арис!\n\nХочу обсудить услугу "${service}".\n\nКраткое описание:\n- \n\nСроки:\n- \n\nБюджет:\n- \n\nСпасибо!`
        : `Hi Aris,\n\nI'd like to discuss a "${service}" engagement.\n\nProject brief:\n- \n\nTimeline:\n- \n\nBudget range:\n- \n\nThanks!`
    )}`;

  return (
    <section className="services-section" id="services">
      <div className="services-bg-orb services-bg-orb-1" />
      <div className="services-bg-orb services-bg-orb-2" />

      <div className="services-inner">
        <div className="services-header">
          <span className="services-eyebrow">{t(dict.services.eyebrow, locale)}</span>
          <h2>
            <span>{t(dict.services.title, locale)}</span>
            {t(dict.services.andPricing, locale)}
          </h2>
          <p className="services-subtitle">
            {t(dict.services.subtitle, locale)}
          </p>
        </div>

        <div className="services-grid">
          {config.services.map((service) => {
            const title = t(service.title, locale);
            const price =
              locale === "ru" ? service.priceFromRub : service.priceFromUsd;
            return (
              <div
                className={`service-card service-card--${service.id}${
                  service.popular ? " service-card--popular" : ""
                }`}
                key={service.id}
                data-cursor="disable"
              >
                {service.popular && (
                  <span className="service-popular-badge">
                    {t(dict.services.mostPopular, locale)}
                  </span>
                )}

                <div className="service-icon">{ICONS[service.icon]}</div>

                <div className="service-headline">
                  <h3>{title}</h3>
                  <span className="service-tagline">
                    {t(service.tagline, locale)}
                  </span>
                </div>

                <p className="service-description">
                  {t(service.description, locale)}
                </p>

                <div className="service-price-row">
                  <div className="service-price">
                    <span className="service-price-from">
                      {t(dict.services.startingAt, locale)}
                    </span>
                    <span className="service-price-amount">{price}</span>
                  </div>
                  <div className="service-timeline">
                    <span className="service-timeline-label">
                      {t(dict.services.timelineLabel, locale)}
                    </span>
                    <span className="service-timeline-value">
                      {t(service.timeline, locale)}
                    </span>
                  </div>
                </div>

                <div className="service-divider" />

                <div className="service-includes">
                  <h5>{t(dict.services.includes, locale)}</h5>
                  <ul>
                    {t(service.includes, locale).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="service-stack">
                  {service.stack.map((tech) => (
                    <span className="service-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={mailto(title)}
                  className="service-cta"
                  data-cursor="disable"
                >
                  <span>{t(dict.services.discussCta, locale)}</span>
                  <HiArrowRight />
                </a>
              </div>
            );
          })}
        </div>

        <div className="services-footer">
          <div className="services-footer-card">
            <div>
              <h3>{t(dict.services.footerTitle, locale)}</h3>
              <p>{t(dict.services.footerDesc, locale)}</p>
            </div>
            <a
              href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
                "Custom Project Inquiry"
              )}`}
              className="services-footer-cta"
              data-cursor="disable"
            >
              {t(dict.services.footerCta, locale)} <HiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
