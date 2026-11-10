import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "../constants";

const Blogs: React.FC = () => {
  const featuredPosts = BLOG_POSTS.slice(0, 4);

  return (
    <section className="resources-section">
      <div className="resources-section__orb" aria-hidden="true" />
      <div className="section-shell resources-shell">
        <header className="resources-header">
          <span className="section-kicker section-kicker--light"><i /> Resources &amp; Guides</span>
          <div className="resources-title-wrap">
            <h2>Resources &amp; <em>Guides</em></h2>
            <span className="resources-burst" aria-hidden="true"><i /><i /><i /></span>
          </div>
          <p>Practical guides, technical insights, and best practices to help you build better, faster, and more scalable web applications.</p>
        </header>

        <div className="resources-grid">
          {featuredPosts.map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id} className="resource-card">
              <div className="resource-card__image"><img src={blog.image} alt={blog.title} /></div>
              <div className="resource-card__meta"><span>{blog.category}</span><i /><small>{blog.readTime}</small></div>
              <div className="resource-card__bottom">
                <h3>{blog.title}</h3>
                <span className="resource-card__arrow" aria-hidden="true"><ArrowUpRight /></span>
              </div>
            </Link>
          ))}
        </div>

        <Link to="/blog" className="lime-pill-button resources-more">See All Blogs <ArrowRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
};

export default Blogs;
