import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Facebook, Instagram, Linkedin, LockKeyhole, Mail, MessageCircle, Send, ShieldCheck, User } from "lucide-react";
import { BsGithub, BsWhatsapp } from "react-icons/bs";
import SEO from "@/components/SEO";
import { SEO_PAGES } from "@/lib/SEOConfig";
import { ContactPageSchema } from "@/lib/structuredData";

const Contact: React.FC = () => {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!response.ok) throw new Error("Unable to send message");
      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
      window.setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("idle");
      window.alert("Failed to send message");
    }
  };

  const socials = [
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/fahad-ali-369649355/" },
    { name: "GitHub", icon: BsGithub, url: "https://github.com/fahadali297t" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
    { name: "Facebook", icon: Facebook, url: "https://facebook.com/zfahad4" },
  ];

  return (
    <section className={`contact-showcase ${isContactPage ? "contact-showcase--page" : ""}`}>
      {isContactPage && <SEO {...SEO_PAGES.contact} schema={ContactPageSchema} />}
      <div className="section-shell contact-layout">
        <div className="contact-copy">
          <span className="section-kicker section-kicker--light"><i /> Direct Access</span>
          <h2>Get in <em>Touch</em></h2>
          <p>Available for architectural consulting, backend development, and performance optimization.</p>

          <div className="contact-methods">
            <a href="https://wa.me/923326067339" target="_blank" rel="noopener noreferrer" className="contact-whatsapp">
              <span><BsWhatsapp /></span>
              <div><small>Quick Response</small><strong>WhatsApp</strong></div>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="mailto:fahadali2951@gmail.com" className="contact-email">
              <span><Mail /></span><div><small>Email</small><strong>fahadali2951@gmail.com</strong></div>
            </a>
            <div className="contact-socials">
              {socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}><social.icon /></a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          {status !== "idle" && (
            <div className="contact-form-status">
              {status === "sending" ? <span className="contact-spinner" /> : <span className="contact-success"><Check /></span>}
              <strong>{status === "sending" ? "Sending your message…" : "Message successfully sent"}</strong>
            </div>
          )}

          <div className="contact-form-heading">
            <h3>Drop a <em>Line</em></h3>
            <span aria-hidden="true"><i /><i /><i /></span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="contact-fields-row">
              <label>Full Name<div><User /><input required type="text" placeholder="Enter your name" value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} /></div></label>
              <label>Email Address<div><Mail /><input required type="email" placeholder="Enter your email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} /></div></label>
            </div>
            <label>Inquiry / Message<div className="contact-message-field"><MessageCircle /><textarea required rows={5} placeholder="Describe your project requirements…" value={formState.message} onChange={(event) => setFormState({ ...formState, message: event.target.value })} /></div></label>
            <button type="submit" disabled={status !== "idle"}>Send Message <ArrowRight /></button>
          </form>

          <footer className="contact-form-footer">
            <span><ShieldCheck /> Encrypted Connection</span>
            <span><LockKeyhole /> 0x2291 // Using secure channel</span>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Contact;
