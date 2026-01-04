import React from 'react';
import { Server, Database, Code2, Globe, Cpu, Layout , Box, Monitor,  ShieldCheck, Zap, Layers, Search, Terminal } from 'lucide-react';
import { Project, Service, Skill, TimelineItem, Blog } from './types';

export interface EnhancedProject extends Project {
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  type: string;
  category: "SaaS" | "Fintech" | "E-commerce" | "DevOps";
  year: string;
  role: string;
  fullDescription: string;
  techStackDetailed: string[];
  gallery: string[];
  codeSnippet: string;
}

export interface EnhancedService extends Service {
  fullDescription: string;
  capabilities: { title: string; desc: string; icon: any }[];
  process: { step: string; title: string; desc: string }[];
  relatedTech: string[];
  bgImage: string;
}

export interface EnhancedBlog extends Blog {
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  tags: string[];
  quote?: string;
}

export const PROJECTS: EnhancedProject[] = [
  {
    id: 1,
    title: "AURORA",
    type: "FINANCIAL SAAS ENGINE",
    category: "Fintech",
    year: "2023",
    role: "Lead Backend Architect",
    description: "A high-performance redesign created to elevate brand trust and improve user engagement for modern fintech.",
    fullDescription: "Aurora is a next-generation financial management engine designed to handle millions of transactions with sub-80ms latency. The project involved migrating a monolithic legacy system to a robust microservices architecture using Laravel 11 and Redis.",
    challenge: "The primary challenge was modernizing a legacy PHP 7.4 codebase without downtime.",
    solution: "We architected a 'strangler fig' pattern to incrementally replace old services.",
    techStackDetailed: ["Laravel 11", "Redis", "PostgreSQL", "Docker", "AWS SQS", "Pusher"],
    metrics: [
      { value: "85ms", label: "Avg Response Time" },
      { value: "40%", label: "Cloud Cost Savings" },
      { value: "99.9%", label: "System Uptime" }
    ],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    ],
    codeSnippet: `// Ledger Entry Logic\nDB::transaction(fn() => $ledger->increment('bal', $amt));`,
    tags: ["Laravel", "Redis", "Microservices"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 2,
    title: "NATURELY",
    type: "E-COMMERCE BACKBONE",
    category: "E-commerce",
    year: "2022",
    role: "Senior Developer",
    description: "A streamlined, conversion-focused redesign built to simplify user flows and strengthen customer confidence.",
    fullDescription: "Naturely required a complete overhaul of its e-commerce backend to support a multi-tenant marketplace structure.",
    challenge: "Handling concurrent stock updates across thousands of stores while maintaining zero-latency search.",
    solution: "Implemented an asynchronous queue system using RabbitMQ and optimized the search layer.",
    techStackDetailed: ["Laravel", "Elasticsearch", "RabbitMQ", "MySQL", "Vite", "Inertia.js"],
    metrics: [
      { value: "55%", label: "Sales Conversion" },
      { value: "32%", label: "User Growth" },
      { value: "50ms", label: "Search Latency" }
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200"
    ],
    codeSnippet: `// Multi-tenant Store Scoping\n$builder->where('store_id', app('currentStore')->id);`,
    tags: ["Laravel", "PostgreSQL", "Multi-tenancy"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 3,
    title: "FINPAY",
    type: "MOBILE WALLET API",
    category: "Fintech",
    year: "2024",
    role: "API Architect",
    description: "A bold, performance-driven landing page and API optimized for mobile lead capture and acquisition.",
    fullDescription: "FinPay is a robust mobile wallet API designed for secure cross-border payments utilizing Laravel Octane.",
    challenge: "Integrating with 15+ different regional payment gateways with varying data formats.",
    solution: "Built a unified Adapter Pattern interface that normalized gateway responses.",
    techStackDetailed: ["Laravel Octane", "Swoole", "Redis", "OAuth2", "Postman", "Forge"],
    metrics: [
      { value: "1.2k", label: "Requests / Sec" },
      { value: "99.9%", label: "Uptime" },
      { value: "100%", label: "PCI Compliance" }
    ],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1200"
    ],
    codeSnippet: `// Octane Remember\nCache::store('octane')->remember("auth:{$uid}", now()->addMin(5), $fn);`,
    tags: ["Laravel", "Pusher", "MySQL"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 4,
    title: "NEXUS",
    type: "INFRASTRUCTURE MONITOR",
    category: "DevOps",
    year: "2024",
    role: "DevOps Engineer",
    description: "A real-time server health monitoring dashboard for complex distributed infrastructures.",
    fullDescription: "Nexus provides real-time visibility into server health, log aggregation, and automated incident response.",
    challenge: "Processing gigabytes of log data every minute without affecting server performance.",
    solution: "Utilized Go-based sidecars for log ingestion and a specialized InfluxDB storage layer.",
    techStackDetailed: ["Docker", "Kubernetes", "Go", "Prometheus", "Grafana", "Laravel"],
    metrics: [
      { value: "2s", label: "Alert Latency" },
      { value: "5TB", label: "Data/Day" },
      { value: "100%", label: "Uptime Visibility" }
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"],
    codeSnippet: `// Prometheus Metric Push\nCounter::build()->name('hits')->inc();`,
    tags: ["Kubernetes", "Docker", "Prometheus"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 5,
    title: "SENTINEL",
    type: "AUTH SECURITY SUITE",
    category: "SaaS",
    year: "2023",
    role: "Security Architect",
    description: "An advanced authentication and authorization suite for enterprise-level applications.",
    fullDescription: "Sentinel provides multi-factor authentication, biometric verification, and granular RBAC out of the box.",
    challenge: "Maintaining a frictionless user experience while enforcing strict Zero-Trust security policies.",
    solution: "Implemented device-fingerprinting and behavioral analysis for risk-based authentication.",
    techStackDetailed: ["PHP 8.3", "Laravel", "Auth0", "Redis", "PostgreSQL", "WebAuthn"],
    metrics: [
      { value: "Zero", label: "Breaches" },
      { value: "200ms", label: "Auth Delay" },
      { value: "95%", label: "MFA Adoption" }
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200"],
    codeSnippet: `// WebAuthn Challenge\n$challenge = $webauthn->generateChallenge();`,
    tags: ["Security", "OAuth2", "Laravel"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 6,
    title: "QUANTUM",
    type: "AI SCHEDULING PLATFORM",
    category: "SaaS",
    year: "2024",
    role: "Backend Lead",
    description: "An AI-driven scheduling tool that optimizes employee shifts based on traffic predictions.",
    fullDescription: "Quantum uses machine learning models to predict peak business hours and suggests optimal staffing levels.",
    challenge: "Calculating complex shift patterns for 500+ employees in real-time.",
    solution: "Developed a custom genetic algorithm optimized with Laravel's job batching for parallel processing.",
    techStackDetailed: ["Laravel", "Python", "Redis", "MySQL", "AWS Lambda", "Tails"],
    metrics: [
      { value: "15%", label: "Labor Savings" },
      { value: "98%", label: "Staff Sat." },
      { value: "10m", label: "Gen. Time" }
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    gallery: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"],
    codeSnippet: `// Batch Optimization\nBus::batch($jobs)->dispatch();`,
    tags: ["AI", "Scheduling", "Laravel"],
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CTO at FinStream",
    content: "The API architecture delivered was flawless. Our latency dropped by 40% after the migration to the new microservices structure.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "Marcello Rossi",
    role: "Lead Architect",
    content: "Rare to find a developer who truly understands the internals of the Eloquent ORM. The database optimizations saved us thousands in RDS costs.",
    avatar: "https://i.pravatar.cc/150?u=marcello"
  },
  {
    id: 3,
    name: "Elena de Luca",
    role: "Product Manager",
    content: "Professional, communicative, and exceptionally skilled in TDD. Every feature was delivered with 100% test coverage.",
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];


export const SERVICES: EnhancedService[] = [
  {
    id: 1,
    title: "Custom Website Development",
    description:
      "Responsive, fast, and SEO-friendly websites built to convert.",
    icon: Code2,
    bgImage:
      "https://images.unsplash.com/photo-1581091870621-3a20837d1f6f?w=500&auto=format&fit=crop&q=60",
    fullDescription:
      "I build modern, responsive websites tailored to your brand and business goals. Using technologies like HTML, CSS, JS, and React or Vue, I create websites that are fast, interactive, and optimized for SEO and conversions.",
    capabilities: [
      {
        title: "Responsive Design",
        desc: "Websites that look perfect on mobile, tablet, and desktop.",
        icon: Layout,
      },
      {
        title: "SEO Optimization",
        desc: "Technical and on-page SEO for better search visibility.",
        icon: Globe,
      },
      {
        title: "Performance",
        desc: "Optimized for fast loading and smooth UX.",
        icon: Zap,
      },
      {
        title: "Custom Features",
        desc: "Forms, sliders, animations, and dynamic content.",
        icon: Terminal,
      },
    ],
    process: [
      {
        step: "01",
        title: "Requirement Gathering",
        desc: "Understanding your goals, target audience, and features.",
      },
      {
        step: "02",
        title: "Design & Prototype",
        desc: "Creating wireframes and high-fidelity mockups for approval.",
      },
      {
        step: "03",
        title: "Development & Launch",
        desc: "Turning designs into code and deploying a fully functional website.",
      },
    ],
    relatedTech: ["HTML", "CSS", "JavaScript", "React", "Vue"],
  },
  {
    id: 2,
    title: "WordPress Development",
    description: "Custom themes, plugins, and full WordPress solutions.",
    icon: Box,
    bgImage:
      "https://images.unsplash.com/photo-1609944172732-07d59a8b2040?w=500&auto=format&fit=crop&q=60",
    fullDescription:
      "I create professional WordPress websites with custom themes and plugins. From simple blogs to full e-commerce sites, your WordPress site will be fast, secure, and easy to manage.",
    capabilities: [
      {
        title: "Custom Themes",
        desc: "Tailored WordPress themes matching your brand.",
        icon: Layout,
      },
      {
        title: "Plugin Development",
        desc: "Custom functionality to meet unique requirements.",
        icon: Zap,
      },
      {
        title: "Performance & Security",
        desc: "Optimized for speed and protected against attacks.",
        icon: ShieldCheck,
      },
      {
        title: "Maintenance",
        desc: "Updates, backups, and site monitoring.",
        icon: Monitor,
      },
    ],
    process: [
      {
        step: "01",
        title: "Setup & Planning",
        desc: "Choosing hosting, plugins, and overall site structure.",
      },
      {
        step: "02",
        title: "Theme & Plugin Customization",
        desc: "Developing or modifying theme and plugins for your needs.",
      },
      {
        step: "03",
        title: "Launch & Training",
        desc: "Deploying the website and teaching you to manage it easily.",
      },
    ],
    relatedTech: ["WordPress", "PHP", "Elementor", "WooCommerce", "ACF"],
  },
  {
    id: 3,
    title: "E-Commerce Development",
    description: "Online stores that sell and scale with your business.",
    icon: Globe,
    bgImage:
      "https://images.unsplash.com/photo-1612832021151-9490b71edbdf?w=500&auto=format&fit=crop&q=60",
    fullDescription:
      "I develop fully functional e-commerce websites with Shopify, WooCommerce, or custom solutions. Features include payment gateways, product management, and inventory control, all designed to drive sales and customer satisfaction.",
    capabilities: [
      {
        title: "Store Setup",
        desc: "Products, categories, and payment integration.",
        icon: Code2,
      },
      {
        title: "Custom Features",
        desc: "Dynamic pricing, discounts, subscriptions, and more.",
        icon: Zap,
      },
      {
        title: "Analytics & Tracking",
        desc: "Integrate Google Analytics, conversions, and sales reports.",
        icon: Terminal,
      },
      {
        title: "Mobile Optimized",
        desc: "Seamless shopping experience across all devices.",
        icon: Monitor,
      },
    ],
    process: [
      {
        step: "01",
        title: "Platform Selection",
        desc: "Choosing WooCommerce, Shopify, or custom stack.",
      },
      {
        step: "02",
        title: "Design & Development",
        desc: "Building an intuitive UI and integrating features.",
      },
      {
        step: "03",
        title: "Launch & Optimization",
        desc: "Testing checkout flow, SEO, and analytics setup.",
      },
    ],
    relatedTech: ["WooCommerce", "Shopify", "Stripe", "PayPal", "JavaScript"],
  },
  {
    id: 4,
    title: "UI/UX Design",
    description:
      "Intuitive and visually appealing interfaces that engage users.",
    icon: Layout,
    bgImage:
      "https://images.unsplash.com/photo-1581093458792-5f9c0d0f05b2?w=500&auto=format&fit=crop&q=60",
    fullDescription:
      "Design is more than visuals — it’s about creating experiences. I craft UI/UX designs that are user-friendly, accessible, and aligned with your brand identity. From wireframes to interactive prototypes, I focus on engaging users effectively.",
    capabilities: [
      {
        title: "Wireframing",
        desc: "Low-fidelity layouts for early feedback.",
        icon: Layout,
      },
      {
        title: "Prototyping",
        desc: "Interactive designs for usability testing.",
        icon: Terminal,
      },
      {
        title: "User Research",
        desc: "Understanding user behavior to guide design decisions.",
        icon: Globe,
      },
      {
        title: "Brand Consistency",
        desc: "Colors, typography, and elements aligned with your identity.",
        icon: ShieldCheck,
      },
    ],
    process: [
      {
        step: "01",
        title: "Research & Strategy",
        desc: "Understanding your target audience and goals.",
      },
      {
        step: "02",
        title: "Wireframes & Mockups",
        desc: "Designing the structure and look of your website.",
      },
      {
        step: "03",
        title: "Prototype & Feedback",
        desc: "Creating interactive designs and iterating based on feedback.",
      },
    ],
    relatedTech: ["Figma", "Adobe XD", "Sketch", "Tailwind", "Framer Motion"],
  },
];


export const SKILLS: Skill[] = [
  { name: "Laravel", level: 95, category: 'Backend' },
  { name: "PHP", level: 90, category: 'Backend' },
  { name: "MySQL / PostgreSQL", level: 85, category: 'Database' },
  { name: "Redis", level: 80, category: 'Database' },
  { name: "Docker", level: 75, category: 'DevOps' },
  { name: "AWS", level: 70, category: 'DevOps' },
  { name: "Vue.js / React", level: 65, category: 'Frontend' },
  { name: "Tailwind CSS", level: 80, category: 'Frontend' }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: 1,
    year: "2023 - PRESENT",
    title: "SENIOR BACKEND ENGINEER",
    company: "TECHNOVA STUDIO",
    description: "Led API architecture for SaaS platforms and cloud-native apps; collaborated with cross-functional teams to deliver high-performance systems.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 2,
    year: "2021 - 2023",
    title: "BACKEND DEVELOPER",
    company: "GROWTHSTACK CORE",
    description: "Redesigned core data models and query strategies, improving system throughput and reducing server latency by 45%.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    year: "2019 - 2021",
    title: "PHP ARTISAN",
    company: "DIGITAL CRAFT LABS",
    description: "Supported senior engineers in building robust middleware, authentication flows, and unit testing suites for e-commerce clients.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200"
  }
];

export const EDUCATION: TimelineItem[] = [
  {
    id: 1,
    year: "2017 - 2019",
    title: "M.SC. COMPUTER SCIENCE",
    company: "UNIVERSITY OF AMSTERDAM",
    description: "Focused on Distributed Systems and High-Performance Computing. Graduated with honors.",
  },
  {
    id: 2,
    year: "2013 - 2017",
    title: "B.SC. SOFTWARE ENGINEERING",
    company: "DELFT UNIVERSITY OF TECHNOLOGY",
    description: "Foundation in algorithms, data structures, and software architecture patterns.",
  }
];

export const BLOG_POSTS: EnhancedBlog[] = [
  {
    id: 1,
    category: "Architecture",
    readTime: "6 min read",
    date: "Feb 12, 2024",
    author: {
      name: "Artisan Dev",
      avatar: "https://i.pravatar.cc/150?u=artisan",
      role: "Lead Backend Engineer"
    },
    title: "The Power of Domain Driven Design in Laravel",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    content: "Domain-Driven Design (DDD) is not a set of rules, but a philosophy for building software. In the context of Laravel, it means moving beyond simple 'Models' and 'Controllers' to embrace Entities, Value Objects, and Repositories. By modeling the software based on the business domain, we reduce complexity and make the codebase more resilient to change.",
    tags: ["Laravel", "DDD", "Clean Code"],
    quote: "Architecture is the art of what to leave out to make the core shine."
  },
  {
    id: 2,
    category: "Performance",
    readTime: "5 min read",
    date: "Jan 28, 2024",
    author: {
      name: "Artisan Dev",
      avatar: "https://i.pravatar.cc/150?u=artisan",
      role: "Lead Backend Engineer"
    },
    title: "How Advanced Caching Strategies Shape User Experience",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    content: "Caching is the secret weapon of high-performance backends. But 'caching everything' is a recipe for stale data and hard-to-debug bugs. We explore Tagged Caching in Redis, Atomic Locks for race conditions, and how to use Laravel's 'Cache::remember' to optimize expensive database queries without sacrificing data integrity.",
    tags: ["Redis", "Caching", "Performance"],
    quote: "The fastest request is the one you never have to make."
  },
  {
    id: 3,
    category: "Database",
    readTime: "8 min read",
    date: "Jan 15, 2024",
    author: {
      name: "Artisan Dev",
      avatar: "https://i.pravatar.cc/150?u=artisan",
      role: "Lead Backend Engineer"
    },
    title: "Indexing Strategies for Massive PostgreSQL Datasets",
    image: "https://images.unsplash.com/photo-1544383023-53f0c670710a?auto=format&fit=crop&q=80&w=800",
    content: "PostgreSQL is a beast when configured correctly. However, a table with 100 million rows will crawl if your indexing strategy is wrong. This guide covers B-Tree versus GIN indexes, partial indexes for optimized filtering, and how to use EXPLAIN ANALYZE to debug slow-moving queries in your Laravel production environment.",
    tags: ["PostgreSQL", "Database", "SQL"],
    quote: "A database is only as fast as its most complex join."
  },
  {
    id: 4,
    category: "DevOps",
    readTime: "4 min read",
    date: "Dec 20, 2023",
    author: {
      name: "Artisan Dev",
      avatar: "https://i.pravatar.cc/150?u=artisan",
      role: "Lead Backend Engineer"
    },
    title: "Zero-Downtime Deployments with GitHub Actions",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
    content: "The days of 'Maintenance Mode' screens are over. Using GitHub Actions and a 'Blue-Green' deployment strategy, you can release new features while users are actively interacting with your platform. We'll set up a pipeline that builds Docker containers, runs PHPUnit tests, and swaps production environments seamlessly.",
    tags: ["CI/CD", "Docker", "DevOps"],
    quote: "Shipping code should be a non-event, not a panic attack."
  }
];
