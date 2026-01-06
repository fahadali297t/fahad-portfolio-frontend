import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, EnhancedProject } from "../constants";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard: React.FC<{ project: EnhancedProject; index: number }> = ({
  project,
  index,
}) => {
  return (
    <div
      className="project-card absolute inset-0 w-full h-full flex items-center justify-center px-4 py-8 md:p-6"
      style={{ zIndex: index + 1 }}
    >
      <div className="project-card-inner relative w-full max-w-6xl bg-[#121212] rounded-[1rem] md:rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.6)] p-6 md:p-10 lg:p-12 overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ff6b00]/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Left Side: Image */}
        <div className="w-full lg:w-[45%] aspect-[4/3] rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 shadow-2xl shrink-0 group/img relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale-[0.2] group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-1000"
          />
          <Link
            to={`/projects/${project.id}`}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
          >
            <div className="p-6 bg-[#ff6b00] rounded-full text-black transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-500">
              <ArrowRight size={32} strokeWidth={2.5} />
            </div>
          </Link>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center space-y-4 md:space-y-8 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[#ff6b00] font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                Project {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-px w-8 bg-white/10"></div>
            </div>
            <Link to={`/projects/${project.id}`} className="block group/title">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter flex flex-wrap items-baseline gap-2 md:gap-3 uppercase leading-tight">
                <span className="text-white group-hover/title:text-[#ff6b00] transition-colors">
                  {project.title}
                </span>
                <span className="font-serif italic font-light text-[#ff6b00] opacity-80 text-2xl md:text-4xl">
                  {project.type}
                </span>
              </h3>
            </Link>
            <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-xl font-light">
              {project.description}
            </p>
          </div>

          {/* Challenge & Solution */}
          <div className="hidden sm:grid grid-cols-2 gap-8 py-6 border-y border-white/5">
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-white uppercase opacity-70">
                The Challenge
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-2">
                {project.challenge}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-white uppercase opacity-70">
                The Solution
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-2">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Metrics & Links */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/*   <div className="flex flex-wrap gap-8 items-center">
              {project.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-0">
                    {metric.value}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#ff6b00] font-bold">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
             */}

            <div className="flex gap-3">
              <Link
                to={`/projects/${project.id}`}
                className="group px-6 py-3 bg-white/5 hover:bg-[#ff6b00] text-white hover:text-black rounded-full transition-all duration-500 border border-white/10 flex items-center gap-2 font-bold uppercase text-xs tracking-widest"
              >
                View Details
              </Link>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 md:p-4 bg-white/5 hover:bg-[#ff6b00] rounded-full transition-all duration-500 border border-white/10"
              >
                <Github
                  size={20}
                  className="text-white group-hover:text-black transition-colors"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC<{ isLandingPage?: boolean }> = ({ isLandingPage }) => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Landing page animations with pin and scrub
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];

      const scrollHeight = cards.length * 100;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: `+=${scrollHeight}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const inner = card.querySelector(".project-card-inner");

        if (i > 0) {
          tl.fromTo(
            card,
            { y: "110%", opacity: 0 },
            { y: "0%", opacity: 1, ease: "none" },
            i
          );
        }

        if (i < cards.length - 1) {
          tl.to(
            inner,
            {
              scale: 0.9,
              opacity: 0.25,
              y: -60,
              filter: "blur(2px)",
              ease: "none",
            },
            i + 0.5
          );
        }
      });
    }, mainRef);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
      ScrollTrigger.clearScrollMemory();
      ctx.revert();
    };
  }, [isLandingPage]);

  return (
    <>
      <div className="relative max-w-[70vw] mx-auto space-y-12">
        <div className="bg-circle absolute top-[-50%] right-[-10%] w-[40vw] aspect-square  blur-[150px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 space-y-6 max-w-7xl">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono uppercase tracking-[0.5em] text-[#ff6b00] font-bold">
              The masterpiece
            </span>
            <div className="h-px flex-grow bg-white/10"></div>
          </div>
          <h1 className="text-6xl  md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8]">
            Latest Work <br />
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 font-light leading-relaxed max-w-2xl">
            High-performance backend ecosystems designed for massive scale and
            uncompromising technical integrity.
          </p>
        </div>
      </div>
        <section
      ref={mainRef}
      className="relative bg-black  min-h-screen overflow-hidden z-40"
    >
      
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[25vw] font-black tracking-tighter uppercase leading-none">
          WORK
        </h2>
      </div>

      <div className="relative w-full h-screen">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
    </>
  );
};

export default Projects;
