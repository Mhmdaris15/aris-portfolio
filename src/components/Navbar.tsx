import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import { config } from "../config";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";
import LanguageSwitcher from "./LanguageSwitcher";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const { locale, href } = useLocale();

  useEffect(() => {
    lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false
    });

    lenis.stop();

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          if (section && lenis) {
            e.preventDefault();
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, { offset: 0, duration: 1.5 });
            }
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      lenis?.resize();
    });

    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href={href("/")} className="navbar-title" data-cursor="disable">
          {t(config.developer.name, locale)}
        </a>
        {config.availability.open && (
          <span className="navbar-availability" data-cursor="disable">
            <span className="navbar-availability-dot" />
            {t(dict.nav.availableForHire, locale)}
          </span>
        )}
        <a
          href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
            "Project Inquiry"
          )}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.contact.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text={t(dict.nav.about, locale)} />
            </a>
          </li>
          <li>
            <a data-href="#services" href="#services">
              <HoverLinks text={t(dict.nav.services, locale)} />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text={t(dict.nav.work, locale)} />
            </a>
          </li>
          <li>
            <a href={href("/blog")}>
              <HoverLinks text={t(dict.nav.blog, locale)} />
            </a>
          </li>
          <li>
            <a href={href("/events")}>
              <HoverLinks text={t(dict.nav.events, locale)} />
            </a>
          </li>
          <li>
            <a href={href("/resume")}>
              <HoverLinks text={t(dict.nav.resume, locale)} />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text={t(dict.nav.contact, locale)} />
            </a>
          </li>
          <li className="navbar-lang-li">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
