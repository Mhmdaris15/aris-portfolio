import { Helmet } from "react-helmet-async";
import { useLocale } from "../i18n/LocaleContext";
import { SITE, absolute, canonicalFor, alternatesFor } from "./siteConfig";
import type { JsonLd } from "./schema";

/**
 * <SeoHead> — drop into any page to set per-route SEO.
 *
 * Conventions:
 *   - `path` is the route's path WITHOUT locale prefix (e.g. "/blog", "/works/foo").
 *     The component computes canonical + hreflang from it.
 *   - `title` is the bare page title; the site name is appended via template.
 *   - `image` may be relative (joined with origin) or absolute.
 *   - `jsonLd` accepts one schema or many — both end up in <head>.
 */

interface Props {
  path: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  /** "article" for blog posts, "profile" for resume, default "website". */
  ogType?: "website" | "article" | "profile";
  /** ISO date — only for article OG type. */
  publishedTime?: string;
  modifiedTime?: string;
  /** Tags — emitted as article:tag. */
  tags?: string[];
  /** Disable indexing for this page (e.g. /admin). */
  noIndex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
}

const SeoHead = ({
  path,
  title,
  description = SITE.description,
  image = SITE.ogImage,
  imageAlt = SITE.ogImageAlt,
  ogType = "website",
  publishedTime,
  modifiedTime,
  tags,
  noIndex,
  jsonLd
}: Props) => {
  const { locale } = useLocale();
  const canonical = canonicalFor(path, locale);
  const alts = alternatesFor(path);
  const ogLocale = locale === "ru" ? "ru_RU" : "en_US";
  const ogLocaleAlt = locale === "ru" ? "en_US" : "ru_RU";

  const fullTitle = title
    ? title.includes(SITE.name)
      ? title
      : SITE.titleTemplate.replace("%s", title)
    : SITE.titleDefault;

  const absImage = image.startsWith("http") ? image : absolute(image);
  const ldArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      {/* Primary */}
      <html lang={locale} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1"
        />
      )}

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en" href={alts.en} />
      <link rel="alternate" hrefLang="ru" href={alts.ru} />
      <link rel="alternate" hrefLang="x-default" href={alts.xDefault} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={absImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
      <meta property="og:site_name" content={SITE.fullName} />

      {/* Article-specific OG */}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" &&
        tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      {ogType === "article" && (
        <meta property="article:author" content={SITE.fullName} />
      )}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {SITE.twitterHandle && (
        <meta name="twitter:creator" content={SITE.twitterHandle} />
      )}

      {/* JSON-LD blocks */}
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;
