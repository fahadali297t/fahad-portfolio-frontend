import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for rows - scoped to container
      gsap.from(".service-row", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 85%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const row = e.currentTarget as HTMLElement;
    const rect = row.getBoundingClientRect();
    
    // Position relative to the row container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const img = imageRefs.current[index];
    if (img) {
      gsap.to(img, {
        x: x - 150, // center horizontally (300/2)
        y: y - 120, // center vertically (240/2)
        duration: 0.8,
        ease: "expo.out"
      });
    }
  };

  return (
    <section ref={containerRef} className="bg-black text-white py-24 md:py-32 overflow-hidden select-none relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 border-b border-white/10 pb-12">
          <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.5em] block mb-4">Core Expertise</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            SELECTED <br/> <span className="text-slate-600 font-serif italic font-light lowercase">services</span>
          </h2>
        </div>

        {/* Interactive List Container */}
        <div className="services-list flex flex-col">
          {SERVICES.map((service, index) => (
            <Link 
              to={`/services/${service.id}`}
              key={index} 
              className="service-row group border-b border-white/10 relative block"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              {/* Desktop Hover Image - Hidden on Mobile */}
              <div 
                ref={(el) => { imageRefs.current[index] = el; }}
                className={`hidden md:block pointer-events-none absolute z-50 w-[300px] h-[240px] rounded-[2.5rem] overflow-hidden opacity-0 scale-75 transition-all duration-500 ease-out border-4 border-white/5 shadow-2xl
                  ${activeIndex === index ? 'opacity-100 scale-100' : ''}`}
              >
                <img 
                  src={service.bgImage} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Service Row Content */}
              <div className="py-12 md:py-20 flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-6 md:space-x-12">
                  <span className="text-xs md:text-sm font-mono text-slate-700 font-bold group-hover:text-[#ff6b00] transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-8xl font-black tracking-tighter transition-all duration-500 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 uppercase">
                      <span className="group-hover:text-[#ff6b00] transition-colors duration-500">
                        {service.title.split(' ')[0]}
                      </span>
                      <span className="text-2xl md:text-6xl font-serif italic font-light text-slate-500 group-hover:text-white transition-colors duration-500 lowercase">
                        {service.title.split(' ').slice(1).join(' ')}
                      </span>
                    </h3>
                    {/* Mobile Only Description */}
                    <p className="md:hidden text-slate-500 text-sm font-light max-w-xs">{service.description}</p>
                  </div>
                </div>

                {/* Desktop Description */}
                <div className="hidden lg:block transform transition-all duration-700 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 max-w-xs text-right">
                  <p className="text-[#ff6b00] font-mono text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Scope of work</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </div>

                <div className="shrink-0 group-hover:rotate-45 transition-transform duration-500 text-slate-800 group-hover:text-[#ff6b00]">
                  <ArrowUpRight size={48} className="md:w-16 md:h-16" strokeWidth={1} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-700 text-[10px] font-mono uppercase tracking-[0.4em] font-bold">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse"></span>
            <p>Available for high-stakes projects</p>
          </div>
          <p>EST 2024 • GLOBAL REMOTE</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
