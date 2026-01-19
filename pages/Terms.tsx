import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Scale,
  FileText,
  AlertCircle,
  Terminal,
  HardDrive,
} from "lucide-react";

const Terms: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.from(".terms-reveal", {
  //     y: 40,
  //     opacity: 0,
  //     stagger: 0.1,
  //     duration: 1.2,
  //     ease: "power4.out",
  //   });
  // }, []);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen py-32 px-6"
    >
      <div className="max-w-4xl mx-auto space-y-24">
        {/* Header */}
        <header className="space-y-8 text-center sm:text-left">
          <div className="terms-reveal flex items-center justify-center sm:justify-start gap-4">
            <div className="w-10 h-px bg-[#ff6b00]"></div>
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#ff6b00] font-black">
              Legal Framework
            </span>
          </div>
          <h1 className="terms-reveal text-6xl sm:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            TERMS OF <br />{" "}
            <span className="text-slate-800 font-serif italic font-light lowercase">
              conditions
            </span>
          </h1>
          <p className="terms-reveal text-slate-500 text-lg font-light leading-relaxed max-w-2xl">
            The governing principles for interacting with the Laravel Artisan
            portfolio and its associated digital artifacts.
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-20">
          <section className="terms-reveal space-y-6">
            <div className="flex items-center gap-4 text-[#ff6b00]">
              <FileText size={24} />
              <h3 className="text-xl font-bold uppercase tracking-tight">
                01. Acceptance of Terms
              </h3>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
              By accessing this site, you agree to comply with these terms of
              service and all applicable laws and regulations. If you do not
              agree with any of these terms, you are prohibited from using or
              accessing this site.
            </p>
          </section>

          <section className="terms-reveal space-y-6">
            <div className="flex items-center gap-4 text-[#ff6b00]">
              <HardDrive size={24} />
              <h3 className="text-xl font-bold uppercase tracking-tight">
                02. Intellectual Property
              </h3>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
              The artifacts, code snippets, and architectural designs presented
              on this site are the intellectual property of Fahad Ali unless
              otherwise stated. They are presented for demonstration purposes.
              Unauthorized commercial duplication is prohibited.
            </p>
          </section>

          <section className="terms-reveal space-y-6">
            <div className="flex items-center gap-4 text-[#ff6b00]">
              <Terminal size={24} />
              <h3 className="text-xl font-bold uppercase tracking-tight">
                03. Usage License
              </h3>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on this website for personal,
              non-commercial transitory viewing only.
            </p>
          </section>

          <section className="terms-reveal space-y-6">
            <div className="flex items-center gap-4 text-[#ff6b00]">
              <AlertCircle size={24} />
              <h3 className="text-xl font-bold uppercase tracking-tight">
                04. Disclaimer & Liability
              </h3>
            </div>
            <p className="text-slate-400 font-light leading-relaxed">
              The materials on this website are provided on an 'as is' basis.
              Fahad Ali makes no warranties, expressed or implied, and hereby
              disclaims all other warranties including, without limitation,
              implied warranties or conditions of merchantability.
            </p>
          </section>
        </div>

        {/* Footer info */}
        <footer className="terms-reveal pt-20 border-t border-white/5 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black">
              Registry Version
            </span>
            <p className="text-xs font-bold text-slate-500">
              Protocol Release // 2.4.0
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-800">
            <Scale size={20} />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em]">
              Legally Valid
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Terms;
