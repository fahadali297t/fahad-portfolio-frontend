import React, { useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  MessageCircle,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus("sending");

  //   /**
  //    * NOTE FOR FAHAD ALI:
  //    * To use your Google SMTP Credentials securely:
  //    * 1. DO NOT put them in this React file.
  //    * 2. If you have a Laravel backend: Create an API endpoint /api/contact.
  //    *    In your .env, put:
  //    *    MAIL_HOST=smtp.gmail.com
  //    *    MAIL_PORT=465
  //    *    MAIL_USERNAME=fahadali2951@gmail.com
  //    *    MAIL_PASSWORD=your_app_password
  //    * 3. Send 2 Mails from the Controller:
  //    *    - Mail::to($request->email)->send(new AutoReply());
  //    *    - Mail::to('fahadali2951@gmail.com')->send(new NewInquiry($request->all()));
  //    *
  //    * If you want a 100% frontend solution, use EmailJS.com or Web3Forms.com
  //    */

  //   // Simulating API call to your backend
  //   await new Promise((resolve) => setTimeout(resolve, 1500));

  //   console.log("Dual Email Protocol Executed");
  //   console.log("1. Confirmation sent to: " + formState.email);
  //   console.log("2. Lead data sent to: fahadali2951@gmail.com");

  //   setStatus("sent");
  //   setFormState({ name: "", email: "", message: "" });
  //   setTimeout(() => setStatus("idle"), 5000);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (response.ok) {
      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("idle");
      alert("Failed to send message");
    }
  };

  return (
    <section className="bg-black text-white py-32 px-6 md:px-12 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start w-full">
        {/* Information Column */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap size={14} className="text-[#ff6b00]" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] font-black">
                Direct Access
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              GET IN <br />
              <span className="text-[#ff6b00] font-serif italic font-light lowercase">
                touch
              </span>
            </h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed max-w-md">
              Available for architectural consulting, backend development, and
              performance optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* WhatsApp Premium Card */}
            <a
              href="https://wa.me/923326067339"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 md:p-8 bg-green-500/5 border border-green-500/20 rounded-[2.5rem] group hover:border-green-500/50 transition-all shadow-[0_0_40px_rgba(34,197,94,0.05)]"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <MessageCircle size={32} strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-mono text-green-500 uppercase tracking-widest font-black">
                    Direct Response
                  </p>
                  <p className="text-2xl font-bold text-white uppercase">
                    WhatsApp
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="text-green-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                size={24}
              />
            </a>

            {/* Email Card */}
            <div className="flex items-center gap-6 p-6 md:p-8 bg-white/5 border border-white/5 rounded-[2.5rem]">
              <div className="w-16 h-16 md:bg-white/5 rounded-2xl flex items-center justify-center text-[#ff6b00]">
                <Mail size={28} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">
                  Email Registry
                </p>
                <p className="text-md font-bold text-white">
                  fahadali2951@gmail.com
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-6 p-6 md:p-8 bg-white/5 border border-white/5 rounded-[2.5rem]">
              <div className="w-16 h-16 md:bg-white/5 rounded-2xl flex items-center justify-center text-slate-500">
                <Globe size={28} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black">
                  Base Location
                </p>
                <p className="text-md font-bold text-white">
                  Sargodha, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-[#0a0a0a] rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl">
          {status === "sending" && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-6">
              <div className="w-12 h-12 border-2 border-[#ff6b00] border-t-transparent rounded-full animate-spin"></div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#ff6b00]">
                Sending Your Message...
              </p>
            </div>
          )}

          {status === "sent" && (
            <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-black">
                <Check size={40} strokeWidth={3} />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter">
                  Message Successfully Transmitted
                </h3>
                <p className="text-slate-400 font-light">
                  Emails dispatched. Checking registry...
                </p>
              </div>
            </div>
          )}

          <div className="mb-12">
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              DROP A{" "}
              <span className="font-serif italic text-[#ff6b00] font-light lowercase">
                line
              </span>
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black ml-4">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-6 xl:px-8 rounded-[1.5rem] xl:rounded-full py-5 bg-white/5 border border-white/5  text-white placeholder-slate-400 focus:ring-1 focus:ring-[#ff6b00]/40 outline-none transition-all"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black ml-4">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-6 xl:px-8 py-5 rounded-[1.5rem] xl:rounded-full bg-white/5 border border-white/5  text-white placeholder-slate-400 focus:ring-1 focus:ring-[#ff6b00]/40 outline-none transition-all"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black ml-4">
                Inquiry / Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe your project requirements..."
                className="w-full px-6 xl:px-8 py-5 rounded-[1.5rem] xl:rounded-[2.5rem] bg-white/5 border border-white/5  text-white placeholder-slate-400 focus:ring-1 focus:ring-[#ff6b00]/40 outline-none transition-all resize-none"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="group w-full py-6 bg-[#ff6b00] text-black rounded-full font-black text-sm uppercase tracking-[0.3em] transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-4"
            >
              <span>Send</span>
              <Send
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] font-mono text-slate-700 uppercase tracking-widest font-black">
              <ShieldCheck size={14} className="text-green-500/50" />
              <span>Encrypted Connection</span>
            </div>
            <span className="text-[10px] font-mono text-slate-800">
              0x2291 // Using secure channel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
