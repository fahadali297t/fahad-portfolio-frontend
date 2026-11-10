import React from "react";
import { BriefcaseBusiness, Layers3, Quote, ShieldCheck, ShoppingBag } from "lucide-react";
import { TESTIMONIALS } from "../constants";

const reviewIcons = [BriefcaseBusiness, Layers3, ShoppingBag];

const Testimonials: React.FC = () => (
  <section className="reviews-section">
    <div className="reviews-section__orb" aria-hidden="true" />
    <div className="section-shell reviews-shell">
      <header className="reviews-header">
        <div className="reviews-heading-copy">
          <span className="reviews-kicker"><b><ShieldCheck /></b> Trusted by Businesses</span>
          <h2>Trusted<br />Clients <em>Reviews</em></h2>
          <p>Real feedback from businesses I&apos;ve worked with, sharing their experience and results.</p>
        </div>
        <div className="reviews-visual" aria-hidden="true">
          <span className="reviews-lime-shape" />
          <span className="speech-bubble speech-bubble--quote"><Quote /></span>
          <span className="speech-bubble speech-bubble--dots"><i /><i /><i /></span>
          <span className="reviews-rays"><i /><i /><i /></span>
        </div>
      </header>

      <div className="reviews-grid">
        {TESTIMONIALS.slice(0, 3).map((testimonial, index) => {
          const Icon = reviewIcons[index] ?? BriefcaseBusiness;
          return (
            <article className="review-card" key={testimonial.id}>
              <Quote className="review-card__quote" aria-hidden="true" />
              <blockquote>“{testimonial.content}”</blockquote>
              <footer>
                <span className="review-card__icon"><Icon /></span>
                <span className="review-card__divider" />
                <div><strong>{testimonial.name}</strong><small>{testimonial.role}</small></div>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Testimonials;
