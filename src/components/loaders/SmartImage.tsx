import { useState, ImgHTMLAttributes } from "react";
import "./loading.css";

/**
 * Image with skeleton-shimmer placeholder + blur-up reveal on load.
 * Drop-in replacement for <img>. Accepts the standard img attrs.
 *
 * Use for any image that may take >100ms to arrive (covers, gallery).
 * For CSS-painted SVGs (ProjectCover) — skip; they're synchronous.
 */

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Aspect ratio CSS — e.g. "16 / 9". Defaults to using natural ratio. */
  aspect?: string;
  /** Skip the blur reveal — instant fade only. */
  noBlur?: boolean;
}

const SmartImage = ({
  src,
  alt,
  aspect,
  noBlur,
  className,
  style,
  loading = "lazy",
  decoding = "async",
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) return null;

  return (
    <div
      className={`smart-img ${className || ""}`}
      style={{ aspectRatio: aspect, ...style }}
    >
      {!loaded && <div className="smart-img-skeleton" />}
      <img
        {...rest}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={`smart-img-img ${loaded ? "is-loaded" : ""} ${noBlur ? "no-blur" : ""}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        draggable={false}
      />
    </div>
  );
};

export default SmartImage;
