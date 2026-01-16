import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Setup from "./pages/Setup";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
// import CaseStudies from "./pages/CaseStudies";
import Guestbook from "./pages/GuestBook";
import { Toaster } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

// Scroll to top and refresh ScrollTrigger on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Clear any stuck pins or spacers from previous routes
    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (!hash) {
      window.scrollTo(0, 0);
    }

    // Allow a tiny delay for DOM to settle before refreshing triggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Force dark mode class on html element
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(15,15,17,0.95)",
            color: "#fff",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#0f0f11",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#0f0f11",
            },
          },
        }}
      />
      ;
      <div className="min-h-screen flex flex-col bg-black text-white relative">
        <Navbar />
        <main className="flex-grow  relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            {/* <Route path="/case-studies" element={<CaseStudies />} /> */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/guestbook" element={<Guestbook />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};




export default App;
