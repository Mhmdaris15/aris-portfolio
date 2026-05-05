import { Link, useParams } from "react-router-dom";
import { getPostBySlug, getRelatedPosts, BlogSection } from "../data/blog";
import { config } from "../config";
import "./BlogPost.css";

const renderSection = (section: BlogSection, idx: number) => {
  switch (section.type) {
    case "p":
      return <p key={idx}>{section.content}</p>;
    case "h2":
      return <h2 key={idx}>{section.content}</h2>;
    case "h3":
      return <h3 key={idx}>{section.content}</h3>;
    case "list":
      return (
        <ul key={idx} className="post-list">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ordered":
      return (
        <ol key={idx} className="post-list post-list-ordered">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre key={idx} className="post-code">
          <code data-lang={section.lang}>{section.content}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote key={idx} className="post-quote">
          {section.content}
        </blockquote>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="post-page">
        <div className="post-missing">
          <h1>Post not found</h1>
          <Link to="/blog" className="back-button" data-cursor="disable">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post.slug, 3);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <article className="post-page">
      <div className="post-nav">
        <Link to="/blog" className="back-button" data-cursor="disable">
          ← All articles
        </Link>
        <Link to="/" className="back-home" data-cursor="disable">
          Home
        </Link>
      </div>

      <header className="post-header">
        <div className="post-meta">
          <span>{formattedDate}</span>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
        </div>
        <h1>{post.title}</h1>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-tags">
          {post.tags.map((t) => (
            <span key={t} className="blog-tag">
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="post-body">
        {post.sections.map((section, idx) => renderSection(section, idx))}
      </div>

      <div className="post-author">
        <div className="post-author-info">
          <h4>{config.developer.fullName}</h4>
          <p>{config.developer.title}</p>
          <p className="post-author-bio">
            {config.availability.label}. {config.availability.responseTime}.
          </p>
        </div>
        <div className="post-author-actions">
          <a
            href={`mailto:${config.contact.email}?subject=${encodeURIComponent(
              "Project Inquiry"
            )}`}
            className="btn btn-primary"
            data-cursor="disable"
          >
            Hire me
          </a>
          <a
            href={config.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            data-cursor="disable"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="post-related">
          <h2>Related reading</h2>
          <div className="post-related-grid">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                className="post-related-card"
                data-cursor="disable"
              >
                <div className="post-related-meta">
                  <span>{r.readMinutes} min</span>
                </div>
                <h3>{r.title}</h3>
                <p>{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogPost;
