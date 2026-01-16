import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal as TerminalIcon, ChevronDown } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Guestbook", path: "/guestbook" },
  ];

  const moreLinks = [
    // { name: "Case Studies", path: "/case-studies" },
    { name: "Blog", path: "/blog" },
    // { name: "Setup", path: "/setup" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 pt-6 ${
        isScrolled ? "translate-y-[-10px]" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto">
        <div
          className={`relative px-6 py-3 rounded-full border border-white/20 backdrop-blur-2xl transition-all duration-500 shadow-2xl ${
            isScrolled ? "bg-black/80" : "bg-black/40"
          }`}
        >
          <div className="flex justify-between items-center h-12">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2 group shrink-0">
              <div className="w-8 h-8 bg-[#ff6b00] rounded-lg flex items-center justify-center transition-all duration-500 group-hover:bg-[#CC5500]">
                <TerminalIcon className="w-5 h-5 text-black group-hover:text-white" />
              </div>
              <span className="hidden sm:block text-sm font-black tracking-tighter text-white uppercase">
                Fahad Ali
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-semibold transition-all duration-300 hover:text-[#ff6b00] ${
                    isActive(link.path) ? "text-[#ff6b00]" : "text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-300 hover:text-[#ff6b00] transition-all"
                >
                  More{" "}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      showMore ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showMore && (
                  <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 bg-[#0f0f11] border border-white/10 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in-95 duration-200">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setShowMore(false)}
                        className={`block px-5 py-3 text-xs font-semibold hover:bg-[#ff6b00]/10 hover:text-[#ff6b00] transition-all ${
                          isActive(link.path)
                            ? "text-[#ff6b00] bg-[#ff6b00]/5"
                            : "text-slate-500"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Tools & CTA */}
            <div className="flex items-center space-x-4">
              <Link
                to="/contact"
                className="relative overflow-hidden group bg-[#ff6b00] text-black px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#ff6b00]/30"
              >
                <span className="relative z-10">Let's Talk</span>
                <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-slate-300 hover:text-[#ff6b00] transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 px-2 py-6 bg-black/95 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-2">
              {[...mainLinks, ...moreLinks].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-8 py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest transition-all ${
                    isActive(link.path)
                      ? "bg-[#ff6b00]/10 text-[#ff6b00]"
                      : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
