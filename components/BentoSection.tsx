import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Laptop,
  MapPin,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const BentoSection: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const pktTime = currentTime.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Karachi",
    hour12: false,
  });

  return (
    <section className="growth-section">
      <div className="growth-curve growth-curve--top" aria-hidden="true" />
      <div className="growth-curve growth-curve--bottom" aria-hidden="true" />

      <div className="section-shell">
        <header className="growth-header">
          <span className="growth-logo" aria-hidden="true"><i /><i /></span>
          <div className="growth-burst" aria-hidden="true"><i /><i /><i /></div>
          <h2>Designed for <em>Business Growth</em></h2>
          <p>
            I don&apos;t just build websites — I create digital solutions that help
            businesses scale with confidence.
          </p>
          <Link to="/contact" className="lime-pill-button">
            Start Your Project <ArrowRight aria-hidden="true" />
          </Link>
        </header>

        <div className="growth-grid">
          <article className="growth-card growth-card--location">
            <div className="growth-card__topline">
              <div className="growth-card__title">
                <span className="growth-icon"><MapPin aria-hidden="true" /></span>
                <div><h3>Pakistan</h3><p>Sargodha, Punjab</p></div>
              </div>
              <span className="growth-time"><i /> PKT {pktTime}</span>
            </div>
            <div className="growth-map" aria-label="World map highlighting Pakistan" role="img">
              <svg viewBox="0 0 760 360" aria-hidden="true">
                <g className="world-map-land">
                  <path d="M46 80 82 45l61-12 44 17 28 32-20 23-36-5-18 30-28 11-4 34-30 8-15-28-35-21-11-31Z" />
                  <path d="m163 188 33 12 20 35-5 53-25 39-19-18-8-48-23-38Z" />
                  <path d="m287 76 35-29 54 5 21 23-17 21-38 2-23 19-26-8Z" />
                  <path d="m312 125 54-16 47 18 31 46-18 38-22 70-29 38-31-26-12-53-32-41-15-43Z" />
                  <path d="m401 70 62-24 76 8 39 31 71 10 55 37-26 28-62 2-32 25-54-8-33 33-31-19-12-46-39-18-29-35Z" />
                  <path d="m623 246 46-18 45 24 16 37-36 24-51-11-28-31Z" />
                  <path d="m552 207 13 7-8 20-14-9Z" />
                  <path d="m590 189 10 6-8 14-10-7Z" />
                </g>
                <g className="pakistan-highlight">
                  <path d="m506 145 12-12 17 7 4 17-13 20-18-8-8-13Z" />
                  <circle cx="520" cy="154" r="15" />
                  <circle cx="520" cy="154" r="5" />
                </g>
                <path className="pakistan-route" d="M89 196 C225 102 355 231 515 157" />
              </svg>
              <span className="pakistan-label">Pakistan</span>
            </div>
            <div className="growth-status"><Laptop aria-hidden="true" /> Open to Work Remotely</div>
          </article>

          <Link to="/guestbook" className="growth-card growth-card--guestbook">
            <div className="open-book" aria-hidden="true">
              <span className="open-book__page open-book__page--left" />
              <span className="open-book__page open-book__page--right" />
              <span className="open-book__spine" />
              <strong><BookOpen /></strong>
            </div>
            <span className="guestbook-kicker">Guestbook</span>
            <h3>Sign the Book <ArrowRight aria-hidden="true" /></h3>
            <p>Leave a review about my website.</p>
          </Link>

          <a
            href="https://wa.me/923326067339"
            target="_blank"
            rel="noopener noreferrer"
            className="growth-card growth-card--whatsapp"
          >
            <span className="whatsapp-icon"><BsWhatsapp aria-hidden="true" /></span>
            <h3>Let&apos;s build<br />something together</h3>
            <span className="whatsapp-cta"><BsWhatsapp aria-hidden="true" /> Chat on WhatsApp</span>
          </a>

        </div>
      </div>
    </section>
  );
};

export default BentoSection;
