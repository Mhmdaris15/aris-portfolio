import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  ReactNode
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type Locale = "en" | "ru";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Build a path with the current locale prefix. */
  href: (path: string) => string;
  /** Build a path for a specific locale. */
  hrefFor: (l: Locale, path: string) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  href: (p) => p,
  hrefFor: (_, p) => p
});

const stripLocale = (pathname: string) => {
  if (pathname === "/ru") return "/";
  if (pathname.startsWith("/ru/")) return pathname.slice(3);
  return pathname;
};

const detectFromUrl = (pathname: string): Locale =>
  pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";

const buildHref = (locale: Locale, path: string) => {
  const clean = path.startsWith("/") ? path : "/" + path;
  if (locale === "ru") {
    return clean === "/" ? "/ru" : "/ru" + clean;
  }
  return clean;
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const locale = detectFromUrl(location.pathname);

  // Keep <html lang> in sync for SEO & a11y.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    const base = stripLocale(location.pathname);
    const target = buildHref(next, base) + location.search + location.hash;
    navigate(target);
  };

  const href = (path: string) => buildHref(locale, path);
  const hrefFor = (l: Locale, path: string) => buildHref(l, path);

  const value = useMemo(
    () => ({ locale, setLocale, href, hrefFor }),
    [locale, location.pathname]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);

/** Pick a value from a `{ en, ru }` object. */
export const pick = <T,>(obj: { en: T; ru: T }, locale: Locale): T =>
  obj[locale];
