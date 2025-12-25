import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  Calendar, 
  User, 
  Tag, 
  Code2, 
  Database, 
  Zap, 
  Terminal as TerminalIcon 
} from 'lucide-react';
import Terminal from '../components/Terminal';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === Number(id));
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Parallax effect on hero image
      gsap.to(heroImgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-trigger',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Reveal animations for sections
      const reveals = gsap.utils.toArray('.reveal-section');
      reveals.forEach((el: any) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        });
      });

      // Technical chips animation
      gsap.from('.tech-chip', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [project]);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/projects" className="text-[#ff6b00] hover:underline">Back to Projects</Link>
      </div>
    );
  }

  const nextProject = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-24 left-8 z-50 p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-[#ff6b00] hover:text-black transition-all group hidden md:flex"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden hero-trigger">
        <div className="absolute inset-0 z-0">
          <img 
            ref={heroImgRef}
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale-[0.3] opacity-50 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.5em] block animate-pulse">Deep Case Study</span>
            <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
              {project.title}
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-12 pt-8">
            <div className="flex flex-col items-center gap-2">
              <Calendar size={20} className="text-[#ff6b00]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Year</span>
              <span className="font-bold text-lg uppercase tracking-tight">{project.year}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <User size={20} className="text-[#ff6b00]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Role</span>
              <span className="font-bold text-lg uppercase tracking-tight">{project.role}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Tag size={20} className="text-[#ff6b00]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Type</span>
              <span className="font-bold text-lg uppercase tracking-tight">{project.type}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Summary & Metrics */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-10 reveal-section">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">THE <span className="text-[#ff6b00] font-serif italic font-light lowercase">architectural</span> VISION</h2>
               <div className="h-px w-24 bg-[#ff6b00]"></div>
            </div>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
              {project.fullDescription}
            </p>
          </div>
          
          <div className="lg:col-span-4 grid grid-cols-1 gap-8 reveal-section">
            {project.metrics.map((metric, i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-[#ff6b00]/30 transition-all group">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter block group-hover:text-[#ff6b00] transition-colors">{metric.value}</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 font-bold">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Arsenal Chips */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-mono text-slate-500 uppercase tracking-[0.4em] mb-12 text-center font-bold">Technology Ecosystem</h3>
          <div className="flex flex-wrap justify-center gap-4 tech-grid">
            {project.techStackDetailed.map((tech, i) => (
              <div key={i} className="tech-chip px-8 py-4 bg-white/5 rounded-2xl border border-white/10 text-slate-300 font-bold tracking-tight hover:bg-[#ff6b00] hover:text-black hover:border-transparent transition-all cursor-default">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center reveal-section">
          <div className="space-y-8">
            <div className="inline-block p-4 bg-[#ff6b00]/10 text-[#ff6b00] rounded-2xl">
              <Zap size={32} />
            </div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">THE <br/> <span className="text-[#ff6b00] font-serif italic font-light lowercase">critical</span> CHALLENGE</h3>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              {project.challenge}
            </p>
          </div>
          <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 group">
             <img src={project.gallery[0]} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center reveal-section lg:flex-row-reverse">
          <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 group order-2 lg:order-1">
             <img src={project.gallery[1]} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-block p-4 bg-[#ff6b00]/10 text-[#ff6b00] rounded-2xl">
              <Database size={32} />
            </div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">THE <br/> <span className="text-[#ff6b00] font-serif italic font-light lowercase">elegant</span> SOLUTION</h3>
            <p className="text-lg text-slate-400 leading-relaxed font-light">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Engine Room (Code Section) */}
      <section className="py-32 px-6 bg-slate-900/10 border-t border-white/5 reveal-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.5em] block">The Engine Room</span>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">INTERNAL <br/> <span className="text-[#ff6b00] font-serif italic font-light lowercase">logic</span></h3>
            </div>
            <p className="text-slate-500 font-light leading-relaxed">
              Every system is built on solid principles. Here we leveraged Laravel's transactional capabilities to ensure financial consistency across micro-services.
            </p>
            <div className="flex gap-4">
               <a href={project.github} className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                 <Github size={20} />
                 <span>Source Code</span>
               </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Terminal title="artisan-os // aurora-v1.php">
              <pre className="text-[#ff6b00] text-xs md:text-sm">
                {project.codeSnippet}
              </pre>
            </Terminal>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-6 reveal-section">
        <div className="max-w-7xl mx-auto space-y-8">
           <div className="flex justify-between items-end mb-12">
              <h3 className="text-4xl font-black uppercase tracking-tighter">PROJECT <span className="text-[#ff6b00] font-serif italic font-light lowercase">visuals</span></h3>
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Selected Screenshots</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.slice(0, 2).map((img, i) => (
                <div key={i} className="rounded-[2.5rem] overflow-hidden aspect-video border border-white/10 group">
                  <img src={img} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-6 border-t border-white/10 overflow-hidden group">
         <div className="absolute inset-0 z-0">
           <img src={nextProject.image} className="w-full h-full object-cover opacity-10 grayscale group-hover:opacity-20 group-hover:scale-110 transition-all duration-1000" />
           <div className="absolute inset-0 bg-black/60"></div>
         </div>
         
         <div className="relative z-10 space-y-6">
            <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.5em] block">Continue Exploring</span>
            <Link to={`/projects/${nextProject.id}`} className="block">
              <h2 className="text-5xl md:text-[8vw] font-black tracking-tighter uppercase leading-none text-white group-hover:text-[#ff6b00] transition-colors">
                 NEXT <br/> <span className="font-serif italic font-light lowercase">project</span>
              </h2>
            </Link>
            <div className="pt-8">
               <Link 
                 to={`/projects/${nextProject.id}`}
                 className="inline-flex items-center gap-4 px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
               >
                 <span>Explore {nextProject.title}</span>
                 <ArrowUpRight size={24} />
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
};

export default ProjectDetail;