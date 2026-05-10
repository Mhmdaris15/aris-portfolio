import { CSSProperties } from "react";
import "./logo.css";

/**
 * Brand mark for Aris.
 *
 * The mark is a continuous A-stroke whose apex resolves into an accent
 * dot — reads as both a letterform and a "node" indicator. Sister to
 * the editorial Fraunces serif used elsewhere; the mark is geometric
 * and modernist on purpose, like Linear's letter-mark next to its
 * serif content.
 *
 *   <Logo />                       compact mark, currentColor
 *   <Logo variant="wordmark" />    "aris" wordmark only
 *   <Logo variant="lockup" />      mark + wordmark side-by-side
 *   <Logo variant="animated" />    stroke-draws on mount + dot pulse
 */

type Variant = "mark" | "wordmark" | "lockup" | "animated";

interface Props {
  variant?: Variant;
  size?: number | string;
  /** Override accent dot color. Default: var(--accentColor). */
  accent?: string;
  className?: string;
  style?: CSSProperties;
  /** Drop the accent dot — pure monochrome (favicon, print). */
  mono?: boolean;
  ariaLabel?: string;
}

const Logo = ({
  variant = "mark",
  size,
  accent = "var(--accentColor, #c2a4ff)",
  className = "",
  style,
  mono = false,
  ariaLabel = "Aris"
}: Props) => {
  const dim = typeof size === "number" ? `${size}px` : size;

  if (variant === "wordmark") {
    return (
      <span
        className={`brand-wordmark ${className}`}
        style={{ fontSize: dim, ...style }}
        aria-label={ariaLabel}
      >
        <span className="brand-wordmark-text">aris</span>
        <span className="brand-wordmark-dot" style={{ background: mono ? "currentColor" : accent }} aria-hidden />
      </span>
    );
  }

  if (variant === "lockup") {
    return (
      <span
        className={`brand-lockup ${className}`}
        style={{ fontSize: dim, ...style }}
        aria-label={ariaLabel}
      >
        <Mark mono={mono} accent={accent} animated={false} />
        <span className="brand-lockup-text">aris</span>
      </span>
    );
  }

  if (variant === "animated") {
    return (
      <span
        className={`brand-mark brand-mark--animated ${className}`}
        style={{ width: dim, height: dim, ...style }}
        aria-label={ariaLabel}
        role="img"
      >
        <Mark mono={mono} accent={accent} animated />
      </span>
    );
  }

  // mark (default)
  return (
    <span
      className={`brand-mark ${className}`}
      style={{ width: dim, height: dim, ...style }}
      aria-label={ariaLabel}
      role="img"
    >
      <Mark mono={mono} accent={accent} animated={false} />
    </span>
  );
};

interface MarkProps {
  mono: boolean;
  accent: string;
  animated: boolean;
}

const Mark = ({ mono, accent, animated }: MarkProps) => (
  <svg
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden
    focusable="false"
  >
    {/* continuous A stroke — bottom-left → apex → bottom-right */}
    <path
      d="M 5 33 L 18 7 L 31 33"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={animated ? 100 : undefined}
      className={animated ? "brand-stroke-draw" : ""}
    />
    {/* crossbar */}
    <path
      d="M 11 22 L 25 22"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      pathLength={animated ? 100 : undefined}
      className={animated ? "brand-stroke-draw brand-stroke-draw--crossbar" : ""}
    />
    {/* apex accent dot — the signature */}
    <circle
      cx="18"
      cy="7"
      r="2.6"
      fill={mono ? "currentColor" : accent}
      className={animated ? "brand-dot-pulse" : ""}
    />
  </svg>
);

export default Logo;
