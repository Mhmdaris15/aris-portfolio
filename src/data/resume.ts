type Bilingual<T> = { en: T; ru: T };

export interface ResumeExperience {
    company: string;
    role: Bilingual<string>;
    period: Bilingual<string>;
    location: Bilingual<string>;
    bullets: Bilingual<string[]>;
    stack: string[];
}

export interface ResumeProject {
    title: Bilingual<string>;
    note?: Bilingual<string>;
    description: Bilingual<string>;
}

export interface ResumeSkillGroup {
    label: Bilingual<string>;
    items: string[];
}

export interface ResumeService {
    title: Bilingual<string>;
    priceFromUsd: string;
    priceFromRub: string;
    timeline: Bilingual<string>;
}

export interface ResumeEducation {
    institution: string;
    program: Bilingual<string>;
    period?: Bilingual<string>;
    location?: Bilingual<string>;
    notes?: Bilingual<string[]>;
}

export interface ResumeData {
    name: Bilingual<string>;
    headline: Bilingual<string>;
    location: Bilingual<string>;
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
    summary: Bilingual<string>;
    openTo: Bilingual<string>;
    impact: Bilingual<string[]>;
    experiences: ResumeExperience[];
    projects: ResumeProject[];
    skillGroups: ResumeSkillGroup[];
    services: ResumeService[];
    education: ResumeEducation[];
    awards: Bilingual<string[]>;
    certifications: Bilingual<string[]>;
    languages: { name: Bilingual<string>; level: Bilingual<string> }[];
    beyond: Bilingual<string[]>;
    lastUpdated: Bilingual<string>;
}

