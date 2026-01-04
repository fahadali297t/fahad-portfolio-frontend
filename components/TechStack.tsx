import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Database, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Zap, 
  Terminal, 
  Cloud, 
  Box, 
  Shield 
} from 'lucide-react';
import {
  SiPhp,
  SiLaravel,
  SiMysql,
  SiRedis,
  SiAmazon,
  SiDocker,
  SiVuedotjs,
  SiRabbitmq,
  SiGnubash,
  SiAuth0,
} from "react-icons/si";


gsap.registerPlugin(ScrollTrigger);

// const TECH_ICONS = [
//   { Icon: Code2, label: 'PHP', color: 'text-indigo-500' },
//   { Icon: Layers, label: 'Laravel', color: 'text-[#ff6b00]' },
//   { Icon: Database, label: 'MySQL', color: 'text-blue-500' },
//   { Icon: Box, label: 'Redis', color: 'text-red-600' },
//   { Icon: Cloud, label: 'AWS', color: 'text-orange-400' },
//   { Icon: Cpu, label: 'Docker', color: 'text-blue-400' },
//   { Icon: Globe, label: 'Vue.js', color: 'text-emerald-500' },
//   { Icon: Zap, label: 'RabbitMQ', color: 'text-orange-600' },
//   { Icon: Terminal, label: 'Bash', color: 'text-slate-500' },
//   { Icon: Shield, label: 'OAuth2', color: 'text-purple-500' },
// ];
const TECH_ICONS = [
  { Icon: SiPhp, label: "PHP", color: "text-[#777BB4]" },
  { Icon: SiLaravel, label: "Laravel", color: "text-[#FF2D20]" },
  { Icon: SiMysql, label: "MySQL", color: "text-[#4479A1]" },
  { Icon: SiRedis, label: "Redis", color: "text-[#DC382D]" },
  { Icon: SiAmazon, label: "AWS", color: "text-[#FF9900]" },
  { Icon: SiDocker, label: "Docker", color: "text-[#2496ED]" },
  { Icon: SiVuedotjs, label: "Vue.js", color: "text-[#4FC08D]" },
  { Icon: SiRabbitmq, label: "RabbitMQ", color: "text-[#FF6600]" },
  { Icon: SiGnubash, label: "Bash", color: "text-[#4EAA25]" },
  { Icon: SiAuth0, label: "OAuth2", color: "text-[#3E7BFA]" },
];


const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.tech-item') as HTMLElement[];
      
      items.forEach((item, i) => {
        // Create a distinct "float" range for each item
        const movement = (i % 2 === 0 ? 80 : 130) + (Math.random() * 50);
        
        gsap.fromTo(item, 
          { y: -movement / 2, opacity: 0.2 },
          {
            y: movement / 2,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative bg-slate-50 dark:bg-slate-900/10 overflow-hidden min-h-[700px]"
    >
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="flex justify-between h-full px-4 max-w-7xl mx-auto">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-px h-full bg-slate-900 dark:bg-white"
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="text-center mb-24">
          <span className="text-[#ff6b00] font-mono text-sm uppercase tracking-widest font-bold">
            Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-2 mb-4">
            Built for Scale & Performance
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto italic">
            "High performance isn't just a metric; it's an architecture."
          </p>
        </div>

        {/* Structured Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          {TECH_ICONS.map(({ Icon, label, color }, i) => (
            <div
              key={i}
              className="tech-item flex flex-col items-center justify-center"
            >
              <div className="group relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff6b00]/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                  className={`relative p-8 rounded-3xl bg-white dark:bg-slate-950 
        border border-slate-200 dark:border-slate-800 
        shadow-sm transition-all duration-300 
        group-hover:border-[#ff6b00] 
        group-hover:shadow-xl group-hover:shadow-orange-500/10
        ${color}`}
                >
                  <Icon className="text-[40px]" />
                </div>

                <div className="mt-4 text-center">
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] 
        text-slate-400 dark:text-slate-500 
        group-hover:text-[#ff6b00] transition-colors"
                  >
                    {label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;