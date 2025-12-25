import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS, TIMELINE, EDUCATION } from '../constants';
import SkillBar from '../components/SkillBar';
import { Award, Coffee, Code, BookOpen, Briefcase, Sparkles, Database, Terminal, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TimelineNode: React.FC<{ item: any; index: number; type: 'work' | 'edu' }> = ({ item, index, type }) => {
  const nodeRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = nodeRef.current;
    gsap.fromTo(
      el,
      { x: isEven ? -40 : 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  }, [isEven]);

  return (
    <div ref={nodeRef} className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-16 md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Central Connector Dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#ff6b00] z-20 border-4 border-black shadow-[0_0_20px_rgba(255,107,0,0.6)]" />

      {/* Content Card */}
      <div className={`w-full md:w-[42%] ml-12 md:ml-0 group`}>
        <div className="relative p-8 md:p-10 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] hover:border-[#ff6b00]/30 transition-all duration-500 overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ff6b00]/5 blur-3xl rounded-full group-hover:bg-[#ff6b00]/10 transition-colors"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#ff6b00] font-mono text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">{item.year}</span>
              {type === 'work' ? <Briefcase size={16} className="text-slate-600" /> : <BookOpen size={16} className="text-slate-600" />}
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none group-hover:text-[#ff6b00] transition-colors">
              {item.title}
            </h3>
            
            <p className="text-slate-200 font-serif italic text-lg opacity-80">
              {item.company}
            </p>
            
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Empty space for alignment */}
      <div className="hidden md:block w-[42%]" />
    </div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const timelineLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".about-header-text", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Animated drawing of the timeline center line
      gsap.fromTo(timelineLineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none", 
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1.5
          }
        }
      );

      // Skill categories reveal
      gsap.from(".skill-category", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Group skills for a more organized display
  const skillCategories = [
    { title: 'Backend Core', icon: Database, skills: SKILLS.filter(s => s.category === 'Backend' || s.category === 'Database') },
    { title: 'Cloud & Infrastructure', icon: Terminal, skills: SKILLS.filter(s => s.category === 'DevOps') },
    { title: 'Frontend Integration', icon: Code, skills: SKILLS.filter(s => s.category === 'Frontend') }
  ];

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen">
      
      {/* Section 1: Hero & Bio */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-0 opacity-20 blur-[120px] pointer-events-none">
          <div className="aspect-square w-full bg-[#ff6b00]/10 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <span className="about-header-text inline-block text-[#ff6b00] font-mono text-xs md:text-sm uppercase tracking-[0.5em] font-bold">The Profile</span>
              <h1 className="about-header-text text-6xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.8]">
                ARCHITECTING <br/> <span className="text-slate-700 font-serif italic font-light lowercase">digital</span> STRENGTH
              </h1>
            </div>

            <div className="about-header-text space-y-8 max-w-2xl">
              <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                With a deep focus on <span className="text-white font-medium">Laravel ecosystem</span> and distributed systems, I bridge the gap between complex business logic and high-performance server-side execution.
              </p>
              
              <div className="flex flex-wrap gap-8 py-6 border-y border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl text-[#ff6b00]">
                    <Award size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-tight">Lead Status</h4>
                    <p className="text-slate-500 text-xs font-mono">Senior Backend Eng.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl text-[#ff6b00]">
                    <Sparkles size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-tight">Laravel Expert</h4>
                    <p className="text-slate-500 text-xs font-mono">Artisan Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 about-header-text flex justify-center lg:justify-end">
            <div className="relative group max-w-[440px]">
              <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-1000 group-hover:scale-[1.03]">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200" 
                  alt="Portrait" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Stat Badge */}
              <div className="absolute -bottom-10 -right-6 bg-[#ff6b00] p-8 rounded-[2.5rem] shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <div className="text-black text-center space-y-1">
                  <span className="block text-4xl font-black tracking-tighter">7+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Years in <br/> Production</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Mastery */}
      <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <div className="space-y-4">
              <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.5em] block">Skillset Level</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">TECHNICAL <span className="text-[#ff6b00] font-serif italic font-light lowercase">proficiency</span></h2>
            </div>
            <div className="flex flex-col items-end gap-2 text-right">
               <div className="h-px w-32 bg-[#ff6b00] mb-2"></div>
               <p className="text-slate-500 max-w-xs font-light">My expertise spans the entire development lifecycle, with a heavy emphasis on architectural integrity.</p>
            </div>
          </div>

          <div className="skills-grid grid grid-cols-1 lg:grid-cols-3 gap-12">
            {skillCategories.map((cat, i) => (
              <div key={i} className="skill-category space-y-10 p-10 bg-black rounded-[3rem] border border-white/5 hover:border-[#ff6b00]/20 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="p-5 bg-white/5 rounded-2xl text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all">
                    <cat.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tighter">{cat.title}</h3>
                </div>
                
                <div className="space-y-8">
                  {cat.skills.map((skill, sIdx) => (
                    <SkillBar key={sIdx} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Professional Timeline (Modern Vertical) */}
      <section className="py-32 px-6 timeline-section relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-6">
             <Briefcase className="mx-auto text-[#ff6b00]" size={48} />
             <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">THE <span className="text-[#ff6b00] font-serif italic font-light lowercase">professional</span> JOURNEY</h2>
             <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em]">Chronological Evolution</p>
          </div>

          <div className="relative">
            {/* The Unified Central Line */}
            <div 
              ref={timelineLineRef}
              className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff6b00] via-orange-900 to-transparent origin-top z-0"
            />
            
            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <TimelineNode key={item.id} item={item} index={i} type="work" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Academic Foundation (Modern Vertical) */}
      <section className="py-32 px-6 bg-white/[0.02] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-6">
             <BookOpen className="mx-auto text-[#ff6b00]" size={48} />
             <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">ACADEMIC <span className="text-[#ff6b00] font-serif italic font-light lowercase">roots</span></h2>
             <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em]">Formal Engineering Education</p>
          </div>

          <div className="relative">
            {/* Academic timeline aesthetic line (faded) */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 z-0" />
            
            <div className="space-y-0">
              {EDUCATION.map((item, i) => (
                <TimelineNode key={item.id} item={item} index={i + 1} type="edu" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="inline-block p-6 bg-white/5 rounded-full text-[#ff6b00]">
            <Terminal size={48} />
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            I DON'T JUST WRITE CODE. <br/>
            <span className="text-[#ff6b00] font-serif italic font-light lowercase">I build engineering legacies.</span>
          </h2>
          <p className="text-xl md:text-3xl text-slate-500 font-light leading-relaxed">
            Every line of code I author is a commitment to scalability, security, and exceptional developer experience. 
          </p>
          <div className="pt-12">
            <button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="px-12 py-5 bg-[#ff6b00] text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,107,0,0.2)]"
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;