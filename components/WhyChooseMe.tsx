import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Zap, Layers, Cpu, Terminal as TerminalIcon, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ADVANTAGES = [
  {
    icon: Layers,
    title: "Domain Driven Design",
    description: "I don't just write scripts; I architect systems. Following DDD and SOLID principles to ensure your codebase remains maintainable as your business scales.",
    tag: "ARCHITECTURE",
    code: "namespace Domain\\Orders\\Services;"
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Every millisecond counts. From Eloquent query optimization to Redis caching strategies, I ensure your application responds with lightning speed.",
    tag: "LATENCY",
    code: "Cache::tags(['products'])->remember(...)"
  },
  {
    icon: ShieldCheck,
    title: "Bulletproof Security",
    description: "Middleware, rate limiting, and proactive vulnerability scanning. I build with a security-first mindset to protect your user data and platform integrity.",
    tag: "SECURITY",
    code: "Gate::authorize('update', $post);"
  },
  {
    icon: Cpu,
    title: "Cloud Native Dev",
    description: "Containerization with Docker and automated CI/CD pipelines. I bridge the gap between development and production for seamless deployments.",
    tag: "DEVOPS",
    code: "services:\n  app:\n    build: ."
  }
];

const WhyChooseMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".advantage-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".advantage-grid",
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#ff6b00]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-[#ff6b00] font-mono text-xs uppercase tracking-[0.5em] block">Beyond Features</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              WHY PARTNER WITH <br/>
              <span className="text-slate-700">AN ARTISAN?</span>
            </h2>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p className="text-slate-500 font-light leading-relaxed border-l border-white/10 pl-8">
              In a world of "good enough" code, I strive for technical excellence. I focus on the internal quality that users don't see, but businesses definitely feel.
            </p>
          </div>
        </div>

        <div className="advantage-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {ADVANTAGES.map((adv, i) => (
            <div 
              key={i}
              className="advantage-card group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 overflow-hidden transition-all duration-500 hover:bg-white/[0.05] hover:border-[#ff6b00]/30"
            >
              {/* Background Code Snippet Decoration */}
              <div className="absolute top-8 right-8 font-mono text-[8px] opacity-[0.03] select-none pointer-events-none group-hover:opacity-10 transition-opacity">
                <pre>{adv.code}</pre>
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 bg-white/5 rounded-2xl text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all duration-500">
                    <adv.icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-slate-600 group-hover:text-white transition-colors">{adv.tag}</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-[#ff6b00] transition-colors">{adv.title}</h3>
                  <p className="text-slate-500 group-hover:text-slate-300 transition-colors leading-relaxed">
                    {adv.description}
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <div className="h-px w-8 bg-[#ff6b00]"></div>
                  <span className="text-[10px] font-mono text-[#ff6b00] uppercase tracking-widest">Mastered Discipline</span>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[#ff6b00]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* Dynamic Counter / Stat Bar */}
        <div className="mt-24 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Lines Authored", value: "250K+" },
            { label: "Laravel Versions", value: "v5 → v11" },
            { label: "Avg Response", value: "<85ms" },
            { label: "Test Coverage", value: "98.5%" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;