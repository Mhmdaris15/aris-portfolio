import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LocaleProvider } from "./i18n/LocaleContext";

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
const Play = lazy(() => import("./pages/Play"));
const AdminApp = lazy(() => import("./admin/AdminApp"));
import { LoadingProvider } from "./context/LoadingProvider";

const home = (
  <LoadingProvider>
    <Suspense>
      <MainContainer>
        <Suspense>
          <CharacterModel />
        </Suspense>
      </MainContainer>
    </Suspense>
  </LoadingProvider>
);

const wrap = (node: JSX.Element) => (
  <Suspense fallback={<div>Loading...</div>}>{node}</Suspense>
);

const App = () => {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <Routes>
          {/* English (default) */}
          <Route path="/" element={home} />
          <Route path="/myworks" element={wrap(<MyWorks />)} />
          <Route path="/works/:slug" element={wrap(<ProjectDetail />)} />
          <Route path="/blog" element={wrap(<Blog />)} />
          <Route path="/blog/:slug" element={wrap(<BlogPost />)} />
          <Route path="/events" element={wrap(<Events />)} />
          <Route path="/events/:slug" element={wrap(<EventDetail />)} />
          <Route path="/resume" element={wrap(<Resume />)} />
          <Route path="/qr" element={wrap(<QrCard />)} />
          <Route path="/play" element={wrap(<Play />)} />

          {/* Admin (locale-agnostic) */}
          <Route path="/admin/*" element={wrap(<AdminApp />)} />

          {/* Russian */}
          <Route path="/ru" element={home} />
          <Route path="/ru/myworks" element={wrap(<MyWorks />)} />
          <Route path="/ru/works/:slug" element={wrap(<ProjectDetail />)} />
          <Route path="/ru/blog" element={wrap(<Blog />)} />
          <Route path="/ru/blog/:slug" element={wrap(<BlogPost />)} />
          <Route path="/ru/events" element={wrap(<Events />)} />
          <Route path="/ru/events/:slug" element={wrap(<EventDetail />)} />
          <Route path="/ru/resume" element={wrap(<Resume />)} />
          <Route path="/ru/qr" element={wrap(<QrCard />)} />
          <Route path="/ru/play" element={wrap(<Play />)} />
        </Routes>
      </LocaleProvider>
    </BrowserRouter>
  );
};

export default App;
