export interface ResumeExperience {
    company: string;
    role: string;
    period: string;
    location: string;
    bullets: string[];
    stack: string[];
}

export interface ResumeProject {
    title: string;
    note?: string;
    description: string;
}

export interface ResumeSkillGroup {
    label: string;
    items: string[];
}

export interface ResumeService {
    title: string;
    priceFrom: string;
    timeline: string;
}

export interface ResumeEducation {
    institution: string;
    program: string;
    period?: string;
    location?: string;
    notes?: string[];
}

export interface ResumeData {
    name: string;
    headline: string;
    location: string;
    remoteOpen: boolean;
    email: string;
    phone: string;
    whatsapp: string;
    github: string;
    githubUrl: string;
    linkedin: string;
    linkedinUrl: string;
    portfolio: string;
    portfolioUrl: string;
    summary: string;
    openTo: string;
    impact: string[];
    experiences: ResumeExperience[];
    projects: ResumeProject[];
    skillGroups: ResumeSkillGroup[];
    services: ResumeService[];
    education: ResumeEducation[];
    awards: string[];
    certifications: string[];
    languages: { name: string; level: string }[];
    beyond: string[];
    lastUpdated: string;
}

export const resume: ResumeData = {
    name: "Muhammad Aris Septanugroho",
    headline: "AI Systems Engineer · Full-Stack Developer · Data Engineer",
    location: "Saint Petersburg, Russia (ITMO University)",
    remoteOpen: true,
    email: "muhammadaris1945@gmail.com",
    phone: "+7 981 040 9453",
    whatsapp: "+62 858 1404 5755",
    github: "Mhmdaris15",
    githubUrl: "https://github.com/Mhmdaris15",
    linkedin: "muhammad-aris-septanugroho",
    linkedinUrl: "https://www.linkedin.com/in/muhammad-aris-septanugroho/",
    portfolio: "aris-portfolio.vercel.app",
    portfolioUrl: "https://aris-portfolio.vercel.app",
    summary:
        "AI Systems Engineer with 3+ years shipping production data, automation, and AI systems end-to-end. I architect ETL pipelines on AWS Redshift, deploy machine-learning models that drive revenue, and build LLM-powered applications including RAG pipelines, AI agents, and analytics copilots. I bridge data engineering, ML, and backend engineering — turning ambiguous business problems into measurable, reliable software.",
    openTo:
        "Currently open to senior engineering roles (AI / Data / Full-Stack) and freelance engagements. Reply within 24 hours.",
    impact: [
        "Cut model retraining time from ~6 hours to ~1 hour via parallelization",
        "Migrated production analytics from Google Sheets to AWS Redshift, unlocking 10x scalability",
        "Built and operates 10+ production automation systems for client reporting",
        "1st Place — LKS Data Science West Java 2023",
        "Shipped WhatsApp RAG bots, restaurant ordering platforms, and live tournament scoring — all in production"
    ],
    experiences: [
        {
            company: "Demandlane (Performek Inc.)",
            role: "Data Scientist / Analytics Engineer",
            period: "April 2024 – March 2026",
            location: "Remote",
            bullets: [
                "Designed and shipped end-to-end data pipelines (API → processing → Redshift → Tableau) powering daily revenue and lead-quality decisions",
                "Built and deployed production ML models (propensity, decision trees, gradient boosting) for lead optimization and performance attribution",
                "Led migration of analytics infrastructure from Google Sheets to AWS Redshift, improving query performance and pipeline reliability",
                "Operate 10+ production automation systems powering client reporting; transitioned the stack from AppScript to Python + n8n for maintainability",
                "Integrated external data sources (Yonyx API, NumberVerifier, OnScript) into unified pipelines used company-wide",
                "Reduced model retraining time from ~6 hours to ~1 hour through parallelization",
                "Designed trigger-based scheduling on virtual machines with Slack alerts, retry logic, and dbt failure tracking",
                "Shipped Tableau dashboards for lead analytics, call performance, and revenue tracking — adopted by Ads, RevOps, and Product Ops",
                "Reviewed and interviewed Data Science candidates; mentored junior engineers"
            ],
            stack: [
                "Python",
                "SQL",
                "AWS Redshift",
                "dbt",
                "Tableau",
                "n8n",
                "Scikit-learn",
                "XGBoost",
                "CatBoost",
                "Slack API"
            ]
        },
        {
            company: "Mija Company",
            role: "Full-Stack Developer",
            period: "November 2023 – May 2024",
            location: "Jakarta, Indonesia",
            bullets: [
                "Architected a restaurant CMS + Progressive Web App covering menus, reservations, and payments",
                "Built backend microservices in Node.js (NestJS) with REST APIs and PostgreSQL",
                "Integrated payment gateways for live transactions",
                "Deployed services with Docker on Google Cloud Run",
                "Designed scalable system architecture coordinating frontend, backend, and ops"
            ],
            stack: ["NestJS", "React", "PostgreSQL", "Docker", "Google Cloud Run", "PWA"]
        },
        {
            company: "PBSI (Indonesian Badminton Association)",
            role: "Backend Developer (Freelance)",
            period: "July 2023 – October 2023",
            location: "Bandung, Indonesia",
            bullets: [
                "Built a real-time tournament scoring system with WebSockets in Golang (Gin) — used live during PBSI tournaments",
                "Designed RESTful APIs for match management, scheduling, and player registration",
                "Implemented React frontend for referees and broadcasters",
                "Engineered real-time data updates, bracket generation, and result archiving"
            ],
            stack: ["Golang", "Gin", "WebSockets", "React", "PostgreSQL"]
        }
    ],
    projects: [
        {
            title: "AI Analytics Copilot",
            note: "In Progress",
            description:
                "LLM + RAG system that lets non-technical users query business data in plain English. SQL agent for automated query generation, FAISS / Weaviate vector retrieval, FastAPI backend, and a self-correcting query loop based on execution feedback."
        },
        {
            title: "WhatsApp RAG Bot",
            description:
                "Production FastAPI service: retrieves regional Indonesian data via ChromaDB, generates grounded responses with Google Gemini, supports MCP-style tool calls and multi-turn memory. Live on WhatsApp Business API."
        },
        {
            title: "RecursiveDine — Full-Stack Restaurant Platform",
            description:
                "Go backend with WebSocket kitchen broadcast + QRIS payments + Swagger contract; Next.js frontend with admin / cashier / customer surfaces and Bluetooth receipt printing."
        },
        {
            title: "PBSI Live Scoring",
            description:
                "Go + WebSocket real-time scoring; held steady at 4% CPU during a live tournament with 800+ concurrent spectators."
        },
        {
            title: "Client Report Automation (Demandlane)",
            description:
                "Polars / Parquet pipeline replacing a 14-minute, 11GB Pandas job with a 38-second, 800MB version. Idempotent Redshift loads with Slack alerting."
        }
    ],
    skillGroups: [
        {
            label: "Languages",
            items: ["Python", "SQL", "Golang", "TypeScript", "JavaScript"]
        },
        {
            label: "AI / ML",
            items: [
                "LLMs (Gemini, OpenAI, DeepSeek, Qwen)",
                "RAG",
                "ChromaDB",
                "FAISS",
                "pgvector",
                "Scikit-learn",
                "XGBoost",
                "CatBoost",
                "vLLM",
                "Prompt Engineering",
                "MCP"
            ]
        },
        {
            label: "Data Engineering",
            items: [
                "AWS Redshift",
                "dbt",
                "ETL Pipelines",
                "Polars",
                "Pandas",
                "Tableau",
                "API Integration",
                "Data Modeling"
            ]
        },
        {
            label: "Backend & Web",
            items: [
                "FastAPI",
                "Flask",
                "NestJS",
                "Node.js",
                "Next.js",
                "React",
                "WebSockets",
                "REST APIs"
            ]
        },
        {
            label: "DevOps & Cloud",
            items: [
                "Docker",
                "Google Cloud Run",
                "AWS",
                "Cloudflare Tunnel",
                "CI/CD",
                "VM Deployment",
                "Monitoring & Alerting"
            ]
        },
        {
            label: "Automation",
            items: ["n8n", "Workflow Automation", "Scheduler Systems", "Selenium", "Webhooks"]
        }
    ],
    services: [
        { title: "Landing Pages & Marketing Sites", priceFrom: "$300", timeline: "1–2 weeks" },
        { title: "Full-Stack MVPs", priceFrom: "$1,500", timeline: "3–6 weeks" },
        { title: "AI / RAG Chatbot Integration", priceFrom: "$800", timeline: "2–4 weeks" },
        { title: "Data Analytics & Automation", priceFrom: "$500", timeline: "1–3 weeks" },
        { title: "Real-time Systems", priceFrom: "$1,200", timeline: "2–5 weeks" }
    ],
    education: [
        {
            institution: "ITMO University",
            program: "Neurotechnology and Programming",
            period: "In Progress",
            location: "Saint Petersburg, Russia"
        },
        {
            institution: "SMKN 1 Cibinong",
            program: "Informatics, Networking and Applications",
            period: "Graduated 2024",
            notes: ["Best Student (Top 1, Semesters 1–4)"]
        }
    ],
    awards: [
        "🥇 1st Place — LKS Data Science West Java 2023",
        "🥇 1st Place — NEVTIK Academy Selection",
        "🥈 2nd Place — KKSI Data Science 2021"
    ],
    certifications: [
        "CompTIA Linux+",
        "Python Programming — Python Institute",
        "TOEIC: 740",
        "React JS Bootcamp — Jabar Coding Camp",
        "Unreal Engine 5 Training — Brandoville Academy",
        "Kaggle Data Science Tracks"
    ],
    languages: [
        { name: "Indonesian", level: "Native" },
        { name: "English", level: "B2 (Professional Working Proficiency)" },
        { name: "Russian", level: "A1–A2 (Active study)" },
        { name: "German", level: "A1" }
    ],
    beyond: [
        "Mentored junior engineers and conducted technical interviews at Demandlane",
        "Authored internal architecture documentation and runbooks",
        "Active competitive data scientist on Kaggle (@Mhmdaris15)",
        "Writes about software engineering and AI on the blog"
    ],
    lastUpdated: "May 2026"
};
