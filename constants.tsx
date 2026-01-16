import React from 'react';
import { Server, Database, Code2, Globe, Cpu, Layout , Box, Monitor,  ShieldCheck, Zap, Layers, Search, Terminal } from 'lucide-react';
import { Project, Service, Skill, TimelineItem, Blog } from './types';

export interface EnhancedProject extends Project {
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  type: string;
  category: any;
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
    id: 7,
    title: "TurboDash Delivery",
    type: "LOGISTICS & DELIVERY PLATFORM",
    category: "Laravel",
    year: "2024",
    role: "Full-Stack Architect",
    description:
      "A high-performance delivery platform designed to streamline last-mile logistics and real-time order tracking.",
    fullDescription:
      "TurboDash Delivery is a scalable logistics ecosystem built to power high-volume delivery operations across the UAE. The platform centralizes order management, rider coordination, and real-time tracking into a single operational interface, enabling logistics teams to move faster with greater precision. With automated dispatch workflows and live location intelligence, TurboDash reduces delivery latency while improving transparency across every stage of the delivery lifecycle. The system is designed to handle rapid growth without compromising performance, reliability, or control.",
    challenge:
      "Handling real-time order updates and rider location tracking without degrading system performance.",
    solution:
      "Implemented event-driven architecture with Redis and WebSockets to synchronize delivery states in real time.",
    techStackDetailed: [
      "Laravel",
      "Redis",
      "MySQL",
      "WebSockets",
      "Docker",
      "AWS",
    ],
    metrics: [
      { value: "70ms", label: "Realtime Update Latency" },
      { value: "82%", label: "Increase in Dispatch Efficiency" },
      { value: "99.9%", label: "Platform Uptime" },
    ],
    image: "image.png",
    gallery: ["turbo1.png", "turbo2.png"],
    codeSnippet: `// Order Status Broadcast\nevent(new OrderUpdated($order));`,
    tags: ["Laravel", "Logistics", "Realtime"],
    github: "https://turbodashdelivery.ae/",
    demo: "https://turbodashdelivery.ae/",
  },

  {
    id: 8,
    title: "Arqam Grammar School",
    type: "EDUCATION MANAGEMENT SYSTEM",
    category: "Laravel",
    year: "2023",
    role: "Backend Developer",
    description:
      "A modern school website and management system built to enhance communication and academic transparency.",
    fullDescription:
      "The Arqam Grammar School platform serves as a centralized digital hub for academic operations and public engagement. It enables parents and students to access academic calendars, announcements, admissions details, and institutional updates through a clean, intuitive interface.Built with a strong focus on accessibility and performance, the system ensures critical academic information remains easily discoverable and readable across devices. The platform balances informative public-facing content with structured academic data, delivering a reliable digital presence for a modern educational institution.",
    challenge:
      "Organizing academic information in a clear and accessible way while maintaining fast performance across different devices and internet conditions.",
    solution:
      "Built a lightweight, User-friendly interface with optimized rendering and caching to ensure fast load times and smooth access to academic content.",
    techStackDetailed: ["Laravel", "Blade", "MySQL", "Bootstrap", "cPanel"],
    metrics: [
      { value: "60%", label: "Parent Engagement" },
      { value: "2x", label: "Inquiry Growth" },
      { value: "200%", label: "Increase in Enrollments" },
    ],
    image: "arqam1.png",
    gallery: ["arqam1.png"],
    codeSnippet: `// Fetch latest school announcements
Announcement::where('is_published', true)
    ->latest()
    ->take(5)
    ->get();
`,
    tags: ["Education", "Laravel", "CMS"],
    github: "https://arqamgrammarschools.edu.pk/",
    demo: "https://arqamgrammarschools.edu.pk/",
  },

  {
    id: 9,
    title: "BinAzamex",
    type: "CORPORATE BUSINESS WEBSITE",
    category: "Laravel",
    year: "2024",
    role: "Web Engineer",
    description:
      "A professional corporate website designed to establish credibility and showcase business services.",
    fullDescription:
      "Bin Azamex sought a clean, authoritative digital presence that could effectively communicate its services, values, and professional standing. The project emphasized structured content, refined typography, and a disciplined layout system to guide users through key information with confidence.Performance optimization and SEO best practices were embedded at the architectural level, ensuring fast load times, improved search visibility, and a future-ready platform aligned with the company’s growth objectives.",
    challenge:
      "Delivering a premium visual experience without compromising page speed or SEO standards.",
    solution:
      "Applied performance optimization techniques and implemented structured metadata across key pages.",
    techStackDetailed: [
      "Laravel",
      "Tailwind CSS",
      "MySQL",
      "SEO Optimization",
      "Vite",
    ],
    metrics: [
      { value: "10x", label: "Organic Traffic" },
      { value: "0.1s", label: "Page Load Time" },
      { value: "95+", label: "SEO Score" },
    ],
    image: "binazamex.png",
    gallery: ["binazamex.png", "binazam2.png"],
    codeSnippet: `// Cached SEO meta generation
cache()->remember("seo_{$page->id}", 3600, function () use ($page) {
    SEOTools::setTitle($page->title);
});
`,
    tags: ["Corporate", "SEO", "Laravel"],
    github: "https://binazamex.com",
    demo: "https://binazamex.com",
  },
  {
    id: 10,
    title: "Imperium Global Media",
    type: "CORPORATE MARKETING WEBSITE",
    category: "WordPress",
    year: "2025",
    role: "WordPress Developer",
    description:
      "A sleek, performance-focused corporate website to showcase marketing services and client success stories.",
    fullDescription:
      "Imperium Global Media’s website was built to present the company as a leader in digital marketing and media solutions. With a clean, modern layout, the platform emphasizes service offerings, portfolio highlights, and client testimonials. The WordPress backend was customized for easy content updates, ensuring the marketing team can quickly refresh campaigns, blogs, and case studies.",
    challenge:
      "Creating a visually engaging corporate site while keeping WordPress lightweight and fast.",
    solution:
      "Developed a custom WordPress theme with optimized assets, caching, and SEO plugins to ensure smooth performance and content flexibility.",
    techStackDetailed: [
      "WordPress",
      "PHP",
      "Custom Theme",
      "Elementor",
      "SEO Plugins",
      "Caching",
    ],
    metrics: [
      { value: "98%", label: "Page Speed Score" },
      { value: "15+", label: "Published Case Studies" },
      { value: "50%", label: "Increase in Client Inquiries" },
    ],
    image: "im1.png",
    gallery: [
      "im1.png",
      "im2.png",
      "im3.png",
      "im4.png",
      "im5.png",
      "im6.png",
      "im7.png",
    ],
    codeSnippet: `// Custom WordPress Loop for Services
$args = array('post_type' => 'service', 'posts_per_page' => 5);
$services = new WP_Query($args);
while($services->have_posts()): $services->the_post();
    the_title();
endwhile;`,
    tags: ["WordPress", "Corporate", "Marketing"],
    github: "",
    demo: "https://imperiumglobalmedia.com/",
  },

  {
    id: 11,
    title: "Emerald Elevator",
    type: "CORPORATE BUSINESS WEBSITE",
    category: "WordPress",
    year: "2025",
    role: "WordPress Developer",
    description:
      "A professional website for Emerald Elevator, emphasizing product offerings and corporate values.",
    fullDescription:
      "Emerald Elevator’s website was crafted to showcase their elevator solutions, services, and corporate expertise. Built on WordPress, the platform features a clean navigation, visually appealing sections for products, client testimonials, and certifications. The backend was customized for easy updates to product catalogs and corporate announcements.",
    challenge:
      "Highlighting technical products while keeping the site fast and easy to maintain.",
    solution:
      "Implemented a lightweight custom WordPress theme, optimized images, and caching solutions to maintain speed and flexibility.",
    techStackDetailed: [
      "WordPress",
      "PHP",
      "Custom Theme",
      "Elementor",
      "Caching",
      "SEO Optimization",
    ],
    metrics: [
      { value: "99%", label: "Website Uptime" },
      { value: "0.8s", label: "Average Page Load" },
      { value: "30%", label: "Increase in Product Inquiries" },
    ],
    image: "em3.png",
    gallery: ["em1.png", "em2.png", "em4.png", "em5.png", "em6.png", "em3.png"],
    codeSnippet: `// Custom Post Type for Elevators
function register_elevator_cpt() {
    register_post_type('elevator', array(
        'label' => 'Elevators',
        'public' => true,
        'supports' => ['title','editor','thumbnail']
    ));
}
add_action('init', 'register_elevator_cpt');`,
    tags: ["WordPress", "Corporate", "Products"],
    github: "",
    demo: "http://emeraldelevator.ae/",
  },

  {
    id: 12,
    title: "Head2Paws Pet Grooming",
    type: "SERVICE BUSINESS WEBSITE",
    category: "WordPress",
    year: "2025",
    role: "WordPress Developer",
    description:
      "A visually appealing, user-friendly website for a pet grooming service to attract and engage pet owners.",
    fullDescription:
      "Head2Paws Pet Grooming’s website was designed to create a warm and inviting experience for pet owners while clearly communicating services, pricing, and booking options. Built on WordPress, the platform includes online appointment forms, galleries, and blog sections to provide helpful pet care tips. Custom backend functionality allows easy updates to services, promotions, and galleries.",
    challenge:
      "Designing a playful yet professional site that is easy to navigate for pet owners of all ages.",
    solution:
      "Developed a custom WordPress theme with optimized visuals, appointment booking forms, and lightweight galleries for fast loading and user engagement.",
    techStackDetailed: [
      "WordPress",
      "PHP",
      "Custom Theme",
      "Elementor",
      "Booking Forms",
      "SEO Plugins",
    ],
    metrics: [
      { value: "45%", label: "Increase in Bookings" },
      { value: "4.9/5", label: "Average Client Rating" },
      { value: "80%", label: "Return Visitors" },
    ],
    image: "paw1.png",
    gallery: [
      "paw2.png",
      "paw4.png",
      "paw3.png",
      "paw5.png",
      "paw6.png",
      "paw1.png",
    ],
    codeSnippet: `// Custom Booking Form Shortcode
function h2p_booking_form() {
    ob_start(); ?>
    <form id="booking-form">...</form>
    <?php return ob_get_clean();
}
add_shortcode('booking_form', 'h2p_booking_form');`,
    tags: ["WordPress", "Services", "Pet Grooming"],
    github: "",
    demo: "https://head2pawspetgrooming.com/",
  },
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
  { name: "Laravel", level: 95, category: "Backend" },
  { name: "PHP", level: 90, category: "Backend" },
  { name: "MySQL / PostgreSQL", level: 85, category: "Database" },
  { name: "Elementor", level: 95, category: "Wordpress" },
  { name: "WooCommerce", level: 85, category: "Wordpress" },
  { name: "Custom Css", level: 80, category: "Wordpress" },
  // { name: "Vue.js / React", level: 65, category: "Frontend" },
  { name: "React js", level: 80, category: "Frontend" },
  { name: "Tailwind CSS", level: 99, category: "Frontend" },
  { name: "Blade with Livewire", level: 95, category: "Frontend" },
  { name: "Vue", level: 65, category: "Frontend" },
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
      role: "Lead Backend Engineer",
    },
    title: "The Power of Domain Driven Design in Laravel",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
    content:
      "Domain-Driven Design (DDD) is not a set of rules, but a philosophy for building software. In the context of Laravel, it means moving beyond simple 'Models' and 'Controllers' to embrace Entities, Value Objects, and Repositories. By modeling the software based on the business domain, we reduce complexity and make the codebase more resilient to change.",
    tags: ["Laravel", "DDD", "Clean Code"],
    quote:
      "Architecture is the art of what to leave out to make the core shine.",
  },
  {
    id: 2,
    category: "Performance",
    readTime: "5 min read",
    date: "Jan 28, 2024",
    author: {
      name: "Artisan Dev",
      avatar: "https://i.pravatar.cc/150?u=artisan",
      role: "Lead Backend Engineer",
    },
    title: "How Advanced Caching Strategies Shape User Experience",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    content:
      "Caching is the secret weapon of high-performance backends. But 'caching everything' is a recipe for stale data and hard-to-debug bugs. We explore Tagged Caching in Redis, Atomic Locks for race conditions, and how to use Laravel's 'Cache::remember' to optimize expensive database queries without sacrificing data integrity.",
    tags: ["Redis", "Caching", "Performance"],
    quote: "The fastest request is the one you never have to make.",
  },
  {
    id: 3,
    category: "Database",
    readTime: "8 min read",
    date: "Jan 15, 2024",
    author: {
      name: "Artisan Dev",
      avatar: "https://i.pravatar.cc/150?u=artisan",
      role: "Lead Backend Engineer",
    },
    title: "Indexing Strategies for Massive PostgreSQL Datasets",
    image: "https://images.pexels.com/photos/4597280/pexels-photo-4597280.jpeg",
    content:
      "PostgreSQL is a beast when configured correctly. However, a table with 100 million rows will crawl if your indexing strategy is wrong. This guide covers B-Tree versus GIN indexes, partial indexes for optimized filtering, and how to use EXPLAIN ANALYZE to debug slow-moving queries in your Laravel production environment.",
    tags: ["PostgreSQL", "Database", "SQL"],
    quote: "A database is only as fast as its most complex join.",
  },
  {
    id: 4,
    category: "DevOps",
    readTime: "4 min read",
    date: "Dec 20, 2023",
    author: {
      name: "Artisan Dev",
      avatar: "https://i.pravatar.cc/150?u=artisan",
      role: "Lead Backend Engineer",
    },
    title: "Zero-Downtime Deployments with GitHub Actions",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800",
    content:
      "The days of 'Maintenance Mode' screens are over. Using GitHub Actions and a 'Blue-Green' deployment strategy, you can release new features while users are actively interacting with your platform. We'll set up a pipeline that builds Docker containers, runs PHPUnit tests, and swaps production environments seamlessly.",
    tags: ["CI/CD", "Docker", "DevOps"],
    quote: "Shipping code should be a non-event, not a panic attack.",
  },
];
