import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Code2, LayoutPanelTop, ShoppingBag } from "lucide-react";
import { SiLaravel, SiPhp, SiReact, SiWordpress } from "react-icons/si";
import { SERVICES, EnhancedService } from "../constants";
import SEO from "@/components/SEO";
import { SEO_PAGES } from "@/lib/SEOConfig";

interface ServicesProps {
  isLandingPage?: boolean;
}

const ServiceCard: React.FC<{ service: EnhancedService }> = ({ service }) => {
  const titleParts = service.title.split(" ");
  const eyebrow = titleParts.shift();
  const subtitle = titleParts.join(" ");

  const iconMap: Record<number, React.ComponentType<any>> = {
    1: Code2,
    2: SiWordpress,
    3: ShoppingBag,
    4: LayoutPanelTop,
  };
  const Icon: React.ComponentType<any> = iconMap[service.id] || Code2;

  return (
    <article className="service-card">
      <div className="service-card__watermark" aria-hidden="true"><Icon /></div>

      <div className="service-card__heading">
        <span className="service-card__icon"><Icon aria-hidden="true" /></span>
        <h3>
          {eyebrow}
          <em>{subtitle}</em>
        </h3>
      </div>

      <p className="service-card__description">{service.description}</p>

      <div className="service-card__features">
        {service.capabilities.slice(0, 2).map((capability) => (
          <div key={capability.title}>
            <span><Check aria-hidden="true" /></span>
            <strong>{capability.title}</strong>
          </div>
        ))}
      </div>

      <div className="service-card__footer">
        <div className="service-card__tags">
          {service.relatedTech.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}
        </div>
        <Link to={`/services/${service.id}`} aria-label={`View ${service.title} service`}>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

const Services: React.FC<ServicesProps> = ({ isLandingPage = false }) => {
  const services = isLandingPage ? SERVICES.slice(0, 2) : SERVICES;

  return (
    <section id="services" className={`services-showcase ${isLandingPage ? "" : "services-showcase--page"}`}>
      {!isLandingPage && <SEO {...SEO_PAGES.services} />}
      <div className="services-swoop" aria-hidden="true" />
      <div className="section-shell">
        <header className="services-header">
          <div className="services-header__copy">
            <div className="section-kicker"><span /> What I offer</div>
            <h2>Professional <em>Services</em></h2>
            <p>
              From WordPress websites to fully custom web applications, I deliver
              secure, high-quality solutions tailored to real business needs.
            </p>
          </div>

          <div className="services-visual" aria-hidden="true">
            <div className="services-visual__blob" />
            <div className="services-laptop">
              <div><Code2 /></div>
              <span />
            </div>
            <span className="services-float services-float--wp"><SiWordpress /></span>
            <span className="services-float services-float--laravel"><SiLaravel /></span>
            <span className="services-float services-float--react"><SiReact /></span>
            <span className="services-float services-float--php"><SiPhp /></span>
          </div>
        </header>

        <div className="services-grid">
          {services.map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>

        {!isLandingPage && (
          <div className="services-cta">
            <div>
              <span>Need something tailored?</span>
              <h3>Let&apos;s build the right solution for your business.</h3>
            </div>
            <Link to="/contact" className="lime-pill-button">
              Start Your Project <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
