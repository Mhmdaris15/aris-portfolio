export const config = {
    developer: {
        name: "Aris",
        fullName: "Muhammad Aris Septanugroho",
        title: "Software Engineer & Full-Stack Developer",
        description: "Software Engineer & Full-Stack Developer building modern web applications, microservices, AI/RAG systems, and data-driven solutions. Available for freelance projects."
    },
    availability: {
        open: true,
        label: "Available for Freelance Projects",
        responseTime: "Replies within 24 hours"
    },
    social: {
        github: "Mhmdaris15",
        email: "muhammadaris1945@gmail.com",
        location: "Bogor, West Java, Indonesia"
    },
    about: {
        title: "About Me",
        description: "I’m a Software Engineer and AI Systems Engineer focused on building data-driven automation, full-stack applications, and intelligent systems. My experience spans developing end-to-end systems—from data pipelines and analytics to production-grade web apps and LLM-powered tools—primarily using Python, Go, TypeScript, and modern cloud platforms. I’ve shipped real products across restaurant ordering, data analytics, real-time scoring, AI chatbots, and landing pages for clients in Indonesia, the US, and Russia. I’m currently open to freelance projects and ready to help you ship reliable software, fast."
    },
    experiences: [
        {
            position: "Data Analyst",
            company: "Demandlane",
            period: "2024 - Present",
            location: "California, MD (Remote)",
            description: "Focused on data visualization tools and improving data analytics accuracy for marketing and lead generation systems.",
            responsibilities: [
                "Building data visualization dashboards and analytics tools",
                "Improving data analytics accuracy and pipeline reliability",
                "Working with large-scale marketing and lead generation data",
                "Automating reporting workflows with Python and SQL"
            ],
            technologies: ["Python", "SQL", "Data Visualization", "Analytics", "Automation"]
        },
        {
            position: "Full Stack Developer",
            company: "Mija Company",
            period: "2023 - 2024",
            location: "Jakarta, Indonesia",
            description: "Developed a restaurant CMS and PWA using Nest.js, integrated payment gateways, and managed VPS deployment via Docker and GCP.",
            responsibilities: [
                "Building restaurant content management system and PWA",
                "Integrating payment gateways for seamless transactions",
                "Managing VPS deployment with Docker and GCP",
                "Developing RESTful APIs with Nest.js and PostgreSQL"
            ],
            technologies: ["Nest.js", "React", "Docker", "GCP", "PostgreSQL", "PWA"]
        },
        {
            position: "Software Engineer & Project Manager Intern",
            company: "Carakan Sadhana Dirgantara",
            period: "2022 - 2024",
            location: "South Jakarta, Indonesia",
            description: "Integrated games with blockchain technology, developed multiplayer architectures using WebRTC/Sockets, and led project management using Linear.",
            responsibilities: [
                "Integrating games with blockchain (Web3) technology",
                "Developing multiplayer game architectures with WebRTC and Sockets",
                "Leading project management using Linear and SCRUM methodology",
                "Training in Unreal Engine 5 at Brandoville Academy"
            ],
            technologies: ["Unreal Engine 5", "WebRTC", "Blockchain", "Golang", "Linear", "SCRUM"]
        },
        {
            position: "Game Development Instructor",
            company: "SMKN 1 Cibinong",
            period: "2023",
            location: "Bogor, Indonesia",
            description: "Delivered specialized training in Unreal Engine 5 game development to students, covering character movements, interactions, and game programming fundamentals.",
            responsibilities: [
                "Teaching Unreal Engine 5 game development",
                "Designing curriculum for game programming",
                "Mentoring students on project-based learning",
                "Implementing character movement and interaction systems"
            ],
            technologies: ["Unreal Engine 5", "C++", "Blueprint", "Game Design"]
        },
        {
            position: "Freelance Programmer",
            company: "PBSI (Badminton Association)",
            period: "2023",
            location: "Bandung, Indonesia",
            description: "Built a real-time badminton scoring and match management system using WebSockets for live updates, React.js frontend, and Golang backend.",
            responsibilities: [
                "Developing real-time scoring system with WebSockets",
                "Building match scheduling and management features",
                "Creating responsive React.js frontend interface",
                "Implementing Golang backend with high-performance API"
            ],
            technologies: ["Golang", "React.js", "WebSockets", "Real-time Systems"]
        },
        {
            position: "Head of Office & Data Science Instructor",
            company: "NEVTIK Organization",
            period: "2021 - 2023",
            location: "Bogor, Indonesia",
            description: "Managed organizational activities, developed an E-Voting application, and instructed Data Science fundamentals including building an AI-based attendance system with face recognition.",
            responsibilities: [
                "Managing organizational operations and events",
                "Developing E-Voting web application for student elections",
                "Teaching Data Science and programming fundamentals",
                "Building AI-based face recognition attendance system"
            ],
            technologies: ["Python", "TensorFlow", "OpenCV", "PHP", "MySQL", "Data Science"]
        }
    ],
    projects: [
        {
            id: 1,
            slug: "recursivedine-backend",
            title: "RecursiveDine Backend",
            category: "Full-Stack / Real-time",
            technologies: "Go, PostgreSQL, WebSocket, Swagger, Docker",
            image: "/images/project-1.webp",
            year: "2024",
            role: "Backend Lead",
            description: "Backend API for a restaurant management system featuring user authentication, table/menu management, order processing, QRIS payment integration, and WebSocket real-time kitchen updates.",
            problem: "Restaurants needed a reliable backend that could handle simultaneous orders, push real-time updates to the kitchen, and integrate with Indonesian payment rails (QRIS) without locking themselves into a single POS vendor.",
            solution: "I built a Go-based modular monolith that exposes a typed REST API, uses PostgreSQL for transactional data, and pushes order events to kitchen displays over WebSockets. Swagger keeps the contract clean for the frontend team and Docker makes deployment a single command.",
            keyFeatures: [
                "JWT-based auth with role separation (customer / cashier / kitchen / admin)",
                "Real-time order broadcast over WebSockets",
                "QRIS payment gateway integration",
                "Swagger-documented REST API",
                "Containerized for one-command deploy"
            ],
            github: "https://github.com/Mhmdaris15/RecursiveDine-Backend"
        },
        {
            id: 2,
            slug: "recursivedine-frontend",
            title: "RecursiveDine Frontend",
            category: "Full-Stack / E-commerce",
            technologies: "Next.js, TypeScript, Tailwind, TanStack Query, Radix UI",
            image: "/images/project-2.webp",
            year: "2024",
            role: "Full-Stack Developer",
            description: "Modern restaurant ordering web app with customer ordering, admin dashboard, cashier POS, and Bluetooth hardware integration.",
            problem: "A single restaurant chain needed three different surfaces — customer ordering, cashier POS, admin dashboard — without paying for three separate apps and three separate codebases.",
            solution: "I unified them into one Next.js app with role-based routing, a shared TanStack Query layer for cache consistency, and Web Bluetooth for thermal printer / receipt scanner integration directly from the browser.",
            keyFeatures: [
                "Customer ordering with QR-code table flow",
                "Cashier POS with Bluetooth receipt printing",
                "Admin dashboard with sales analytics",
                "Optimistic UI with TanStack Query",
                "Accessible Radix UI components"
            ],
            github: "https://github.com/Mhmdaris15/recursivedine-frontend"
        },
        {
            id: 3,
            slug: "tresno-boedoyo",
            title: "Tresno Boedoyo (IHS-Connect)",
            category: "Full-Stack / AI / Web3",
            technologies: "Node.js, React, PostgreSQL, Gemini API, Polygon",
            image: "/images/project-3.webp",
            year: "2024",
            role: "Full-Stack & AI Engineer",
            description: "Microservice platform for the Indonesia Heritage Society combining AI-driven volunteer matching, Web3 soulbound recognition tokens, and a mobile-first React/Node.js architecture.",
            problem: "The Indonesia Heritage Society wanted to scale volunteer programs across Indonesia but had no way to match volunteers to events by skill, no recognition system, and no auditable record of contribution.",
            solution: "I designed a microservice platform where Gemini matches volunteers to opportunities, contributions are minted as soulbound tokens on Polygon for tamper-proof recognition, and a mobile-first React UI keeps onboarding simple.",
            keyFeatures: [
                "AI-powered volunteer-to-opportunity matching",
                "Soulbound recognition tokens on Polygon",
                "Microservice architecture (Node.js)",
                "Mobile-first React frontend",
                "Verifiable on-chain contribution history"
            ],
            github: "https://github.com/Mhmdaris15/IHS-Connect"
        },
        {
            id: 4,
            slug: "jaga-wana",
            title: "Jaga Wana",
            category: "Full-Stack / Social Impact",
            technologies: "Next.js 15, TypeScript, Tailwind, Leaflet, PostGIS",
            image: "/images/project-4.webp",
            year: "2025",
            role: "Full-Stack Developer",
            description: "Mobile-first platform for Indonesian Indigenous communities with geo-story mapping, environmental incident reporting, cultural marketplace, and a secure knowledge vault.",
            problem: "Indonesian Indigenous communities lacked a digital channel to record traditional knowledge, report environmental incidents on ancestral land, and sell artisan goods directly without intermediaries.",
            solution: "Jaga Wana is a Next.js 15 app with PostGIS-backed geo-story mapping, encrypted knowledge vaults, an artisan marketplace, and offline-tolerant incident reporting designed for low-bandwidth field use.",
            keyFeatures: [
                "Geo-story map of cultural sites (Leaflet + PostGIS)",
                "Encrypted knowledge vault for sacred records",
                "Direct-to-buyer artisan marketplace",
                "Environmental incident reporting (offline-first)",
                "Mobile-first responsive UI"
            ],
            github: "https://github.com/Mhmdaris15/jaga-wana"
        },
        {
            id: 5,
            slug: "whatsapp-rag-bot",
            title: "WhatsApp RAG Bot",
            category: "AI / RAG / Automation",
            technologies: "FastAPI, ChromaDB, Gemini, WhatsApp API, JWT",
            image: "/images/project-5.webp",
            year: "2025",
            role: "AI Engineer",
            description: "FastAPI WhatsApp chatbot using Retrieval-Augmented Generation with Google Gemini, MCP architecture, and multi-turn conversational memory for Indonesian regional data.",
            problem: "Indonesian government and tourism teams wanted citizens to query regional data conversationally on WhatsApp — the channel they already use — without forcing them to install another app.",
            solution: "I built a FastAPI service that ingests regional documents into ChromaDB, retrieves relevant chunks per query, and generates grounded answers with Gemini. An MCP-style tool layer lets the bot call structured data sources mid-conversation.",
            keyFeatures: [
                "RAG pipeline (ChromaDB + Gemini) with citation",
                "MCP-style tool layer for structured queries",
                "Multi-turn conversational memory per user",
                "WhatsApp Business API integration",
                "JWT-secured admin / analytics console"
            ],
            github: "https://github.com/Mhmdaris15/whatsapp-bot-rag"
        },
        {
            id: 6,
            slug: "neuro-sync",
            title: "NEURO-SYNC Campus",
            category: "AI / IoT / Real-time",
            technologies: "React 18, Vite, TypeScript, Tailwind, Biometrics",
            image: "/images/placeholder.webp",
            year: "2025",
            role: "Frontend / AI Integration",
            description: "Hackathon project for cognitive health management with stress detection, AI-powered CBT interventions, environmental controls, and a digital twin visualization for campus wellness.",
            problem: "Universities lacked early-warning signals for student burnout and had no proactive intervention loop tied to environmental conditions like noise, lighting, and air quality.",
            solution: "NEURO-SYNC reads biometric data, detects stress patterns, and triggers either an AI-led CBT prompt or environmental adjustments (lighting / HVAC). A digital twin visualizes campus wellness in real-time for administrators.",
            keyFeatures: [
                "Stress detection from biometric streams",
                "AI-driven CBT micro-interventions",
                "Environmental control hooks (lighting / HVAC)",
                "Real-time campus digital twin",
                "Privacy-preserving aggregate dashboards"
            ],
            github: "https://github.com/Mhmdaris15/neuro-sync"
        },
        {
            id: 7,
            slug: "lisa-student-assistant",
            title: "LISA — Indonesian Student Assistant",
            category: "Full-Stack / Hackathon",
            technologies: "Go, Next.js 16, MongoDB, JWT, Zustand",
            image: "/images/placeholder.webp",
            year: "2026",
            role: "Full-Stack Developer",
            description: "Hackathon platform helping Indonesian students in St. Petersburg manage documents, reminders, a community forum, and access AI chatbot support.",
            problem: "Indonesian students in St. Petersburg juggle visa documents, university paperwork, and isolation — with information scattered across Telegram groups, embassy PDFs, and WhatsApp threads.",
            solution: "LISA centralizes document deadlines, exposes a community forum, and embeds an AI assistant trained on Indonesian-Russian student knowledge. Built with Go for the API layer and Next.js 16 for the client.",
            keyFeatures: [
                "Document tracker with deadline reminders",
                "Community forum with moderation",
                "AI assistant for visa / university questions",
                "JWT auth with Zustand state",
                "MongoDB-backed flexible content schemas"
            ],
            github: "https://github.com/Mhmdaris15/neimark-hackathon-2026"
        },
        {
            id: 8,
            slug: "tracepoint-spb",
            title: "TracePoint SPB",
            category: "Landing Page / Marketing",
            technologies: "Next.js 16, Framer Motion, Tailwind v4, TypeScript",
            image: "/images/project-1.webp",
            year: "2026",
            role: "Frontend Developer",
            description: "Dark glassmorphism landing page for a Saint Petersburg startup showcasing flyer distribution and web development services with bilingual UI and animated transitions.",
            problem: "A new SPB-based service company needed a landing site that signaled premium quality, supported Russian and English audiences, and converted on a small budget.",
            solution: "A Next.js 16 site with a dark glassmorphism aesthetic, Framer Motion micro-interactions, locale-routed bilingual copy, and a single-CTA conversion flow.",
            keyFeatures: [
                "Bilingual (RU / EN) routing",
                "Glassmorphism with Framer Motion transitions",
                "Lighthouse-optimized performance",
                "Tailwind v4 design tokens",
                "Single-CTA conversion flow"
            ],
            github: "https://github.com/Mhmdaris15/tracepointspb"
        },
        {
            id: 9,
            slug: "recursive-tech-landing",
            title: "Recursive Tech Landing",
            category: "Landing Page",
            technologies: "React 18, TypeScript, Tailwind, Shadcn/UI, Vite",
            image: "/images/project-2.webp",
            year: "2024",
            role: "Frontend Developer",
            description: "Modern, fully responsive landing page template for IT solutions companies with dark/light mode, ShadcnUI components, and comprehensive service sections.",
            problem: "IT consultancies kept asking for a flexible landing template they could rebrand quickly without losing accessibility or dark-mode support.",
            solution: "A modular React + Shadcn/UI template with theme tokens, copy slots, and pre-wired sections (hero, services, pricing, testimonials, contact).",
            keyFeatures: [
                "Dark / light mode with theme tokens",
                "Shadcn/UI accessible primitives",
                "Pre-built service / pricing / testimonial blocks",
                "Configurable from a single content file",
                "Vite-fast dev experience"
            ],
            github: "https://github.com/Mhmdaris15/recursive-landing-page"
        },
        {
            id: 10,
            slug: "localreach-spb",
            title: "LocalReach SPB",
            category: "Full-Stack / Data Scraping",
            technologies: "Python, Gradio, Apify, QR Codes",
            image: "/images/project-3.webp",
            year: "2025",
            role: "Full-Stack Developer",
            description: "Tool for searching Saint Petersburg businesses via Yandex Maps, generating tracked QR codes per business, and monitoring flyer scan analytics with a trilingual UI.",
            problem: "A flyer-distribution startup couldn't measure whether physical flyers actually drove store visits — there was no way to attribute foot traffic to specific drops.",
            solution: "LocalReach scrapes Yandex Maps for businesses, generates one tracked QR per drop, then exposes a Gradio dashboard with scan-by-day-and-location analytics.",
            keyFeatures: [
                "Yandex Maps scraping via Apify actors",
                "Per-drop tracked QR generation",
                "Scan analytics dashboard (Gradio)",
                "Trilingual UI (RU / EN / ID)",
                "JSON-backed lightweight storage"
            ],
            github: "https://github.com/Mhmdaris15/yandex-maps-scraping"
        },
        {
            id: 11,
            slug: "client-report-automation",
            title: "Client Report Automation",
            category: "Data Engineering / Automation",
            technologies: "Python, Polars, Google Drive API, AWS S3, Redshift",
            image: "/images/project-4.webp",
            year: "2025",
            role: "Data Engineer",
            description: "End-to-end pipeline that automates downloading, standardizing, and consolidating client reports from Google Drive to S3 with Polars/Parquet optimization and incremental updates.",
            problem: "Analysts at Demandlane spent hours every week downloading client report CSVs from Google Drive, normalizing schemas by hand, and re-uploading the result to Redshift.",
            solution: "An incremental Polars-based pipeline that detects new files, standardizes schemas, writes Parquet to S3, and runs idempotent COPY into Redshift — turning a half-day chore into a 5-minute scheduled job.",
            keyFeatures: [
                "Incremental file detection on Google Drive",
                "Polars-based schema standardization",
                "Parquet output to S3",
                "Idempotent Redshift COPY",
                "Slack alerts on failure"
            ],
            github: "https://github.com/Mhmdaris15/client_report_automation"
        },
        {
            id: 12,
            slug: "data-analytics-automation",
            title: "Data Analytics Automation Suite",
            category: "Data Engineering / Automation",
            technologies: "Python, Tableau API, Redshift, Google Sheets, Slack",
            image: "/images/project-5.webp",
            year: "2024",
            role: "Data Engineer",
            description: "Centralized repository of Demandlane analytics automations including Tableau extraction, email reporting, Mass Tort workflows, and RMKT daily reports with Redshift integration.",
            problem: "Analytics automations were scattered across half a dozen one-off scripts maintained by different people, with no shared logging, scheduling, or secret management.",
            solution: "I consolidated everything into a single repo with a shared utility layer, common config, structured logging, and a dispatcher that schedules each job — with Slack notifications on every run.",
            keyFeatures: [
                "Tableau extract automation",
                "Mass Tort campaign reporting",
                "RMKT daily reports to Redshift",
                "Email + Slack notification fan-out",
                "Centralized secrets and logging"
            ],
            github: "https://github.com/Mhmdaris15/data-analytics-automation"
        },
        {
            id: 13,
            slug: "analytics-engineer-api",
            title: "Analytics Engineer API",
            category: "Data Engineering",
            technologies: "FastAPI, MongoDB, Pydantic, Docker",
            image: "/images/placeholder.webp",
            year: "2025",
            role: "Backend Developer",
            description: "FastAPI mock email service generating invoice data with intentional schema drift to test data engineering skills and pipeline robustness.",
            problem: "Hiring managers had no realistic way to test data engineering candidates against the real-world chaos of inconsistent schemas, weird nulls, and fields that change format mid-month.",
            solution: "A FastAPI service that emits invoice data with controllable, deterministic schema drift — letting interviewers verify whether a candidate's pipeline survives reality, not just the happy path.",
            keyFeatures: [
                "Deterministic schema drift generator",
                "Configurable null / format chaos modes",
                "MongoDB-backed scenario history",
                "Pydantic-typed contracts",
                "Dockerized for portable interviews"
            ],
            github: "https://github.com/Mhmdaris15/analytics-engineer-api"
        },
        {
            id: 14,
            slug: "windows-command-api",
            title: "Windows Command API",
            category: "Backend / DevOps",
            technologies: "FastAPI, Python, PowerShell, Webhooks, HMAC",
            image: "/images/project-1.webp",
            year: "2025",
            role: "Backend / DevOps",
            description: "FastAPI app for executing PowerShell and CMD commands via REST with webhook support, API key auth, HMAC security, and detailed logging for Windows automation.",
            problem: "A Windows-only ops team needed to trigger PowerShell jobs remotely from CI/CD systems and webhooks, but exposing PowerShell directly is a security nightmare.",
            solution: "A locked-down FastAPI gateway: API keys, HMAC-signed webhooks, allowlisted commands, and structured audit logs — so the team gets remote automation without giving anyone shell access.",
            keyFeatures: [
                "API-key + HMAC webhook auth",
                "Allowlisted command catalog",
                "Structured audit logging",
                "Webhook fan-out to Slack",
                "Cloudflare Tunnel-friendly deploy"
            ],
            github: "https://github.com/Mhmdaris15/cloudflare-tunnel"
        },
        {
            id: 15,
            slug: "aimo-math-solver",
            title: "AIMO Math Solver",
            category: "AI / LLM",
            technologies: "vLLM, Qwen, DeepSeek-R1, Python, Kaggle",
            image: "/images/project-2.webp",
            year: "2025",
            role: "AI Engineer",
            description: "Advanced LLM solution for mathematical problem-solving using self-consistency chain-of-thought, entropy-weighted voting, and tool-integrated reasoning on vLLM inference.",
            problem: "Naïve LLM math solvers hallucinate confident wrong answers; off-the-shelf chain-of-thought isn't reliable enough for AIMO-grade problems with strict accuracy requirements.",
            solution: "A multi-sample self-consistency pipeline on vLLM, with entropy-weighted voting across DeepSeek-R1 and Qwen reasoning traces and a Python tool-execution layer for arithmetic verification.",
            keyFeatures: [
                "Self-consistency multi-sample reasoning",
                "Entropy-weighted answer voting",
                "Tool-integrated Python execution",
                "vLLM batched inference",
                "Kaggle competition harness"
            ],
            github: "https://github.com/Mhmdaris15/ai-mo-competition"
        },
        {
            id: 16,
            slug: "whatsapp-autoreply-bot",
            title: "WhatsApp Auto-Reply Chatbot",
            category: "Automation / AI",
            technologies: "Python, Selenium, Gemini API, ChromeDriver",
            image: "/images/project-3.webp",
            year: "2024",
            role: "AI / Automation Engineer",
            description: "Python chatbot for WhatsApp Web that auto-replies with Google Gemini, maintains conversation memory, and learns customer profiles for support workflows.",
            problem: "Small Indonesian SMBs use WhatsApp as their only customer channel and lose orders the moment the owner steps away. Off-the-shelf bots required Business API onboarding most couldn't get.",
            solution: "A Selenium-driven WhatsApp Web bot that wraps Gemini with per-customer memory and tone matching — runs on the owner's own laptop, no Business API needed.",
            keyFeatures: [
                "Selenium-driven WhatsApp Web automation",
                "Gemini-powered replies with tone matching",
                "Per-customer memory profiles",
                "Owner takeover hand-off",
                "No Business API required"
            ],
            github: "https://github.com/Mhmdaris15/chtbot"
        },
        {
            id: 17,
            slug: "permira-spb-cms",
            title: "PERMIRA SPB CMS",
            category: "Full-Stack / CMS",
            technologies: "Strapi v5, Node.js, TypeScript, PostgreSQL",
            image: "/images/project-4.webp",
            year: "2025",
            role: "Full-Stack Developer",
            description: "Headless CMS built with Strapi for managing the Indonesian Student Association's digital content—articles, events, members, galleries, and FAQs.",
            problem: "PERMIRA SPB had content scattered across WhatsApp, Notion, and Google Docs — making the public website constantly out of date.",
            solution: "A Strapi v5 headless CMS with role-based publishing, scheduled releases, image transformations, and a typed REST API the public site consumes directly.",
            keyFeatures: [
                "Role-based content publishing",
                "Scheduled releases",
                "Image transformation pipeline",
                "Typed REST API consumed by Next.js",
                "PostgreSQL-backed audit log"
            ],
            github: "https://github.com/Mhmdaris15/Permira-SPB"
        },
        {
            id: 18,
            slug: "erpnext-recursive",
            title: "ERPNext Recursive Deployment",
            category: "DevOps / Infrastructure",
            technologies: "Docker, Docker Compose, Frappe, ERPNext",
            image: "/images/project-5.webp",
            year: "2024",
            role: "DevOps Engineer",
            description: "Production-ready Docker configuration for deploying Frappe and ERPNext with multi-tenancy, automated backups, and operations runbooks.",
            problem: "Restaurants wanted ERPNext for inventory and HR but the official deploy story was either 'hosted' (expensive) or 'manual install' (fragile).",
            solution: "A reproducible Docker Compose stack with multi-tenant sites, daily encrypted backups to S3, and runbooks for common ops scenarios — restaurant chains can self-host predictably.",
            keyFeatures: [
                "Multi-tenant Frappe sites in one stack",
                "Daily encrypted backups to S3",
                "One-command restore",
                "Runbooks for common ops",
                "Reverse-proxy + TLS via Traefik"
            ],
            github: "https://github.com/Mhmdaris15/ERPNext-Recursive"
        },
        {
            id: 19,
            slug: "coderun-yandex-automation",
            title: "CodeRun Yandex Automation",
            category: "Automation / AI",
            technologies: "Python, DeepSeek API, Selenium, REST",
            image: "/images/placeholder.webp",
            year: "2025",
            role: "Automation Engineer",
            description: "Python automation tool that solves CodeRun Yandex programming problems using DeepSeek API with auto-submission and checkpoint resume.",
            problem: "Solving 100+ Yandex CodeRun problems by hand to qualify for a hiring track was a time sink that didn't reflect on-the-job skill.",
            solution: "A pipeline that fetches each problem, generates a solution via DeepSeek with a verification loop, and auto-submits — with checkpoint resume so a crash doesn't lose progress.",
            keyFeatures: [
                "Problem fetcher via Selenium",
                "DeepSeek-based solution generation",
                "Local verification loop",
                "Auto-submission with retries",
                "Checkpoint / resume after crash"
            ],
            github: "https://github.com/Mhmdaris15/Yandex-Winter-Code"
        },
        {
            id: 20,
            slug: "dbt-funnel-events",
            title: "dbt Funnel Web Events Model",
            category: "Data Engineering / Analytics",
            technologies: "dbt, SQL, Analytics Engineering",
            image: "/images/project-1.webp",
            year: "2024",
            role: "Analytics Engineer",
            description: "dbt SQL transformation model aggregating web event data from Yonyx, Clickfunnels, CRM, and monitoring systems into a unified funnel.",
            problem: "Marketing's funnel metrics drifted from sales' because each tool had its own definition of 'lead', 'qualified', and 'converted'.",
            solution: "A dbt project with staging, intermediate, and mart layers that harmonizes event semantics across Yonyx, Clickfunnels, the CRM, and monitoring — one source of truth, with tests and lineage.",
            keyFeatures: [
                "Layered dbt project (staging / intermediate / marts)",
                "Cross-tool event harmonization",
                "Schema and uniqueness tests",
                "Documented lineage",
                "Incremental funnel model"
            ],
            github: "https://github.com/Mhmdaris15/dbt"
        },
        {
            id: 21,
            slug: "russia-life-presentation",
            title: "Russia Daily Life Presentation",
            category: "Educational / Web",
            technologies: "React 19, TypeScript, Tailwind v4, Vite",
            image: "/images/project-2.webp",
            year: "2025",
            role: "Frontend Developer",
            description: "Interactive Toastmasters presentation comparing Western media narratives vs. reality of Russian life across 11 slides with keyboard navigation.",
            problem: "Static slide decks make boring talks. I wanted a Toastmasters speech aid that I could keyboard-drive on stage and that visualized data interactively.",
            solution: "An 11-slide React 19 presentation with keyboard navigation, animated transitions, and interactive data visualizations — deployed on GitHub Pages.",
            keyFeatures: [
                "11 slide deck with React Router",
                "Keyboard navigation (arrows / space)",
                "Animated transitions",
                "Interactive data visualizations",
                "GitHub Pages deployment"
            ],
            github: "https://github.com/Mhmdaris15/comparing-life-in-russia-presentation"
        },
        {
            id: 22,
            slug: "laravel-pos",
            title: "Laravel POS (App-Cashier)",
            category: "Full-Stack / E-commerce",
            technologies: "Laravel, PHP, MySQL",
            image: "/images/project-3.webp",
            year: "2022",
            role: "Full-Stack Developer",
            description: "Point-of-sale web application built with Laravel for transaction processing and cashier management.",
            problem: "A small retail shop needed a POS that worked on the cheap browser-only computers they already owned, with no per-seat licensing.",
            solution: "A Laravel-based POS with cashier accounts, transaction logging, daily-summary reports, and a thin browser UI that runs on anything.",
            keyFeatures: [
                "Cashier accounts with shift logs",
                "Transaction history and refund flow",
                "Daily summary reports",
                "MySQL-backed inventory",
                "Browser-only UI"
            ],
            github: "https://github.com/Mhmdaris15/app-cashier"
        },
        {
            id: 23,
            slug: "nija-ordering",
            title: "Nija Ordering System",
            category: "Full-Stack",
            technologies: "Nest.js, React, Docker, GCP, PostgreSQL",
            image: "/images/project-4.webp",
            year: "2023",
            role: "Full-Stack Developer",
            description: "Comprehensive restaurant management system for orders, menus, and payments. Features a PWA for mobile, integrated payment gateways, and Dockerized GCP deployment.",
            problem: "An Indonesian restaurant chain wanted modern QR-table ordering and online payments without giving up to a third-party platform's commission.",
            solution: "A Nest.js + React PWA with menu CMS, payment gateway integration, and a one-click Docker deploy to GCP — keeping all margin in-house.",
            keyFeatures: [
                "QR-table ordering flow",
                "Menu CMS with images",
                "Payment gateway integration",
                "Mobile PWA install",
                "GCP-hosted with Docker"
            ],
            github: ""
        },
        {
            id: 24,
            slug: "pbsi-match-management",
            title: "PBSI Match Management",
            category: "Full-Stack / Real-time",
            technologies: "Golang, React.js, WebSockets",
            image: "/images/project-5.webp",
            year: "2023",
            role: "Full-Stack Developer",
            description: "Real-time badminton match management system with live scoring via WebSockets, scheduling, bracket generation, and tournament tracking.",
            problem: "PBSI tournaments depended on whiteboard scoreboards and manual paper brackets; the audience and broadcasters had no live feed.",
            solution: "A Go-backed WebSocket scoring system with auto-generated brackets, a public spectator page, and an organizer admin — built in two weeks for a real tournament.",
            keyFeatures: [
                "WebSocket live score broadcast",
                "Auto-generated tournament brackets",
                "Public spectator page",
                "Organizer admin console",
                "Match history archive"
            ],
            github: ""
        },
        {
            id: 25,
            slug: "evoting-web-app",
            title: "E-Voting Web App",
            category: "Full-Stack",
            technologies: "PHP, Bootstrap, MySQL, jQuery",
            image: "/images/project-1.webp",
            year: "2022",
            role: "Full-Stack Developer",
            description: "Modern voting application for student council elections with secure authentication, candidate management, and real-time vote counting.",
            problem: "Paper-ballot student elections were error-prone, slow to count, and easy to dispute.",
            solution: "A PHP-based e-voting app with one-vote-per-student auth, encrypted vote storage, and a live counting dashboard — used in a real student council election.",
            keyFeatures: [
                "One-vote-per-student auth",
                "Candidate management UI",
                "Encrypted vote storage",
                "Live counting dashboard",
                "Audit log of every action"
            ],
            github: ""
        },
        {
            id: 26,
            slug: "face-recognition-attendance",
            title: "Face Recognition Attendance",
            category: "AI / ML",
            technologies: "Python, TensorFlow, OpenCV",
            image: "/images/project-2.webp",
            year: "2022",
            role: "AI Engineer",
            description: "AI-powered attendance system that detects and recognizes faces in real-time video streams for automated tracking in educational institutions.",
            problem: "Manual attendance roll-call wasted 10–15 minutes of every class period and produced unreliable records.",
            solution: "A Python + TensorFlow pipeline that detects and recognizes faces from a classroom camera, marks attendance automatically, and exports a CSV at the end of class.",
            keyFeatures: [
                "Real-time face detection (OpenCV)",
                "FaceNet-style recognition",
                "Per-class CSV export",
                "Confidence-thresholded marks",
                "Privacy-aware local storage"
            ],
            github: ""
        },
        {
            id: 27,
            slug: "kisa-promotion",
            title: "KIsA Promotion Website",
            category: "Web Development",
            technologies: "React, Firebase, Frontend",
            image: "/images/project-3.webp",
            year: "2022",
            role: "Frontend Developer",
            description: "Promotional website for Kampung Inggris Pare with modern UI/UX, Firebase data integration, and fully responsive layouts.",
            problem: "Kampung Inggris Pare's existing site was a static brochure that couldn't show real-time program info or capture leads.",
            solution: "A React site backed by Firebase for program content, lead capture, and analytics — easy enough for non-technical staff to update.",
            keyFeatures: [
                "Firebase-backed program content",
                "Lead capture form",
                "Mobile-responsive layout",
                "Modern UI/UX",
                "Analytics integration"
            ],
            github: ""
        },
        {
            id: 28,
            slug: "data-science-competitions",
            title: "Data Science Competition Wins",
            category: "Data Science / ML",
            technologies: "Python, Pandas, Scikit-learn, TensorFlow, NLP",
            image: "/images/project-4.webp",
            year: "2023",
            role: "Data Scientist",
            description: "Award-winning data science projects from KKSI and LKS competitions—time series for currency prediction, sentiment analysis, and face recognition. 1st place at LKS Data Science West Java 2023.",
            problem: "Competition problems demanded production-grade solutions in 24-48 hour windows: clean data, train, validate, deploy a demo, and present.",
            solution: "Repeatable competition harness covering EDA, feature engineering, baseline + boosted models, and a reproducible notebook — won 1st place at LKS West Java 2023.",
            keyFeatures: [
                "Currency time-series forecasting",
                "Tweet sentiment classification",
                "Face recognition demo",
                "Reproducible notebook harness",
                "1st Place — LKS Data Science West Java 2023"
            ],
            github: ""
        },
        {
            id: 29,
            slug: "nike-landing-page",
            title: "Nike Landing Page",
            category: "Landing Page",
            technologies: "React.js, Tailwind CSS, Vite",
            image: "/images/project-5.webp",
            year: "2024",
            role: "Frontend Developer",
            description: "Nike-style product showcase built with Tailwind CSS featuring product highlights, testimonials, and responsive design patterns.",
            problem: "I wanted a portfolio piece that showed I could match a global brand's visual language and ship a polished marketing page.",
            solution: "A Nike-styled React + Tailwind landing with product sections, testimonials, and motion that mirrors the real Nike site — a teaching reference for clean Tailwind patterns.",
            keyFeatures: [
                "Brand-faithful Nike visual language",
                "Tailwind utility patterns",
                "Smooth section reveals",
                "Mobile-first responsive",
                "Vite-fast bundle"
            ],
            github: "https://github.com/Mhmdaris15/nike_landing_page"
        },
        {
            id: 30,
            slug: "stifin-landing-page",
            title: "STIFIn Test Landing Page",
            category: "Landing Page",
            technologies: "React.js, HTML, CSS, JavaScript",
            image: "/images/placeholder.webp",
            year: "2023",
            role: "Frontend Developer",
            description: "Educational landing page promoting the STIFIn Test platform with pricing, features, and contact sections.",
            problem: "STIFIn needed a conversion-focused page with clear pricing tiers and a low-friction contact form.",
            solution: "A React landing with hero, features, pricing tiers, FAQ, and a contact section that funnels every CTA to a single inquiry endpoint.",
            keyFeatures: [
                "Hero with single-CTA",
                "Pricing tier comparison",
                "FAQ accordion",
                "Inquiry form",
                "Mobile responsive"
            ],
            github: "https://github.com/Mhmdaris15/STIFIn-Landing-Page"
        }
    ],
    services: [
        {
            id: "landing",
            title: "Landing Page",
            tagline: "Marketing Site",
            icon: "rocket",
            popular: false,
            priceFrom: "$300",
            timeline: "1–2 weeks",
            description: "Modern, responsive landing pages and marketing sites with animations, SEO optimization, and analytics integration.",
            includes: ["Custom design", "Responsive (mobile-first)", "SEO meta tags", "Contact form", "Analytics setup"],
            stack: ["Next.js", "React", "Tailwind", "Framer Motion"]
        },
        {
            id: "fullstack",
            title: "Full-Stack MVP",
            tagline: "Most Popular",
            icon: "stack",
            popular: true,
            priceFrom: "$1,500",
            timeline: "3–6 weeks",
            description: "Production-ready MVPs with auth, database, dashboards, and deployment. Ideal for startups validating product-market fit.",
            includes: ["Auth & user management", "Database schema", "Admin dashboard", "REST API", "Docker deployment"],
            stack: ["Next.js", "Go", "Node.js", "PostgreSQL", "Docker"]
        },
        {
            id: "ai",
            title: "AI / RAG Chatbot",
            tagline: "LLM Integration",
            icon: "ai",
            popular: false,
            priceFrom: "$800",
            timeline: "2–4 weeks",
            description: "LLM-powered chatbots and RAG pipelines integrated into your product or messaging channels (WhatsApp, web, Slack).",
            includes: ["Vector DB setup", "RAG pipeline", "LLM integration", "Conversational memory", "Channel integration"],
            stack: ["Python", "FastAPI", "Gemini", "ChromaDB", "LangChain"]
        },
        {
            id: "data",
            title: "Data Automation",
            tagline: "Analytics & ETL",
            icon: "data",
            popular: false,
            priceFrom: "$500",
            timeline: "1–3 weeks",
            description: "Automated reporting, ETL pipelines, dashboards, and scraping. Connect Google Drive, S3, Redshift, Tableau, Sheets, and more.",
            includes: ["ETL pipeline", "Scheduled automation", "Dashboard / report", "Data quality checks"],
            stack: ["Python", "dbt", "SQL", "Polars", "AWS"]
        },
        {
            id: "realtime",
            title: "Real-time Systems",
            tagline: "Live & Multiplayer",
            icon: "bolt",
            popular: false,
            priceFrom: "$1,200",
            timeline: "2–5 weeks",
            description: "WebSocket-based live systems—scoring, dashboards, multiplayer, collaborative tools, live order tracking.",
            includes: ["WebSocket server", "Live UI updates", "Scalable architecture", "Load testing"],
            stack: ["Go", "Node.js", "Socket.io", "Redis", "React"]
        }
    ],
    contact: {
        email: "muhammadaris1945@gmail.com",
        whatsapp: "+6285814045755",
        whatsappLink: "https://wa.me/6285814045755?text=Hi%20Aris%2C%20I%27d%20like%20to%20discuss%20a%20project",
        telegram: "@irazkisra",
        telegramLink: "https://t.me/irazkisra",
        github: "https://github.com/Mhmdaris15",
        linkedin: "https://www.linkedin.com/in/muhammad-aris-septanugroho/",
        kaggle: "https://www.kaggle.com/Mhmdaris15"
    },
    skills: {
        develop: {
            title: "SOFTWARE ENGINEER",
            description: "Building scalable backend systems & full-stack applications",
            details: "Developing high-performance web applications and microservices using Golang, Python, Node.js, and modern frameworks. Specializing in RESTful APIs, real-time systems with WebSockets, containerized deployments with Docker, and CI/CD pipelines.",
            tools: ["Golang", "Python", "Node.js", "Nest.js", "React", "Next.js", "Docker", "Kubernetes", "GCP", "WebSockets"]
        },
        design: {
            title: "DATA SCIENCE & AI",
            description: "Machine learning, data analytics & intelligent systems",
            details: "Building data-driven solutions with Python, TensorFlow, and modern ML frameworks. Experience in face recognition, time series analysis, sentiment analysis, RAG pipelines, and LLM integration. Award-winning data science competitor.",
            tools: ["TensorFlow", "OpenCV", "Scikit-learn", "Pandas", "Python", "NLP", "RAG", "Gemini", "vLLM", "ChromaDB"]
        }
    }
};

export type Project = typeof config.projects[number];
