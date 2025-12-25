import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SkillBarProps {
  name: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: '0%' },
        { 
          width: `${level}%`, 
          duration: 1.5, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 90%",
          }
        }
      );
    }
  }, [level]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{name}</span>
        <span className="text-xs font-mono text-[#ff6b00]">{level}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] rounded-full"
        />
      </div>
    </div>
  );
};

export default SkillBar;