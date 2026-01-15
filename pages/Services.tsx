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
  Terminal,
  Server,
  Activity,
  MousePointer2,
} from "lucide-react";
import { SERVICES } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard: React.FC<{ service: any; index: number }> = ({
  service,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Entrance Animation on Scroll
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100,
        rotateX: -15,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 1.2,
        delay: index * 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 3D Tilt Effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(el, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });

    // Cursor Follow Glow
    gsap.to(glow, {
      left: x,
      top: y,
      opacity: 0.15,
      duration: 0.5,
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });

    gsap.to(glow, {
      opacity: 0,
      duration: 0.5,
    });
  };

  const IconMap: { [key: string]: any } = {
    Code2: Code2,
    Database: Database,
    Cpu: Cpu,
    Layers: Layers,
    Shield: Shield,
    Zap: Zap,
    Server: Server,
    Activity: Activity,
  };

  const IconComponent = IconMap[service.icon] || Code2;

  return (
    <Link
      to={`/services/${service.id}`}
      className="group block perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full flex flex-col p-8 md:p-12 bg-[#080808] border border-white/5 rounded-[2.5rem] transition-colors duration-500 hover:border-[#ff6b00]/30 overflow-hidden shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Interactive Mouse Glow */}
        <div
          ref={glowRef}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff6b00] blur-[100px] rounded-full pointer-events-none opacity-0 transition-opacity duration-500 z-0"
        />

        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
          <div className="grid grid-cols-6 h-full border-x border-white/10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full"></div>
            ))}
          </div>
        </div>

        <div
          className="relative z-10 space-y-10 flex flex-col h-full"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all duration-500 shadow-xl group-hover:shadow-[#ff6b00]/20">
              <IconComponent size={40} strokeWidth={1.5} />
            </div>
            {/* <div className="text-right">
              <span className="block text-[10px] font-mono text-slate-700 font-bold uppercase tracking-[0.3em] group-hover:text-white/40 transition-colors">
                Module // 0{index + 1}
              </span>
              <span className="block text-[8px] font-mono text-slate-800 uppercase tracking-widest mt-1">
                Status: Operational
              </span>
            </div> */}
          </div>

          {/* Title & Desc */}
          <div className="space-y-6">
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.85] group-hover:text-[#ff6b00] transition-colors duration-500">
              {service.title.split(" ")[0]} <br />
              <span className="text-2xl md:text-3xl font-serif italic font-light text-slate-600 group-hover:text-white transition-colors duration-500 lowercase">
                {service.title.split(" ").slice(1).join(" ")}
              </span>
            </h3>
            <p className="text-slate-500 text-base leading-relaxed font-light group-hover:text-slate-300 transition-colors duration-500 max-w-sm">
              {service.description}
            </p>
          </div>

          {/* Detailed Features (Brief) */}
          <div className="grid grid-cols-2 gap-4 pt-6 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
            {service.capabilities.slice(0, 2).map((cap: any, i: number) => (
              <div key={i} className="space-y-1">
                <span className="block text-[8px] font-mono font-bold text-[#ff6b00] uppercase tracking-widest">
                  {cap.title}
                </span>
                <div className="h-0.5 w-8 bg-white/10 rounded-full group-hover:bg-[#ff6b00]/30 transition-colors"></div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="mt-auto pt-10 flex justify-between items-end">
            <div className="flex flex-wrap gap-2">
              {service.relatedTech
                .slice(0, 3)
                .map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono text-slate-700 uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:text-[#ff6b00] group-hover:border-[#ff6b00]/10 transition-all"
                  >
                    {tech}
                  </span>
                ))}
            </div>
            <div className="relative group/btn">
              <div className="absolute inset-0 bg-[#ff6b00] blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[#ff6b00] group-hover:text-black group-hover:rotate-45 transition-all duration-500">
                <ArrowUpRight size={24} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Background Parallex
      gsap.to(".bg-decoration", {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Header Stagger
      gsap.from(".header-reveal", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen pt-32 pb-0 px-6 overflow-hidden"
    >
      {/* Immersive Background Decorations */}
      <div className="bg-decoration fixed top-[-10%] left-[-10%] w-[50vw] aspect-square bg-[#ff6b00]/5 blur-[180px] rounded-full pointer-events-none z-0"></div>
      <div className="bg-decoration fixed bottom-[-10%] right-[-10%] w-[30vw] aspect-square bg-orange-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-32">
        {/* Page Header */}
        <header className="space-y-6 sm:space-y-10 md:space-y-12 lg:space-y-16 pt-4 ">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl">
            <div className="header-reveal flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="w-8 sm:w-10 md:w-12 h-px bg-[#ff6b00]"></div>
              <span className="text-[7px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-[#ff6b00] font-bold"></span>
            </div>
            <h1 className="header-reveal text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference">
              Professional <br />
              <span className="text-slate-500 font-serif italic font-light lowercase">
                Services
              </span>
              {/* <span className="ml-1.5 sm:ml-2 md:ml-4">GUIDES</span> */}
            </h1>
            <p className="header-reveal text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-500 font-light leading-relaxed max-w-3xl">
              From WordPress websites to fully custom web applications, I
              deliver secure, high-quality solutions tailored to real business
              needs.
            </p>
          </div>
        </header>
        {/* Services Grid with Custom Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
        {/* Philosophy Callout with Floating Element */}
        <section className="relative py-0 text-center space-y-16">
          <div className="bg-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff6b00]/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="relative group inline-block">
            <div className="absolute -inset-8 bg-[#ff6b00]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative w-24 h-24 mx-auto bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center text-[#ff6b00] rotate-12 group-hover:rotate-0 transition-all duration-700 shadow-2xl">
              <Terminal size={48} strokeWidth={1} />
            </div>
          </div>

          <div className="space-y-8 relative">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              ENGINEERED FOR <br />{" "}
              <span className="text-[#ff6b00] font-serif italic font-light lowercase">
                maximum impact
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed">
              I don't just ship features; I deliver technical artifacts that
              serve as the high-stakes foundation for multi-million dollar
              digital platforms.
            </p>
          </div>

          <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8">
            {/* Primary CTA */}
            <Link
              to="/contact"
              className="
      group relative overflow-hidden
      px-8 py-4 sm:px-12 sm:py-6 md:px-16 md:py-8
      bg-[#ff6b00] text-black rounded-full font-black
      text-base sm:text-xl md:text-2xl
      shadow-[0_0_40px_rgba(255,107,0,0.25)]
      transition-all duration-300 ease-out
      hover:scale-[1.03] active:scale-95
    "
            >
              <span className="relative z-10">Start Your Project</span>

              {/* Glow Ring */}
              <span
                className="
        pointer-events-none absolute inset-0 rounded-full
        border-2 sm:border-4 border-[#ff6b00]
        opacity-0 group-hover:opacity-40
        transition-opacity duration-500
      "
              />

              {/* Gradient Glow */}
              <span
                className="
        pointer-events-none absolute -inset-1
        bg-gradient-to-r from-yellow-400 via-orange-600 to-red-500
        opacity-0 group-hover:opacity-30
        blur-xl
        transition-opacity duration-700
      "
              />
            </Link>

            {/* Secondary CTA */}
            
          </div>
        </section>
        {/* Engineering Principles Ribbon */}
        {/* <section className="py-20 mt-2 border-y border-white/5 overflow-hidden">
          <div className="flex gap-20 animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-8 text-[10px] font-mono text-slate-700 uppercase tracking-[0.5em] font-bold"
              >
                <span>Scalable Infrastructure</span>
                <div className="w-2 h-2 rounded-full bg-[#ff6b00]"></div>
                <span>Secure Protocol</span>
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                <span>High Availability</span>
                <div className="w-2 h-2 rounded-full bg-[#ff6b00]"></div>
                <span>Elastic Compute</span>
              </div>
            ))}
          </div>
        </section> */}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `,
        }}
      />
    </div>
  );
};

export default Services;
