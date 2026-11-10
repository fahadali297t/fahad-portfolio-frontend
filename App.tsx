import React, { Suspense, lazy, useEffect, useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Setup = lazy(() => import("./pages/Setup"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Guestbook = lazy(() => import("./pages/GuestBook"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Pricing = lazy(() => import("./pages/Pricing"));

gsap.registerPlugin(ScrollTrigger);

// Scroll to top and refresh ScrollTrigger on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    // Clear any stuck pins or spacers from previous routes
    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (!hash) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }

    // Allow a tiny delay for DOM to settle before refreshing triggers
    const timer = setTimeout(() => {
      if (hash) {
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

const RouteTransition = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`route-transition ${visible ? "is-active" : ""}`} aria-hidden="true">
      <div className="route-transition__panel route-transition__panel--top" />
      <div className="route-transition__panel route-transition__panel--bottom" />
      <div className="route-transition__mark"><i /><i /></div>
      <span>Fahad Ali</span>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Force dark mode class on html element
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <HelmetProvider>
      <Router>
      <ScrollToTop />
      <RouteTransition />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "rgba(15,15,17,0.95)",
            color: "#fff",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",

            /* 👇 size fixes */
            fontSize: "16px",
            padding: "16px 20px",
            minWidth: "320px",
            lineHeight: "1.4",
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

      <div className="site-app-shell min-h-screen flex flex-col text-white relative">
        <Navbar />
        <main className="site-route-main flex-grow relative z-10">
          <Suspense fallback={null}>
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
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/schedule-call" element={<Schedule />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
    </HelmetProvider>
  );
};




export default App;
