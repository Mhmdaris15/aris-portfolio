export type BlogSection =
  | { type: "p"; content: string }
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "list"; items: string[] }
  | { type: "ordered"; items: string[] }
  | { type: "code"; lang: string; content: string }
  | { type: "quote"; content: string };

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readMinutes: number;
    tags: string[];
    sections: BlogSection[];
}

export const posts: BlogPost[] = [
    {
        slug: "rise-of-mcp-2026",
        title: "The Rise of MCP — Why Every AI Engineer Should Care in 2026",
        excerpt:
            "Model Context Protocol is becoming the USB-C of AI tools. Here's what it actually is, why it matters, and how to ship something useful with it this week.",
        date: "2026-04-12",
        readMinutes: 6,
        tags: ["AI", "MCP", "Agents"],
        sections: [
            {
                type: "p",
                content:
                    "Every AI engineer I talk to has the same workflow problem: their LLM app needs to call tools, and every framework reinvents the integration layer. Last year that meant a half-broken plugin system per provider. In 2026, the answer most teams are converging on is the Model Context Protocol — MCP."
            },
            {
                type: "h2",
                content: "What MCP actually is"
            },
            {
                type: "p",
                content:
                    "MCP is a transport-agnostic protocol that lets a model call out to external tools, fetch resources, and read prompts from any compliant server. Think of it as USB-C for AI tools: instead of building a custom integration for each model and each tool, you wire the tool up once as an MCP server and any client can use it."
            },
            {
                type: "p",
                content:
                    "It's not a framework. It's a wire protocol with three primitives: tools (callable functions), resources (read-only data), and prompts (templated instructions)."
            },
            {
                type: "h2",
                content: "Why this matters now"
            },
            {
                type: "list",
                items: [
                    "Tool reuse: build once, plug into Claude, Cursor, ChatGPT, your custom agent — anything that speaks MCP.",
                    "Local-first agents: an MCP server can run on the user's machine, so file access and credentials never leave the device.",
                    "Composability: chain agents by exposing one agent's capabilities as MCP tools to another.",
                    "Auditability: protocol-level logging means every tool call is inspectable, which matters for compliance."
                ]
            },
            {
                type: "h2",
                content: "A minimal MCP server in Python"
            },
            {
                type: "code",
                lang: "python",
                content:
                    "from mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP('weather-server')\n\n@mcp.tool()\ndef get_weather(city: str) -> str:\n    \"\"\"Get the current weather for a city.\"\"\"\n    # call your weather API here\n    return f'Sunny, 24°C in {city}'\n\nif __name__ == '__main__':\n    mcp.run()"
            },
            {
                type: "p",
                content:
                    "That's the entire server. Drop it in a Claude Desktop config, restart, and Claude can now check the weather for you. Same server works in Cursor, Continue, or any custom client."
            },
            {
                type: "h2",
                content: "Where it gets interesting"
            },
            {
                type: "p",
                content:
                    "The non-obvious win is internal company tooling. A finance team can wrap their booking system as an MCP server. A DevOps team wraps Kubernetes as an MCP server. Now any AI client your developers use — Claude Code, Cursor, in-house agents — can interact with internal systems without anyone shipping a custom plugin."
            },
            {
                type: "p",
                content:
                    "This is the realistic version of \"AI in the enterprise\" that doesn't require ripping out your stack."
            },
            {
                type: "h2",
                content: "The pitfall to avoid"
            },
            {
                type: "p",
                content:
                    "Don't expose raw database access as an MCP tool. The model will happily run a DROP TABLE if a prompt asks nicely. Wrap your tools with the smallest possible API surface — selectors, not commands. Permission scopes are your friend."
            },
            {
                type: "p",
                content:
                    "If you're building any kind of agentic AI in 2026, MCP is no longer optional. Start small: pick one tool your team uses, expose it through MCP, and watch your AI workflow stop being demo-ware."
            }
        ]
    },
    {
        slug: "production-rag-beyond-demo",
        title: "Production RAG Beyond the Demo — 7 Lessons from Shipping LLM Apps",
        excerpt:
            "Your hello-world RAG works. Mine did too. Here's what actually breaks when you put it in front of real users — and what I do about it now.",
        date: "2026-03-28",
        readMinutes: 8,
        tags: ["RAG", "AI", "Production"],
        sections: [
            {
                type: "p",
                content:
                    "I've shipped half a dozen RAG systems in the last 18 months — internal knowledge bots, a WhatsApp assistant for regional data, a customer support layer for a restaurant client. Every single one had a moment where the demo looked great and the production deployment was a mess. These are the seven lessons I keep relearning."
            },
            {
                type: "h2",
                content: "1. Retrieval quality eats model quality for breakfast"
            },
            {
                type: "p",
                content:
                    "Upgrading from GPT-4 to Claude Opus 4.7 won't fix bad retrieval. The single highest-leverage thing you can do is improve the chunks you feed the model. Hybrid search (BM25 + dense) consistently beats pure vector search. Re-ranking with a cross-encoder gives you another 10–15% on hard queries."
            },
            {
                type: "h2",
                content: "2. Chunking is a product decision, not a tuning parameter"
            },
            {
                type: "p",
                content:
                    "If your docs have headings, respect them. If they're conversation logs, chunk by turn. If they're code, chunk by symbol. Generic 512-token chunking is fine for the demo and a disaster for anything technical."
            },
            {
                type: "h2",
                content: "3. Always cite, even when users don't ask"
            },
            {
                type: "p",
                content:
                    "Force the model to return source IDs alongside the answer, then render those citations in the UI. Two reasons: it tells the user when to trust you, and it gives you a debugging surface when something goes wrong."
            },
            {
                type: "h2",
                content: "4. Eval before you ship — yes, even if it feels slow"
            },
            {
                type: "ordered",
                items: [
                    "Write 30–50 representative questions with known good answers.",
                    "Score retrieval recall (did the right chunk appear in top-k?) and answer faithfulness separately.",
                    "Run the eval before any prompt or model change. Save the diff to a CSV.",
                    "Publish the eval scoreboard somewhere your stakeholders can see it."
                ]
            },
            {
                type: "h2",
                content: "5. Caching is your best friend"
            },
            {
                type: "p",
                content:
                    "Embed once, cache forever. Cache the LLM response by (query hash + top-k chunk hash). I've seen 60% cache hit rates on customer support workloads, which means 60% latency and cost reduction with zero quality impact."
            },
            {
                type: "h2",
                content: "6. The model is a Russian friend, not an oracle"
            },
            {
                type: "quote",
                content:
                    "Treat the LLM like a sharp but unreliable colleague — let it draft, but make the system check the work."
            },
            {
                type: "p",
                content:
                    "Add a verification pass for high-stakes outputs. Use a small fast model to check whether the answer is actually grounded in the retrieved context. Reject answers that aren't."
            },
            {
                type: "h2",
                content: "7. Plan for the day the index is wrong"
            },
            {
                type: "p",
                content:
                    "You will reindex. Either the chunking changed, the embedding model changed, or the source documents changed. Build a blue-green index from day one — write to a new index, validate, swap pointer atomically. Don't be the team that takes the bot down for 'maintenance' every two weeks."
            },
            {
                type: "h2",
                content: "The takeaway"
            },
            {
                type: "p",
                content:
                    "The gap between RAG demo and RAG product is mostly engineering, not modeling. Better retrieval, smarter chunking, citations, evals, caching, verification, and reindex hygiene — this is the boring infrastructure that turns a flashy notebook into something a customer will actually pay for."
            }
        ]
    },
    {
        slug: "go-vs-node-realtime-2026",
        title: "Choosing Go or Node.js for Real-Time Systems in 2026",
        excerpt:
            "I've shipped real-time scoring systems in both Go and Node. They're not interchangeable. Here's the actual tradeoff, with numbers from a live tournament.",
        date: "2026-03-10",
        readMinutes: 7,
        tags: ["Go", "Node.js", "WebSockets"],
        sections: [
            {
                type: "p",
                content:
                    "Three years ago I built a live badminton scoring system for PBSI in Go. Last year I rebuilt a similar live-ordering system in Node.js for a restaurant client. Both worked. They felt completely different to operate. If you're picking between Go and Node.js for a real-time system in 2026, here's the honest comparison."
            },
            {
                type: "h2",
                content: "Concurrency model"
            },
            {
                type: "p",
                content:
                    "Go gives you cheap goroutines and a runtime designed for CPU-parallel concurrency. Node gives you a single-threaded event loop and async primitives. For pure I/O — broadcasting WebSocket frames to thousands of clients — both are fast. The moment you need to do CPU work alongside (encryption, complex serialization, image manipulation), Go pulls ahead by a wide margin."
            },
            {
                type: "h2",
                content: "What the numbers actually look like"
            },
            {
                type: "list",
                items: [
                    "Live tournament with ~800 connected spectators: Go server held steady at 4% CPU on a 2-core VPS.",
                    "Equivalent Node.js setup with ws + Redis pub/sub: 18% CPU on the same machine, occasional GC pauses up to 80ms.",
                    "Memory: Go process 28MB resident; Node process 110MB.",
                    "Latency p99 broadcast → client paint: Go 12ms, Node 24ms.",
                    "Time-to-ship the first MVP: Node ~3 days, Go ~5 days."
                ]
            },
            {
                type: "h2",
                content: "Developer experience"
            },
            {
                type: "p",
                content:
                    "Node is faster to prototype. The npm ecosystem has a library for everything, TypeScript is excellent, and you can deploy to Vercel or Cloudflare Workers and have HTTPS in five minutes. Go forces you to write a bit more upfront, but it pays you back in operability — single static binary, predictable performance, almost no runtime surprises."
            },
            {
                type: "h2",
                content: "When to pick Node.js"
            },
            {
                type: "list",
                items: [
                    "Most of your team is full-stack JS and you need to ship in days, not weeks.",
                    "You're building a thin real-time layer on top of an existing Node API.",
                    "You're integrating with the JavaScript SDK ecosystem (Stripe, Supabase, Firebase, etc.).",
                    "Your peak concurrency is realistic (a few hundred clients, not 100k)."
                ]
            },
            {
                type: "h2",
                content: "When to pick Go"
            },
            {
                type: "list",
                items: [
                    "You expect significant concurrency (1k+ live clients per node).",
                    "You want predictable tail latency under load.",
                    "You're doing CPU work in the hot path.",
                    "You want a single binary and a tiny container image.",
                    "Long-term ops cost matters more than first-week velocity."
                ]
            },
            {
                type: "h2",
                content: "The non-obvious recommendation"
            },
            {
                type: "p",
                content:
                    "Don't pick the language for the whole system. Pick it for the hot path. I've happily run a Next.js admin app talking to a Go WebSocket server through a shared Redis. Node where iteration speed matters; Go where reliability under load matters. The boring answer is usually the right one."
            }
        ]
    },
    {
        slug: "agentic-ai-workflows-2026",
        title: "Agentic AI Workflows — From Chatbots to Autonomous Engineers",
        excerpt:
            "Agents went from research toy to standard tool in eighteen months. Here's the architecture I actually use in production agents today.",
        date: "2026-02-22",
        readMinutes: 7,
        tags: ["AI", "Agents", "LLM"],
        sections: [
            {
                type: "p",
                content:
                    "When I started building AI products in 2024, an 'agent' meant a brittle ReAct loop that broke on the third tool call. By early 2026, agents are a default architecture pattern — and most engineers still build them wrong. The bottleneck isn't the model. It's how you structure the loop."
            },
            {
                type: "h2",
                content: "What an agent actually is"
            },
            {
                type: "p",
                content:
                    "An agent is a loop where the model decides what to do next, calls a tool, observes the result, and decides again. That's it. The interesting design choices are what tools you expose, how you bound the loop, and how you keep the context window healthy."
            },
            {
                type: "h2",
                content: "The architecture I keep coming back to"
            },
            {
                type: "ordered",
                items: [
                    "Planner: a single fast model call that converts the user's goal into a structured task list.",
                    "Executor loop: a stronger model that picks the next task, calls a tool, observes, repeats.",
                    "Memory layer: short-term scratchpad in context, long-term in a vector store.",
                    "Tool catalog: small (10–15 tools max), each with a tight schema and good errors.",
                    "Critic: an out-of-band model pass that evaluates whether the goal is achieved before stopping."
                ]
            },
            {
                type: "h2",
                content: "Three rules that prevent disasters"
            },
            {
                type: "p",
                content:
                    "First, every tool call must time out. The model will absolutely loop forever on an unresponsive API if you let it. Second, every loop has a hard step budget. If the agent hasn't finished in 20 steps, it returns a partial answer with what it tried. Third, destructive tools require an explicit confirmation step — the model can propose, but a separate confirmation pass approves."
            },
            {
                type: "h2",
                content: "Context window hygiene"
            },
            {
                type: "p",
                content:
                    "The dirty secret of agent loops is that the context grows linearly with steps. By step 15, you're paying for thousands of tokens of stale tool output. Compact aggressively: summarize old observations, drop redundant ones, and keep only the latest state per resource."
            },
            {
                type: "h2",
                content: "Where agents earn their keep"
            },
            {
                type: "list",
                items: [
                    "Coding agents (Claude Code, Cursor agents) — checking out the repo, running tests, iterating on a fix.",
                    "Data agents — pulling from one system, transforming, writing somewhere else, reporting on changes.",
                    "Customer support — looking up an order, checking shipment status, drafting a reply for human review.",
                    "Research agents — running multi-hop web research and synthesizing a document with citations."
                ]
            },
            {
                type: "h2",
                content: "Where agents still fail"
            },
            {
                type: "p",
                content:
                    "Anything with strong path-dependence and irreversible side effects. Production database migrations. Money movement. Anything where 'mostly correct' is worse than 'asks a human'. For those cases, build a copilot that drafts and a human that approves, not a fully autonomous agent."
            },
            {
                type: "p",
                content:
                    "The bar for 'production agent' has risen. The bar for 'production agent that won't embarrass you' is still mostly engineering discipline."
            }
        ]
    },
    {
        slug: "modern-data-stack-2026",
        title: "Modern Data Stack 2026 — Polars, dbt, and Goodbye Pandas?",
        excerpt:
            "Pandas isn't dead, but I haven't reached for it in months. Here's what replaced it in my data engineering workflow and why.",
        date: "2026-02-08",
        readMinutes: 6,
        tags: ["Data Engineering", "Polars", "dbt"],
        sections: [
            {
                type: "p",
                content:
                    "I write data pipelines for a living. Two years ago every script started with `import pandas as pd`. Today most of them start with `import polars as pl` or live entirely inside dbt. The shift wasn't ideological — it happened one outage at a time."
            },
            {
                type: "h2",
                content: "Why Polars won me over"
            },
            {
                type: "p",
                content:
                    "Polars is built on Apache Arrow with a query optimizer underneath. The practical effect is that it handles 10–20x more data on the same machine, and the API is strict enough to catch bugs Pandas would silently let through."
            },
            {
                type: "p",
                content:
                    "On a recent client report automation pipeline I rewrote a Pandas script that took 14 minutes and 11GB of RAM into a Polars version that finished in 38 seconds and stayed under 800MB. Same machine, same dataset, identical output."
            },
            {
                type: "h2",
                content: "Where dbt fits"
            },
            {
                type: "p",
                content:
                    "Pandas/Polars is great for ingestion and one-off transforms. dbt is for everything that needs to live in your warehouse forever — modeled tables, business logic, tested aggregations. The split I use:"
            },
            {
                type: "list",
                items: [
                    "Ingestion: Python + Polars — read the source, normalize, write Parquet to S3.",
                    "Loading: Redshift COPY or BigQuery LOAD into a raw schema.",
                    "Modeling: dbt — staging → intermediate → marts with tests on every layer.",
                    "Reverse ETL: Python again, reading from marts and pushing to wherever the business needs."
                ]
            },
            {
                type: "h2",
                content: "Tools I no longer reach for"
            },
            {
                type: "list",
                items: [
                    "Pandas, except in notebooks for quick exploration.",
                    "SQLAlchemy ORM for analytics work — straight SQL is clearer.",
                    "Airflow for small pipelines — Prefect / Dagster / a cron job is enough.",
                    "Spark unless I'm genuinely past 100GB."
                ]
            },
            {
                type: "h2",
                content: "What changed"
            },
            {
                type: "p",
                content:
                    "Three things. Cloud warehouses got fast enough that you don't need a separate compute layer. Polars matured into a true Pandas replacement (the API is still different, but the gaps closed in 2025). And dbt's testing story became good enough that 'untested SQL' feels as wrong as 'untested Python' did ten years ago."
            },
            {
                type: "h2",
                content: "The 2026 default"
            },
            {
                type: "p",
                content:
                    "If I'm starting a data project today: Polars for ingest, Parquet on S3 for storage, dbt for modeling in Redshift / BigQuery / Snowflake, and a thin Python orchestrator (Prefect or just GitHub Actions) for scheduling. That's it. Boring, fast, and easy to onboard a new team member into."
            }
        ]
    },
    {
        slug: "vector-db-comparison-2026",
        title: "Vector Databases Compared — pgvector, ChromaDB, Pinecone, Qdrant",
        excerpt:
            "I've shipped each of these into production. Here's which one to pick for your next RAG project — and which one I quietly regret choosing.",
        date: "2026-01-25",
        readMinutes: 7,
        tags: ["Vector DB", "RAG", "AI"],
        sections: [
            {
                type: "p",
                content:
                    "Picking a vector database in 2026 is harder than it should be because the marketing pages all sound identical. Having shipped RAG apps on all four of the big players, here's what I actually think after running them in production."
            },
            {
                type: "h2",
                content: "pgvector"
            },
            {
                type: "p",
                content:
                    "If you already run Postgres, this is almost always the right answer. pgvector is a Postgres extension that adds vector indexing. You get transactions, joins, point lookups, and vector search in one query — and one operational footprint."
            },
            {
                type: "list",
                items: [
                    "Best for: most apps under 10M vectors with metadata-heavy queries.",
                    "Watch out for: index build times on large datasets and the need to tune HNSW params.",
                    "Killer feature: you can join vector results with structured data in a single SQL query."
                ]
            },
            {
                type: "h2",
                content: "ChromaDB"
            },
            {
                type: "p",
                content:
                    "Chroma is the easiest way to start. `pip install chromadb`, create a collection, add documents, search. For prototypes and internal tools it's fantastic. For production at scale it has rough edges around concurrent writes and persistence."
            },
            {
                type: "list",
                items: [
                    "Best for: prototypes, local-first apps, internal tools.",
                    "Watch out for: production scaling — it's getting better but isn't Pinecone-grade yet.",
                    "Killer feature: zero-friction local development."
                ]
            },
            {
                type: "h2",
                content: "Pinecone"
            },
            {
                type: "p",
                content:
                    "Pinecone is the managed-service answer. You don't run anything, you just hit an API. It handles billions of vectors gracefully and has the most polished hybrid-search story. The tradeoff is cost and vendor lock-in."
            },
            {
                type: "list",
                items: [
                    "Best for: large-scale production with no ops team.",
                    "Watch out for: cost surprises at scale and being permanently coupled to their pricing.",
                    "Killer feature: fully managed, fast, and the hybrid search just works."
                ]
            },
            {
                type: "h2",
                content: "Qdrant"
            },
            {
                type: "p",
                content:
                    "Qdrant is the open-source production option. Rust-built, fast, and the filtering capabilities are the best of any vector DB I've used. You can self-host or use their cloud."
            },
            {
                type: "list",
                items: [
                    "Best for: filter-heavy workloads, self-hosted production setups.",
                    "Watch out for: smaller community than the alternatives, occasional breaking changes.",
                    "Killer feature: payload filtering with the speed of vector search."
                ]
            },
            {
                type: "h2",
                content: "My current default"
            },
            {
                type: "p",
                content:
                    "For 90% of projects I start with pgvector. It's free, it's there, and 'just add a column' beats 'add another service' every time. If filtering or scale forces my hand, I move to Qdrant. I only reach for Pinecone when the team explicitly doesn't want to operate anything, and Chroma stays in my notebook."
            },
            {
                type: "h2",
                content: "The one I regret"
            },
            {
                type: "p",
                content:
                    "Early 2024 I picked a vector DB that doesn't make this list because it had the slickest landing page. Six months later it lost data on a clean restart. The boring answer (pgvector) would have saved a weekend of incident response. Pick the boring answer first."
            }
        ]
    },
    {
        slug: "nextjs-15-app-router-patterns",
        title: "Next.js 15+ App Router Patterns That Don't Suck",
        excerpt:
            "App Router is great when you stop fighting it. Here are the patterns I actually use in production Next.js 15 and 16 projects.",
        date: "2026-01-12",
        readMinutes: 6,
        tags: ["Next.js", "React", "Frontend"],
        sections: [
            {
                type: "p",
                content:
                    "Half of the Next.js content on the internet is still teaching Pages Router habits in App Router clothing. App Router is genuinely different and genuinely good — once you stop trying to recreate getServerSideProps."
            },
            {
                type: "h2",
                content: "Server Components are the default for a reason"
            },
            {
                type: "p",
                content:
                    "If a component doesn't need state, effects, or browser APIs, leave it as a Server Component. Fetch data directly in it, return JSX. No useEffect dance, no SWR, no API route in between. Mark it 'use client' only when you actually need interactivity."
            },
            {
                type: "h2",
                content: "Compose, don't lift"
            },
            {
                type: "p",
                content:
                    "The biggest mental flip: instead of 'lifting state up' through a tree of components, you compose Server Components and Client Components. Pass Server Components as children to Client Components. The boundary stays narrow."
            },
            {
                type: "code",
                lang: "tsx",
                content:
                    "// page.tsx (Server Component)\nimport ClientShell from './ClientShell'\nimport ServerData from './ServerData'\n\nexport default function Page() {\n  return (\n    <ClientShell>\n      {/* ServerData stays a Server Component even though\n          it's nested inside ClientShell */}\n      <ServerData />\n    </ClientShell>\n  )\n}"
            },
            {
                type: "h2",
                content: "Server Actions for forms"
            },
            {
                type: "p",
                content:
                    "Stop building API routes for form submissions. Use a Server Action: it runs on the server, you can validate with Zod, and the form works without JavaScript. Progressive enhancement comes free."
            },
            {
                type: "h2",
                content: "Parallel routes for layouts that ship"
            },
            {
                type: "p",
                content:
                    "Need a sidebar that loads independently from the main content? Use a parallel route slot (`@sidebar`). Both stream in independently with their own loading state. This used to require Suspense gymnastics; now it's a folder name."
            },
            {
                type: "h2",
                content: "Caching is the footgun"
            },
            {
                type: "p",
                content:
                    "Next 14's aggressive caching defaults caused real production pain. Next 15 dialed it back. Default to dynamic, then opt into caching with `unstable_cache` or `revalidateTag` once you actually understand what you're caching. 'Static by default' was the wrong default for most app code."
            },
            {
                type: "h2",
                content: "Patterns I avoid"
            },
            {
                type: "list",
                items: [
                    "Wrapping every fetch in useEffect — let the Server Component fetch.",
                    "Custom loading spinners — use loading.tsx, you get streaming for free.",
                    "Global state libraries for server data — that's what cache/revalidate are for.",
                    "API routes that just proxy a database query — call the DB from the Server Component."
                ]
            },
            {
                type: "h2",
                content: "The one library I always add"
            },
            {
                type: "p",
                content:
                    "TanStack Query, but only for client-side mutations and optimistic updates. Server Components handle initial load; TanStack Query handles 'user clicks button, UI updates instantly, server confirms.' Best of both."
            }
        ]
    },
    {
        slug: "freelance-developer-ai-toolkit",
        title: "The Freelance Developer's AI Toolkit — Ship 10x Faster",
        excerpt:
            "I'm a freelance dev shipping client work full-time. Here's the exact AI toolkit that lets me deliver in days what used to take weeks.",
        date: "2025-12-18",
        readMinutes: 6,
        tags: ["Freelancing", "AI", "Productivity"],
        sections: [
            {
                type: "p",
                content:
                    "When I quote a client three weeks for an MVP, I'm not lying — that's how long it would have taken in 2022. Today the same scope takes me 5–7 days. The difference is an AI toolkit I've sharpened over the last 18 months. Here's what's actually in it."
            },
            {
                type: "h2",
                content: "Daily drivers"
            },
            {
                type: "list",
                items: [
                    "Claude Code in the terminal — implementation, debugging, refactors. The single biggest leverage tool.",
                    "Cursor for UI work — I still want a visual editor with inline diffs when designing components.",
                    "v0 for the first pass at a marketing page — generates 80% of the layout, I clean up the last 20%.",
                    "Whisper for transcribing client calls — I never take notes during a call anymore."
                ]
            },
            {
                type: "h2",
                content: "Workflow that actually saves time"
            },
            {
                type: "p",
                content:
                    "I keep a small library of project skeletons (Next.js + Supabase, Go API + Postgres, Python FastAPI + Polars). When a client signs, I clone the skeleton, hand the spec to Claude Code along with the skeleton, and ask it to scaffold the data model and routes first. By the end of day one I usually have something deployable."
            },
            {
                type: "h2",
                content: "Where AI doesn't help"
            },
            {
                type: "list",
                items: [
                    "Discovery calls — clients want a human asking real questions, not a chat transcript.",
                    "Pricing — AI estimates are systematically too low because they don't price risk.",
                    "Deployment debugging — when prod is down, AI is a junior dev. You still need to know your tools.",
                    "Architecture decisions — AI will agree with whatever you suggest. You still have to own the call."
                ]
            },
            {
                type: "h2",
                content: "A real example"
            },
            {
                type: "p",
                content:
                    "Last month a client needed a customer portal: auth, account dashboard, billing integration with Stripe, and an admin panel. Past-me would have quoted 4 weeks. I shipped it in 9 days, end-to-end, using Claude Code for the implementation, Cursor for the dashboard polish, and v0 for the pricing page. The client paid the same."
            },
            {
                type: "h2",
                content: "Don't sell hours, sell outcomes"
            },
            {
                type: "p",
                content:
                    "The mistake freelancers make with AI is undercharging because the work felt easier. Your client is paying for the result, not your keystroke count. If you used to bill 80 hours for an MVP and now you ship in 25, charge for the MVP, not the hours."
            },
            {
                type: "h2",
                content: "The non-obvious benefit"
            },
            {
                type: "p",
                content:
                    "AI isn't just making me faster. It's letting me take on stacks I'd previously have declined — Rust microservices, mobile React Native, even a small Solidity contract. With a strong AI pair, the cost of learning a new ecosystem dropped to where it's worth saying yes to more interesting work."
            }
        ]
    },
    {
        slug: "websockets-at-scale-pbsi",
        title: "WebSockets at Scale — Lessons from a Real-Time Scoring System",
        excerpt:
            "When PBSI asked me to build live tournament scoring in two weeks, I learned more about WebSockets than three years of theory. Here's the practical version.",
        date: "2025-12-02",
        readMinutes: 7,
        tags: ["WebSockets", "Real-time", "Go"],
        sections: [
            {
                type: "p",
                content:
                    "The Indonesian Badminton Association (PBSI) needed a live scoring system in two weeks. I built it in Go with WebSockets, deployed it the night before the tournament, and watched 800+ spectators connect simultaneously while my heart rate did things heart rates aren't supposed to do. It worked. Here's what I learned."
            },
            {
                type: "h2",
                content: "WebSockets are stateful — your architecture must be too"
            },
            {
                type: "p",
                content:
                    "Every 'just put it behind a load balancer' tutorial breaks the moment you have multiple server instances. WebSocket connections are sticky to one server. If your scoring update needs to reach all spectators across all servers, you need a message bus."
            },
            {
                type: "p",
                content:
                    "I used Redis pub/sub. Server A receives the score update over HTTP, publishes to a Redis channel, every server (including A) consumes the channel and broadcasts to its connected clients. Simple, fast, and survives failover."
            },
            {
                type: "h2",
                content: "Backpressure will bite you"
            },
            {
                type: "p",
                content:
                    "What happens when a client's network gets slow and your server keeps trying to send it 50 messages per second? In a naive implementation, your goroutine blocks, the connection's send queue grows, memory balloons, and eventually the server tips over."
            },
            {
                type: "p",
                content:
                    "The fix: bounded send buffer per connection. If the buffer is full, drop the slow client. They reconnect, get a state snapshot, and rejoin the live stream. Don't let one bad client take down everyone else."
            },
            {
                type: "h2",
                content: "Heartbeats save your life"
            },
            {
                type: "p",
                content:
                    "TCP connections can stay 'open' from the OS's perspective long after the network has actually died. Send a ping every 30 seconds and disconnect if you don't get a pong within 60. This single fix eliminated 90% of 'phantom connection' issues for me."
            },
            {
                type: "h2",
                content: "State snapshots, not just deltas"
            },
            {
                type: "p",
                content:
                    "When a new client connects, send them the current full state, not just future deltas. When a client reconnects after a drop, same thing. This sounds obvious but a lot of WebSocket tutorials skip it, and you only notice the gap during reconnection scenarios."
            },
            {
                type: "h2",
                content: "Concrete server limits"
            },
            {
                type: "list",
                items: [
                    "Per-connection send buffer: 64 messages or ~64KB, whichever first.",
                    "Heartbeat: ping every 30s, disconnect after 60s without pong.",
                    "Per-IP connection limit: 5 — abusive enough that you can't accidentally DoS yourself in dev.",
                    "Total connection limit: known and enforced at the proxy, not at the app.",
                    "Message size limit: 4KB — anything bigger is suspicious."
                ]
            },
            {
                type: "h2",
                content: "What I'd do differently"
            },
            {
                type: "p",
                content:
                    "Today I'd reach for NATS or Redis Streams instead of pub/sub for replay capability — useful when a client reconnects and wants the last N events, not just future ones. And I'd start with a managed solution like Pusher or Ably for projects that don't need ultra-low latency, so the team focuses on product rather than transport."
            }
        ]
    },
    {
        slug: "prototype-to-production-llm",
        title: "From Prototype to Production — Deploying LLM Apps Reliably",
        excerpt:
            "The 80% of LLM engineering nobody blogs about is the boring part — deployment, monitoring, cost control, failure modes. Here's the playbook.",
        date: "2025-11-15",
        readMinutes: 7,
        tags: ["LLM", "Production", "Deployment"],
        sections: [
            {
                type: "p",
                content:
                    "Your LLM app works in the notebook. Now you need to put it in front of users. The gap between those two states is mostly engineering — the same boring stuff that any backend service needs, plus a few LLM-specific traps. Here's the production playbook I follow on every project."
            },
            {
                type: "h2",
                content: "Wrap every LLM call"
            },
            {
                type: "p",
                content:
                    "Never call the model SDK directly from your business logic. Wrap it in your own client that handles: retries with exponential backoff, timeout, structured logging, cost tracking, and provider fallback. You'll thank yourself the first time OpenAI has an outage and you can flip a config to Anthropic."
            },
            {
                type: "h2",
                content: "Streaming or you'll lose users"
            },
            {
                type: "p",
                content:
                    "If your LLM response takes more than 2 seconds and isn't streaming, your UX is broken. Stream tokens as they generate. Server-sent events are simpler than WebSockets and work everywhere. Show progress immediately."
            },
            {
                type: "h2",
                content: "Eval gates in CI"
            },
            {
                type: "ordered",
                items: [
                    "Maintain a versioned eval set (questions + expected behaviors) in the repo.",
                    "Run the eval suite on every PR that touches prompts or model config.",
                    "Block merges when the eval score drops below baseline.",
                    "Publish eval scores to a dashboard so PM and stakeholders can see trends."
                ]
            },
            {
                type: "h2",
                content: "Cost control is a feature"
            },
            {
                type: "p",
                content:
                    "LLMs cost real money per request and the bills surprise people. Three controls I always add: rate limit per user, daily spending cap with kill-switch, and request-level cost logging. When the bill arrives at the end of the month it should match your dashboard, not be a surprise."
            },
            {
                type: "h2",
                content: "Observability is non-negotiable"
            },
            {
                type: "list",
                items: [
                    "Log every prompt, every response, every tool call, every latency, every cost.",
                    "Tag logs with user ID and session ID so you can debug a complaint.",
                    "Alert on error rate, latency p95, and unusual cost spikes.",
                    "Sample 1% of conversations into a 'human review' bucket — yes, with consent."
                ]
            },
            {
                type: "h2",
                content: "Prompt injection is real"
            },
            {
                type: "p",
                content:
                    "If your app puts user input into a system prompt or tool result, assume the user can attempt prompt injection. Defenses: separate trusted instructions from user content, never give the model destructive tools without confirmation, and run a pre-output filter on anything that goes back to the user."
            },
            {
                type: "h2",
                content: "Failure modes you must handle"
            },
            {
                type: "list",
                items: [
                    "Provider rate limit (429) — back off and retry, fallback to cheaper model on persistent fail.",
                    "Provider outage (5xx) — switch provider via your wrapper, return cached or default response.",
                    "Hallucinated tool call — schema-validate every tool input before executing.",
                    "Truncated response — detect, retry with higher max_tokens, or stream-resume.",
                    "User cancels mid-stream — clean up, don't leak the connection."
                ]
            },
            {
                type: "h2",
                content: "The one-liner takeaway"
            },
            {
                type: "p",
                content:
                    "An LLM app in production is a regular service with extra failure modes and a meter running. Treat it like a regular service — wrappers, retries, observability, evals, rate limits — and the LLM-specific bits stop being scary."
            }
        ]
    }
];

export const getPostBySlug = (slug: string) =>
    posts.find((p) => p.slug === slug);

export const getRelatedPosts = (slug: string, limit = 3) => {
    const post = getPostBySlug(slug);
    if (!post) return [];
    return posts
        .filter((p) => p.slug !== slug)
        .map((p) => ({
            post: p,
            score: p.tags.filter((t) => post.tags.includes(t)).length
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((r) => r.post);
};
