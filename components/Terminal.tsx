
import React from 'react';

interface TerminalProps {
  title?: string;
  children: React.ReactNode;
}

const Terminal: React.FC<TerminalProps> = ({ title = "artisan-shell", children }) => {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span className="text-xs font-mono text-slate-500">{title}</span>
        <div className="w-12"></div>
      </div>
      <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default Terminal;
