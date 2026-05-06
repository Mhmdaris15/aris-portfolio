import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";

const WhatIDo = () => {
  const { locale } = useLocale();
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);

  const titleEn = "WHAT I DO";
  const isRu = locale === "ru";

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          {isRu ? (
            <>
              ЧЕМ <span className="hat-h2">Я</span>
              <div>
                &nbsp;<span className="do-h2">ЗАНИМАЮСЬ</span>
              </div>
            </>
          ) : (
            <>
              W<span className="hat-h2">HAT</span>
              <div>
                &nbsp;I<span className="do-h2"> DO</span>
              </div>
            </>
          )}
          {/* Hidden text for accessibility/SEO */}
          <span style={{ position: "absolute", left: "-9999px" }}>
            {isRu ? "Чем я занимаюсь" : titleEn}
          </span>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>{t(config.skills.develop.title, locale)}</h3>
              <h4>{t(config.skills.develop.description, locale)}</h4>
              <p>{t(config.skills.develop.details, locale)}</p>
              <h5>{t(dict.whatIDo.skillset, locale)}</h5>
              <div className="what-content-flex">
                {config.skills.develop.tools.map((tool, index) => (
                  <div key={index} className="what-tags">
                    {tool}
                  </div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>{t(config.skills.design.title, locale)}</h3>
              <h4>{t(config.skills.design.description, locale)}</h4>
              <p>{t(config.skills.design.details, locale)}</p>
              <h5>{t(dict.whatIDo.skillset, locale)}</h5>
              <div className="what-content-flex">
                {config.skills.design.tools.map((tool, index) => (
                  <div key={index} className="what-tags">
                    {tool}
                  </div>
                ))}
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
