export type BlogSection =
    | { type: "p"; content: string }
    | { type: "h2"; content: string }
    | { type: "h3"; content: string }
    | { type: "list"; items: string[] }
    | { type: "ordered"; items: string[] }
    | { type: "code"; lang: string; content: string }
    | { type: "quote"; content: string };

interface BlogContent {
    title: string;
    excerpt: string;
    sections: BlogSection[];
}

export interface BlogPost {
    slug: string;
    date: string;
    readMinutes: number;
    tags: string[];
    en: BlogContent;
    ru: BlogContent;
}

export const posts: BlogPost[] = [
    {
        slug: "rise-of-mcp-2026",
        date: "2026-04-12",
        readMinutes: 6,
        tags: ["AI", "MCP", "Agents"],
        en: {
            title: "The Rise of MCP — Why Every AI Engineer Should Care in 2026",
            excerpt:
                "Model Context Protocol is becoming the USB-C of AI tools. Here's what it actually is, why it matters, and how to ship something useful with it this week.",
            sections: [
                { type: "p", content: "Every AI engineer I talk to has the same workflow problem: their LLM app needs to call tools, and every framework reinvents the integration layer. Last year that meant a half-broken plugin system per provider. In 2026, the answer most teams are converging on is the Model Context Protocol — MCP." },
                { type: "h2", content: "What MCP actually is" },
                { type: "p", content: "MCP is a transport-agnostic protocol that lets a model call out to external tools, fetch resources, and read prompts from any compliant server. Think of it as USB-C for AI tools: instead of building a custom integration for each model and each tool, you wire the tool up once as an MCP server and any client can use it." },
                { type: "p", content: "It's not a framework. It's a wire protocol with three primitives: tools (callable functions), resources (read-only data), and prompts (templated instructions)." },
                { type: "h2", content: "Why this matters now" },
                { type: "list", items: [
                    "Tool reuse: build once, plug into Claude, Cursor, ChatGPT, your custom agent — anything that speaks MCP.",
                    "Local-first agents: an MCP server can run on the user's machine, so file access and credentials never leave the device.",
                    "Composability: chain agents by exposing one agent's capabilities as MCP tools to another.",
                    "Auditability: protocol-level logging means every tool call is inspectable, which matters for compliance."
                ] },
                { type: "h2", content: "A minimal MCP server in Python" },
                { type: "code", lang: "python", content: "from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP('weather-server')\n\n@mcp.tool()\ndef get_weather(city: str) -> str:\n    \"\"\"Get the current weather for a city.\"\"\"\n    # call your weather API here\n    return f'Sunny, 24°C in {city}'\n\nif __name__ == '__main__':\n    mcp.run()" },
                { type: "p", content: "That's the entire server. Drop it in a Claude Desktop config, restart, and Claude can now check the weather for you. Same server works in Cursor, Continue, or any custom client." },
                { type: "h2", content: "Where it gets interesting" },
                { type: "p", content: "The non-obvious win is internal company tooling. A finance team can wrap their booking system as an MCP server. A DevOps team wraps Kubernetes as an MCP server. Now any AI client your developers use — Claude Code, Cursor, in-house agents — can interact with internal systems without anyone shipping a custom plugin." },
                { type: "p", content: "This is the realistic version of \"AI in the enterprise\" that doesn't require ripping out your stack." },
                { type: "h2", content: "The pitfall to avoid" },
                { type: "p", content: "Don't expose raw database access as an MCP tool. The model will happily run a DROP TABLE if a prompt asks nicely. Wrap your tools with the smallest possible API surface — selectors, not commands. Permission scopes are your friend." },
                { type: "p", content: "If you're building any kind of agentic AI in 2026, MCP is no longer optional. Start small: pick one tool your team uses, expose it through MCP, and watch your AI workflow stop being demo-ware." }
            ]
        },
        ru: {
            title: "Расцвет MCP — почему каждому AI-инженеру стоит обратить внимание в 2026",
            excerpt:
                "Model Context Protocol становится USB-C мира AI-инструментов. Что это, почему это важно и как за неделю выпустить с ним что-то полезное.",
            sections: [
                { type: "p", content: "У каждого AI-инженера, с которым я общаюсь, одна и та же проблема: LLM-приложению нужно вызывать инструменты, и каждый фреймворк изобретает интеграционный слой заново. В прошлом году это означало полусломанную плагин-систему на каждого провайдера. В 2026 большинство команд сходятся на Model Context Protocol — MCP." },
                { type: "h2", content: "Что такое MCP на самом деле" },
                { type: "p", content: "MCP — это транспорт-агностичный протокол, который позволяет модели обращаться к внешним инструментам, тянуть ресурсы и читать промпты с любого совместимого сервера. Считайте это USB-C для AI-инструментов: вместо отдельной интеграции под каждую модель и каждый инструмент вы один раз поднимаете MCP-сервер, и любой клиент его использует." },
                { type: "p", content: "Это не фреймворк, а wire-протокол с тремя примитивами: инструменты (вызываемые функции), ресурсы (read-only данные) и промпты (шаблоны инструкций)." },
                { type: "h2", content: "Почему это важно именно сейчас" },
                { type: "list", items: [
                    "Переиспользование: пишете один раз — подключаете в Claude, Cursor, ChatGPT, свой кастомный агент — везде, где есть MCP.",
                    "Local-first агенты: MCP-сервер крутится на машине пользователя, доступ к файлам и креды не покидают устройство.",
                    "Композиция: связываете агентов, выставляя возможности одного агента как MCP-инструменты для другого.",
                    "Аудитопригодность: логирование на уровне протокола — каждый вызов инструмента инспектируем, что критично для compliance."
                ] },
                { type: "h2", content: "Минимальный MCP-сервер на Python" },
                { type: "code", lang: "python", content: "from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP('weather-server')\n\n@mcp.tool()\ndef get_weather(city: str) -> str:\n    \"\"\"Получить погоду в городе.\"\"\"\n    # вызов API погоды\n    return f'Солнечно, 24°C в {city}'\n\nif __name__ == '__main__':\n    mcp.run()" },
                { type: "p", content: "Это весь сервер. Кладёте в конфиг Claude Desktop, перезапускаете — и Claude уже умеет смотреть погоду. Тот же сервер работает в Cursor, Continue или любом кастомном клиенте." },
                { type: "h2", content: "Где становится интересно" },
                { type: "p", content: "Неочевидный профит — внутренние корпоративные инструменты. Финансовая команда оборачивает свою систему бронирования как MCP-сервер. DevOps оборачивает Kubernetes. Теперь любой AI-клиент, которым пользуются разработчики — Claude Code, Cursor, домашние агенты — взаимодействует с внутренними системами, и никто не пишет кастомный плагин." },
                { type: "p", content: "Это реалистичная версия «AI в корпорации», которая не требует переписывать ваш стек." },
                { type: "h2", content: "Чего избегать" },
                { type: "p", content: "Не выставляйте сырой доступ к БД как MCP-инструмент. Модель с радостью выполнит DROP TABLE, если её вежливо попросить. Оборачивайте инструменты в минимально возможную поверхность API — селекторы, а не команды. Скоупы прав — ваш друг." },
                { type: "p", content: "Если в 2026 вы строите хоть какой-то агентный AI, MCP уже не опция. Начните с малого: возьмите один инструмент команды, выставьте его через MCP — и ваш AI-воркфлоу перестанет быть демо-материалом." }
            ]
        }
    },
    {
        slug: "production-rag-beyond-demo",
        date: "2026-03-28",
        readMinutes: 8,
        tags: ["RAG", "AI", "Production"],
        en: {
            title: "Production RAG Beyond the Demo — 7 Lessons from Shipping LLM Apps",
            excerpt: "Your hello-world RAG works. Mine did too. Here's what actually breaks when you put it in front of real users — and what I do about it now.",
            sections: [
                { type: "p", content: "I've shipped half a dozen RAG systems in the last 18 months — internal knowledge bots, a WhatsApp assistant for regional data, a customer support layer for a restaurant client. Every single one had a moment where the demo looked great and the production deployment was a mess. These are the seven lessons I keep relearning." },
                { type: "h2", content: "1. Retrieval quality eats model quality for breakfast" },
                { type: "p", content: "Upgrading from GPT-4 to Claude Opus 4.7 won't fix bad retrieval. The single highest-leverage thing you can do is improve the chunks you feed the model. Hybrid search (BM25 + dense) consistently beats pure vector search. Re-ranking with a cross-encoder gives you another 10–15% on hard queries." },
                { type: "h2", content: "2. Chunking is a product decision, not a tuning parameter" },
                { type: "p", content: "If your docs have headings, respect them. If they're conversation logs, chunk by turn. If they're code, chunk by symbol. Generic 512-token chunking is fine for the demo and a disaster for anything technical." },
                { type: "h2", content: "3. Always cite, even when users don't ask" },
                { type: "p", content: "Force the model to return source IDs alongside the answer, then render those citations in the UI. Two reasons: it tells the user when to trust you, and it gives you a debugging surface when something goes wrong." },
                { type: "h2", content: "4. Eval before you ship — yes, even if it feels slow" },
                { type: "ordered", items: [
                    "Write 30–50 representative questions with known good answers.",
                    "Score retrieval recall (did the right chunk appear in top-k?) and answer faithfulness separately.",
                    "Run the eval before any prompt or model change. Save the diff to a CSV.",
                    "Publish the eval scoreboard somewhere your stakeholders can see it."
                ] },
                { type: "h2", content: "5. Caching is your best friend" },
                { type: "p", content: "Embed once, cache forever. Cache the LLM response by (query hash + top-k chunk hash). I've seen 60% cache hit rates on customer support workloads, which means 60% latency and cost reduction with zero quality impact." },
                { type: "h2", content: "6. The model is a Russian friend, not an oracle" },
                { type: "quote", content: "Treat the LLM like a sharp but unreliable colleague — let it draft, but make the system check the work." },
                { type: "p", content: "Add a verification pass for high-stakes outputs. Use a small fast model to check whether the answer is actually grounded in the retrieved context. Reject answers that aren't." },
                { type: "h2", content: "7. Plan for the day the index is wrong" },
                { type: "p", content: "You will reindex. Either the chunking changed, the embedding model changed, or the source documents changed. Build a blue-green index from day one — write to a new index, validate, swap pointer atomically. Don't be the team that takes the bot down for 'maintenance' every two weeks." },
                { type: "h2", content: "The takeaway" },
                { type: "p", content: "The gap between RAG demo and RAG product is mostly engineering, not modeling. Better retrieval, smarter chunking, citations, evals, caching, verification, and reindex hygiene — this is the boring infrastructure that turns a flashy notebook into something a customer will actually pay for." }
            ]
        },
        ru: {
            title: "Production RAG за пределами демо — 7 уроков от запуска LLM-приложений",
            excerpt: "Ваш hello-world RAG работает. Мой тоже работал. Вот что реально ломается, когда вы выкатываете его на живых пользователей — и что я с этим делаю.",
            sections: [
                { type: "p", content: "За последние 18 месяцев я выкатил полдюжины RAG-систем — внутренние knowledge-боты, WhatsApp-ассистент по региональным данным, слой поддержки клиентов для ресторанного бизнеса. У каждой был момент, когда демо смотрелось отлично, а production-деплой был катастрофой. Вот 7 уроков, которые я каждый раз учу заново." },
                { type: "h2", content: "1. Качество retrieval съедает качество модели на завтрак" },
                { type: "p", content: "Переход с GPT-4 на Claude Opus 4.7 не починит плохой retrieval. Самое влиятельное, что вы можете сделать — улучшить chunks, которые подаёте модели. Гибридный поиск (BM25 + dense) стабильно бьёт чистый векторный. Re-ranking с cross-encoder даёт ещё +10–15% на сложных запросах." },
                { type: "h2", content: "2. Chunking — это продуктовое решение, а не параметр тюнинга" },
                { type: "p", content: "Если в документах есть заголовки — уважайте их. Если это логи диалогов — chunk'айте по реплике. Если код — по символу. Универсальное chunk'ование на 512 токенов нормально для демо и катастрофа для технических текстов." },
                { type: "h2", content: "3. Всегда цитируйте, даже когда не просят" },
                { type: "p", content: "Заставляйте модель возвращать ID источников вместе с ответом и рендерьте их в UI. Две причины: пользователь понимает, когда вам доверять, а у вас появляется поверхность для отладки." },
                { type: "h2", content: "4. Eval до релиза — даже если кажется медленным" },
                { type: "ordered", items: [
                    "Напишите 30–50 репрезентативных вопросов с известными хорошими ответами.",
                    "Считайте recall retrieval (правильный chunk попал в top-k?) и faithfulness ответа отдельно.",
                    "Запускайте eval перед любым изменением промпта или модели. Сохраняйте дифф в CSV.",
                    "Публикуйте таблицу eval там, где её видят стейкхолдеры."
                ] },
                { type: "h2", content: "5. Кэш — ваш лучший друг" },
                { type: "p", content: "Embed один раз, кэшируйте навсегда. Кэшируйте LLM-ответ по (хеш запроса + хеш top-k chunks). На support-нагрузках я видел 60% попаданий в кэш — это 60% сокращения задержки и стоимости без потери качества." },
                { type: "h2", content: "6. Модель — это толковый, но ненадёжный коллега" },
                { type: "quote", content: "Относитесь к LLM как к умному, но ненадёжному коллеге — пусть пишет черновик, а система проверяет работу." },
                { type: "p", content: "Добавьте проверочный проход для важных ответов. Маленькая быстрая модель проверяет, обоснован ли ответ retrieved-контекстом. Отказывайте необоснованным." },
                { type: "h2", content: "7. Готовьтесь к моменту, когда индекс окажется неверным" },
                { type: "p", content: "Вы будете переиндексировать. Поменялся chunking, embedding-модель, или сами документы. С первого дня делайте blue-green индекс: пишите в новый, валидируете, атомарно переключаете указатель. Не будьте командой, которая каждые две недели «выключает бот на обслуживание»." },
                { type: "h2", content: "Итого" },
                { type: "p", content: "Разрыв между RAG-демо и RAG-продуктом — это в основном инженерия, а не моделирование. Лучше retrieval, умнее chunking, цитирование, eval, кэширование, верификация и гигиена переиндексации — вот скучная инфраструктура, которая превращает красивый ноутбук в то, за что клиент реально заплатит." }
            ]
        }
    },
    {
        slug: "go-vs-node-realtime-2026",
        date: "2026-03-10",
        readMinutes: 7,
        tags: ["Go", "Node.js", "WebSockets"],
        en: {
            title: "Choosing Go or Node.js for Real-Time Systems in 2026",
            excerpt: "I've shipped real-time scoring systems in both Go and Node. They're not interchangeable. Here's the actual tradeoff, with numbers from a live tournament.",
            sections: [
                { type: "p", content: "Three years ago I built a live badminton scoring system for PBSI in Go. Last year I rebuilt a similar live-ordering system in Node.js for a restaurant client. Both worked. They felt completely different to operate. If you're picking between Go and Node.js for a real-time system in 2026, here's the honest comparison." },
                { type: "h2", content: "Concurrency model" },
                { type: "p", content: "Go gives you cheap goroutines and a runtime designed for CPU-parallel concurrency. Node gives you a single-threaded event loop and async primitives. For pure I/O — broadcasting WebSocket frames to thousands of clients — both are fast. The moment you need to do CPU work alongside (encryption, complex serialization, image manipulation), Go pulls ahead by a wide margin." },
                { type: "h2", content: "What the numbers actually look like" },
                { type: "list", items: [
                    "Live tournament with ~800 connected spectators: Go server held steady at 4% CPU on a 2-core VPS.",
                    "Equivalent Node.js setup with ws + Redis pub/sub: 18% CPU on the same machine, occasional GC pauses up to 80ms.",
                    "Memory: Go process 28MB resident; Node process 110MB.",
                    "Latency p99 broadcast → client paint: Go 12ms, Node 24ms.",
                    "Time-to-ship the first MVP: Node ~3 days, Go ~5 days."
                ] },
                { type: "h2", content: "Developer experience" },
                { type: "p", content: "Node is faster to prototype. The npm ecosystem has a library for everything, TypeScript is excellent, and you can deploy to Vercel or Cloudflare Workers and have HTTPS in five minutes. Go forces you to write a bit more upfront, but it pays you back in operability — single static binary, predictable performance, almost no runtime surprises." },
                { type: "h2", content: "When to pick Node.js" },
                { type: "list", items: [
                    "Most of your team is full-stack JS and you need to ship in days, not weeks.",
                    "You're building a thin real-time layer on top of an existing Node API.",
                    "You're integrating with the JavaScript SDK ecosystem (Stripe, Supabase, Firebase, etc.).",
                    "Your peak concurrency is realistic (a few hundred clients, not 100k)."
                ] },
                { type: "h2", content: "When to pick Go" },
                { type: "list", items: [
                    "You expect significant concurrency (1k+ live clients per node).",
                    "You want predictable tail latency under load.",
                    "You're doing CPU work in the hot path.",
                    "You want a single binary and a tiny container image.",
                    "Long-term ops cost matters more than first-week velocity."
                ] },
                { type: "h2", content: "The non-obvious recommendation" },
                { type: "p", content: "Don't pick the language for the whole system. Pick it for the hot path. I've happily run a Next.js admin app talking to a Go WebSocket server through a shared Redis. Node where iteration speed matters; Go where reliability under load matters. The boring answer is usually the right one." }
            ]
        },
        ru: {
            title: "Go или Node.js для real-time систем в 2026",
            excerpt: "Я выкатывал real-time системы и на Go, и на Node. Это не взаимозаменяемые штуки. Вот реальные компромиссы — с цифрами с живого турнира.",
            sections: [
                { type: "p", content: "Три года назад я построил live-табло счёта по бадминтону для PBSI на Go. В прошлом году переписал похожую систему live-заказов для ресторанного клиента на Node.js. Обе работают. Эксплуатировать их — совершенно разные ощущения. Если в 2026 вы выбираете между Go и Node.js для real-time системы — вот честное сравнение." },
                { type: "h2", content: "Модель конкурентности" },
                { type: "p", content: "Go даёт дешёвые горутины и рантайм, спроектированный под CPU-параллельную конкурентность. Node — однопоточный event loop и async-примитивы. Для чистого I/O (broadcast WebSocket-фреймов тысячам клиентов) оба быстры. Как только появляется CPU-работа (шифрование, сложная сериализация, манипуляции с изображениями), Go отрывается заметно." },
                { type: "h2", content: "Какие цифры на самом деле" },
                { type: "list", items: [
                    "Живой турнир, ~800 подключённых зрителей: Go-сервер стабильно 4% CPU на 2-ядерном VPS.",
                    "Эквивалентная связка Node.js на ws + Redis pub/sub: 18% CPU на той же машине, иногда GC-паузы до 80мс.",
                    "Память: Go-процесс 28МБ resident, Node-процесс 110МБ.",
                    "Задержка p99 broadcast → отрисовка клиента: Go 12мс, Node 24мс.",
                    "Скорость выпуска первого MVP: Node ~3 дня, Go ~5 дней."
                ] },
                { type: "h2", content: "Developer experience" },
                { type: "p", content: "Node быстрее для прототипа. В npm есть библиотека на всё, TypeScript отличный, деплой на Vercel или Cloudflare Workers даёт HTTPS за пять минут. Go требует чуть больше писать вначале, зато потом окупается операбельностью — один статический бинарник, предсказуемый перфоманс, почти никаких сюрпризов в рантайме." },
                { type: "h2", content: "Когда выбрать Node.js" },
                { type: "list", items: [
                    "Большая часть команды — full-stack JS, нужно выкатить за дни, а не недели.",
                    "Вы строите тонкий real-time слой поверх существующего Node-API.",
                    "Интегрируетесь с JS SDK (Stripe, Supabase, Firebase и т. п.).",
                    "Пиковая конкурентность реалистична (сотни клиентов, не 100k)."
                ] },
                { type: "h2", content: "Когда выбрать Go" },
                { type: "list", items: [
                    "Ожидаете заметную конкурентность (1k+ клиентов на ноду).",
                    "Хотите предсказуемые tail-задержки под нагрузкой.",
                    "В hot path есть CPU-работа.",
                    "Нужен один бинарник и крошечный контейнер.",
                    "Долгосрочная стоимость эксплуатации важнее, чем скорость первой недели."
                ] },
                { type: "h2", content: "Неочевидная рекомендация" },
                { type: "p", content: "Не выбирайте язык для всей системы. Выбирайте для hot path. Я спокойно держу Next.js-админку, общающуюся с Go-WebSocket сервером через общий Redis. Node — где важна скорость итераций, Go — где надёжность под нагрузкой. Скучный ответ обычно правильный." }
            ]
        }
    },
    {
        slug: "agentic-ai-workflows-2026",
        date: "2026-02-22",
        readMinutes: 7,
        tags: ["AI", "Agents", "LLM"],
        en: {
            title: "Agentic AI Workflows — From Chatbots to Autonomous Engineers",
            excerpt: "Agents went from research toy to standard tool in eighteen months. Here's the architecture I actually use in production agents today.",
            sections: [
                { type: "p", content: "When I started building AI products in 2024, an 'agent' meant a brittle ReAct loop that broke on the third tool call. By early 2026, agents are a default architecture pattern — and most engineers still build them wrong. The bottleneck isn't the model. It's how you structure the loop." },
                { type: "h2", content: "What an agent actually is" },
                { type: "p", content: "An agent is a loop where the model decides what to do next, calls a tool, observes the result, and decides again. That's it. The interesting design choices are what tools you expose, how you bound the loop, and how you keep the context window healthy." },
                { type: "h2", content: "The architecture I keep coming back to" },
                { type: "ordered", items: [
                    "Planner: a single fast model call that converts the user's goal into a structured task list.",
                    "Executor loop: a stronger model that picks the next task, calls a tool, observes, repeats.",
                    "Memory layer: short-term scratchpad in context, long-term in a vector store.",
                    "Tool catalog: small (10–15 tools max), each with a tight schema and good errors.",
                    "Critic: an out-of-band model pass that evaluates whether the goal is achieved before stopping."
                ] },
                { type: "h2", content: "Three rules that prevent disasters" },
                { type: "p", content: "First, every tool call must time out. The model will absolutely loop forever on an unresponsive API if you let it. Second, every loop has a hard step budget. If the agent hasn't finished in 20 steps, it returns a partial answer with what it tried. Third, destructive tools require an explicit confirmation step — the model can propose, but a separate confirmation pass approves." },
                { type: "h2", content: "Context window hygiene" },
                { type: "p", content: "The dirty secret of agent loops is that the context grows linearly with steps. By step 15, you're paying for thousands of tokens of stale tool output. Compact aggressively: summarize old observations, drop redundant ones, and keep only the latest state per resource." },
                { type: "h2", content: "Where agents earn their keep" },
                { type: "list", items: [
                    "Coding agents (Claude Code, Cursor agents) — checking out the repo, running tests, iterating on a fix.",
                    "Data agents — pulling from one system, transforming, writing somewhere else, reporting on changes.",
                    "Customer support — looking up an order, checking shipment status, drafting a reply for human review.",
                    "Research agents — running multi-hop web research and synthesizing a document with citations."
                ] },
                { type: "h2", content: "Where agents still fail" },
                { type: "p", content: "Anything with strong path-dependence and irreversible side effects. Production database migrations. Money movement. Anything where 'mostly correct' is worse than 'asks a human'. For those cases, build a copilot that drafts and a human that approves, not a fully autonomous agent." },
                { type: "p", content: "The bar for 'production agent' has risen. The bar for 'production agent that won't embarrass you' is still mostly engineering discipline." }
            ]
        },
        ru: {
            title: "Агентные AI-воркфлоу — от чат-ботов к автономным инженерам",
            excerpt: "Агенты прошли путь от исследовательской игрушки до стандартного инструмента за восемнадцать месяцев. Вот архитектура, которую я реально использую в production-агентах.",
            sections: [
                { type: "p", content: "Когда я начал делать AI-продукты в 2024, «агент» означал хрупкий ReAct-цикл, ломающийся на третьем вызове инструмента. К началу 2026 агенты — это дефолтный архитектурный паттерн, и большинство инженеров всё ещё строят их неправильно. Узкое место не модель. Узкое место — как вы структурируете цикл." },
                { type: "h2", content: "Что такое агент на самом деле" },
                { type: "p", content: "Агент — это цикл, в котором модель решает, что делать дальше, вызывает инструмент, наблюдает результат и решает снова. Всё. Интересные дизайн-решения: какие инструменты вы выставляете, как ограничиваете цикл и как поддерживаете контекстное окно здоровым." },
                { type: "h2", content: "Архитектура, к которой я возвращаюсь снова и снова" },
                { type: "ordered", items: [
                    "Planner: один быстрый вызов модели, превращающий цель пользователя в структурированный список задач.",
                    "Executor loop: модель посильнее выбирает следующую задачу, вызывает инструмент, наблюдает, повторяет.",
                    "Слой памяти: краткосрочный scratchpad в контексте, долгосрочный — в векторном хранилище.",
                    "Каталог инструментов: маленький (10–15 инструментов максимум), у каждого жёсткая схема и хорошие ошибки.",
                    "Critic: внешний проход модели, оценивающий, достигнута ли цель, перед остановкой."
                ] },
                { type: "h2", content: "Три правила, чтобы избежать катастроф" },
                { type: "p", content: "Первое: у каждого вызова инструмента должен быть таймаут. Модель совершенно точно будет вечно крутиться на неотвечающем API, если ей дать. Второе: у каждого цикла жёсткий бюджет шагов. Не закончил за 20 шагов — возвращай частичный ответ с тем, что попробовал. Третье: деструктивным инструментам нужен явный шаг подтверждения — модель может предлагать, отдельный confirmation-проход одобряет." },
                { type: "h2", content: "Гигиена контекстного окна" },
                { type: "p", content: "Грязный секрет агент-циклов — контекст линейно растёт по шагам. К 15-му шагу вы платите за тысячи токенов протухшего вывода инструментов. Компактьте агрессивно: суммируйте старые наблюдения, выкидывайте дубли, держите только последнее состояние на ресурс." },
                { type: "h2", content: "Где агенты окупаются" },
                { type: "list", items: [
                    "Coding-агенты (Claude Code, Cursor) — чекаут репо, запуск тестов, итерации над фиксом.",
                    "Data-агенты — взял из одной системы, преобразовал, записал в другую, отчитался об изменениях.",
                    "Поддержка клиентов — найти заказ, проверить статус доставки, набросать ответ для проверки человеком.",
                    "Research-агенты — multi-hop веб-исследование и синтез документа с цитатами."
                ] },
                { type: "h2", content: "Где агенты всё ещё проваливаются" },
                { type: "p", content: "Всё, где сильная path-dependence и необратимые сайд-эффекты. Production-миграции БД. Перемещение денег. Всё, где «почти правильно» хуже, чем «спросить человека». Для таких случаев стройте копилота, который пишет черновик, и человека, который одобряет — не полностью автономного агента." },
                { type: "p", content: "Планка «production-агент» поднялась. Планка «production-агент, который не опозорит вас» всё ещё в основном про инженерную дисциплину." }
            ]
        }
    },
    {
        slug: "modern-data-stack-2026",
        date: "2026-02-08",
        readMinutes: 6,
        tags: ["Data Engineering", "Polars", "dbt"],
        en: {
            title: "Modern Data Stack 2026 — Polars, dbt, and Goodbye Pandas?",
            excerpt: "Pandas isn't dead, but I haven't reached for it in months. Here's what replaced it in my data engineering workflow and why.",
            sections: [
                { type: "p", content: "I write data pipelines for a living. Two years ago every script started with `import pandas as pd`. Today most of them start with `import polars as pl` or live entirely inside dbt. The shift wasn't ideological — it happened one outage at a time." },
                { type: "h2", content: "Why Polars won me over" },
                { type: "p", content: "Polars is built on Apache Arrow with a query optimizer underneath. The practical effect is that it handles 10–20x more data on the same machine, and the API is strict enough to catch bugs Pandas would silently let through." },
                { type: "p", content: "On a recent client report automation pipeline I rewrote a Pandas script that took 14 minutes and 11GB of RAM into a Polars version that finished in 38 seconds and stayed under 800MB. Same machine, same dataset, identical output." },
                { type: "h2", content: "Where dbt fits" },
                { type: "p", content: "Pandas/Polars is great for ingestion and one-off transforms. dbt is for everything that needs to live in your warehouse forever — modeled tables, business logic, tested aggregations. The split I use:" },
                { type: "list", items: [
                    "Ingestion: Python + Polars — read the source, normalize, write Parquet to S3.",
                    "Loading: Redshift COPY or BigQuery LOAD into a raw schema.",
                    "Modeling: dbt — staging → intermediate → marts with tests on every layer.",
                    "Reverse ETL: Python again, reading from marts and pushing to wherever the business needs."
                ] },
                { type: "h2", content: "Tools I no longer reach for" },
                { type: "list", items: [
                    "Pandas, except in notebooks for quick exploration.",
                    "SQLAlchemy ORM for analytics work — straight SQL is clearer.",
                    "Airflow for small pipelines — Prefect / Dagster / a cron job is enough.",
                    "Spark unless I'm genuinely past 100GB."
                ] },
                { type: "h2", content: "What changed" },
                { type: "p", content: "Three things. Cloud warehouses got fast enough that you don't need a separate compute layer. Polars matured into a true Pandas replacement (the API is still different, but the gaps closed in 2025). And dbt's testing story became good enough that 'untested SQL' feels as wrong as 'untested Python' did ten years ago." },
                { type: "h2", content: "The 2026 default" },
                { type: "p", content: "If I'm starting a data project today: Polars for ingest, Parquet on S3 for storage, dbt for modeling in Redshift / BigQuery / Snowflake, and a thin Python orchestrator (Prefect or just GitHub Actions) for scheduling. That's it. Boring, fast, and easy to onboard a new team member into." }
            ]
        },
        ru: {
            title: "Современный data-стек 2026 — Polars, dbt и до свидания Pandas?",
            excerpt: "Pandas не мёртв, но я не открывал его несколько месяцев. Вот что его заменило в моём data-инженерном воркфлоу и почему.",
            sections: [
                { type: "p", content: "Я пишу data-пайплайны на жизнь. Два года назад каждый скрипт начинался с `import pandas as pd`. Сегодня большинство — с `import polars as pl` или живёт целиком внутри dbt. Сдвиг не был идеологическим — он происходил по одной аварии за раз." },
                { type: "h2", content: "Почему Polars меня переманил" },
                { type: "p", content: "Polars построен на Apache Arrow с оптимизатором запросов под капотом. Практический эффект — обрабатывает в 10–20 раз больше данных на той же машине, а API достаточно строг, чтобы ловить баги, которые Pandas пропускал молча." },
                { type: "p", content: "На недавнем пайплайне автоматизации клиентских отчётов я переписал Pandas-скрипт, занимавший 14 минут и 11ГБ RAM, на Polars-версию, которая отработала за 38 секунд и не вышла за 800МБ. Та же машина, тот же датасет, идентичный вывод." },
                { type: "h2", content: "Куда вписывается dbt" },
                { type: "p", content: "Pandas/Polars хорош для ingest и разовых преобразований. dbt — для всего, что должно жить в хранилище навсегда: смоделированные таблицы, бизнес-логика, протестированные агрегаты. Моё разделение:" },
                { type: "list", items: [
                    "Ingest: Python + Polars — прочитать источник, нормализовать, записать Parquet в S3.",
                    "Загрузка: Redshift COPY или BigQuery LOAD в raw-схему.",
                    "Моделирование: dbt — staging → intermediate → marts с тестами на каждом слое.",
                    "Reverse ETL: снова Python, читает из marts и пушит туда, куда нужно бизнесу."
                ] },
                { type: "h2", content: "Чем я больше не пользуюсь" },
                { type: "list", items: [
                    "Pandas, кроме как в ноутбуках для быстрого исследования.",
                    "SQLAlchemy ORM для аналитики — чистый SQL понятнее.",
                    "Airflow для маленьких пайплайнов — Prefect / Dagster / cron достаточно.",
                    "Spark, пока я реально не за пределами 100ГБ."
                ] },
                { type: "h2", content: "Что изменилось" },
                { type: "p", content: "Три вещи. Облачные хранилища стали достаточно быстрыми, чтобы не нужен был отдельный compute-слой. Polars дозрел до настоящей замены Pandas (API другой, но в 2025 разрывы закрылись). И testing-история dbt стала достаточно хорошей, чтобы «непротестированный SQL» ощущался так же неправильно, как «непротестированный Python» десять лет назад." },
                { type: "h2", content: "Дефолт 2026" },
                { type: "p", content: "Если я сегодня начинаю data-проект: Polars для ingest, Parquet в S3 для хранения, dbt для моделирования в Redshift / BigQuery / Snowflake и тонкий Python-оркестратор (Prefect или просто GitHub Actions) для расписания. Всё. Скучно, быстро и легко онбордить нового члена команды." }
            ]
        }
    },
    {
        slug: "vector-db-comparison-2026",
        date: "2026-01-25",
        readMinutes: 7,
        tags: ["Vector DB", "RAG", "AI"],
        en: {
            title: "Vector Databases Compared — pgvector, ChromaDB, Pinecone, Qdrant",
            excerpt: "I've shipped each of these into production. Here's which one to pick for your next RAG project — and which one I quietly regret choosing.",
            sections: [
                { type: "p", content: "Picking a vector database in 2026 is harder than it should be because the marketing pages all sound identical. Having shipped RAG apps on all four of the big players, here's what I actually think after running them in production." },
                { type: "h2", content: "pgvector" },
                { type: "p", content: "If you already run Postgres, this is almost always the right answer. pgvector is a Postgres extension that adds vector indexing. You get transactions, joins, point lookups, and vector search in one query — and one operational footprint." },
                { type: "list", items: [
                    "Best for: most apps under 10M vectors with metadata-heavy queries.",
                    "Watch out for: index build times on large datasets and the need to tune HNSW params.",
                    "Killer feature: you can join vector results with structured data in a single SQL query."
                ] },
                { type: "h2", content: "ChromaDB" },
                { type: "p", content: "Chroma is the easiest way to start. `pip install chromadb`, create a collection, add documents, search. For prototypes and internal tools it's fantastic. For production at scale it has rough edges around concurrent writes and persistence." },
                { type: "list", items: [
                    "Best for: prototypes, local-first apps, internal tools.",
                    "Watch out for: production scaling — it's getting better but isn't Pinecone-grade yet.",
                    "Killer feature: zero-friction local development."
                ] },
                { type: "h2", content: "Pinecone" },
                { type: "p", content: "Pinecone is the managed-service answer. You don't run anything, you just hit an API. It handles billions of vectors gracefully and has the most polished hybrid-search story. The tradeoff is cost and vendor lock-in." },
                { type: "list", items: [
                    "Best for: large-scale production with no ops team.",
                    "Watch out for: cost surprises at scale and being permanently coupled to their pricing.",
                    "Killer feature: fully managed, fast, and the hybrid search just works."
                ] },
                { type: "h2", content: "Qdrant" },
                { type: "p", content: "Qdrant is the open-source production option. Rust-built, fast, and the filtering capabilities are the best of any vector DB I've used. You can self-host or use their cloud." },
                { type: "list", items: [
                    "Best for: filter-heavy workloads, self-hosted production setups.",
                    "Watch out for: smaller community than the alternatives, occasional breaking changes.",
                    "Killer feature: payload filtering with the speed of vector search."
                ] },
                { type: "h2", content: "My current default" },
                { type: "p", content: "For 90% of projects I start with pgvector. It's free, it's there, and 'just add a column' beats 'add another service' every time. If filtering or scale forces my hand, I move to Qdrant. I only reach for Pinecone when the team explicitly doesn't want to operate anything, and Chroma stays in my notebook." },
                { type: "h2", content: "The one I regret" },
                { type: "p", content: "Early 2024 I picked a vector DB that doesn't make this list because it had the slickest landing page. Six months later it lost data on a clean restart. The boring answer (pgvector) would have saved a weekend of incident response. Pick the boring answer first." }
            ]
        },
        ru: {
            title: "Сравнение векторных БД — pgvector, ChromaDB, Pinecone, Qdrant",
            excerpt: "Я выкатывал каждую из них в production. Вот что выбрать для следующего RAG-проекта — и о чём я тихо жалею.",
            sections: [
                { type: "p", content: "Выбирать векторную БД в 2026 сложнее, чем должно быть, потому что все маркетинговые страницы звучат одинаково. После того, как я выкатил RAG-приложения на всех четырёх крупных игроках, вот что я реально думаю, поработав в production." },
                { type: "h2", content: "pgvector" },
                { type: "p", content: "Если у вас уже есть Postgres — это почти всегда правильный ответ. pgvector — расширение Postgres с векторным индексированием. Транзакции, join'ы, точечные lookup'ы и векторный поиск в одном запросе — и одна операционная нагрузка." },
                { type: "list", items: [
                    "Лучше всего для: большинства приложений до 10М векторов с metadata-тяжёлыми запросами.",
                    "Осторожнее с: временем построения индекса на больших датасетах и тюнингом HNSW-параметров.",
                    "Killer-фича: можно join'ить векторные результаты со структурированными данными одним SQL."
                ] },
                { type: "h2", content: "ChromaDB" },
                { type: "p", content: "Chroma — самый простой способ начать. `pip install chromadb`, создаёте коллекцию, добавляете документы, ищете. Для прототипов и внутренних инструментов — фантастика. Для production-масштабов — шероховатости с конкурентными записями и персистентностью." },
                { type: "list", items: [
                    "Лучше всего для: прототипов, local-first приложений, внутренних инструментов.",
                    "Осторожнее с: масштабированием в production — становится лучше, но пока не уровня Pinecone.",
                    "Killer-фича: разработка локально без трения."
                ] },
                { type: "h2", content: "Pinecone" },
                { type: "p", content: "Pinecone — managed-вариант. Вы ничего не запускаете, просто бьёте в API. Изящно держит миллиарды векторов и у него самый отполированный hybrid search. Цена — стоимость и vendor lock-in." },
                { type: "list", items: [
                    "Лучше всего для: большого production без ops-команды.",
                    "Осторожнее с: ценовыми сюрпризами на масштабе и постоянной привязкой к их прайсингу.",
                    "Killer-фича: полностью managed, быстро, hybrid search просто работает."
                ] },
                { type: "h2", content: "Qdrant" },
                { type: "p", content: "Qdrant — open-source вариант для production. Сделан на Rust, быстрый, фильтрация — лучшая из всех векторных БД, что я использовал. Можно self-host или использовать их облако." },
                { type: "list", items: [
                    "Лучше всего для: filter-тяжёлых нагрузок, self-hosted production.",
                    "Осторожнее с: меньшим сообществом, чем у альтернатив, иногда breaking changes.",
                    "Killer-фича: фильтрация по payload со скоростью векторного поиска."
                ] },
                { type: "h2", content: "Мой текущий дефолт" },
                { type: "p", content: "В 90% проектов я начинаю с pgvector. Бесплатно, уже есть, и «просто добавить колонку» выигрывает у «добавить ещё один сервис» каждый раз. Если фильтрация или масштаб не дают — переезжаю на Qdrant. К Pinecone обращаюсь, только если команда явно не хочет ничего эксплуатировать, а Chroma остаётся в ноутбуке." },
                { type: "h2", content: "Та, о которой жалею" },
                { type: "p", content: "В начале 2024 я выбрал векторную БД, которой нет в этом списке, потому что у неё был самый красивый лендинг. Через полгода она потеряла данные на чистом рестарте. Скучный ответ (pgvector) сэкономил бы выходные на разбор инцидента. Сначала выбирайте скучный ответ." }
            ]
        }
    },
    {
        slug: "nextjs-15-app-router-patterns",
        date: "2026-01-12",
        readMinutes: 6,
        tags: ["Next.js", "React", "Frontend"],
        en: {
            title: "Next.js 15+ App Router Patterns That Don't Suck",
            excerpt: "App Router is great when you stop fighting it. Here are the patterns I actually use in production Next.js 15 and 16 projects.",
            sections: [
                { type: "p", content: "Half of the Next.js content on the internet is still teaching Pages Router habits in App Router clothing. App Router is genuinely different and genuinely good — once you stop trying to recreate getServerSideProps." },
                { type: "h2", content: "Server Components are the default for a reason" },
                { type: "p", content: "If a component doesn't need state, effects, or browser APIs, leave it as a Server Component. Fetch data directly in it, return JSX. No useEffect dance, no SWR, no API route in between. Mark it 'use client' only when you actually need interactivity." },
                { type: "h2", content: "Compose, don't lift" },
                { type: "p", content: "The biggest mental flip: instead of 'lifting state up' through a tree of components, you compose Server Components and Client Components. Pass Server Components as children to Client Components. The boundary stays narrow." },
                { type: "code", lang: "tsx", content: "// page.tsx (Server Component)\nimport ClientShell from './ClientShell'\nimport ServerData from './ServerData'\n\nexport default function Page() {\n  return (\n    <ClientShell>\n      {/* ServerData stays a Server Component even though\n          it's nested inside ClientShell */}\n      <ServerData />\n    </ClientShell>\n  )\n}" },
                { type: "h2", content: "Server Actions for forms" },
                { type: "p", content: "Stop building API routes for form submissions. Use a Server Action: it runs on the server, you can validate with Zod, and the form works without JavaScript. Progressive enhancement comes free." },
                { type: "h2", content: "Parallel routes for layouts that ship" },
                { type: "p", content: "Need a sidebar that loads independently from the main content? Use a parallel route slot (`@sidebar`). Both stream in independently with their own loading state. This used to require Suspense gymnastics; now it's a folder name." },
                { type: "h2", content: "Caching is the footgun" },
                { type: "p", content: "Next 14's aggressive caching defaults caused real production pain. Next 15 dialed it back. Default to dynamic, then opt into caching with `unstable_cache` or `revalidateTag` once you actually understand what you're caching. 'Static by default' was the wrong default for most app code." },
                { type: "h2", content: "Patterns I avoid" },
                { type: "list", items: [
                    "Wrapping every fetch in useEffect — let the Server Component fetch.",
                    "Custom loading spinners — use loading.tsx, you get streaming for free.",
                    "Global state libraries for server data — that's what cache/revalidate are for.",
                    "API routes that just proxy a database query — call the DB from the Server Component."
                ] },
                { type: "h2", content: "The one library I always add" },
                { type: "p", content: "TanStack Query, but only for client-side mutations and optimistic updates. Server Components handle initial load; TanStack Query handles 'user clicks button, UI updates instantly, server confirms.' Best of both." }
            ]
        },
        ru: {
            title: "Паттерны Next.js 15+ App Router, которые не отстой",
            excerpt: "App Router отличный, когда перестаёшь с ним бороться. Вот паттерны, которые я реально использую в production Next.js 15 и 16.",
            sections: [
                { type: "p", content: "Половина контента про Next.js в интернете до сих пор учит привычкам Pages Router в обёртке App Router. App Router — реально другой и реально хороший, как только перестанешь пытаться воссоздать getServerSideProps." },
                { type: "h2", content: "Server Components — дефолт не просто так" },
                { type: "p", content: "Если компонент не нуждается в state, эффектах или browser API, оставляйте его Server Component. Загружайте данные прямо в нём, возвращайте JSX. Никаких useEffect-плясок, SWR или API-роутов посередине. Помечайте 'use client' только когда реально нужна интерактивность." },
                { type: "h2", content: "Композируйте, а не lift'те" },
                { type: "p", content: "Самый большой ментальный переворот: вместо «поднятия state наверх» по дереву компонентов вы композируете Server Components и Client Components. Передавайте Server Components как children в Client Components. Граница остаётся узкой." },
                { type: "code", lang: "tsx", content: "// page.tsx (Server Component)\nimport ClientShell from './ClientShell'\nimport ServerData from './ServerData'\n\nexport default function Page() {\n  return (\n    <ClientShell>\n      {/* ServerData остаётся Server Component, хотя\n          вложен в ClientShell */}\n      <ServerData />\n    </ClientShell>\n  )\n}" },
                { type: "h2", content: "Server Actions для форм" },
                { type: "p", content: "Перестаньте строить API-роуты для отправки форм. Используйте Server Action: он работает на сервере, можно валидировать через Zod, форма работает без JavaScript. Progressive enhancement идёт в комплекте." },
                { type: "h2", content: "Parallel routes для лейаутов" },
                { type: "p", content: "Нужен сайдбар, грузящийся независимо от основного контента? Используйте parallel route slot (`@sidebar`). Оба стримятся независимо со своим loading state. Раньше нужна была Suspense-гимнастика, теперь это просто имя папки." },
                { type: "h2", content: "Кэширование — это footgun" },
                { type: "p", content: "Агрессивные дефолты кэша в Next 14 принесли реальную production-боль. Next 15 их сбавил. Делайте по умолчанию dynamic, потом opt-in в кэширование через `unstable_cache` или `revalidateTag`, когда реально поймёте, что кэшируете. «Static by default» был неправильным дефолтом для большинства app-кода." },
                { type: "h2", content: "Паттерны, которых избегаю" },
                { type: "list", items: [
                    "Обёртывать каждый fetch в useEffect — пусть Server Component сам грузит.",
                    "Кастомные loading-спиннеры — используйте loading.tsx, получаете стриминг бесплатно.",
                    "Глобальные state-библиотеки для серверных данных — для этого есть cache/revalidate.",
                    "API-роуты, просто проксирующие запрос к БД — зовите БД из Server Component."
                ] },
                { type: "h2", content: "Одна библиотека, которую всегда добавляю" },
                { type: "p", content: "TanStack Query, но только для клиентских мутаций и оптимистичных обновлений. Server Components обрабатывают первичную загрузку, TanStack Query — «пользователь кликает, UI мгновенно обновляется, сервер подтверждает». Лучшее из обоих миров." }
            ]
        }
    },
    {
        slug: "freelance-developer-ai-toolkit",
        date: "2025-12-18",
        readMinutes: 6,
        tags: ["Freelancing", "AI", "Productivity"],
        en: {
            title: "The Freelance Developer's AI Toolkit — Ship 10x Faster",
            excerpt: "I'm a freelance dev shipping client work full-time. Here's the exact AI toolkit that lets me deliver in days what used to take weeks.",
            sections: [
                { type: "p", content: "When I quote a client three weeks for an MVP, I'm not lying — that's how long it would have taken in 2022. Today the same scope takes me 5–7 days. The difference is an AI toolkit I've sharpened over the last 18 months. Here's what's actually in it." },
                { type: "h2", content: "Daily drivers" },
                { type: "list", items: [
                    "Claude Code in the terminal — implementation, debugging, refactors. The single biggest leverage tool.",
                    "Cursor for UI work — I still want a visual editor with inline diffs when designing components.",
                    "v0 for the first pass at a marketing page — generates 80% of the layout, I clean up the last 20%.",
                    "Whisper for transcribing client calls — I never take notes during a call anymore."
                ] },
                { type: "h2", content: "Workflow that actually saves time" },
                { type: "p", content: "I keep a small library of project skeletons (Next.js + Supabase, Go API + Postgres, Python FastAPI + Polars). When a client signs, I clone the skeleton, hand the spec to Claude Code along with the skeleton, and ask it to scaffold the data model and routes first. By the end of day one I usually have something deployable." },
                { type: "h2", content: "Where AI doesn't help" },
                { type: "list", items: [
                    "Discovery calls — clients want a human asking real questions, not a chat transcript.",
                    "Pricing — AI estimates are systematically too low because they don't price risk.",
                    "Deployment debugging — when prod is down, AI is a junior dev. You still need to know your tools.",
                    "Architecture decisions — AI will agree with whatever you suggest. You still have to own the call."
                ] },
                { type: "h2", content: "A real example" },
                { type: "p", content: "Last month a client needed a customer portal: auth, account dashboard, billing integration with Stripe, and an admin panel. Past-me would have quoted 4 weeks. I shipped it in 9 days, end-to-end, using Claude Code for the implementation, Cursor for the dashboard polish, and v0 for the pricing page. The client paid the same." },
                { type: "h2", content: "Don't sell hours, sell outcomes" },
                { type: "p", content: "The mistake freelancers make with AI is undercharging because the work felt easier. Your client is paying for the result, not your keystroke count. If you used to bill 80 hours for an MVP and now you ship in 25, charge for the MVP, not the hours." },
                { type: "h2", content: "The non-obvious benefit" },
                { type: "p", content: "AI isn't just making me faster. It's letting me take on stacks I'd previously have declined — Rust microservices, mobile React Native, even a small Solidity contract. With a strong AI pair, the cost of learning a new ecosystem dropped to where it's worth saying yes to more interesting work." }
            ]
        },
        ru: {
            title: "AI-набор фриланс-разработчика — выпускать в 10 раз быстрее",
            excerpt: "Я фриланс-разработчик на полную ставку. Вот точный AI-набор, позволяющий доставлять за дни то, что раньше занимало недели.",
            sections: [
                { type: "p", content: "Когда я говорю клиенту «три недели на MVP», я не вру — столько это заняло бы в 2022. Сегодня тот же объём — 5–7 дней. Разница — AI-набор, который я отточил за последние 18 месяцев. Вот что в нём реально." },
                { type: "h2", content: "Ежедневные инструменты" },
                { type: "list", items: [
                    "Claude Code в терминале — реализация, отладка, рефакторинг. Самый мощный рычаг.",
                    "Cursor для UI — нужен визуальный редактор с inline-диффами, когда проектирую компоненты.",
                    "v0 для первого прохода маркетинговой страницы — генерит 80% разметки, я доводу последние 20%.",
                    "Whisper для расшифровки звонков с клиентами — заметки во время звонка я больше не делаю."
                ] },
                { type: "h2", content: "Воркфлоу, реально экономящий время" },
                { type: "p", content: "Держу маленькую библиотеку скелетов проектов (Next.js + Supabase, Go API + Postgres, Python FastAPI + Polars). Когда клиент подписывает, клонирую скелет, отдаю спеку Claude Code вместе со скелетом и прошу сначала набросать data-модель и роуты. К концу первого дня обычно есть что-то деплоящееся." },
                { type: "h2", content: "Где AI не помогает" },
                { type: "list", items: [
                    "Discovery-звонки — клиентам нужен человек, задающий настоящие вопросы, а не транскрипт чата.",
                    "Прайсинг — AI-оценки систематически занижены, потому что не учитывают риск.",
                    "Отладка деплоя — когда прод лежит, AI — это junior. Свои инструменты всё ещё надо знать.",
                    "Архитектурные решения — AI согласится с любым вашим предложением. Решение всё ещё на вас."
                ] },
                { type: "h2", content: "Реальный пример" },
                { type: "p", content: "В прошлом месяце клиенту нужен был портал: авторизация, дашборд аккаунта, биллинг через Stripe и админка. Прежний я заквотировал бы 4 недели. Я выкатил всё за 9 дней — Claude Code для реализации, Cursor для полировки дашборда, v0 для страницы цен. Клиент заплатил столько же." },
                { type: "h2", content: "Не продавайте часы, продавайте результат" },
                { type: "p", content: "Ошибка фрилансеров с AI — недозаряжать, потому что работа кажется легче. Клиент платит за результат, а не за количество ваших нажатий. Если раньше выставляли 80 часов за MVP, а теперь делаете за 25 — берите за MVP, а не за часы." },
                { type: "h2", content: "Неочевидный плюс" },
                { type: "p", content: "AI не просто делает меня быстрее. Он даёт браться за стеки, от которых я раньше отказывался — Rust-микросервисы, мобильный React Native, даже маленький Solidity-контракт. С сильной AI-парой стоимость освоения новой экосистемы упала до уровня, на котором есть смысл говорить «да» более интересной работе." }
            ]
        }
    },
    {
        slug: "websockets-at-scale-pbsi",
        date: "2025-12-02",
        readMinutes: 7,
        tags: ["WebSockets", "Real-time", "Go"],
        en: {
            title: "WebSockets at Scale — Lessons from a Real-Time Scoring System",
            excerpt: "When PBSI asked me to build live tournament scoring in two weeks, I learned more about WebSockets than three years of theory. Here's the practical version.",
            sections: [
                { type: "p", content: "The Indonesian Badminton Association (PBSI) needed a live scoring system in two weeks. I built it in Go with WebSockets, deployed it the night before the tournament, and watched 800+ spectators connect simultaneously while my heart rate did things heart rates aren't supposed to do. It worked. Here's what I learned." },
                { type: "h2", content: "WebSockets are stateful — your architecture must be too" },
                { type: "p", content: "Every 'just put it behind a load balancer' tutorial breaks the moment you have multiple server instances. WebSocket connections are sticky to one server. If your scoring update needs to reach all spectators across all servers, you need a message bus." },
                { type: "p", content: "I used Redis pub/sub. Server A receives the score update over HTTP, publishes to a Redis channel, every server (including A) consumes the channel and broadcasts to its connected clients. Simple, fast, and survives failover." },
                { type: "h2", content: "Backpressure will bite you" },
                { type: "p", content: "What happens when a client's network gets slow and your server keeps trying to send it 50 messages per second? In a naive implementation, your goroutine blocks, the connection's send queue grows, memory balloons, and eventually the server tips over." },
                { type: "p", content: "The fix: bounded send buffer per connection. If the buffer is full, drop the slow client. They reconnect, get a state snapshot, and rejoin the live stream. Don't let one bad client take down everyone else." },
                { type: "h2", content: "Heartbeats save your life" },
                { type: "p", content: "TCP connections can stay 'open' from the OS's perspective long after the network has actually died. Send a ping every 30 seconds and disconnect if you don't get a pong within 60. This single fix eliminated 90% of 'phantom connection' issues for me." },
                { type: "h2", content: "State snapshots, not just deltas" },
                { type: "p", content: "When a new client connects, send them the current full state, not just future deltas. When a client reconnects after a drop, same thing. This sounds obvious but a lot of WebSocket tutorials skip it, and you only notice the gap during reconnection scenarios." },
                { type: "h2", content: "Concrete server limits" },
                { type: "list", items: [
                    "Per-connection send buffer: 64 messages or ~64KB, whichever first.",
                    "Heartbeat: ping every 30s, disconnect after 60s without pong.",
                    "Per-IP connection limit: 5 — abusive enough that you can't accidentally DoS yourself in dev.",
                    "Total connection limit: known and enforced at the proxy, not at the app.",
                    "Message size limit: 4KB — anything bigger is suspicious."
                ] },
                { type: "h2", content: "What I'd do differently" },
                { type: "p", content: "Today I'd reach for NATS or Redis Streams instead of pub/sub for replay capability — useful when a client reconnects and wants the last N events, not just future ones. And I'd start with a managed solution like Pusher or Ably for projects that don't need ultra-low latency, so the team focuses on product rather than transport." }
            ]
        },
        ru: {
            title: "WebSockets на масштабе — уроки real-time системы счёта",
            excerpt: "Когда PBSI попросил построить live-табло турнира за две недели, я узнал о WebSockets больше, чем за три года теории. Вот практическая версия.",
            sections: [
                { type: "p", content: "Индонезийской федерации бадминтона (PBSI) нужна была live-система счёта за две недели. Я построил её на Go с WebSockets, задеплоил в ночь перед турниром и наблюдал, как 800+ зрителей подключаются одновременно, пока мой пульс делал то, что пульс делать не должен. Сработало. Вот что я понял." },
                { type: "h2", content: "WebSockets — stateful, и ваша архитектура должна быть тоже" },
                { type: "p", content: "Каждый туториал «просто поставь за load balancer» ломается, как только у вас несколько инстансов. WebSocket-соединения залипают к одному серверу. Если апдейт счёта должен дойти до всех зрителей на всех серверах — нужна message bus." },
                { type: "p", content: "Я использовал Redis pub/sub. Сервер A получает апдейт по HTTP, публикует в Redis-канал, каждый сервер (включая A) читает канал и рассылает своим клиентам. Просто, быстро, переживает failover." },
                { type: "h2", content: "Backpressure укусит" },
                { type: "p", content: "Что будет, если сеть клиента замедлилась, а ваш сервер продолжает слать ему 50 сообщений в секунду? В наивной реализации горутина блокируется, очередь отправки соединения растёт, память распухает, и в конце концов сервер падает." },
                { type: "p", content: "Фикс: ограниченный send-буфер на соединение. Если буфер полон — дропайте медленного клиента. Он переподключится, получит снапшот состояния и снова войдёт в live-стрим. Не позволяйте одному плохому клиенту валить всех." },
                { type: "h2", content: "Heartbeats спасают жизнь" },
                { type: "p", content: "TCP-соединения могут оставаться «открытыми» с точки зрения ОС долго после того, как сеть фактически умерла. Шлите ping каждые 30 секунд и отключайте, если pong не пришёл за 60. Один этот фикс убрал 90% «фантомных соединений»." },
                { type: "h2", content: "Снапшоты состояния, а не только дельты" },
                { type: "p", content: "Когда новый клиент подключается, шлите ему полное текущее состояние, а не только будущие дельты. То же самое при переподключении после дропа. Звучит очевидно, но многие туториалы по WebSockets это пропускают — и пробел замечаешь только в сценариях переподключения." },
                { type: "h2", content: "Конкретные серверные лимиты" },
                { type: "list", items: [
                    "Send-буфер на соединение: 64 сообщения или ~64КБ, что раньше.",
                    "Heartbeat: ping каждые 30с, отключение через 60с без pong.",
                    "Лимит соединений на IP: 5 — достаточно, чтобы случайно не задиосить себя в dev.",
                    "Общий лимит соединений: известный и форсимый на прокси, не в приложении.",
                    "Лимит размера сообщения: 4КБ — что больше, то подозрительно."
                ] },
                { type: "h2", content: "Что бы сделал иначе" },
                { type: "p", content: "Сегодня я бы взял NATS или Redis Streams вместо pub/sub ради replay — полезно, когда клиент переподключается и хочет последние N событий, а не только будущие. И начал бы с managed-решения вроде Pusher или Ably для проектов без ультра-низкой задержки, чтобы команда сосредоточилась на продукте, а не на транспорте." }
            ]
        }
    },
    {
        slug: "prototype-to-production-llm",
        date: "2025-11-15",
        readMinutes: 7,
        tags: ["LLM", "Production", "Deployment"],
        en: {
            title: "From Prototype to Production — Deploying LLM Apps Reliably",
            excerpt: "The 80% of LLM engineering nobody blogs about is the boring part — deployment, monitoring, cost control, failure modes. Here's the playbook.",
            sections: [
                { type: "p", content: "Your LLM app works in the notebook. Now you need to put it in front of users. The gap between those two states is mostly engineering — the same boring stuff that any backend service needs, plus a few LLM-specific traps. Here's the production playbook I follow on every project." },
                { type: "h2", content: "Wrap every LLM call" },
                { type: "p", content: "Never call the model SDK directly from your business logic. Wrap it in your own client that handles: retries with exponential backoff, timeout, structured logging, cost tracking, and provider fallback. You'll thank yourself the first time OpenAI has an outage and you can flip a config to Anthropic." },
                { type: "h2", content: "Streaming or you'll lose users" },
                { type: "p", content: "If your LLM response takes more than 2 seconds and isn't streaming, your UX is broken. Stream tokens as they generate. Server-sent events are simpler than WebSockets and work everywhere. Show progress immediately." },
                { type: "h2", content: "Eval gates in CI" },
                { type: "ordered", items: [
                    "Maintain a versioned eval set (questions + expected behaviors) in the repo.",
                    "Run the eval suite on every PR that touches prompts or model config.",
                    "Block merges when the eval score drops below baseline.",
                    "Publish eval scores to a dashboard so PM and stakeholders can see trends."
                ] },
                { type: "h2", content: "Cost control is a feature" },
                { type: "p", content: "LLMs cost real money per request and the bills surprise people. Three controls I always add: rate limit per user, daily spending cap with kill-switch, and request-level cost logging. When the bill arrives at the end of the month it should match your dashboard, not be a surprise." },
                { type: "h2", content: "Observability is non-negotiable" },
                { type: "list", items: [
                    "Log every prompt, every response, every tool call, every latency, every cost.",
                    "Tag logs with user ID and session ID so you can debug a complaint.",
                    "Alert on error rate, latency p95, and unusual cost spikes.",
                    "Sample 1% of conversations into a 'human review' bucket — yes, with consent."
                ] },
                { type: "h2", content: "Prompt injection is real" },
                { type: "p", content: "If your app puts user input into a system prompt or tool result, assume the user can attempt prompt injection. Defenses: separate trusted instructions from user content, never give the model destructive tools without confirmation, and run a pre-output filter on anything that goes back to the user." },
                { type: "h2", content: "Failure modes you must handle" },
                { type: "list", items: [
                    "Provider rate limit (429) — back off and retry, fallback to cheaper model on persistent fail.",
                    "Provider outage (5xx) — switch provider via your wrapper, return cached or default response.",
                    "Hallucinated tool call — schema-validate every tool input before executing.",
                    "Truncated response — detect, retry with higher max_tokens, or stream-resume.",
                    "User cancels mid-stream — clean up, don't leak the connection."
                ] },
                { type: "h2", content: "The one-liner takeaway" },
                { type: "p", content: "An LLM app in production is a regular service with extra failure modes and a meter running. Treat it like a regular service — wrappers, retries, observability, evals, rate limits — and the LLM-specific bits stop being scary." }
            ]
        },
        ru: {
            title: "От прототипа к production — надёжный деплой LLM-приложений",
            excerpt: "80% LLM-инженерии, о которой никто не пишет в блогах — это скучная часть: деплой, мониторинг, контроль стоимости, режимы отказов. Вот плейбук.",
            sections: [
                { type: "p", content: "Ваше LLM-приложение работает в ноутбуке. Теперь его нужно показать пользователям. Разрыв между этими состояниями — в основном инженерия: та же скучная работа, что и у любого backend-сервиса, плюс несколько ловушек, специфичных для LLM. Вот production-плейбук, которому я следую на каждом проекте." },
                { type: "h2", content: "Оборачивайте каждый вызов LLM" },
                { type: "p", content: "Никогда не зовите SDK модели напрямую из бизнес-логики. Оборачивайте в свой клиент, обрабатывающий: ретраи с exponential backoff, таймаут, структурное логирование, трекинг стоимости и fallback провайдера. Скажете себе спасибо в первый же раз, когда OpenAI ляжет, а вы конфигом переключитесь на Anthropic." },
                { type: "h2", content: "Стриминг или потеряете пользователей" },
                { type: "p", content: "Если LLM-ответ занимает больше 2 секунд и не стримится — UX сломан. Стримьте токены по мере генерации. Server-sent events проще WebSockets и работают везде. Показывайте прогресс сразу." },
                { type: "h2", content: "Eval-гейты в CI" },
                { type: "ordered", items: [
                    "Держите версионированный eval-набор (вопросы + ожидаемое поведение) в репо.",
                    "Запускайте eval-сьют на каждом PR, трогающем промпты или конфиг модели.",
                    "Блокируйте merge, когда eval-скор падает ниже baseline.",
                    "Публикуйте eval-скор на дашборде, чтобы PM и стейкхолдеры видели тренды."
                ] },
                { type: "h2", content: "Контроль стоимости — это фича" },
                { type: "p", content: "LLM стоят реальных денег за запрос, и счета удивляют людей. Три контроля, которые я всегда добавляю: rate limit на пользователя, дневной потолок с kill-switch и логирование стоимости на запрос. Когда приходит счёт в конце месяца, он должен совпадать с дашбордом, а не быть сюрпризом." },
                { type: "h2", content: "Observability — обязательно" },
                { type: "list", items: [
                    "Логируйте каждый промпт, ответ, вызов инструмента, задержку, стоимость.",
                    "Тегируйте логи user ID и session ID, чтобы дебажить жалобы.",
                    "Алертите на error rate, latency p95 и необычные cost-спайки.",
                    "Сэмплируйте 1% диалогов в бакет «human review» — да, с согласия."
                ] },
                { type: "h2", content: "Prompt injection реален" },
                { type: "p", content: "Если приложение кладёт пользовательский ввод в system-промпт или результат инструмента, считайте, что пользователь может попытаться prompt injection. Защиты: отделять доверенные инструкции от пользовательского контента, никогда не давать модели деструктивные инструменты без подтверждения и прогонять pre-output фильтр всего, что уходит к пользователю." },
                { type: "h2", content: "Режимы отказов, которые надо обрабатывать" },
                { type: "list", items: [
                    "Rate limit провайдера (429) — backoff и retry, при стабильном провале fallback на более дешёвую модель.",
                    "Сбой провайдера (5xx) — переключайте провайдера через врапер, возвращайте кэш или дефолт.",
                    "Галлюцинированный вызов инструмента — schema-валидируйте каждый инпут перед исполнением.",
                    "Усечённый ответ — детектируйте, ретрайте с большим max_tokens, или продолжайте стрим.",
                    "Пользователь отменил посреди стрима — чистите за собой, не текёте соединениями."
                ] },
                { type: "h2", content: "Однострочный вывод" },
                { type: "p", content: "LLM-приложение в production — обычный сервис с дополнительными режимами отказов и счётчиком на запросы. Относитесь к нему как к обычному сервису — обёртки, ретраи, observability, eval, rate limits — и LLM-специфика перестаёт быть страшной." }
            ]
        }
    },

    /* ─── System Design series ─── */

    {
        slug: "reading-source-code-as-a-skill",
        date: "2026-05-30",
        readMinutes: 6,
        tags: ["System Design", "Career", "Engineering"],
        en: {
            title: "Reading Source Code Is a Career Skill",
            excerpt: "The senior engineers I respect most all share one habit: they read source code for sport. Here's why, and how to do it without drowning.",
            sections: [
                { type: "p", content: "Mid-level engineers Google their problems. Senior engineers read the source. The gap between the two isn't intelligence; it's a habit. The good news is the habit is teachable, and once you have it, almost every system you touch becomes legible." },
                { type: "h2", content: "Why reading source pays off" },
                { type: "p", content: "Documentation tells you what something does on a good day. The source tells you what it does on a bad day, what the author was actually worried about, and where the design tradeoffs sit. When you read Postgres's `vacuum.c`, you learn why long-running transactions matter for storage. When you read Lenis's RAF loop, you understand why your scroll feels smooth on every device. That kind of knowledge compounds; documentation knowledge expires." },
                { type: "h2", content: "Which sources actually reward you" },
                { type: "list", items: [
                    "Things you use every day. Postgres, Redis, your framework, your runtime. The hours you spend debugging them later get repaid.",
                    "Things with strong opinions. SQLite, Linux, Lua, Vue, htmx. Strong opinions teach more than committee design.",
                    "Things small enough to actually finish. Lenis (~1 file of substance), curl, a single Postgres extension. Pick a target you can complete."
                ] },
                { type: "h2", content: "How to read without drowning" },
                { type: "ordered", items: [
                    "Start with the entry point. Find the `main` function, the exported API, or the request handler. Map it before you map anything else.",
                    "Follow one specific path. 'What happens when I do X?' beats 'understand the codebase' every time.",
                    "Read the tests. They're documentation that lies less often.",
                    "Skim the issue tracker for the same component. The pain points are the unwritten chapters of the design.",
                    "Write a 200-word summary in your own words. If you can't, you didn't understand it."
                ] },
                { type: "h2", content: "What I've gotten out of it" },
                { type: "p", content: "Reading vLLM's scheduler made my AIMO Kaggle pipeline 3x faster. Reading Frappe's framework taught me how to make my ERPNext deployments stable across upgrades. Reading the Anthropic Messages API contract taught me to design tool layers as composable building blocks rather than RPC endpoints. None of those wins came from documentation." },
                { type: "h2", content: "The honest blocker" },
                { type: "p", content: "Reading source feels slow at first. You'll spend 90 minutes on what feels like a 5-minute question. That's the price. The compounded value of being someone who actually understands the systems they ship is worth more than any single afternoon." },
                { type: "quote", content: "If you only know what your tools claim to do, you're at the mercy of the people who wrote the docs. If you know how they actually work, you're free." }
            ]
        },
        ru: {
            title: "Чтение исходников — это карьерный навык",
            excerpt: "Senior-инженеры, которых я уважаю больше всего, делятся одной привычкой: читают исходники для удовольствия. Зачем — и как не утонуть.",
            sections: [
                { type: "p", content: "Middle-инженеры гуглят свои проблемы. Senior-инженеры читают исходники. Разрыв между ними — не в интеллекте, а в привычке. Хорошая новость: привычка обучаема, и как только она у вас появляется, почти каждая система, к которой вы прикасаетесь, становится читаемой." },
                { type: "h2", content: "Почему чтение окупается" },
                { type: "p", content: "Документация говорит, что система делает в хороший день. Исходник показывает, что она делает в плохой, чего реально боялся автор и где сидят дизайн-компромиссы. Когда читаете `vacuum.c` в Postgres, понимаете, почему длинные транзакции — это проблема для хранилища. Когда читаете RAF-цикл Lenis, понимаете, почему scroll плавный на любом устройстве. Такие знания накапливаются; знания документации устаревают." },
                { type: "h2", content: "Какие исходники реально окупаются" },
                { type: "list", items: [
                    "То, чем пользуетесь каждый день. Postgres, Redis, ваш фреймворк, рантайм. Часы на дебаг потом окупятся с лихвой.",
                    "Системы с сильными мнениями. SQLite, Linux, Lua, Vue, htmx. Сильные мнения учат больше, чем дизайн-комитет.",
                    "Что-то достаточно маленькое, чтобы дочитать. Lenis (~1 файл сути), curl, одно расширение Postgres. Выбирайте цель, которую сможете закрыть."
                ] },
                { type: "h2", content: "Как читать и не утонуть" },
                { type: "ordered", items: [
                    "Начните с точки входа. Найдите `main`, экспортируемый API или обработчик запросов. Сначала картируйте это.",
                    "Следуйте одному конкретному пути. «Что происходит, когда я делаю X?» бьёт «понять кодовую базу» всегда.",
                    "Читайте тесты. Это документация, которая врёт реже.",
                    "Пробегите issue tracker по тому же компоненту. Точки боли — это ненаписанные главы дизайна.",
                    "Напишите саммари на 200 слов своими словами. Если не получается — не поняли."
                ] },
                { type: "h2", content: "Что я с этого получил" },
                { type: "p", content: "Чтение планировщика vLLM ускорило мой Kaggle-пайплайн AIMO в 3 раза. Чтение фреймворка Frappe научило, как делать стабильные деплои ERPNext через апгрейды. Чтение контракта Anthropic Messages API научило проектировать слой инструментов как композируемые блоки, а не как RPC-эндпоинты. Ни один из этих выигрышей не пришёл из документации." },
                { type: "h2", content: "Честное препятствие" },
                { type: "p", content: "Сначала чтение исходников ощущается медленным. Потратите 90 минут на то, что кажется 5-минутным вопросом. Это цена. Долгосрочная ценность того, что вы реально понимаете системы, которые поставляете, дороже любого отдельного полудня." },
                { type: "quote", content: "Если знаете только то, что ваши инструменты заявляют — вы в милости тех, кто писал документацию. Если знаете, как они работают — вы свободны." }
            ]
        }
    },

    {
        slug: "postgres-storage-internals",
        date: "2026-05-22",
        readMinutes: 8,
        tags: ["System Design", "Postgres", "Databases"],
        en: {
            title: "How Postgres Stores Your Data — Pages, Heap, and MVCC",
            excerpt: "Most people use Postgres without ever understanding what happens to a row after INSERT. Here's the tour, and why it matters for your indexes, vacuum settings, and bills.",
            sections: [
                { type: "p", content: "If you treat Postgres as a black box, you eventually pay for it — slow queries you can't explain, vacuum that bloats the database, or replication lag that surprises you. The fix is understanding the storage layer. It's smaller than you think." },
                { type: "h2", content: "Everything is a page" },
                { type: "p", content: "Postgres stores data in fixed-size 8KB blocks called pages. A table is a heap of pages on disk. When you INSERT a row, Postgres finds a page with free space, writes the row (a tuple) at the end, and updates a small page header. There's no random ordering, no sorting — heap means heap. Indexes give you order; the heap doesn't owe you any." },
                { type: "h2", content: "What a tuple actually contains" },
                { type: "p", content: "A tuple is more than its column values. Each tuple has a header with `xmin`, `xmax`, and `ctid`. `xmin` is the transaction ID that inserted the row. `xmax` is the transaction ID that deleted or updated it (if any). `ctid` is the physical location: (page, offset). These three fields are how Postgres implements MVCC — multi-version concurrency control." },
                { type: "h2", content: "MVCC is just visibility rules" },
                { type: "p", content: "When your transaction reads a row, Postgres checks: was `xmin` committed before my snapshot? And was `xmax` either still running or committed after my snapshot? If yes — you see the row. If no — invisible. The genius is that readers never block writers and writers never block readers. The cost is that 'updates' are really 'mark old + insert new', and deletions just set `xmax`. Your data doesn't actually leave." },
                { type: "h2", content: "Which is why VACUUM exists" },
                { type: "p", content: "Once nobody can see an old tuple anymore, it's dead — but still on disk. VACUUM walks the table, finds dead tuples, and reclaims their space for future inserts. If you stop running VACUUM (or have a long-running transaction blocking it), the table bloats: queries get slower because pages contain more dead than live rows. Autovacuum handles most of this — but it's tunable, not magic." },
                { type: "code", lang: "sql", content: "-- See bloat fast on a hot table\nSELECT relname, n_live_tup, n_dead_tup,\n       round(n_dead_tup * 100.0 / NULLIF(n_live_tup,0), 1) AS dead_pct\nFROM pg_stat_user_tables\nWHERE n_dead_tup > 1000\nORDER BY dead_pct DESC NULLS LAST\nLIMIT 10;" },
                { type: "h2", content: "Indexes are separate physical structures" },
                { type: "p", content: "A B-tree index is its own set of pages, separate from the heap. Each index entry stores the indexed value and a `ctid` pointing back to the heap. That's why an index-only scan is so fast — Postgres never visits the heap. It's also why HOT updates matter: if your update doesn't touch any indexed column, Postgres can avoid touching the index entirely." },
                { type: "h2", content: "Three practical takeaways" },
                { type: "list", items: [
                    "Long-running transactions are your enemy. They prevent VACUUM from reclaiming space anywhere in the database.",
                    "Updates aren't free. Even a 1-byte change rewrites the whole row and probably touches indexes.",
                    "Index columns you actually filter or sort on. Every index is extra writes, extra storage, extra autovacuum work."
                ] },
                { type: "h2", content: "The pattern keeps repeating" },
                { type: "p", content: "Once you understand pages-and-tuples, the rest of Postgres clicks faster. Replication is just shipping page changes (WAL). Logical replication is decoding WAL into row events. Partitioning is splitting one heap into many. Same primitives, different uses. Read the storage chapter of the docs once and `src/backend/access/heap/` once — you'll never see Postgres the same way." }
            ]
        },
        ru: {
            title: "Как Postgres хранит ваши данные — страницы, куча и MVCC",
            excerpt: "Большинство людей пользуются Postgres, не зная, что происходит с строкой после INSERT. Вот тур, и почему это важно для индексов, vacuum и счетов за хранилище.",
            sections: [
                { type: "p", content: "Если относиться к Postgres как к чёрному ящику, рано или поздно заплатите — медленными запросами, которые не можете объяснить, vacuum'ом, который раздувает БД, или replication lag'ом, который удивит. Фикс — понимать слой хранилища. Он меньше, чем кажется." },
                { type: "h2", content: "Всё — это страница" },
                { type: "p", content: "Postgres хранит данные в блоках фиксированного размера 8КБ — страницах. Таблица — это куча страниц на диске. При INSERT Postgres находит страницу со свободным местом, пишет строку (tuple) в конец и обновляет маленький заголовок страницы. Никакого случайного порядка, никакой сортировки — куча значит куча. Порядок дают индексы; heap вам ничего не должен." },
                { type: "h2", content: "Что реально лежит в tuple" },
                { type: "p", content: "Tuple — это больше, чем значения колонок. У каждого tuple есть заголовок с `xmin`, `xmax` и `ctid`. `xmin` — ID транзакции, вставившей строку. `xmax` — ID транзакции, удалившей или обновившей её (если есть). `ctid` — физическое расположение: (страница, offset). Эти три поля и есть то, как Postgres реализует MVCC — multi-version concurrency control." },
                { type: "h2", content: "MVCC — это просто правила видимости" },
                { type: "p", content: "Когда ваша транзакция читает строку, Postgres проверяет: коммитнут ли `xmin` до моего снапшота? И `xmax` всё ещё запущен или коммитнут после моего снапшота? Если да — видите. Если нет — невидима. Гениальность в том, что читатели не блокируют писателей и наоборот. Цена — «обновления» это на самом деле «пометить старое + вставить новое», а удаления только проставляют `xmax`. Данные физически не уходят." },
                { type: "h2", content: "Поэтому существует VACUUM" },
                { type: "p", content: "Когда старый tuple никто уже не может видеть — он мёртв, но всё ещё на диске. VACUUM проходит по таблице, находит мёртвые tuple'ы и возвращает их место для будущих вставок. Если перестать запускать VACUUM (или иметь долгую транзакцию, которая его блокирует) — таблица раздувается: запросы становятся медленнее, потому что в страницах больше мёртвых строк, чем живых. Autovacuum закрывает большинство случаев — но он настраиваемый, а не магический." },
                { type: "code", lang: "sql", content: "-- Быстро посмотреть bloat на горячей таблице\nSELECT relname, n_live_tup, n_dead_tup,\n       round(n_dead_tup * 100.0 / NULLIF(n_live_tup,0), 1) AS dead_pct\nFROM pg_stat_user_tables\nWHERE n_dead_tup > 1000\nORDER BY dead_pct DESC NULLS LAST\nLIMIT 10;" },
                { type: "h2", content: "Индексы — отдельные физические структуры" },
                { type: "p", content: "B-tree индекс — это собственный набор страниц, отдельный от heap. Каждая запись индекса хранит индексированное значение и `ctid`, указывающий обратно в heap. Поэтому index-only scan такой быстрый — Postgres не идёт в heap. Поэтому же важны HOT updates: если апдейт не трогает индексированную колонку, Postgres может не трогать индекс вообще." },
                { type: "h2", content: "Три практических вывода" },
                { type: "list", items: [
                    "Долгие транзакции — ваш враг. Они мешают VACUUM освобождать место везде в базе.",
                    "Апдейты не бесплатны. Даже 1-байтовое изменение перезаписывает строку и, скорее всего, трогает индексы.",
                    "Индексируйте колонки, по которым реально фильтруете или сортируете. Каждый индекс — дополнительные записи, хранилище, autovacuum."
                ] },
                { type: "h2", content: "Паттерн повторяется" },
                { type: "p", content: "Когда понимаете pages-and-tuples — остальное в Postgres щёлкает быстрее. Репликация — это просто шиппинг изменений страниц (WAL). Логическая репликация — это декодинг WAL в события на уровне строк. Партиционирование — разбиение одной кучи на много. Те же примитивы, разное применение. Прочитайте главу про storage в документации один раз и `src/backend/access/heap/` один раз — Postgres больше никогда не будет тем же." }
            ]
        }
    },

    {
        slug: "why-redis-is-fast",
        date: "2026-05-15",
        readMinutes: 7,
        tags: ["System Design", "Redis", "Performance"],
        en: {
            title: "Why Redis Is Fast — The Single-Threaded Event Loop Explained",
            excerpt: "Redis hits 100k+ ops/sec on commodity hardware with a single thread. Here's how, why that's a good design, and where it stops being one.",
            sections: [
                { type: "p", content: "The first thing that surprises people about Redis is its core architecture: a single thread, executing commands one at a time, on top of an event loop. In a world that worships parallelism, that sounds slow. It isn't. Redis routinely outperforms multi-threaded databases on the workloads it targets, and the reasons are worth understanding." },
                { type: "h2", content: "Single-threaded means atomic" },
                { type: "p", content: "Because one thread runs all commands, every command is atomic against every other command. No locks, no race conditions, no torn reads. `INCR`, `LPUSH`, `HSET` — they all 'just work' under concurrency. This is a huge simplification compared to a multi-threaded database where every operation must coordinate with every other." },
                { type: "h2", content: "In-memory means cheap" },
                { type: "p", content: "Redis lives in RAM. A read or write is at worst a pointer chase plus a small amount of work — nanoseconds. A traditional database has to fight with the page cache, with disk, with the OS. Redis sidesteps all of it. The price is your dataset has to fit in memory; the upside is that almost every operation is faster than a network round-trip." },
                { type: "h2", content: "The event loop hides the latency" },
                { type: "p", content: "How can a single thread serve thousands of clients? An event loop. Redis uses `epoll` on Linux (or `kqueue` on macOS/BSD) to track which sockets have work to do. When a client sends a command, its socket becomes readable; the event loop notices and dispatches the command. While one client's command runs, the OS kernel has already buffered the next client's bytes. There's no waiting in queue — just continuous dispatch." },
                { type: "h2", content: "Where the threads do show up" },
                { type: "p", content: "Redis 6 introduced I/O threads. The command-execution path is still single-threaded, but reading bytes off sockets and writing bytes to them — protocol parsing — runs in worker threads. This is a smart move: I/O is the part that benefits from parallelism, and the atomic-command guarantee is preserved." },
                { type: "h2", content: "Persistence: AOF vs RDB" },
                { type: "p", content: "Redis offers two persistence models, both designed not to slow down the hot path:" },
                { type: "list", items: [
                    "RDB: periodic forked snapshots. The fork copies the address space using copy-on-write, so the parent keeps serving requests while the child writes the snapshot.",
                    "AOF: append every write command to a log. Configurable fsync — `always` (slowest, safest), `everysec` (default, lose at most a second), or `no` (let the OS decide).",
                    "Most production setups use AOF with `everysec` plus periodic RDB for fast reloads."
                ] },
                { type: "h2", content: "Where single-threaded breaks down" },
                { type: "p", content: "Redis is fast as long as no individual command takes long. A `KEYS *` on a million keys, a `SORT` on a huge list, an `LPOP 100000` — these block the event loop. Every other client waits. The fix isn't to add threads; it's to use commands that bound their work: `SCAN` instead of `KEYS`, `LPOP count` carefully, `MEMORY USAGE` sampling." },
                { type: "h2", content: "Two takeaways" },
                { type: "ordered", items: [
                    "Single-threaded with an event loop is a feature, not a limitation. It buys you atomicity, simplicity, and predictable latency in exchange for one thing: don't run slow commands.",
                    "When you need parallelism, the answer is more Redis instances (sharding, Redis Cluster), not more threads in one. The architecture scales out, not up."
                ] },
                { type: "p", content: "When you understand why Redis is fast, you also understand when it stops being fast — and when to reach for something else entirely. That's the job of system design." }
            ]
        },
        ru: {
            title: "Почему Redis быстрый — однопоточный event loop простыми словами",
            excerpt: "Redis выдаёт 100k+ операций/сек на обычном железе одним потоком. Вот как, почему это хороший дизайн и где он перестаёт работать.",
            sections: [
                { type: "p", content: "Первое, что удивляет людей в Redis — его core-архитектура: один поток, выполняющий команды по одной, поверх event loop. В мире, поклоняющемся параллелизму, это звучит медленно. Это не так. Redis регулярно обгоняет многопоточные БД на своих нагрузках, и причины стоит понять." },
                { type: "h2", content: "Однопоточность значит атомарность" },
                { type: "p", content: "Так как один поток выполняет все команды, каждая команда атомарна относительно остальных. Никаких блокировок, никаких race conditions, никаких рваных чтений. `INCR`, `LPUSH`, `HSET` — все «просто работают» при конкуренции. Это огромное упрощение по сравнению с многопоточной БД, где каждая операция должна координироваться со всеми остальными." },
                { type: "h2", content: "In-memory значит дёшево" },
                { type: "p", content: "Redis живёт в RAM. Чтение или запись в худшем случае — это разыменование указателя плюс немного работы; наносекунды. Традиционной БД приходится бороться с page cache, диском, ОС. Redis обходит всё это. Цена — датасет должен помещаться в память; плюс — почти любая операция быстрее сетевого round-trip." },
                { type: "h2", content: "Event loop прячет задержку" },
                { type: "p", content: "Как один поток обслуживает тысячи клиентов? Event loop. Redis использует `epoll` на Linux (или `kqueue` на macOS/BSD), чтобы отслеживать, у каких сокетов есть работа. Когда клиент шлёт команду — его сокет становится readable; event loop замечает и диспатчит команду. Пока выполняется команда одного клиента, ядро уже буферизирует байты следующего. Нет ожидания в очереди — только непрерывный dispatch." },
                { type: "h2", content: "Где появляются потоки" },
                { type: "p", content: "В Redis 6 появились I/O threads. Путь выполнения команд всё ещё однопоточный, но чтение байтов из сокетов и запись в них — парсинг протокола — выполняется в worker-потоках. Умный ход: I/O — это часть, которая выигрывает от параллелизма, и гарантия атомарности команд сохранена." },
                { type: "h2", content: "Персистентность: AOF vs RDB" },
                { type: "p", content: "Redis предлагает две модели персистентности, обе спроектированы не замедлять hot path:" },
                { type: "list", items: [
                    "RDB: периодические fork-снапшоты. Fork копирует адресное пространство через copy-on-write, родитель продолжает обслуживать запросы, ребёнок пишет снапшот.",
                    "AOF: append каждой пишущей команды в лог. Настраиваемый fsync — `always` (самый медленный/безопасный), `everysec` (дефолт, теряете максимум секунду), `no` (доверяете ОС).",
                    "В большинстве production-сетапов AOF с `everysec` плюс периодический RDB для быстрых перезагрузок."
                ] },
                { type: "h2", content: "Где однопоточность ломается" },
                { type: "p", content: "Redis быстрый, пока ни одна команда не идёт долго. `KEYS *` на миллионе ключей, `SORT` на огромном списке, `LPOP 100000` — это блокирует event loop. Все остальные клиенты ждут. Фикс — не добавлять потоки, а использовать команды с ограниченной работой: `SCAN` вместо `KEYS`, аккуратный `LPOP count`, sampling через `MEMORY USAGE`." },
                { type: "h2", content: "Два вывода" },
                { type: "ordered", items: [
                    "Однопоточность + event loop — это фича, не ограничение. Покупаете атомарность, простоту, предсказуемую latency в обмен на одно: не запускайте медленные команды.",
                    "Когда нужен параллелизм, ответ — больше инстансов Redis (sharding, Redis Cluster), а не больше потоков в одном. Архитектура масштабируется горизонтально, не вертикально."
                ] },
                { type: "p", content: "Когда понимаете, почему Redis быстрый — понимаете и когда он перестаёт быть быстрым, и когда стоит брать что-то другое. Это и есть работа system design." }
            ]
        }
    },

    {
        slug: "inside-kafka-distributed-log",
        date: "2026-05-08",
        readMinutes: 8,
        tags: ["System Design", "Kafka", "Distributed Systems"],
        en: {
            title: "Inside Kafka — What Makes a Distributed Log Work",
            excerpt: "Kafka's whole personality is one good idea: 'what if the database were a log?' Here's how that idea translates into a system that survives 10 PB and 10,000 services.",
            sections: [
                { type: "p", content: "Most database designs start with 'how do we update rows fast?'. Kafka starts with 'what if we never updated anything, and just appended?'. From that single decision, almost everything else falls out: throughput, replication, replay, the whole consumer model. If you understand the log, you understand Kafka." },
                { type: "h2", content: "A topic is partitions, a partition is a log" },
                { type: "p", content: "A Kafka topic is split into partitions. Each partition is an append-only file (well, a sequence of segment files). Producers write to the end. Consumers read from anywhere. There's no UPDATE, no DELETE in the storage path — just append. That's why Kafka can sustain millions of writes per second on commodity disks: appends are the cheapest possible operation a disk can do." },
                { type: "h2", content: "Order is per-partition, not per-topic" },
                { type: "p", content: "This is the most-misunderstood Kafka property. Within a partition, messages are strictly ordered. Across partitions, no ordering guarantees. If you need 'all events for user 42 in order', you must route them all to the same partition — usually by hashing the user ID as the key. Get this wrong and you'll see ordering bugs in production that are very hard to debug later." },
                { type: "h2", content: "Replication and ISR" },
                { type: "p", content: "Each partition has a leader broker and a configurable number of replicas (followers). Producers write to the leader; followers pull copies. The set of replicas that are caught up to the leader's log is the ISR — In-Sync Replicas. If a producer requests `acks=all`, the leader doesn't acknowledge the write until every ISR has it. That's how Kafka survives broker failures: any ISR can be promoted to leader and continue without data loss." },
                { type: "h2", content: "Consumers are stateful, but only barely" },
                { type: "p", content: "A Kafka consumer doesn't 'subscribe and wait for messages'. It pulls. It reads its current offset (a per-partition number), fetches batches starting from that offset, processes them, and commits a new offset. The broker doesn't track 'who has read what' the way most queues do. The consumer owns its position. This is why Kafka can have 10,000 consumers reading the same topic with zero coordination overhead." },
                { type: "h2", content: "Consumer groups handle the parallelism" },
                { type: "p", content: "When you want parallel processing, you put consumers into a consumer group. Kafka assigns partitions to group members so each partition is consumed by exactly one member. Add a consumer? Kafka rebalances. Lose one? Same. The unit of parallelism is partitions — adding consumers beyond your partition count gives you idle members, not more throughput." },
                { type: "code", lang: "yaml", content: "# Mental model for capacity planning\ntopic:\n  name: orders\n  partitions: 24       # max parallel consumers\n  replication-factor: 3 # tolerate 2 broker failures\n  retention.ms: 604800000  # 7 days replay window\n\nconsumer-group: order-processors\n  members: 24          # 1:1 with partitions = max throughput\n  members > 24 = idle  # not more throughput" },
                { type: "h2", content: "Retention is replay" },
                { type: "p", content: "Most queues delete messages after they're consumed. Kafka keeps them — by default, for 7 days, sometimes forever. This means a brand new consumer can rewind to the beginning of a topic and replay history. Bug in your processing logic? Reset offsets, re-read. Build a new aggregation? Read the whole log into your new system. The log isn't a queue; it's a durable event archive that you happen to consume from." },
                { type: "h2", content: "When Kafka is the wrong tool" },
                { type: "list", items: [
                    "Tiny scale (<1 MB/s, dozens of events). The operational complexity isn't worth it; use Postgres LISTEN/NOTIFY or SQS.",
                    "Strict cross-partition ordering. Pick a partitioning key that captures your true ordering boundary, or don't use Kafka.",
                    "Variable-priority work. Kafka has no priority queues; that's a queue feature, not a log feature."
                ] },
                { type: "h2", content: "The mental model that pays off" },
                { type: "p", content: "Stop thinking 'message broker' and start thinking 'distributed log'. Producers append. Consumers read at their own pace. Replication is just copying log segments to other brokers. Replay is just resetting your offset. Once that mental model is solid, Kafka stops being mysterious and starts being almost obvious." }
            ]
        },
        ru: {
            title: "Внутри Kafka — что делает распределённый лог рабочим",
            excerpt: "Вся сущность Kafka — одна хорошая идея: «а что если БД будет логом?». Вот как эта идея превращается в систему, выдерживающую 10 ПБ и 10 000 сервисов.",
            sections: [
                { type: "p", content: "Большинство БД начинают с «как обновлять строки быстро?». Kafka начинает с «а если ничего не обновлять, а только добавлять?». Из этого одного решения вылетает почти всё остальное: throughput, репликация, replay, вся consumer-модель. Если поняли лог — поняли Kafka." },
                { type: "h2", content: "Топик — это партиции, партиция — это лог" },
                { type: "p", content: "Топик Kafka разбит на партиции. Каждая партиция — append-only файл (точнее, последовательность segment-файлов). Producer'ы пишут в конец. Consumer'ы читают откуда угодно. В пути хранилища нет UPDATE и DELETE — только append. Поэтому Kafka выдаёт миллионы записей в секунду на обычных дисках: append — самая дешёвая операция, которую может сделать диск." },
                { type: "h2", content: "Порядок — по партициям, не по топику" },
                { type: "p", content: "Самое часто-непонимаемое свойство Kafka. Внутри партиции сообщения строго упорядочены. Между партициями — никаких гарантий. Если нужно «все события для пользователя 42 по порядку» — все они должны лететь в одну партицию, обычно через хеш user ID как ключа. Если ошибиться — поймаете в продакшене баги порядка, которые потом очень тяжело дебажить." },
                { type: "h2", content: "Репликация и ISR" },
                { type: "p", content: "У каждой партиции есть лидер-брокер и настраиваемое число реплик (followers). Producer'ы пишут лидеру; followers подтягивают копии. Набор реплик, догнавших лидера, — это ISR (In-Sync Replicas). Если producer запросил `acks=all` — лидер не ACK'ает запись, пока её не получили все ISR. Так Kafka переживает падения брокеров: любая ISR может стать лидером без потери данных." },
                { type: "h2", content: "Consumer'ы stateful, но еле-еле" },
                { type: "p", content: "Consumer Kafka не «подписывается и ждёт сообщений». Он pull'ит. Читает свой текущий offset (число на партицию), фетчит батчи начиная с него, обрабатывает, коммитит новый offset. Брокер не трекает «кто что прочитал», как большинство очередей. Consumer владеет своей позицией. Поэтому в Kafka может быть 10 000 consumer'ов, читающих один топик с нулевым оверхедом координации." },
                { type: "h2", content: "Consumer groups дают параллелизм" },
                { type: "p", content: "Когда нужна параллельная обработка — кладёте consumer'ов в consumer group. Kafka назначает партиции участникам так, что каждую партицию читает ровно один. Добавили consumer'а? Kafka делает rebalance. Потеряли? То же. Единица параллелизма — партиция; добавлять consumer'ов сверх числа партиций бесполезно — простаивающие, а не больше throughput." },
                { type: "code", lang: "yaml", content: "# Ментальная модель для capacity planning\ntopic:\n  name: orders\n  partitions: 24       # макс. параллельных consumer'ов\n  replication-factor: 3 # переживёт 2 падения брокера\n  retention.ms: 604800000  # окно replay 7 дней\n\nconsumer-group: order-processors\n  members: 24          # 1:1 с партициями = макс throughput\n  members > 24 = idle  # не больше throughput" },
                { type: "h2", content: "Retention — это replay" },
                { type: "p", content: "Большинство очередей удаляют сообщения после потребления. Kafka их хранит — по умолчанию 7 дней, иногда навсегда. Это значит, новый consumer может перемотать в начало топика и переиграть историю. Баг в логике обработки? Сбросьте offset'ы, перечитайте. Строите новую аналитику? Прочитайте весь лог в новую систему. Лог — не очередь; это durable event-архив, из которого вы случайно потребляете." },
                { type: "h2", content: "Когда Kafka — неправильный инструмент" },
                { type: "list", items: [
                    "Маленький масштаб (<1 МБ/с, десятки событий). Операционная сложность того не стоит; используйте Postgres LISTEN/NOTIFY или SQS.",
                    "Строгий cross-partition ordering. Выберите ключ партиционирования, отражающий настоящую границу порядка, либо не используйте Kafka.",
                    "Работа с переменным приоритетом. В Kafka нет priority-очередей; это фича очередей, не лога."
                ] },
                { type: "h2", content: "Ментальная модель, которая окупается" },
                { type: "p", content: "Перестаньте думать «message broker» и начните «distributed log». Producer'ы append'ят. Consumer'ы читают в своём темпе. Репликация — это копирование log-сегментов на другие брокеры. Replay — это сброс offset'а. Когда модель устаканится — Kafka перестаёт быть мистикой и становится почти очевидной." }
            ]
        }
    },

    {
        slug: "vllm-continuous-batching",
        date: "2026-05-01",
        readMinutes: 7,
        tags: ["AI", "vLLM", "Performance", "System Design"],
        en: {
            title: "How vLLM's Continuous Batching Actually Works",
            excerpt: "If you're serving an LLM in production and not using continuous batching, you're throwing away 80% of your GPU. Here's how vLLM does it.",
            sections: [
                { type: "p", content: "I learned this the hard way during the AIMO Kaggle competition. My first inference loop used naive batching — wait for N requests, generate together, return. GPU utilization was 17%. After porting to vLLM with continuous batching, the same hardware did 5× the throughput. The difference is one design choice: don't wait." },
                { type: "h2", content: "The problem with static batching" },
                { type: "p", content: "Static batching means you collect N requests, run them through the model together, and emit responses. Two problems. First, requests have wildly different output lengths — when one request needs 50 tokens and another needs 800, you end up generating 800 tokens for every member of the batch. The short requests waste compute waiting. Second, new requests can't join until the current batch finishes — head-of-line blocking on every batch." },
                { type: "h2", content: "Continuous batching is iteration-level scheduling" },
                { type: "p", content: "vLLM (and similar serving stacks) schedule at the level of individual decoding iterations, not whole requests. Every step:" },
                { type: "ordered", items: [
                    "Take the current set of running requests.",
                    "Add any newly-arrived requests that have prefilled.",
                    "Drop any requests that finished (hit EOS or max_tokens).",
                    "Run one decoding step on whatever's currently active.",
                    "Repeat."
                ] },
                { type: "p", content: "There's no 'batch' that has to finish together. Requests join and leave the active set continuously. A short request finishes after 50 iterations and frees its slot for a newcomer. A long request stays in the active set until it's done. The GPU is never idle waiting for the slowest member of a fixed batch." },
                { type: "h2", content: "PagedAttention makes it fit in memory" },
                { type: "p", content: "Continuous batching is only useful if you can actually fit many concurrent requests in GPU memory. The bottleneck is the KV cache — every active request keeps its attention keys and values around for every layer. In a naive serving stack, you allocate a contiguous block per request based on max_tokens. Most of it goes unused. vLLM's PagedAttention solves this by treating KV cache like virtual memory: split into fixed-size pages, allocated on demand, addressed through a page table. A request only pays for the tokens it has actually generated." },
                { type: "h2", content: "What this looks like operationally" },
                { type: "list", items: [
                    "Throughput goes up 3–10× compared to static batching, depending on output-length variance.",
                    "Tail latency improves dramatically — short requests aren't held hostage by long ones.",
                    "GPU utilization climbs from ~20% to 70–90% on real workloads.",
                    "Memory becomes the binding constraint, not compute. Your max concurrent requests = (free GPU mem) / (KV cache per token × tokens per request)."
                ] },
                { type: "h2", content: "Where it stops helping" },
                { type: "p", content: "Continuous batching helps when many requests are decoding at once. If your traffic is bursty and idle most of the time, the win is small — there's nothing to batch. If your individual requests are gigantic (long contexts, max_tokens=8000), one request can saturate memory and you're back to single-request serving. And if your model is small enough that it fits 100 requests trivially, the bottleneck might be elsewhere — tokenizer, network — and vLLM can't help with that." },
                { type: "h2", content: "The takeaway for engineers" },
                { type: "p", content: "Whether you use vLLM, TGI, or your own serving stack, the operating principle is the same: schedule at the iteration level, allocate KV cache lazily, never wait for slow members. If you're hand-rolling LLM serving without those properties in 2026, you're either teaching yourself how it works (good!) or paying for hardware you're not using (bad)." }
            ]
        },
        ru: {
            title: "Как реально работает continuous batching в vLLM",
            excerpt: "Если вы серверите LLM в продакшене без continuous batching — вы выбрасываете 80% GPU. Вот как это делает vLLM.",
            sections: [
                { type: "p", content: "Я выучил это тяжёлым путём во время Kaggle-соревнования AIMO. Первый inference-loop использовал наивный батчинг — ждать N запросов, генерить вместе, отдавать. GPU utilization был 17%. После переноса на vLLM с continuous batching то же железо выдало 5× throughput. Разница — одно проектное решение: не ждать." },
                { type: "h2", content: "Проблема static batching" },
                { type: "p", content: "Static batching — это собрать N запросов, прогнать их через модель вместе, отдать ответы. Две проблемы. Первая — у запросов сильно разная длина вывода: когда один просит 50 токенов, а другой 800, вы генерите 800 токенов для каждого участника батча. Короткие запросы тратят compute на ожидание. Вторая — новые запросы не могут войти, пока текущий батч не закончится; head-of-line blocking на каждом батче." },
                { type: "h2", content: "Continuous batching — это планирование на уровне итераций" },
                { type: "p", content: "vLLM (и похожие serving-стеки) планируют на уровне отдельных decoding-итераций, а не запросов целиком. Каждый шаг:" },
                { type: "ordered", items: [
                    "Берёте текущий набор активных запросов.",
                    "Добавляете любые новопришедшие, которые сделали prefill.",
                    "Удаляете завершившиеся (EOS или max_tokens).",
                    "Запускаете один decoding-шаг на всём активном.",
                    "Повторяете."
                ] },
                { type: "p", content: "Нет «батча», который должен закончиться вместе. Запросы непрерывно входят и выходят из активного набора. Короткий запрос заканчивается за 50 итераций и освобождает слот новичку. Длинный остаётся в активе до конца. GPU никогда не простаивает в ожидании самого медленного." },
                { type: "h2", content: "PagedAttention помещает это в память" },
                { type: "p", content: "Continuous batching полезен только если действительно влезает много одновременных запросов в GPU-память. Бутылочное горлышко — KV cache: каждый активный запрос держит attention keys/values для каждого слоя. В наивном serving выделяется непрерывный блок на запрос исходя из max_tokens. Большая часть простаивает. PagedAttention в vLLM решает это, обращаясь с KV-кэшем как с виртуальной памятью: фиксированные страницы, аллокация по требованию, адресация через page table. Запрос платит только за реально сгенерированные токены." },
                { type: "h2", content: "Как это выглядит на практике" },
                { type: "list", items: [
                    "Throughput растёт в 3–10× по сравнению со static batching — в зависимости от разброса длин вывода.",
                    "Tail latency драматически улучшается — короткие запросы не заложники длинных.",
                    "GPU utilization идёт с ~20% до 70–90% на реальных нагрузках.",
                    "Память становится связующим ограничением, не compute. Макс одновременных запросов = (свободная GPU mem) / (KV-кэш на токен × токенов на запрос)."
                ] },
                { type: "h2", content: "Где это перестаёт помогать" },
                { type: "p", content: "Continuous batching помогает, когда много запросов декодируют одновременно. Если трафик spiky и большую часть времени idle — выигрыш маленький, нечего батчить. Если запросы гигантские (длинный контекст, max_tokens=8000), один запрос насыщает память, и вы снова в режиме «один запрос за раз». А если модель такая маленькая, что 100 запросов влезают тривиально — бутылочное горлышко может быть в другом месте (токенизатор, сеть), и vLLM тут не поможет." },
                { type: "h2", content: "Вывод для инженеров" },
                { type: "p", content: "Используете vLLM, TGI или свой serving — принцип один: планируйте на уровне итераций, аллокируйте KV-кэш лениво, никогда не ждите медленных участников. Если в 2026 пишете LLM-сервинг без этих свойств — либо учитесь, как это работает (хорошо!), либо платите за неиспользуемое железо (плохо)." }
            ]
        }
    },

    {
        slug: "caching-patterns-real-traffic",
        date: "2026-04-26",
        readMinutes: 7,
        tags: ["System Design", "Caching", "Performance"],
        en: {
            title: "Caching Patterns That Survive Real Traffic",
            excerpt: "There are two hard things in computer science. This post is about one of them. Pick the wrong cache pattern and you'll spend a quarter chasing inconsistencies.",
            sections: [
                { type: "p", content: "Adding a cache feels free. Read traffic plummets, latency drops, your dashboards glow green. Then you ship a feature that updates a record, and an hour later customer support is asking why the new price isn't showing up. Welcome to cache invalidation. The good news is the patterns are well-understood; the bad news is you have to actually pick one and stick to it." },
                { type: "h2", content: "Cache-aside (lazy) — the default" },
                { type: "p", content: "App reads from cache; if missing, reads from DB and writes to cache; on update, invalidates the cache key. Pros: simple, only caches what's actually read, naturally tolerates cache failure (just slower). Cons: first request after invalidation pays the DB hit; race conditions if two requests miss at once." },
                { type: "code", lang: "python", content: "# Cache-aside read\nval = redis.get(key)\nif val is None:\n    val = db.fetch(key)\n    redis.setex(key, TTL, val)\nreturn val\n\n# Cache-aside update\ndb.write(key, new_val)\nredis.delete(key)  # next read repopulates" },
                { type: "h2", content: "Write-through — strong consistency, slower writes" },
                { type: "p", content: "Every write goes to cache and DB synchronously. Pros: cache and DB never disagree on the latest write. Cons: writes pay both costs; cache failures break writes; you cache things nobody will read." },
                { type: "h2", content: "Write-behind — fast writes, eventual durability" },
                { type: "p", content: "Writes hit the cache immediately and a background worker flushes them to the DB. Pros: blazing-fast writes. Cons: data loss if cache crashes before flush; ordering and idempotency issues. Use only when the value is high (real-time leaderboards, telemetry) and the durability cost is acceptable." },
                { type: "h2", content: "TTL is your safety net" },
                { type: "p", content: "Even with cache-aside, set a TTL. It's the upper bound on how long bad invalidation can hurt you. Without TTL, a missed invalidate event lives forever; with TTL, the worst case is bounded. Pick TTL based on staleness tolerance: minutes for product details, seconds for dashboards, hours for slowly-changing reference data." },
                { type: "h2", content: "Cache stampede — the moment everyone misses" },
                { type: "p", content: "Popular key expires. A thousand concurrent requests miss simultaneously. All thousand hit the DB. The DB folds. The cache repopulates. The DB recovers. The next minute, same thing. This is a stampede, and it kills services that 'work fine in tests'." },
                { type: "p", content: "Three defenses, in order of complexity:" },
                { type: "list", items: [
                    "Single-flight: when a key misses, lock it locally so only one request actually fetches; others wait on the result.",
                    "Probabilistic early refresh (XFetch): start refreshing the cache before the TTL expires, with a probability that grows as TTL approaches zero. Most stampedes never happen.",
                    "Mutex via the cache itself (e.g., Redis SETNX with a short TTL): when a request decides to refresh, it claims the right; others serve stale data while waiting."
                ] },
                { type: "h2", content: "Cache failure modes you must plan for" },
                { type: "ordered", items: [
                    "Cache is down: app should still work, just slower. Test this — pull the cache and see what falls over.",
                    "Cache is slow: timeouts on cache reads should be small (5–20ms). Slow cache is worse than no cache.",
                    "Cache is full: configure eviction policy (allkeys-lru, volatile-ttl) and monitor it. A cache with 99% evictions isn't a cache.",
                    "Stale data: every cache key needs an invalidation path or a TTL. Not optional."
                ] },
                { type: "h2", content: "The pattern I default to" },
                { type: "p", content: "Cache-aside with a sane TTL, single-flight to prevent stampedes, and explicit invalidation on the write path. It's boring, well-understood, and resilient. The fancy patterns are only worth the complexity when you've proven this one isn't enough." }
            ]
        },
        ru: {
            title: "Паттерны кэширования, выживающие в реальном трафике",
            excerpt: "В computer science есть две сложные вещи. Эта статья об одной из них. Выберете не тот паттерн — потратите квартал на ловлю неконсистентности.",
            sections: [
                { type: "p", content: "Добавить кэш кажется бесплатным. Read-трафик падает, latency снижается, дашборды зеленеют. Потом вы выкатываете фичу, обновляющую запись, через час саппорт спрашивает, почему новая цена не показывается. Добро пожаловать в cache invalidation. Хорошая новость — паттерны изучены; плохая — нужно реально выбрать один и держаться его." },
                { type: "h2", content: "Cache-aside (lazy) — дефолт" },
                { type: "p", content: "Приложение читает из кэша; нет — читает из БД и пишет в кэш; на апдейт инвалидирует ключ. Плюсы: просто, кэширует только реально читаемое, толерантно к падению кэша (просто медленнее). Минусы: первый запрос после инвалидации платит DB-хит; гонки, если два запроса промахиваются одновременно." },
                { type: "code", lang: "python", content: "# Cache-aside чтение\nval = redis.get(key)\nif val is None:\n    val = db.fetch(key)\n    redis.setex(key, TTL, val)\nreturn val\n\n# Cache-aside апдейт\ndb.write(key, new_val)\nredis.delete(key)  # следующее чтение перенасыщает" },
                { type: "h2", content: "Write-through — сильная консистентность, медленные записи" },
                { type: "p", content: "Каждая запись синхронно идёт в кэш и БД. Плюсы: кэш и БД не расходятся по последней записи. Минусы: записи платят за двух; падения кэша ломают записи; кэшируются вещи, которые никто не прочитает." },
                { type: "h2", content: "Write-behind — быстрые записи, eventually-durable" },
                { type: "p", content: "Записи мгновенно попадают в кэш, фоновый worker сливает их в БД. Плюсы: молниеносные записи. Минусы: потеря данных при падении кэша до flush; вопросы порядка и идемпотентности. Используйте, когда ценность высокая (real-time лидерборды, телеметрия), а цена приемлема." },
                { type: "h2", content: "TTL — ваша страховка" },
                { type: "p", content: "Даже с cache-aside ставьте TTL. Это верхняя граница того, как долго плохая инвалидация может больно бить. Без TTL пропущенный invalidate живёт вечно; с TTL — worst case ограничен. Выбирайте TTL по толерантности к staleness: минуты для деталей товара, секунды для дашбордов, часы для медленно меняющихся справочников." },
                { type: "h2", content: "Cache stampede — момент, когда все промахиваются" },
                { type: "p", content: "Популярный ключ протухает. Тысяча параллельных запросов промахивается одновременно. Все тысяча идут в БД. БД складывается. Кэш насыщается заново. БД восстанавливается. Через минуту — то же самое. Это stampede, и он убивает сервисы, которые «нормально работают в тестах»." },
                { type: "p", content: "Три защиты по возрастанию сложности:" },
                { type: "list", items: [
                    "Single-flight: при промахе локально блокируйте ключ, чтобы только один запрос реально фетчил; остальные ждут результат.",
                    "Probabilistic early refresh (XFetch): обновляйте кэш до истечения TTL с вероятностью, растущей по мере приближения TTL к нулю. Большинство stampede никогда не случаются.",
                    "Mutex через сам кэш (например, Redis SETNX с коротким TTL): запрос, решивший обновлять, забирает право; остальные отдают stale, пока ждут."
                ] },
                { type: "h2", content: "Режимы отказа кэша, которые надо планировать" },
                { type: "ordered", items: [
                    "Кэш лежит: приложение должно работать, просто медленнее. Протестируйте — выдерните кэш и посмотрите, что падает.",
                    "Кэш медленный: таймауты на чтение из кэша должны быть короткими (5–20мс). Медленный кэш хуже отсутствия кэша.",
                    "Кэш полный: настройте eviction policy (allkeys-lru, volatile-ttl) и мониторьте. Кэш с 99% evictions — не кэш.",
                    "Stale-данные: у каждого ключа должен быть путь инвалидации или TTL. Не опционально."
                ] },
                { type: "h2", content: "Паттерн по умолчанию" },
                { type: "p", content: "Cache-aside с разумным TTL, single-flight против stampede и явная инвалидация на пути записи. Скучно, изучено, устойчиво. Фантазийные паттерны стоят сложности только когда доказали, что этого не хватает." }
            ]
        }
    },

    {
        slug: "picking-a-queue",
        date: "2026-04-19",
        readMinutes: 6,
        tags: ["System Design", "Queues", "Architecture"],
        en: {
            title: "Picking a Queue — Redis, RabbitMQ, SQS, and Kafka Compared",
            excerpt: "Every project needs a queue eventually. Pick wrong and you're paying for it for years. Here's the honest decision framework.",
            sections: [
                { type: "p", content: "Engineers love debating queue technology. The choice matters less than people think — until it matters a lot. The trick is knowing which axes actually differ between the options, and matching them to your real requirements instead of imagined ones." },
                { type: "h2", content: "Redis (Streams or Lists)" },
                { type: "p", content: "If you already run Redis, this is almost always the right starting point. Redis Streams gives you persistent append-only logs with consumer groups; Lists give you simple `LPUSH` / `BRPOP` queues. Sub-millisecond latency, trivial setup, no extra infrastructure." },
                { type: "list", items: [
                    "Best for: any project where you already use Redis and your queue volumes are < 100k msg/sec.",
                    "Watch out for: persistence tradeoffs (AOF settings matter), single-node memory limits, no first-class delayed messages.",
                    "Killer feature: zero new infrastructure if you have Redis."
                ] },
                { type: "h2", content: "RabbitMQ" },
                { type: "p", content: "The traditional message broker. Strong routing semantics (direct, topic, fanout, headers exchanges), priority queues, delayed messages, dead-letter exchanges built in. AMQP protocol — well-documented and widely-supported." },
                { type: "list", items: [
                    "Best for: complex routing, priority queues, classic 'job queue' workloads in the millions per day.",
                    "Watch out for: operational complexity at scale, memory blowup under slow consumers, the queue-can-be-the-bottleneck pattern.",
                    "Killer feature: rich routing primitives — fan-out and topic exchanges save you from writing your own."
                ] },
                { type: "h2", content: "AWS SQS" },
                { type: "p", content: "Fully managed. You make API calls; AWS handles everything. Standard queues offer at-least-once delivery and roughly-FIFO; FIFO queues offer strict ordering and exactly-once within a group at lower throughput." },
                { type: "list", items: [
                    "Best for: AWS-native architectures where 'don't run anything' is a feature.",
                    "Watch out for: per-message cost adds up, polling latency (long-polling helps), 256KB message size limit, FIFO throughput constraints.",
                    "Killer feature: it just works, even at 3am."
                ] },
                { type: "h2", content: "Kafka" },
                { type: "p", content: "Not a queue, exactly — a distributed log. Messages stick around for the retention period; consumers track their own offsets. Throughput is enormous; the operational story is heavier than anyone tells you upfront." },
                { type: "list", items: [
                    "Best for: high-throughput event streams (>100k msg/sec), replay requirements, fan-out to many independent consumers.",
                    "Watch out for: Zookeeper / KRaft operations, partition planning is forever, no priority queues, replay-as-feature can mask bugs.",
                    "Killer feature: the same log feeds analytics, search indexes, ML pipelines — one source of truth for events."
                ] },
                { type: "h2", content: "The decision tree I actually use" },
                { type: "ordered", items: [
                    "Already run Redis and < 100k msg/sec? Use Redis Streams. Stop researching.",
                    "On AWS, low ops appetite, basic queue semantics? Use SQS. Stop researching.",
                    "Need rich routing or priority queues? RabbitMQ.",
                    "Have event-driven architecture, multi-team consumers, replay requirements? Kafka.",
                    "Anything else? Default to Redis Streams; it's smaller and simpler than people respect."
                ] },
                { type: "h2", content: "What actually breaks queues in production" },
                { type: "p", content: "Whichever you pick, the failure modes converge: poison messages without dead-letter handling, slow consumers backing up the broker, idempotency bugs causing double-processed orders, retries that amplify a transient outage into a permanent one. The technology choice is a 10% factor; the patterns you implement are 90%." },
                { type: "quote", content: "Boring queues handle exciting load. Exciting queues handle boring load." }
            ]
        },
        ru: {
            title: "Выбор очереди — Redis, RabbitMQ, SQS и Kafka в сравнении",
            excerpt: "Любому проекту рано или поздно нужна очередь. Ошибётесь — будете платить за это годами. Вот честный фреймворк выбора.",
            sections: [
                { type: "p", content: "Инженеры любят спорить о выборе технологии очередей. Выбор имеет меньше значения, чем думают, — пока имеет огромное. Фокус в том, чтобы знать, по каким осям опции реально отличаются, и сопоставлять их с реальными требованиями, а не воображаемыми." },
                { type: "h2", content: "Redis (Streams или Lists)" },
                { type: "p", content: "Если у вас уже есть Redis — это почти всегда правильная стартовая точка. Redis Streams даёт persistent append-only логи с consumer-группами; Lists — простые `LPUSH` / `BRPOP` очереди. Sub-миллисекундная latency, тривиальная настройка, без дополнительной инфры." },
                { type: "list", items: [
                    "Лучше всего для: любого проекта, где уже есть Redis и объёмы < 100k msg/сек.",
                    "Осторожнее с: компромиссами персистентности (настройки AOF важны), лимитами памяти одного узла, отсутствием first-class delayed-сообщений.",
                    "Killer-фича: ноль новой инфры, если есть Redis."
                ] },
                { type: "h2", content: "RabbitMQ" },
                { type: "p", content: "Классический брокер сообщений. Сильная семантика роутинга (direct, topic, fanout, headers exchanges), priority-очереди, delayed-сообщения, dead-letter из коробки. Протокол AMQP — хорошо задокументирован и широко поддерживается." },
                { type: "list", items: [
                    "Лучше всего для: сложного роутинга, priority-очередей, классических job-queue нагрузок в миллионы в день.",
                    "Осторожнее с: операционной сложностью на масштабе, разрастанием памяти под медленными consumer'ами, паттерном «очередь-сама-bottleneck».",
                    "Killer-фича: богатые routing-примитивы — fan-out и topic exchanges избавляют от написания своих."
                ] },
                { type: "h2", content: "AWS SQS" },
                { type: "p", content: "Полностью managed. Делаете API-вызовы; AWS делает остальное. Standard queues — at-least-once и приблизительно FIFO; FIFO queues — строгий порядок и exactly-once в группе на меньшем throughput." },
                { type: "list", items: [
                    "Лучше всего для: AWS-нативных архитектур, где «ничего не запускать» — это фича.",
                    "Осторожнее с: per-message ценой, polling latency (long-polling помогает), лимитом 256КБ на сообщение, ограничениями throughput у FIFO.",
                    "Killer-фича: просто работает, даже в 3 ночи."
                ] },
                { type: "h2", content: "Kafka" },
                { type: "p", content: "Не очередь, а distributed log. Сообщения живут retention-период; consumer'ы трекают свои offset'ы. Throughput гигантский; операционная история тяжелее, чем все рассказывают сразу." },
                { type: "list", items: [
                    "Лучше всего для: высокообъёмных event-стримов (>100k msg/сек), требований replay, fan-out на много независимых consumer'ов.",
                    "Осторожнее с: операциями Zookeeper / KRaft, partition planning'ом навсегда, отсутствием priority-очередей, replay-как-фича может скрывать баги.",
                    "Killer-фича: один лог кормит аналитику, поисковые индексы, ML-пайплайны — единый источник правды для событий."
                ] },
                { type: "h2", content: "Decision tree, которым реально пользуюсь" },
                { type: "ordered", items: [
                    "Уже Redis и < 100k msg/сек? Берите Redis Streams. Хватит исследовать.",
                    "На AWS, низкий аппетит к ops, базовая семантика очереди? SQS. Хватит исследовать.",
                    "Нужен rich routing или priority? RabbitMQ.",
                    "Event-driven архитектура, multi-team consumer'ы, replay? Kafka.",
                    "Что-то ещё? По умолчанию Redis Streams; он меньше и проще, чем уважают."
                ] },
                { type: "h2", content: "Что реально ломает очереди в продакшене" },
                { type: "p", content: "Какую бы ни выбрали — режимы отказа сходятся: poison-сообщения без обработки dead-letter, медленные consumer'ы, забивающие брокер, баги идемпотентности с двойной обработкой заказов, ретраи, превращающие временный сбой в постоянный. Выбор технологии — 10% фактора; реализованные паттерны — 90%." },
                { type: "quote", content: "Скучные очереди тащат интересную нагрузку. Интересные — скучную." }
            ]
        }
    },

    {
        slug: "graceful-degradation-playbook",
        date: "2026-04-08",
        readMinutes: 7,
        tags: ["System Design", "Reliability", "Production"],
        en: {
            title: "Designing for Graceful Degradation — The Worst-Day Playbook",
            excerpt: "Every system fails. The good ones fail in ways customers barely notice. Here are the patterns that make that possible.",
            sections: [
                { type: "p", content: "Reliability is not 100% uptime. Reliability is the property that when something fails — and something always does — the system keeps doing its most important job. Building for graceful degradation is a habit you cultivate before the incident, not a feature you add after." },
                { type: "h2", content: "Identify the must-do and the nice-to-have" },
                { type: "p", content: "Before any pattern, do this: list every dependency your service has, and for each, decide what happens when it fails. The recommendations widget can't reach its model? Show a static fallback. The auth service is slow? Cache last-known sessions. The shopping cart database is down? Reject orders with a clear message — but keep browsing alive. The discipline is forcing yourself to make these decisions before you're paged." },
                { type: "h2", content: "Circuit breakers" },
                { type: "p", content: "Calling a downstream service that's currently failing is worse than not calling it at all — you waste your own threads, you generate retry storms, you turn a downstream incident into your own. A circuit breaker watches the failure rate; once it crosses a threshold, it stops trying for a cooldown period. Closed → Open → Half-open → Closed. The pattern is forty years old and it still works." },
                { type: "code", lang: "python", content: "# Conceptual circuit breaker\nclass Breaker:\n    def call(self, fn):\n        if self.state == 'open' and time() < self.reopen_at:\n            return self.fallback()\n        try:\n            result = fn()\n            self.on_success()\n            return result\n        except Exception:\n            self.on_failure()\n            return self.fallback()" },
                { type: "h2", content: "Bulkheads" },
                { type: "p", content: "Bulkheads (the metaphor is from ships) keep one failure from sinking the whole vessel. Run the slow integration on a separate thread pool. Cap how many concurrent calls can go to a flaky downstream. Use separate database connection pools for different traffic classes. When one bulkhead floods, the rest keep floating." },
                { type: "h2", content: "Timeouts everywhere" },
                { type: "p", content: "Every call across a process boundary needs a timeout — HTTP, DB, cache, message broker, internal RPC. The default in most clients is 'wait forever', which is wrong. A reasonable timeout is a function of the SLO it sits inside, not a number you copied from a template. If your service must respond in 500ms, no inner call can take 500ms." },
                { type: "h2", content: "Retries with care" },
                { type: "p", content: "Retries are how a transient blip becomes a stampede. Three rules:" },
                { type: "list", items: [
                    "Only retry idempotent calls (or calls with idempotency keys).",
                    "Use exponential backoff with jitter — fixed-interval retries from many clients synchronize into hammer waves.",
                    "Cap the number of retries; don't retry across the network forever."
                ] },
                { type: "h2", content: "Cached fallback responses" },
                { type: "p", content: "When the live source is down, can you serve a slightly-stale answer? For most read paths, yes. Keep a 'last-known-good' cache and fall back to it if the source is unreachable. The customer sees a slightly old number; you don't see a 500." },
                { type: "h2", content: "Fail loud where it matters" },
                { type: "p", content: "Graceful degradation is not 'silently swallow errors'. Internally, log them aggressively, alert when they cross thresholds, and treat them as bugs. Externally, return clear errors when you genuinely can't satisfy a request — silent failure is the worst UX of all." },
                { type: "h2", content: "The rehearsal" },
                { type: "p", content: "Patterns are useless if you've never tested them. Run a chaos drill: in staging, kill the cache during peak load. Take the recommendation service offline for an hour. Inject 5-second latency into the auth API. Whatever falls over teaches you what your real degradation story is. Then fix the gaps before production discovers them for you." }
            ]
        },
        ru: {
            title: "Проектирование graceful degradation — playbook на худший день",
            excerpt: "Каждая система падает. Хорошие падают так, что клиенты почти не замечают. Вот паттерны, которые это позволяют.",
            sections: [
                { type: "p", content: "Надёжность — это не 100% uptime. Надёжность — свойство того, что когда что-то падает (а что-то всегда падает), система продолжает делать своё самое важное дело. Построение под graceful degradation — это привычка, которую культивируют до инцидента, а не фича, добавленная после." },
                { type: "h2", content: "Отделите must-do от nice-to-have" },
                { type: "p", content: "До любого паттерна сделайте это: перечислите все зависимости сервиса и для каждой решите, что будет при её падении. Виджет рекомендаций не может достучаться до модели? Покажите статичный fallback. Auth-сервис медленный? Кэшируйте последние известные сессии. БД корзины лежит? Отклоняйте заказы с понятным сообщением — но просмотр оставьте живым. Дисциплина — заставить себя принять эти решения до того, как разбудят." },
                { type: "h2", content: "Circuit breakers" },
                { type: "p", content: "Вызывать downstream, который сейчас падает, хуже, чем не вызывать вообще — тратите свои потоки, генерите retry-шторма, превращаете чужой инцидент в свой. Circuit breaker следит за failure rate; перейдёт порог — перестаёт пытаться на cooldown. Closed → Open → Half-open → Closed. Паттерну 40 лет, и он всё ещё работает." },
                { type: "code", lang: "python", content: "# Концептуальный circuit breaker\nclass Breaker:\n    def call(self, fn):\n        if self.state == 'open' and time() < self.reopen_at:\n            return self.fallback()\n        try:\n            result = fn()\n            self.on_success()\n            return result\n        except Exception:\n            self.on_failure()\n            return self.fallback()" },
                { type: "h2", content: "Bulkheads" },
                { type: "p", content: "Bulkheads (метафора с кораблей) не дают одному отсеку утопить весь корабль. Запускайте медленную интеграцию на отдельном thread pool. Ограничивайте число параллельных вызовов в нестабильный downstream. Используйте отдельные пулы соединений к БД для разных классов трафика. Когда один отсек залило — остальные плывут." },
                { type: "h2", content: "Таймауты везде" },
                { type: "p", content: "Любому вызову через границу процесса нужен таймаут — HTTP, БД, кэш, брокер, внутренний RPC. По умолчанию в большинстве клиентов — «ждать вечно», и это неправильно. Разумный таймаут — функция SLO, в котором сидит вызов, а не число, скопированное из шаблона. Если сервис должен отвечать за 500мс, ни один внутренний вызов не может занять 500мс." },
                { type: "h2", content: "Аккуратно с ретраями" },
                { type: "p", content: "Ретраи — это как преходящий сбой превращается в stampede. Три правила:" },
                { type: "list", items: [
                    "Ретраите только идемпотентные вызовы (или с idempotency keys).",
                    "Экспоненциальный backoff с jitter — фиксированный интервал у многих клиентов синхронизируется в волну ударов.",
                    "Ограничивайте число ретраев; не ретраите по сети вечно."
                ] },
                { type: "h2", content: "Cached fallback ответы" },
                { type: "p", content: "Когда live-источник лежит — можете отдать чуть-stale ответ? Для большинства read-путей — да. Держите «last-known-good» кэш и фоллбэк к нему, если источник недоступен. Клиент видит чуть устаревшее число; вы не видите 500." },
                { type: "h2", content: "Громко падайте там, где важно" },
                { type: "p", content: "Graceful degradation — это не «молча проглатывать ошибки». Внутри агрессивно логируйте, алертите при пересечении порогов и относитесь как к багам. Вовне возвращайте понятные ошибки, когда реально не можете удовлетворить запрос — молчаливый сбой это худший UX." },
                { type: "h2", content: "Репетиция" },
                { type: "p", content: "Паттерны бесполезны, если никогда их не тестировали. Проведите chaos-учение: на staging убейте кэш под пиком. Снимите сервис рекомендаций на час. Инжектируйте 5-секундную latency в auth-API. Что упадёт — научит, какова реальная история degradation. Потом закройте пробелы до того, как продакшен сделает это за вас." }
            ]
        }
    },

    {
        slug: "idempotency-and-dead-letters",
        date: "2026-04-05",
        readMinutes: 6,
        tags: ["System Design", "Reliability", "APIs"],
        en: {
            title: "Idempotency Keys, Dead Letters, and Other Boring Production Wins",
            excerpt: "The features that don't make the launch announcement are the ones that keep you sleeping at night. A field guide to the unsexy bits.",
            sections: [
                { type: "p", content: "Nobody writes case studies about their idempotency keys. Nobody puts 'implemented dead-letter queues' on a press release. These are the back-office details that decide whether your service is reliable or whether you're going to spend Sunday morning explaining duplicate charges to support. Worth the time." },
                { type: "h2", content: "Idempotency keys" },
                { type: "p", content: "An idempotent operation produces the same effect whether you call it once or ten times. For READ requests, that's free. For WRITE requests, you need a key. The client generates a unique key per logical operation; the server stores 'this key already produced result X' and returns X on retries. Stripe popularized this pattern in payments, but it applies anywhere a network can drop your response." },
                { type: "code", lang: "python", content: "# Server-side handler for idempotent POST\nrecord = idempotency.find(req.headers['Idempotency-Key'])\nif record:\n    return record.cached_response\n\nresult = process_payment(req.body)\nidempotency.save(req.headers['Idempotency-Key'], result, ttl=24h)\nreturn result" },
                { type: "h2", content: "Dead-letter queues" },
                { type: "p", content: "When a worker can't process a message — bad data, a transient bug, an integration that's down — what happens? Without a DLQ, three options: drop it (data loss), retry forever (queue backs up, becomes a feature factory), or crash and restart (everyone behind you waits). With a DLQ, you take the bad message, copy it somewhere visible, ack the original, and keep moving. Then a human (or scheduled job) inspects the DLQ and decides: replay, fix, or discard." },
                { type: "h2", content: "Outbox pattern for cross-system writes" },
                { type: "p", content: "You need to do two things atomically — update the DB and publish a message. You can't, because they're in different systems. The naive approach (publish then commit, or commit then publish) loses messages on the failure case. The outbox pattern: write the message to an `outbox` table in the same DB transaction as your business write. A separate worker reads the outbox, publishes, and marks rows as sent. Now the only failure is delay, never loss." },
                { type: "h2", content: "Backpressure on every boundary" },
                { type: "p", content: "If your service produces faster than its consumers can drink, queues build up, memory inflates, you fall over. Every queue, channel, and connection should expose backpressure — when full, slow producers down or shed load. Go channels have it built in; HTTP servers need to set max concurrent connections; Kafka producers can tune `linger.ms` and `batch.size`. The rule: never accept more work than you can finish." },
                { type: "h2", content: "Health checks that mean something" },
                { type: "p", content: "A liveness check that just returns 200 is mostly useless — the process is up, sure, but is it actually able to do its job? A useful readiness check probes the things you depend on (DB connection, downstream service, queue worker not stuck) and says no when any of them are unhealthy. The orchestrator stops sending you traffic; you recover; you start saying yes again. Done right, this is the cheapest reliability gain available." },
                { type: "h2", content: "Audit logs nobody asked for until they did" },
                { type: "p", content: "When something goes wrong in production, the difference between a 30-minute investigation and a three-day one is whether you logged enough. Log every state transition that affects money, accounts, or external systems. Log enough context to trace a single user's journey. Don't log secrets. Don't log at info-level for things that aren't useful — log noise hurts almost as much as no logs." },
                { type: "h2", content: "The pattern across all of these" },
                { type: "p", content: "None of these features make a demo. All of them save you from a 3am incident. The mark of a senior engineer is that they reach for these patterns before being told to — because they've already paid the price of not having them at least once." }
            ]
        },
        ru: {
            title: "Idempotency keys, dead letters и другие скучные production-победы",
            excerpt: "Фичи, не попадающие в анонсы релизов, это те, благодаря которым вы спите по ночам. Полевой гид по нескучным деталям.",
            sections: [
                { type: "p", content: "Никто не пишет кейсы про idempotency-ключи. Никто не ставит «внедрил dead-letter queue» в пресс-релиз. Это back-office детали, решающие, надёжен ли ваш сервис, или вы потратите воскресное утро на объяснение дублей списаний саппорту. Оно того стоит." },
                { type: "h2", content: "Idempotency keys" },
                { type: "p", content: "Идемпотентная операция даёт один и тот же эффект, выполни её хоть раз, хоть десять. Для READ-запросов это бесплатно. Для WRITE нужен ключ. Клиент генерирует уникальный ключ на логическую операцию; сервер хранит «этот ключ уже дал результат X» и возвращает X на ретраях. Stripe популяризовал паттерн в платежах, но он применим везде, где сеть может потерять ваш ответ." },
                { type: "code", lang: "python", content: "# Серверный обработчик идемпотентного POST\nrecord = idempotency.find(req.headers['Idempotency-Key'])\nif record:\n    return record.cached_response\n\nresult = process_payment(req.body)\nidempotency.save(req.headers['Idempotency-Key'], result, ttl=24h)\nreturn result" },
                { type: "h2", content: "Dead-letter queues" },
                { type: "p", content: "Когда worker не может обработать сообщение — плохие данные, временный баг, лежащая интеграция — что делать? Без DLQ три варианта: дропнуть (потеря данных), ретраить вечно (очередь забивается, становится фабрикой фич) или упасть и перезапуститься (все за вами ждут). С DLQ берёте плохое сообщение, копируете куда-то видимое, ACK'аете оригинал и идёте дальше. Потом человек (или scheduled job) инспектирует DLQ и решает: replay, фиксить или выкинуть." },
                { type: "h2", content: "Outbox pattern для записей через системы" },
                { type: "p", content: "Нужно сделать две вещи атомарно — обновить БД и опубликовать сообщение. Нельзя — они в разных системах. Наивный подход (publish потом commit или наоборот) теряет сообщения на failure-кейсе. Outbox pattern: пишете сообщение в таблицу `outbox` в той же DB-транзакции, что и бизнес-запись. Отдельный worker читает outbox, публикует и маркирует строки как отправленные. Единственный режим отказа теперь — задержка, никогда — потеря." },
                { type: "h2", content: "Backpressure на каждой границе" },
                { type: "p", content: "Если сервис производит быстрее, чем consumer'ы пьют — очереди растут, память пухнет, всё падает. Каждая очередь, канал, соединение должны экспонировать backpressure — при заполнении замедляйте producer'ов или сбрасывайте нагрузку. В Go-каналах это встроено; HTTP-серверам надо ставить max concurrent connections; Kafka-producer'ы тюнят `linger.ms` и `batch.size`. Правило: не принимайте работы больше, чем сможете закончить." },
                { type: "h2", content: "Health-чеки, которые что-то значат" },
                { type: "p", content: "Liveness, просто возвращающий 200, в основном бесполезен — процесс жив, но способен ли он делать работу? Полезный readiness пробует зависимости (DB, downstream, не залип ли queue worker) и говорит «нет», когда что-то нездорово. Оркестратор перестаёт слать трафик; вы восстанавливаетесь; снова начинаете говорить «да». Сделано правильно — самый дешёвый прирост надёжности." },
                { type: "h2", content: "Аудит-логи, о которых не просили — пока не попросили" },
                { type: "p", content: "Когда что-то ломается в продакшене, разница между 30-минутным расследованием и трёхдневным — в том, достаточно ли вы логировали. Логируйте каждый state-transition, влияющий на деньги, аккаунты, внешние системы. Логируйте достаточно контекста, чтобы пройти путь одного пользователя. Не логируйте секреты. Не логируйте на info всё подряд — log noise бьёт почти как отсутствие логов." },
                { type: "h2", content: "Паттерн во всём этом" },
                { type: "p", content: "Ни одна из этих фич не сделает demo. Все они избавляют от инцидента в 3 ночи. Признак senior-инженера — он тянется к этим паттернам до того, как сказали — потому что уже платил цену их отсутствия хотя бы раз." }
            ]
        }
    },

    {
        slug: "monolith-to-services",
        date: "2026-03-20",
        readMinutes: 7,
        tags: ["System Design", "Architecture", "Microservices"],
        en: {
            title: "Monolith to Services Without Lying to Yourself",
            excerpt: "Most monolith-to-microservices migrations make things worse. Here's how to know if you actually need to split, and how to do it without creating a distributed monolith.",
            sections: [
                { type: "p", content: "The default narrative in tech is that monoliths are the past and microservices are the future. The reality is that most teams who 'migrated to microservices' built a distributed monolith — same coupling, but now everything is over the network and you can't refactor across boundaries. Splitting is a real tool, but the bar should be high, and the work should be deliberate." },
                { type: "h2", content: "Reasons to split that are usually wrong" },
                { type: "list", items: [
                    "'Microservices are best practice.' Cargo-culted from FAANG-scale orgs whose problems aren't yours.",
                    "'Different services should use different databases.' Sometimes. Often, sharing a database is the only thing keeping consistency cheap.",
                    "'We need to scale.' Most monoliths can scale by running more instances. Vertical scaling and load balancing are cheaper than service boundaries."
                ] },
                { type: "h2", content: "Reasons to split that are usually right" },
                { type: "list", items: [
                    "Independent deployment cadence. The mobile team needs to ship daily; the billing team needs strict change control. They can't share a deployment pipeline without one slowing the other.",
                    "Independent scaling. The image-processing path is GPU-heavy and runs 5x peak; the rest of the app barely notices traffic. Mixing them wastes hardware.",
                    "Team autonomy at scale. Once you have 30+ engineers, the cost of merging into one codebase exceeds the cost of service boundaries.",
                    "Different non-functional requirements. The audit-log service has different durability and access-pattern needs from the cart service. Same database is a poor fit."
                ] },
                { type: "h2", content: "The strangler fig pattern" },
                { type: "p", content: "When the bar is met, don't do a 'big bang' rewrite. The strangler fig pattern: route traffic through a layer that initially forwards everything to the monolith. Build the new service for one capability, route only that capability to it, leave everything else alone. Repeat for the next capability. After enough cycles, the monolith handles nothing important and you can retire it. The migration takes longer than a rewrite — but it never has a moment where nothing works." },
                { type: "h2", content: "The contracts you must own" },
                { type: "ordered", items: [
                    "API contract: typed schemas, versioning policy, deprecation timeline. Don't break clients silently; you can't recall a deployed mobile app.",
                    "Data contract: which service owns each piece of data? Who can read it, who can write it, how does it change over time?",
                    "Operational contract: SLOs, on-call, error budgets. Without these, every team blames every other team during incidents."
                ] },
                { type: "h2", content: "Distributed monolith — the failure mode to avoid" },
                { type: "p", content: "You can tell you've built a distributed monolith when (a) every release requires deploying multiple services in lockstep, (b) one team's tests can't pass without another team's services running, (c) database changes propagate through the cluster like a wave. You haven't gained anything by splitting; you've added latency and operational pain. The fix is to make services boundaries align with team boundaries and data ownership boundaries — not technical layers." },
                { type: "h2", content: "What I tell teams considering this" },
                { type: "ordered", items: [
                    "Run the monolith for as long as you can. Vertical scaling, modular boundaries inside the codebase, and deploy automation buy you years.",
                    "When the constraints above (deploy cadence, scaling, team count) actually bind, split one service at a time, with the strangler pattern.",
                    "Invest in API contracts and observability before you split. After is too late.",
                    "Keep monolith-style modules inside services. A service that's well-organized internally is just as useful as three services that aren't."
                ] },
                { type: "p", content: "The conventional wisdom that 'monolith bad, microservices good' is wrong on its own terms. The right question is: what is the smallest change to my architecture that lets me ship the next year of work? Sometimes the answer is splitting. Often it isn't." }
            ]
        },
        ru: {
            title: "Монолит → сервисы, не обманывая себя",
            excerpt: "Большинство миграций монолит-в-микросервисы делают хуже. Как понять, что вам реально нужно дробить — и как это сделать без распределённого монолита.",
            sections: [
                { type: "p", content: "Дефолтный нарратив в индустрии — монолиты в прошлом, микросервисы в будущем. Реальность — большинство команд, «мигрировавших в микросервисы», построили распределённый монолит: та же связность, но теперь всё через сеть, и нельзя рефакторить через границы. Дробление — реальный инструмент, но планка должна быть высокой, а работа — намеренной." },
                { type: "h2", content: "Причины дробить, которые обычно неправильны" },
                { type: "list", items: [
                    "«Микросервисы — best practice». Карго-культ от FAANG-масштаба, чьи проблемы не ваши.",
                    "«Разные сервисы должны иметь разные БД». Иногда. Часто общая БД — единственное, что держит консистентность дешёвой.",
                    "«Нам надо масштабироваться». Большинство монолитов масштабируется запуском больше инстансов. Вертикальное масштабирование и балансировка дешевле границ сервисов."
                ] },
                { type: "h2", content: "Причины дробить, которые обычно правильны" },
                { type: "list", items: [
                    "Независимый темп деплоев. Mobile-команде нужно релизиться ежедневно; биллингу — строгий change control. Они не могут делить пайплайн без замедления друг друга.",
                    "Независимое масштабирование. Image-processing GPU-тяжёлый и идёт x5 в пике; остальная часть приложения почти не замечает трафика. Смешивание тратит железо.",
                    "Автономия команд на масштабе. Когда инженеров 30+, цена мерджа в одну кодовую базу превышает цену границ сервисов.",
                    "Разные non-functional требования. Audit-log сервис требует другой durability и паттернов доступа, чем сервис корзины. Общая БД плохо подходит."
                ] },
                { type: "h2", content: "Strangler fig pattern" },
                { type: "p", content: "Когда планка пройдена — не делайте «big bang» переписывание. Strangler fig pattern: пускайте трафик через слой, который изначально форвардит всё в монолит. Стройте новый сервис под одну способность, маршрутизируйте на него только эту способность, остальное не трогайте. Повторите для следующей. После достаточного числа циклов монолит ничего важного не делает, и его можно убрать. Миграция дольше переписывания — но в ней нет момента, когда ничего не работает." },
                { type: "h2", content: "Контракты, которыми надо владеть" },
                { type: "ordered", items: [
                    "API-контракт: типизированные схемы, политика версионирования, таймлайн deprecation. Не ломайте клиентов молча — задеплоенное мобильное приложение нельзя отозвать.",
                    "Data-контракт: какой сервис владеет каким куском данных? Кто читает, кто пишет, как меняется со временем?",
                    "Operational-контракт: SLO, on-call, error budgets. Без этого каждая команда обвиняет каждую во время инцидентов."
                ] },
                { type: "h2", content: "Распределённый монолит — failure mode" },
                { type: "p", content: "Поняли, что построили распределённый монолит, когда (а) каждый релиз требует деплоя нескольких сервисов в lockstep, (б) тесты одной команды не проходят без сервисов другой, (в) изменения БД идут по кластеру волной. Вы ничего не получили дроблением — добавили latency и операционную боль. Фикс — выравнивать границы сервисов с границами команд и владением данными, а не с техническими слоями." },
                { type: "h2", content: "Что говорю командам, рассматривающим это" },
                { type: "ordered", items: [
                    "Гоните монолит, пока можете. Вертикальное масштабирование, модульные границы внутри кода и deploy-автоматизация покупают годы.",
                    "Когда ограничения выше (темп деплоев, масштабирование, число команд) реально упираются — дробите по одному сервису через strangler.",
                    "Инвестируйте в API-контракты и observability до дробления. После — поздно.",
                    "Держите модули в стиле монолита внутри сервисов. Хорошо организованный внутри сервис так же полезен, как три плохо организованных."
                ] },
                { type: "p", content: "Расхожая мудрость «монолит плохо, микросервисы хорошо» неверна по своим же критериям. Правильный вопрос — какое минимальное изменение архитектуры даст мне выпустить следующий год работы? Иногда ответ — дробление. Часто — нет." }
            ]
        }
    },

    {
        slug: "frappe-erpnext-internals",
        date: "2026-03-15",
        readMinutes: 7,
        tags: ["System Design", "Frappe", "Frameworks"],
        en: {
            title: "Frappe / ERPNext Internals — A Framework Tour Worth Doing",
            excerpt: "ERPNext is one of the largest open-source Python apps you've never read. Inside is Frappe — a metadata-driven framework that's quietly excellent at what it does.",
            sections: [
                { type: "p", content: "I deployed ERPNext for restaurant clients more than once before I understood how it actually worked. The breakthrough came when I stopped treating Frappe as a Django alternative and started reading it as a metadata-driven application platform. Several patterns it uses are worth knowing whether or not you ever ship Frappe yourself." },
                { type: "h2", content: "Everything is a DocType" },
                { type: "p", content: "In Frappe, every entity in your application — Customer, Sales Order, Item, Page, even system entities — is a DocType. A DocType is a JSON-defined schema: fields, validation rules, permissions, child tables, controllers. From that one definition, Frappe generates the database table, the REST API, the form UI, the list view, the print template, and the search indexes. You design the data model; Frappe builds the rest." },
                { type: "h2", content: "The doc lifecycle" },
                { type: "p", content: "Every record (called a 'doc') goes through a stable lifecycle: validate → on_change → on_submit → on_cancel. Hooks at each step let you attach business logic without touching framework code. Want to send an invoice email when a Sales Order is submitted? Subscribe to `on_submit` for the Sales Order DocType. The pattern is the same whether you're customizing one workflow or building a whole vertical." },
                { type: "h2", content: "Hooks files" },
                { type: "p", content: "Each Frappe app has a `hooks.py` that declares its integration points: which doc events it subscribes to, which scheduled tasks it runs, which permissions it injects, which JavaScript it loads on which pages. Reading another team's `hooks.py` tells you in 200 lines exactly what their app does to the system. Compare that to Django where you have to grep for signal handlers across the codebase." },
                { type: "code", lang: "python", content: "# A typical hooks.py snippet\ndoc_events = {\n    'Sales Order': {\n        'on_submit': 'myapp.notifications.send_invoice_email',\n        'on_cancel': 'myapp.inventory.release_reservation',\n    }\n}\n\nscheduler_events = {\n    'daily': ['myapp.tasks.sync_external_orders'],\n    'cron': {\n        '*/15 * * * *': ['myapp.tasks.refresh_stock_levels']\n    }\n}" },
                { type: "h2", content: "The boot dict — the page-load contract" },
                { type: "p", content: "When a Frappe page loads, the server returns a 'boot' dictionary: user permissions, navbar entries, available DocTypes, system settings, the user's profile. The client uses it to render the entire app shell offline-style — no per-page round-trips for permissions or navigation. It's a quietly clever pattern: bake all the per-user context into one JSON blob, hydrate the client once, then run on cached metadata." },
                { type: "h2", content: "Permission rules without a permission system" },
                { type: "p", content: "Most frameworks treat permissions as an external concern. Frappe treats them as a DocType. Permissions are records like any other — `Role`, `Has Role`, `Custom DocPerm`. You query and modify them with the same APIs you use for business data. This means you can build admin UIs, write reports, and audit access changes using the same tools as the rest of the app." },
                { type: "h2", content: "Where this design pays off" },
                { type: "list", items: [
                    "Customization without forking. Add a custom field, change a permission, hook into an event — all without touching upstream code.",
                    "Multi-tenancy is cheap. Each site is a separate database; the framework handles the routing.",
                    "Reports and dashboards are free. The metadata layer means a 'list view' or 'report builder' works for any DocType, including ones you just defined.",
                    "API discovery. Every DocType is automatically REST-accessible — no separate API layer to write."
                ] },
                { type: "h2", content: "Where it bites" },
                { type: "p", content: "The metadata-driven approach has costs. Performance can suffer when every action touches multiple metadata lookups. Customizations are stored in the database, which makes them harder to version-control than code. The learning curve is steep — patterns that look like 'just Python' often have framework conventions you must respect. And debugging across the metadata layer is harder than reading straight code." },
                { type: "h2", content: "The takeaway" },
                { type: "p", content: "Frappe is what happens when you take the 'data-first, code-second' philosophy seriously. You don't have to use it to learn from it. Patterns like a unified `hooks.py`, the boot-dict for page initialization, permissions-as-data, and metadata-driven UI generation are good ideas in any framework you build. Read its source. It's one of the more underrated reads in the open-source Python world." }
            ]
        },
        ru: {
            title: "Внутренности Frappe / ERPNext — экскурсия, которую стоит сделать",
            excerpt: "ERPNext — одно из крупнейших open-source Python-приложений, которые вы не читали. Внутри Frappe — metadata-driven фреймворк, который тихо хорош в своём деле.",
            sections: [
                { type: "p", content: "Я разворачивал ERPNext для ресторанных клиентов не один раз до того, как понял, как он реально работает. Прорыв случился, когда я перестал относиться к Frappe как к альтернативе Django и начал читать его как metadata-driven application platform. Несколько паттернов оттуда стоит знать, даже если вы никогда не выпустите Frappe сами." },
                { type: "h2", content: "Всё — это DocType" },
                { type: "p", content: "В Frappe каждая сущность приложения — Customer, Sales Order, Item, Page, даже системные — это DocType. DocType — JSON-определённая схема: поля, правила валидации, права, дочерние таблицы, контроллеры. Из этого одного определения Frappe генерирует таблицу БД, REST API, форму UI, list view, print template и поисковые индексы. Вы проектируете модель данных; Frappe собирает остальное." },
                { type: "h2", content: "Жизненный цикл doc" },
                { type: "p", content: "Каждая запись (называется «doc») проходит стабильный цикл: validate → on_change → on_submit → on_cancel. Хуки на каждом шаге позволяют вешать бизнес-логику без трогания framework-кода. Хотите слать invoice-email при submit Sales Order? Подпишитесь на `on_submit` для DocType Sales Order. Паттерн один — кастомизируете ли один workflow или строите целую вертикаль." },
                { type: "h2", content: "Hooks-файлы" },
                { type: "p", content: "У каждого Frappe-приложения есть `hooks.py`, объявляющий точки интеграции: на какие doc-события подписан, какие scheduled tasks запускает, какие права инжектит, какой JavaScript на какие страницы грузит. Чтение чужого `hooks.py` говорит вам в 200 строк ровно то, что приложение делает с системой. Сравните с Django, где надо grep'ать обработчики сигналов по всей кодовой базе." },
                { type: "code", lang: "python", content: "# Типичный фрагмент hooks.py\ndoc_events = {\n    'Sales Order': {\n        'on_submit': 'myapp.notifications.send_invoice_email',\n        'on_cancel': 'myapp.inventory.release_reservation',\n    }\n}\n\nscheduler_events = {\n    'daily': ['myapp.tasks.sync_external_orders'],\n    'cron': {\n        '*/15 * * * *': ['myapp.tasks.refresh_stock_levels']\n    }\n}" },
                { type: "h2", content: "Boot-dict — контракт загрузки страницы" },
                { type: "p", content: "Когда грузится Frappe-страница, сервер возвращает «boot» словарь: права пользователя, navbar, доступные DocType'ы, системные настройки, профиль. Клиент использует его, чтобы отрендерить весь app shell offline-style — без per-page round-trips за правами или навигацией. Тихо умный паттерн: запекать весь per-user контекст в один JSON, гидратировать клиент один раз, дальше работать на кэшированных метаданных." },
                { type: "h2", content: "Правила прав без отдельной системы прав" },
                { type: "p", content: "Большинство фреймворков относятся к правам как к внешней заботе. Frappe относится как к DocType. Права — записи как любые другие: `Role`, `Has Role`, `Custom DocPerm`. Запрашиваете и меняете их теми же API, что и бизнес-данные. Значит, админ-UI, отчёты и аудит изменений доступа можно строить теми же инструментами, что и остальное приложение." },
                { type: "h2", content: "Где это дизайн окупается" },
                { type: "list", items: [
                    "Кастомизация без форка. Добавить кастомное поле, изменить право, повесить хук — без трогания upstream-кода.",
                    "Мульти-тенантность дешёвая. Каждый site — отдельная БД; роутинг — забота фреймворка.",
                    "Отчёты и дашборды бесплатно. Metadata-слой означает, что «list view» или «report builder» работает для любого DocType — включая только что определённые.",
                    "Discovery API. Каждый DocType автоматически доступен через REST — отдельный API-слой писать не надо."
                ] },
                { type: "h2", content: "Где это кусается" },
                { type: "p", content: "Metadata-driven подход имеет цену. Перфоманс может страдать, когда каждое действие трогает несколько metadata-lookup'ов. Кастомизации хранятся в БД — их сложнее версионировать, чем код. Кривая обучения крутая — паттерны, выглядящие как «просто Python», часто имеют framework-конвенции, которые надо уважать. И дебаг через metadata-слой сложнее, чем чтение прямого кода." },
                { type: "h2", content: "Вывод" },
                { type: "p", content: "Frappe — это что получается, когда серьёзно относиться к философии «сначала данные, потом код». Не обязательно его использовать, чтобы у него учиться. Паттерны вроде унифицированного `hooks.py`, boot-dict для инициализации страницы, прав-как-данных и metadata-driven генерации UI — хорошие идеи в любом фреймворке, который вы строите. Читайте его исходник. Это одно из недооценённых чтений в open-source Python-мире." }
            ]
        }
    }
];

