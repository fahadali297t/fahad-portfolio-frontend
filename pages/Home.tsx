import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import Testimonials from "../components/Testimonials";
import Services from "./Services";
import Experience from "../components/Experience";
import Blogs from "../components/Blogs";
import BrandEndSection from "../components/BrandEndSection";
import WorkingProcess from "../components/WorkingProcess";
// import ProjectsSection from "../components/ProjectsSection";
import Contact from "./Contact";
import Projects from "./ProjectsPage";
import BentoSection from "@/components/BentoSection";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Particle Background Animation
      const particlesCount = 80;
      const bg = bgRef.current;
      if (bg) {
        // Clear existing particles to prevent duplication on re-renders
        bg.innerHTML = "";
        for (let i = 0; i < particlesCount; i++) {
          const p = document.createElement("div");
          p.className = "absolute rounded-full pointer-events-none";
          const size = Math.random() * 3 + 1;
          const isHighlight = Math.random() > 0.9;

          gsap.set(p, {
            width: size,
            height: size,
            backgroundColor: isHighlight ? "#ff6b00" : "#475569",
            opacity: Math.random() * 0.4 + 0.1,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          });

          bg.appendChild(p);

          gsap.to(p, {
            x: "+=" + (Math.random() * 100 - 50),
            y: "+=" + (Math.random() * 100 - 50),
            duration: 5 + Math.random() * 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden bg-transparent transition-colors duration-500"
    >
      {/* Background Particles Layer */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-60"
      ></div>

      {/* Hero Section */}
      <Hero />

      {/* Other Sections */}
      {/* <div id="experience">
        <Experience />
      </div> */}
      <TechStack />
      <div id="services">
        <Services />
      </div>
      <WorkingProcess />
      <BentoSection />

      <div id="projects">
        <Projects isLandingPage={true} />
      </div>
      <div id="blogs">
        <Blogs />
      </div>
      <div id="testimonials" className="reveal-section">
        <Testimonials />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <BrandEndSection />
    </div>
  );
};

export default Home;
