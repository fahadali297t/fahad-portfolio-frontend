import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Layers3,
  Play,
  UsersRound,
} from "lucide-react";
import {
  SiLaravel,
  SiMysql,
  SiPhp,
  SiReact,
  SiWordpress,
} from "react-icons/si";

const technologyCards = [
  { name: "Laravel", Icon: SiLaravel, className: "hero-tech--laravel" },
  { name: "React", Icon: SiReact, className: "hero-tech--react" },
  { name: "WordPress", Icon: SiWordpress, className: "hero-tech--wordpress" },
  { name: "PHP", Icon: SiPhp, className: "hero-tech--php" },
  { name: "MySQL", Icon: SiMysql, className: "hero-tech--mysql" },
];

const stats = [
  { value: "2.5+", label: "Years Experience", Icon: BriefcaseBusiness },
  { value: "10+", label: "Projects Delivered", Icon: Layers3 },
  { value: "5+", label: "International Clients", Icon: UsersRound },
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".hero-visual-reveal", {
        scale: 0.93,
        opacity: 0,
        duration: 1.1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-tech-card", {
        scale: 0.75,
        opacity: 0,
        duration: 0.65,
        delay: 0.65,
        stagger: 0.09,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="home" className="home-hero">
      <div className="hero-background" aria-hidden="true">
        <span className="hero-swoop hero-swoop--top" />
        <span className="hero-swoop hero-swoop--bottom" />
      </div>

      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow hero-reveal">
            Web Development <span /> Laravel <span /> Full-Stack
          </p>

          <h1 className="hero-title hero-reveal">
            I Build Web Solutions
            <br />
            That <em>Grow Businesses</em>
          </h1>

          <p className="hero-description hero-reveal">
            I help business owners turn complex ideas into high-performing,
            scalable and user-friendly web applications using Laravel, React,
            WordPress and modern technologies.
          </p>

          <div className="hero-actions hero-reveal">
            <button
              type="button"
              className="hero-button hero-button--primary"
              onClick={() => scrollTo("contact")}
            >
              Start a Project <ArrowRight aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hero-button hero-button--secondary"
              onClick={() => scrollTo("projects")}
            >
              <span className="hero-play"><Play aria-hidden="true" /></span>
              View My Work
            </button>
          </div>

          <div className="hero-stats hero-reveal" aria-label="Career highlights">
            {stats.map(({ value, label, Icon }) => (
              <div className="hero-stat" key={label}>
                <Icon aria-hidden="true" />
                <div>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-art hero-visual-reveal" aria-label="Fahad Ali, Full-Stack Web Developer">
          <div className="hero-lime-blob" aria-hidden="true" />
          <div className="hero-burst" aria-hidden="true">
            <span /><span /><span />
          </div>

          <img
            className="hero-portrait"
            src="/profiled.png"
            alt="Fahad Ali in a navy suit"
          />

          {technologyCards.map(({ name, Icon, className }) => (
            <div className={`hero-tech-card ${className}`} key={name}>
              <Icon aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}

          <div className="hero-name-card">
            <span className="hero-code-icon"><Code2 aria-hidden="true" /></span>
            <div>
              <strong>Fahad Ali</strong>
              <span>Full-Stack Web Developer</span>
            </div>
          </div>

          <div className="hero-accent-bars" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
