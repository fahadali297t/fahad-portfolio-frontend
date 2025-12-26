import React, { useEffect, useRef } from "react";

const BrandEndSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLSpanElement>(null);
  const textRightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const textLeft = textLeftRef.current;
    const textRight = textRightRef.current;

    if (!card || !textLeft || !textRight) return;

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;

      const moveX = (clientX - centerX) / 35;
      const moveY = (clientY - centerY) / 35;

      // Card follows mouse slightly
      card.style.transform = `translate(${moveX}px, ${moveY}px) rotate(-4deg)`;

      // Text moves in opposition for depth
      textLeft.style.transform = `translate(${-moveX * 0.4}px, ${
        -moveY * 0.4
      }px)`;
      textRight.style.transform = `translate(${-moveX * 0.4}px, ${
        -moveY * 0.4
      }px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.4s ease-out";
      cardRef.current.style.transform = "scale(1.05) rotate(-4deg)";
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out";
      cardRef.current.style.transform = "scale(1) rotate(-4deg)";
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-black  mx-auto min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative flex items-center max-w-[90vw] justify-center w-full max-w-7xl mx-auto px-4">
        {/* Large Centered Title */}
        <h2 className="text-[10vw] sm:text-[12vw] md:text-[7vw] font-black tracking-tighter leading-none flex items-center select-none pointer-events-none relative z-0">
          <span
            ref={textLeftRef}
            className="text-white inline-block transition-transform duration-1000 ease-out"
          >
            MICHE
          </span>
          <span className="w-[12vw] sm:w-[10vw] md:w-[8vw]"></span>
          <span
            ref={textRightRef}
            className="text-orange-500 inline-block transition-transform duration-1000 ease-out"
          >
            ONSON
          </span>
        </h2>

        {/* Floating Tilted Card */}
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute z-20 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[200px] aspect-[3/4] rounded-[2rem] bg-neutral-900 border-[8px] border-neutral-800 shadow-[0_0_80px_rgba(255,107,0,0.15)] overflow-hidden cursor-pointer origin-center transition-transform duration-1000 ease-out"
          style={{ transform: "rotate(-4deg)" }}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>

          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
            alt="Portrait"
            className="w-full h-full object-cover transition-all duration-700 scale-110"
            style={{ filter: "grayscale(0.3)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "grayscale(0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "grayscale(0.3)";
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BrandEndSection;
