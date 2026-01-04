import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'License', path: '#' },
    // { name: 'Style guide', path: '#' },
    // { name: 'Changelog', path: '#' },
    // { name: 'Instruction', path: '#' },
    { name: '404', path: '#' },
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Separator Line */}
        <div className="h-px w-full bg-white/10"></div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {footerLinks.map((link, i) => (
            <Link 
              key={i} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-[#ff6b00] ${link.name === 'Home' ? 'text-white' : 'text-slate-500'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Copyright Notice */}
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-light flex flex-wrap justify-center items-center gap-2">
            <span>© Copyright -</span> 
            <a href="#" className="text-white hover:text-[#ff6b00] transition-colors underline underline-offset-4 decoration-white/20">Fahad Ali</a>
            {/* <span className="mx-1 opacity-50">Designed by</span>
            <a href="#" className="text-white hover:text-[#ff6b00] transition-colors underline underline-offset-4 decoration-white/20">Anova Flow</a> */}
            {/* <span className="mx-1 opacity-50">| License Powered by</span>
            <a href="#" className="text-white hover:text-[#ff6b00] transition-colors underline underline-offset-4 decoration-white/20">Webflow</a> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;