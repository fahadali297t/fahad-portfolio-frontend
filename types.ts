export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "Backend" | "Wordpress" | "Frontend" | "DevOps" | "Database";
}

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  image?: string;
}

export interface Blog {
  id: number;
  category: string;
  readTime: string;
  title: string;
  image: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
  cta: string;
  icon: string;
}