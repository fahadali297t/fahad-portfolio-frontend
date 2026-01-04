import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Terminal as TerminalIcon, Sun, Moon } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    // { name: "Setup", path: "/setup" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-[#ff6b00]/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:border-[#ff6b00]/50 group-hover:bg-[#ff6b00]/10">
                <TerminalIcon className="w-6 h-6 text-[#ff6b00] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-[#ff6b00] blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase flex items-center">
              Fahad Ali<span className="text-[#ff6b00] ml-0.5">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:text-white group ${
                  isActive(link.path) ? "text-[#ff6b00]" : "text-slate-300"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-2 left-0 h-[1.5px] bg-[#ff6b00] transition-all duration-500 rounded-full ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}

            <div className="h-4 w-px bg-white/10 mx-1"></div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-[#ff6b00] transition-all hover:scale-110 border border-white/5 hover:border-[#ff6b00]/20"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link
              to="/contact"
              className="relative overflow-hidden group bg-white text-black px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 bg-[#ff6b00] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/5 text-slate-300 border border-white/5"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-slate-300 hover:text-[#ff6b00] bg-white/5 border border-white/5 rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-3xl border-t border-white/5 animate-in fade-in slide-in-from-top-4">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl font-mono text-[11px] font-bold uppercase tracking-widest transition-all ${
                  isActive(link.path)
                    ? "bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]"></div>
                )}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-5 bg-[#ff6b00] text-black rounded-2xl font-bold uppercase text-xs tracking-[0.2em] shadow-2xl shadow-orange-500/20"
              >
                Let's Collaborate
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
