import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HiOutlineRocketLaunch,
  HiOutlineSquare3Stack3D,
  HiOutlineCpuChip,
  HiOutlineChartBar,
  HiOutlineBolt,
  HiArrowRight,
} from "react-icons/hi2";
import { config } from "../config";
import "./styles/Services.css";

gsap.registerPlugin(ScrollTrigger);

const ICONS: Record<string, JSX.Element> = {
  rocket: <HiOutlineRocketLaunch />,
  stack: <HiOutlineSquare3Stack3D />,
  ai: <HiOutlineCpuChip />,
  data: <HiOutlineChartBar />,
  bolt: <HiOutlineBolt />,
};

const Services = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      ".services-eyebrow, .services-section h2, .services-subtitle",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      ".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
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
      `Hi Aris,\n\nI'd like to discuss a "${service}" engagement.\n\nProject brief:\n- \n\nTimeline:\n- \n\nBudget range:\n- \n\nThanks!`
    )}`;

  return (
    <section className="services-section" id="services">
      <div className="services-bg-orb services-bg-orb-1" />
      <div className="services-bg-orb services-bg-orb-2" />

      <div className="services-inner">
        <div className="services-header">
          <span className="services-eyebrow">— What I offer —</span>
          <h2>
            <span>Services</span> &amp; Pricing
          </h2>
          <p className="services-subtitle">
            Transparent starting prices. Final scope and quote agreed before
            kickoff — every engagement is custom.
          </p>
        </div>

        <div className="services-grid">
          {config.services.map((service) => (
            <div
              className={`service-card service-card--${service.id}${
                service.popular ? " service-card--popular" : ""
              }`}
              key={service.id}
              data-cursor="disable"
            >
              {service.popular && (
                <span className="service-popular-badge">★ Most Popular</span>
              )}

              <div className="service-icon">{ICONS[service.icon]}</div>

              <div className="service-headline">
                <h3>{service.title}</h3>
                <span className="service-tagline">{service.tagline}</span>
              </div>

              <p className="service-description">{service.description}</p>

              <div className="service-price-row">
                <div className="service-price">
                  <span className="service-price-from">starting at</span>
                  <span className="service-price-amount">
                    {service.priceFrom}
                  </span>
                </div>
                <div className="service-timeline">
                  <span className="service-timeline-label">timeline</span>
                  <span className="service-timeline-value">
                    {service.timeline}
                  </span>
                </div>
              </div>

              <div className="service-divider" />

              <div className="service-includes">
                <h5>Includes</h5>
                <ul>
                  {service.includes.map((item) => (
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
                href={mailto(service.title)}
                className="service-cta"
                data-cursor="disable"
              >
                <span>Discuss this project</span>
                <HiArrowRight />
              </a>
            </div>
          ))}
        </div>

        <div className="services-footer">
          <div className="services-footer-card">
            <div>
              <h3>Need something different?</h3>
              <p>
                Custom engagements, retainers, and team augmentation also
                available. Tell me what you need.
              </p>
            </div>
            <a
              href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
                "Custom Project Inquiry"
              )}`}
              className="services-footer-cta"
              data-cursor="disable"
            >
              Contact me <HiArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
