import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PROJECTS } from "../constants";
import { Link } from "react-router-dom";

const ProjectCarousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // We double the projects to create a seamless loop
  const displayProjects = [...PROJECTS, ...PROJECTS];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      let totalWidth = 0;

      const initLoop = () => {
        if (tweenRef.current) tweenRef.current.kill();

        totalWidth = marquee.scrollWidth / 2;
        gsap.set(marquee, { x: 0 });

        // Infinite Linear Scroll
        tweenRef.current = gsap.to(marquee, {
          x: -totalWidth,
          duration: 100, // Elegant slow speed
          ease: "none",
          repeat: -1,
          force3D: true,
          overwrite: "auto",
        });
      };

      initLoop();

      // Subtle floaty hover effect for the entire marquee
      gsap.to(".carousel-card", {
        y: "-=10",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          from: "random",
        },
      });

      window.addEventListener("resize", initLoop);
      return () => window.removeEventListener("resize", initLoop);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, {
        timeScale: isPaused ? 0 : 1,
        duration: 1.2, // Heavy inertia
        ease: "power2.out",
      });
    }
  }, [isPaused]);

  return (
    <div
      ref={containerRef}
      className="py-12 bg-black overflow-hidden select-none relative"
    >
      {/* Background Decorative Header - Minimalist */}
      {/* <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-center opacity-40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-slate-800"></div>
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-slate-500 font-black">
            Production Artifacts
          </span>
          <div className="w-12 h-[1px] bg-slate-800"></div>
        </div>
      </div> */}

      {/* Marquee Wrapper */}
      <div
        className="relative flex whitespace-nowrap will-change-transform"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={marqueeRef} className="flex gap-10 px-6">
          {displayProjects.map((project, idx) => (
            <Link
              key={`${project.id}-${idx}`}
              to={`/projects/${project.id}`}
              className="carousel-card flex-shrink-0 w-[85vw] md:w-[600px] inline-block"
            >
              {/* Card Container inspired by the visual reference */}
              <div className="group relative bg-[#e5e7eb] rounded-[1rem] h-[450px] md:h-[650px] flex items-center justify-center overflow-hidden transition-all duration-700 hover:bg-[#f3f4f6] hover:shadow-[0_60px_100px_rgba(0,0,0,0.4)]">
                {/* 90% Image Mockup Display */}
                <div className="relative w-[92%] h-[92%] bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-1000 group-hover:scale-[1.03] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] border border-black/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                    loading="lazy"
                  />

                  {/* Subtle glass overlay for that "mockup" depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none"></div>
                </div>

                {/* Technical Grain/Texture Overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "radial-gradient(#000 1.5px, transparent 1.5px)",
                    backgroundSize: "40px 40px",
                  }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </div>
  );
};

export default ProjectCarousel;
