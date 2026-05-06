import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { locale } = useLocale();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(
      ".contact-section h3",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(
      ".contact-box",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const fullName = t(config.developer.fullName, locale);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{fullName}</h3>

        {config.availability.open && (
          <div className="contact-availability">
            <span className="availability-dot" />
            {t(config.availability.label, locale)} ·{" "}
            {t(config.availability.responseTime, locale)}
          </div>
        )}

        <div className="contact-flex">
          <div className="contact-box">
            <h4>{t(dict.contact.email, locale)}</h4>
            <p>
              <a
                href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
                  "Project Inquiry"
                )}`}
                data-cursor="disable"
              >
                {config.contact.email}
              </a>
            </p>
            <h4>{t(dict.contact.whatsapp, locale)}</h4>
            <p>
              <a
                href={config.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                {config.contact.whatsapp}
              </a>
            </p>
            <h4>{t(dict.contact.telegram, locale)}</h4>
            <p>
              <a
                href={config.contact.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                {config.contact.telegram}
              </a>
            </p>
            <h4>{t(dict.contact.location, locale)}</h4>
            <p>
              <span>{t(config.social.location, locale)}</span>
            </p>
          </div>

          <div className="contact-box">
            <h4>{t(dict.contact.social, locale)}</h4>
            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={config.contact.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Kaggle <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box">
            <h2>
              {t(dict.contact.letsBuild, locale)} <br />
              <span>{t(dict.contact.somethingGreat, locale)}</span>
            </h2>
            <a
              href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
                "Project Inquiry"
              )}`}
              className="contact-hire-btn"
              data-cursor="disable"
            >
              {t(dict.contact.startProject, locale)}
            </a>
            <h5>
              <MdCopyright /> {new Date().getFullYear()} {fullName}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
