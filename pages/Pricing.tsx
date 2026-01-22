import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PricingSection from "../components/PricingSection";
import HighImpactCTA from "../components/HighImpactCTA";
import { ShieldCheck, Zap, Layers, Cpu, Code2, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Pricing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

const features = [
  {
    icon: Code2,
    title: "Modern Web Solutions",
    desc: "Built with the latest technology to ensure fast, reliable websites.",
  },
  {
    icon: Database,
    title: "Scalable Databases",
    desc: "Structured to handle growth and large amounts of data seamlessly.",
  },
  {
    icon: Zap,
    title: "High Performance",
    desc: "Websites and apps optimized for speed and smooth user experiences.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    desc: "Your website is protected with enterprise-grade security measures.",
  },
  {
    icon: Layers,
    title: "Reliable & Tested",
    desc: "Every feature is carefully tested to ensure consistent performance.",
  },
  {
    icon: Cpu,
    title: "Smooth Deployment",
    desc: "Easily maintained and updated with minimal downtime.",
  },
];

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen">
      {/* Hero Header */}

      {/* Main Pricing Cards */}
      <PricingSection />

      {/* Trust & Features Section */}
      <section className="py-24 sm:py-40 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 mb-32">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              WHAT'S IN EVERY{" "}
              <span className="text-[#004aad] font-serif italic font-light lowercase">
                delivery
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Every project I work on is built to high standards, ensuring a
              reliable, scalable, and future-proof website or app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-10 bg-[#080808] border border-white/5 rounded-[2.5rem] hover:border-[#004aad]/20 transition-all flex flex-col gap-6"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#004aad] group-hover:bg-[#004aad] group-hover:text-black transition-all">
                  <feature.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold uppercase tracking-tight text-white">
                    {feature.title}
                  </h4>
                  <p className="text-slate-500 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      {/* <HighImpactCTA /> */}

      {/* FAQ Placeholder */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-16 text-center">
            Frequently Asked{" "}
            <span className="text-[#004aad] font-serif italic font-light lowercase">
              questions
            </span>
          </h3>
          <div className="space-y-8">
            {[
              {
                q: "How do payments work?",
                a: "For project-based work, I usually ask for a 50% upfront deposit and the rest once your website or platform is live. Monthly retainers are billed at the start of each month.",
              },
              {
                q: "Do you provide support after launch?",
                a: "Absolutely! Every project comes with 30 days of priority support for any issues. Ongoing support and updates can be arranged through our maintenance plans.",
              },
              {
                q: "How long does a project take?",
                a: "Most projects take 4-8 weeks from start to launch, depending on complexity. Initial audits or consultations are usually completed within 7 business days.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-8 bg-white/5 rounded-[2rem] border border-white/5 space-y-3"
              >
                <h4 className="font-bold text-white text-lg">Q: {faq.q}</h4>
                <p className="text-slate-500 font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
