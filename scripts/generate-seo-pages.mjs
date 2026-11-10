import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const site = "https://www.fahadali.tech";

const primaryPages = [
  ["about", "About Fahad Ali | Full Stack Laravel Developer", "Learn about Fahad Ali, a Full Stack Web Developer in Pakistan specializing in Laravel, React, PHP, MySQL and WordPress."],
  ["projects", "Projects & Case Studies | Fahad Ali", "Explore Laravel, React, SaaS, e-commerce and business website case studies developed by Fahad Ali."],
  ["services", "Web Development Services | Fahad Ali", "Custom Laravel applications, React interfaces, WordPress websites, e-commerce stores and UI/UX services by Fahad Ali."],
  ["blog", "Web Development Guides | Fahad Ali", "Practical Laravel, PHP, database, performance and DevOps guides by Fahad Ali."],
  ["contact", "Contact Fahad Ali | Hire a Laravel & React Developer", "Contact Fahad Ali for Laravel, React, PHP, WordPress and custom web development projects."],
  ["pricing", "Web Development Pricing | Fahad Ali", "Transparent pricing for WordPress websites, custom Laravel applications and scalable SaaS development."],
  ["schedule-call", "Schedule a Call with Fahad Ali", "Book a web development consultation with Fahad Ali to discuss your website or application."],
];

const detailPages = [
  ...[1, 2, 3, 4].map((id) => [`services/${id}`, `Web Development Service | Fahad Ali`, `Professional web development service by Fahad Ali, built for performance, usability and business growth.`]),
  ...[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((id) => [`projects/${id}`, `Web Development Case Study | Fahad Ali`, `A web development project and technical case study from the Fahad Ali portfolio.`]),
  ...[1, 2, 3, 4].map((id) => [`blog/${id}`, `Web Development Guide | Fahad Ali`, `A practical web development article covering architecture, performance, databases or DevOps.`]),
];

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

for (const [route, title, description] of [...primaryPages, ...detailPages]) {
  const canonical = `${site}/${route}`;
  const fallback = `<main style="max-width:960px;margin:0 auto;padding:48px 24px;font-family:Inter,Arial,sans-serif"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><nav><a href="/">Home</a> · <a href="/services">Services</a> · <a href="/projects">Projects</a> · <a href="/blog">Blog</a> · <a href="/contact">Contact</a></nav></main>`;

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="title" content="[^"]*"\s*\/>/, `<meta name="title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<div id="root">[\s\S]*?<\/div>\s*<script type="module"/, `<div id="root">${fallback}</div>\n  <script type="module"`);

  const directory = path.join(dist, ...route.split("/"));
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}

console.log(`Generated ${primaryPages.length + detailPages.length} SEO route pages.`);
