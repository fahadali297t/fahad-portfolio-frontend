import React from "react";
import { Layers3, Rocket, Target } from "lucide-react";

const principles = [
  { Icon: Rocket, first: "Build & Deliver", second: "Business Solutions" },
  { Icon: Layers3, first: "Focus on Performance", second: "& Scalability" },
  { Icon: Target, first: "Aligned with", second: "Your Business Goals" },
];

const WhoAmI: React.FC = () => {
  return (
    <section id="about" className="about-showcase">
      <div className="about-curve about-curve--left" aria-hidden="true" />
      <div className="about-curve about-curve--right" aria-hidden="true" />
      <div className="about-showcase__glow" aria-hidden="true" />

      <div className="section-shell about-showcase__content">
        <div className="about-kicker"><span /> A few lines about me <span /></div>
        <h2>Who Am <em>I?</em></h2>
        <p className="about-showcase__intro">
          I help businesses turn ideas into fast, beautiful, and reliable websites
          and applications. I build modern, user-friendly solutions that perform
          well, scale easily, and support real business growth using Laravel,
          React, Tailwind, and WordPress.
        </p>

        <div className="about-principles">
          {principles.map(({ Icon, first, second }) => (
            <article key={first}>
              <span><Icon aria-hidden="true" /></span>
              <p>{first}<strong>{second}</strong></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
