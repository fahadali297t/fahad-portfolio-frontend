import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const columns = gsap.utils.toArray('.testimonial-column') as HTMLElement[];
      
      columns.forEach((col, i) => {
        const speed = 20 + (i * 10); // Varying speeds for columns
        const height = col.offsetHeight / 2;
        
        gsap.to(col, {
          y: -height,
          duration: speed,
          ease: "none",
          repeat: -1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const col = e.currentTarget.closest('.testimonial-column');
    if (col) {
      gsap.getTweensOf(col).forEach(t => t.pause());
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const col = e.currentTarget.closest('.testimonial-column');
    if (col) {
      gsap.getTweensOf(col).forEach(t => t.resume());
    }
  };

  // Splitting testimonials into columns for the grid
  const cols = [
    [...TESTIMONIALS, ...TESTIMONIALS],
    [...TESTIMONIALS.reverse(), ...TESTIMONIALS],
    [...TESTIMONIALS, ...TESTIMONIALS]
  ];

  return (
    <section className="py-32 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#ff6b00] font-mono text-sm uppercase tracking-[0.3em] font-bold">Feedback</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mt-4">Trusted by Architects.</h2>
        </div>

        <div ref={containerRef} className="relative h-[600px] overflow-hidden">
          {/* Top and Bottom Fading Masks */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-slate-950 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent z-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
            {cols.map((colTestimonials, colIdx) => (
              <div 
                key={colIdx} 
                className={`testimonial-column space-y-8 ${colIdx === 1 ? 'mt-12' : ''} ${colIdx === 2 ? 'hidden md:block' : ''} ${colIdx === 0 ? '' : 'hidden sm:block'}`}
              >
                {colTestimonials.map((t, i) => (
                  <div 
                    key={`${colIdx}-${i}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="group p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] transition-all duration-500 hover:border-[#ff6b00] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-default"
                  >
                    <Quote className="text-[#ff6b00]/20 mb-6 group-hover:text-[#ff6b00] transition-colors" size={32} />
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 italic">
                      "{t.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                        <p className="text-xs text-[#ff6b00] font-mono uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;