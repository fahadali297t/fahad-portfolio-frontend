import { SITE, getPageUrl } from "./SEOConfig";

export const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fahad Ali",
  url: SITE.url,
  image: `${SITE.url}/profile.webp`,
  jobTitle: "Full Stack Web Developer",
  description:
    "Full Stack Web Developer from Pakistan specializing in Laravel, React.js, PHP, Tailwind CSS, and MySQL.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "Pakistan",
  },
  knowsAbout: [
    "Laravel",
    "React.js",
    "PHP",
    "Tailwind CSS",
    "MySQL",
    "WordPress",
    "REST APIs",
  ],
  sameAs: [],
};

export const WebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en-US",
  publisher: {
    "@type": "Person",
    name: "Fahad Ali",
  },
};

export const ProfileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "About Fahad Ali",
  url: getPageUrl("about"),
  mainEntity: PersonSchema,
};

export const CollectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects - Fahad Ali Portfolio",
  url: getPageUrl("projects"),
  description: SITE.description,
};

export const ContactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Fahad Ali",
  url: getPageUrl("contact"),
  mainEntity: {
    "@type": "Person",
    name: "Fahad Ali",
    jobTitle: "Full Stack Web Developer",
    email: "mailto:contact@fahadali.tech",
  },
};

export const projectSchema = (project: {
  name: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: project.name,
  description: project.description,
  url: project.url,
  ...(project.image && { image: project.image }),
  author: {
    "@type": "Person",
    name: project.author ?? "Fahad Ali",
  },
  creator: {
    "@type": "Person",
    name: project.author ?? "Fahad Ali",
  },
});
