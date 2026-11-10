import React from "react";
import { ArrowUpRight, Braces, Gauge, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";

const principles = [
  { Icon: Braces, title: "Clean Engineering", text: "Maintainable code built for long-term growth." },
  { Icon: Gauge, title: "Fast by Default", text: "Performance treated as a core product feature." },
  { Icon: Layers3, title: "Built to Scale", text: "Flexible systems that grow with your business." },
];

const WhoAmI: React.FC = () => {
  return (
    <section id="about" className="about-showcase">
      <div className="about-showcase__glow" aria-hidden="true" />
      <div className="section-shell about-showcase__grid">
        <div className="about-showcase__heading">
          <div className="section-kicker"><span /> A few lines about me</div>
          <h2>
            I build digital products
            <br />
            with <em>business impact.</em>
          </h2>
        </div>

        <div className="about-showcase__copy">
          <p>
            I&apos;m Fahad Ali, a full-stack web developer focused on turning
            complex ideas into fast, reliable and user-friendly products.
            Every solution is designed to solve a real problem and support
            measurable growth.
          </p>
          <Link to="/about" className="lime-text-link">
            More about me <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="section-shell about-principles">
        {principles.map(({ Icon, title, text }) => (
          <article key={title}>
            <span><Icon aria-hidden="true" /></span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhoAmI;
