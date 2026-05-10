/**
 * JSON-LD schema builders for schema.org structured data.
 * Each function returns a plain object that should be JSON.stringify'd into
 * a <script type="application/ld+json"> tag (handled by SeoHead).
 *
 * Test with: https://validator.schema.org/
 *            https://search.google.com/test/rich-results
 */

import { SITE, absolute } from "./siteConfig";

export type JsonLd = Record<string, unknown>;

/* ─── Person — site-wide identity ──────────────────────────── */

export const personSchema = (): JsonLd => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.fullName,
    alternateName: ["Aris", "Mhmdaris15", "Muhammad Aris Septanugroho"],
    url: SITE.origin,
    image: absolute(SITE.ogImage),
    jobTitle: "AI Engineer · Platform Engineer · Full-Stack Developer",
    description:
        "AI Engineer and Platform Engineer building production data, automation, and AI systems. Reads source code for sport.",
    email: "muhammadaris1945@gmail.com",
    telephone: "+6285814045755",
    worksFor: {
        "@type": "Organization",
        name: "Demandlane"
    },
    address: {
        "@type": "PostalAddress",
        addressLocality: "Saint Petersburg",
        addressCountry: "RU"
    },
    sameAs: [
        "https://github.com/Mhmdaris15",
        "https://www.linkedin.com/in/muhammad-aris-septanugroho/",
        "https://www.kaggle.com/Mhmdaris15",
        "https://t.me/irazkisra"
    ],
    knowsAbout: [
        "Software Engineering",
        "AI Systems Engineering",
        "Platform Engineering",
        "DevOps",
        "Cloud Infrastructure",
        "Docker",
        "Google Cloud Platform",
        "Coolify",
        "Linux Server Administration",
        "Machine Learning",
        "Retrieval-Augmented Generation",
        "Vector Databases",
        "PostgreSQL",
        "Redis",
        "Real-time Systems",
        "WebSockets",
        "Go",
        "Python",
        "TypeScript",
        "React",
        "Next.js",
        "FastAPI"
    ],
    knowsLanguage: [
        { "@type": "Language", name: "Indonesian", alternateName: "id" },
        { "@type": "Language", name: "English", alternateName: "en" },
        { "@type": "Language", name: "Russian", alternateName: "ru" },
        { "@type": "Language", name: "German", alternateName: "de" }
    ]
});

/* ─── WebSite — site identity, supports site search box in SERPs ─── */

export const webSiteSchema = (): JsonLd => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.fullName + " — Engineering Portfolio",
    alternateName: SITE.name,
    url: SITE.origin,
    description: SITE.description,
    inLanguage: ["en", "ru"],
    publisher: { "@type": "Person", name: SITE.fullName },
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: SITE.origin + "/blog?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
});

/* ─── BreadcrumbList — used on detail pages ──────────────────── */

export const breadcrumbSchema = (
    items: { name: string; url: string }[]
): JsonLd => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url
    }))
});

/* ─── BlogPosting — for individual blog posts ────────────────── */

export const blogPostingSchema = (post: {
    title: string;
    excerpt: string;
    url: string;
    datePublished: string;
    image?: string;
    keywords: string[];
    locale: "en" | "ru";
    wordCount?: number;
}): JsonLd => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: post.url,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    image: post.image ? absolute(post.image) : absolute(SITE.ogImage),
    keywords: post.keywords.join(", "),
    inLanguage: post.locale,
    wordCount: post.wordCount,
    author: {
        "@type": "Person",
        name: SITE.fullName,
        url: SITE.origin
    },
    publisher: {
        "@type": "Person",
        name: SITE.fullName,
        url: SITE.origin
    },
    mainEntityOfPage: {
        "@type": "WebPage",
        "@id": post.url
    }
});

/* ─── CreativeWork — for project case studies ────────────────── */

export const creativeWorkSchema = (project: {
    name: string;
    description: string;
    url: string;
    keywords: string[];
    locale: "en" | "ru";
    dateCreated?: string;
    image?: string;
    codeRepository?: string;
}): JsonLd => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image ? absolute(project.image) : absolute(SITE.ogImage),
    keywords: project.keywords.join(", "),
    inLanguage: project.locale,
    dateCreated: project.dateCreated,
    creator: {
        "@type": "Person",
        name: SITE.fullName,
        url: SITE.origin
    },
    ...(project.codeRepository ? { codeRepository: project.codeRepository } : {})
});

/* ─── Event — for hackathons and conferences ─────────────────── */

export const eventSchema = (event: {
    name: string;
    description: string;
    url: string;
    startDate: string;
    endDate?: string;
    locationName: string;
    locationAddress: string;
    eventAttendanceMode?:
        | "OfflineEventAttendanceMode"
        | "OnlineEventAttendanceMode"
        | "MixedEventAttendanceMode";
    locale: "en" | "ru";
}): JsonLd => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    url: event.url,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
        "https://schema.org/" +
        (event.eventAttendanceMode || "OfflineEventAttendanceMode"),
    location: {
        "@type": "Place",
        name: event.locationName,
        address: event.locationAddress
    },
    inLanguage: event.locale,
    performer: {
        "@type": "Person",
        name: SITE.fullName,
        url: SITE.origin
    }
});

/* ─── ItemList — for /myworks and /events index pages ────────── */

export const itemListSchema = (
    name: string,
    items: { name: string; url: string }[]
): JsonLd => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url
    }))
});
