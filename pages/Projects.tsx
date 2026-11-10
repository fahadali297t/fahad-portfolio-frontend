import React from "react";
import ProjectsSection from "./ProjectsPage";
import SEO from "@/components/SEO";
import { SEO_PAGES } from "@/lib/SEOConfig";
import { CollectionPageSchema } from "@/lib/structuredData";

const Projects: React.FC = () => {
  return (
    <main className="showcase-page">
      <SEO {...SEO_PAGES.projects} schema={CollectionPageSchema} />
      <ProjectsSection />
    </main>
  );
};

export default Projects;
