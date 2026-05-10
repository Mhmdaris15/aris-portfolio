import { PropsWithChildren, useRef, useState, useEffect } from "react";
import "./styles/Landing.css";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import Logo from "../brand/Logo";

const Landing = ({ children }: PropsWithChildren) => {
  const { locale } = useLocale();
  const fullName = t(config.developer.fullName, locale);
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || t(config.developer.name, locale);
  const lastName = nameParts.slice(1).join(" ") || "";

  // Mousemove parallax tilt — subtle, GPU-only
  const portraitRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = portraitRef.current;
    if (!node) return;
    const onMove = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      setTilt({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <span className="landing-eyebrow">
            <Logo variant="mark" size={14} />
            <span>{locale === "ru" ? "Портфолио · Live" : "Portfolio · Live"}</span>
          </span>
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

        {/* Cinematic portrait — replaces the bare mobile-photo <img>. */}
        <div
          className="portrait"
          ref={portraitRef}
          style={{
            "--tilt-x": tilt.x.toFixed(3),
            "--tilt-y": tilt.y.toFixed(3)
          } as React.CSSProperties}
        >
          <div className="portrait-aura" aria-hidden />
          <div className="portrait-grid" aria-hidden />
          <div className="portrait-frame">
            {/* Decorative corner ticks */}
            <span className="portrait-tick portrait-tick--tl" aria-hidden />
            <span className="portrait-tick portrait-tick--tr" aria-hidden />
            <span className="portrait-tick portrait-tick--bl" aria-hidden />
            <span className="portrait-tick portrait-tick--br" aria-hidden />

            <div className="portrait-image">
              {!imgLoaded && <div className="portrait-skeleton" aria-hidden />}
              <img
                src="/images/photo-aris-professional.jpeg"
                alt={fullName}
                onLoad={() => setImgLoaded(true)}
                draggable={false}
              />
              {/* Top-fade for legibility of the meta strip overlay */}
              <div className="portrait-fade" aria-hidden />
            </div>

            {/* Status / brand strip across the bottom of the frame */}
            <div className="portrait-meta">
              <span className="portrait-meta-row">
                <span className="portrait-status-dot" />
                <span className="portrait-meta-label">
                  {locale === "ru" ? "Открыт к проектам" : "Open to projects"}
                </span>
              </span>
              <span className="portrait-meta-coord">59.93°N · 30.33°E</span>
            </div>
          </div>

          {/* Floating particle glints — purely decorative */}
          <span className="portrait-glint portrait-glint--1" aria-hidden />
          <span className="portrait-glint portrait-glint--2" aria-hidden />
          <span className="portrait-glint portrait-glint--3" aria-hidden />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;
