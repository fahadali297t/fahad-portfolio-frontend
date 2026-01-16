import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Clock, User, Zap, LogIn } from "lucide-react";
import { supabase } from "../lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";
import toast from "react-hot-toast";


interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatar: string;
  created_at: string;
}

const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check auth state on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    fetchEntries();

    return () => subscription.unsubscribe();
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching guestbook:", error);
    } else if (data) {
      // Format the data to match our interface
      const formattedEntries: GuestbookEntry[] = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.user_name || "Anonymous",
        message: item.content,
        timestamp: new Date(item.created_at).toLocaleDateString(), // Simple formatting
        avatar: item.user_avatar || "",
        created_at: item.created_at,
      }));
      setEntries(formattedEntries);
    }
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/guestbook",
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || isSubmitting) return;

    setIsSubmitting(true);

    const { error } = await supabase.from("guestbook").insert({
      content: message,
      user_id: user.id,
      user_email: user.email,
      user_name: user.user_metadata?.full_name || user.email?.split("@")[0],
      user_avatar: user.user_metadata?.avatar_url,
    });

    if (error) {
      console.error("Error posting message:", error);

      toast.error("Something went wrong. Please try again.", {
        icon: "⚠️",
      });
    } else {
      setMessage("");
      fetchEntries();

      toast.success("Your message has been posted!", {
        icon: "✨",
      });
    }

    setIsSubmitting(false);
  };


  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-screen pt-32 sm:pt-32 pb-40 px-4 sm:px-6 flex flex-col items-center relative overflow-hidden"
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
            {!user ? (
              <div className="text-center py-10 space-y-6">
                <h3 className="text-xl font-bold text-white">
                  Join the conversation
                </h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Sign in with Google to leave a permanent mark on my guestbook.
                </p>
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-bold text-sm tracking-tight hover:scale-105 transition-transform"
                >
                  <LogIn size={18} />
                  Sign in with Google
                </button>
              </div>
            ) : (
              <>
                {/* User Session Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg overflow-hidden">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.email?.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {user.user_metadata?.full_name || user.email}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                          Writing Now
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-[11px] font-mono text-slate-500 hover:text-white transition-colors uppercase tracking-widest"
                  >
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
              </>
            )}
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
            {entries.length === 0 ? (
              <p className="text-center text-slate-500 italic">No messages yet. Be the first!</p>
            ) : (
                entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="message-item group relative p-8 bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] hover:border-white/10 transition-all duration-500"
                    >
                      <div className="flex items-start gap-6">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg ${
                            entry.avatar && entry.avatar.includes("http") ? "p-0" : "bg-gradient-to-br from-gray-700 to-gray-600"
                          }`}
                        >
                          {entry.avatar && entry.avatar.includes("http") ? (
                            <img
                              src={entry.avatar}
                              alt={entry.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            entry.name.charAt(0).toUpperCase()
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
                    </div>
                  ))
            )}
           
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guestbook;

