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
        slug: "rshb-digital-hackathon-2026",
        name: {
            en: "RSHB.Digital Hackathon — НИЯУ МИФИ",
            ru: "Хакатон РСХБ.Цифра — НИЯУ МИФИ"
        },
        type: "hackathon",
        date: "2026-05-28",
        endDate: "2026-05-29",
        venue: {
            en: "NRNU MEPhI (Moscow Engineering Physics Institute)",
            ru: "НИЯУ МИФИ"
        },
        city: { en: "Moscow", ru: "Москва" },
        country: "RU",
        role: {
            en: "Full-Stack & AI Engineer",
            ru: "Full-Stack и AI-инженер"
        },
        result: { en: "🥉 3rd Place — Case №1", ru: "🥉 3 место — Кейс №1" },
        description: {
            en: "Built «Своё Родное: Farmer Marketing Calendar» — an AI-powered event-marketing platform for farmers on Rosselkhozbank's svoe-rodnoe.ru marketplace. Took 3rd place in Case №1 against 32 teams from 11 of Russia's leading universities. The bank's CPO confirmed the winning concepts will be built into the real product.",
            ru: "Построил «Своё Родное: календарь фермера» — AI-платформу событийного маркетинга для фермеров на маркетплейсе Россельхозбанка svoe-rodnoe.ru. Занял 3 место в Кейсе №1 среди 32 команд из 11 ведущих вузов страны. CPO банка подтвердил, что победившие концепты реализуют в реальном продукте."
        },
        tags: ["Hackathon", "AI", "Go", "React", "SurrealDB", "Gemini", "3rd Place"],
        cover: "/images/hackathons/RSHB/rshb-1.jpg",
        gallery: [
            "/images/hackathons/RSHB/rshb-1.jpg",
            "/images/hackathons/RSHB/rshb-2.jpg",
            "/images/hackathons/RSHB/rshb-3.jpg",
            "/images/hackathons/RSHB/rshb-4.jpg",
            "/images/hackathons/RSHB/rshb-5.jpg",
            "/images/hackathons/RSHB/rshb-6.jpg",
            "/images/hackathons/RSHB/rshb-7.jpg",
            "/images/hackathons/RSHB/rshb-8.jpg"
        ],
        links: [
            {
                label: { en: "Official announcement (Telegram)", ru: "Официальный анонс (Telegram)" },
                url: "https://t.me/rshbdigital/1532"
            }
        ],
        highlights: {
            en: [
                "🥉 3rd place in Case №1 — selection round drew 128 participants, 32 teams, 11 universities; only 10 teams reached the finals",
                "Shipped a production-grade MVP: React + Vite + TS frontend, Go (Gin) API, SurrealDB, and Gemini for structured campaign generation",
                "Designed a SurrealDB-native architecture — graph + vector + realtime + AI memory in a single engine (no Pinecone, no Neo4j, no Redis)",
                "Built a 7-stage AI pipeline turning a farmer's SKU catalog into ready-to-launch multi-channel campaigns (push, story, blog, recipe, social)",
                "Curated a 40+ event knowledge base across 6 categories (state & Orthodox holidays, professional days, seasons, themed weeks, marketplace trends)",
                "Deterministic Go ROI engine with hover-to-inspect assumption tooltips on every revenue number",
                "RSHB's CPO confirmed the best concepts will ship to real farmers — built for the user, not just the demo"
            ],
            ru: [
                "🥉 3 место в Кейсе №1 — отборочный этап собрал 128 участников, 32 команды, 11 вузов; в финал вышли только 10 команд",
                "Запустил production-grade MVP: фронтенд React + Vite + TS, API на Go (Gin), SurrealDB и Gemini для генерации кампаний в структурированном JSON",
                "Спроектировал SurrealDB-native архитектуру — граф + вектор + realtime + AI-память в одном движке (без Pinecone, Neo4j и Redis)",
                "Построил 7-этапный AI-пайплайн, превращающий каталог SKU фермера в готовые к запуску мультиканальные кампании (push, story, блог, рецепт, соцсети)",
                "Собрал базу знаний из 40+ событий по 6 категориям (госпраздники, православный календарь, профессиональные дни, сезоны, тематические недели, тренды маркетплейса)",
                "Детерминированный ROI-движок на Go с подсказками-допущениями при наведении на каждое число выручки",
                "CPO РСХБ подтвердил, что лучшие концепты дойдут до реальных фермеров — строили для пользователя, а не ради демо"
            ]
        },
        en: {
            sections: [
                { type: "h2", content: "The case" },
                { type: "p", content: "Rosselkhozbank (RSHB) runs svoe-rodnoe.ru — a marketplace where Russian farmers sell directly to consumers. Case №1 asked teams to build a tool that helps a farmer decide what to promote, when, and how — turning the calendar of holidays, seasons, and marketplace trends into concrete, revenue-driving campaigns. The hard constraint: it had to be built for a real farmer who has minutes, not hours, and no marketing team." },
                { type: "h2", content: "What we built" },
                { type: "p", content: "«Своё Родное: Farmer Marketing Calendar» ingests a farmer's product catalog, matches each SKU against a curated knowledge base of 40+ events, and uses Gemini to generate ready-to-launch campaign assets across six channels — push, story, blog, recipe, social, and repeat-buyer chat — with a deterministic ROI engine on top so every suggestion comes with a defensible revenue estimate." },
                { type: "list", items: [
                    "Farmer dashboard — KPIs, action cards, revenue forecast",
                    "40+ event calendar across 6 categories with filters and trends",
                    "AI workspace with slash commands (/story, /blog) and save-to-any-channel",
                    "Kanban plan board — proposed → planned → live → done, with 4-tab campaign cards",
                    "Public no-login interactive demo of the full 7-stage pipeline"
                ] },
                { type: "h2", content: "The architecture bet" },
                { type: "p", content: "The signature technical decision was going SurrealDB-native: one engine handling the graph (farmer → product → event → suggestion relationships), the vector search (SKU-to-event matching via embeddings), realtime updates, and AI memory — instead of stitching together Pinecone + Neo4j + Redis + Postgres. React + Vite + TypeScript on the front, Go (Gin) in the middle, Gemini 2.0-flash for structured JSON generation." },
                { type: "quote", content: "«Мы провели этот хакатон не ради эксперимента, а чтобы получить работающие цифровые решения для агросектора. Лучшие из представленных концептов мы реализуем» — Андрей Лапин, CPO сервисов «Своё родное» и «Своё вино»." },
                { type: "h2", content: "The result" },
                { type: "p", content: "3rd place in Case №1 out of 32 competing teams. The bank's product leadership stated publicly that the winning concepts will be built into the real svoe-rodnoe product — meaning the work wasn't a throwaway prototype, but a blueprint headed toward production for actual farmers." }
            ]
        },
        ru: {
            sections: [
                { type: "h2", content: "Кейс" },
                { type: "p", content: "Россельхозбанк (РСХБ) развивает svoe-rodnoe.ru — маркетплейс, где российские фермеры продают напрямую покупателям. Кейс №1 просил команды построить инструмент, который помогает фермеру решить, что продвигать, когда и как — превращая календарь праздников, сезонов и трендов маркетплейса в конкретные кампании, растящие выручку. Жёсткое ограничение: строить для реального фермера, у которого есть минуты, а не часы, и нет маркетинговой команды." },
                { type: "h2", content: "Что мы построили" },
                { type: "p", content: "«Своё Родное: календарь фермера» загружает каталог товаров фермера, сопоставляет каждый SKU с курированной базой знаний из 40+ событий и через Gemini генерирует готовые к запуску ассеты кампаний по шести каналам — push, story, блог, рецепт, соцсети и чат для повторных покупателей — с детерминированным ROI-движком сверху, чтобы каждое предложение приходило с обоснованной оценкой выручки." },
                { type: "list", items: [
                    "Дашборд фермера — KPI, карточки действий, прогноз выручки",
                    "Календарь 40+ событий по 6 категориям с фильтрами и трендами",
                    "AI-рабочее пространство со slash-командами (/story, /blog) и сохранением в любой канал",
                    "Kanban-доска плана — предложено → запланировано → live → готово, с 4-вкладочными карточками кампаний",
                    "Публичное интерактивное демо без логина — весь 7-этапный пайплайн"
                ] },
                { type: "h2", content: "Архитектурная ставка" },
                { type: "p", content: "Ключевым техническим решением был SurrealDB-native подход: один движок держит граф (связи фермер → товар → событие → предложение), векторный поиск (сопоставление SKU и событий через эмбеддинги), realtime-обновления и AI-память — вместо склейки Pinecone + Neo4j + Redis + Postgres. React + Vite + TypeScript на фронте, Go (Gin) в середине, Gemini 2.0-flash для генерации структурированного JSON." },
                { type: "quote", content: "«Мы провели этот хакатон не ради эксперимента, а чтобы получить работающие цифровые решения для агросектора. Лучшие из представленных концептов мы реализуем» — Андрей Лапин, CPO сервисов «Своё родное» и «Своё вино»." },
                { type: "h2", content: "Результат" },
                { type: "p", content: "3 место в Кейсе №1 из 32 команд. Продуктовое руководство банка публично заявило, что победившие концепты будут реализованы в реальном продукте «Своё Родное» — значит, работа была не одноразовым прототипом, а чертежом на пути в production для настоящих фермеров." }
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
