import { CSSProperties } from "react";
import "./loading.css";

/**
 * Atomic skeleton primitives — `<Sk>` blocks that shimmer.
 * Compose into page-shaped skeletons (see ./skeletons/*).
 */

interface SkProps {
  /** Inline width override — accepts CSS values. */
  w?: string | number;
  /** Inline height override. Default 12px. */
  h?: string | number;
  /** Optional class for variant styling (sk-block, sk-line--lg, etc.). */
  className?: string;
  style?: CSSProperties;
}

const css = (v?: string | number) =>
  typeof v === "number" ? `${v}px` : v;

export const Sk = ({ w, h, className = "", style }: SkProps) => (
  <div
    className={`sk ${className}`}
    style={{
      ...style,
      width: css(w) || style?.width,
      height: css(h) || style?.height
    }}
    aria-hidden
  />
);

/** Vertical group of skeleton lines with consistent spacing. */
export const SkRow = ({
  lines,
  gap = 8,
  widths
}: {
  lines: number;
  gap?: number;
  widths?: (string | number)[];
}) => (
  <div className="sk-row" style={{ gap }} aria-hidden>
    {Array.from({ length: lines }).map((_, i) => (
      <Sk key={i} w={widths?.[i] || `${100 - i * 8}%`} h={12} />
    ))}
  </div>
);

/** Big media block (16:9 by default), used for cover image placeholders. */
export const SkBlock = ({
  aspect = "16 / 9",
  className = ""
}: {
  aspect?: string;
  className?: string;
}) => (
  <div
    className={`sk sk-block ${className}`}
    style={{ aspectRatio: aspect }}
    aria-hidden
  />
);
