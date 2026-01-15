import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, PenTool, Code2, Rocket, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    icon: Lightbulb,
    title: "Research",
    description:
      "Deep technical analysis and conceptualization to turn your ideas into innovative digital products.",
  },
  {
    icon: PenTool,
    title: "Design",
    description:
      "Architecting intuitive user-centric systems that simplify complex backend logic and user flows.",
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Building resilient, high-performance engines with modern tech stacks, focusing on extreme scalability.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "Ensuring a flawless deployment cycle with robust CI/CD pipelines for a seamless product launch.",
  },
];

const WorkingProcess: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const finalCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run animation on desktop
    if (window.innerWidth < 1024) return;

    const trigger = triggerRef.current;
    const section = sectionRef.current;
    const finalCard = finalCardRef.current;

    if (!trigger || !section || !finalCard) return;

    // Get all process cards
    const cards = Array.from(
      trigger.querySelectorAll(".process-card")
    ) as HTMLElement[];

    if (cards.length === 0) return;

    // Initial setup
    gsap.set(cards, {
      position: "absolute",
      top: 0,
      left: "105%",
      opacity: 0,
      rotation: 0,
    });

    gsap.set(cards[0], { left: "0%", opacity: 1 });
    gsap.set(cards[1], { left: "52%", opacity: 1 });

    gsap.set(finalCard, {
      x: "100%",
      opacity: 0,
      borderRadius: "10rem",
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: `+=${(cards.length + 1) * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Card 2 slides in
    tl.to(
      cards[1],
      { left: "0%", rotation: -2, ease: "power2.inOut", duration: 1 },
      0
    );
    tl.to(
      cards[2],
      {
        left: "52%",
        opacity: 1,
        rotation: 0,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    );

    // Card 3 slides in
    tl.to(
      cards[2],
      { left: "0%", rotation: 2, ease: "power2.inOut", duration: 1 },
      1
    );
    tl.to(
      cards[3],
      {
        left: "52%",
        opacity: 1,
        rotation: 0,
        ease: "power2.inOut",
        duration: 1,
      },
      1
    );

    // Card 4 slides in
    tl.to(
      cards[3],
      { left: "0%", rotation: -1, ease: "power2.inOut", duration: 1 },
      2
    );

    // Final card appears
    tl.to(
      finalCard,
      {
        x: "0%",
        opacity: 1,
        borderRadius: "2.5rem",
        ease: "power2.inOut",
        duration: 1,
      },
      2.5
    );

    // Fade out all cards
    tl.to(
      cards,
      {
        scale: 0.92,
        opacity: 0.1,
        duration: 0.8,
        stagger: 0.05,
      },
      3
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={triggerRef} className="bg-black relative z-30">
      <section
        ref={sectionRef}
        className="lg:h-screen flex flex-col lg:justify-center px-4 md:px-12 py-10 md:py-20 max-w-7xl mx-auto lg:overflow-hidden"
      >
        {/* Section Heading */}
        <div className="mb-8 md:mb-12 mt-4 relative z-[20]">
          <span className="text-[#ff6b00] font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] block mb-2 md:mb-4">
            Strategic Workflow
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            WORKING{" "}
            <span className="font-serif italic font-light text-[#ff6b00] lowercase">
              process
            </span>
          </h2>
        </div>

        {/* Mobile/Tablet: Simple vertical stack */}
        <div className="lg:hidden space-y-6 md:space-y-8">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="w-full bg-[#111] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col justify-center shadow-2xl"
              >
                <div className="space-y-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-[#ff6b00]">
                    <Icon size={28} className="md:w-8 md:h-8" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <span className="text-[9px] md:text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                      Step 0{i + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-none">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final CTA Card - Mobile/Tablet */}
          <div className="w-full bg-[#ff6b00] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center items-center text-center overflow-hidden mt-8 relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none"></div>

            <div className="relative z-10 space-y-6 md:space-y-8">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.8] text-black">
                READY <br />{" "}
                <span className="font-serif italic font-light lowercase opacity-80">
                  to build?
                </span>
              </h3>
              <p className="text-black/80 text-base md:text-xl leading-relaxed font-medium max-w-xl mx-auto">
                Your vision, our architecture. Let's create high-performance
                systems that define the future.
              </p>

              <div className="pt-4 md:pt-6 flex justify-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group/btn flex items-center gap-4 px-8 py-4 bg-black text-[#ff6b00] rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-black/30"
                >
                  <span>Launch Project</span>
                  <ArrowUpRight
                    size={24}
                    className="group-hover/btn:rotate-45 transition-transform"
                  />
                </button>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/10 blur-[80px] rounded-full pointer-events-none"></div>
          </div>
        </div>

        {/* Desktop: Animated card stack */}
        <div className="hidden lg:flex relative h-[65vh] w-full items-center">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="process-card w-[45%] h-full bg-[#111] border border-white/5 rounded-[2.5rem] p-12 flex flex-col justify-center shadow-2xl"
                style={{ zIndex: i + 1 }}
              >
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#ff6b00]">
                    <Icon size={32} />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                      Step 0{i + 1}
                    </span>
                    <h3 className="text-3xl font-black text-white uppercase leading-none">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final CTA Card - Desktop */}
          <div
            ref={finalCardRef}
            className="final-cta-card absolute inset-0 w-full h-full bg-[#ff6b00] border-none rounded-[2.5rem] p-20 flex flex-col justify-center items-center text-center z-[15] overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none"></div>

            <div className="relative z-10 space-y-10 max-w-4xl">
              <h3 className="text-[8vw] lg:text-[9rem] font-black tracking-tighter uppercase leading-[0.8] text-black">
                READY <br />{" "}
                <span className="font-serif italic font-light lowercase opacity-80">
                  to build?
                </span>
              </h3>
              <p className="text-black/80 text-2xl lg:text-3xl leading-relaxed font-medium max-w-2xl mx-auto">
                Your vision, our architecture. Let's create high-performance
                systems that define the future.
              </p>

              <div className="pt-8 flex justify-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group/btn flex items-center gap-6 px-14 py-7 bg-black text-[#ff6b00] rounded-full font-bold text-2xl hover:scale-105 transition-all shadow-2xl shadow-black/30"
                >
                  <span>Launch Project</span>
                  <ArrowUpRight
                    size={32}
                    className="group-hover/btn:rotate-45 transition-transform"
                  />
                </button>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 blur-[120px] rounded-full pointer-events-none"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkingProcess;
