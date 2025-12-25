
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, PenTool, Code2, Rocket, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    icon: Lightbulb,
    title: "Research",
    description: "Deep technical analysis and conceptualization to turn your ideas into innovative digital products."
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Architecting intuitive user-centric systems that simplify complex backend logic and user flows."
  },
  {
    icon: Code2,
    title: "Development",
    description: "Building resilient, high-performance engines with modern tech stacks, focusing on extreme scalability."
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Ensuring a flawless deployment cycle with robust CI/CD pipelines for a seamless product launch."
  }
];

const WorkingProcess: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const finalCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      // Safely access conditions
      const conditions = context.conditions;
      if (!conditions) return;
      
      const isDesktop = conditions.isDesktop;
      
      // Scoped selector within triggerRef
      const cards = gsap.utils.toArray<HTMLElement>('.process-card', triggerRef.current);
      const finalCard = finalCardRef.current;

      if (sectionRef.current) {
        gsap.set(sectionRef.current, { height: '100vh' });
      }

      // Ensure we have the elements we need
      if (!cards.length || !finalCard) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: isDesktop ? `+=${(cards.length + 1) * 100}%` : `+=${(cards.length + 2) * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      if (isDesktop) {
        // Reset state for desktop
        gsap.set(cards, { rotation: 0, left: "105%", opacity: 0 });
        if (cards[0]) gsap.set(cards[0], { left: "0%", opacity: 1 });
        if (cards[1]) gsap.set(cards[1], { left: "52%", opacity: 1 });
        gsap.set(finalCard, { x: "100%", y: 0, opacity: 0 });

        if (cards[1]) tl.to(cards[1], { left: "0%", rotation: -2, ease: "power2.inOut" }, 0);
        if (cards[2]) tl.to(cards[2], { left: "52%", opacity: 1, rotation: 0, ease: "power2.inOut" }, 0);

        if (cards[2]) tl.to(cards[2], { left: "0%", rotation: 2, ease: "power2.inOut" }, 1);
        if (cards[3]) tl.to(cards[3], { left: "52%", opacity: 1, rotation: 0, ease: "power2.inOut" }, 1);

        if (cards[3]) tl.to(cards[3], { left: "0%", rotation: -1, ease: "power2.inOut" }, 2);

        tl.fromTo(finalCard,
          { x: "100%", opacity: 0, borderRadius: "10rem" },
          { x: "0%", opacity: 1, borderRadius: "2.5rem", ease: "power2.inOut" },
          2.1
        );

        tl.to(cards, { scale: 0.92, opacity: 0.1, duration: 0.8, stagger: 0.05 }, 2.5);
      } else {
        // Reset state for mobile
        gsap.set(cards, { rotation: 0, left: "100%", opacity: 1 });
        if (cards[0]) gsap.set(cards[0], { left: "0%" });
        gsap.set(finalCard, { x: 0, y: "100%", opacity: 0 });

        if (cards[1]) tl.to(cards[1], { left: "0%", ease: "power2.inOut" }, 0);
        if (cards[2]) tl.to(cards[2], { left: "0%", ease: "power2.inOut" }, 1);
        if (cards[3]) tl.to(cards[3], { left: "0%", ease: "power2.inOut" }, 2);

        tl.fromTo(finalCard,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, ease: "power2.inOut" },
          2.8
        );
        
        tl.to({}, { duration: 0.5 }); 
      }
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={triggerRef} className="bg-black relative z-30">
      <section ref={sectionRef} className="h-screen flex flex-col justify-center px-4 md:px-12 py-10 md:py-20 max-w-7xl mx-auto overflow-hidden">
        {/* Section Heading */}
        <div className="mb-8 md:mb-12 relative z-[20]">
           <span className="text-[#ff6b00] font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] block mb-2 md:mb-4">Strategic Workflow</span>
           <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
             WORKING <span className="font-serif italic font-light text-[#ff6b00] lowercase">process</span>
           </h2>
        </div>

        {/* Card Stack Container */}
        <div className="relative h-[60vh] md:h-[65vh] w-full flex items-center">
          
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div 
                key={i} 
                className="process-card absolute top-0 left-0 w-full md:w-[45%] h-full bg-[#111] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 flex flex-col justify-center group shadow-2xl"
                style={{ zIndex: i + 1 }}
              >
                <div className="space-y-6 md:space-y-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-[#ff6b00]">
                    <Icon size={28} className="md:w-8 md:h-8" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <span className="text-[9px] md:text-[10px] font-mono text-slate-600 uppercase tracking-widest">Step 0{i + 1}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-none text-balance">{step.title}</h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final CTA Card - High Impact Reveal */}
          <div 
            ref={finalCardRef}
            className="final-cta-card absolute inset-0 w-full h-full bg-[#ff6b00] border-none rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-20 flex flex-col justify-center items-center text-center z-[15] overflow-hidden opacity-0"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6 md:space-y-10 max-w-4xl">
              <h3 className="text-5xl md:text-[8vw] lg:text-[9rem] font-black tracking-tighter uppercase leading-[0.8] text-black">
                READY <br className="hidden md:block"/> <span className="font-serif italic font-light lowercase opacity-80">to build?</span>
              </h3>
              <p className="text-black/80 text-lg md:text-2xl lg:text-3xl leading-relaxed font-medium max-w-2xl mx-auto px-4">
                Your vision, our architecture. Let's create high-performance systems that define the future.
              </p>
              
              <div className="pt-4 md:pt-8 flex justify-center">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group/btn flex items-center gap-4 md:gap-6 px-8 md:px-14 py-4 md:py-7 bg-black text-[#ff6b00] rounded-full font-bold text-lg md:text-2xl hover:scale-105 transition-all shadow-2xl shadow-black/30"
                >
                  <span>Launch Project</span>
                  <ArrowUpRight size={24} className="md:w-8 md:h-8 group-hover/btn:rotate-45 transition-transform" />
                </button>
              </div>
            </div>

            {/* Background elements for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[800px] h-full md:h-[800px] bg-white/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkingProcess;
