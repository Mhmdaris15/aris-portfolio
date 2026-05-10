import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { t } from "../i18n/dictionary";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Eyebrow + tagline + tail rise in sequence
      gsap.from(".about-rise > *", {
        opacity: 0,
        y: 26,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-section", start: "top 78%" }
      });

      // The grow-line rules sweep open
      gsap.fromTo(
        ".about-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          stagger: 0.15,
          scrollTrigger: { trigger: ".about-section", start: "top 78%" }
        }
      );

      // Each "currently studying" row slides in
      gsap.from(".about-reading-row", {
        opacity: 0,
        x: -16,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-reading", start: "top 88%" }
      });

      // Foot fact-grid items rise together
      gsap.from(".about-fact", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-facts", start: "top 92%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const a = config.about;

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="about-me">
        <div className="about-rise">
          <span className="about-eyebrow">
            <span>{t(a.title, locale)}</span>
            <span className="about-eyebrow-num">№ 01</span>
          </span>

          <h2 className="about-tagline">{t(a.short, locale)}</h2>

          <p className="about-tail">{t(a.longTail, locale)}</p>
        </div>

        <div className="about-rule" />

        <div className="about-reading">
          <span className="about-section-label">
            {locale === "ru" ? "Сейчас изучаю" : "Currently studying"}
          </span>
          <ul className="about-reading-list">
            {a.reading.map((item, i) => (
              <li className="about-reading-row" key={item.name}>
                <span className="about-reading-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="about-reading-name">{item.name}</span>
                <span className="about-reading-dots" aria-hidden />
                <span className="about-reading-note">
                  {t(item.note, locale)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="about-rule" />

        <div className="about-facts">
          <Fact
            label={t(a.facts.openTo.label, locale)}
            value={t(a.facts.openTo.value, locale)}
          />
          <Fact
            label={t(a.facts.currently.label, locale)}
            value={t(a.facts.currently.value, locale)}
          />
          <Fact
            label={t(a.facts.location.label, locale)}
            value={t(a.facts.location.value, locale)}
          />
        </div>
      </div>
    </section>
  );
};

const Fact = ({ label, value }: { label: string; value: string }) => (
  <div className="about-fact">
    <span className="about-fact-label">{label}</span>
    <span className="about-fact-value">{value}</span>
  </div>
);

export default About;
