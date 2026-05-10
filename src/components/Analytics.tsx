import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../seo/siteConfig";

/**
 * Analytics — env-driven. Each provider only loads when its ID is set.
 *
 * Set in `.env.local` or your hosting provider:
 *   VITE_GA_ID=G-XXXXXXXXXX
 *   VITE_YANDEX_METRICA_ID=12345678
 *   VITE_BING_UET_ID=12345678
 *
 * Triggers a virtual pageview on route change for SPA tracking.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, action: string, ...args: unknown[]) => void;
    uetq?: unknown[];
  }
}

const Analytics = () => {
  const { pathname, search } = useLocation();
  const { googleAnalyticsId, yandexMetricaId, bingUetId } = SITE.analytics;

  /* ─── One-time loader for each provider ─── */
  useEffect(() => {
    if (googleAnalyticsId && !document.getElementById("ga4-loader")) {
      const s = document.createElement("script");
      s.id = "ga4-loader";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(s);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer!.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", googleAnalyticsId, { send_page_view: false });
    }

    if (yandexMetricaId && !document.getElementById("ym-loader")) {
      const id = Number(yandexMetricaId);
      // Yandex Metrica counter — keep the stock loader shape but skip TS gymnastics.
      const w = window as unknown as Record<string, unknown>;
      const ymStub = function (...args: unknown[]) {
        (ymStub as unknown as { a: unknown[] }).a =
          (ymStub as unknown as { a?: unknown[] }).a || [];
        (ymStub as unknown as { a: unknown[] }).a.push(args);
      };
      (ymStub as unknown as { l: number }).l = +new Date();
      w.ym = w.ym || ymStub;
      const s = document.createElement("script");
      s.id = "ym-loader";
      s.async = true;
      s.src = "https://mc.yandex.ru/metrika/tag.js";
      document.head.appendChild(s);
      window.ym?.(id, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        defer: true
      });
    }

    if (bingUetId && !document.getElementById("uet-loader")) {
      window.uetq = window.uetq || [];
      const s = document.createElement("script");
      s.id = "uet-loader";
      s.async = true;
      s.src = `//bat.bing.com/bat.js`;
      s.onload = () => {
        // @ts-expect-error UET global
        new window.UET({ ti: bingUetId, q: window.uetq }).push("pageLoad");
      };
      document.head.appendChild(s);
    }
  }, [googleAnalyticsId, yandexMetricaId, bingUetId]);

  /* ─── Pageview on route change ─── */
  useEffect(() => {
    const url = pathname + search;
    if (googleAnalyticsId && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title
      });
    }
    if (yandexMetricaId && window.ym) {
      window.ym(Number(yandexMetricaId), "hit", url);
    }
    if (bingUetId && window.uetq) {
      window.uetq.push("event", "page_view", { page_path: url });
    }
  }, [pathname, search, googleAnalyticsId, yandexMetricaId, bingUetId]);

  return null;
};

export default Analytics;
