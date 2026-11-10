import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Code2, Database, Globe2, Server } from "lucide-react";
import { PROJECTS, EnhancedProject } from "../constants";

interface ProjectsSectionProps {
  isLandingPage?: boolean;
}

const ProjectCard: React.FC<{ project: EnhancedProject; index: number }> = ({
  project,
  index,
}) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        card.classList.add("is-visible");
        observer.unobserve(card);
      },
      { threshold: 0.12 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const registry = project.id < 0 ? `0${project.id}` : `0${project.id}`;

  return (
    <article
      ref={cardRef}
      className="portfolio-card"
      style={{ transitionDelay: `${Math.min(index, 5) * 80}ms` }}
    >
      <Link to={`/projects/${project.id}`} className="portfolio-card__media">
        <img src={`/${project.image}`} alt={`${project.title} project preview`} loading="lazy" />
        <div className="portfolio-card__tags">
          {project.techStackDetailed.slice(0, 2).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </Link>

      <div className="portfolio-card__meta">
        <span>Registry: {registry}</span>
        <a
          href={project.demo || project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit ${project.title} website`}
        >
          <Globe2 aria-hidden="true" />
        </a>
      </div>

      <div className="portfolio-card__title-row">
        <div>
          <Link to={`/projects/${project.id}`}>
            <h3>{project.title}</h3>
          </Link>
          <p>{project.type}</p>
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="portfolio-card__arrow"
          aria-label={`View ${project.title} case study`}
        >
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>

      <p className="portfolio-card__description">{project.description}</p>

      <div className="portfolio-card__metrics">
        {project.metrics.slice(0, 2).map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isLandingPage = false }) => {
  const projects = isLandingPage ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section id="projects" className={`portfolio-section ${isLandingPage ? "" : "portfolio-section--page"}`}>
      <div className="portfolio-swoop portfolio-swoop--top" aria-hidden="true" />
      <div className="portfolio-swoop portfolio-swoop--bottom" aria-hidden="true" />

      <div className="section-shell">
        <header className="portfolio-header">
          <div>
            <div className="section-kicker"><span /> Curated portfolio</div>
            <h2>
              Featured
              <br />
              <em>Projects</em>
            </h2>
          </div>
          <p>
            High-performance digital solutions designed to support and scale
            your business.
          </p>
        </header>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {isLandingPage && (
          <div className="portfolio-more">
            <div className="portfolio-more__icons" aria-hidden="true">
              <Server /><Database /><Code2 />
            </div>
            <h3>More Projects Available</h3>
            <p>Check out my work — with proven performance and easy-to-follow details.</p>
            <Link to="/projects" className="lime-pill-button">
              Load More Projects <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
