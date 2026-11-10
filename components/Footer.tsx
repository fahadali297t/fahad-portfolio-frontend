import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Footer: React.FC = () => {
  const links = [
    ["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Projects", "/projects"],
    ["Pricing", "/pricing"], ["Blog", "/blog"], ["Guestbook", "/guestbook"], ["Contact", "/contact"],
  ];

  return (
    <footer className="site-footer">
      <div className="section-shell site-footer__inner">
        <div className="site-footer__top">
          <Link to="/" className="site-footer__brand" aria-label="Fahad Ali home">
            <span><i /><i /></span><div><strong>Fahad Ali</strong><small>Full-Stack Web Developer</small></div>
          </Link>
          <div className="site-footer__cta"><span>Have a project in mind?</span><Link to="/contact">Let&apos;s Talk <ArrowUpRight /></Link></div>
        </div>
        <nav className="site-footer__links" aria-label="Footer navigation">
          {links.map(([name, path]) => <Link key={name} to={path}>{name}</Link>)}
        </nav>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Fahad Ali. All rights reserved.</span>
          <div><Link to="/terms">Terms</Link><Link to="/privacy">Privacy Policy</Link></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
