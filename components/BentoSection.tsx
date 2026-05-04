import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import {
  MapPin,
  Globe,
  Zap,
  Activity,
  BookOpen,
  CheckCircle2,
  Server,
  Cloud,
  ArrowRight,
  Globe2,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const BentoSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const pulseRef = useRef<SVGSVGElement>(null);

  // Live clock for Pakistan (PKT is UTC+5)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Performance Pulse Animation (Sinewave)
  useEffect(() => {
    if (!pulseRef.current) return;
    const path = pulseRef.current.querySelector("path");
    if (!path) return;

    // Simulate a heartbeat/sinewave
    gsap.to(path, {
      attr: {
        d: "M0 50 Q 25 10, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50",
      },
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const pktTime = currentTime.toLocaleTimeString("en-US", {
    timeZone: "Asia/Karachi",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <section className="py-24 px-6 bg-[#0F0E0E] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-white/[0.01] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[340px]">
          {/* 1. Dynamic Location Card (Radar) */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>

            {/* Radar Sweep Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/10 animate-ping"></div>
              <div className="absolute w-full h-full rounded-full border border-white/5 animate-spin-slow origin-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-1/2 bg-gradient-to-t from-transparent to-[#004aad]/40 shadow-[0_0_40px_rgba(0,74,173,0.4)]"></div>
              </div>
              <MapPin size={24} className="text-[#004aad] fill-[#004aad]/20" />
            </div>

            <div className="relative z-10 flex flex-col-reverse gap-4 md:gap-4 md:flex-row  justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-3xl font-serif text-white italic">
                  Pakistan
                </h3>
                <p className="text-[11px] font-poppins text-white uppercase tracking-widest">
                  Sargodha • Punjab
                </p>
              </div>
              <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-poppins text-slate-300 font-bold uppercase tracking-widest">
                  {pktTime} PKT
                </span>
              </div>
            </div>
            <div className="relative z-10 mt-auto">
              <span className="text-[14px] font-poppins text-white uppercase tracking-widest block font-black">
                Open to Work Remotely
              </span>
            </div>
          </div>

          {/* 2. Interaction Card (Guestbook Stack) */}
          <Link
            to="/guestbook"
            className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="flex items-center justify-center h-48 relative">
              <div className="absolute w-32 h-44 bg-zinc-900 border border-white/5 rounded-2xl -rotate-12 group-hover:rotate-[-20deg] group-hover:translate-x-[-20px] transition-all duration-500 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 border-[0.5px] border-[#004aad]/30 rounded-2xl opacity-50"></div>
                <div className="p-4 space-y-2">
                  <div className="h-2 w-full bg-white/5 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-white/5 rounded-full"></div>
                </div>
              </div>
              <div className="absolute w-32 h-44 bg-zinc-800 border border-white/10 rounded-2xl rotate-6 group-hover:rotate-[15deg] group-hover:translate-x-[20px] transition-all duration-500 shadow-2xl flex flex-col justify-end p-4">
                <div className="absolute inset-0 border-[0.5px] border-[#004aad]/40 rounded-2xl"></div>
                <div className="w-8 h-8 rounded-full bg-[#004aad] flex items-center justify-center text-black">
                  <BookOpen size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white tracking-tighter">
                Sign the Book →
              </h3>
              <p className="text-white text-sm font-light">
                Leave a review about my website.
              </p>
            </div>
          </Link>

          {/* 3. Direct Line Card (WhatsApp) */}
          <a
            href="https://wa.me/923326067339"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center justify-center group relative overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-green-500/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative mb-10 w-24 h-24 lg:bg-green-500/10 rounded-[2rem] flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <BsWhatsapp
                size={48}
                className="drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              />
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">
              Let's build something <br /> together
            </h3>

            <div className="px-8 py-4 bg-green-500 text-black rounded-full text-xs font-black uppercase tracking-widest transition-all hover:bg-green-400 active:scale-95 flex items-center gap-2">
              <BsWhatsapp size={14} />
              Chat on WhatsApp
            </div>
          </a>

          {/* 4. Global Infrastructure Card (AWS) */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] grayscale invert group-hover:opacity-[0.06] transition-opacity">
              <svg viewBox="0 0 800 400" className="w-full h-full">
                <path
                  d="M150 150 L650 150 M150 250 L650 250"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <circle cx="200" cy="180" r="2" fill="white" />
                <circle cx="500" cy="220" r="2" fill="white" />
                <circle cx="350" cy="300" r="2" fill="white" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-[#004aad]">
                <Globe2 size={24} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Global Delivery
                </h3>
                <p className="text-[10px] font-poppins text-white uppercase tracking-widest">
                  Fast Worldwide Access
                </p>
              </div>
            </div>

            <div className="relative z-10 h-32 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border border-[#004aad]/20 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-2 h-2 bg-[#004aad] rounded-full shadow-[0_0_10px_#004aad]"></div>
                <div className="absolute bottom-4 right-[-10px] w-2 h-2 bg-[#004aad] rounded-full shadow-[0_0_10px_#004aad]"></div>
              </div>
            </div>

            <p className="relative z-10 text-white text-sm font-light leading-relaxed">
              Your website loads quickly for users everywhere, no matter where
              they are.
            </p>
          </div>

          {/* 5. "Harden" CI/CD Card (Resilience) */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] font-poppins text-[#004aad] uppercase tracking-widest font-black">
                How We Build
              </span>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                Reliable Launch Process
              </h3>
            </div>

            <div className="flex flex-col gap-6 py-6">
              {[
                { label: "Build", status: "Ready" },
                { label: "Test", status: "Verified" },
                { label: "Ship", status: "Live" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-green-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex-grow flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-300">
                      {step.label}
                    </span>
                    <span className="text-[9px] font-poppins text-white uppercase tracking-widest">
                      {step.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-white text-sm font-light">
              Your website updates smoothly with no downtime or broken features.
            </p>
          </div>

          {/* 6. Performance Pulse Card (Vitals) */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between group relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                  Speed & Reliability
                </h3>
                <p className="text-[10px] font-poppins text-white uppercase tracking-widest">
                  Live Performance Tracking
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Activity size={20} />
              </div>
            </div>

            <div className="h-24 w-full flex items-center justify-center overflow-hidden">
              <svg
                ref={pulseRef}
                width="400"
                height="100"
                viewBox="0 0 400 100"
                className="w-full"
              >
                <path
                  d="M0 50 Q 25 30, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50"
                  fill="none"
                  stroke="#004aad"
                  strokeWidth="2"
                  className="drop-shadow-[0_0_8px_rgba(0,74,173,0.5)]"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#004aad]" />
                <span className="text-xl font-black text-white">45ms</span>
              </div>
              <span className="text-[10px] font-poppins text-white uppercase tracking-widest">
                Average Load Time
              </span>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `,
        }}
      />
    </section>
  );
};

export default BentoSection;
