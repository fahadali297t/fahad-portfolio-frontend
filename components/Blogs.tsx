import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOG_POSTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Blogs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.blog-card');
      
      cards.forEach((card: any, i: number) => {
        const direction = i % 2 === 0 ? -100 : 100; // Left or Right
        
        gsap.from(card, {
          x: direction,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header from provided image */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white">
            RESOURCES & <br/>
            <span className="text-[#ff6b00] font-serif italic font-light lowercase">guides</span>
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {BLOG_POSTS.map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card group cursor-pointer block">
              {/* Image with rounded corners as in visual */}
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 border border-white/5">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-bold tracking-widest text-slate-400 group-hover:bg-[#ff6b00] group-hover:text-black transition-all">
                  {blog.category}
                </span>
                <span className="text-slate-500 text-xs">• {blog.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#ff6b00] transition-colors leading-tight max-w-lg">
                {blog.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* See All Button */}
        <div className="mt-24 flex justify-center">
          <button className="group flex items-center gap-4 px-10 py-4 border border-white/20 rounded-full font-bold text-white hover:bg-white/5 transition-all">
            <span className="text-sm uppercase tracking-widest">See All Blogs</span>
            <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Blogs;
