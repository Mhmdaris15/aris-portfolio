import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "./loading.css";

/**
 * NProgress-style top progress bar that pulses on every route change.
 * Fires when location changes; fills to ~85% over 600ms; completes
 * to 100% after a short tick; then fades out.
 *
 * Lives globally — drop once into App and forget.
 */

const RouteProgress = () => {
  const { pathname, search } = useLocation();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "running" | "complete">("idle");
  const [first, setFirst] = useState(true);

  useEffect(() => {
    // Skip animation on the very first mount — that's the boot, not a transition.
    if (first) {
      setFirst(false);
      return;
    }
    setPhase("running");
    const t1 = setTimeout(() => setPhase("complete"), 600);
    const t2 = setTimeout(() => setPhase("idle"), 950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  if (reduced) return null;

  const target =
    phase === "running" ? 0.85 : phase === "complete" ? 1 : 0;

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          className="rp-bar"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="rp-bar-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: target }}
            transition={{
              duration: phase === "complete" ? 0.25 : 0.6,
              ease: phase === "complete" ? "easeOut" : "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteProgress;
