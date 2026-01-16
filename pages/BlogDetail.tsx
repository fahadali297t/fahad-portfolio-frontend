import React, { useEffect, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BLOG_POSTS, EnhancedBlog } from '../constants';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark,
  Quote,
  Calendar,
  Clock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = useMemo(() => BLOG_POSTS.find(b => b.id === Number(id)) as EnhancedBlog, [id]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll to top on mount/id change
    window.scrollTo(0, 0);

    if (!blog) return;

    const ctx = gsap.context(() => {
      // Small delay to ensure content is rendered before refreshing ScrollTrigger
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      // Parallax hero image
      gsap.to(".hero-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Reading content entrance
      gsap.from(".read-animate", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-area",
          start: "top 85%",
        }
      });

      return () => clearTimeout(refreshTimeout);
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [id, blog]);

  if (!blog) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Blog Not Found</h1>
        <Link to="/" className="text-[#ff6b00] hover:underline font-mono text-sm uppercase tracking-widest">Back to Home</Link>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen overflow-x-hidden"
    >
      {/* Fixed Back Button - Reliable Navigation */}
      <div className=" hidden lg:fixed top-24 left-8 z-50">
        <Link
          to="/"
          className="p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-[#ff6b00] hover:text-black transition-all group flex items-center justify-center shadow-2xl"
          aria-label="Back to home"
        >
          <ArrowLeft
            size={24}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Hero Header */}
      <section className="hero-container relative h-[65vh] md:h-[75vh] flex items-end pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src={blog.image}
            className="hero-img w-full h-[125%] object-cover grayscale-[0.2] opacity-40"
            alt={blog.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full space-y-8">
          <div className="flex flex-wrap items-center gap-6">
            <span className="px-5 py-2 bg-[#ff6b00] text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
              {blog.category}
            </span>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest">
              <Calendar size={14} className="text-[#ff6b00]" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest">
              <Clock size={14} className="text-[#ff6b00]" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-[6rem] font-black tracking-tighter uppercase leading-[0.90] max-w-5xl">
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="content-area py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Left: Article Meta Sidebar */}
        <aside className="lg:col-span-3 space-y-16 lg:sticky lg:top-32 self-start hidden lg:block">
          <div className="space-y-6">
            <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-[0.4em] block">
              Architect
            </span>
            <div className="flex items-center gap-4">
              <img
                src={blog.author.avatar}
                className="w-14 h-14 rounded-2xl border border-white/10"
                alt={blog.author.name}
              />
              <div>
                <p className="font-bold text-lg leading-none">
                  {blog.author.name}
                </p>
                <p className="text-slate-500 text-[10px] font-mono uppercase tracking-widest mt-1">
                  {blog.author.role}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-[0.4em] block">
              Technical Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-white/5 rounded-md border border-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-8 border-t border-white/10">
            <button
              className="p-3 bg-white/5 rounded-full hover:bg-[#ff6b00] hover:text-black transition-all"
              title="Share Article"
            >
              <Share2 size={20} />
            </button>
            <button
              className="p-3 bg-white/5 rounded-full hover:bg-[#ff6b00] hover:text-black transition-all"
              title="Bookmark"
            >
              <Bookmark size={20} />
            </button>
          </div>
        </aside>

        {/* Right: Article Body */}
        <article className="lg:col-span-9 space-y-16">
          <div className="read-animate space-y-10">
            <p className="text-xl md:text-3xl text-slate-300 font-light leading-relaxed">
              {blog.content}
            </p>

            <div className="h-px w-full bg-white/10"></div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
              Building{" "}
              <span className="text-[#ff6b00] font-serif italic font-light lowercase">
                resilient
              </span>{" "}
              infrastructure
            </h2>

            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
              Backend engineering is often the invisible force that defines a
              project's success. It's not just about writing clean PHP or
              leveraging the latest Laravel features; it's about predicting how
              data will move, where bottlenecks will form, and how to build a
              system that can heal itself under pressure.
            </p>
          </div>

          {blog.quote && (
            <div className="read-animate py-16 px-12 bg-white/[0.03] rounded-[3rem] border-l-[8px] border-[#ff6b00] relative group">
              <Quote
                size={64}
                className="absolute -top-6 -left-6 text-[#ff6b00] opacity-10 group-hover:scale-110 transition-transform"
              />
              <p className="text-2xl md:text-4xl font-serif italic text-white leading-tight relative z-10">
                "{blog.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-12 bg-[#ff6b00]"></div>
                <span className="text-sm font-mono uppercase tracking-[0.2em] text-slate-500">
                  Industry Insights
                </span>
              </div>
            </div>
          )}

          <div className="read-animate space-y-10">
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
              THE CORE{" "}
              <span className="text-[#ff6b00] font-serif italic font-light lowercase">
                implementation
              </span>
            </h3>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Every line of code should be an intentional choice. Whether you're
              optimizing an Eloquent query or setting up a complex message queue
              with RabbitMQ, the focus should always be on clarity and
              performance. As backends grow more complex, the value of
              simplicity increases exponentially.
            </p>

            <div className="aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a0a0a] group">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                alt="Technical visualization"
              />
            </div>

            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Designing for the future means understanding that the future is
              uncertain. We build systems that are decoupled, modular, and easy
              to extend. That is the true mark of an artisan.
            </p>
          </div>

          {/* Mobile Author Info */}
          <div className="lg:hidden p-10 bg-white/5 rounded-[2.5rem] border border-white/10 space-y-6">
            <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-widest font-bold">
              About Author
            </span>
            <div className="flex items-center gap-6">
              <img
                src={blog.author.avatar}
                className="w-16 h-16 rounded-2xl"
                alt={blog.author.name}
              />
              <div>
                <p className="font-bold text-xl leading-none">
                  {blog.author.name}
                </p>
                <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-2">
                  {blog.author.role}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Newsletter Section */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#ff6b00]/5 blur-[180px] rounded-full pointer-events-none"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            CRAFTED{" "}
            <span className="text-[#ff6b00] font-serif italic font-light lowercase">
              insight
            </span>{" "}
            <br />
            IN YOUR INBOX
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            Join a community of 2.5k+ senior engineers receiving monthly deep
            dives on architecture and Laravel internals.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-10 py-6 bg-white/5 border border-white/10 rounded-full text-white placeholder-slate-700 focus:ring-2 focus:ring-[#ff6b00]/30 outline-none w-full md:w-[450px] transition-all"
            />
            <button className="px-12 py-6 bg-[#ff6b00] text-black rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-orange-500/20 w-full md:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;