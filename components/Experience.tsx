import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Building2,
  Code,
  Activity,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Mock data for demo
const TIMELINE = [
  {
    id: 1,
    year: "2023-24",
    title: "Senior Engineer",
    company: "Tech Corp",
    description:
      "Led architecture design and implementation of scalable microservices, improving system performance by 40%.",
  },
  {
    id: 2,
    year: "2021-23",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    description:
      "Built end-to-end solutions using modern frameworks, delivered 15+ production features.",
  },
  {
    id: 3,
    year: "2023-25",
    title: "Laravel Developer",
    company: "Apexvim",
    description:
      "Built end-to-end solutions using modern frameworks, delivered 15+ production features.",
  },
];

const EDUCATION = [
  {
    id: 1,
    year: "2017-21",
    title: "BS Computer Science",
    company: "University Name",
    description:
      "Focused on distributed systems, algorithms, and software engineering principles.",
  },
];

const TimelineNode = ({ item, index, isWork }) => {
  const itemRef = useRef(null);
  const dotRef = useRef(null);
  const connectorRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = itemRef.current;
    const dot = dotRef.current;
    const connector = connectorRef.current;
    if (!el || !dot || !connector) return;

    gsap.fromTo(
      el,
      {
        x: window.innerWidth < 768 ? 30 : isEven ? -60 : 60,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      }
    );

    if (window.innerWidth >= 768) {
      gsap.fromTo(
        connector,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    }

    gsap.fromTo(
      dot,
      { scale: 0, rotate: -120 },
      {
        scale: 1,
        rotate: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: dot,
          start: "top 88%",
        },
      }
    );
  }, [isEven]);

  return (
    <div
      className={`relative flex flex-col md:flex-row  items-start md:items-center justify-between w-full mb-12 pb-5 sm:mb-20 md:mb-32 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Central Connector Dot */}
      <div
        ref={dotRef}
        className="absolute left-3 sm:left-5 md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg sm:rounded-xl md:rounded-2xl bg-black border-2 border-[#ff6b00] z-30 flex items-center justify-center shadow-[0_0_12px_rgba(255,107,0,0.3)]"
      >
        {isWork ? (
          <Code className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#ff6b00]" />
        ) : (
          <GraduationCap className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[#ff6b00]" />
        )}
        <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl bg-[#ff6b00] animate-pulse opacity-10"></div>
      </div>

      {/* Horizontal Connector Line (Desktop) */}
      <div
        ref={connectorRef}
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-1/2 h-px bg-gradient-to-r ${
          isEven
            ? "from-transparent to-[#ff6b00]/30 right-1/2 origin-right"
            : "from-[#ff6b00]/30 to-transparent left-1/2 origin-left"
        } pointer-events-none`}
      />

      {/* Content Card */}
      <div
        ref={itemRef}
        className="w-full md:w-[45%] pl-10 sm:pl-14 md:pl-0 pr-4 sm:pr-6 md:pr-0"
      >
        <div className="relative p-5 sm:p-7 md:p-10 bg-[#0a0a0a] border border-white/5 rounded-2xl sm:rounded-3xl md:rounded-[3rem] transition-all duration-700 hover:border-[#ff6b00]/30 hover:bg-white/[0.02] shadow-2xl overflow-hidden group">
          {/* Section Indicator Overlay */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 opacity-[0.03] sm:opacity-[0.04] md:opacity-[0.05] group-hover:opacity-10 transition-opacity duration-700">
            <span className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none select-none">
              {isWork ? "WRK" : "EDU"}
            </span>
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 bg-white/5 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#ff6b00]" />
                <span className="text-[8px] sm:text-[10px] md:text-[11px] font-mono font-black text-white uppercase tracking-wider sm:tracking-widest">
                  {item.year}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#ff6b00] animate-pulse"></div>
                <span className="text-[7px] sm:text-[9px] md:text-[10px] font-mono text-slate-600 uppercase tracking-wider sm:tracking-widest font-bold">
                  v2.4
                </span>
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-3 md:space-y-4">
              <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-tight sm:leading-tight md:leading-[0.95] group-hover:text-[#ff6b00] transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 text-slate-400 font-serif italic">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-slate-700 flex-shrink-0" />
                <span className="group-hover:text-slate-200 transition-colors text-sm sm:text-lg md:text-2xl">
                  {item.company}
                </span>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-[#ff6b00]/10 to-transparent"></div>

            <p className="text-slate-500 text-xs sm:text-base md:text-lg leading-relaxed font-light group-hover:text-slate-300 transition-colors">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 sm:pt-3 md:pt-4">
              {(isWork
                ? ["Laravel", "Architecture", "TDD"]
                : ["CompSci", "Distributed"]
              ).map((tag) => (
                <span
                  key={tag}
                  className="text-[6px] sm:text-[8px] md:text-[9px] font-mono uppercase tracking-wider sm:tracking-widest text-slate-700 border border-white/5 px-1.5 sm:px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const scrollTrackerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-flow",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );

      gsap.to(scrollTrackerRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-flow",
          start: "top 70%",
          end: "bottom 80%",
          scrub: 1,
        },
      });

      const reveals = gsap.utils.toArray(".timeline-header-reveal") as HTMLElement[];
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-black text-white py-12 sm:py-24 md:py-40 px-3 sm:px-5 md:px-6 overflow-hidden relative"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] h-[95vw] sm:h-[90vw] bg-[#ff6b00]/5 blur-[80px] sm:blur-[140px] md:blur-[200px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="timeline-header-reveal space-y-5 sm:space-y-10 md:space-y-12 mb-12 sm:mb-24 md:mb-40 max-w-5xl px-1 sm:px-0">
          <div className="flex items-center gap-3 sm:gap-5 md:gap-6">
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl md:rounded-[2rem] bg-[#ff6b00] flex items-center justify-center text-black flex-shrink-0">
              <Activity className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <span className="text-[7px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-[#ff6b00] font-bold block">
                Chronological Archive
              </span>
              <p className="text-[6px] sm:text-[9px] md:text-xs text-slate-700 font-mono tracking-widest uppercase">
                System Uptime: 2,555 Days
              </p>
            </div>
          </div>
          <h2 className="text-3xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] sm:leading-[0.82] md:leading-[0.8] mix-blend-difference">
            TECHNICAL <br />
            <span className="text-slate-800 font-serif italic font-light lowercase">
              evolution
            </span>
            <span className="ml-1.5 sm:ml-3 md:ml-4">PATH</span>
          </h2>
          <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-slate-500 font-light leading-relaxed max-w-3xl">
            A precise mapping of my professional trajectory, architectural
            milestones, and educational foundations.
          </p>
        </header>

        <div className="timeline-flow relative">
          <div className="absolute left-3 sm:left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/5 z-0" />

          <div
            ref={lineRef}
            className="absolute left-3 sm:left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 sm:w-0.5 md:w-1 bg-gradient-to-b from-[#ff6b00] via-[#ff6b00]/50 to-transparent origin-top z-0"
          >
            <div className="absolute inset-0 bg-[#ff6b00] blur-sm sm:blur-md opacity-20"></div>
            <div
              ref={scrollTrackerRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-1.5 sm:w-2 md:w-3 h-6 sm:h-10 md:h-12 bg-gradient-to-b from-[#ff6b00] to-transparent rounded-full shadow-[0_0_15px_rgba(255,107,0,0.6)]"
            />
          </div>

          <div className="space-y-0 relative z-10">
            <div className="timeline-header-reveal flex justify-center mb-10 sm:mb-20 md:mb-32 relative">
              <div className="px-5 sm:px-10 md:px-12 py-2 sm:py-4 md:py-5 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center gap-2 sm:gap-3 md:gap-4 shadow-2xl">
                <Briefcase className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#ff6b00]" />
                <span className="text-[8px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.4em]">
                  Professional Registry
                </span>
              </div>
            </div>
            {TIMELINE.map((item, i) => (
              <TimelineNode
                key={`work-${item.id}`}
                item={item}
                index={i}
                isWork={true}
              />
            ))}
          </div>

          <div className="pt-12 sm:pt-20 md:pt-32 space-y-0 relative z-10">
            <div className="timeline-header-reveal flex justify-center mb-10 sm:mb-20 md:mb-32 relative">
              <div className="px-5 sm:px-10 md:px-12 py-2 sm:py-4 md:py-5 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center gap-2 sm:gap-3 md:gap-4 shadow-2xl">
                <GraduationCap className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#ff6b00]" />
                <span className="text-[8px] sm:text-xs md:text-sm font-mono font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.4em]">
                  Academic Foundation
                </span>
              </div>
            </div>
            {EDUCATION.map((item, i) => (
              <TimelineNode
                key={`edu-${item.id}`}
                item={item}
                index={i + 1}
                isWork={false}
              />
            ))}
          </div>
        </div>

        <footer className="mt-16 sm:mt-28 md:mt-40 text-center space-y-5 sm:space-y-10 md:space-y-12">
          <div className="w-px h-12 sm:h-24 md:h-32 bg-gradient-to-b from-white/10 to-transparent mx-auto"></div>
          <div className="space-y-2 sm:space-y-3 md:space-y-4 px-3 sm:px-4">
            <span className="text-[#ff6b00] font-mono text-[7px] sm:text-[10px] md:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] md:tracking-[0.6em] font-bold block">
              Continuity Loop
            </span>
            <h3 className="text-2xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-tight">
              STILL{" "}
              <span className="text-[#ff6b00] font-serif italic font-light lowercase">
                building
              </span>{" "}
              HISTORY
            </h3>
          </div>
          <div className="pt-5 sm:pt-10 md:pt-12">
            <button className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-5 sm:px-10 md:px-12 py-3 sm:py-5 md:py-6 border border-white/10 rounded-full hover:bg-white/5 transition-all text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-wider sm:tracking-widest text-slate-400 hover:text-white">
              <span>Initialize Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ff6b00]" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Experience;
