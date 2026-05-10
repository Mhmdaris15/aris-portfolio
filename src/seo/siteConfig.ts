/**
 * Single source of truth for SEO-relevant site config.
 * Imported by SeoHead, sitemap generator, robots.txt, manifest, etc.
 */

export const SITE = {
    /** Canonical origin. Change once and the entire SEO surface follows. */
    origin: "https://aris-septanugroho-portfolio.vercel.app",

    name: "Aris Septanugroho",
    fullName: "Muhammad Aris Septanugroho",

    /** Default title — used as suffix in `%s | <name>` template. */
    titleTemplate: "%s · Aris Septanugroho",
    titleDefault:
        "Aris Septanugroho — AI Engineer · Platform Engineer · Full-Stack Developer",

    /** Default site-wide meta description (under ~160 chars for Google). */
    description:
        "AI Engineer, Platform Engineer, and Full-Stack Developer. I design and run production systems — RAG pipelines on GCP, real-time platforms in Go, self-hosted Docker infrastructure with Coolify, and data automation on Redshift. Open to senior roles and freelance.",

    /** Keywords aren't ranked anymore but help non-Google bots categorize. */
    keywords: [
        "Aris Septanugroho",
        "Mhmdaris15",
        "AI Engineer",
        "Platform Engineer",
        "DevOps Engineer",
        "Full-Stack Developer",
        "Data Scientist",
        "Cloud Infrastructure",
        "Docker",
        "Google Cloud Platform",
        "Coolify",
        "Self-Hosted Cloud Platform",
        "Machine Learning",
        "AI Systems",
        "RAG",
        "React Developer",
        "Next.js Developer",
        "Go Developer",
        "Python Developer",
        "TypeScript",
        "Containerized Deployment",
        "CI/CD",
        "Linux Server Administration",
        "Infrastructure Engineering",
        "Saint Petersburg",
        "Indonesia",
        "Freelance Developer"
    ],

    /** Default OG / Twitter card image (absolute URL). */
    ogImage: "/images/photo-aris-professional.jpeg",
    ogImageAlt: "Muhammad Aris Septanugroho — Engineer & Platform Builder",

    twitterHandle: "",

    /** Verification tokens — set via env at build time, exposed to Helmet. */
    verification: {
        google: import.meta.env?.VITE_GOOGLE_VERIFICATION || "",
        yandex: import.meta.env?.VITE_YANDEX_VERIFICATION || "",
        bing: import.meta.env?.VITE_BING_VERIFICATION || ""
    },

    /** Analytics IDs — env-driven, shipped only when set. */
    analytics: {
        googleAnalyticsId: import.meta.env?.VITE_GA_ID || "",
        yandexMetricaId: import.meta.env?.VITE_YANDEX_METRICA_ID || "",
        bingUetId: import.meta.env?.VITE_BING_UET_ID || ""
    },

    /** Theme color for the address bar / PWA. */
    themeColor: "#0b080c",

    /** Geographic targeting — primary location and supported locales. */
    geo: {
        region: "RU-SPE",
        placename: "Saint Petersburg, Russia",
        position: "59.9343;30.3351"
    },

    locales: {
        default: "en",
        supported: ["en", "ru"] as const
    }
} as const;

/** Build an absolute URL from a relative path. */
export const absolute = (path: string): string => {
    const clean = path.startsWith("/") ? path : "/" + path;
    return SITE.origin + clean;
};

/** Build the canonical URL for a route, locale-aware. */
export const canonicalFor = (path: string, locale: "en" | "ru"): string => {
    if (locale === "ru") {
        const ruPath = path === "/" ? "/ru" : "/ru" + path;
        return absolute(ruPath);
    }
    return absolute(path);
};

/** Both-locale alternates for a path — used in <link rel="alternate" hreflang>. */
export const alternatesFor = (path: string) => ({
    en: absolute(path),
    ru: absolute(path === "/" ? "/ru" : "/ru" + path),
    xDefault: absolute(path)
});
