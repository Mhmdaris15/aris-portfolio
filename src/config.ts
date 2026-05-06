type Bilingual<T> = { en: T; ru: T };

export interface Project {
    id: number;
    slug: string;
    title: Bilingual<string>;
    category: Bilingual<string>;
    technologies: string;
    image: string;
    year: string;
    role: Bilingual<string>;
    description: Bilingual<string>;
    problem: Bilingual<string>;
    solution: Bilingual<string>;
    keyFeatures: Bilingual<string[]>;
    github: string;
}

export interface Service {
    id: string;
    title: Bilingual<string>;
    tagline: Bilingual<string>;
    icon: string;
    popular: boolean;
    priceFromUsd: string;
    priceFromRub: string;
    timeline: Bilingual<string>;
    description: Bilingual<string>;
    includes: Bilingual<string[]>;
    stack: string[];
}

export interface Experience {
    position: Bilingual<string>;
    company: string;
    period: Bilingual<string>;
    location: Bilingual<string>;
    description: Bilingual<string>;
    responsibilities: Bilingual<string[]>;
    technologies: string[];
}

export const config = {
    developer: {
        name: { en: "Aris", ru: "Арис" },
        fullName: {
            en: "Muhammad Aris Septanugroho",
            ru: "Мухаммад Арис Септанугрохо"
        },
        title: {
            en: "Software Engineer & Full-Stack Developer",
            ru: "Software-инженер и Full-Stack разработчик"
        },
        description: {
            en: "Software Engineer & Full-Stack Developer building modern web applications, microservices, AI/RAG systems, and data-driven solutions. Available for freelance projects.",
            ru: "Software-инженер и Full-Stack разработчик. Создаю современные веб-приложения, микросервисы, AI/RAG-системы и решения на данных. Открыт к фриланс-проектам."
        }
    },
    availability: {
        open: true,
        label: {
            en: "Available for Freelance Projects",
            ru: "Открыт к фриланс-проектам"
        },
        responseTime: {
            en: "Replies within 24 hours",
            ru: "Отвечаю в течение 24 часов"
        }
    },
    social: {
        github: "Mhmdaris15",
        email: "muhammadaris1945@gmail.com",
        location: {
            en: "Bogor, West Java, Indonesia",
            ru: "Богор, Западная Ява, Индонезия"
        }
    },
    about: {
        title: { en: "About Me", ru: "Обо мне" },
        description: {
            en: "I'm a Software Engineer and AI Systems Engineer obsessed with how things actually work under the hood. I read source code for sport — Postgres internals, Frappe's framework architecture, vLLM's batching scheduler, ChromaDB's HNSW implementation, Lenis's scroll loop, the Anthropic Messages API contract — because the best way to design systems is to understand the systems other engineers already designed well. My work spans the full stack: data pipelines that move millions of rows reliably, real-time WebSocket platforms, LLM/RAG production systems, and full-stack web apps. I've shipped to real users across Indonesia, the US, and Russia, and the constant thread is system thinking — choosing the right data model, where to put the queue, when to cache, when to fail loudly. I write about what I learn, mentor when I can, and I'm open to senior engineering roles or freelance engagements where the brief is harder than the average ticket.",
            ru: "Я Software-инженер и AI Systems Engineer, помешанный на том, как системы реально работают внутри. Читаю исходники для удовольствия — внутренности Postgres, архитектуру фреймворка Frappe, batching-планировщик vLLM, реализацию HNSW в ChromaDB, scroll-цикл Lenis, контракт Anthropic Messages API — потому что лучший способ проектировать системы это понимать те, что уже хорошо спроектированы другими инженерами. Работаю по всему стеку: data-пайплайны, надёжно перевозящие миллионы строк, real-time платформы на WebSocket, production LLM/RAG системы и full-stack приложения. Запускал в продакшен для реальных пользователей в Индонезии, США и России; общий мотив — системное мышление: выбор модели данных, расположение очереди, когда кэшировать, когда громко падать. Пишу о том, что изучаю, менторю когда могу, и открыт к senior-позициям или фриланс-проектам, где задача сложнее обычного тикета."
        }
    },
    experiences: [
        {
            position: { en: "Data / Analytics Engineer", ru: "Data / Analytics инженер" },
            company: "Demandlane",
            period: { en: "2024 - Present", ru: "2024 — наст. время" },
            location: {
                en: "California, MD (Remote)",
                ru: "Калифорния, США (удалённо)"
            },
            description: {
                en: "Architect end-to-end data systems — ingestion, modeling, scheduling, and observability — that drive daily revenue decisions for a US marketing-tech company.",
                ru: "Проектирую сквозные data-системы — ingest, моделирование, планирование, observability — на которых ежедневно принимаются решения по выручке US marketing-tech компании."
            },
            responsibilities: {
                en: [
                    "Migrated production analytics from Google Sheets to AWS Redshift — schema design, idempotent COPY loads, dbt-tested marts, ~10x scalability",
                    "Designed event-driven automation with retry, dead-letter, and Slack failure routing across 10+ scheduled jobs on VMs",
                    "Cut model retraining latency from ~6h to ~1h via parallelized task scheduling and warm-cache reuse",
                    "Built ingestion adapters for Yonyx, NumberVerifier, OnScript APIs — back-pressure, rate limits, and contract drift handling",
                    "Replaced AppScript automations with a Python + n8n stack; centralized secrets, structured logging, and lineage"
                ],
                ru: [
                    "Перевёл production-аналитику с Google Sheets на AWS Redshift — проектирование схемы, идемпотентные COPY, dbt-тесты, рост масштаба ~10x",
                    "Спроектировал event-driven автоматизацию с retry, dead-letter и Slack-маршрутизацией ошибок для 10+ задач на VM",
                    "Сократил latency переобучения моделей с ~6ч до ~1ч через параллелизацию и переиспользование тёплого кэша",
                    "Построил ingest-адаптеры под API Yonyx, NumberVerifier, OnScript — back-pressure, rate-limits, обработка дрейфа контракта",
                    "Заменил AppScript-автоматизации стеком Python + n8n; централизованные секреты, структурное логирование, lineage"
                ]
            },
            technologies: ["AWS Redshift", "dbt", "Python", "Polars", "n8n", "Tableau"]
        },
        {
            position: {
                en: "Full-Stack Engineer",
                ru: "Full-Stack инженер"
            },
            company: "Mija Company",
            period: { en: "2023 - 2024", ru: "2023 — 2024" },
            location: { en: "Jakarta, Indonesia", ru: "Джакарта, Индонезия" },
            description: {
                en: "Architected and shipped a multi-tenant restaurant CMS + PWA — designed the data model, payment flow, and deployment topology end-to-end.",
                ru: "Спроектировал и запустил мульти-арендный CMS + PWA для ресторанов — модель данных, платёжный flow и топологию деплоя целиком."
            },
            responsibilities: {
                en: [
                    "Designed the domain model (orders, menus, sessions, payments) with strict invariants and state machines for refunds and cancellations",
                    "Built backend in NestJS with module boundaries that mapped to bounded contexts; integration-tested against a real Postgres",
                    "Integrated Indonesian payment gateways with idempotent webhook handlers and signed-payload verification",
                    "Set up Docker + Cloud Run deployment with zero-downtime releases and per-tenant config",
                    "Authored the PWA shell — service worker, app manifest, offline order queue with background sync"
                ],
                ru: [
                    "Спроектировал доменную модель (заказы, меню, сессии, платежи) со строгими инвариантами и state-машинами для возвратов и отмен",
                    "Построил backend на NestJS с модульными границами, отражающими bounded contexts; интеграционные тесты против реальной Postgres",
                    "Интегрировал индонезийские платёжные шлюзы с идемпотентными webhook-обработчиками и проверкой подписей",
                    "Настроил Docker + Cloud Run деплой с zero-downtime релизами и per-tenant конфигом",
                    "Написал PWA shell — service worker, app manifest, офлайн очередь заказов с background sync"
                ]
            },
            technologies: ["NestJS", "React", "PostgreSQL", "Docker", "Cloud Run", "PWA"]
        },
        {
            position: {
                en: "Software Engineer & Project Manager Intern",
                ru: "Software-инженер и PM-стажёр"
            },
            company: "Carakan Sadhana Dirgantara",
            period: { en: "2022 - 2024", ru: "2022 — 2024" },
            location: {
                en: "South Jakarta, Indonesia",
                ru: "Южная Джакарта, Индонезия"
            },
            description: {
                en: "Built multiplayer game architectures and Web3 integrations; studied authoritative-server patterns, WebRTC NAT traversal, and on-chain transaction lifecycles up close.",
                ru: "Строил multiplayer-архитектуры и Web3-интеграции; изучал паттерны authoritative-server, NAT-traversal в WebRTC и жизненный цикл on-chain транзакций вживую."
            },
            responsibilities: {
                en: [
                    "Designed authoritative game-state servers in Go with deterministic tick loops and lag compensation",
                    "Implemented WebRTC + Socket fallback for peer connectivity behind symmetric NATs",
                    "Wrote Web3 integration layer — wallet handshake, signed transactions, and on-chain asset minting flow",
                    "Owned project management in Linear under SCRUM; balanced engineering depth with delivery cadence",
                    "Completed Unreal Engine 5 training at Brandoville Academy — character control, network replication, gameplay framework"
                ],
                ru: [
                    "Спроектировал authoritative game-state серверы на Go с детерминированными tick-циклами и lag compensation",
                    "Реализовал fallback WebRTC + Socket для peer-соединений за симметричными NAT",
                    "Написал слой Web3 интеграции — handshake кошелька, подписанные транзакции, on-chain mint ассетов",
                    "Вёл проекты в Linear по SCRUM; балансировал инженерную глубину со скоростью поставки",
                    "Прошёл тренинг Unreal Engine 5 в Brandoville Academy — управление персонажем, network replication, gameplay framework"
                ]
            },
            technologies: ["Unreal Engine 5", "WebRTC", "Web3", "Golang", "Linear", "SCRUM"]
        },
        {
            position: {
                en: "Game Development Instructor",
                ru: "Преподаватель геймдева"
            },
            company: "SMKN 1 Cibinong",
            period: { en: "2023", ru: "2023" },
            location: { en: "Bogor, Indonesia", ru: "Богор, Индонезия" },
            description: {
                en: "Taught Unreal Engine 5 game programming through the lens of how the engine actually works internally — gameplay framework, replication, and component lifecycles.",
                ru: "Преподавал программирование игр на Unreal Engine 5 через призму того, как движок устроен внутри — gameplay framework, репликация, жизненный цикл компонентов."
            },
            responsibilities: {
                en: [
                    "Designed curriculum mapping engine internals to hands-on exercises (Actor lifecycle, Tick groups, GAS)",
                    "Mentored project-based learning culminating in shipped student demos",
                    "Built reference systems: character movement controller, AI behavior trees, networked interaction"
                ],
                ru: [
                    "Спроектировал учебную программу, связывающую внутренности движка с практикой (жизненный цикл Actor, Tick groups, GAS)",
                    "Менторил проектное обучение, завершавшееся студенческими demo-играми",
                    "Реализовал референс-системы: контроллер движения персонажа, AI behavior trees, сетевые взаимодействия"
                ]
            },
            technologies: ["Unreal Engine 5", "C++", "Blueprint", "Game Design"]
        },
        {
            position: {
                en: "Backend Engineer (Freelance)",
                ru: "Backend-инженер (фриланс)"
            },
            company: "PBSI (Badminton Association)",
            period: { en: "2023", ru: "2023" },
            location: { en: "Bandung, Indonesia", ru: "Бандунг, Индонезия" },
            description: {
                en: "Designed and shipped a real-time tournament scoring system in two weeks. Held 4% CPU on a 2-core VPS during a live event with 800+ concurrent spectators.",
                ru: "Спроектировал и запустил real-time систему счёта турнира за две недели. Держал 4% CPU на 2-ядерном VPS во время живого события с 800+ одновременными зрителями."
            },
            responsibilities: {
                en: [
                    "Designed multi-instance WebSocket architecture with Redis pub/sub message bus for cross-server fan-out",
                    "Implemented bounded per-connection send buffers, heartbeats, and per-IP connection limits to survive bad clients",
                    "Built bracket generation, match state machine, and result archival in Go with strict invariants",
                    "Sent state snapshots to reconnecting clients so the live stream is resumable mid-tournament",
                    "Operated the system live on tournament day — load watch, CPU/memory tracking, hot-reload of fixes"
                ],
                ru: [
                    "Спроектировал multi-instance архитектуру WebSocket с Redis pub/sub шиной для cross-server fan-out",
                    "Реализовал ограниченные send-буферы на соединение, heartbeat и лимиты соединений на IP — защита от плохих клиентов",
                    "Построил генерацию сеток, state-машину матчей и архив результатов на Go со строгими инвариантами",
                    "Шлю снапшоты состояния переподключающимся клиентам — live-стрим переживает дроп посередине турнира",
                    "Дежурил на турнире вживую — мониторинг нагрузки, CPU/памяти, hot-reload фиксов"
                ]
            },
            technologies: ["Golang", "WebSockets", "Redis", "React", "PostgreSQL"]
        },
        {
            position: {
                en: "Head of Office & Data Science Instructor",
                ru: "Руководитель офиса и преподаватель Data Science"
            },
            company: "NEVTIK Organization",
            period: { en: "2021 - 2023", ru: "2021 — 2023" },
            location: { en: "Bogor, Indonesia", ru: "Богор, Индонезия" },
            description: {
                en: "Led an academy office, taught Data Science fundamentals through hands-on systems (E-Voting, face-recognition attendance), and brought students from concept to deployed software.",
                ru: "Руководил офисом академии, преподавал основы Data Science через построение реальных систем (E-Voting, посещаемость через распознавание лиц), доводил студентов от идеи до задеплоенного софта."
            },
            responsibilities: {
                en: [
                    "Designed an E-Voting system used in real student elections — encrypted vote storage, one-vote-per-student auth, audit log",
                    "Built a face-recognition attendance pipeline: detection (OpenCV), embedding (FaceNet-style), confidence-thresholded marks, CSV export",
                    "Taught Data Science fundamentals through reading classic papers and reproducing them in code",
                    "Ran organizational ops and events for the academy"
                ],
                ru: [
                    "Спроектировал E-Voting систему, использованную на реальных студенческих выборах — шифрованное хранение голосов, авторизация один-голос-на-студента, аудит-лог",
                    "Построил pipeline учёта посещаемости с распознаванием лиц: detection (OpenCV), embedding (FaceNet-style), отметки с порогом уверенности, экспорт CSV",
                    "Преподавал основы Data Science через чтение классических статей и их воспроизведение в коде",
                    "Управлял операционкой и мероприятиями академии"
                ]
            },
            technologies: ["Python", "TensorFlow", "OpenCV", "PHP", "MySQL"]
        }
    ] as Experience[],
    projects: [
        {
            id: 1,
            slug: "recursivedine-backend",
            title: { en: "RecursiveDine Backend", ru: "RecursiveDine — Backend" },
            category: { en: "Full-Stack / Real-time", ru: "Full-Stack / Real-time" },
            technologies: "Go, PostgreSQL, WebSocket, Swagger, Docker",
            image: "/images/project-1.webp",
            year: "2024",
            role: { en: "Backend Lead", ru: "Backend-лид" },
            description: {
                en: "Backend API for a restaurant management system featuring user authentication, table/menu management, order processing, QRIS payment integration, and WebSocket real-time kitchen updates.",
                ru: "Backend-API для управления рестораном: авторизация пользователей, управление столиками и меню, обработка заказов, интеграция QRIS-платежей, real-time обновления кухни через WebSocket."
            },
            problem: {
                en: "Restaurants needed a reliable backend that could handle simultaneous orders, push real-time updates to the kitchen, and integrate with Indonesian payment rails (QRIS) without locking themselves into a single POS vendor.",
                ru: "Ресторанам нужен был надёжный backend для одновременной обработки заказов, real-time обновлений кухни и интеграции с индонезийской платёжной системой QRIS — без привязки к одному вендору POS."
            },
            solution: {
                en: "I built a Go-based modular monolith that exposes a typed REST API, uses PostgreSQL for transactional data, and pushes order events to kitchen displays over WebSockets. Swagger keeps the contract clean for the frontend team and Docker makes deployment a single command.",
                ru: "Построил модульный монолит на Go: типизированный REST API, PostgreSQL для транзакций, события заказов на дисплеи кухни через WebSocket. Swagger держит контракт чистым для фронтенда, Docker превращает деплой в одну команду."
            },
            keyFeatures: {
                en: [
                    "JWT-based auth with role separation (customer / cashier / kitchen / admin)",
                    "Real-time order broadcast over WebSockets",
                    "QRIS payment gateway integration",
                    "Swagger-documented REST API",
                    "Containerized for one-command deploy"
                ],
                ru: [
                    "JWT-авторизация с разделением ролей (клиент / кассир / кухня / админ)",
                    "Real-time трансляция заказов через WebSocket",
                    "Интеграция платёжного шлюза QRIS",
                    "REST API с документацией Swagger",
                    "Контейнеризация — деплой одной командой"
                ]
            },
            github: "https://github.com/Mhmdaris15/RecursiveDine-Backend"
        },
        {
            id: 2,
            slug: "recursivedine-frontend",
            title: { en: "RecursiveDine Frontend", ru: "RecursiveDine — Frontend" },
            category: { en: "Full-Stack / E-commerce", ru: "Full-Stack / E-commerce" },
            technologies: "Next.js, TypeScript, Tailwind, TanStack Query, Radix UI",
            image: "/images/project-2.webp",
            year: "2024",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Modern restaurant ordering web app with customer ordering, admin dashboard, cashier POS, and Bluetooth hardware integration.",
                ru: "Современное веб-приложение для заказов в ресторане: клиентский заказ, админ-панель, POS кассира и интеграция с Bluetooth-оборудованием."
            },
            problem: {
                en: "A single restaurant chain needed three different surfaces — customer ordering, cashier POS, admin dashboard — without paying for three separate apps and three separate codebases.",
                ru: "Сеть ресторанов нуждалась в трёх интерфейсах — клиентском, POS кассира, админ-панели — без затрат на три отдельных приложения и три кодовые базы."
            },
            solution: {
                en: "I unified them into one Next.js app with role-based routing, a shared TanStack Query layer for cache consistency, and Web Bluetooth for thermal printer / receipt scanner integration directly from the browser.",
                ru: "Объединил всё в одно Next.js-приложение: ролевая маршрутизация, общий TanStack Query для согласованного кэша и Web Bluetooth для термопринтеров и сканеров чеков прямо из браузера."
            },
            keyFeatures: {
                en: [
                    "Customer ordering with QR-code table flow",
                    "Cashier POS with Bluetooth receipt printing",
                    "Admin dashboard with sales analytics",
                    "Optimistic UI with TanStack Query",
                    "Accessible Radix UI components"
                ],
                ru: [
                    "Клиентский заказ через QR-код столика",
                    "POS кассира с Bluetooth-печатью чеков",
                    "Админ-панель с аналитикой продаж",
                    "Optimistic UI на TanStack Query",
                    "Доступные компоненты Radix UI"
                ]
            },
            github: "https://github.com/Mhmdaris15/recursivedine-frontend"
        },
        {
            id: 3,
            slug: "tresno-boedoyo",
            title: { en: "Tresno Boedoyo (IHS-Connect)", ru: "Tresno Boedoyo (IHS-Connect)" },
            category: { en: "Full-Stack / AI / Web3", ru: "Full-Stack / AI / Web3" },
            technologies: "Node.js, React, PostgreSQL, Gemini API, Polygon",
            image: "/images/project-3.webp",
            year: "2024",
            role: { en: "Full-Stack & AI Engineer", ru: "Full-Stack и AI-инженер" },
            description: {
                en: "Microservice platform for the Indonesia Heritage Society combining AI-driven volunteer matching, Web3 soulbound recognition tokens, and a mobile-first React/Node.js architecture.",
                ru: "Микросервисная платформа для Indonesia Heritage Society: AI-подбор волонтёров, Web3 soulbound-токены признания и mobile-first архитектура на React/Node.js."
            },
            problem: {
                en: "The Indonesia Heritage Society wanted to scale volunteer programs across Indonesia but had no way to match volunteers to events by skill, no recognition system, and no auditable record of contribution.",
                ru: "Indonesia Heritage Society хотело масштабировать волонтёрские программы по всей стране, но не имело подбора по навыкам, системы признания и проверяемой истории вклада."
            },
            solution: {
                en: "I designed a microservice platform where Gemini matches volunteers to opportunities, contributions are minted as soulbound tokens on Polygon for tamper-proof recognition, and a mobile-first React UI keeps onboarding simple.",
                ru: "Спроектировал микросервисную платформу: Gemini подбирает волонтёров к мероприятиям, вклады выпускаются как soulbound-токены на Polygon для неподделываемого признания, mobile-first React-UI упрощает онбординг."
            },
            keyFeatures: {
                en: [
                    "AI-powered volunteer-to-opportunity matching",
                    "Soulbound recognition tokens on Polygon",
                    "Microservice architecture (Node.js)",
                    "Mobile-first React frontend",
                    "Verifiable on-chain contribution history"
                ],
                ru: [
                    "AI-подбор волонтёров к возможностям",
                    "Soulbound-токены признания на Polygon",
                    "Микросервисная архитектура на Node.js",
                    "Mobile-first React-фронтенд",
                    "Проверяемая on-chain история вклада"
                ]
            },
            github: "https://github.com/Mhmdaris15/IHS-Connect"
        },
        {
            id: 4,
            slug: "jaga-wana",
            title: { en: "Jaga Wana", ru: "Jaga Wana" },
            category: { en: "Full-Stack / Social Impact", ru: "Full-Stack / Социальный проект" },
            technologies: "Next.js 15, TypeScript, Tailwind, Leaflet, PostGIS",
            image: "/images/project-4.webp",
            year: "2025",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Mobile-first platform for Indonesian Indigenous communities with geo-story mapping, environmental incident reporting, cultural marketplace, and a secure knowledge vault.",
                ru: "Mobile-first платформа для коренных общин Индонезии: гео-сторителлинг, репорты о экологических инцидентах, культурный маркетплейс и защищённое хранилище знаний."
            },
            problem: {
                en: "Indonesian Indigenous communities lacked a digital channel to record traditional knowledge, report environmental incidents on ancestral land, and sell artisan goods directly without intermediaries.",
                ru: "У коренных общин не было цифрового канала, чтобы фиксировать традиционные знания, сообщать об экологических инцидентах на родовых землях и продавать ремёсла без посредников."
            },
            solution: {
                en: "Jaga Wana is a Next.js 15 app with PostGIS-backed geo-story mapping, encrypted knowledge vaults, an artisan marketplace, and offline-tolerant incident reporting designed for low-bandwidth field use.",
                ru: "Jaga Wana — Next.js 15 приложение с гео-сторителлингом на PostGIS, зашифрованными хранилищами знаний, маркетплейсом ремесленников и репортами с поддержкой офлайн для слабого интернета."
            },
            keyFeatures: {
                en: [
                    "Geo-story map of cultural sites (Leaflet + PostGIS)",
                    "Encrypted knowledge vault for sacred records",
                    "Direct-to-buyer artisan marketplace",
                    "Environmental incident reporting (offline-first)",
                    "Mobile-first responsive UI"
                ],
                ru: [
                    "Карта культурных объектов (Leaflet + PostGIS)",
                    "Зашифрованное хранилище сакральных записей",
                    "Маркетплейс ремесленников без посредников",
                    "Репорты об инцидентах (offline-first)",
                    "Mobile-first адаптивный интерфейс"
                ]
            },
            github: "https://github.com/Mhmdaris15/jaga-wana"
        },
        {
            id: 5,
            slug: "whatsapp-rag-bot",
            title: { en: "WhatsApp RAG Bot", ru: "WhatsApp RAG-бот" },
            category: { en: "AI / RAG / Automation", ru: "AI / RAG / Автоматизация" },
            technologies: "FastAPI, ChromaDB, Gemini, WhatsApp API, JWT",
            image: "/images/project-5.webp",
            year: "2025",
            role: { en: "AI Engineer", ru: "AI-инженер" },
            description: {
                en: "FastAPI WhatsApp chatbot using Retrieval-Augmented Generation with Google Gemini, MCP architecture, and multi-turn conversational memory for Indonesian regional data.",
                ru: "WhatsApp-бот на FastAPI с RAG (Retrieval-Augmented Generation) на Google Gemini, MCP-архитектурой и многоходовой памятью диалога для региональных данных Индонезии."
            },
            problem: {
                en: "Indonesian government and tourism teams wanted citizens to query regional data conversationally on WhatsApp — the channel they already use — without forcing them to install another app.",
                ru: "Государственным и туристическим командам нужно было дать гражданам возможность задавать вопросы по региональным данным прямо в WhatsApp — уже привычном канале, без установки нового приложения."
            },
            solution: {
                en: "I built a FastAPI service that ingests regional documents into ChromaDB, retrieves relevant chunks per query, and generates grounded answers with Gemini. An MCP-style tool layer lets the bot call structured data sources mid-conversation.",
                ru: "Сделал FastAPI-сервис: документы попадают в ChromaDB, на каждый запрос извлекаются релевантные фрагменты, Gemini генерирует обоснованные ответы. MCP-слой инструментов позволяет боту обращаться к структурированным источникам прямо в диалоге."
            },
            keyFeatures: {
                en: [
                    "RAG pipeline (ChromaDB + Gemini) with citation",
                    "MCP-style tool layer for structured queries",
                    "Multi-turn conversational memory per user",
                    "WhatsApp Business API integration",
                    "JWT-secured admin / analytics console"
                ],
                ru: [
                    "RAG-пайплайн (ChromaDB + Gemini) с цитированием",
                    "MCP-слой инструментов для структурированных запросов",
                    "Многоходовая память диалога на пользователя",
                    "Интеграция с WhatsApp Business API",
                    "Админ-консоль с аналитикой и JWT-защитой"
                ]
            },
            github: "https://github.com/Mhmdaris15/whatsapp-bot-rag"
        },
        {
            id: 6,
            slug: "neuro-sync",
            title: { en: "NEURO-SYNC Campus", ru: "NEURO-SYNC Campus" },
            category: { en: "AI / IoT / Real-time", ru: "AI / IoT / Real-time" },
            technologies: "React 18, Vite, TypeScript, Tailwind, Biometrics",
            image: "/images/placeholder.webp",
            year: "2025",
            role: { en: "Frontend / AI Integration", ru: "Frontend и AI-интеграция" },
            description: {
                en: "Hackathon project for cognitive health management with stress detection, AI-powered CBT interventions, environmental controls, and a digital twin visualization for campus wellness.",
                ru: "Хакатон-проект по когнитивному здоровью: детекция стресса, AI-вмешательства на базе КПТ, управление средой и цифровой двойник для wellness кампуса."
            },
            problem: {
                en: "Universities lacked early-warning signals for student burnout and had no proactive intervention loop tied to environmental conditions like noise, lighting, and air quality.",
                ru: "У университетов не было ранних сигналов выгорания студентов и проактивных интервенций, связанных со средой — шумом, освещением и качеством воздуха."
            },
            solution: {
                en: "NEURO-SYNC reads biometric data, detects stress patterns, and triggers either an AI-led CBT prompt or environmental adjustments (lighting / HVAC). A digital twin visualizes campus wellness in real-time for administrators.",
                ru: "NEURO-SYNC считывает биометрию, выявляет паттерны стресса и запускает либо AI-сессию КПТ, либо изменения среды (свет / климат). Цифровой двойник показывает wellness кампуса в реальном времени для администрации."
            },
            keyFeatures: {
                en: [
                    "Stress detection from biometric streams",
                    "AI-driven CBT micro-interventions",
                    "Environmental control hooks (lighting / HVAC)",
                    "Real-time campus digital twin",
                    "Privacy-preserving aggregate dashboards"
                ],
                ru: [
                    "Детекция стресса из биометрических потоков",
                    "AI-микроинтервенции на базе КПТ",
                    "Управление средой (свет / климат)",
                    "Real-time цифровой двойник кампуса",
                    "Агрегированные дашборды с защитой приватности"
                ]
            },
            github: "https://github.com/Mhmdaris15/neuro-sync"
        },
        {
            id: 7,
            slug: "lisa-student-assistant",
            title: { en: "LISA — Indonesian Student Assistant", ru: "LISA — помощник для студентов из Индонезии" },
            category: { en: "Full-Stack / Hackathon", ru: "Full-Stack / Хакатон" },
            technologies: "Go, Next.js 16, MongoDB, JWT, Zustand",
            image: "/images/placeholder.webp",
            year: "2026",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Hackathon platform helping Indonesian students in St. Petersburg manage documents, reminders, a community forum, and access AI chatbot support.",
                ru: "Хакатон-платформа для индонезийских студентов в Санкт-Петербурге: документы, напоминания, форум и AI-чат-бот."
            },
            problem: {
                en: "Indonesian students in St. Petersburg juggle visa documents, university paperwork, and isolation — with information scattered across Telegram groups, embassy PDFs, and WhatsApp threads.",
                ru: "Индонезийские студенты в Санкт-Петербурге одновременно ведут визовые документы, университетские бумаги и борются с изоляцией — а информация разбросана по Telegram, PDF посольства и чатам WhatsApp."
            },
            solution: {
                en: "LISA centralizes document deadlines, exposes a community forum, and embeds an AI assistant trained on Indonesian-Russian student knowledge. Built with Go for the API layer and Next.js 16 for the client.",
                ru: "LISA централизует дедлайны документов, даёт форум сообщества и встраивает AI-ассистента на базе знаний о жизни индонезийских студентов в России. API на Go, клиент на Next.js 16."
            },
            keyFeatures: {
                en: [
                    "Document tracker with deadline reminders",
                    "Community forum with moderation",
                    "AI assistant for visa / university questions",
                    "JWT auth with Zustand state",
                    "MongoDB-backed flexible content schemas"
                ],
                ru: [
                    "Трекер документов с напоминаниями о дедлайнах",
                    "Форум сообщества с модерацией",
                    "AI-ассистент по визам и универу",
                    "JWT-авторизация и Zustand-состояние",
                    "Гибкие схемы контента на MongoDB"
                ]
            },
            github: "https://github.com/Mhmdaris15/neimark-hackathon-2026"
        },
        {
            id: 8,
            slug: "tracepoint-spb",
            title: { en: "TracePoint SPB", ru: "TracePoint SPB" },
            category: { en: "Landing Page / Marketing", ru: "Лендинг / Маркетинг" },
            technologies: "Next.js 16, Framer Motion, Tailwind v4, TypeScript",
            image: "/images/project-1.webp",
            year: "2026",
            role: { en: "Frontend Developer", ru: "Frontend-разработчик" },
            description: {
                en: "Dark glassmorphism landing page for a Saint Petersburg startup showcasing flyer distribution and web development services with bilingual UI and animated transitions.",
                ru: "Тёмный glassmorphism-лендинг для стартапа из Санкт-Петербурга: распространение флаеров и веб-разработка, двуязычный интерфейс и анимированные переходы."
            },
            problem: {
                en: "A new SPB-based service company needed a landing site that signaled premium quality, supported Russian and English audiences, and converted on a small budget.",
                ru: "Питерской сервисной компании нужен был лендинг premium-уровня, поддерживающий русскую и английскую аудиторию и конвертящий на небольшом бюджете."
            },
            solution: {
                en: "A Next.js 16 site with a dark glassmorphism aesthetic, Framer Motion micro-interactions, locale-routed bilingual copy, and a single-CTA conversion flow.",
                ru: "Next.js 16 сайт в стиле тёмный glassmorphism, микро-анимации Framer Motion, маршрутизация по локали и единственный CTA для конверсии."
            },
            keyFeatures: {
                en: [
                    "Bilingual (RU / EN) routing",
                    "Glassmorphism with Framer Motion transitions",
                    "Lighthouse-optimized performance",
                    "Tailwind v4 design tokens",
                    "Single-CTA conversion flow"
                ],
                ru: [
                    "Двуязычная маршрутизация (RU / EN)",
                    "Glassmorphism + анимации Framer Motion",
                    "Оптимизация под Lighthouse",
                    "Дизайн-токены Tailwind v4",
                    "Единственный CTA для конверсии"
                ]
            },
            github: "https://github.com/Mhmdaris15/tracepointspb"
        },
        {
            id: 9,
            slug: "recursive-tech-landing",
            title: { en: "Recursive Tech Landing", ru: "Recursive Tech — лендинг" },
            category: { en: "Landing Page", ru: "Лендинг" },
            technologies: "React 18, TypeScript, Tailwind, Shadcn/UI, Vite",
            image: "/images/project-2.webp",
            year: "2024",
            role: { en: "Frontend Developer", ru: "Frontend-разработчик" },
            description: {
                en: "Modern, fully responsive landing page template for IT solutions companies with dark/light mode, ShadcnUI components, and comprehensive service sections.",
                ru: "Современный адаптивный шаблон лендинга для IT-компаний: тёмный/светлый режим, компоненты ShadcnUI и продуманные секции услуг."
            },
            problem: {
                en: "IT consultancies kept asking for a flexible landing template they could rebrand quickly without losing accessibility or dark-mode support.",
                ru: "IT-консалтинги постоянно просили гибкий шаблон лендинга, который можно быстро отбрендировать без потери доступности и тёмной темы."
            },
            solution: {
                en: "A modular React + Shadcn/UI template with theme tokens, copy slots, and pre-wired sections (hero, services, pricing, testimonials, contact).",
                ru: "Модульный шаблон на React + Shadcn/UI: тематические токены, слоты для копирайта и преднастроенные секции (hero, услуги, цены, отзывы, контакты)."
            },
            keyFeatures: {
                en: [
                    "Dark / light mode with theme tokens",
                    "Shadcn/UI accessible primitives",
                    "Pre-built service / pricing / testimonial blocks",
                    "Configurable from a single content file",
                    "Vite-fast dev experience"
                ],
                ru: [
                    "Тёмный/светлый режим на токенах",
                    "Доступные примитивы Shadcn/UI",
                    "Готовые блоки услуг, цен и отзывов",
                    "Настройка из одного файла контента",
                    "Быстрый dev-опыт на Vite"
                ]
            },
            github: "https://github.com/Mhmdaris15/recursive-landing-page"
        },
        {
            id: 10,
            slug: "localreach-spb",
            title: { en: "LocalReach SPB", ru: "LocalReach SPB" },
            category: { en: "Full-Stack / Data Scraping", ru: "Full-Stack / Скрапинг" },
            technologies: "Python, Gradio, Apify, QR Codes",
            image: "/images/project-3.webp",
            year: "2025",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Tool for searching Saint Petersburg businesses via Yandex Maps, generating tracked QR codes per business, and monitoring flyer scan analytics with a trilingual UI.",
                ru: "Инструмент для поиска бизнесов в Санкт-Петербурге через Яндекс.Карты, генерации QR-кодов с трекингом и аналитики сканирований флаеров — с трёхъязычным интерфейсом."
            },
            problem: {
                en: "A flyer-distribution startup couldn't measure whether physical flyers actually drove store visits — there was no way to attribute foot traffic to specific drops.",
                ru: "Стартап по распространению флаеров не мог измерять, приводят ли бумажные флаеры реальные визиты — не было атрибуции трафика к конкретным раздачам."
            },
            solution: {
                en: "LocalReach scrapes Yandex Maps for businesses, generates one tracked QR per drop, then exposes a Gradio dashboard with scan-by-day-and-location analytics.",
                ru: "LocalReach парсит Яндекс.Карты, генерирует уникальный QR с трекингом на каждую раздачу и показывает аналитику по дням и локациям в дашборде на Gradio."
            },
            keyFeatures: {
                en: [
                    "Yandex Maps scraping via Apify actors",
                    "Per-drop tracked QR generation",
                    "Scan analytics dashboard (Gradio)",
                    "Trilingual UI (RU / EN / ID)",
                    "JSON-backed lightweight storage"
                ],
                ru: [
                    "Скрапинг Яндекс.Карт через акторы Apify",
                    "Уникальный QR с трекингом на каждую раздачу",
                    "Дашборд аналитики на Gradio",
                    "Трёхъязычный интерфейс (RU / EN / ID)",
                    "Лёгкое JSON-хранилище"
                ]
            },
            github: "https://github.com/Mhmdaris15/yandex-maps-scraping"
        },
        {
            id: 11,
            slug: "client-report-automation",
            title: { en: "Client Report Automation", ru: "Автоматизация клиентских отчётов" },
            category: { en: "Data Engineering / Automation", ru: "Data Engineering / Автоматизация" },
            technologies: "Python, Polars, Google Drive API, AWS S3, Redshift",
            image: "/images/project-4.webp",
            year: "2025",
            role: { en: "Data Engineer", ru: "Data-инженер" },
            description: {
                en: "End-to-end pipeline that automates downloading, standardizing, and consolidating client reports from Google Drive to S3 with Polars/Parquet optimization and incremental updates.",
                ru: "Сквозной пайплайн: автоматическая загрузка, стандартизация и консолидация клиентских отчётов из Google Drive в S3 с Polars/Parquet и инкрементальным обновлением."
            },
            problem: {
                en: "Analysts at Demandlane spent hours every week downloading client report CSVs from Google Drive, normalizing schemas by hand, and re-uploading the result to Redshift.",
                ru: "Аналитики Demandlane тратили часы каждую неделю на скачивание CSV из Google Drive, ручную нормализацию схем и загрузку в Redshift."
            },
            solution: {
                en: "An incremental Polars-based pipeline that detects new files, standardizes schemas, writes Parquet to S3, and runs idempotent COPY into Redshift — turning a half-day chore into a 5-minute scheduled job.",
                ru: "Инкрементальный пайплайн на Polars: детекция новых файлов, стандартизация схем, запись Parquet в S3, идемпотентный COPY в Redshift — полудневная рутина превратилась в 5-минутную задачу по расписанию."
            },
            keyFeatures: {
                en: [
                    "Incremental file detection on Google Drive",
                    "Polars-based schema standardization",
                    "Parquet output to S3",
                    "Idempotent Redshift COPY",
                    "Slack alerts on failure"
                ],
                ru: [
                    "Инкрементальная детекция файлов в Google Drive",
                    "Стандартизация схем на Polars",
                    "Вывод Parquet в S3",
                    "Идемпотентный COPY в Redshift",
                    "Slack-уведомления об ошибках"
                ]
            },
            github: "https://github.com/Mhmdaris15/client_report_automation"
        },
        {
            id: 12,
            slug: "data-analytics-automation",
            title: { en: "Data Analytics Automation Suite", ru: "Набор автоматизаций для аналитики данных" },
            category: { en: "Data Engineering / Automation", ru: "Data Engineering / Автоматизация" },
            technologies: "Python, Tableau API, Redshift, Google Sheets, Slack",
            image: "/images/project-5.webp",
            year: "2024",
            role: { en: "Data Engineer", ru: "Data-инженер" },
            description: {
                en: "Centralized repository of Demandlane analytics automations including Tableau extraction, email reporting, Mass Tort workflows, and RMKT daily reports with Redshift integration.",
                ru: "Централизованный репозиторий аналитических автоматизаций Demandlane: экспорт Tableau, email-отчёты, воркфлоу Mass Tort и ежедневные отчёты RMKT с интеграцией Redshift."
            },
            problem: {
                en: "Analytics automations were scattered across half a dozen one-off scripts maintained by different people, with no shared logging, scheduling, or secret management.",
                ru: "Аналитические автоматизации были раскиданы по полудюжине скриптов от разных людей — без общего логирования, расписания и менеджмента секретов."
            },
            solution: {
                en: "I consolidated everything into a single repo with a shared utility layer, common config, structured logging, and a dispatcher that schedules each job — with Slack notifications on every run.",
                ru: "Свёл всё в один репозиторий: общий слой утилит, общий конфиг, структурное логирование и диспетчер для расписания — с уведомлениями в Slack на каждый запуск."
            },
            keyFeatures: {
                en: [
                    "Tableau extract automation",
                    "Mass Tort campaign reporting",
                    "RMKT daily reports to Redshift",
                    "Email + Slack notification fan-out",
                    "Centralized secrets and logging"
                ],
                ru: [
                    "Автоматизация экспортов Tableau",
                    "Отчёты по кампаниям Mass Tort",
                    "Ежедневные отчёты RMKT в Redshift",
                    "Веер уведомлений Email + Slack",
                    "Централизованные секреты и логирование"
                ]
            },
            github: "https://github.com/Mhmdaris15/data-analytics-automation"
        },
        {
            id: 13,
            slug: "analytics-engineer-api",
            title: { en: "Analytics Engineer API", ru: "Analytics Engineer API" },
            category: { en: "Data Engineering", ru: "Data Engineering" },
            technologies: "FastAPI, MongoDB, Pydantic, Docker",
            image: "/images/placeholder.webp",
            year: "2025",
            role: { en: "Backend Developer", ru: "Backend-разработчик" },
            description: {
                en: "FastAPI mock email service generating invoice data with intentional schema drift to test data engineering skills and pipeline robustness.",
                ru: "FastAPI-мок email-сервиса, генерирующий данные счетов с намеренным дрейфом схемы — для проверки навыков Data Engineering и устойчивости пайплайнов."
            },
            problem: {
                en: "Hiring managers had no realistic way to test data engineering candidates against the real-world chaos of inconsistent schemas, weird nulls, and fields that change format mid-month.",
                ru: "У нанимающих менеджеров не было реалистичного способа проверить кандидатов на Data Engineering на реальном хаосе: непостоянных схемах, странных null и полях, меняющих формат посреди месяца."
            },
            solution: {
                en: "A FastAPI service that emits invoice data with controllable, deterministic schema drift — letting interviewers verify whether a candidate's pipeline survives reality, not just the happy path.",
                ru: "FastAPI-сервис, выдающий данные счетов с управляемым детерминированным дрейфом схемы — собеседующие проверяют, выживает ли пайплайн кандидата в реальности, а не только в happy-path."
            },
            keyFeatures: {
                en: [
                    "Deterministic schema drift generator",
                    "Configurable null / format chaos modes",
                    "MongoDB-backed scenario history",
                    "Pydantic-typed contracts",
                    "Dockerized for portable interviews"
                ],
                ru: [
                    "Детерминированный генератор дрейфа схемы",
                    "Настраиваемые режимы хаоса с null и форматами",
                    "История сценариев в MongoDB",
                    "Типизированные контракты на Pydantic",
                    "Docker — переносимый формат для интервью"
                ]
            },
            github: "https://github.com/Mhmdaris15/analytics-engineer-api"
        },
        {
            id: 14,
            slug: "windows-command-api",
            title: { en: "Windows Command API", ru: "Windows Command API" },
            category: { en: "Backend / DevOps", ru: "Backend / DevOps" },
            technologies: "FastAPI, Python, PowerShell, Webhooks, HMAC",
            image: "/images/project-1.webp",
            year: "2025",
            role: { en: "Backend / DevOps", ru: "Backend / DevOps" },
            description: {
                en: "FastAPI app for executing PowerShell and CMD commands via REST with webhook support, API key auth, HMAC security, and detailed logging for Windows automation.",
                ru: "FastAPI-приложение для запуска PowerShell и CMD-команд через REST: webhook-поддержка, API-ключи, HMAC-подпись и подробное логирование для Windows-автоматизации."
            },
            problem: {
                en: "A Windows-only ops team needed to trigger PowerShell jobs remotely from CI/CD systems and webhooks, but exposing PowerShell directly is a security nightmare.",
                ru: "Windows-only ops команде нужно было запускать PowerShell-задачи удалённо из CI/CD и через webhook'и, но прямой доступ к PowerShell — кошмар с точки зрения безопасности."
            },
            solution: {
                en: "A locked-down FastAPI gateway: API keys, HMAC-signed webhooks, allowlisted commands, and structured audit logs — so the team gets remote automation without giving anyone shell access.",
                ru: "Закрытый FastAPI-шлюз: API-ключи, HMAC-подписанные webhook'и, allowlist команд и структурный аудит-лог — команда получает удалённую автоматизацию без выдачи shell-доступа."
            },
            keyFeatures: {
                en: [
                    "API-key + HMAC webhook auth",
                    "Allowlisted command catalog",
                    "Structured audit logging",
                    "Webhook fan-out to Slack",
                    "Cloudflare Tunnel-friendly deploy"
                ],
                ru: [
                    "Авторизация API-ключи + HMAC webhook'и",
                    "Allowlist каталога команд",
                    "Структурный аудит-лог",
                    "Веер webhook'ов в Slack",
                    "Деплой через Cloudflare Tunnel"
                ]
            },
            github: "https://github.com/Mhmdaris15/cloudflare-tunnel"
        },
        {
            id: 15,
            slug: "aimo-math-solver",
            title: { en: "AIMO Math Solver", ru: "AIMO — решатель математики" },
            category: { en: "AI / LLM", ru: "AI / LLM" },
            technologies: "vLLM, Qwen, DeepSeek-R1, Python, Kaggle",
            image: "/images/project-2.webp",
            year: "2025",
            role: { en: "AI Engineer", ru: "AI-инженер" },
            description: {
                en: "Advanced LLM solution for mathematical problem-solving using self-consistency chain-of-thought, entropy-weighted voting, and tool-integrated reasoning on vLLM inference.",
                ru: "Продвинутое LLM-решение для математических задач: self-consistency chain-of-thought, голосование с весами энтропии и tool-integrated reasoning на инференсе vLLM."
            },
            problem: {
                en: "Naïve LLM math solvers hallucinate confident wrong answers; off-the-shelf chain-of-thought isn't reliable enough for AIMO-grade problems with strict accuracy requirements.",
                ru: "Наивные LLM-решатели уверенно галлюцинируют; готовый chain-of-thought ненадёжен для задач уровня AIMO с жёсткими требованиями точности."
            },
            solution: {
                en: "A multi-sample self-consistency pipeline on vLLM, with entropy-weighted voting across DeepSeek-R1 and Qwen reasoning traces and a Python tool-execution layer for arithmetic verification.",
                ru: "Multi-sample self-consistency пайплайн на vLLM: голосование с весами энтропии по reasoning-следам DeepSeek-R1 и Qwen, плюс Python-исполнение инструментов для арифметической проверки."
            },
            keyFeatures: {
                en: [
                    "Self-consistency multi-sample reasoning",
                    "Entropy-weighted answer voting",
                    "Tool-integrated Python execution",
                    "vLLM batched inference",
                    "Kaggle competition harness"
                ],
                ru: [
                    "Multi-sample reasoning с self-consistency",
                    "Голосование с весами энтропии",
                    "Tool-integrated Python-исполнение",
                    "Батч-инференс на vLLM",
                    "Каркас под Kaggle-соревнование"
                ]
            },
            github: "https://github.com/Mhmdaris15/ai-mo-competition"
        },
        {
            id: 16,
            slug: "whatsapp-autoreply-bot",
            title: { en: "WhatsApp Auto-Reply Chatbot", ru: "WhatsApp авто-ответчик" },
            category: { en: "Automation / AI", ru: "Автоматизация / AI" },
            technologies: "Python, Selenium, Gemini API, ChromeDriver",
            image: "/images/project-3.webp",
            year: "2024",
            role: { en: "AI / Automation Engineer", ru: "AI / Automation инженер" },
            description: {
                en: "Python chatbot for WhatsApp Web that auto-replies with Google Gemini, maintains conversation memory, and learns customer profiles for support workflows.",
                ru: "Python-бот для WhatsApp Web с авто-ответами на Google Gemini, памятью диалогов и профилями клиентов для саппорта."
            },
            problem: {
                en: "Small Indonesian SMBs use WhatsApp as their only customer channel and lose orders the moment the owner steps away. Off-the-shelf bots required Business API onboarding most couldn't get.",
                ru: "Малые бизнесы в Индонезии используют WhatsApp как единственный канал и теряют заказы, как только владелец отходит. Готовые боты требовали онбординг Business API, недоступный большинству."
            },
            solution: {
                en: "A Selenium-driven WhatsApp Web bot that wraps Gemini with per-customer memory and tone matching — runs on the owner's own laptop, no Business API needed.",
                ru: "Бот на Selenium для WhatsApp Web с обёрткой над Gemini, памятью на клиента и подбором тона — работает на ноутбуке владельца, без Business API."
            },
            keyFeatures: {
                en: [
                    "Selenium-driven WhatsApp Web automation",
                    "Gemini-powered replies with tone matching",
                    "Per-customer memory profiles",
                    "Owner takeover hand-off",
                    "No Business API required"
                ],
                ru: [
                    "Автоматизация WhatsApp Web через Selenium",
                    "Ответы Gemini с подбором тона",
                    "Профили памяти на клиента",
                    "Передача чата владельцу",
                    "Не требует Business API"
                ]
            },
            github: "https://github.com/Mhmdaris15/chtbot"
        },
        {
            id: 17,
            slug: "permira-spb-cms",
            title: { en: "PERMIRA SPB CMS", ru: "PERMIRA SPB — CMS" },
            category: { en: "Full-Stack / CMS", ru: "Full-Stack / CMS" },
            technologies: "Strapi v5, Node.js, TypeScript, PostgreSQL",
            image: "/images/project-4.webp",
            year: "2025",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Headless CMS built with Strapi for managing the Indonesian Student Association's digital content—articles, events, members, galleries, and FAQs.",
                ru: "Headless CMS на Strapi для управления контентом ассоциации индонезийских студентов: статьи, события, участники, галереи и FAQ."
            },
            problem: {
                en: "PERMIRA SPB had content scattered across WhatsApp, Notion, and Google Docs — making the public website constantly out of date.",
                ru: "Контент PERMIRA SPB был раскидан по WhatsApp, Notion и Google Docs — публичный сайт постоянно устаревал."
            },
            solution: {
                en: "A Strapi v5 headless CMS with role-based publishing, scheduled releases, image transformations, and a typed REST API the public site consumes directly.",
                ru: "Strapi v5 headless CMS: ролевая публикация, отложенные релизы, трансформация изображений и типизированный REST API, который публичный сайт потребляет напрямую."
            },
            keyFeatures: {
                en: [
                    "Role-based content publishing",
                    "Scheduled releases",
                    "Image transformation pipeline",
                    "Typed REST API consumed by Next.js",
                    "PostgreSQL-backed audit log"
                ],
                ru: [
                    "Ролевая публикация контента",
                    "Отложенные релизы",
                    "Пайплайн трансформации изображений",
                    "Типизированный REST API для Next.js",
                    "Аудит-лог в PostgreSQL"
                ]
            },
            github: "https://github.com/Mhmdaris15/Permira-SPB"
        },
        {
            id: 18,
            slug: "erpnext-recursive",
            title: { en: "ERPNext Recursive Deployment", ru: "ERPNext Recursive — деплой" },
            category: { en: "DevOps / Infrastructure", ru: "DevOps / Инфраструктура" },
            technologies: "Docker, Docker Compose, Frappe, ERPNext",
            image: "/images/project-5.webp",
            year: "2024",
            role: { en: "DevOps Engineer", ru: "DevOps-инженер" },
            description: {
                en: "Production-ready Docker configuration for deploying Frappe and ERPNext with multi-tenancy, automated backups, and operations runbooks.",
                ru: "Готовая к продакшену Docker-конфигурация для деплоя Frappe и ERPNext: мультиарендность, автобэкапы и операционные runbook'и."
            },
            problem: {
                en: "Restaurants wanted ERPNext for inventory and HR but the official deploy story was either 'hosted' (expensive) or 'manual install' (fragile).",
                ru: "Ресторанам нужен был ERPNext под склад и HR, но официальный деплой — либо 'хостед' (дорого), либо 'ручная установка' (хрупко)."
            },
            solution: {
                en: "A reproducible Docker Compose stack with multi-tenant sites, daily encrypted backups to S3, and runbooks for common ops scenarios — restaurant chains can self-host predictably.",
                ru: "Воспроизводимый Docker Compose стек: мультиарендные сайты, ежедневные шифрованные бэкапы в S3, runbook'и под типовые сценарии — сети ресторанов хостят сами предсказуемо."
            },
            keyFeatures: {
                en: [
                    "Multi-tenant Frappe sites in one stack",
                    "Daily encrypted backups to S3",
                    "One-command restore",
                    "Runbooks for common ops",
                    "Reverse-proxy + TLS via Traefik"
                ],
                ru: [
                    "Мультиарендные сайты Frappe в одном стеке",
                    "Ежедневные шифрованные бэкапы в S3",
                    "Восстановление одной командой",
                    "Runbook'и под типовые операции",
                    "Reverse-proxy + TLS через Traefik"
                ]
            },
            github: "https://github.com/Mhmdaris15/ERPNext-Recursive"
        },
        {
            id: 19,
            slug: "coderun-yandex-automation",
            title: { en: "CodeRun Yandex Automation", ru: "Автоматизация CodeRun Яндекс" },
            category: { en: "Automation / AI", ru: "Автоматизация / AI" },
            technologies: "Python, DeepSeek API, Selenium, REST",
            image: "/images/placeholder.webp",
            year: "2025",
            role: { en: "Automation Engineer", ru: "Automation-инженер" },
            description: {
                en: "Python automation tool that solves CodeRun Yandex programming problems using DeepSeek API with auto-submission and checkpoint resume.",
                ru: "Python-инструмент: решает задачи CodeRun на Яндексе через DeepSeek API с автосабмитом и продолжением с чекпоинта."
            },
            problem: {
                en: "Solving 100+ Yandex CodeRun problems by hand to qualify for a hiring track was a time sink that didn't reflect on-the-job skill.",
                ru: "Решать вручную 100+ задач Яндекс CodeRun ради попадания в hiring-трек — слив времени, не отражающий реальных рабочих скиллов."
            },
            solution: {
                en: "A pipeline that fetches each problem, generates a solution via DeepSeek with a verification loop, and auto-submits — with checkpoint resume so a crash doesn't lose progress.",
                ru: "Пайплайн: тянет каждую задачу, генерирует решение через DeepSeek с циклом проверки и автосабмитит — с чекпоинтами, чтобы краш не сбрасывал прогресс."
            },
            keyFeatures: {
                en: [
                    "Problem fetcher via Selenium",
                    "DeepSeek-based solution generation",
                    "Local verification loop",
                    "Auto-submission with retries",
                    "Checkpoint / resume after crash"
                ],
                ru: [
                    "Загрузка задач через Selenium",
                    "Генерация решений через DeepSeek",
                    "Локальный цикл проверки",
                    "Автосабмит с ретраями",
                    "Чекпоинты и продолжение после краша"
                ]
            },
            github: "https://github.com/Mhmdaris15/Yandex-Winter-Code"
        },
        {
            id: 20,
            slug: "dbt-funnel-events",
            title: { en: "dbt Funnel Web Events Model", ru: "dbt-модель воронки веб-событий" },
            category: { en: "Data Engineering / Analytics", ru: "Data Engineering / Аналитика" },
            technologies: "dbt, SQL, Analytics Engineering",
            image: "/images/project-1.webp",
            year: "2024",
            role: { en: "Analytics Engineer", ru: "Analytics-инженер" },
            description: {
                en: "dbt SQL transformation model aggregating web event data from Yonyx, Clickfunnels, CRM, and monitoring systems into a unified funnel.",
                ru: "dbt SQL-трансформация: агрегирует веб-события из Yonyx, Clickfunnels, CRM и систем мониторинга в единую воронку."
            },
            problem: {
                en: "Marketing's funnel metrics drifted from sales' because each tool had its own definition of 'lead', 'qualified', and 'converted'.",
                ru: "Метрики воронки маркетинга расходились с продажами: каждый инструмент имел своё определение 'лид', 'квалифицирован' и 'конверсия'."
            },
            solution: {
                en: "A dbt project with staging, intermediate, and mart layers that harmonizes event semantics across Yonyx, Clickfunnels, the CRM, and monitoring — one source of truth, with tests and lineage.",
                ru: "dbt-проект со слоями staging / intermediate / marts, гармонизирующий семантику событий между Yonyx, Clickfunnels, CRM и мониторингом — единый источник правды с тестами и lineage."
            },
            keyFeatures: {
                en: [
                    "Layered dbt project (staging / intermediate / marts)",
                    "Cross-tool event harmonization",
                    "Schema and uniqueness tests",
                    "Documented lineage",
                    "Incremental funnel model"
                ],
                ru: [
                    "Слоистый dbt-проект (staging / intermediate / marts)",
                    "Гармонизация событий между инструментами",
                    "Тесты схемы и уникальности",
                    "Документированный lineage",
                    "Инкрементальная модель воронки"
                ]
            },
            github: "https://github.com/Mhmdaris15/dbt"
        },
        {
            id: 21,
            slug: "russia-life-presentation",
            title: { en: "Russia Daily Life Presentation", ru: "Презентация о жизни в России" },
            category: { en: "Educational / Web", ru: "Образовательный / Веб" },
            technologies: "React 19, TypeScript, Tailwind v4, Vite",
            image: "/images/project-2.webp",
            year: "2025",
            role: { en: "Frontend Developer", ru: "Frontend-разработчик" },
            description: {
                en: "Interactive Toastmasters presentation comparing Western media narratives vs. reality of Russian life across 11 slides with keyboard navigation.",
                ru: "Интерактивная Toastmasters-презентация: сравнение нарративов западных СМИ и реальности жизни в России — 11 слайдов с клавиатурной навигацией."
            },
            problem: {
                en: "Static slide decks make boring talks. I wanted a Toastmasters speech aid that I could keyboard-drive on stage and that visualized data interactively.",
                ru: "Статичные слайды делают доклады скучными. Хотел Toastmasters-инструмент: управление с клавиатуры на сцене и интерактивная визуализация данных."
            },
            solution: {
                en: "An 11-slide React 19 presentation with keyboard navigation, animated transitions, and interactive data visualizations — deployed on GitHub Pages.",
                ru: "Презентация на 11 слайдов на React 19: клавиатурная навигация, анимированные переходы и интерактивная визуализация данных — деплой на GitHub Pages."
            },
            keyFeatures: {
                en: [
                    "11 slide deck with React Router",
                    "Keyboard navigation (arrows / space)",
                    "Animated transitions",
                    "Interactive data visualizations",
                    "GitHub Pages deployment"
                ],
                ru: [
                    "11-слайдовая презентация на React Router",
                    "Клавиатурная навигация (стрелки / пробел)",
                    "Анимированные переходы",
                    "Интерактивная визуализация данных",
                    "Деплой на GitHub Pages"
                ]
            },
            github: "https://github.com/Mhmdaris15/comparing-life-in-russia-presentation"
        },
        {
            id: 22,
            slug: "laravel-pos",
            title: { en: "Laravel POS (App-Cashier)", ru: "Laravel POS (App-Cashier)" },
            category: { en: "Full-Stack / E-commerce", ru: "Full-Stack / E-commerce" },
            technologies: "Laravel, PHP, MySQL",
            image: "/images/project-3.webp",
            year: "2022",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Point-of-sale web application built with Laravel for transaction processing and cashier management.",
                ru: "POS веб-приложение на Laravel для обработки транзакций и работы кассиров."
            },
            problem: {
                en: "A small retail shop needed a POS that worked on the cheap browser-only computers they already owned, with no per-seat licensing.",
                ru: "Маленькому ритейл-магазину был нужен POS, работающий на дешёвых браузерных компьютерах, что уже были, без лицензий на рабочее место."
            },
            solution: {
                en: "A Laravel-based POS with cashier accounts, transaction logging, daily-summary reports, and a thin browser UI that runs on anything.",
                ru: "POS на Laravel: учётки кассиров, лог транзакций, ежедневные сводки и тонкий браузерный UI, запускающийся на чём угодно."
            },
            keyFeatures: {
                en: [
                    "Cashier accounts with shift logs",
                    "Transaction history and refund flow",
                    "Daily summary reports",
                    "MySQL-backed inventory",
                    "Browser-only UI"
                ],
                ru: [
                    "Учётки кассиров с логами смен",
                    "История транзакций и возвраты",
                    "Ежедневные сводки",
                    "Склад на MySQL",
                    "Только браузерный UI"
                ]
            },
            github: "https://github.com/Mhmdaris15/app-cashier"
        },
        {
            id: 23,
            slug: "nija-ordering",
            title: { en: "Nija Ordering System", ru: "Nija — система заказов" },
            category: { en: "Full-Stack", ru: "Full-Stack" },
            technologies: "Nest.js, React, Docker, GCP, PostgreSQL",
            image: "/images/project-4.webp",
            year: "2023",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Comprehensive restaurant management system for orders, menus, and payments. Features a PWA for mobile, integrated payment gateways, and Dockerized GCP deployment.",
                ru: "Комплексная система управления рестораном: заказы, меню, платежи. PWA для мобильного, платёжные шлюзы и Docker-деплой в GCP."
            },
            problem: {
                en: "An Indonesian restaurant chain wanted modern QR-table ordering and online payments without giving up to a third-party platform's commission.",
                ru: "Индонезийской сети ресторанов хотелось современный QR-заказ со столика и онлайн-оплату — без отчислений сторонней платформе."
            },
            solution: {
                en: "A Nest.js + React PWA with menu CMS, payment gateway integration, and a one-click Docker deploy to GCP — keeping all margin in-house.",
                ru: "PWA на Nest.js + React: CMS для меню, интеграция платёжных шлюзов и Docker-деплой в GCP в один клик — вся маржа остаётся в компании."
            },
            keyFeatures: {
                en: [
                    "QR-table ordering flow",
                    "Menu CMS with images",
                    "Payment gateway integration",
                    "Mobile PWA install",
                    "GCP-hosted with Docker"
                ],
                ru: [
                    "Заказ через QR со столика",
                    "CMS меню с картинками",
                    "Интеграция платёжных шлюзов",
                    "Установка как PWA на телефон",
                    "Хостинг GCP через Docker"
                ]
            },
            github: ""
        },
        {
            id: 24,
            slug: "pbsi-match-management",
            title: { en: "PBSI Match Management", ru: "PBSI — управление матчами" },
            category: { en: "Full-Stack / Real-time", ru: "Full-Stack / Real-time" },
            technologies: "Golang, React.js, WebSockets",
            image: "/images/project-5.webp",
            year: "2023",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Real-time badminton match management system with live scoring via WebSockets, scheduling, bracket generation, and tournament tracking.",
                ru: "Real-time система управления матчами по бадминтону: счёт через WebSocket, расписание, генерация турнирной сетки и отслеживание."
            },
            problem: {
                en: "PBSI tournaments depended on whiteboard scoreboards and manual paper brackets; the audience and broadcasters had no live feed.",
                ru: "Турниры PBSI шли с табло-маркерной доской и бумажными сетками; зрители и комментаторы не получали live-обновлений."
            },
            solution: {
                en: "A Go-backed WebSocket scoring system with auto-generated brackets, a public spectator page, and an organizer admin — built in two weeks for a real tournament.",
                ru: "Система счёта на Go и WebSocket: автогенерация сеток, публичная зрительская страница и админка организатора — собрана за две недели под реальный турнир."
            },
            keyFeatures: {
                en: [
                    "WebSocket live score broadcast",
                    "Auto-generated tournament brackets",
                    "Public spectator page",
                    "Organizer admin console",
                    "Match history archive"
                ],
                ru: [
                    "Трансляция счёта через WebSocket",
                    "Автогенерация турнирных сеток",
                    "Публичная страница для зрителей",
                    "Админка для организатора",
                    "Архив истории матчей"
                ]
            },
            github: ""
        },
        {
            id: 25,
            slug: "evoting-web-app",
            title: { en: "E-Voting Web App", ru: "E-Voting веб-приложение" },
            category: { en: "Full-Stack", ru: "Full-Stack" },
            technologies: "PHP, Bootstrap, MySQL, jQuery",
            image: "/images/project-1.webp",
            year: "2022",
            role: { en: "Full-Stack Developer", ru: "Full-Stack разработчик" },
            description: {
                en: "Modern voting application for student council elections with secure authentication, candidate management, and real-time vote counting.",
                ru: "Современное приложение для выборов студсовета: безопасная авторизация, управление кандидатами и подсчёт голосов в реальном времени."
            },
            problem: {
                en: "Paper-ballot student elections were error-prone, slow to count, and easy to dispute.",
                ru: "Бумажные студенческие выборы — ошибки, медленный подсчёт и лёгкие споры."
            },
            solution: {
                en: "A PHP-based e-voting app with one-vote-per-student auth, encrypted vote storage, and a live counting dashboard — used in a real student council election.",
                ru: "E-voting приложение на PHP: один голос на студента, шифрованное хранилище голосов и live-дашборд подсчёта — использовалось на реальных выборах студсовета."
            },
            keyFeatures: {
                en: [
                    "One-vote-per-student auth",
                    "Candidate management UI",
                    "Encrypted vote storage",
                    "Live counting dashboard",
                    "Audit log of every action"
                ],
                ru: [
                    "Один голос на студента",
                    "UI управления кандидатами",
                    "Шифрованное хранилище голосов",
                    "Live-дашборд подсчёта",
                    "Аудит-лог всех действий"
                ]
            },
            github: ""
        },
        {
            id: 26,
            slug: "face-recognition-attendance",
            title: { en: "Face Recognition Attendance", ru: "Распознавание лиц для посещаемости" },
            category: { en: "AI / ML", ru: "AI / ML" },
            technologies: "Python, TensorFlow, OpenCV",
            image: "/images/project-2.webp",
            year: "2022",
            role: { en: "AI Engineer", ru: "AI-инженер" },
            description: {
                en: "AI-powered attendance system that detects and recognizes faces in real-time video streams for automated tracking in educational institutions.",
                ru: "AI-система учёта посещаемости: детектирует и распознаёт лица в реальном времени из видеопотока для автоматического трекинга в учебных заведениях."
            },
            problem: {
                en: "Manual attendance roll-call wasted 10–15 minutes of every class period and produced unreliable records.",
                ru: "Ручная перекличка отнимала 10–15 минут урока и давала ненадёжные записи."
            },
            solution: {
                en: "A Python + TensorFlow pipeline that detects and recognizes faces from a classroom camera, marks attendance automatically, and exports a CSV at the end of class.",
                ru: "Пайплайн на Python + TensorFlow: детекция и распознавание лиц с камеры класса, автоматическая отметка и экспорт CSV в конце занятия."
            },
            keyFeatures: {
                en: [
                    "Real-time face detection (OpenCV)",
                    "FaceNet-style recognition",
                    "Per-class CSV export",
                    "Confidence-thresholded marks",
                    "Privacy-aware local storage"
                ],
                ru: [
                    "Real-time детекция лиц (OpenCV)",
                    "Распознавание в стиле FaceNet",
                    "Экспорт CSV по классу",
                    "Отметки с порогом уверенности",
                    "Локальное хранение с учётом приватности"
                ]
            },
            github: ""
        },
        {
            id: 27,
            slug: "kisa-promotion",
            title: { en: "KIsA Promotion Website", ru: "KIsA — промо-сайт" },
            category: { en: "Web Development", ru: "Веб-разработка" },
            technologies: "React, Firebase, Frontend",
            image: "/images/project-3.webp",
            year: "2022",
            role: { en: "Frontend Developer", ru: "Frontend-разработчик" },
            description: {
                en: "Promotional website for Kampung Inggris Pare with modern UI/UX, Firebase data integration, and fully responsive layouts.",
                ru: "Промо-сайт Kampung Inggris Pare: современный UI/UX, интеграция Firebase и полная адаптивность."
            },
            problem: {
                en: "Kampung Inggris Pare's existing site was a static brochure that couldn't show real-time program info or capture leads.",
                ru: "Существующий сайт Kampung Inggris Pare был статичной брошюрой — не показывал актуальную информацию о программах и не собирал лиды."
            },
            solution: {
                en: "A React site backed by Firebase for program content, lead capture, and analytics — easy enough for non-technical staff to update.",
                ru: "React-сайт на Firebase: контент программ, сбор лидов и аналитика — удобно обновляется неспециалистами."
            },
            keyFeatures: {
                en: [
                    "Firebase-backed program content",
                    "Lead capture form",
                    "Mobile-responsive layout",
                    "Modern UI/UX",
                    "Analytics integration"
                ],
                ru: [
                    "Контент программ на Firebase",
                    "Форма захвата лидов",
                    "Адаптивная мобильная вёрстка",
                    "Современный UI/UX",
                    "Интеграция аналитики"
                ]
            },
            github: ""
        },
        {
            id: 28,
            slug: "data-science-competitions",
            title: { en: "Data Science Competition Wins", ru: "Победы в Data Science соревнованиях" },
            category: { en: "Data Science / ML", ru: "Data Science / ML" },
            technologies: "Python, Pandas, Scikit-learn, TensorFlow, NLP",
            image: "/images/project-4.webp",
            year: "2023",
            role: { en: "Data Scientist", ru: "Data Scientist" },
            description: {
                en: "Award-winning data science projects from KKSI and LKS competitions—time series for currency prediction, sentiment analysis, and face recognition. 1st place at LKS Data Science West Java 2023.",
                ru: "Призовые data-science проекты в KKSI и LKS: временные ряды для прогноза курса, sentiment-анализ и распознавание лиц. 1 место на LKS Data Science Западная Ява 2023."
            },
            problem: {
                en: "Competition problems demanded production-grade solutions in 24-48 hour windows: clean data, train, validate, deploy a demo, and present.",
                ru: "Задачи соревнований требовали production-решений за 24–48 часов: чистка данных, обучение, валидация, демо-деплой и презентация."
            },
            solution: {
                en: "Repeatable competition harness covering EDA, feature engineering, baseline + boosted models, and a reproducible notebook — won 1st place at LKS West Java 2023.",
                ru: "Воспроизводимый competition-каркас: EDA, feature engineering, baseline + бустинг и reproducible-ноутбук — взял 1 место на LKS Западная Ява 2023."
            },
            keyFeatures: {
                en: [
                    "Currency time-series forecasting",
                    "Tweet sentiment classification",
                    "Face recognition demo",
                    "Reproducible notebook harness",
                    "1st Place — LKS Data Science West Java 2023"
                ],
                ru: [
                    "Прогноз курса валют по временным рядам",
                    "Sentiment-классификация твитов",
                    "Демо распознавания лиц",
                    "Воспроизводимый каркас ноутбука",
                    "1 место — LKS Data Science Западная Ява 2023"
                ]
            },
            github: ""
        },
        {
            id: 29,
            slug: "nike-landing-page",
            title: { en: "Nike Landing Page", ru: "Лендинг Nike" },
            category: { en: "Landing Page", ru: "Лендинг" },
            technologies: "React.js, Tailwind CSS, Vite",
            image: "/images/project-5.webp",
            year: "2024",
            role: { en: "Frontend Developer", ru: "Frontend-разработчик" },
            description: {
                en: "Nike-style product showcase built with Tailwind CSS featuring product highlights, testimonials, and responsive design patterns.",
                ru: "Витрина в стиле Nike на Tailwind CSS: подборки товаров, отзывы и адаптивные паттерны."
            },
            problem: {
                en: "I wanted a portfolio piece that showed I could match a global brand's visual language and ship a polished marketing page.",
                ru: "Хотел в портфолио кейс, показывающий, что могу попадать в визуальный язык глобального бренда и доставлять отполированный маркетинг-лендинг."
            },
            solution: {
                en: "A Nike-styled React + Tailwind landing with product sections, testimonials, and motion that mirrors the real Nike site — a teaching reference for clean Tailwind patterns.",
                ru: "Лендинг на React + Tailwind в стиле Nike: секции товаров, отзывы и анимация, повторяющая реальный сайт Nike — хороший учебный референс по Tailwind."
            },
            keyFeatures: {
                en: [
                    "Brand-faithful Nike visual language",
                    "Tailwind utility patterns",
                    "Smooth section reveals",
                    "Mobile-first responsive",
                    "Vite-fast bundle"
                ],
                ru: [
                    "Точный визуальный язык Nike",
                    "Утилитарные паттерны Tailwind",
                    "Плавные раскрытия секций",
                    "Mobile-first адаптив",
                    "Быстрый бандл на Vite"
                ]
            },
            github: "https://github.com/Mhmdaris15/nike_landing_page"
        },
        {
            id: 30,
            slug: "stifin-landing-page",
            title: { en: "STIFIn Test Landing Page", ru: "Лендинг STIFIn Test" },
            category: { en: "Landing Page", ru: "Лендинг" },
            technologies: "React.js, HTML, CSS, JavaScript",
            image: "/images/placeholder.webp",
            year: "2023",
            role: { en: "Frontend Developer", ru: "Frontend-разработчик" },
            description: {
                en: "Educational landing page promoting the STIFIn Test platform with pricing, features, and contact sections.",
                ru: "Образовательный лендинг STIFIn Test: цены, преимущества и контакты."
            },
            problem: {
                en: "STIFIn needed a conversion-focused page with clear pricing tiers and a low-friction contact form.",
                ru: "STIFIn нужна была страница, заточенная на конверсию: понятные тарифы и контактная форма с минимумом трения."
            },
            solution: {
                en: "A React landing with hero, features, pricing tiers, FAQ, and a contact section that funnels every CTA to a single inquiry endpoint.",
                ru: "React-лендинг: hero, преимущества, тарифы, FAQ и контактная секция — все CTA сходятся в одну точку запроса."
            },
            keyFeatures: {
                en: [
                    "Hero with single-CTA",
                    "Pricing tier comparison",
                    "FAQ accordion",
                    "Inquiry form",
                    "Mobile responsive"
                ],
                ru: [
                    "Hero с единственным CTA",
                    "Сравнение тарифов",
                    "FAQ-аккордеон",
                    "Форма запроса",
                    "Адаптивная мобильная вёрстка"
                ]
            },
            github: "https://github.com/Mhmdaris15/STIFIn-Landing-Page"
        }
    ] as Project[],
    services: [
        {
            id: "landing",
            title: { en: "Landing Page", ru: "Лендинг" },
            tagline: { en: "Marketing Site", ru: "Маркетинговый сайт" },
            icon: "rocket",
            popular: false,
            priceFromUsd: "$300",
            priceFromRub: "₽25 000",
            timeline: { en: "1–2 weeks", ru: "1–2 недели" },
            description: {
                en: "Modern, responsive landing pages and marketing sites with animations, SEO optimization, and analytics integration.",
                ru: "Современные адаптивные лендинги и маркетинговые сайты: анимации, SEO-оптимизация и интеграция аналитики."
            },
            includes: {
                en: ["Custom design", "Responsive (mobile-first)", "SEO meta tags", "Contact form", "Analytics setup"],
                ru: ["Индивидуальный дизайн", "Адаптив (mobile-first)", "SEO-метатеги", "Форма обратной связи", "Настройка аналитики"]
            },
            stack: ["Next.js", "React", "Tailwind", "Framer Motion"]
        },
        {
            id: "fullstack",
            title: { en: "Full-Stack MVP", ru: "Full-Stack MVP" },
            tagline: { en: "Most Popular", ru: "Самое популярное" },
            icon: "stack",
            popular: true,
            priceFromUsd: "$1,500",
            priceFromRub: "₽135 000",
            timeline: { en: "3–6 weeks", ru: "3–6 недель" },
            description: {
                en: "Production-ready MVPs with auth, database, dashboards, and deployment. Ideal for startups validating product-market fit.",
                ru: "Готовые к продакшену MVP: авторизация, БД, дашборды и деплой. Идеально для стартапов, проверяющих product-market fit."
            },
            includes: {
                en: ["Auth & user management", "Database schema", "Admin dashboard", "REST API", "Docker deployment"],
                ru: ["Авторизация и управление пользователями", "Схема БД", "Админ-дашборд", "REST API", "Docker-деплой"]
            },
            stack: ["Next.js", "Go", "Node.js", "PostgreSQL", "Docker"]
        },
        {
            id: "ai",
            title: { en: "AI / RAG Chatbot", ru: "AI / RAG чат-бот" },
            tagline: { en: "LLM Integration", ru: "Интеграция LLM" },
            icon: "ai",
            popular: false,
            priceFromUsd: "$800",
            priceFromRub: "₽70 000",
            timeline: { en: "2–4 weeks", ru: "2–4 недели" },
            description: {
                en: "LLM-powered chatbots and RAG pipelines integrated into your product or messaging channels (WhatsApp, web, Slack).",
                ru: "Чат-боты и RAG-пайплайны на LLM, встроенные в продукт или мессенджеры (WhatsApp, веб, Slack)."
            },
            includes: {
                en: ["Vector DB setup", "RAG pipeline", "LLM integration", "Conversational memory", "Channel integration"],
                ru: ["Настройка векторной БД", "RAG-пайплайн", "Интеграция LLM", "Память диалога", "Интеграция канала"]
            },
            stack: ["Python", "FastAPI", "Gemini", "ChromaDB", "LangChain"]
        },
        {
            id: "data",
            title: { en: "Data Automation", ru: "Автоматизация данных" },
            tagline: { en: "Analytics & ETL", ru: "Аналитика и ETL" },
            icon: "data",
            popular: false,
            priceFromUsd: "$500",
            priceFromRub: "₽45 000",
            timeline: { en: "1–3 weeks", ru: "1–3 недели" },
            description: {
                en: "Automated reporting, ETL pipelines, dashboards, and scraping. Connect Google Drive, S3, Redshift, Tableau, Sheets, and more.",
                ru: "Автоматическая отчётность, ETL-пайплайны, дашборды и скрапинг. Подключение Google Drive, S3, Redshift, Tableau, Sheets и др."
            },
            includes: {
                en: ["ETL pipeline", "Scheduled automation", "Dashboard / report", "Data quality checks"],
                ru: ["ETL-пайплайн", "Запуск по расписанию", "Дашборд / отчёт", "Проверки качества данных"]
            },
            stack: ["Python", "dbt", "SQL", "Polars", "AWS"]
        },
        {
            id: "realtime",
            title: { en: "Real-time Systems", ru: "Real-time системы" },
            tagline: { en: "Live & Multiplayer", ru: "Live и мультиплеер" },
            icon: "bolt",
            popular: false,
            priceFromUsd: "$1,200",
            priceFromRub: "₽110 000",
            timeline: { en: "2–5 weeks", ru: "2–5 недель" },
            description: {
                en: "WebSocket-based live systems—scoring, dashboards, multiplayer, collaborative tools, live order tracking.",
                ru: "Live-системы на WebSocket: счёт, дашборды, мультиплеер, совместная работа, трекинг заказов."
            },
            includes: {
                en: ["WebSocket server", "Live UI updates", "Scalable architecture", "Load testing"],
                ru: ["WebSocket-сервер", "Live-обновления интерфейса", "Масштабируемая архитектура", "Нагрузочное тестирование"]
            },
            stack: ["Go", "Node.js", "Socket.io", "Redis", "React"]
        }
    ] as Service[],
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
            title: { en: "SYSTEMS ENGINEER", ru: "SYSTEMS-ИНЖЕНЕР" },
            description: {
                en: "Designing how the pieces fit — data, compute, queues, caches, failures",
                ru: "Проектирую, как соединяются части — данные, вычисления, очереди, кэши, отказы"
            },
            details: {
                en: "I think about systems before I think about code. Where does state live? What happens on retry? Which boundary is the contract? I read source — Postgres, Frappe, vLLM, ChromaDB, Lenis — to learn how good systems are built, then apply that lens to APIs, real-time platforms, ETL pipelines, and full-stack apps. Comfortable across Go, Python, TypeScript, and the boring infrastructure that keeps services up.",
                ru: "Думаю о системах прежде, чем о коде. Где живёт state? Что происходит на retry? Какая граница — контракт? Читаю исходники — Postgres, Frappe, vLLM, ChromaDB, Lenis — чтобы понять, как устроены хорошие системы, и применяю этот взгляд к API, real-time платформам, ETL-пайплайнам и full-stack приложениям. Уверенно работаю с Go, Python, TypeScript и скучной инфраструктурой, которая держит сервисы поднятыми."
            },
            tools: ["Golang", "Python", "Node.js", "PostgreSQL", "Redis", "Docker", "WebSockets", "AWS", "GCP", "System Design"]
        },
        design: {
            title: { en: "AI SYSTEMS ENGINEER", ru: "AI SYSTEMS ENGINEER" },
            description: {
                en: "RAG pipelines, LLM apps, and ML systems — from prototype to production",
                ru: "RAG-пайплайны, LLM-приложения и ML-системы — от прототипа до production"
            },
            details: {
                en: "Building production AI systems means more than calling an LLM. I design retrieval pipelines (chunking, hybrid search, reranking), LLM orchestration (tool use, MCP, prompt caching), agent loops with hard step budgets, evals in CI, observability, and cost control. Read the model docs and the system internals — vLLM batching scheduler, ChromaDB's HNSW, Anthropic's caching contract — and ship things that don't fall over.",
                ru: "Production AI-система — это не просто вызов LLM. Проектирую retrieval-пайплайны (chunking, гибридный поиск, реранк), LLM-оркестрацию (tool use, MCP, prompt-кэш), агент-циклы с жёсткими бюджетами шагов, eval в CI, observability и контроль стоимости. Читаю документацию моделей и внутренности систем — batching-планировщик vLLM, HNSW в ChromaDB, контракт кэширования Anthropic — и выпускаю то, что не падает."
            },
            tools: ["RAG", "Gemini", "Claude API", "vLLM", "ChromaDB", "MCP", "FastAPI", "TensorFlow", "Scikit-learn", "Python"]
        }
    }
};
