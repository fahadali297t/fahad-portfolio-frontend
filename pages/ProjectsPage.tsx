import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, EnhancedProject } from "../constants";
import { Github, ArrowUpRight, Database, Server, Code2, Globe } from "lucide-react";

const ProjectCard: React.FC<{ project: EnhancedProject; index: number }> = ({
  project,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-1000 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="block relative overflow-hidden rounded-[2.5rem] bg-slate-900 aspect-[16/10] mb-8 group-hover:shadow-[0_20px_80px_rgba(255,107,0,0.15)] transition-all duration-700"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-700"></div>

        {/* Floating Tags */}
        <div className="absolute top-6 left-6 flex gap-2">
          {project.techStackDetailed.slice(0, 2).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-mono font-bold text-[#ff6b00] uppercase tracking-widest"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Corner Button */}
        <div className="absolute bottom-6 right-6 p-4 bg-[#ff6b00] rounded-2xl text-black translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <ArrowUpRight size={24} strokeWidth={2.5} />
        </div>
      </Link>

      <div className="space-y-4 px-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] font-bold">
            Registry: 0{project.id}
          </span>
          <div className="flex gap-4">
            <a
              href={project.github}
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        <Link to={`/projects/${project.id}`} className="block group/title">
          <h3 className="text-3xl font-black tracking-tighter uppercase leading-none text-white group-hover/title:text-[#ff6b00] transition-colors">
            {project.title}{" "}
            <span className="font-serif italic font-light lowercase text-xl opacity-60 ml-2">
              {project.type}
            </span>
          </h3>
        </Link>

        <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-8 pt-2">
          {project.metrics.slice(0, 2).map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xl font-black text-white">
                {metric.value}
              </span>
              <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#ff6b00]"></div>
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#ff6b00] font-black">
                Curated Portfolio
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
              FEATURED <br />
              <span className="text-slate-400 font-serif italic font-light lowercase">
                Projects
              </span>
              {/* <span className="ml-2">ARTIFACTS</span> */}
            </h2>
          </div>
          <div className="pb-2">
            <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-sm border-l border-white/10 pl-8">
              High-performance digital systems designed with precision and
              structural clarity.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-24">
          {PROJECTS.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-24 pt-20 border-t border-white/5 flex flex-col items-center text-center space-y-10">
          <div className="flex items-center gap-8 text-slate-800 opacity-90">
            <Server size={40} strokeWidth={1} />
            <Database size={40} strokeWidth={1} />
            <Code2 size={40} strokeWidth={1} />
          </div>
          <div className="space-y-4">
            <h4 className="text-2xl font-bold uppercase tracking-tight text-white">
              More Projects Available
            </h4>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Browse real-world systems built for production, supported by
              benchmarks and detailed documentation.
            </p>
          </div>
          <Link
            to="/projects"
            className="group flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#ff6b00] transition-all hover:scale-105"
          >
            Load More Projects{" "}
            <ArrowUpRight
              size={18}
              className="group-hover:rotate-45 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
