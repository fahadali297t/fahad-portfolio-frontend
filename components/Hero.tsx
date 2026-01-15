import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowUpRight,
  Code2,
  Database,
  Terminal,
  Box,
  Server,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";

const Hero: React.FC = () => {
  const devImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Typography Reveal
      const titleChars = titleRef.current?.querySelectorAll(".char");
      if (titleChars) {
        gsap.from(titleChars, {
          y: 120,
          opacity: 0,
          rotateX: -90,
          stagger: 0.04,
          duration: 1.4,
          ease: "expo.out",
        });
      }

      gsap.from(".hero-fade-in", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.4,
      });

      // 2. Developer Image Float
      gsap.to(".dev-avatar-wrapper", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Parallax Interaction
      const handleMouseMove = (e: MouseEvent) => {
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(".floating-asset", {
          x: xPercent * 30,
          y: yPercent * 30,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.02,
        });

        if (devImageRef.current) {
          gsap.to(devImageRef.current, {
            rotateY: xPercent * 10,
            rotateX: -yPercent * 10,
            duration: 0.8,
            ease: "power3.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Responsive spread calculation
    const isMobile = window.innerWidth < 768;
    const spreadX = isMobile
      ? [100, -100, 80, -80, 0]
      : [260, -260, 240, -240, 0];
    const spreadY = isMobile
      ? [-100, -100, -160, -160, -200]
      : [-160, -160, 50, 50, -320];

    if (isHovered) {
      gsap.to(".tech-popper-icon", {
        opacity: 1,
        scale: 1,
        x: (i) => spreadX[i],
        y: (i) => spreadY[i],
        rotate: (i) => i * 15 - 30,
        duration: 0.8,
        stagger: 0.05,
        ease: "elastic.out(1, 0.6)",
      });
      gsap.to(".dev-aura", {
        scale: 1.4,
        opacity: 0.3,
        duration: 1,
      });
    } else {
      gsap.to(".tech-popper-icon", {
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.4,
        ease: "power3.in",
      });
      gsap.to(".dev-aura", {
        scale: 1,
        opacity: 0.1,
        duration: 1,
      });
    }
  }, [isHovered]);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const popperIcons = [
    { Icon: Layers, color: "text-[#ff6b00]", label: "Laravel" },
    { Icon: Database, color: "text-blue-500", label: "Postgres" },
    { Icon: Box, color: "text-red-500", label: "Redis" },
    { Icon: Cpu, color: "text-emerald-500", label: "Docker" },
    { Icon: Zap, color: "text-yellow-500", label: "Octane" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 lg:py-0 overflow-hidden">
      {/* Floating Background Technical Symbols */}
      <div className="absolute top-[20%] left-[8%] floating-asset opacity-5 dark:opacity-10 pointer-events-none">
        <Terminal size={140} strokeWidth={0.5} />
      </div>
      <div className="absolute bottom-[25%] right-[12%] floating-asset opacity-5 dark:opacity-10 pointer-events-none">
        <Server size={180} strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-12">
          <div className="hero-fade-in">
            <span className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.6em] font-black">
              <div className="w-12 h-px bg-[#ff6b00]"></div>
              Hi there , I am
            </span>
          </div>

          <div className="space-y-4 perspective-1000">
            <h1
              ref={titleRef}
              className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] text-slate-900 dark:text-white uppercase overflow-hidden"
            >
              {splitText("Fahad")}
            </h1>
            <h1 className="text-7xl md:text-9xl font-serif italic text-[#ff6b00] leading-[0.8] tracking-tight hero-fade-in relative">
              Ali
              <span className="absolute -top-4 -right-8 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest opacity-40">
                v.23.0.0
              </span>
            </h1>
          </div>

          <p className="hero-fade-in text-slate-600 dark:text-slate-400 text-lg md:text-2xl max-w-xl leading-relaxed font-light">
            Engineering{" "}
            <span className="text-slate-900 dark:text-white font-medium italic underline decoration-[#ff6b00]/40">
              high-performance
            </span>{" "}
            logical engines and distributed systems that scale without
            compromise.
          </p>

          <div className="hero-fade-in flex flex-col space-y-10">
            <div className="flex items-center space-x-5">
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ff6b00]"></span>
              </div>
              <span className="text-xs font-mono font-black tracking-[0.3em] text-slate-500 dark:text-slate-400 uppercase">
                Status: Accepting High-Traffic Projects
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="
    group relative flex items-center justify-center gap-4
    px-6 py-4 sm:px-8 sm:py-4 md:px-12 md:py-6
    bg-[#ff6b00] text-black rounded-full font-black
    text-sm sm:text-base uppercase tracking-widest
    transition-all duration-300 ease-out
    hover:scale-[1.03] active:scale-95
    shadow-[0_0_40px_rgba(255,107,0,0.25)]
  "
              >
                <span>Start Collaboration</span>

                <ArrowUpRight
                  size={22}
                  className="
      transition-transform duration-300 ease-out
      group-hover:translate-x-1 group-hover:-translate-y-1
      md:group-hover:rotate-45
    "
                />

                {/* Hover Ring */}
                <span
                  className="
      pointer-events-none absolute inset-0 rounded-full
      border border-white/30
      opacity-0 scale-110
      group-hover:opacity-100 group-hover:scale-100
      transition-all duration-500 ease-out
    "
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end perspective-2000 relative pt-20 lg:pt-0">
          {/* Tech Popper Icons - Moved to z-20 to ensure visibility and prevent clipping */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            {popperIcons.map((item, i) => {
              const Icon = item.Icon;
              return (
                <div
                  key={i}
                  className="tech-popper-icon absolute opacity-0 scale-0 p-5 bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col items-center gap-2"
                >
                  <Icon className={item.color} size={32} />
                  <span className="text-[8px] font-mono font-black uppercase text-slate-900 dark:text-white/60 tracking-widest">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            ref={devImageRef}
            className="dev-avatar-wrapper relative group cursor-pointer z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="dev-aura absolute inset-0 bg-[#ff6b00] blur-[100px] rounded-full opacity-10 pointer-events-none transition-all duration-700"></div>

            <div className="relative w-[320px] sm:w-[420px] aspect-[4/5] rounded-[4rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl transition-all duration-700 group-hover:shadow-[#ff6b00]/20 bg-slate-200 dark:bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                alt="Professional Backend Developer"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />

              <div className="absolute bottom-10 left-10 p-5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-3 mb-2">
                  <Code2 className="text-[#ff6b00]" size={18} />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-white">
                    PHP // LARAVEL
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-[#ff6b00]"></div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-[#ff6b00]/40 rounded-tr-[4rem] pointer-events-none"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-[#ff6b00]/40 rounded-bl-[4rem] pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer group flex flex-col items-center gap-4"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <div className="w-8 h-14 border-2 border-slate-900/10 dark:border-white/10 rounded-full flex justify-center p-1.5 relative overflow-hidden">
          <div className="w-1 h-3 bg-[#ff6b00] rounded-full animate-scroll-dot"></div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll-dot {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(24px); opacity: 0; }
        }
        .animate-scroll-dot {
          animation: scroll-dot 2.2s infinite ease-in-out;
        }
      `,
        }}
      />
    </section>
  );
};

export default Hero;
