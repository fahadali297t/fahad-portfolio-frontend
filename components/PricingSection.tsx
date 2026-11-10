import React from "react";
import { ArrowRight, Check, Code2, Layers3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SiLaravel, SiPhp, SiWordpress } from "react-icons/si";
import { PRICING_PLANS } from "../constants";

const PricingCard: React.FC<{ plan: (typeof PRICING_PLANS)[number] }> = ({ plan }) => {
  const iconMap: Record<number, React.ComponentType<any>> = {
    1: SiWordpress,
    2: Code2,
    3: Layers3,
  };
  const Icon = iconMap[plan.id] || Code2;
  const [currency, amount] = plan.price.split(" ");

  return (
    <article className={`pricing-card ${plan.recommended ? "is-recommended" : ""}`}>
      {plan.recommended && <span className="pricing-ribbon">Recommended</span>}

      <div className="pricing-card__icon"><Icon aria-hidden="true" /></div>
      <h3>{plan.name}</h3>
      <p className="pricing-card__description">{plan.description}</p>

      <div className="pricing-card__price">
        <strong><small>{currency}</small>{amount}</strong>
        <span>{plan.period}</span>
      </div>

      <ul>
        {plan.features.map((feature) => (
          <li key={feature}><span><Check aria-hidden="true" /></span>{feature}</li>
        ))}
      </ul>

      <Link to="/contact" className="pricing-card__button">
        {plan.cta} <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
};

const PricingSection: React.FC = () => {
  const location = useLocation();
  const isPricingPage = location.pathname === "/pricing";

  return (
    <section className={`pricing-showcase ${isPricingPage ? "pricing-showcase--page" : ""}`}>
      <div className="pricing-glow" aria-hidden="true" />
      <div className="section-shell">
        <header className="pricing-header">
          <div className="pricing-header__copy">
            <div className="section-kicker"><span /> Pricing options</div>
            <h2>Scalable Plans for<br />Your <em>Business</em></h2>
            <p>
              Clear and upfront pricing for websites and digital platforms. Pick
              the plan that fits your business goals and growth strategy.
            </p>
          </div>

          <div className="pricing-visual" aria-hidden="true">
            <div className="pricing-visual__blob" />
            <div className="pricing-laptop">
              <div><Code2 /></div>
              <span />
            </div>
            <span className="pricing-float pricing-float--wp"><SiWordpress /></span>
            <span className="pricing-float pricing-float--laravel"><SiLaravel /></span>
            <span className="pricing-float pricing-float--php"><SiPhp /></span>
            <span className="pricing-float pricing-float--layers"><Layers3 /></span>
          </div>
        </header>

        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => <PricingCard key={plan.id} plan={plan} />)}
        </div>

        <div className="pricing-bespoke">
          <span>Need a custom solution?</span>
          <Link to="/schedule-call">Request a bespoke quote <ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
