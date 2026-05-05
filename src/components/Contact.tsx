import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config } from "../config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    contactTimeline.fromTo(
      ".contact-section h3",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    contactTimeline.fromTo(
      ".contact-box",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    return () => {
      contactTimeline.kill();
    };
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>

        {config.availability.open && (
          <div className="contact-availability">
            <span className="availability-dot" />
            {config.availability.label} · {config.availability.responseTime}
          </div>
        )}

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
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
            <h4>WhatsApp</h4>
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
            <h4>Telegram</h4>
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
            <h4>Location</h4>
            <p>
              <span>{config.social.location}</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
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
              Let's build <br />
              <span>something great</span>
            </h2>
            <a
              href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
                "Project Inquiry"
              )}`}
              className="contact-hire-btn"
              data-cursor="disable"
            >
              Start a Project →
            </a>
            <h5>
              <MdCopyright /> {new Date().getFullYear()} {config.developer.fullName}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
