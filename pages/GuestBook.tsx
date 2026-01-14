import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Clock, User, Zap } from "lucide-react";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar: string;
}

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    message:
      "Love the clean architectural feel of this portfolio. Truly artisan-grade work!",
    timestamp: "2 hours ago",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "2",
    name: "Marcello Rossi",
    message:
      "The microservices breakdown in the case studies is top-tier. Great job on the documentation.",
    timestamp: "5 hours ago",
    avatar: "https://i.pravatar.cc/150?u=marcello",
  },
];

const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    const saved = localStorage.getItem("guestbook_entries_v2");
    return saved ? JSON.parse(saved) : INITIAL_ENTRIES;
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("guestbook_entries_v2", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".input-card", {
        scale: 0.98,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
      });

      gsap.from(".message-item", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".messages-list",
          start: "top 90%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name: "Fahad Ali",
        message: message,
        timestamp: "Just now",
        avatar: "bg-gradient-to-br from-purple-600 to-pink-500",
      };

      setEntries([newEntry, ...entries]);
      setMessage("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen pt-24 sm:pt-32 pb-40 px-4 sm:px-6 flex flex-col items-center relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="bg-circle fixed top-[-10%] right-[-10%] w-[50vw] aspect-square bg-[#ff6b00]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="w-full max-w-4xl relative z-10 space-y-16">
        {/* Hero Section */}
        <header className="text-center space-y-6">
          <span className="hero-text text-[10px] sm:text-xs font-mono uppercase tracking-[0.4em] text-slate-500 block">
            The Guestbook
          </span>
          <h1 className="hero-text text-4xl sm:text-6xl md:text-7xl font-serif text-white leading-tight">
            Got something to say? <br />
            <span className="italic font-light opacity-80">
              I'd love to hear from you!
            </span>
          </h1>
        </header>

        {/* Input Card */}
        <section className="input-card">
          <div className="bg-[#0f0f11] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl space-y-8">
            {/* User Session Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  F
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    Fahad Ali
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      Writing Now
                    </span>
                  </div>
                </div>
              </div>
              <button className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
                Sign out
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts, feedback, or just say hello..."
                className="w-full bg-[#161618] border border-white/5 rounded-2xl p-6 text-slate-300 placeholder-slate-700 outline-none focus:ring-1 focus:ring-white/10 transition-all text-sm sm:text-base leading-relaxed resize-none min-h-[160px]"
              ></textarea>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className={`group flex items-center gap-4 px-8 py-3.5 bg-white text-black rounded-full font-bold text-sm tracking-tight transition-all
                    ${
                      isSubmitting || !message.trim()
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105 active:scale-95 shadow-xl hover:shadow-white/10"
                    }`}
                >
                  {isSubmitting ? "Posting..." : "Post Note"}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Messages List */}
        <section className="space-y-12">
          {/* Divider with Label */}
          <div className="relative py-8">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-white/[0.05]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-8 text-[10px] sm:text-xs font-mono text-slate-600 uppercase tracking-[0.4em] font-bold">
                Recent Messages
              </span>
            </div>
          </div>

          <div className="messages-list grid grid-cols-1 gap-6">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="message-item group relative p-8 bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] hover:border-white/10 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg ${
                      entry.avatar.includes("http") ? "p-0" : entry.avatar
                    }`}
                  >
                    {entry.avatar.includes("http") ? (
                      <img
                        src={entry.avatar}
                        alt={entry.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      entry.name.charAt(0)
                    )}
                  </div>

                  <div className="space-y-3 flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-[#ff6b00] transition-colors">
                        {entry.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-700 uppercase tracking-widest">
                        <Clock size={12} />
                        {entry.timestamp}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
                      {entry.message}
                    </p>
                  </div>
                </div>

                {/* Decorative zap for recent ones */}
                {entry.timestamp === "Just now" && (
                  <div className="absolute top-6 right-6">
                    <Zap size={14} className="text-[#ff6b00] animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guestbook;
