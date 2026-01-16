import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../constants';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Database, 
  Layers, 
  Terminal, 
  Globe 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === Number(id));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      // Hero Title Animation
      gsap.from(".hero-title-part", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      });

      // Reveal Animations for sections
      const reveals = gsap.utils.toArray('.reveal-on-scroll');
      reveals.forEach((el: any) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        });
      });
      
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [service]);

  if (!service) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link to="/services" className="text-[#ff6b00] hover:underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      
      {/* Dynamic Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed top-24 left-8 z-50 p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-[#ff6b00] hover:text-black transition-all group hidden md:flex"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Hero Header Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          {/* <img 
            src={service.bgImage} 
            className="w-full h-full object-cover grayscale opacity-30"
            alt={service.title}
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="hero-title-part text-[#ff6b00] font-mono text-xs uppercase tracking-[0.6em] block mb-8 font-bold">Specialized Solution</span>
          <h1 className="hero-title-part text-6xl md:text-[9rem] font-black tracking-tighter uppercase leading-[0.8] mb-12">
            {service.title.split(' ')[0]} <br/> 
            <span className="text-slate-500 font-serif italic font-light lowercase">
               {service.title.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <div className="hero-title-part flex justify-center gap-4 flex-wrap">
             {service.relatedTech.map((tech, i) => (
               <span key={i} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-slate-400">
                 {tech}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-10 reveal-on-scroll">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">THE <span className="text-[#ff6b00] font-serif italic font-light lowercase">backend</span> PHILOSOPHY</h2>
               <div className="h-px w-24 bg-[#ff6b00]"></div>
            </div>
            <p className="text-xl md:text-3xl text-slate-400 font-light leading-relaxed">
              {service.fullDescription}
            </p>
          </div>
          
          <div className="lg:col-span-4 reveal-on-scroll">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-8">
              <h4 className="text-sm font-mono text-[#ff6b00] uppercase tracking-widest font-bold">Key Focus Areas</h4>
              <ul className="space-y-6">
                 {service.capabilities.map((cap, i) => (
                   <li key={i} className="flex gap-4 group">
                      <div className="mt-1">
                        <ChevronRight size={16} className="text-[#ff6b00] group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{cap.title}</span>
                   </li>
                 ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 space-y-12 reveal-on-scroll">
            <div className="space-y-4">
              <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.5em] block">Methodology</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">MY <br/> <span className="text-[#ff6b00] font-serif italic font-light lowercase">approach</span></h2>
            </div>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Engineering isn't just about code—it's about the process. I follow a rigorous methodology to ensure every line written adds measurable value.
            </p>
            <div className="pt-8">
               <div className="p-8 bg-[#ff6b00]/10 rounded-[2rem] border border-[#ff6b00]/20 text-center">
                  <span className="text-3xl font-black text-[#ff6b00] block mb-2">100%</span>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Commitment to Architecture Integrity</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            {service.process.map((step, i) => (
              <div key={i} className="reveal-on-scroll group p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-[#ff6b00]/40 transition-all flex flex-col md:flex-row gap-8 items-start">
                 <span className="text-4xl font-black text-slate-800 group-hover:text-[#ff6b00] transition-colors">{step.step}</span>
                 <div className="space-y-2">
                    <h4 className="text-2xl font-bold uppercase tracking-tight">{step.title}</h4>
                    <p className="text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed">
                      {step.desc}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Impact CTA Section */}
      <section className="relative py-40 px-6 overflow-hidden">
        {/* Animated Background Atmosphere */}
        <div className="absolute inset-0 bg-[#080808]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff6b00]/10 blur-[150px] rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
               NEED EXPERT <br/>
               <span className="text-[#ff6b00] font-serif italic font-light lowercase">
                 {service.title.toLowerCase()}?
               </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              Let's architect a solution that drives your product forward. I'm currently accepting new projects.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
             <Link 
               to="/contact"
               className="group flex items-center gap-6 px-12 py-6 bg-[#ff6b00] text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,107,0,0.2)]"
             >
               <span>Hire for {service.title}</span>
               <ArrowUpRight size={28} className="group-hover:rotate-45 transition-transform" />
             </Link>
             <button 
               onClick={() => navigate('/services')}
               className="px-12 py-6 border border-white/20 rounded-full font-bold text-lg hover:bg-white/5 transition-all"
             >
               Explore Other Services
             </button>
          </div>
          
          <div className="pt-12 flex justify-center items-center gap-8 text-[10px] font-mono uppercase tracking-[0.4em] text-slate-600">
             <span className="h-px w-12 bg-white/10"></span>
             <span>Trusted by Global Architects</span>
             <span className="h-px w-12 bg-white/10"></span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;