import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, EnhancedProject } from "../constants";
import { ArrowUpRight, Filter, Layers, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "WordPress", "Laravel", "Fintech", "E-commerce", "DevOps"] as const;
type Category = (typeof CATEGORIES)[number];

const ProjectCard: React.FC<{ project: EnhancedProject; index: number }> = ({
  project,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, {
      scale: 1.05,
      filter: "grayscale(0%)",
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(cardRef.current, {
      y: -10,
      borderColor: "rgba(255, 107, 0, 0.4)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      filter: "grayscale(50%)",
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(cardRef.current, {
      y: 0,
      borderColor: "rgba(255, 255, 255, 0.05)",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <Link
      to={`/projects/${project.id}`}
      className="project-grid-item block group focus:outline-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative flex flex-col h-full bg-[#0a0a0a] border border-white/5 rounded-[1rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-2xl"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            ref={imgRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale-[0.5] transition-all duration-1000 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

          <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
            <div className="w-1.5 h-1.5 bg-[#ff6b00] rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 p-4 bg-[#ff6b00] rounded-2xl text-black translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl shadow-[#ff6b00]/20">
            <ArrowUpRight size={24} strokeWidth={2.5} />
          </div>
        </div>

        <div className="p-8 flex flex-col flex-grow space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                Architectural Artifact
              </span>
              <span className="text-[10px] font-mono text-[#ff6b00] uppercase tracking-widest font-black">
                {project.year}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none group-hover:text-[#ff6b00] transition-colors">
              {project.title}
              <span className="ml-2 text-xl font-serif italic font-light lowercase text-slate-500">
                {project.type.split(" ")[0]}
              </span>
            </h3>
          </div>

          <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="pt-4 flex flex-wrap gap-3 mt-auto">
            {project.techStackDetailed.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-mono uppercase tracking-widest text-slate-400 group-hover:text-white group-hover:border-[#ff6b00]/20 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const visibleProjects = useMemo(() => {
    return filteredProjects;
  }, [filteredProjects, visibleCount]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-grid-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filter, visibleProjects.length]);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen overflow-x-hidden pt-16"
    >
      <div className="bg-circle fixed top-[-10%] right-[-10%] w-[50vw] aspect-square bg-[#ff6b00]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <header className="relative z-10 pt-20 pb-16 px-6 max-w-7xl mx-auto space-y-12">
        <div className="space-y-6 sm:space-y-10 md:space-y-12 lg:space-y-16 pt-4 ">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl">
            <div className="header-reveal flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="w-8 sm:w-10 md:w-12 h-px bg-[#ff6b00]"></div>
              <span className="text-[7px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-[#ff6b00] font-bold"></span>
            </div>
            <h1 className="header-reveal text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference">
              Projects & <br />
              <span className="text-slate-500 font-serif italic font-light lowercase">
                Case Studies
              </span>
              {/* <span className="ml-1.5 sm:ml-2 md:ml-4">GUIDES</span> */}
            </h1>
            {/* <p className="header-reveal text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-500 font-light leading-relaxed max-w-3xl">
              Deep dives into Laravel internals, distributed systems, and the
              evolving landscape of high-performance backend engineering.
            </p> */}
          </div>
        </div>
      </header>

      {/* Sticky Filter Bar - Exactly below the 16 unit navbar */}
      <section className=" hidden md:flex top-16 z-40 bg-black/90 backdrop-blur-xl border-y border-[#ff6b00]/10 px-6">
        <div className="max-w-7xl mx-auto py-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Filter size={18} className="text-[#ff6b00]" />
            <span className="text-xs font-black uppercase tracking-widest text-white">
              Domain Filter
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setVisibleCount(4);
                }}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                  ${
                    filter === cat
                      ? "bg-[#ff6b00] text-black shadow-lg shadow-orange-500/20"
                      : "bg-white/5 text-slate-500 hover:text-white border border-white/5"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-grid py-24 px-6 max-w-7xl mx-auto relative z-10">
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            {visibleProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center opacity-50">
            <Layers size={64} className="mx-auto mb-6" />
            <h3 className="text-2xl font-black uppercase">
              No projects found in this domain.
            </h3>
          </div>
        )}

        {/* {visibleCount < filteredProjects.length && (
          <div className="mt-32 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 2)}
              className="group flex flex-col items-center gap-4"
            >
              <div className="p-10 bg-white/5 border border-white/10 rounded-full group-hover:bg-[#ff6b00] group-hover:text-black transition-all duration-700">
                <Zap size={32} />
              </div>
              <span className="text-sm font-light text-slate-500 uppercase tracking-[0.4em]">
                Load More Data
              </span>
            </button>
          </div>
        )} */}
      </section>
    </div>
  );
};

export default Projects;