/**
 * Pull in any in-browser drafts the author has marked "published".
 * They live only in this device's localStorage, but they should appear
 * alongside the static posts on this device.
 */
const getLocalPublished = (): BlogPost[] => {
    if (typeof localStorage === "undefined") return [];
    try {
        const raw = localStorage.getItem("aris_blog_drafts_v1");
        if (!raw) return [];
        const all = JSON.parse(raw);
        if (!Array.isArray(all)) return [];
        return all
            .filter((d: { status?: string }) => d.status === "published")
            .map((d: BlogPost) => d);
    } catch {
        return [];
    }
};

/** Static posts + local published drafts, deduped by slug (locals win). */
export const getAllPosts = (): BlogPost[] => {
    const local = getLocalPublished();
    const localSlugs = new Set(local.map((p) => p.slug));
    return [...local, ...posts.filter((p) => !localSlugs.has(p.slug))];
};

export const getPostBySlug = (slug: string): BlogPost | undefined =>
    getAllPosts().find((p) => p.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) => {
    const all = getAllPosts();
    const post = all.find((p) => p.slug === slug);
    if (!post) return [];
    return all
        .filter((p) => p.slug !== slug)
        .map((p) => ({
            post: p,
            score: p.tags.filter((t) => post.tags.includes(t)).length
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((r) => r.post);
};
