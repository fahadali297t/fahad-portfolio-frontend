import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS, EnhancedTestimonial } from "../constants";
import { Quote, ShieldCheck, Activity, Globe, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard: React.FC<{
  testimonial: EnhancedTestimonial;
  index: number;
}> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden hover:border-[#ff6b00]/30 transition-all duration-700 h-full"
    >
      {/* Background HUD Accents */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        <span className="text-8xl font-black italic text-white uppercase leading-none select-none tracking-tighter">
          0{testimonial.id}
        </span>
      </div>

      <div className="relative z-10 space-y-8">
        {/* Dossier Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#ff6b00]/30 transition-colors">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white tracking-tight">
                {testimonial.name}
              </h4>
              <p className="text-[10px] font-mono text-[#ff6b00] uppercase tracking-widest font-black">
                {testimonial.role}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[8px] font-mono text-green-500 uppercase font-black">
                Verified
              </span>
            </div>
            <span className="text-[8px] font-mono text-slate-800 uppercase tracking-widest">
              {testimonial.verificationCode}
            </span>
          </div>
        </div>

        {/* The Quote */}
        <div className="relative">
          <Quote
            className="absolute -top-4 -left-6 text-white opacity-5 group-hover:text-[#ff6b00]/10 transition-colors"
            size={64}
          />
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed italic group-hover:text-slate-200 transition-colors relative z-10">
            "{testimonial.content}"
          </p>
        </div>
      </div>

      {/* Impact Footer */}
      <div className="relative z-10 mt-12 pt-8 border-t border-white/5 flex items-end justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-slate-700" />
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em] font-black">
              {testimonial.industry} Dossier
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-slate-700 uppercase tracking-widest mb-1">
              Impact Metric
            </span>
            <div className="flex items-center gap-3">
              <Activity size={18} className="text-[#ff6b00]" />
              <span className="text-2xl font-black text-white group-hover:text-[#ff6b00] transition-colors">
                {testimonial.impactMetric}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center group/check">
          <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-slate-800 group-hover:text-green-500 group-hover:border-green-500/20 group-hover:bg-green-500/5 transition-all">
            <CheckCircle size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trust-header-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".trust-header",
          start: "top 85%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 bg-black relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <header className="trust-header mb-24 space-y-10">
          <div className="flex items-center gap-4 trust-header-reveal">
            <div className="w-12 h-12 bg-[#ff6b00]/10 rounded-2xl flex items-center justify-center text-[#ff6b00] border border-[#ff6b00]/20">
              <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#ff6b00] font-black block">
                Verification Engine
              </span>
              <p className="text-[8px] text-slate-700 font-mono tracking-widest uppercase">
                Encryption Status: AES-256
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="trust-header-reveal text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                TRUSTED <br />
                <span className="text-slate-800 font-serif italic font-light lowercase">
                  Clients
                </span>
                <span className="ml-2">Reviews</span>
              </h2>
            </div>
            <div className="lg:col-span-4 pb-2 trust-header-reveal">
              <p className="text-slate-500 text-lg font-light leading-relaxed border-l border-white/10 pl-8">
                Validated feedback from industry leaders and technical
                architects who have integrated my engineered systems.
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Footer Statistics Bar */}
        {/* <div className="mt-32 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "System Trust", value: "100%" },
            { label: "Return Engagement", value: "85%" },
            { label: "Security Pass", value: "SOC2 Ready" },
            { label: "Uptime Reliability", value: "99.9%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center md:items-start space-y-2"
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-slate-700 font-black">
                {stat.label}
              </span>
              <div className="text-3xl font-black text-white tracking-tighter uppercase">
                {stat.value}
              </div>
              <div className="h-px w-8 bg-[#ff6b00]/40"></div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;
