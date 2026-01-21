import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Calendar,
  MessageCircle,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Video,
  MessagesSquare,
  Sparkles,
  Zap,
  ChevronRight,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const Schedule: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const ctx = gsap.context(() => {
//       gsap.from(".reveal-simple", {
//         y: 40,
//         opacity: 0,
//         stagger: 0.15,
//         duration: 1.2,
//         ease: "power3.out",
//       });

//       gsap.from(".choice-card", {
//         y: 60,
//         opacity: 0,
//         stagger: 0.2,
//         duration: 1.4,
//         ease: "expo.out",
//         delay: 0.3,
//       });
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);

  const openCalendly = () => {
    window.open("https://calendly.com/fahadali297t/30min", "_blank");
  };

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen pt-32 pb-40 px-6 relative overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-[#004aad]/10 to-transparent opacity-20 pointer-events-none"></div>
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-24">
        {/* Simple & Welcoming Header */}
        <header className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="reveal-simple flex items-center justify-center gap-3">
            <Sparkles size={18} className="text-[#004aad]" />
            <span className="text-[11px] font-poppins uppercase tracking-[0.5em] text-[#004aad] font-black">
              Let's Connect
            </span>
          </div>

          <h1 className="reveal-simple text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            Ready to grow online
            <span className="text-slate-400 font-serif italic font-light lowercase">
              ?
            </span>
            <br />
            <span className="ml-3">Let’s talk.</span>
          </h1>

          <p className="reveal-simple text-slate-400 text-lg md:text-2xl font-light leading-relaxed">
            I'm ready to help you bring your vision to life. Select the method
            that works best for your current needs.
          </p>
        </header>

        {/* Symmetric Choice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: Discovery Session (Calendly) */}
          <div className="choice-card group relative bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 sm:p-14 flex flex-col justify-between overflow-hidden transition-all duration-700 hover:border-[#004aad]/30 shadow-2xl">
            {/* Soft Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#004aad]/5 blur-[80px] rounded-full group-hover:bg-[#004aad]/10 transition-colors"></div>

            <div className="relative z-10 space-y-12">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-[#004aad] group-hover:bg-[#004aad] group-hover:text-black transition-all duration-500">
                  <Calendar size={36} strokeWidth={1.5} />
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-poppins text-slate-400 uppercase tracking-widest font-black">
                    30 MINUTE SESSION
                  </span>
                  <span className="block text-[8px] font-poppins text-green-500 uppercase tracking-widest mt-1">
                    Available This Week
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-[#004aad] transition-colors">
                  Schedule <br /> a Call
                </h2>
                <p className="text-slate-400 text-lg font-light leading-relaxed">
                  A dedicated time to discuss your project goals, timelines, and
                  how we can achieve your business objectives.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Deep dive into your idea",
                  "Expert technical advice",
                  "Personalized strategy",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-slate-400"
                  >
                    <CheckCircle2 size={16} className="text-[#004aad]" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={openCalendly}
              className="relative z-10 mt-16 w-full py-6 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#004aad] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            >
              <span>Check Schedule</span>
              <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Card 2: Quick Reply (WhatsApp) */}
          <div className="choice-card group relative bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-10 sm:p-14 flex flex-col justify-between overflow-hidden transition-all duration-700 hover:border-green-500/30 shadow-2xl">
            {/* Soft Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full group-hover:bg-green-500/10 transition-colors"></div>

            <div className="relative z-10 space-y-12">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all duration-500">
                  <BsWhatsapp size={36} />
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-poppins text-slate-400 uppercase tracking-widest font-black">
                    INSTANT ACCESS
                  </span>
                  <span className="block text-[8px] font-poppins text-green-500 uppercase tracking-widest mt-1">
                    Typical Reply: <span className="font-bold">Minutes</span>
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none group-hover:text-green-500 transition-colors">
                  Direct <br /> Message
                </h2>
                <p className="text-slate-400 text-lg font-light leading-relaxed">
                  Have a quick question or need an immediate response? Connect
                  with me directly on WhatsApp for real-time chat.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Instant technical support",
                  "Check my availability",
                  "Fast project quotes",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-slate-400"
                  >
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/923326067339"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 mt-16 w-full py-6 bg-green-500 text-black rounded-full font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-green-400 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(34,197,94,0.2)]"
            >
              <span>Send Message</span>
              <BsWhatsapp size={18} />
            </a>
          </div>
        </div>

        {/* Trust Footer */}
        <footer className="pt-24 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-poppins text-slate-400 uppercase tracking-widest font-black">
              Business Hours
            </span>
            <p className="text-sm font-bold text-slate-400">
              Monday — Friday, 09:00 AM to 06:00 PM (PKT)
            </p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[10px] font-poppins text-slate-400 uppercase tracking-widest font-black">
                Client Satisfaction
              </span>
              <p className="text-2xl font-black text-white">100% Guaranteed</p>
            </div>
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#004aad]">
              <Zap size={24} />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Schedule;
