import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocale, pick } from "../i18n/LocaleContext";
import { config } from "../config";
import SeoHead from "../seo/SeoHead";
import "../styles/editorial.css";
import "./QrCard.css";

const QR_SRC = "/images/to-website-qr.png";
const SITE_URL = "aris-portfolio.vercel.app";

/* ───────────────────────────────────────────────
 * Page-level copy, bilingual.
 * Tweak `tagline` and `secondary` to your voice — these are the words
 * people read after they land on the QR page itself (not after scanning).
 * ─────────────────────────────────────────────── */
const messaging = {
    eyebrow: { en: "Show this · Get scanned", ru: "Покажи · Просканируют" },
    tagline: {
        en: "Scan to see what I'm building.",
        ru: "Отсканируйте, чтобы увидеть, что я строю."
    },
    secondary: {
        en: "Projects, writing, talks, and how to reach me.",
        ru: "Проекты, статьи, выступления и как со мной связаться."
    },
    presentHint: {
        en: "Tap the code · press P · or hit fullscreen for a clean scannable view.",
        ru: "Нажмите код · клавиша P · или fullscreen для чистого вида."
    },
    presentExit: { en: "Press Esc to exit", ru: "Esc чтобы выйти" },
    download: { en: "Download QR", ru: "Скачать QR" },
    enterPresent: { en: "Present mode", ru: "Режим презентации" }
};

const QrCard = () => {
    const { locale, href } = useLocale();
    const [present, setPresent] = useState(false);

    const enterPresent = useCallback(() => {
        setPresent(true);
        // Hide the OS scrollbar while presenting — we want a perfectly
        // clean canvas for the camera, no chrome flicker.
        document.body.style.overflow = "hidden";
    }, []);

    const exitPresent = useCallback(() => {
        setPresent(false);
        document.body.style.overflow = "";
    }, []);

    // Keyboard: P / F to enter, Esc to exit.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement) return;
            if (!present && (e.key === "p" || e.key === "P" || e.key === "f")) {
                enterPresent();
            } else if (present && e.key === "Escape") {
                exitPresent();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [present, enterPresent, exitPresent]);

    return (
        <div className="editorial qr-page">
            <SeoHead
                path="/qr"
                title={locale === "ru" ? "QR-карточка" : "QR Card"}
                description={
                    locale === "ru"
                        ? "QR-карточка для сканирования на встречах и хакатонах — ведёт прямо на портфолио."
                        : "QR card for scanning at meetups and hackathons — points to the portfolio."
                }
                noIndex
            />
            <div className="grain" />

            {/* Top rail — hidden in present mode for a clean canvas */}
            {!present && (
                <header className="editorial-rail">
                    <Link to={href("/")} className="editorial-back">
                        {locale === "ru" ? "На главную" : "Index"}
                    </Link>
                    <span className="editorial-rail-center">
                        {locale === "ru" ? "QR-карточка" : "QR Card"}
                    </span>
                    <span className="editorial-rail-right">
                        {SITE_URL}
                    </span>
                </header>
            )}

            {!present && (
                <div className="editorial-container qr-shell">
                    <section className="qr-stage">
                        <div className="qr-meta">
                            <span className="editorial-eyebrow">
                                {pick(messaging.eyebrow, locale)}
                            </span>
                            <h1 className="editorial-display qr-title">
                                {locale === "ru" ? (
                                    <>
                                        Покажи это —
                                        <br />
                                        <em>пусть сканируют.</em>
                                    </>
                                ) : (
                                    <>
                                        Show this —
                                        <br />
                                        <em>let them scan.</em>
                                    </>
                                )}
                            </h1>
                            <p className="editorial-lead qr-tagline">
                                {pick(messaging.tagline, locale)}
                            </p>
                            <p className="qr-secondary">
                                {pick(messaging.secondary, locale)}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="qr-card"
                            onClick={enterPresent}
                            aria-label={pick(messaging.enterPresent, locale)}
                            data-cursor="disable"
                        >
                            <img src={QR_SRC} alt="Portfolio QR code" />
                            <div className="qr-card-foot">
                                <span className="qr-card-name">
                                    {pick(config.developer.name, locale).toUpperCase()}
                                </span>
                                <span className="qr-card-url">{SITE_URL}</span>
                            </div>
                        </button>
                    </section>

                    <footer className="qr-footer">
                        <p className="qr-hint">
                            {pick(messaging.presentHint, locale)}
                        </p>
                        <div className="qr-actions">
                            <button
                                type="button"
                                className="editorial-cta-ghost"
                                onClick={enterPresent}
                                data-cursor="disable"
                            >
                                {pick(messaging.enterPresent, locale)} →
                            </button>
                            <a
                                href={QR_SRC}
                                download="aris-portfolio-qr.png"
                                className="editorial-cta-ghost"
                                data-cursor="disable"
                            >
                                {pick(messaging.download, locale)} ↓
                            </a>
                        </div>
                    </footer>
                </div>
            )}

            {/* Present mode — full white canvas, just the QR */}
            {present && (
                <div
                    className="qr-present"
                    onClick={exitPresent}
                    role="dialog"
                    aria-label="QR presentation mode"
                >
                    <img
                        src={QR_SRC}
                        alt="Portfolio QR code"
                        className="qr-present-img"
                    />
                    <div className="qr-present-meta">
                        <span className="qr-present-name">
                            {pick(config.developer.fullName, locale)}
                        </span>
                        <span className="qr-present-url">{SITE_URL}</span>
                    </div>
                    <span className="qr-present-exit">
                        {pick(messaging.presentExit, locale)}
                    </span>
                </div>
            )}
        </div>
    );
};

export default QrCard;
