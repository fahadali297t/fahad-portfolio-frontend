import React from "react";
import Hero from "../components/Hero";
import WhoAmI from "../components/WhoAmI";
import Testimonials from "../components/Testimonials";
import Services from "./Services";
import Blogs from "../components/Blogs";
import BrandEndSection from "../components/BrandEndSection";
import Contact from "./Contact";
import Projects from "./ProjectsPage";
import BentoSection from "@/components/BentoSection";
import PricingSection from "@/components/PricingSection";
import SEO from "@/components/SEO";
import { SEO_PAGES } from "@/lib/SEOConfig";
import { PersonSchema, WebsiteSchema } from "@/lib/structuredData";

const Home: React.FC = () => {
  return (
    <div className="home-page-flow overflow-x-hidden transition-colors duration-500">
      <SEO {...SEO_PAGES.home} schema={[PersonSchema, WebsiteSchema]} />

      {/* Hero Section */}
      <Hero />
      <WhoAmI />

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
        <Services isLandingPage={true} />
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
