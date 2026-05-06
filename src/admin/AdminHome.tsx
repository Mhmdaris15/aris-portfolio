import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listDrafts, deleteDraft, DraftPost } from "./storage";
import { posts as staticPosts } from "../data/blog";
import { useLocale } from "../i18n/LocaleContext";
import { clearAuthed } from "./auth";

const AdminHome = () => {
  const [drafts, setDrafts] = useState<DraftPost[]>([]);
  const { href } = useLocale();
  const navigate = useNavigate();

  useEffect(() => {
    setDrafts(listDrafts());
  }, []);

  const refresh = () => setDrafts(listDrafts());

  const onDelete = (slug: string) => {
    if (!confirm("Delete this draft? This cannot be undone.")) return;
    deleteDraft(slug);
    refresh();
  };

  const logout = () => {
    clearAuthed();
    navigate("/admin");
  };

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    });

  return (
    <div className="admin-home">
      <header className="admin-header">
        <div>
          <Link to={href("/")} className="admin-back">
            ← Back to site
          </Link>
          <h1>Blog Editor</h1>
          <p>Drafts and posts authored in this browser.</p>
        </div>
        <div className="admin-header-actions">
          <button type="button" onClick={logout} className="admin-btn ghost">
            Log out
          </button>
          <Link to="/admin/new" className="admin-btn primary">
            + New post
          </Link>
        </div>
      </header>

      <section className="admin-section">
        <h2>Your drafts &amp; published posts</h2>
        {drafts.length === 0 ? (
          <p className="admin-empty">
            No posts yet. <Link to="/admin/new">Write your first one</Link>.
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title (EN)</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {drafts.map((d) => (
                <tr key={d.slug}>
                  <td>{d.en.title || <em>untitled</em>}</td>
                  <td className="mono">{d.slug}</td>
                  <td>
                    <span className={`status-pill ${d.status}`}>
                      {d.status}
                    </span>
                  </td>
                  <td>{dateFmt(d.updatedAt)}</td>
                  <td className="right">
                    <Link
                      to={`/admin/edit/${d.slug}`}
                      className="admin-link"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(d.slug)}
                      className="admin-link danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="admin-section">
        <h2>Static (in-code) posts — read-only here</h2>
        <p className="admin-meta">
          These live in <code>src/data/blog.ts</code>. To edit them, use Export
          on a draft and replace the entry there.
        </p>
        <ul className="admin-static-list">
          {staticPosts.map((p) => (
            <li key={p.slug}>
              <span className="mono">{p.slug}</span>
              <span>{p.en.title}</span>
              <span className="muted">{p.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminHome;
