import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import TechStack from '../components/TechStack';
import Testimonials from '../components/Testimonials';
import Services from './Services';
import Experience from '../components/Experience';
import Blogs from '../components/Blogs';
import BrandEndSection from '../components/BrandEndSection';
import WorkingProcess from '../components/WorkingProcess';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".hero-text-animate", {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.from(".hero-card-animate", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Auto-sliding image logic (toggles every 2.5 seconds)
      const interval = setInterval(() => {
        setCurrentView((prev) => (prev === 0 ? 1 : 0));
      }, 2500);

      // Section Fade Ups
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section: any) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      return () => clearInterval(interval);
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (imageScrollRef.current) {
      gsap.to(imageScrollRef.current, {
        x: currentView === 0 ? "0%" : "-50%",
        duration: 1,
        ease: "expo.inOut"
      });
    }
  }, [currentView]);

  return (
    <div ref={containerRef} className="overflow-x-hidden bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 lg:py-0">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-10 z-10">
            <div className="hero-text-animate">
              <span className="text-slate-400 font-light text-lg tracking-tight">Hey there. I'm</span>
            </div>
            
            <div className="hero-text-animate space-y-2">
              <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-white uppercase">
                ARTISAN
              </h1>
              <h1 className="text-7xl md:text-9xl font-serif italic text-[#ff6b00] leading-[0.85] tracking-tight">
                BACKEND
              </h1>
            </div>

            <p className="hero-text-animate text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              Architecting high-performance systems and scalable logic that drives growth and empowers modern digital experiences.
            </p>

            <div className="hero-text-animate flex flex-col space-y-8">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff6b00]"></span>
                </span>
                <span className="text-sm font-medium tracking-wide text-slate-200">Available for new project</span>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center space-x-3 px-8 py-4 bg-[#ff6b00] text-black rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/10"
                >
                  <span className="text-lg">Lets Talk Brief</span>
                  <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - The Animated Card */}
          <div className="lg:col-span-5 hero-card-animate flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/5] bg-slate-900/50 rounded-[3rem] p-4 overflow-hidden shadow-2xl border border-white/5 group">
              
              {/* Image Viewport */}
              <div className="relative w-full h-[85%] rounded-[2.5rem] overflow-hidden">
                <div 
                  ref={imageScrollRef}
                  className="flex w-[200%] h-full transition-transform duration-1000 ease-in-out"
                >
                  {/* Visual 1: Illustration/Abstract */}
                  <div className="w-1/2 h-full bg-[#1a1a1a] relative flex items-center justify-center p-8">
                    <img 
                      src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" 
                      alt="Tech Visual" 
                      className="w-full h-full object-cover rounded-2xl opacity-60 mix-blend-screen grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  
                  {/* Visual 2: Portrait */}
                  <div className="w-1/2 h-full bg-[#2a2a2a]">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                      alt="Portrait" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>
                </div>
              </div>

              {/* Card Bottom Text */}
              <div className="h-[15%] flex items-center justify-center">
                <p className="text-xl md:text-2xl font-serif text-slate-400 tracking-wider flex items-center">
                  <span className="font-sans text-xs uppercase tracking-[0.4em] font-bold mr-4 opacity-50">Based in</span> 
                  AMSTERDAM
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
             <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <div id="experience">
        <Experience />
      </div>

      {/* Tech Stack Section */}
      <TechStack />

      {/* Services Section */}
      <div id="services">
        <Services />
      </div>

      {/* Working Process Section - Horizontal Scroll */}
      <WorkingProcess />

      {/* Projects Section - Vertical Stacked Slider */}
      <div id="projects">
        <Projects isLandingPage={true} />
      </div>

      {/* Blogs Section - Resources & Guides */}
      <div id="blogs">
        <Blogs />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="reveal-section">
        <Testimonials />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>

      {/* Brand End / Hero Section before Footer */}
      <BrandEndSection />
    </div>
  );
};

export default Home;