import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TESTIMONIALS } from "../constants";
import { Quote } from "lucide-react";

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // 1. Calculate the total width of ONE set of testimonials
      // We divide by 2 because we have duplicated the array below
      const getScrollDistance = () => track.scrollWidth / 2;

      // 2. Create the seamless loop
      const scrollTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        duration: 35,
        ease: "none",
        repeat: -1,
        // This ensures that when the window resizes, the animation recalculates
        invalidateOnRefresh: true,
      });

      // 3. Header reveal animation
      gsap.from(".testimonial-header-reveal", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Pause on hover for readability
      const handleMouseEnter = () => scrollTween.pause();
      const handleMouseLeave = () => scrollTween.play();

      track.addEventListener("mouseenter", handleMouseEnter);
      track.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        track.removeEventListener("mouseenter", handleMouseEnter);
        track.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate for seamless looping
  const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-24 sm:py-32 md:py-40 overflow-hidden relative"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-[#ff6b00]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10">
        <header className="testimonial-header-reveal text-center mb-20 px-4">
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-4">
            Clients <br />
            <span className="text-zinc-700">Testimonials.</span>
          </h2>
        </header>

        <div className="relative">
          {/* Side Gradients to hide the "entry/exit" of cards */}
          <div className="absolute left-0 top-0 w-20 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Carousel Track */}
          <div
            ref={trackRef}
            className="flex flex-nowrap gap-6 md:gap-8 w-max px-4"
          >
            {doubledTestimonials.map((t, i) => (
              <div
                key={`${i}`}
                className="w-[320px] md:w-[450px] flex-shrink-0 group relative p-8 md:p-10 bg-zinc-950/50 backdrop-blur-sm border border-zinc-900 rounded-[2rem] transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-900/40"
              >
                <div className="relative z-10">
                  <Quote
                    className="text-[#ff6b00] mb-6 opacity-60 group-hover:opacity-100 transition-all duration-500"
                    size={32}
                  />

                  <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-10 font-medium min-h-[120px]">
                    "{t.content}"
                  </p>

                  <div className="flex items-center space-x-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 border border-zinc-800 transition-all duration-500"
                    />
                    <div>
                      <h4 className="font-bold text-white text-base">
                        {t.name}
                      </h4>
                      <p className="text-[10px] text-[#ff6b00] font-mono uppercase tracking-[0.2em] font-black">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
