import { lazy, Suspense, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import { LocaleProvider } from "./i18n/LocaleContext";
import Analytics from "./components/Analytics";
import {
  RouteShell,
  RouteProgress,
  LoadingScreen
} from "./components/loaders";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Resume = lazy(() => import("./pages/Resume"));
const QrCard = lazy(() => import("./pages/QrCard"));
const GitHubShowcase = lazy(() => import("./pages/GitHubShowcase"));
const Play = lazy(() => import("./pages/Play"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminApp = lazy(() => import("./admin/AdminApp"));
import { LoadingProvider } from "./context/LoadingProvider";

/* Home is special — has a 3D character + LoadingProvider already.
   Wrap its inner Suspense with the route loading screen. */
const home = (
  <LoadingProvider>
    <Suspense fallback={<LoadingScreen variant="boot" />}>
      <MainContainer>
        <Suspense fallback={null}>
          <CharacterModel />
        </Suspense>
      </MainContainer>
    </Suspense>
  </LoadingProvider>
);

/** Wrap a page in the right Suspense fallback + route transition. */
const wrap = (
  node: ReactNode,
  fallback: Parameters<typeof RouteShell>[0]["fallback"]
) => <RouteShell fallback={fallback}>{node}</RouteShell>;

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LocaleProvider>
          <Analytics />
          <RouteProgress />
          <Routes>
            {/* English (default) */}
            <Route path="/" element={home} />
            <Route path="/myworks" element={wrap(<MyWorks />, "myWorks")} />
            <Route
              path="/works/:slug"
              element={wrap(<ProjectDetail />, "projectDetail")}
            />
            <Route path="/blog" element={wrap(<Blog />, "blogList")} />
            <Route
              path="/blog/:slug"
              element={wrap(<BlogPost />, "blogPost")}
            />
            <Route path="/events" element={wrap(<Events />, "events")} />
            <Route
              path="/events/:slug"
              element={wrap(<EventDetail />, "generic")}
            />
            <Route path="/resume" element={wrap(<Resume />, "resume")} />
            <Route path="/qr" element={wrap(<QrCard />, "screen")} />
            <Route path="/github" element={wrap(<GitHubShowcase />, "myWorks")} />
            <Route path="/play" element={wrap(<Play />, "screen")} />

            {/* Admin (locale-agnostic, noindex) */}
            <Route path="/admin/*" element={wrap(<AdminApp />, "screen")} />

            {/* Russian */}
            <Route path="/ru" element={home} />
            <Route
              path="/ru/myworks"
              element={wrap(<MyWorks />, "myWorks")}
            />
            <Route
              path="/ru/works/:slug"
              element={wrap(<ProjectDetail />, "projectDetail")}
            />
            <Route path="/ru/blog" element={wrap(<Blog />, "blogList")} />
            <Route
              path="/ru/blog/:slug"
              element={wrap(<BlogPost />, "blogPost")}
            />
            <Route path="/ru/events" element={wrap(<Events />, "events")} />
            <Route
              path="/ru/events/:slug"
              element={wrap(<EventDetail />, "generic")}
            />
            <Route path="/ru/resume" element={wrap(<Resume />, "resume")} />
            <Route path="/ru/qr" element={wrap(<QrCard />, "screen")} />
            <Route path="/ru/github" element={wrap(<GitHubShowcase />, "myWorks")} />
            <Route path="/ru/play" element={wrap(<Play />, "screen")} />

            {/* 404 — must be last so it matches when nothing else does */}
            <Route path="*" element={wrap(<NotFound />, "generic")} />
          </Routes>
        </LocaleProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