export const resume: ResumeData = {
    name: {
        en: "Muhammad Aris Septanugroho",
        ru: "Мухаммад Арис Септанугрохо"
    },
    headline: {
        en: "Systems & AI Engineer · Reads source code · Designs systems before writing them",
        ru: "Systems & AI Engineer · Читаю исходники · Проектирую системы до того, как писать код"
    },
    location: {
        en: "Saint Petersburg, Russia (ITMO University)",
        ru: "Санкт-Петербург, Россия (Университет ИТМО)"
    },
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
    summary: {
        en: "Systems Engineer who treats system design as a first-class skill. I read source code (Postgres, Frappe, vLLM, ChromaDB, Lenis, Anthropic SDKs) to understand how good systems are actually built — then apply that lens to data pipelines, real-time platforms, LLM/RAG systems, and full-stack apps in production. Comfortable across Go, Python, and TypeScript; equally comfortable choosing the boring stack when it's the right call. Active hackathon competitor, technical mentor, and writer about engineering.",
        ru: "Systems Engineer, который относится к system design как к first-class навыку. Читаю исходники (Postgres, Frappe, vLLM, ChromaDB, Lenis, Anthropic SDK), чтобы понимать, как реально устроены хорошие системы — и применяю этот взгляд к data-пайплайнам, real-time платформам, LLM/RAG-системам и full-stack приложениям в продакшене. Уверенно работаю на Go, Python и TypeScript; так же уверенно выбираю скучный стек, когда это правильно. Активный участник хакатонов, технический ментор, пишу про инженерию."
    },
    openTo: {
        en: "Currently open to senior engineering roles (Systems / AI / Data / Full-Stack) and freelance engagements. Especially interested in problems where system design matters — distributed services, real-time platforms, LLM infrastructure. Reply within 24 hours.",
        ru: "Сейчас открыт к senior-позициям (Systems / AI / Data / Full-Stack) и фриланс-проектам. Особенно интересны задачи, где system design имеет значение — распределённые сервисы, real-time платформы, LLM-инфраструктура. Отвечаю в течение 24 часов."
    },
    impact: {
        en: [
            "Designed multi-instance WebSocket scoring system that held 4% CPU on a 2-core VPS for 800+ live spectators",
            "Migrated production analytics from Sheets to AWS Redshift with idempotent loads and dbt-tested marts (~10x scale)",
            "Cut ML retraining latency from ~6h to ~1h via parallelized scheduling and warm-cache reuse",
            "Built RAG production stack — ChromaDB + Gemini + MCP-style tools — live on WhatsApp Business API",
            "1st Place — LKS Data Science West Java 2023; active hackathon competitor across Indonesia and Russia"
        ],
        ru: [
            "Спроектировал multi-instance WebSocket систему счёта: 4% CPU на 2-ядерном VPS при 800+ live-зрителях",
            "Перевёл production-аналитику с Sheets на AWS Redshift с идемпотентными загрузками и dbt-тестами (~10x масштаб)",
            "Сократил latency ML-переобучения с ~6ч до ~1ч через параллельное планирование и тёплый кэш",
            "Построил production RAG-стек — ChromaDB + Gemini + MCP-инструменты — живой на WhatsApp Business API",
            "1 место — LKS Data Science Западная Ява 2023; активный участник хакатонов Индонезии и России"
        ]
    },
    experiences: [
        {
            company: "Demandlane (Performek Inc.)",
            role: {
                en: "Data Scientist / Analytics Engineer",
                ru: "Data Scientist / Analytics Engineer"
            },
            period: {
                en: "April 2024 – March 2026",
                ru: "Апрель 2024 — Март 2026"
            },
            location: { en: "Remote", ru: "Удалённо" },
            bullets: {
                en: [
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
                ru: [
                    "Спроектировал и запустил сквозные data-пайплайны (API → обработка → Redshift → Tableau), на которых ежедневно принимаются решения по выручке и качеству лидов",
                    "Построил и развернул production ML-модели (propensity, деревья решений, градиентный бустинг) для оптимизации лидов и атрибуции",
                    "Возглавил миграцию аналитической инфраструктуры с Google Sheets на AWS Redshift — улучшил скорость запросов и надёжность пайплайнов",
                    "Сопровождаю 10+ production-автоматизаций клиентской отчётности; перевёл стек с AppScript на Python + n8n",
                    "Интегрировал внешние источники данных (Yonyx API, NumberVerifier, OnScript) в единые пайплайны компании",
                    "Сократил время переобучения моделей с ~6 часов до ~1 часа через параллелизацию",
                    "Спроектировал триггер-расписание на VM со Slack-уведомлениями, retry и трекингом ошибок dbt",
                    "Запустил Tableau-дашборды по аналитике лидов, качеству звонков и выручке — приняли в Ads, RevOps и Product Ops",
                    "Проверял и интервьюировал кандидатов в Data Science; менторил junior-инженеров"
                ]
            },
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
            role: {
                en: "Full-Stack Developer",
                ru: "Full-Stack разработчик"
            },
            period: {
                en: "November 2023 – May 2024",
                ru: "Ноябрь 2023 — Май 2024"
            },
            location: { en: "Jakarta, Indonesia", ru: "Джакарта, Индонезия" },
            bullets: {
                en: [
                    "Architected a restaurant CMS + Progressive Web App covering menus, reservations, and payments",
                    "Built backend microservices in Node.js (NestJS) with REST APIs and PostgreSQL",
                    "Integrated payment gateways for live transactions",
                    "Deployed services with Docker on Google Cloud Run",
                    "Designed scalable system architecture coordinating frontend, backend, and ops"
                ],
                ru: [
                    "Спроектировал CMS и PWA для ресторана: меню, бронирования, платежи",
                    "Построил backend-микросервисы на Node.js (NestJS) с REST API и PostgreSQL",
                    "Интегрировал платёжные шлюзы для боевых транзакций",
                    "Развернул сервисы через Docker на Google Cloud Run",
                    "Спроектировал масштабируемую архитектуру: frontend, backend и ops"
                ]
            },
            stack: ["NestJS", "React", "PostgreSQL", "Docker", "Google Cloud Run", "PWA"]
        },
        {
            company: "PBSI (Indonesian Badminton Association)",
            role: {
                en: "Backend Developer (Freelance)",
                ru: "Backend-разработчик (фриланс)"
            },
            period: {
                en: "July 2023 – October 2023",
                ru: "Июль 2023 — Октябрь 2023"
            },
            location: { en: "Bandung, Indonesia", ru: "Бандунг, Индонезия" },
            bullets: {
                en: [
                    "Built a real-time tournament scoring system with WebSockets in Golang (Gin) — used live during PBSI tournaments",
                    "Designed RESTful APIs for match management, scheduling, and player registration",
                    "Implemented React frontend for referees and broadcasters",
                    "Engineered real-time data updates, bracket generation, and result archiving"
                ],
                ru: [
                    "Построил real-time систему счёта на WebSocket в Golang (Gin) — использовалась в живых турнирах PBSI",
                    "Спроектировал REST API для матчей, расписания и регистрации игроков",
                    "Сделал React-интерфейс для судей и комментаторов",
                    "Реализовал real-time обновления, генерацию сеток и архив результатов"
                ]
            },
            stack: ["Golang", "Gin", "WebSockets", "React", "PostgreSQL"]
        }
    ],
    projects: [
        {
            title: {
                en: "AI Analytics Copilot",
                ru: "AI Analytics Copilot"
            },
            note: { en: "In Progress", ru: "В работе" },
            description: {
                en: "LLM + RAG system that lets non-technical users query business data in plain English. SQL agent for automated query generation, FAISS / Weaviate vector retrieval, FastAPI backend, and a self-correcting query loop based on execution feedback.",
                ru: "LLM + RAG система: нетехнические пользователи задают вопросы по бизнес-данным на естественном языке. SQL-агент автогенерации запросов, векторный поиск FAISS / Weaviate, FastAPI-backend и self-correcting цикл запросов на основе фидбэка от выполнения."
            }
        },
        {
            title: { en: "WhatsApp RAG Bot", ru: "WhatsApp RAG-бот" },
            description: {
                en: "Production FastAPI service: retrieves regional Indonesian data via ChromaDB, generates grounded responses with Google Gemini, supports MCP-style tool calls and multi-turn memory. Live on WhatsApp Business API.",
                ru: "Production FastAPI-сервис: достаёт региональные индонезийские данные из ChromaDB, генерирует обоснованные ответы через Google Gemini, поддерживает MCP-инструменты и многоходовую память. Боевой на WhatsApp Business API."
            }
        },
        {
            title: {
                en: "RecursiveDine — Full-Stack Restaurant Platform",
                ru: "RecursiveDine — full-stack ресторанная платформа"
            },
            description: {
                en: "Go backend with WebSocket kitchen broadcast + QRIS payments + Swagger contract; Next.js frontend with admin / cashier / customer surfaces and Bluetooth receipt printing.",
                ru: "Backend на Go: трансляция на кухню по WebSocket, платежи QRIS, контракт через Swagger. Next.js-фронтенд: админка / кассир / клиент и Bluetooth-печать чеков."
            }
        },
        {
            title: { en: "PBSI Live Scoring", ru: "PBSI Live Scoring" },
            description: {
                en: "Go + WebSocket real-time scoring; held steady at 4% CPU during a live tournament with 800+ concurrent spectators.",
                ru: "Real-time счёт на Go + WebSocket: на живом турнире держал 4% CPU при 800+ одновременных зрителях."
            }
        },
        {
            title: {
                en: "Client Report Automation (Demandlane)",
                ru: "Автоматизация клиентских отчётов (Demandlane)"
            },
            description: {
                en: "Polars / Parquet pipeline replacing a 14-minute, 11GB Pandas job with a 38-second, 800MB version. Idempotent Redshift loads with Slack alerting.",
                ru: "Пайплайн на Polars / Parquet: вместо Pandas-задачи на 14 минут и 11 ГБ — 38 секунд и 800 МБ. Идемпотентные загрузки в Redshift и Slack-уведомления."
            }
        }
    ],
    skillGroups: [
        {
            label: { en: "Languages", ru: "Языки программирования" },
            items: ["Python", "SQL", "Golang", "TypeScript", "JavaScript"]
        },
        {
            label: { en: "AI / ML", ru: "AI / ML" },
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
            label: { en: "Data Engineering", ru: "Data Engineering" },
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
            label: { en: "Backend & Web", ru: "Backend и Web" },
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
            label: { en: "DevOps & Cloud", ru: "DevOps и Cloud" },
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
            label: { en: "Automation", ru: "Автоматизация" },
            items: ["n8n", "Workflow Automation", "Scheduler Systems", "Selenium", "Webhooks"]
        }
    ],
    services: [
        {
            title: {
                en: "Landing Pages & Marketing Sites",
                ru: "Лендинги и маркетинговые сайты"
            },
            priceFromUsd: "$300",
            priceFromRub: "₽25 000",
            timeline: { en: "1–2 weeks", ru: "1–2 недели" }
        },
        {
            title: { en: "Full-Stack MVPs", ru: "Full-Stack MVP" },
            priceFromUsd: "$1,500",
            priceFromRub: "₽135 000",
            timeline: { en: "3–6 weeks", ru: "3–6 недель" }
        },
        {
            title: {
                en: "AI / RAG Chatbot Integration",
                ru: "AI / RAG чат-бот"
            },
            priceFromUsd: "$800",
            priceFromRub: "₽70 000",
            timeline: { en: "2–4 weeks", ru: "2–4 недели" }
        },
        {
            title: {
                en: "Data Analytics & Automation",
                ru: "Аналитика и автоматизация данных"
            },
            priceFromUsd: "$500",
            priceFromRub: "₽45 000",
            timeline: { en: "1–3 weeks", ru: "1–3 недели" }
        },
        {
            title: { en: "Real-time Systems", ru: "Real-time системы" },
            priceFromUsd: "$1,200",
            priceFromRub: "₽110 000",
            timeline: { en: "2–5 weeks", ru: "2–5 недель" }
        }
    ],
    education: [
        {
            institution: "ITMO University",
            program: {
                en: "Neurotechnology and Programming",
                ru: "Нейротехнологии и программирование"
            },
            period: { en: "In Progress", ru: "В процессе" },
            location: {
                en: "Saint Petersburg, Russia",
                ru: "Санкт-Петербург, Россия"
            }
        },
        {
            institution: "SMKN 1 Cibinong",
            program: {
                en: "Informatics, Networking and Applications",
                ru: "Информатика, сети и приложения"
            },
            period: { en: "Graduated 2024", ru: "Окончил в 2024" },
            notes: {
                en: ["Best Student (Top 1, Semesters 1–4)"],
                ru: ["Лучший студент (1-е место, семестры 1–4)"]
            }
        }
    ],
    awards: {
        en: [
            "🥇 1st Place — LKS Data Science West Java 2023",
            "🥇 1st Place — NEVTIK Academy Selection",
            "🥈 2nd Place — KKSI Data Science 2021"
        ],
        ru: [
            "🥇 1 место — LKS Data Science Западная Ява 2023",
            "🥇 1 место — Отбор NEVTIK Academy",
            "🥈 2 место — KKSI Data Science 2021"
        ]
    },
    certifications: {
        en: [
            "CompTIA Linux+",
            "Python Programming — Python Institute",
            "TOEIC: 740",
            "React JS Bootcamp — Jabar Coding Camp",
            "Unreal Engine 5 Training — Brandoville Academy",
            "Kaggle Data Science Tracks"
        ],
        ru: [
            "CompTIA Linux+",
            "Python Programming — Python Institute",
            "TOEIC: 740",
            "React JS Bootcamp — Jabar Coding Camp",
            "Тренинг Unreal Engine 5 — Brandoville Academy",
            "Kaggle Data Science Tracks"
        ]
    },
    languages: [
        {
            name: { en: "Indonesian", ru: "Индонезийский" },
            level: { en: "Native", ru: "Родной" }
        },
        {
            name: { en: "English", ru: "Английский" },
            level: {
                en: "B2 (Professional Working Proficiency)",
                ru: "B2 (свободный рабочий)"
            }
        },
        {
            name: { en: "Russian", ru: "Русский" },
            level: { en: "A1–A2 (Active study)", ru: "A1–A2 (активно учу)" }
        },
        {
            name: { en: "German", ru: "Немецкий" },
            level: { en: "A1", ru: "A1" }
        }
    ],
    beyond: {
        en: [
            "Mentored junior engineers and conducted technical interviews at Demandlane",
            "Authored internal architecture documentation and runbooks",
            "Active competitive data scientist on Kaggle (@Mhmdaris15)",
            "Writes about software engineering and AI on the blog"
        ],
        ru: [
            "Менторил junior-инженеров и проводил технические собеседования в Demandlane",
            "Писал внутреннюю архитектурную документацию и runbook'и",
            "Активный data scientist на Kaggle (@Mhmdaris15)",
            "Пишу о разработке и AI в блоге"
        ]
    },
    lastUpdated: { en: "May 2026", ru: "Май 2026" }
};
