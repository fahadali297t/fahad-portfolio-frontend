export const SITE = {
  name: "Fahad Ali | Full Stack Web Developer",
  url: "https://www.fahadali.tech",
  title: "Fahad Ali | Full Stack Web Developer",
  description:
    "Fahad Ali is a Full Stack Web Developer from Pakistan specializing in Laravel, React.js, PHP, Tailwind CSS, and MySQL. Hire a Laravel + React developer for modern, high-performance web applications.",
  keywords: [
    "Full Stack Developer",
    "Laravel Developer",
    "React.js Developer",
    "PHP Developer",
    "Tailwind CSS Developer",
    "Web Developer Pakistan",
    "Laravel + React Developer",
    "Freelance Web Developer",
    "Fahad Ali",
  ].join(", "),
  author: "Fahad Ali",
  locale: "en_US",
  type: "website",
  ogImage: "https://www.fahadali.tech/og-image.png",
  twitterHandle: "@fahadali",
  favicon: "/favicon.png",
};

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  schema?: object | object[];
}

const page = (path: string) => `${SITE.url}${path}`;

export const SEO_PAGES: Record<string, SEOProps> = {
  home: {
    title: SITE.title,
    description: SITE.description,
    path: "/",
    keywords: SITE.keywords,
    ogType: "website",
  },
  about: {
    title: "About Fahad Ali | Full Stack & Laravel Developer from Pakistan",
    description:
      "Learn about Fahad Ali, a Full Stack Web Developer from Pakistan with expertise in Laravel, React.js, PHP, Tailwind CSS, and MySQL. Discover my journey, skills, and experience building web applications.",
    path: "/about",
    keywords: [
      "About Fahad Ali",
      "Full Stack Developer Pakistan",
      "Laravel Developer",
      "React.js Developer",
      "Web Developer Bio",
    ].join(", "),
    ogType: "profile",
  },
  projects: {
    title: "Projects | Fahad Ali - Laravel & React.js Developer Portfolio",
    description:
      "Explore the portfolio of Fahad Ali: Laravel, React.js, PHP, and Tailwind CSS projects including clinic management systems, e-commerce platforms, and custom web applications.",
    path: "/projects",
    keywords: [
      "Web Developer Portfolio",
      "Laravel Projects",
      "React.js Projects",
      "PHP Developer Portfolio",
      "Full Stack Developer Pakistan",
    ].join(", "),
    ogType: "website",
  },
  skills: {
    title: "Skills | Fahad Ali - Laravel, React.js, PHP & Tailwind CSS Developer",
    description:
      "Technical skills of Fahad Ali, Full Stack Web Developer: Laravel, React.js, PHP, Tailwind CSS, MySQL, WordPress, REST APIs, and modern web development tools.",
    path: "/about#skills",
    keywords: [
      "Laravel Developer Skills",
      "React.js Developer Skills",
      "PHP Developer Skills",
      "Tailwind CSS Developer Skills",
      "MySQL Developer",
    ].join(", "),
    ogType: "website",
  },
  experience: {
    title: "Experience | Fahad Ali - Full Stack Web Developer",
    description:
      "Professional experience of Fahad Ali, a Full Stack Web Developer from Pakistan with proven experience building scalable Laravel + React.js applications for clients.",
    path: "/about#experience",
    keywords: [
      "Full Stack Developer Experience",
      "Laravel + React Developer",
      "Web Developer Pakistan",
      "Freelance Developer Experience",
    ].join(", "),
    ogType: "website",
  },
  contact: {
    title: "Contact Fahad Ali | Hire a Laravel + React Developer",
    description:
      "Hire Fahad Ali, a Full Stack Web Developer from Pakistan. Get a quote for Laravel, React.js, PHP, and Tailwind CSS web development projects. Contact me today.",
    path: "/contact",
    keywords: [
      "Hire Laravel Developer",
      "Hire React.js Developer",
      "Hire PHP Developer",
      "Freelance Web Developer Pakistan",
      "Web Developer Contact",
    ].join(", "),
    ogType: "website",
  },
};

export const getPageUrl = (key: keyof typeof SEO_PAGES) => page(SEO_PAGES[key].path ?? "/");
