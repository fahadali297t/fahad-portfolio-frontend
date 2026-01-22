import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, Zap, ShieldCheck, Globe, Cpu } from "lucide-react";

const HighImpactCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const btn = buttonRef.current;
    if (!container || !btn) return;

    const ctx = gsap.context(() => {
      // Magnetic Button Effect
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - btnX, e.clientY - btnY);
        const threshold = 150;

        if (dist < threshold) {
          const x = (e.clientX - btnX) * 0.35;
          const y = (e.clientY - btnY) * 0.35;
          gsap.to(btn, { x, y, duration: 0.4, ease: "power2.out" });
        } else {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
        }
      };

      // Floating particles in the background
      gsap.to(".cta-particle", {
        y: "-=30",
        opacity: 0.4,
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "random",
        },
      });

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 sm:py-48 px-6 bg-black overflow-hidden border-t border-white/5"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-yellow-500/5 blur-[150px] rounded-full opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute top-12 left-12 opacity-20 hidden lg:block">
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] font-black">
          <Cpu size={14} className="text-yellow-500" />
          <span>Core Protocol v.2024</span>
        </div>
      </div>
      <div className="absolute bottom-12 right-12 opacity-20 hidden lg:block text-right">
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em] font-black">
          <span>Global Availability: 99.9%</span>
          <Globe size={14} className="text-blue-500" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-16">
          {/* Status Badge */}
          <div className="flex items-center gap-3 px-6 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full animate-pulse shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308]"></div>
            <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-[0.3em] font-black">
              Accepting Strategic Projects
            </span>
          </div>

          {/* High-Impact Copy */}
          <div className="space-y-6 max-w-5xl">
            <h2 className="text-5xl sm:text-8xl md:text-[10vw] font-black tracking-tighter uppercase leading-[0.8] text-white">
              STOP BUILDING <br />
              <span className="text-yellow-500 font-serif italic font-light lowercase text-4xl sm:text-[8vw]">
                websites.
              </span>
              <span className="ml-2 sm:ml-4">START</span> <br />
              ARCHITECTING{" "}
              <span className="text-slate-800 font-serif italic font-light lowercase">
                impact.
              </span>
            </h2>
            <p className="text-lg sm:text-2xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed">
              Transition from legacy bottlenecks to high-performance,
              distributed reality. I don't just write code; I engineer business
              success through technical integrity.
            </p>
          </div>

          {/* The Magnetic Button */}
          <div className="relative py-12">
            <button
              ref={buttonRef}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-white rounded-full text-black transition-transform duration-300"
            >
              {/* Spinning Ring */}
              <div
                className={`absolute inset-[-15px] border border-dashed border-yellow-500/30 rounded-full animate-spin-slow ${isHovered ? "scale-110 border-yellow-500/60" : "scale-100"} transition-all duration-700`}
              ></div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500 shadow-2xl">
                  <ArrowUpRight
                    size={32}
                    strokeWidth={2.5}
                    className="group-hover:rotate-45 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-black uppercase tracking-[0.2em] mb-1">
                    Book Your Discovery
                  </span>
                  <span className="block text-[10px] font-mono uppercase text-slate-400 font-bold group-hover:text-black transition-colors">
                    EST. PROJECT VALUE: HIGH
                  </span>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-yellow-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 border-t border-white/5 w-full">
            <div className="flex flex-col items-center gap-3 group">
              <Zap
                size={24}
                className="text-yellow-500 opacity-40 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black group-hover:text-slate-400 transition-colors">
                Sub-100ms Latency
              </span>
              <div className="h-px w-8 bg-yellow-500/20 group-hover:w-full transition-all duration-700"></div>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <ShieldCheck
                size={24}
                className="text-blue-500 opacity-40 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black group-hover:text-slate-400 transition-colors">
                Zero-Trust Security
              </span>
              <div className="h-px w-8 bg-blue-500/20 group-hover:w-full transition-all duration-700"></div>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <Cpu
                size={24}
                className="text-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black group-hover:text-slate-400 transition-colors">
                Elastic Scalability
              </span>
              <div className="h-px w-8 bg-emerald-500/20 group-hover:w-full transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Floating Nodes */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="cta-particle absolute w-1 h-1 bg-yellow-500 rounded-full opacity-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px #eab308",
          }}
        ></div>
      ))}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `,
        }}
      />
    </section>
  );
};

export default HighImpactCTA;
