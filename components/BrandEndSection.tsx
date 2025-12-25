
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BrandEndSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLSpanElement>(null);
  const textRightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const textLeft = textLeftRef.current;
    const textRight = textRightRef.current;

    if (!container || !card || !textLeft || !textRight) return;

    // Entry Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
      }
    });

    tl.from([textLeft, textRight], {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out"
    })
    .from(card, {
      scale: 0.8,
      opacity: 0,
      rotation: 0,
      duration: 1.5,
      ease: "expo.out"
    }, "-=0.8");

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      if (!card || !textLeft || !textRight) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      
      const moveX = (clientX - centerX) / 35;
      const moveY = (clientY - centerY) / 35;

      // Card follows mouse slightly
      gsap.to(card, {
        x: moveX,
        y: moveY,
        duration: 1.5,
        ease: "power2.out"
      });

      // Text moves in opposition for depth
      gsap.to(textLeft, {
        x: -moveX * 0.4,
        y: -moveY * 0.4,
        duration: 2,
        ease: "power2.out"
      });
      
      gsap.to(textRight, {
        x: -moveX * 0.4,
        y: -moveY * 0.4,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (cardRef.current) gsap.killTweensOf(cardRef.current);
      if (textLeftRef.current) gsap.killTweensOf(textLeftRef.current);
      if (textRightRef.current) gsap.killTweensOf(textRightRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.killTweensOf(cardRef.current);
      gsap.to(cardRef.current, {
        rotation: -4,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black min-h-[80vh] flex items-center justify-center overflow-hidden py-24"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6b00]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto px-4">
        
        {/* Large Centered Title */}
        <h2 className="text-[10vw] font-black tracking-tighter leading-none flex items-center select-none pointer-events-none">
          <span ref={textLeftRef} className="text-white inline-block">MICHE</span>
          <span className="w-[8vw]"></span> 
          <span ref={textRightRef} className="text-[#ff6b00] inline-block">ONSON</span>
        </h2>

        {/* Floating Tilted Card */}
        <div 
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute z-10 w-[180px] md:w-[300px] aspect-[3/4] rounded-[2rem] bg-[#1a1a1a] border-[8px] border-[#222] shadow-[0_0_80px_rgba(255,107,0,0.12)] overflow-hidden cursor-pointer origin-center"
          style={{ transform: 'rotate(-4deg)' }}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
            alt="Portrait" 
            className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700 scale-110"
          />
        </div>

      </div>
    </section>
  );
};

export default BrandEndSection;
