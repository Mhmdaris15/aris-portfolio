import { Link } from "react-router-dom";
import { posts } from "../data/blog";
import { config } from "../config";
import "./Blog.css";

const Blog = () => {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          The <span>Blog</span>
        </h1>
        <p>
          Notes on software engineering, AI, freelance work, and what's actually
          shipping in 2026.
        </p>
      </div>

      {featured && (
        <Link
          to={`/blog/${featured.slug}`}
          className="blog-featured"
          data-cursor="disable"
        >
          <div className="blog-featured-meta">
            <span className="blog-pill">Featured</span>
            <span>{formatDate(featured.date)}</span>
            <span>·</span>
            <span>{featured.readMinutes} min read</span>
          </div>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <div className="blog-tags">
            {featured.tags.map((t) => (
              <span key={t} className="blog-tag">
                {t}
              </span>
            ))}
          </div>
          <span className="blog-read-link">Read article →</span>
        </Link>
      )}

      <div className="blog-grid">
        {rest.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="blog-card"
            data-cursor="disable"
          >
            <div className="blog-card-meta">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readMinutes} min</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="blog-tags">
              {post.tags.map((t) => (
                <span key={t} className="blog-tag">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="blog-cta">
        <h2>Want to work together?</h2>
        <p>
          {config.availability.label} · {config.availability.responseTime}
        </p>
        <a
          href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
            "Project Inquiry"
          )}`}
          className="blog-cta-btn"
          data-cursor="disable"
        >
          Get in touch →
        </a>
      </div>
    </div>
  );
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default Blog;
