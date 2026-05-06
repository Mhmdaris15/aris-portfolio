type Bilingual<T> = { en: T; ru: T };

export type EventType =
    | "hackathon"
    | "competition"
    | "conference"
    | "meetup"
    | "workshop";

export type EventSection =
    | { type: "p"; content: string }
    | { type: "h2"; content: string }
    | { type: "list"; items: string[] }
    | { type: "quote"; content: string }
    | { type: "image"; src: string; caption?: string };

export interface EventLink {
    label: Bilingual<string>;
    url: string;
}

export interface TechEvent {
    slug: string;
    name: Bilingual<string>;
    type: EventType;
    /** Primary event date — ISO yyyy-mm-dd. */
    date: string;
    /** Optional end date for multi-day events. */
    endDate?: string;
    venue: Bilingual<string>;
    city: Bilingual<string>;
    country: string;
    role: Bilingual<string>;
    /** "1st Place", "Top 10", "Speaker", etc. Optional. */
    result?: Bilingual<string>;
    description: Bilingual<string>;
    tags: string[];
    /** Cover image — supply a /public/images path or external URL. Empty = procedural cover. */
    cover: string;
    /** Photo gallery URLs. */
    gallery: string[];
    links: EventLink[];
    /** Long-form sections, optional. */
    en?: { sections: EventSection[] };
    ru?: { sections: EventSection[] };
    /** Quick highlights — bullet list shown on detail page. */
    highlights: Bilingual<string[]>;
}

