import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Code2,
  Database,
  Cpu,
  Layers,
  Shield,
  Zap,
} from "lucide-react";
import { SERVICES } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard: React.FC<{ service: any; index: number }> = ({
  service,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
      }
    );
  }, [index]);

  const IconMap: { [key: string]: any } = {
    Code2: Code2,
    Database: Database,
    Cpu: Cpu,
    Layers: Layers,
    Shield: Shield,
    Zap: Zap,
  };

  const IconComponent = IconMap[service.icon] || Code2;
  const titleParts = service.title.split(" ");

  return (
    <Link
      to={`/services/${service.id}`}
      className="group block h-full outline-none"
    >
      <div
        ref={cardRef}
        className="relative h-full flex flex-col p-10 bg-[#0a0a0a] border border-white/5 rounded-[1rem] lg:rounded-[3rem] transition-all duration-700 group-hover:border-[#ff6b00]/40 group-hover:bg-white/[0.02] shadow-2xl overflow-hidden"
      >
        {/* Background Image Overlay on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
          <img
            src={service.bgImage}
            alt=""
            className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000"
          />
        </div>

        <div className="relative z-10 space-y-8 flex flex-col h-full">
          {/* Icon Header */}
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-[#ff6b00]/20">
              <IconComponent size={32} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-mono text-slate-700 font-bold uppercase tracking-widest group-hover:text-white/40 transition-colors">
              0{index + 1}
            </span>
          </div>

          {/* Service Title */}
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none group-hover:text-[#ff6b00] transition-colors duration-500">
              {titleParts[0]} <br />
              <span className="text-xl md:text-2xl font-serif italic font-light text-slate-500 group-hover:text-white transition-colors duration-500 lowercase">
                {titleParts.slice(1).join(" ")}
              </span>
            </h3>
            <p className="text-slate-500 text-base leading-relaxed font-light line-clamp-3 group-hover:text-slate-300 transition-colors duration-500">
              {service.description}
            </p>
          </div>

          {/* Footer Action */}
          <div className="mt-auto pt-10 flex justify-between items-center">
            <div className="flex gap-2">
              {service.relatedTech
                .slice(0, 2)
                .map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono text-slate-700 uppercase tracking-widest border border-white/5 px-2 py-1 rounded-md group-hover:text-[#ff6b00] group-hover:border-[#ff6b00]/20 transition-all"
                  >
                    {tech}
                  </span>
                ))}
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[#ff6b00] group-hover:text-black group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen pt-24 pb-40 px-6"
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Page Header */}
        <div className="relative space-y-12">
          <div className="bg-circle absolute top-[-50%] right-[-10%] w-[40vw] aspect-square bg-[#ff6b00]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

          <div className="relative z-10 space-y-6 max-w-7xl">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono uppercase tracking-[0.5em] text-[#ff6b00] font-bold">
                The Offering
              </span>
              <div className="h-px flex-grow bg-white/10"></div>
            </div>
            <h1 className="text-6xl  md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8]">
              SELECTED <br />
            </h1>
            <h1 className="text-6xl text-right md:text-[8vw] font-black tracking-tighter uppercase leading-[0.8]">
              <span className="ml-4"> SERVICES</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-500 font-light leading-relaxed max-w-2xl">
              High-performance backend ecosystems designed for massive scale and
              uncompromising technical integrity.
            </p>
          </div>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-12 relative z-10">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Philosophy Callout */}
        <section className="pt-40 text-center space-y-12">
          <div className="w-20 h-20 mx-auto bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-[#ff6b00] rotate-12 hover:rotate-0 transition-transform duration-700">
            <Zap size={40} />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              ENGINEERED FOR <br />{" "}
              <span className="text-[#ff6b00] font-serif italic font-light lowercase">
                impact
              </span>
            </h2>
            <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
              I don't just ship features; I deliver technical artifacts that
              serve as the foundation for multi-million dollar platforms.
            </p>
          </div>
          <div className="pt-8">
            <Link
              to="/contact"
              className="px-10 py-6 bg-[#ff6b00] text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,107,0,0.2)]"
            >
              Start Architecting
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
