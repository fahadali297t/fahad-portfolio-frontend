import React, { Suspense, lazy, useEffect } from "react";
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
import SEO from "./components/SEO";
import { Toaster } from "react-hot-toast";
import {
  PersonSchema,
  WebsiteSchema,
} from "./lib/structuredData";
import { SITE } from "./lib/SEOConfig";

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

const PageLoader = () => (
  <div className="flex items-center justify-center py-32">
    <div className="w-10 h-10 rounded-full border-2 border-[#004aad] border-t-transparent animate-spin" />
  </div>
);


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
    <HelmetProvider>
      <SEO
        title={SITE.title}
        description={SITE.description}
        path="/"
        schema={[PersonSchema, WebsiteSchema]}
      />
      <Router>
      <ScrollToTop />
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

      <div className="min-h-screen flex flex-col bg-black text-white relative">
        <Navbar />
        <main className="flex-grow  relative z-10">
          <Suspense fallback={<PageLoader />}>
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
