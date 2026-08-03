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
import ProjectCarousel from "@/components/ProjectCarousel";
import PricingSection from "@/components/PricingSection";
import SEO from "@/components/SEO";
import { SEO_PAGES } from "@/lib/SEOConfig";
import { PersonSchema, WebsiteSchema } from "@/lib/structuredData";

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
            backgroundColor: isHighlight ? "#004aad" : "#475569",
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
      className="overflow-x-hidden bg-transparent mt-16 transition-colors duration-500"
    >
      <SEO {...SEO_PAGES.home} schema={[PersonSchema, WebsiteSchema]} />
      {/* Background Particles Layer */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-60"
      ></div>

      {/* Hero Section */}
      <Hero />
      <section className="who-am-i-section py-32 sm:py-48 px-6 bg-[#0F0E0E] relative overflow-hidden text-center">
        {/* Subtle background glow to mimic the image atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="space-y-4">
            <span className="who-am-i-reveal block text-[10px] sm:text-xs font-poppins text-white uppercase tracking-[0.4em] font-medium">
              A FEW LINES ABOUT ME
            </span>
            <h2 className="who-am-i-reveal text-6xl md:text-8xl font-serif text-white leading-tight">
              Who Am I
            </h2>
          </div>

          <p className="who-am-i-reveal text-lg sm:text-2xl text-white font-light leading-relaxed max-w-3xl mx-auto">
            I help businesses turn ideas into fast, beautiful, and reliable
            websites and applications. I build modern, user-friendly solutions
            that perform well, scale easily, and support real business growth
            using Laravel, React, Tailwind, and WordPress.
          </p>
        </div>
      </section>

      {/* <ProjectCarousel /> */}
      {/* Other Sections */}
      {/* <div id="experience">
        <Experience />
      </div> */}
      {/* <TechStack /> */}
      <div id="projects">
        <Projects isLandingPage={true} />
      </div>
      <div id="services">
        <Services />
      </div>

      <BentoSection />
      <PricingSection />

      {/* <WorkingProcess /> */}

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
