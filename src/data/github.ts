/**
 * Curated GitHub showcase. Fed by `scripts/sync-github-repos.mjs`
 * which queries the GitHub API and merges fresh metadata (stars,
 * forks, language, last push) with hand-curated narrative fields.
 *
 * The narrative — category, tagline, summary, stack, cover — is
 * what differentiates this from a generic repo dump. Edit those
 * freely; never edit `lastSyncedAt` or `metrics` (auto-overwritten).
 */

type Bilingual<T> = { en: T; ru: T };

export type GhCategory =
    | "platform"   // Platform engineering / infra-as-code
    | "ai"         // AI / ML / LLM systems
    | "data"       // Data engineering / analytics
    | "fullstack"  // Full-stack apps
    | "realtime"   // Real-time / WebSocket / multiplayer
    | "automation" // Bots, scrapers, scheduled workflows
    | "web"        // Marketing / landing / brochure sites
    | "research"   // Hackathons / research projects
    | "devops";    // CI/CD / Docker / cloud orchestration

export interface GhMetrics {
    stars: number;
    forks: number;
    /** ISO date of last push to default branch. */
    pushedAt: string;
    /** ISO date of repo creation. */
    createdAt: string;
    language: string;
    /** GitHub repo size in KB (signal of substance). */
    sizeKb?: number;
    /** Open issues count — sometimes meaningful, often noise. */
    openIssues?: number;
}

export interface GhProject {
    /** Used for routing + asset filenames; matches the repo slug closely. */
    slug: string;
    repo: string;        // Mhmdaris15/<repo>
    repoName: string;    // bare repo name
    private: boolean;    // private repos render with a "private" badge
    category: GhCategory;
    /** Cover image — `/images/github/<slug>.png` or external URL. */
    cover?: string;
    /** Short, scannable headline — what this thing IS. */
    tagline: Bilingual<string>;
    /** 2–3 sentence narrative summary — engineered, not auto-generated. */
    summary: Bilingual<string>;
    /** Inferred or declared tech stack. Display chips. */
    stack: string[];
    /** Capability tags: e.g. "WebSocket", "LLM", "Production", "Hackathon". */
    tags: string[];
    /** Optional live demo / deploy URL. */
    demo?: string;
    /** Featured — pinned to the top of the showcase. */
    featured?: boolean;
    /** Metrics — overwritten by the sync script. */
    metrics: GhMetrics;
    /** ISO timestamp of last sync. */
    lastSyncedAt: string;
}

const SYNCED = "2026-05-08T00:00:00Z";