export const events: TechEvent[] = [
    {
        slug: "neimark-hackathon-2026",
        name: {
            en: "Neimark Hackathon 2026",
            ru: "Хакатон «Неймарк» 2026"
        },
        type: "hackathon",
        date: "2026-02-15",
        endDate: "2026-02-17",
        venue: { en: "ITMO University", ru: "Университет ИТМО" },
        city: { en: "Saint Petersburg", ru: "Санкт-Петербург" },
        country: "RU",
        role: {
            en: "Full-Stack Developer · Team Lead",
            ru: "Full-Stack разработчик · тимлид"
        },
        result: { en: "Finalist", ru: "Финалист" },
        description: {
            en: "Built LISA — Lumina Indonesian Student Assistant — a 48-hour hackathon project helping Indonesian students in St. Petersburg manage documents, deadlines, and community.",
            ru: "Построили LISA — Lumina Indonesian Student Assistant — 48-часовой проект для индонезийских студентов в Санкт-Петербурге: документы, дедлайны, сообщество."
        },
        tags: ["Hackathon", "Go", "Next.js", "AI"],
        cover: "",
        gallery: [],
        links: [
            {
                label: { en: "GitHub Repo", ru: "Репозиторий GitHub" },
                url: "https://github.com/Mhmdaris15/neimark-hackathon-2026"
            }
        ],
        highlights: {
            en: [
                "Shipped a working full-stack MVP in 48 hours: Go API + Next.js 16 + MongoDB",
                "Designed the document-tracker schema with deadline reminders",
                "Embedded an AI assistant trained on Indonesian-Russian student knowledge",
                "Presented to a panel of judges and Indonesian community leaders"
            ],
            ru: [
                "Запустили работающий full-stack MVP за 48 часов: Go API + Next.js 16 + MongoDB",
                "Спроектировал схему трекера документов с напоминаниями о дедлайнах",
                "Встроили AI-ассистента на базе знаний индонезийских студентов в России",
                "Презентовали жюри и лидерам индонезийского сообщества"
            ]
        }
    },
    {
        slug: "neuro-sync-hackathon-2025",
        name: {
            en: "NEURO-SYNC Campus Wellness Hackathon",
            ru: "Хакатон NEURO-SYNC Campus Wellness"
        },
        type: "hackathon",
        date: "2025-09-20",
        endDate: "2025-09-22",
        venue: { en: "ITMO Campus Innovation Lab", ru: "ITMO Campus Innovation Lab" },
        city: { en: "Saint Petersburg", ru: "Санкт-Петербург" },
        country: "RU",
        role: {
            en: "Frontend & AI Integration",
            ru: "Frontend и AI-интеграция"
        },
        description: {
            en: "Cognitive-health hackathon: built a stress-detection + AI CBT intervention system with environmental control hooks and a real-time campus digital twin.",
            ru: "Хакатон по когнитивному здоровью: построили систему детекции стресса + AI-интервенции на КПТ с управлением средой и real-time цифровым двойником кампуса."
        },
        tags: ["Hackathon", "AI", "IoT", "Healthcare"],
        cover: "",
        gallery: [],
        links: [
            {
                label: { en: "GitHub Repo", ru: "Репозиторий GitHub" },
                url: "https://github.com/Mhmdaris15/neuro-sync"
            }
        ],
        highlights: {
            en: [
                "Wired biometric stream → stress-detection model → CBT prompt loop",
                "Designed environmental control hooks for lighting and HVAC integration",
                "Built React 18 + TypeScript front end and digital twin visualization",
                "Privacy-preserving aggregate dashboards for campus administrators"
            ],
            ru: [
                "Связал биометрический поток → модель детекции стресса → цикл КПТ-подсказок",
                "Спроектировал хуки управления средой для интеграции света и HVAC",
                "Построили фронтенд на React 18 + TypeScript и визуализацию цифрового двойника",
                "Дашборды с агрегацией и защитой приватности для администрации кампуса"
            ]
        }
    },
    {
        slug: "aimo-kaggle-2025",
        name: {
            en: "AI Mathematical Olympiad — Kaggle Prize",
            ru: "AI Mathematical Olympiad — Kaggle"
        },
        type: "competition",
        date: "2025-06-01",
        endDate: "2025-08-30",
        venue: { en: "Kaggle (Online)", ru: "Kaggle (онлайн)" },
        city: { en: "Remote", ru: "Удалённо" },
        country: "—",
        role: {
            en: "Solo Competitor",
            ru: "Соло-участник"
        },
        description: {
            en: "Three-month Kaggle competition tackling AIMO-grade mathematical reasoning with self-consistency LLM pipelines, entropy-weighted voting, and tool-integrated reasoning on vLLM.",
            ru: "Трёхмесячное соревнование Kaggle: математическое мышление уровня AIMO с пайплайнами self-consistency на LLM, голосованием с весами энтропии и tool-integrated reasoning на vLLM."
        },
        tags: ["Competition", "AI", "LLM", "Kaggle"],
        cover: "",
        gallery: [],
        links: [
            {
                label: { en: "GitHub Repo", ru: "Репозиторий GitHub" },
                url: "https://github.com/Mhmdaris15/ai-mo-competition"
            }
        ],
        highlights: {
            en: [
                "Multi-sample self-consistency reasoning across DeepSeek-R1 and Qwen traces",
                "Entropy-weighted voting and Python tool-execution layer for arithmetic verification",
                "Built batched vLLM inference harness — studied vLLM scheduler internals to maximize throughput",
                "Public discussion + writeup on Kaggle"
            ],
            ru: [
                "Multi-sample reasoning со self-consistency по trace'ам DeepSeek-R1 и Qwen",
                "Голосование с весами энтропии + Python tool-execution для арифметической проверки",
                "Каркас батч-инференса на vLLM — изучал внутренности vLLM-планировщика для максимума throughput",
                "Открытое обсуждение и writeup на Kaggle"
            ]
        }
    },
    {
        slug: "lks-data-science-2023",
        name: {
            en: "LKS Data Science West Java Province",
            ru: "LKS Data Science Западная Ява"
        },
        type: "competition",
        date: "2023-10-12",
        endDate: "2023-10-14",
        venue: { en: "Provincial Vocational Skills Center", ru: "Региональный центр профнавыков" },
        city: { en: "Bandung", ru: "Бандунг" },
        country: "ID",
        role: { en: "Competitor", ru: "Участник" },
        result: { en: "🥇 1st Place", ru: "🥇 1 место" },
        description: {
            en: "Provincial-level data science competition. Designed and shipped a reproducible competition harness covering EDA, feature engineering, baseline + boosted models, and a polished demo notebook.",
            ru: "Областное соревнование по data science. Спроектировал воспроизводимый competition-каркас: EDA, feature engineering, baseline + бустинг и отполированный demo-ноутбук."
        },
        tags: ["Competition", "Data Science", "ML"],
        cover: "",
        gallery: [],
        links: [],
        highlights: {
            en: [
                "🥇 1st Place out of dozens of competing schools",
                "Currency time-series forecasting + tweet sentiment classification",
                "Reproducible notebook harness from EDA to deployable demo",
                "Qualified for the next national-tier competition"
            ],
            ru: [
                "🥇 1 место из десятков школ-участников",
                "Прогноз курса валют + sentiment-классификация твитов",
                "Воспроизводимый каркас от EDA до deployable-демо",
                "Прошёл в следующий национальный этап"
            ]
        }
    },
    {
        slug: "kksi-data-science-2021",
        name: {
            en: "KKSI Data Science Competition",
            ru: "Соревнование KKSI Data Science"
        },
        type: "competition",
        date: "2021-11-08",
        venue: { en: "Indonesian Vocational Schools Association", ru: "Ассоциация профшкол Индонезии" },
        city: { en: "Online · Indonesia", ru: "Онлайн · Индонезия" },
        country: "ID",
        role: { en: "Competitor", ru: "Участник" },
        result: { en: "🥈 2nd Place", ru: "🥈 2 место" },
        description: {
            en: "National data science competition for vocational students. Built a face-recognition pipeline and delivered the technical writeup.",
            ru: "Национальное соревнование по data science для студентов проф-направлений. Построил pipeline распознавания лиц и подготовил технический отчёт."
        },
        tags: ["Competition", "Data Science", "Computer Vision"],
        cover: "",
        gallery: [],
        links: [],
        highlights: {
            en: [
                "🥈 2nd Place nationally",
                "Face-detection + recognition pipeline (OpenCV + FaceNet-style embeddings)",
                "First time presenting research to a technical jury — early systems-thinking lesson"
            ],
            ru: [
                "🥈 2 место на национальном уровне",
                "Pipeline детекции и распознавания лиц (OpenCV + embeddings в стиле FaceNet)",
                "Первая защита перед техническим жюри — ранний урок системного мышления"
            ]
        }
    },
    {
        slug: "gdg-devfest-jakarta-2023",
        name: {
            en: "GDG DevFest Jakarta",
            ru: "GDG DevFest Джакарта"
        },
        type: "conference",
        date: "2023-11-25",
        venue: { en: "Google Developer Group · Jakarta Convention Hub", ru: "Google Developer Group · Jakarta Convention Hub" },
        city: { en: "Jakarta", ru: "Джакарта" },
        country: "ID",
        role: { en: "Attendee", ru: "Участник" },
        description: {
            en: "Google Developer Group's annual community festival. Talks on Android, AI, and cloud — sessions that informed early thinking about agent architectures.",
            ru: "Ежегодный фестиваль сообщества Google Developer Group. Доклады по Android, AI и облаку — сессии, повлиявшие на раннее мышление об агентных архитектурах."
        },
        tags: ["Conference", "Google", "Community"],
        cover: "",
        gallery: [],
        links: [
            {
                label: { en: "DevFest Jakarta", ru: "DevFest Джакарта" },
                url: "https://devfest.id"
            }
        ],
        highlights: {
            en: [
                "Sessions on Gemini, Vertex AI, and Cloud Run patterns",
                "Met other Indonesian developers building on Google stack",
                "Notes from this event ended up in my RAG bot architecture decisions"
            ],
            ru: [
                "Сессии по Gemini, Vertex AI и паттернам Cloud Run",
                "Познакомился с другими индонезийскими разработчиками, использующими Google-стек",
                "Заметки с этого события легли в архитектурные решения моего RAG-бота"
            ]
        }
    }
];

export const getEventBySlug = (slug: string) => events.find((e) => e.slug === slug);

/** Group events by year, newest first. */
export const eventsByYear = () => {
    const grouped = new Map<number, TechEvent[]>();
    for (const e of events) {
        const y = new Date(e.date).getFullYear();
        if (!grouped.has(y)) grouped.set(y, []);
        grouped.get(y)!.push(e);
    }
    return Array.from(grouped.entries())
        .sort((a, b) => b[0] - a[0])
        .map(([year, items]) => ({
            year,
            items: items.sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
        }));
};
