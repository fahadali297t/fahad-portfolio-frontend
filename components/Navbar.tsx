import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const mainLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const moreLinks = [
  { name: "Pricing", path: "/pricing" },
  { name: "Blog", path: "/blog" },
  { name: "Guestbook", path: "/guestbook" },
  { name: "Schedule a Call", path: "/schedule-call" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setMoreOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isMoreActive = moreLinks.some(({ path }) => isActive(path));

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <nav ref={menuRef} className="site-nav" aria-label="Main navigation">
        <Link to="/" className="site-brand" aria-label="Fahad Ali home">
          <span className="site-brand-mark" aria-hidden="true"><i /><i /></span>
          <span className="site-brand-copy">
            <strong>Fahad Ali</strong>
            <small>Web Developer</small>
          </span>
        </Link>

        <div className="desktop-nav-links">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={isActive(link.path) ? "is-active" : ""}
              aria-current={isActive(link.path) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}

          <div className="desktop-more">
            <button
              type="button"
              className={isMoreActive ? "is-active" : ""}
              aria-expanded={moreOpen}
              aria-controls="desktop-more-menu"
              onClick={() => setMoreOpen((open) => !open)}
            >
              More <ChevronDown aria-hidden="true" />
            </button>
            <div id="desktop-more-menu" className={`desktop-more-menu ${moreOpen ? "is-open" : ""}`}>
              {moreLinks.map((link) => (
                <Link key={link.path} to={link.path}>{link.name}<ArrowRight aria-hidden="true" /></Link>
              ))}
            </div>
          </div>
        </div>

        <div className="site-nav-actions">
          <Link to="/contact" className="nav-cta">
            Let&apos;s Talk <ArrowRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div id="mobile-navigation" className={`mobile-navigation ${isOpen ? "is-open" : ""}`}>
          {[...mainLinks, ...moreLinks].map((link) => (
            <Link key={link.path} to={link.path}>
              {link.name}<ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
