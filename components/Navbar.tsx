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
    { name: "Setup", path: "/setup" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-[#ff6b00]/20 shadow-[0_4px_30px_rgba(255,107,0,0.05)] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <TerminalIcon className="w-8 h-8 text-[#ff6b00] group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#ff6b00] blur-lg opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              ARTISAN<span className="text-[#ff6b00]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-[#ff6b00] group ${
                  isActive(link.path)
                    ? "text-[#ff6b00]"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#ff6b00] transition-all duration-500 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-[#ff6b00] transition-all hover:scale-110 border border-transparent hover:border-[#ff6b00]/20"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/contact"
              className="relative overflow-hidden group bg-slate-950 dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 bg-[#ff6b00] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-[#ff6b00]/10 rounded-xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-4">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-4 rounded-xl text-xs font-bold uppercase tracking-widest ${
                  isActive(link.path)
                    ? "bg-[#ff6b00]/10 text-[#ff6b00]"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
