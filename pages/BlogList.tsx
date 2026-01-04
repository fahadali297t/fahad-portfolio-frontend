import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOG_POSTS, EnhancedBlog } from "../constants";
import { Search, ArrowUpRight, Clock, Calendar, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BlogCard: React.FC<{ blog: EnhancedBlog; index: number }> = ({
  blog,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  return (
    <Link to={`/blog/${blog.id}`} className="group block relative">
      <div ref={cardRef} className="relative flex flex-col h-full">
        {/* Image Container - Matching Reference Rounded Corners */}
        <div className="relative aspect-[1.5/1] overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] bg-[#111] border border-white/5">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Hover Arrow Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 sm:p-4 md:p-5 bg-[#ff6b00] rounded-full text-black opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-2xl">
            <ArrowUpRight
              size={20}
              className="sm:w-6 sm:h-6 md:w-7 md:h-7"
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Meta Row - Matching Reference Design */}
        <div className="flex items-center justify-between mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4">
          <div className="px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 bg-[#1a1a1a] rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-wider sm:tracking-widest text-slate-400 group-hover:bg-[#ff6b00] group-hover:text-black transition-all">
            {blog.category}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 text-[9px] sm:text-[10px] md:text-[11px] font-medium">
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            {blog.readTime}
          </div>
        </div>

        {/* Title - Clean, Bold Sans-serif as in reference */}
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-[#ff6b00] transition-colors duration-500 leading-tight">
          {blog.title}
        </h3>
      </div>
    </Link>
  );
};

const BlogList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredBlogs = useMemo(() => {
    return BLOG_POSTS.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Entrance reveal
      gsap.from(".header-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
      });

      // Background Parallax consistent with Projects/Services pages
      gsap.to(".bg-decoration", {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen pt-20 sm:pt-24 md:pt-16 pb-20 sm:pb-32 md:pb-40 px-3 sm:px-5 md:px-6 relative overflow-hidden"
    >
      {/* Decorative Parallax Glows - Pure dark aesthetic as requested */}
      <div className="bg-decoration fixed top-[-10%] left-[-10%] w-[70vw] sm:w-[60vw] aspect-square bg-[#ff6b00]/5 blur-[120px] sm:blur-[180px] md:blur-[200px] rounded-full pointer-events-none z-0"></div>
      <div className="bg-decoration fixed bottom-[-20%] right-[-10%] w-[50vw] sm:w-[40vw] aspect-square bg-orange-900/10 blur-[120px] sm:blur-[160px] md:blur-[180px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16 md:space-y-20 lg:space-y-32 relative z-10">
        {/* Page Header */}
        <header className="space-y-6 sm:space-y-10 md:space-y-12 lg:space-y-16 pt-4 sm:pt-8 md:pt-12">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl">
            <div className="header-reveal flex items-center gap-2 sm:gap-3 md:gap-4">
              <div className="w-8 sm:w-10 md:w-12 h-px bg-[#ff6b00]"></div>
              <span className="text-[7px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-[#ff6b00] font-bold">
                
              </span>
            </div>
            <h1 className="header-reveal text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference">
              RESOURCES & <br />
              <span className="text-slate-500 font-serif italic font-light lowercase">
                Guides
              </span>
              {/* <span className="ml-1.5 sm:ml-2 md:ml-4">GUIDES</span> */}
            </h1>
            <p className="header-reveal text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-500 font-light leading-relaxed max-w-3xl">
              Deep dives into Laravel internals, distributed systems, and the
              evolving landscape of high-performance backend engineering.
            </p>
          </div>
        </header>

        {/* Search Only Bar - Simplified and clean */}
        <section className="header-reveal z-10 py-4 sm:py-6 md:py-8 border-y border-white/5">
          <div className="max-w-xl mx-auto md:mx-0 relative">
            <Search
              className="absolute left-4 sm:left-5 md:left-6 top-1/2 -translate-y-1/2 text-slate-600"
              size={16}
            />
            <input
              type="text"
              placeholder="Filter topics, architecture, security..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 sm:pl-14 md:pl-16 pr-4 sm:pr-6 md:pr-8 py-3 sm:py-4 md:py-5 bg-white/5 border border-white/10 rounded-full text-white placeholder-slate-700 focus:ring-2 focus:ring-[#ff6b00]/30 outline-none transition-all text-xs sm:text-sm"
            />
          </div>
        </section>

        {/* Blog Grid - Clean Grid with Spacing */}
        <div className="min-h-[400px] sm:min-h-[500px]">
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-10 sm:gap-y-16 md:gap-y-20 lg:gap-y-32">
              {filteredBlogs.map((blog, idx) => (
                <BlogCard key={blog.id} blog={blog} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-20 sm:py-32 md:py-40 text-center flex flex-col items-center gap-4 sm:gap-5 md:gap-6 opacity-30">
              <BookOpen
                size={60}
                className="sm:w-16 sm:h-16 md:w-20 md:h-20"
                strokeWidth={1}
              />
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter">
                  No logs found.
                </h3>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-wider sm:tracking-widest">
                  Adjust your technical query
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Newsletter Callout */}
        <section className="relative py-12 sm:py-20 md:py-32 lg:py-40 text-center space-y-6 sm:space-y-10 md:space-y-12">
          <div className="bg-decoration absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] md:w-[600px] h-[90%] sm:h-[80%] md:h-[600px] bg-[#ff6b00]/5 blur-[80px] sm:blur-[100px] md:blur-[120px] rounded-full pointer-events-none"></div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8 relative px-3 sm:px-4">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              STAY IN THE <br />{" "}
              <span className="text-[#ff6b00] font-serif italic font-light lowercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[8vw]">
                architectural
              </span>{" "}
              <br /> LOOP
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed px-2">
              Join 2,500+ senior engineers receiving monthly deep dives into the
              internals of the systems that power the web.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-8 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 bg-white/5 border border-white/10 rounded-full text-white placeholder-slate-700 outline-none focus:ring-2 focus:ring-[#ff6b00]/30 transition-all text-sm sm:text-base"
              />
              <button className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 lg:py-6 bg-[#ff6b00] text-black rounded-full font-black text-sm sm:text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/20">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogList;
