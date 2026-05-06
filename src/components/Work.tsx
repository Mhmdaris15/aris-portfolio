import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import ProjectCover from "./ProjectCover";
import { useLocale } from "../i18n/LocaleContext";
import { dict, t } from "../i18n/dictionary";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const { locale, href } = useLocale();

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true
      }
    });

    timeline.to(".work-flex", { x: -translateX, ease: "none" });

    ScrollTrigger.refresh();

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          {locale === "ru" ? (
            <>
              Мои <span>работы</span>
            </>
          ) : (
            <>
              My <span>Work</span>
            </>
          )}
        </h2>
        <div className="work-flex">
          {config.projects.slice(0, 5).map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{t(project.title, locale)}</h4>
                    <p>{t(project.category, locale)}</p>
                  </div>
                </div>
                <h4>{t(dict.work.toolsAndFeatures, locale)}</h4>
                <p>{project.technologies}</p>
                <Link
                  to={href(`/works/${project.slug}`)}
                  className="work-github-link"
                  data-cursor="disable"
                >
                  {t(dict.work.readCaseStudy, locale)}
                </Link>
              </div>
              <Link
                to={href(`/works/${project.slug}`)}
                className="work-cover-link"
                data-cursor="disable"
              >
                <ProjectCover
                  title={t(project.title, locale)}
                  category={t(project.category, locale)}
                  technologies={project.technologies}
                />
              </Link>
            </div>
          ))}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>{t(dict.work.wantMore, locale)}</h3>
              <p>{t(dict.work.wantMoreDesc, locale)}</p>
              <Link
                to={href("/myworks")}
                className="see-all-btn"
                data-cursor="disable"
              >
                {t(dict.work.seeAll, locale)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
