import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRICING_PLANS } from "../constants";
import { Check, Search, Zap, ShieldCheck, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PricingCard: React.FC<{ plan: any; index: number }> = ({
  plan,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const IconMap: { [key: string]: any } = {
    Search,
    Zap,
    ShieldCheck,
  };
  const Icon = IconMap[plan.icon] || Zap;

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
      },
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative p-10 bg-[#0a0a0a] border rounded-[2.5rem] flex flex-col h-full transition-all duration-500 overflow-hidden ${
        plan.recommended
          ? "border-[#004aad] shadow-[0_0_80px_rgba(0,74,173,0.1)]"
          : "border-white/5 hover:border-[#004aad]/30"
      }`}
    >
      {plan.recommended && (
        <div className="absolute top-8 right-[-30px] rotate-45 bg-[#004aad] text-black text-[9px] font-black uppercase tracking-widest px-10 py-1.5 shadow-xl">
          Recommended
        </div>
      )}

      <div className="space-y-8 relative z-10 flex flex-col h-full">
        <div className="space-y-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              plan.recommended
                ? "bg-[#004aad] text-black"
                : "bg-white/5 text-[#004aad] group-hover:bg-[#004aad] group-hover:text-black"
            }`}
          >
            <Icon size={28} />
          </div>
          <h3 className="text-3xl font-black tracking-tighter uppercase text-white">
            {plan.name}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            {plan.description}
          </p>
        </div>

        <div className="pt-4 pb-8 border-y border-white/5 flex items-baseline gap-2">
          <span className="text-5xl font-black text-white tracking-tighter">
            {plan.price}
          </span>
          <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">
            {plan.period}
          </span>
        </div>

        <ul className="space-y-5 flex-grow">
          {plan.features.map((feature: string, i: number) => (
            <li
              key={i}
              className="flex items-start gap-4 text-slate-300 text-sm group-hover:text-slate-200 transition-colors"
            >
              <Check size={16} className="text-[#004aad] mt-0.5" />
              <span className="font-light">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className={`mt-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 ${
            plan.recommended
              ? "bg-[#004aad] text-while shadow-lg shadow-blue-500/20"
              : "bg-white/5 text-white hover:bg-[#004aad] hover:text-while border border-white/10 hover:border-transparent"
          }`}
        >
          {plan.cta} <ArrowRight size={14} />
        </Link>
      </div>

      {/* Decorative Blueprint Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="grid grid-cols-6 h-full border-x border-white/10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-r border-white/10 h-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-40 px-6 bg-black relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-20 space-y-8 max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#004aad]"></div>
            <span className="text-[10px] font-mono text-[#004aad] uppercase tracking-[0.5em] font-black">
              Pricing Options
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
            SCALABLE <br />{" "}
            <span className="text-slate-300 font-serif italic font-light lowercase">
              plans
            </span>{" "}
            FOR YOUR BUSINESS
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed border-l border-white/10 pl-8">
            Clear and upfront pricing for websites and digital platforms. Pick
            the plan that fits your business goals and growth strategy.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/5 text-center">
          <p className="text-slate-300 text-sm font-light">
            Need a custom solution?{" "}
            <Link
              to="/schedule-call"
              className="text-[#004aad] font-bold hover:underline ml-2"
            >
              Request a bespoke quote →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
