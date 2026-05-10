import { Sk, SkBlock } from "./Skeleton";
import "./loading.css";

/**
 * Page-shaped skeletons. Each mirrors the rough geometry of its real page,
 * so when the lazy chunk arrives, the swap feels like fade rather than jump.
 */

const Rail = () => (
  <div className="sk-rail">
    <Sk w={80} h={11} />
    <Sk w={140} h={11} />
    <Sk w={80} h={11} />
  </div>
);

/* ─── Blog list (the masthead + featured + archive list) ──────── */

export const BlogListSkeleton = () => (
  <div className="sk-page">
    <Rail />
    <div className="sk-container">
      <section className="sk-blog-mast">
        <Sk w={180} h={11} />
        <Sk
          className="sk-line--xl"
          style={{ marginTop: 26 }}
          h={56}
          w="60%"
        />
        <Sk
          className="sk-line--xl"
          style={{ marginTop: 8 }}
          h={56}
          w="48%"
        />
        <Sk h={14} w="55%" style={{ marginTop: 30 }} />
        <div className="sk-blog-mast-rule" />
      </section>

      <section className="sk-featured">
        <SkBlock className="sk-featured-cover" />
        <div className="sk-row">
          <Sk w={80} h={11} />
          <Sk w={140} h={11} style={{ marginTop: 10 }} />
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            <Sk w={56} h={20} />
            <Sk w={64} h={20} />
            <Sk w={48} h={20} />
          </div>
        </div>
        <div className="sk-row">
          <Sk h={36} w="80%" />
          <Sk h={36} w="65%" style={{ marginTop: 6 }} />
          <Sk h={14} w="90%" style={{ marginTop: 18 }} />
          <Sk h={14} w="78%" style={{ marginTop: 6 }} />
        </div>
      </section>

      {Array.from({ length: 5 }).map((_, i) => (
        <div className="sk-row-link" key={i}>
          <Sk w={32} h={11} />
          <SkBlock className="sk-row-thumb" aspect="16 / 10" />
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <Sk w={70} h={10} />
              <Sk w={50} h={10} />
              <Sk w={60} h={10} />
            </div>
            <Sk h={26} w="75%" />
            <Sk h={12} w="60%" style={{ marginTop: 10 }} />
          </div>
          <Sk w={18} h={18} style={{ borderRadius: "50%" }} />
        </div>
      ))}
    </div>
  </div>
);

/* ─── Blog post (article hero + body) ─────────────────────────── */

export const BlogPostSkeleton = () => (
  <div className="sk-page">
    <Rail />
    <div className="sk-container">
      <section className="sk-post-hero">
        <Sk w={160} h={11} />
        <Sk h={56} w="85%" style={{ marginTop: 22 }} />
        <Sk h={56} w="70%" style={{ marginTop: 8 }} />
        <Sk h={14} w="65%" style={{ marginTop: 24 }} />
        <SkBlock className="sk-post-hero-cover" />
        <div style={{ display: "flex", gap: 30 }}>
          <Sk w={100} h={11} />
          <Sk w={120} h={11} />
          <Sk w={140} h={11} />
        </div>
      </section>

      <section className="sk-post-body">
        <Sk h={16} w="100%" />
        <Sk h={16} w="98%" />
        <Sk h={16} w="92%" />
        <Sk h={16} w="80%" />
        <Sk h={26} w="50%" style={{ marginTop: 32, marginBottom: 14 }} />
        <Sk h={14} w="100%" />
        <Sk h={14} w="96%" />
        <Sk h={14} w="88%" />
        <Sk h={14} w="70%" />
        <Sk h={26} w="42%" style={{ marginTop: 32, marginBottom: 14 }} />
        <Sk h={14} w="100%" />
        <Sk h={14} w="92%" />
      </section>
    </div>
  </div>
);

/* ─── /myworks index list ─────────────────────────────────────── */

export const MyWorksSkeleton = () => (
  <div className="sk-page">
    <Rail />
    <div className="sk-container">
      <section className="sk-blog-mast">
        <Sk w={180} h={11} />
        <Sk h={64} w="55%" style={{ marginTop: 24 }} />
        <Sk h={64} w="38%" style={{ marginTop: 8 }} />
        <Sk h={14} w="45%" style={{ marginTop: 30 }} />
      </section>

      {Array.from({ length: 8 }).map((_, i) => (
        <div className="sk-works-row" key={i}>
          <Sk w={32} h={11} />
          <div>
            <Sk h={28} w="60%" />
            <Sk h={11} w="40%" style={{ marginTop: 10 }} />
          </div>
          <Sk w={56} h={11} />
          <Sk w={18} h={18} style={{ borderRadius: "50%" }} />
        </div>
      ))}
    </div>
  </div>
);

/* ─── /works/:slug case study ─────────────────────────────────── */

export const ProjectDetailSkeleton = () => (
  <div className="sk-page">
    <Rail />
    <div className="sk-container">
      <section className="sk-pd-hero">
        <div>
          <Sk w={180} h={11} />
          <Sk h={64} w="80%" style={{ marginTop: 24 }} />
          <Sk h={64} w="50%" style={{ marginTop: 8 }} />
          <Sk h={14} w="80%" style={{ marginTop: 24 }} />
          <Sk h={14} w="65%" style={{ marginTop: 6 }} />
          <div style={{ display: "flex", gap: 10, marginTop: 30 }}>
            <Sk w={140} h={42} />
            <Sk w={160} h={42} />
          </div>
        </div>
        <div className="sk-pd-rail">
          <Sk h={48} w="100%" />
          <Sk h={48} w="100%" />
          <Sk h={48} w="100%" />
        </div>
      </section>

      <SkBlock className="sk-pd-cover" />

      <div className="sk-post-body">
        <Sk h={28} w="40%" style={{ marginBottom: 14 }} />
        <Sk h={14} w="100%" />
        <Sk h={14} w="92%" />
        <Sk h={14} w="78%" />
      </div>
    </div>
  </div>
);

/* ─── Generic fallback (events, resume) ───────────────────────── */

export const GenericPageSkeleton = () => (
  <div className="sk-page">
    <Rail />
    <div className="sk-container">
      <section className="sk-blog-mast">
        <Sk w={180} h={11} />
        <Sk h={56} w="60%" style={{ marginTop: 24 }} />
        <Sk h={56} w="42%" style={{ marginTop: 8 }} />
        <Sk h={14} w="50%" style={{ marginTop: 24 }} />
      </section>
      <div className="sk-post-body">
        <Sk h={14} w="100%" />
        <Sk h={14} w="95%" />
        <Sk h={14} w="78%" />
        <Sk h={28} w="40%" style={{ marginTop: 30, marginBottom: 14 }} />
        <Sk h={14} w="100%" />
        <Sk h={14} w="88%" />
      </div>
    </div>
  </div>
);
