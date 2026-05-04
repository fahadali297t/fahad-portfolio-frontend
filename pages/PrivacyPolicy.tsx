import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Shield, Eye, Lock, Globe, Terminal } from "lucide-react";

const PrivacyPolicy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.from(".policy-reveal", {
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
          <div className="policy-reveal flex items-center justify-center sm:justify-start gap-4">
            <div className="w-10 h-px bg-[#004aad]"></div>
            <span className="text-[10px] font-poppins uppercase tracking-[0.5em] text-[#004aad] font-black">
              Data Protocol // v1.0
            </span>
          </div>
          <h1 className="policy-reveal text-6xl sm:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            PRIVACY <br />{" "}
            <span className="text-white font-serif italic font-light lowercase">
              policy
            </span>
          </h1>
          <p className="policy-reveal text-white text-lg font-light leading-relaxed max-w-2xl">
            Understanding how your data is processed within the Artisan
            ecosystem. I prioritize technical integrity and transparency.
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-20">
          {/* Section 1: Collection */}
          <section className="policy-reveal space-y-6">
            <div className="flex items-center gap-4 text-[#004aad]">
              <Eye size={24} />
              <h3 className="text-xl font-bold uppercase tracking-tight">
                01. Data Collection
              </h3>
            </div>
            <p className="text-white font-light leading-relaxed">
              When you interact with this portfolio—whether via the contact form
              or general navigation—basic telemetry data and provided contact
              information are logged to facilitate communication and performance
              monitoring.
            </p>
          </section>

          {/* CRITICAL Section: Guestbook Notice */}
          <section className="policy-reveal p-10 bg-[#0a0a0a] border border-[#004aad]/30 rounded-[2.5rem] space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe size={120} />
            </div>
            <div className="relative z-10 flex items-center gap-4 text-[#004aad]">
              <Globe size={24} />
              <h3 className="text-xl font-bold uppercase tracking-tight">
                02. Public Contributions (Guestbook)
              </h3>
            </div>
            <div className="relative z-10 space-y-4">
              <p className="text-white text-lg font-medium leading-relaxed">
                USER NOTICE: The Guestbook is a public utility.
              </p>
              <p className="text-white font-light leading-relaxed">
                Any information, names, or messages submitted to the Guestbook
                are stored on a public-facing registry. By posting, you
                acknowledge that your contribution is visible to all visitors
                and system operators worldwide. Please refrain from posting
                sensitive, private, or proprietary data in this section.
              </p>
            </div>
          </section>

          {/* Section 3: Usage */}
          <section className="policy-reveal space-y-6">
            <div className="flex items-center gap-4 text-[#004aad]">
              <Lock size={24} />
              <h3 className="text-xl font-bold uppercase tracking-tight">
                03. Information Security
              </h3>
            </div>
            <p className="text-white font-light leading-relaxed">
              Private communications (via the contact form) are handled with
              industry-standard encryption protocols. I do not sell, trade, or
              distribute your private contact details to third-party marketing
              entities.
            </p>
          </section>

          {/* Section 4: Cookies */}
          <section className="policy-reveal space-y-6">
            <div className="flex items-center gap-4 text-[#004aad]">
              <Terminal size={24} />
              <h3 className="text-xl font-bold uppercase tracking-tight">
                04. Session Tracking
              </h3>
            </div>
            <p className="text-white font-light leading-relaxed">
              Standard browser cookies and local storage tokens are used to
              maintain session state (such as theme preferences or form
              persistence) and to improve overall architectural efficiency.
            </p>
          </section>
        </div>

        {/* Footer info */}
        <footer className="policy-reveal pt-20 border-t border-white/5 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="space-y-1">
            <span className="text-[10px] font-poppins text-white uppercase tracking-widest font-black">
              Last Audit
            </span>
            <p className="text-xs font-bold text-white">October 24, 2024</p>
          </div>
          <div className="flex items-center gap-4 text-white">
            <Shield size={20} />
            <span className="text-[10px] font-poppins uppercase tracking-[0.4em]">
              Protocol Secured
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
