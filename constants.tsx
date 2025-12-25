import React from 'react';
import { Server, Database, Code2, Globe, Cpu, ShieldCheck, Zap, Layers, Search, Terminal } from 'lucide-react';
import { Project, Service, Skill, TimelineItem, Blog } from './types';

export interface EnhancedProject extends Project {
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
  type: string;
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
    year: "2023",
    role: "Lead Backend Architect",
    description: "A high-performance redesign created to elevate brand trust and improve user engagement for modern fintech.",
    fullDescription: "Aurora is a next-generation financial management engine designed to handle millions of transactions with sub-80ms latency. The project involved migrating a monolithic legacy system to a robust microservices architecture using Laravel 11 and Redis. We implemented custom event sourcing to ensure 100% auditability and built a real-time analytics engine that processes data streams at scale.",
    challenge: "The primary challenge was modernizing a legacy PHP 7.4 codebase without downtime. We had to refactor complex financial dashboards and data-heavy onboarding flows while maintaining strict data integrity for enterprise clients.",
    solution: "We architected a 'strangler fig' pattern to incrementally replace old services. By implementing Redis-backed caching and optimizing Eloquent queries with composite indexing, we reduced server load by 40% and improved dashboard loading times by 3x.",
    techStackDetailed: ["Laravel 11", "Redis", "PostgreSQL", "Docker", "AWS SQS", "Pusher"],
    metrics: [
      { value: "85ms", label: "Avg Response Time" },
      { value: "40%", label: "Cloud Cost Savings" },
      { value: "99.9%", label: "System Uptime" }
    ],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&q=80&w=1200"
    ],
    codeSnippet: `// Event Sourced Ledger Update
public function updateLedger(Transaction $transaction)
{
    return DB::transaction(function () use ($transaction) {
        $ledger = Ledger::lockForUpdate()->find($transaction->ledger_id);
        
        $entry = LedgerEntry::createFromTransaction($transaction);
        
        $ledger->balance += $transaction->amount;
        $ledger->save();
        
        event(new TransactionProcessed($entry));
    });
}`,
    tags: ["Laravel", "Redis", "Microservices"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 2,
    title: "NATURELY",
    type: "E-COMMERCE BACKBONE",
    year: "2022",
    role: "Senior Developer",
    description: "A streamlined, conversion-focused redesign built to simplify user flows and strengthen customer confidence.",
    fullDescription: "Naturely required a complete overhaul of its e-commerce backend to support a multi-tenant marketplace structure. We leveraged Laravel Multi-tenancy to provide isolated environments for thousands of vendors, ensuring data security and high availability during peak traffic events like Black Friday.",
    challenge: "Handling concurrent stock updates across thousands of stores while maintaining a zero-latency search experience using Elasticsearch.",
    solution: "Implemented an asynchronous queue system using RabbitMQ and optimized the search layer with multi-index synchronization, resulting in search results under 50ms.",
    techStackDetailed: ["Laravel", "Elasticsearch", "RabbitMQ", "MySQL", "Vite", "Inertia.js"],
    metrics: [
      { value: "55%", label: "Sales Conversion" },
      { value: "32%", label: "User Growth" },
      { value: "50ms", label: "Search Latency" }
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1523474253046-2cd2c78b6ad1?auto=format&fit=crop&q=80&w=1200"
    ],
    codeSnippet: `// Multi-tenant Store Scoping
class StoreScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        if (app()->bound('currentStore')) {
            $builder->where('store_id', app('currentStore')->id);
        }
    }
}`,
    tags: ["Laravel", "PostgreSQL", "Multi-tenancy"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 3,
    title: "FINPAY",
    type: "MOBILE WALLET API",
    year: "2024",
    role: "API Architect",
    description: "A bold, performance-driven landing page and API optimized for mobile lead capture and acquisition.",
    fullDescription: "FinPay is a robust mobile wallet API designed for secure cross-border payments. We utilized Laravel Octane to reach unprecedented performance levels and integrated OAuth2 with biometric verification for high-security transaction authorization.",
    challenge: "Integrating with 15+ different regional payment gateways with varying data formats and protocols.",
    solution: "Built a unified Adapter Pattern interface that normalized gateway responses and handled complex retry logic automatically using Laravel's robust Job system.",
    techStackDetailed: ["Laravel Octane", "Swoole", "Redis", "OAuth2", "Postman", "Forge"],
    metrics: [
      { value: "1.2k", label: "Requests / Sec" },
      { value: "99.9%", label: "Uptime" },
      { value: "100%", label: "PCI Compliance" }
    ],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=1200"
    ],
    codeSnippet: `// Octane Optimized Auth
public function handle(Request $request)
{
    return Cache::store('octane')->remember(
        "auth:user:{$request->user_id}",
        now()->addMinutes(5),
        fn() => User::with('wallet')->find($request->user_id)
    );
}`,
    tags: ["Laravel", "Pusher", "MySQL"],
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
    title: "API Architecture",
    description: "High-performance REST & GraphQL endpoints designed for scale.",
    icon: "Code2",
    bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "In the modern digital landscape, your API is the foundation of your product. I design and build high-performance, secure, and developer-friendly APIs using Laravel and GraphQL. My focus is on creating extensible architectures that handle massive traffic while maintaining consistent 50ms-100ms response times.",
    capabilities: [
      { title: "GraphQL Design", desc: "Complex data fetching with Apollo and Lighthouse.", icon: Zap },
      { title: "OAuth2 & JWT", desc: "Enterprise-grade authentication and authorization.", icon: ShieldCheck },
      { title: "Rate Limiting", desc: "Advanced protection against DDoS and abuse.", icon: ShieldCheck },
      { title: "Documentation", desc: "Auto-generated, interactive Swagger/OpenAPI docs.", icon: Terminal }
    ],
    process: [
      { step: "01", title: "Endpoint Mapping", desc: "Identifying all data requirements and relationship structures." },
      { step: "02", title: "Schema Design", desc: "Creating optimized JSON/GraphQL schemas for frontend efficiency." },
      { step: "03", title: "Implementation", desc: "TDD-based development with 100% contract testing coverage." }
    ],
    relatedTech: ["Laravel", "Swoole", "Redis", "Postman", "Docker"]
  },
  {
    id: 2,
    title: "Database Design",
    description: "Complex schema modeling and high-stakes query optimization.",
    icon: "Database",
    bgImage: "https://images.unsplash.com/photo-1544383023-53f0c670710a?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Data is your most valuable asset. I specialize in designing normalized, high-integrity database schemas that scale. Whether it's managing millions of rows in PostgreSQL or optimizing complex MySQL joins, I ensure your data layer is the strongest part of your application.",
    capabilities: [
      { title: "Schema Modeling", desc: "Third-normal form normalization and logical design.", icon: Layers },
      { title: "Query Profiling", desc: "Deep analysis of slow queries and bottleneck removal.", icon: Search },
      { title: "Indexing Strategy", desc: "Precision B-Tree and GIST indexing for search speed.", icon: Zap },
      { title: "Data Integrity", desc: "Atomic transactions and strict constraint enforcement.", icon: ShieldCheck }
    ],
    process: [
      { step: "01", title: "Data Audit", desc: "Analyzing current data flows and identifying redundancies." },
      { step: "02", title: "Logical Design", desc: "Building ER diagrams and defining entity relationships." },
      { step: "03", title: "Optimization", desc: "Fine-tuning buffers, caches, and query execution plans." }
    ],
    relatedTech: ["PostgreSQL", "MySQL", "Redis", "Eloquent", "AWS Aurora"]
  },
  {
    id: 3,
    title: "Cloud DevOps",
    description: "Kubernetes, Docker, and seamless CI/CD automation pipelines.",
    icon: "Cpu",
    bgImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Code only provides value when it's live. I build robust cloud infrastructure that ensures your Laravel apps are resilient, scalable, and easy to deploy. From containerization to automated horizontal scaling on AWS, I handle the operational heavy lifting.",
    capabilities: [
      { title: "Dockerization", desc: "Production-ready, multi-stage Docker builds.", icon: Server },
      { title: "CI/CD Pipelines", desc: "Automated testing and deployment via GitHub Actions.", icon: Zap },
      { title: "AWS Management", desc: "Architecting EC2, RDS, and S3 for high availability.", icon: Globe },
      { title: "Monitoring", desc: "Real-time logging and alerting with ELK/Sentry.", icon: Search }
    ],
    process: [
      { step: "01", title: "Infra Audit", desc: "Reviewing current server setups and identifying risks." },
      { step: "02", title: "Containerization", desc: "Standardizing environments for dev, stage, and prod." },
      { step: "03", title: "Deployment Plan", desc: "Setting up blue-green or canary release strategies." }
    ],
    relatedTech: ["AWS", "GitHub Actions", "Docker", "Terraform", "Forge"]
  },
  {
    id: 4,
    title: "Scalable Systems",
    description: "Distributed architectures designed for extreme high traffic.",
    icon: "Layers",
    bgImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
    fullDescription: "Success brings traffic, and traffic brings challenges. I build distributed systems that grow with your user base. By leveraging message brokers, microservices, and load balancing, I ensure your application never breaks under pressure.",
    capabilities: [
      { title: "Microservices", desc: "Decoupling logic for independent scaling and failure.", icon: Cpu },
      { title: "Message Queues", desc: "Async processing with RabbitMQ or Amazon SQS.", icon: Zap },
      { title: "Load Balancing", desc: "Traffic distribution via Nginx or AWS ELB.", icon: Globe },
      { title: "Caching Layers", desc: "Distributed caching strategies with Redis Clusters.", icon: Database }
    ],
    process: [
      { step: "01", title: "Bottleneck Analysis", desc: "Identifying single points of failure in architecture." },
      { step: "02", title: "Decoupling", desc: "Breaking monolithic parts into manageable services." },
      { step: "03", title: "Stress Testing", desc: "Simulating peak load to verify scaling triggers." }
    ],
    relatedTech: ["RabbitMQ", "Redis", "Kubernetes", "Octane", "Microservices"]
  }
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
