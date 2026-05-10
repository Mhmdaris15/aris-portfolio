import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";
import Services from "./Services";
import Infrastructure from "./Infrastructure";
import setSplitText from "./utils/splitText";
import SeoHead from "../seo/SeoHead";
import { personSchema, webSiteSchema } from "../seo/schema";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [isMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  useEffect(() => {
    document.body.classList.add("lenis-locked");
    return () => {
      document.body.classList.remove("lenis-locked");
    };
  }, []);

  return (
    <div className="container-main">
      <SeoHead
        path="/"
        title=""
        jsonLd={[personSchema(), webSiteSchema()]}
      />
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && !isMobile && children}
      <div className="container-main">
        <Landing />
        <h1 className="visually-hidden">
          Muhammad Aris Septanugroho — AI Engineer, Platform Engineer & Full-Stack Developer
        </h1>
        <About />
        <WhatIDo />
        <Infrastructure />
        <Services />
        <Career />
        <Work />
        <TechStackNew />
        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
