import React, { useState } from 'react';
import { Send, Mail, MapPin, CalendarDays, Facebook, Linkedin, Youtube, Twitter, Check } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formState);
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  const contactInfo = [
    {
      icon: CalendarDays,
      title: "Call Today",
      value: "+1 (555) 123-4567"
    },
    {
      icon: Mail,
      title: "Email Me",
      value: "designer@example.com"
    },
    {
      icon: MapPin,
      title: "Office location",
      value: "12273 Dream Avenue, London United Kingdom"
    }
  ];

  const socials = [
    { Icon: Facebook, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Youtube, href: "#" },
    { Icon: Twitter, href: "#" }
  ];

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Branding & Info */}
        <div className="space-y-16">
          <div className="space-y-2">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
              LET'S WORK
            </h2>
            <h2 className="text-5xl md:text-7xl font-serif italic text-[#ff6b00] leading-[0.9] tracking-tight">
              TOGETHER
            </h2>
          </div>

          <div className="space-y-8">
            {contactInfo.map((info, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all duration-500">
                  <info.icon size={24} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white tracking-wide">{info.title}</h4>
                  <p className="text-slate-400 font-light">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 pt-8">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Follow us on :</h4>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-slate-300 hover:bg-[#ff6b00] hover:text-black transition-all duration-300"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="bg-[#1a1a1a] rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
          <div className="mb-10">
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
              Drop Me <span className="font-serif italic text-[#ff6b00] font-light">A Line</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="Name"
                required
                className="w-full px-8 py-5 bg-[#262626] border-none rounded-full text-white placeholder-slate-500 focus:ring-2 focus:ring-[#ff6b00]/30 outline-none transition-all"
                onChange={(e) => setFormState({...formState, name: e.target.value})}
              />
              <input 
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-8 py-5 bg-[#262626] border-none rounded-full text-white placeholder-slate-500 focus:ring-2 focus:ring-[#ff6b00]/30 outline-none transition-all"
                onChange={(e) => setFormState({...formState, email: e.target.value})}
              />
              <textarea 
                placeholder="Project Brief"
                required
                rows={5}
                className="w-full px-8 py-6 bg-[#262626] border-none rounded-[2rem] text-white placeholder-slate-500 focus:ring-2 focus:ring-[#ff6b00]/30 outline-none transition-all resize-none"
                onChange={(e) => setFormState({...formState, message: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={isSent}
              className={`w-full py-5 rounded-full font-bold text-lg tracking-wide transition-all duration-500 flex items-center justify-center gap-3
                ${isSent 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[#ff6b00] text-black hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#ff6b00]/10'
                }`}
            >
              {isSent ? (
                <>
                  <Check size={20} />
                  <span>Sent Successfully</span>
                </>
              ) : (
                <span>Send</span>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;