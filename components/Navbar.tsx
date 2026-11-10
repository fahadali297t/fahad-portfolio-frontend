import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/", section: "home" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services", section: "services" },
  { name: "Projects", path: "/projects", section: "projects" },
  { name: "Testimonials", path: "/#testimonials", section: "testimonials" },
  { name: "Contact", path: "/contact", section: "contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
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
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const openSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    section?: string,
  ) => {
    if (!section || location.pathname !== "/") return;

    const target = document.getElementById(section);
    if (!target) return;

    event.preventDefault();
    setIsOpen(false);
    target.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", section === "home" ? "/" : `/#${section}`);
  };

  const handleCta = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== "/") return;
    const target = document.getElementById("contact");
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "/#contact");
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <nav ref={menuRef} className="site-nav" aria-label="Main navigation">
        <Link to="/" className="site-brand" aria-label="Fahad Ali home">
          <span className="site-brand-mark" aria-hidden="true">
            <i /><i />
          </span>
          <span className="site-brand-copy">
            <strong>Fahad Ali</strong>
            <small>Web Developer</small>
          </span>
        </Link>

        <div className="desktop-nav-links">
          {navLinks.map((link) => {
            const active =
              link.path === "/"
                ? location.pathname === "/" && !location.hash
                : location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(event) => openSection(event, link.section)}
                className={active ? "is-active" : ""}
                aria-current={active ? "page" : undefined}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="site-nav-actions">
          <Link to="/contact" className="nav-cta" onClick={handleCta}>
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

        <div
          id="mobile-navigation"
          className={`mobile-navigation ${isOpen ? "is-open" : ""}`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(event) => openSection(event, link.section)}
            >
              {link.name}
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
          <button type="button" onClick={() => navigate("/schedule-call")}>Schedule a call</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
