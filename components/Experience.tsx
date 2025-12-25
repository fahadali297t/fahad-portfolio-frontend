
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '../constants';
import { MousePointer2, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-row", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".exp-list",
          start: "top 85%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const row = e.currentTarget as HTMLElement;
    const rect = row.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const img = imageRefs.current[index];
    if (img) {
      gsap.to(img, {
        x: x - 150,
        y: y - 100,
        duration: 0.6,
        ease: "power3.out"
      });
    }
  };

  return (
    <section ref={containerRef} className="bg-black text-white py-32 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section from Image */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              MY EXPERIENCE
            </h2>
            <h2 className="text-4xl md:text-7xl font-serif italic text-[#ff6b00] leading-[0.9] tracking-tight">
              & ACHIEVEMENT
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
              <span>Hire me</span>
              <MousePointer2 size={18} />
            </button>
            <button className="flex items-center gap-3 px-8 py-3 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-colors">
              <span>Watch Video</span>
              <Play size={18} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* List Section */}
        <div className="exp-list flex flex-col">
          {TIMELINE.map((item, index) => (
            <div 
              key={item.id} 
              className="exp-row group border-b border-white/10 relative cursor-none"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              {/* Floating Image Visual like Services */}
              <div 
                // Fix: Ref callback should not return a value as it causes TypeScript errors.
                ref={(el) => { imageRefs.current[index] = el; }}
                className={`pointer-events-none absolute z-50 w-[320px] h-[200px] rounded-[2rem] overflow-hidden opacity-0 scale-50 transition-all duration-300 ease-out border border-white/10
                  ${activeIndex === index ? 'opacity-100 scale-100' : ''}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Row Content based on User Image */}
              <div className="py-12 md:py-20 flex flex-col md:flex-row gap-10 md:gap-20 relative z-10 items-start">
                
                {/* Left Side: Meta info */}
                <div className="w-full md:w-[40%] space-y-6">
                  <span className="inline-block px-5 py-2 bg-white/10 rounded-full text-[10px] font-bold tracking-widest text-slate-400 group-hover:text-[#ff6b00] transition-colors">
                    {item.year}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase group-hover:text-[#ff6b00] transition-colors flex flex-wrap gap-2">
                      {item.title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 !== 0 ? "font-serif italic font-light lowercase" : ""}>{word}</span>
                      ))}
                    </h3>
                    <p className="text-lg md:text-xl text-slate-500 font-light italic">
                      {item.company}
                    </p>
                  </div>
                </div>

                {/* Right Side: Description */}
                <div className="w-full md:w-[60%] flex items-center h-full pt-2">
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl group-hover:text-white transition-colors duration-500">
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
