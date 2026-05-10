import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./loading.css";

/**
 * Premium full-screen loader. Two variants:
 *   - "boot"   → first paint / initial app load. Maximalist: orbs, grid, scan,
 *                cycling status text, monogram, progress bar, build coords.
 *   - "route"  → in-app lazy chunk load. Compact: blurred backdrop, monogram,
 *                short status, progress glint. Smaller, faster to dismiss.
 *
 * Both fade in/out smoothly via Framer Motion. The status text cycles through
 * a natural sequence so even a slow chunk feels like progress, not a hang.
 */

type Variant = "boot" | "route";

interface Props {
  variant?: Variant;
  /** When provided, drive the progress bar; otherwise it auto-fakes 0→85%. */
  progress?: number;
  /** Override status messages — defaults are tuned for an engineering portfolio. */
  messages?: string[];
}

const DEFAULT_BOOT_MESSAGES = [
  "Resolving routes",
  "Hydrating components",
  "Warming caches",
  "Establishing connections",
  "Almost there"
];

const DEFAULT_ROUTE_MESSAGES = [
  "Loading chunk",
  "Resolving imports",
  "Painting page"
];

const buildId = (() => {
  // Fake but deterministic-feeling build identifier for the boot screen.
  const d = new Date();
  return `BUILD ${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
})();

const LoadingScreen = ({
  variant = "boot",
  progress,
  messages
}: Props) => {
  const reduced = useReducedMotion();
  const isBoot = variant === "boot";
  const msgs = messages || (isBoot ? DEFAULT_BOOT_MESSAGES : DEFAULT_ROUTE_MESSAGES);

  // Cycle through status messages
  const [msgIndex, setMsgIndex] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setMsgIndex((i) => (i + 1) % msgs.length),
      isBoot ? 900 : 700
    );
    return () => clearInterval(id);
  }, [msgs.length, isBoot, reduced]);

  // Auto-fake progress 0 → 85% if not externally controlled
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    if (progress !== undefined) return;
    let raf: number;
    const start = performance.now();
    const ceil = isBoot ? 0.85 : 0.92;
    const tick = (now: number) => {
      // Asymptotic: fast at start, slow down approaching ceil
      const t = (now - start) / (isBoot ? 4500 : 1800);
      const eased = ceil * (1 - Math.exp(-t * 1.6));
      setAuto(eased);
      if (eased < ceil - 0.01) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress, isBoot]);

  const p = progress !== undefined ? progress : auto;

  const enter = reduced
    ? ({ duration: 0.2 } as const)
    : ({ duration: 0.6, ease: "easeOut" } as const);

  return (
    <motion.div
      className={`ls-screen ${variant === "route" ? "is-route" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={enter}
      role="status"
      aria-live="polite"
      aria-label={isBoot ? "Loading the portfolio" : "Loading the next page"}
    >
      {isBoot && (
        <>
          <div className="ls-grid" />
          <div className="ls-scan" />
        </>
      )}

      <div className="ls-center">
        <motion.span
          className="ls-eyebrow"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, ...enter }}
        >
          {isBoot ? "Aris · Portfolio" : "Loading"}
        </motion.span>

        <motion.div
          className="ls-monogram"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, ...enter }}
          aria-hidden
        >
          <span>A</span>
          <span>·</span>
          <span>S</span>
        </motion.div>

        <motion.div
          className="ls-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, ...enter }}
        >
          <span className="ls-status-dot" />
          <motion.span
            key={msgIndex}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {msgs[msgIndex]}…
          </motion.span>
        </motion.div>

        <motion.div
          className="ls-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, ...enter }}
          aria-hidden={progress === undefined}
          role={progress === undefined ? undefined : "progressbar"}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress === undefined ? undefined : Math.round(p * 100)}
        >
          <motion.div
            className="ls-progress-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: p }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          {!reduced && <div className="ls-progress-glint" />}
        </motion.div>
      </div>

      {isBoot && (
        <motion.div
          className="ls-coords"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, ...enter }}
        >
          <span className="ls-coords-label">Region · SPB · 59.93°N 30.33°E</span>
          <span>{buildId}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
export { type Variant as LoadingVariant };