export const githubProjects: GhProject[] = [
    /* ─── Platform / Infrastructure ────────────────────────────── */
    {
        slug: "self-hosted-cloud-platform",
        repo: "Mhmdaris15/aris-portfolio",
        repoName: "aris-portfolio",
        private: false,
        category: "platform",
        tagline: {
            en: "Self-hosted cloud platform on GCP, orchestrated with Coolify",
            ru: "Self-hosted облачная платформа на GCP, оркестрированная Coolify"
        },
        summary: {
            en: "A Coolify-orchestrated GCP VM hosting every production service I run — web apps, APIs, databases, AI workloads, and monitoring — under one wildcard domain. Each new service is one git push away from being live with HTTPS.",
            ru: "Coolify-оркестрируемая GCP VM хостит все мои production-сервисы — веб-приложения, API, базы, AI-нагрузки, мониторинг — под одним wildcard-доменом. Каждый новый сервис — это git push до live с HTTPS."
        },
        stack: ["Coolify", "Docker", "GCP", "Cloudflare", "Nginx", "GitHub Actions"],
        tags: ["Platform Engineering", "DevOps", "Infrastructure", "Production"],
        demo: "https://aris.permiraspb.org",
        featured: true,
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2026-05-07T00:59:35Z",
            createdAt: "2026-02-23T03:18:59Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "erpnext-recursive",
        repo: "Mhmdaris15/ERPNext-Recursive",
        repoName: "ERPNext-Recursive",
        private: true,
        category: "devops",
        tagline: {
            en: "Production Frappe/ERPNext deployment with multi-tenant ops",
            ru: "Production-деплой Frappe/ERPNext с multi-tenant ops"
        },
        summary: {
            en: "Docker Compose stack deploying Frappe + ERPNext for restaurant clients. Multi-tenancy via per-site databases, automated backups, hooked-in custom apps, and an operational runbook for upgrades that don't break.",
            ru: "Docker Compose стек, разворачивающий Frappe + ERPNext для ресторанных клиентов. Multi-tenancy через per-site базы, автоматические бэкапы, кастомные приложения через хуки и runbook апгрейдов, которые не ломают."
        },
        stack: ["Docker Compose", "Frappe", "ERPNext", "Python", "Nginx", "MariaDB"],
        tags: ["DevOps", "Multi-Tenant", "Docker", "Production"],
        featured: true,
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2025-07-01T18:29:00Z",
            createdAt: "2025-05-05T08:56:26Z",
            language: "Python"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "tina-cms-self-hosted",
        repo: "Mhmdaris15/tina-cms-self-hosted",
        repoName: "tina-cms-self-hosted",
        private: false,
        category: "platform",
        tagline: {
            en: "Tina CMS, self-hosted with full editorial pipeline",
            ru: "Tina CMS, self-hosted с полным editorial-пайплайном"
        },
        summary: {
            en: "Self-hosted Tina CMS deployment — git-backed content storage, custom collections, and a deploy hook into Vercel. Built so non-technical contributors can update the live site without touching a PR.",
            ru: "Self-hosted Tina CMS — git-backed хранилище контента, кастомные коллекции, deploy hook в Vercel. Чтобы не-технические контрибьюторы обновляли live-сайт без PR."
        },
        stack: ["Tina CMS", "Next.js", "TypeScript", "Vercel"],
        tags: ["CMS", "Self-Hosted", "Content Pipeline"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2024-04-05T22:24:32Z",
            createdAt: "2024-04-05T22:18:37Z",
            language: "TypeScript",
            openIssues: 4
        },
        lastSyncedAt: SYNCED
    },

    /* ─── AI / ML systems ──────────────────────────────────────── */
    {
        slug: "ragemini",
        repo: "Mhmdaris15/RAGemini",
        repoName: "RAGemini",
        private: true,
        category: "ai",
        tagline: {
            en: "Production RAG pipeline on Gemini with FastAPI + ChromaDB",
            ru: "Production RAG-пайплайн на Gemini с FastAPI + ChromaDB"
        },
        summary: {
            en: "Retrieval-Augmented Generation system: chunked document ingest, ChromaDB vector index with HNSW, hybrid retrieval, and a Gemini chat layer with multi-turn memory. Deployed behind FastAPI with structured logging and per-request token accounting.",
            ru: "RAG-система: chunked ingest документов, векторный индекс ChromaDB c HNSW, гибридный retrieval, чат-слой на Gemini с multi-turn памятью. Развёрнуто за FastAPI со структурным логированием и per-request учётом токенов."
        },
        stack: ["Python", "FastAPI", "ChromaDB", "Gemini", "Pydantic"],
        tags: ["AI", "RAG", "LLM", "Production"],
        featured: true,
        metrics: {
            stars: 1, forks: 1,
            pushedAt: "2025-07-21T09:48:12Z",
            createdAt: "2025-05-22T23:35:55Z",
            language: "Python"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "aimo-competition",
        repo: "Mhmdaris15/aimo-competition",
        repoName: "aimo-competition",
        private: true,
        category: "ai",
        tagline: {
            en: "vLLM + DeepSeek-R1 reasoning pipeline for AIMO Kaggle prize",
            ru: "vLLM + DeepSeek-R1 reasoning-пайплайн для AIMO Kaggle"
        },
        summary: {
            en: "Self-consistency chain-of-thought across DeepSeek-R1 traces with entropy-weighted majority voting and a Python tool-execution layer for arithmetic verification. Continuous-batched on vLLM — 5× throughput vs static batching after reading the scheduler source.",
            ru: "Self-consistency chain-of-thought по trace'ам DeepSeek-R1 с голосованием по энтропии и Python tool-execution для арифметической проверки. Continuous batching на vLLM — 5× throughput против static batching после чтения исходника планировщика."
        },
        stack: ["Python", "vLLM", "DeepSeek-R1", "Qwen", "Kaggle"],
        tags: ["AI", "LLM", "Competition", "Reasoning"],
        featured: true,
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2026-02-18T11:41:38Z",
            createdAt: "2026-02-09T06:09:57Z",
            language: "Jupyter Notebook"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "batik-clothes-generator",
        repo: "Mhmdaris15/batik-clothes-generator",
        repoName: "batik-clothes-generator",
        private: false,
        category: "ai",
        tagline: {
            en: "AI-generated batik clothing patterns from text prompts",
            ru: "AI-сгенерированные узоры батика по текстовым промптам"
        },
        summary: {
            en: "Generative pipeline that takes natural-language descriptions of batik motifs and produces wearable clothing pattern previews. Built on a diffusion backbone with a Next.js front end and Cloudflare R2 for cached generations.",
            ru: "Генеративный пайплайн: текстовое описание мотива батика → превью паттернов одежды. Diffusion-бэкенд + Next.js фронтенд + Cloudflare R2 для кэша генераций."
        },
        stack: ["Next.js", "TypeScript", "Diffusion", "Cloudflare R2"],
        tags: ["AI", "Image Generation", "Cultural Tech"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2026-04-05T07:46:08Z",
            createdAt: "2026-02-21T16:36:01Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "propensity-model",
        repo: "Mhmdaris15/propensity-model",
        repoName: "propensity-model",
        private: false,
        category: "data",
        tagline: {
            en: "Lead-scoring propensity model — production-deployed at Demandlane",
            ru: "Propensity-модель скоринга лидов — production в Demandlane"
        },
        summary: {
            en: "Gradient-boosted lead-scoring model with feature engineering on 18 months of CRM history. Calibrated probabilities feed a daily scoring pipeline; retraining cut from ~6h to ~1h via parallelized cross-validation.",
            ru: "Gradient-boosted модель скоринга лидов с feature engineering по 18 месяцам CRM-истории. Калиброванные вероятности кормят daily scoring-пайплайн; переобучение сокращено с ~6ч до ~1ч через параллельную CV."
        },
        stack: ["Python", "XGBoost", "CatBoost", "Scikit-learn", "AWS Redshift"],
        tags: ["ML", "Production", "Data Science"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2024-06-18T06:28:33Z",
            createdAt: "2024-06-14T17:31:23Z",
            language: "Python"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "idcard-detector",
        repo: "Mhmdaris15/idcard-detector",
        repoName: "idcard-detector",
        private: false,
        category: "ai",
        tagline: {
            en: "ID card OCR + face-match identity verification",
            ru: "OCR удостоверений + matching лиц для верификации"
        },
        summary: {
            en: "Django + Prisma backend that OCRs an Indonesian ID card, extracts structured fields, then runs a separate face-recognition pass to verify the cardholder against a captured selfie. Pipeline tolerates blur, glare, and partial occlusion.",
            ru: "Django + Prisma бэкенд: OCR индонезийского ID, извлечение структурных полей, затем face-recognition сверяет владельца со снятым селфи. Толерантен к blur, бликам, частичному перекрытию."
        },
        stack: ["Python", "Django", "Prisma", "OpenCV", "Tesseract"],
        tags: ["AI", "Computer Vision", "OCR", "KYC"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2024-03-20T18:00:08Z",
            createdAt: "2024-03-20T17:59:41Z",
            language: "Python"
        },
        lastSyncedAt: SYNCED
    },

    /* ─── Real-time systems ────────────────────────────────────── */
    {
        slug: "recursivedine-backend",
        repo: "Mhmdaris15/RecursiveDine-Backend",
        repoName: "RecursiveDine-Backend",
        private: true,
        category: "realtime",
        tagline: {
            en: "Restaurant ordering platform — Go + WebSocket kitchen broadcast",
            ru: "Платформа ресторанных заказов — Go + WebSocket трансляция на кухню"
        },
        summary: {
            en: "Go modular monolith with typed REST API, PostgreSQL transactional core, WebSocket fan-out to kitchen displays, QRIS payment integration, and Swagger-documented contracts for the frontend team.",
            ru: "Go модульный монолит: типизированный REST API, PostgreSQL transactional core, WebSocket fan-out на дисплеи кухни, интеграция QRIS-платежей, Swagger-документированные контракты для фронтенда."
        },
        stack: ["Go", "Gin", "PostgreSQL", "WebSocket", "Swagger", "Docker"],
        tags: ["Real-Time", "Production", "Restaurant", "Payments"],
        featured: true,
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2025-08-21T19:16:05Z",
            createdAt: "2025-07-07T00:08:53Z",
            language: "Go"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "live-scoring-app",
        repo: "Mhmdaris15/live-scoring-app",
        repoName: "live-scoring-app",
        private: true,
        category: "realtime",
        tagline: {
            en: "PBSI badminton tournament live scoring — 800+ concurrent spectators",
            ru: "PBSI live-счёт турнира по бадминтону — 800+ зрителей"
        },
        summary: {
            en: "Go + Gin + WebSocket scoring system that ran a live PBSI tournament. Multi-instance fan-out via Redis pub/sub, bounded send buffers, heartbeats, per-IP connection caps. Held 4% CPU on a 2-core VPS with 800 concurrent watchers.",
            ru: "Go + Gin + WebSocket система счёта, ходила на live-турнире PBSI. Multi-instance fan-out через Redis pub/sub, ограниченные send-буферы, heartbeats, лимиты на IP. 4% CPU на 2-ядерном VPS при 800 зрителях."
        },
        stack: ["Go", "Gin", "WebSocket", "Redis", "PostgreSQL"],
        tags: ["Real-Time", "Production", "Sports Tech"],
        featured: true,
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2023-07-29T17:43:22Z",
            createdAt: "2023-06-25T12:40:50Z",
            language: "Go"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "run-terminate-exe-automation",
        repo: "Mhmdaris15/Run-Terminate-Exe-Automation",
        repoName: "Run-Terminate-Exe-Automation",
        private: false,
        category: "automation",
        tagline: {
            en: "Remote process orchestration over WebSocket — Go agent",
            ru: "Удалённая оркестровка процессов через WebSocket — Go agent"
        },
        summary: {
            en: "Lightweight Go agent that exposes a WebSocket interface for starting, watching, and terminating Windows executables remotely. Used for game-server orchestration where ad-hoc EXE control beats reinventing systemd.",
            ru: "Лёгкий Go-агент, выставляющий WebSocket для удалённого запуска, наблюдения и завершения Windows-EXE. Использовался для оркестровки game-серверов, где ad-hoc EXE-контроль лучше чем реализовывать systemd."
        },
        stack: ["Go", "WebSocket", "Windows API"],
        tags: ["Automation", "Real-Time", "Game Servers"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2023-11-16T11:54:36Z",
            createdAt: "2023-11-16T11:53:29Z",
            language: "Go"
        },
        lastSyncedAt: SYNCED
    },

    /* ─── Full-stack apps ──────────────────────────────────────── */
    {
        slug: "tresno-boedoyo",
        repo: "Mhmdaris15/tresno-boedoyo",
        repoName: "tresno-boedoyo",
        private: false,
        category: "fullstack",
        tagline: {
            en: "Indonesia Heritage Society volunteer platform — AI matching + Web3",
            ru: "Платформа волонтёров Indonesia Heritage Society — AI matching + Web3"
        },
        summary: {
            en: "Microservice platform for the Indonesia Heritage Society. Volunteer-event matching via Gemini-driven preference embeddings, soulbound-token recognition on Polygon, and a mobile-first React Native client.",
            ru: "Микросервисная платформа для Indonesia Heritage Society. Matching волонтёров и событий через Gemini-эмбеддинги, soulbound-токены признания на Polygon, mobile-first React Native клиент."
        },
        stack: ["Node.js", "React", "PostgreSQL", "Gemini", "Polygon"],
        tags: ["Full-Stack", "AI", "Web3", "Social Impact"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2025-07-25T12:16:31Z",
            createdAt: "2025-07-24T19:34:38Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "jaga-wana",
        repo: "Mhmdaris15/jaga-wana",
        repoName: "jaga-wana",
        private: true,
        category: "fullstack",
        tagline: {
            en: "Indigenous land-sovereignty platform with PostGIS geo-storytelling",
            ru: "Платформа суверенитета земли коренных общин с PostGIS"
        },
        summary: {
            en: "Mobile-first platform for Indonesian Indigenous communities. Geo-story mapping via Leaflet over PostGIS, environmental incident reporting, cultural marketplace, and an end-to-end-encrypted knowledge vault.",
            ru: "Mobile-first платформа для индонезийских коренных общин. Geo-story mapping (Leaflet + PostGIS), отчёты об экологических инцидентах, культурный marketplace, шифрованное хранилище знаний."
        },
        stack: ["Next.js 15", "TypeScript", "PostGIS", "Leaflet", "Tailwind"],
        tags: ["Full-Stack", "GIS", "Social Impact"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2025-07-21T20:47:06Z",
            createdAt: "2025-07-21T20:19:34Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "permiraspb-cms",
        repo: "Mhmdaris15/permiraspb-cms",
        repoName: "permiraspb-cms",
        private: true,
        category: "fullstack",
        tagline: {
            en: "Strapi v5 headless CMS for Indonesian student association in SPB",
            ru: "Strapi v5 headless CMS для индонезийской ассоциации в СПб"
        },
        summary: {
            en: "Strapi v5 headless CMS managing articles, events, members, gallery, and FAQs for the Indonesian Student Association in Saint Petersburg. Custom roles + per-collection lifecycle hooks.",
            ru: "Strapi v5 headless CMS: статьи, события, члены, галерея, FAQ для ассоциации индонезийских студентов в Санкт-Петербурге. Кастомные роли + lifecycle hooks по коллекциям."
        },
        stack: ["Strapi v5", "Node.js", "TypeScript", "PostgreSQL"],
        tags: ["CMS", "Multi-Tenant", "Community"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2026-02-21T01:37:09Z",
            createdAt: "2026-02-20T04:00:48Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "cashier-app",
        repo: "Mhmdaris15/cashier_app",
        repoName: "cashier_app",
        private: false,
        category: "fullstack",
        tagline: {
            en: "Laravel POS — invoicing, inventory, payments",
            ru: "Laravel POS — счета, склад, платежи"
        },
        summary: {
            en: "Indonesian POS web app for small retail. Eloquent models for items / receipts / customers, daily Z-report PDFs, role-based register access, and a modular plug-in surface for new payment methods.",
            ru: "Индонезийское POS веб-приложение для небольшого retail. Eloquent-модели items/receipts/customers, daily Z-report PDF, role-based доступ к кассе, модульный plug-in для новых способов оплаты."
        },
        stack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
        tags: ["Full-Stack", "POS", "E-commerce"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2025-01-14T12:00:03Z",
            createdAt: "2024-12-21T06:47:20Z",
            language: "PHP"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "berufsvernetzen-frontend",
        repo: "Mhmdaris15/berufsvernetzen-frontend",
        repoName: "berufsvernetzen-frontend",
        private: true,
        category: "fullstack",
        tagline: {
            en: "Alumni networking & job-board for SMKN 1 Cibinong",
            ru: "Сеть выпускников и job-доска для SMKN 1 Cibinong"
        },
        summary: {
            en: "Next.js front end for an alumni-graduate networking platform. Profile graphs, job posting / discovery flow, role-based moderation, and an embedded survey instrument feeding the school's career office dashboards.",
            ru: "Next.js фронтенд для networking платформы выпускников. Графы профилей, размещение/поиск вакансий, role-based модерация, встроенный survey, кормящий дашборды career office школы."
        },
        stack: ["Next.js", "TypeScript", "Tailwind", "tRPC"],
        tags: ["Full-Stack", "Education", "Community"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2024-07-11T11:30:48Z",
            createdAt: "2024-04-08T20:09:25Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },

    /* ─── Data engineering ─────────────────────────────────────── */
    {
        slug: "analytics-engineer-assignment",
        repo: "Mhmdaris15/analytics-engineer-assignment",
        repoName: "analytics-engineer-assignment",
        private: false,
        category: "data",
        tagline: {
            en: "FastAPI mock invoice service for testing pipeline robustness",
            ru: "FastAPI mock-сервис счетов для тестирования pipeline-устойчивости"
        },
        summary: {
            en: "FastAPI service that emits invoice JSON with intentional schema drift, missing fields, and timezone inconsistencies — used as a fixture for testing data-engineering pipelines under realistic chaos.",
            ru: "FastAPI-сервис, выдающий JSON счетов с намеренным schema drift, отсутствующими полями и timezone-несостыковками — fixture для тестирования data-инженерных пайплайнов в реалистичном хаосе."
        },
        stack: ["FastAPI", "Python", "MongoDB", "Pydantic", "Docker"],
        tags: ["Data Engineering", "Testing", "Chaos Engineering"],
        metrics: {
            stars: 1, forks: 0,
            pushedAt: "2025-10-29T07:56:31Z",
            createdAt: "2025-10-29T01:58:11Z",
            language: "Python"
        },
        lastSyncedAt: SYNCED
    },

    /* ─── Automation ───────────────────────────────────────────── */
    {
        slug: "linkedin-scraping",
        repo: "Mhmdaris15/linkedin-scraping",
        repoName: "linkedin-scraping",
        private: false,
        category: "automation",
        tagline: {
            en: "LinkedIn job-data scraper in Go + Selenium",
            ru: "Скрейпер вакансий LinkedIn на Go + Selenium"
        },
        summary: {
            en: "Headless-browser LinkedIn job extractor written in Go using Selenium WebDriver. Resumable from checkpoint, throttled to avoid rate limits, structured output as JSON Lines for downstream feature engineering.",
            ru: "Headless-браузер LinkedIn extractor на Go через Selenium WebDriver. Resumable от чекпоинта, дроссельный, JSON Lines на выход для feature engineering."
        },
        stack: ["Go", "Selenium", "ChromeDriver"],
        tags: ["Automation", "Scraping", "Data Collection"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2024-05-16T02:49:22Z",
            createdAt: "2023-11-09T10:17:47Z",
            language: "Go"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "coderun-winter-challenge",
        repo: "Mhmdaris15/coderun-winter-challenge-2025",
        repoName: "coderun-winter-challenge-2025",
        private: true,
        category: "automation",
        tagline: {
            en: "DeepSeek-driven CodeRun solver with checkpoint resume",
            ru: "Решатель CodeRun на DeepSeek с resume по чекпоинту"
        },
        summary: {
            en: "Python tool that fetches programming problems from Yandex CodeRun, drives DeepSeek to draft and verify solutions, and auto-submits via Selenium. Resumable from a checkpoint store so a long run survives reboots.",
            ru: "Python-инструмент: тянет задачи Yandex CodeRun, гоняет DeepSeek для драфта и верификации решений, авто-сабмит через Selenium. Resume через checkpoint store, переживает перезагрузки."
        },
        stack: ["Python", "DeepSeek API", "Selenium", "REST"],
        tags: ["Automation", "AI", "Competition"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2025-12-10T09:48:47Z",
            createdAt: "2025-12-10T02:25:47Z",
            language: "Python"
        },
        lastSyncedAt: SYNCED
    },

    /* ─── Research / hackathons ────────────────────────────────── */
    {
        slug: "yandex-alice-fixer",
        repo: "Mhmdaris15/yandex-alice-hackaton",
        repoName: "yandex-alice-hackaton",
        private: false,
        category: "research",
        tagline: {
            en: "Yandex Alice Hackathon — AI fixer for international students (Rust)",
            ru: "Хакатон Yandex Alice — AI-фиксер для иностранных студентов (Rust)"
        },
        summary: {
            en: "Rust Axum backend + React PWA, single SurrealDB engine, Yandex AI Studio + Vision OCR + Translate + SpeechKit. Manages student bureaucracy, translates in real time, and falls back to deterministic mocks so the demo never breaks on missing keys.",
            ru: "Backend на Rust Axum + React PWA, единый движок SurrealDB, Yandex AI Studio + Vision OCR + Translate + SpeechKit. Управляет студенческой бюрократией, переводит в реальном времени и падает в детерминированные mock'и, чтобы демо не ломалось без ключей."
        },
        stack: ["Rust", "Axum", "SurrealDB", "Yandex AI", "React PWA"],
        tags: ["Hackathon", "AI", "Rust"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2026-04-20T00:00:00Z",
            createdAt: "2026-04-18T00:00:00Z",
            language: "Rust"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "permira-summer-camp-2026",
        repo: "Mhmdaris15/summercamp-permira-2026",
        repoName: "summercamp-permira-2026",
        private: false,
        category: "fullstack",
        tagline: {
            en: "Full-stack camp platform — AI host chatbot, registration, admin CMS",
            ru: "Full-stack платформа лагеря — AI-чат-бот, регистрация, админ-CMS"
        },
        summary: {
            en: "Production-grade platform for an Indonesia–Russia cultural exchange: narrative landing, Gemini host chatbot on an editable knowledge base, multi-step registration with document uploads, and a JWT-protected admin dashboard. Express 5 + SurrealDB embedded, Dockerized and Coolify-ready.",
            ru: "Production-grade платформа для культурного обмена Индонезия–Россия: нарративный лендинг, Gemini-чат-бот на редактируемой базе знаний, многошаговая регистрация с загрузкой документов и JWT-защищённый админ-дашборд. Express 5 + встроенный SurrealDB, Dockerized и Coolify-ready."
        },
        stack: ["React 19", "Express 5", "SurrealDB", "Gemini", "Docker"],
        tags: ["Full-Stack", "AI", "Production"],
        featured: true,
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2026-05-20T00:00:00Z",
            createdAt: "2026-04-25T00:00:00Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "permiraspb-landing",
        repo: "Mhmdaris15/permiraspb-landing",
        repoName: "permiraspb-landing",
        private: false,
        category: "web",
        tagline: {
            en: "PERMIRA SPB — scroll-driven editorial exhibition (live)",
            ru: "PERMIRA SPB — scroll-driven editorial экспозиция (live)"
        },
        summary: {
            en: "Editorial, trilingual, scroll-driven site for the Indonesian Students' Association in Saint Petersburg. React 19 + GSAP + Framer Motion, hand-authored design system, drifting snow, blend-mode cursor, keyboard-navigable galleries. Live at permiraspb.org.",
            ru: "Editorial, трёхъязычный, scroll-driven сайт Ассоциации индонезийских студентов в Санкт-Петербурге. React 19 + GSAP + Framer Motion, ручная дизайн-система, дрейфующий снег, blend-mode курсор, галереи с навигацией с клавиатуры. Live на permiraspb.org."
        },
        stack: ["React 19", "Vite 8", "GSAP", "Framer Motion", "TypeScript"],
        tags: ["Web", "Editorial", "Landing"],
        demo: "https://permiraspb.org",
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2026-05-07T00:00:00Z",
            createdAt: "2026-04-01T00:00:00Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },

    /* ─── Web / landing ────────────────────────────────────────── */
    {
        slug: "recursive-landing-page",
        repo: "Mhmdaris15/recursive-landing-page",
        repoName: "recursive-landing-page",
        private: false,
        category: "web",
        tagline: {
            en: "Modern responsive landing page template — Shadcn/UI, dark mode",
            ru: "Современный responsive landing — Shadcn/UI, dark mode"
        },
        summary: {
            en: "Open-source landing-page template for IT solutions companies. Shadcn/UI components, light/dark mode, comprehensive service sections, and SEO meta defaults that aren't an afterthought.",
            ru: "Open-source шаблон landing для IT-компаний. Shadcn/UI, light/dark mode, секции услуг, SEO-мета по умолчанию (не post-hoc)."
        },
        stack: ["React 18", "TypeScript", "Tailwind", "Shadcn/UI", "Vite"],
        tags: ["Landing", "Open Source", "Template"],
        demo: "https://github.com/Mhmdaris15/recursive-landing-page",
        metrics: {
            stars: 1, forks: 0,
            pushedAt: "2025-11-05T18:12:48Z",
            createdAt: "2025-09-13T19:49:23Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    },
    {
        slug: "tracepointspb",
        repo: "Mhmdaris15/tracepointspb",
        repoName: "tracepointspb",
        private: false,
        category: "web",
        tagline: {
            en: "Dark glassmorphism landing for SPB flyer-distribution startup",
            ru: "Dark glassmorphism landing для SPB flyer-стартапа"
        },
        summary: {
            en: "Bilingual marketing site for a Saint Petersburg startup offering flyer distribution + web development. Dark glassmorphism, Framer-Motion choreography, and a typed services schema generating the deck of pricing cards.",
            ru: "Bilingual маркетинговый сайт для SPB-стартапа: распространение флаеров + веб-разработка. Dark glassmorphism, Framer-Motion хореография, типизированная схема услуг генерирует pricing-карточки."
        },
        stack: ["Next.js 16", "Framer Motion", "Tailwind v4", "TypeScript"],
        tags: ["Landing", "Marketing", "Bilingual"],
        metrics: {
            stars: 0, forks: 0,
            pushedAt: "2026-04-10T06:52:54Z",
            createdAt: "2026-04-10T06:46:15Z",
            language: "TypeScript"
        },
        lastSyncedAt: SYNCED
    }
];

/* ─── Lookups ─────────────────────────────────────────────────── */

export const ghCategories: GhCategory[] = [
    "platform",
    "ai",
    "realtime",
    "fullstack",
    "data",
    "automation",
    "research",
    "web",
    "devops"
];

export const ghCategoryLabel: Record<GhCategory, { en: string; ru: string }> = {
    platform:   { en: "Platform Engineering",   ru: "Platform Engineering" },
    ai:         { en: "AI / Machine Learning",  ru: "AI / Machine Learning" },
    realtime:   { en: "Real-Time Systems",      ru: "Real-Time системы" },
    fullstack:  { en: "Full-Stack Apps",        ru: "Full-Stack приложения" },
    data:       { en: "Data Engineering",       ru: "Data Engineering" },
    automation: { en: "Automation",             ru: "Автоматизация" },
    research:   { en: "Research / Hackathons",  ru: "Research / Хакатоны" },
    web:        { en: "Web / Landing",          ru: "Web / Landing" },
    devops:     { en: "DevOps / Infrastructure", ru: "DevOps / Инфра" }
};

export const featuredGithubProjects = githubProjects.filter((p) => p.featured);

export const groupByCategory = () => {
    const map = new Map<GhCategory, GhProject[]>();
    for (const p of githubProjects) {
        if (!map.has(p.category)) map.set(p.category, []);
        map.get(p.category)!.push(p);
    }
    return Array.from(map.entries()).map(([category, items]) => ({
        category,
        items: items.sort((a, b) =>
            new Date(b.metrics.pushedAt).getTime() - new Date(a.metrics.pushedAt).getTime()
        )
    }));
};

export const totalLanguages = () => {
    const counts = new Map<string, number>();
    for (const p of githubProjects) {
        const l = p.metrics.language || "Other";
        counts.set(l, (counts.get(l) || 0) + 1);
    }
    return Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));
};
