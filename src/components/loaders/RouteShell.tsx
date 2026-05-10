import { Suspense, ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import {
  BlogListSkeleton,
  BlogPostSkeleton,
  MyWorksSkeleton,
  ProjectDetailSkeleton,
  GenericPageSkeleton
} from "./skeletons";

/**
 * RouteShell — picks the right Suspense fallback per route, plus wraps
 * the page in a Framer-Motion fade so navigations cross-fade.
 *
 * Why this lives separately from App: keeping route-specific fallback
 * choice next to the loaders makes adding a new route + skeleton easy
 * (pick a kind, done).
 */

type FallbackKind =
  | "blogList"
  | "blogPost"
  | "myWorks"
  | "projectDetail"
  | "events"
  | "resume"
  | "generic"
  | "screen";

const fallbackFor = (kind: FallbackKind): ReactNode => {
  switch (kind) {
    case "blogList":      return <BlogListSkeleton />;
    case "blogPost":      return <BlogPostSkeleton />;
    case "myWorks":       return <MyWorksSkeleton />;
    case "projectDetail": return <ProjectDetailSkeleton />;
    case "events":        return <GenericPageSkeleton />;
    case "resume":        return <GenericPageSkeleton />;
    case "generic":       return <GenericPageSkeleton />;
    case "screen":        return <LoadingScreen variant="route" />;
    default:              return <LoadingScreen variant="route" />;
  }
};

interface Props {
  children: ReactNode;
  fallback: FallbackKind;
}

const RouteShell = ({ children, fallback }: Props) => {
  const location = useLocation();
  const reduced = useReducedMotion();

  return (
    <Suspense fallback={fallbackFor(fallback)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{
            duration: reduced ? 0.15 : 0.32,
            ease: [0.22, 0.9, 0.3, 1]
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
};

export default RouteShell;
