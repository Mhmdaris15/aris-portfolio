import type { BlogPost } from "./blog";

/**
 * Platform Engineering & DevOps deep-dives. Each post 10–15 min read.
 * Spread into the main `posts` array via blog.ts.
 */

export const platformPosts: BlogPost[] = [
    /* ─── 01. Reference Platform Stack 2026 ─────────────────────── */
    {
        slug: "reference-platform-stack-2026",
        date: "2026-10-06",
        readMinutes: 14,
        tags: ["Platform Engineering", "DevOps", "Kubernetes", "Architecture"],
        en: {
            title: "The Reference Platform Stack for 2026",
            excerpt: "What a credible internal platform looks like today: the stack, the trade-offs, and what stops being optional once you're past 30 services.",
            sections: [
                { type: "p", content: "Three years ago a 'platform' was a Helm chart, a Jenkinsfile, and a Slack channel where the SREs answered questions. The teams that survived that era did one thing right: they kept asking which abstractions were actually paying for themselves. The teams that didn't survive added another tool every quarter and ended up with a stack so heavy nobody understood it end-to-end. Both extremes are common. Neither is a platform." },
                { type: "p", content: "By 2026 the answer to 'what should an internal platform look like?' has converged enough that you can sketch a credible reference architecture on a napkin. This post is that napkin, with the trade-offs written out so you can decide which pieces to skip." },
                { type: "h2", content: "What a platform is for, in one sentence" },
                { type: "quote", content: "A platform exists so that an application team can ship a typical change without learning a new tool, opening a ticket, or messaging another human." },
                { type: "p", content: "Everything below earns its place in the stack only if it advances that goal. Tools that don't are theater." },
                { type: "h2", content: "The seven layers most credible platforms ship" },
                { type: "ordered", items: [
                    "Source-of-truth: a Git monorepo or polyrepo with a software catalog (Backstage, Port, or Cortex). Every service has a `catalog-info.yaml` and a single owning team.",
                    "Container build: BuildKit + a layer-cache strategy. SBOM generation by Syft, signing by Cosign, scanned by Trivy on every push.",
                    "Cluster substrate: Kubernetes (managed if possible — EKS, GKE, AKS — self-hosted only if you have an SRE team you can call at 3am).",
                    "Control plane primitives: Cilium for networking + observability, Crossplane for infrastructure-as-data, External Secrets for secret management.",
                    "Delivery: ArgoCD ApplicationSets driven from the catalog. Argo Rollouts (or Flagger) for canary / blue-green.",
                    "Observability: OpenTelemetry SDKs in every service, Tempo for traces, Loki for logs, Mimir or vanilla Prometheus for metrics. Grafana on top.",
                    "Developer surface: Backstage as the front door. A `tilt up` or `devbox` flow for local development that mirrors production."
                ] },
                { type: "p", content: "If you're already running 7 of 7, congratulations — you have what most CNCF survey respondents would call a Tier 1 platform. If you're running 4 of 7, you have a normal mid-stage company platform. If you're running 2 of 7, you have what 60% of teams calling themselves 'platform engineering' actually have, which is fine, just be honest about it." },
                { type: "h2", content: "What's worth fighting for" },
                { type: "h3", content: "A real software catalog" },
                { type: "p", content: "If your platform doesn't know what services exist, who owns them, and which version is in prod, nothing else can be reliable. Backstage's `catalog-info.yaml` convention won by being boring and Git-native — the catalog isn't a database, it's a folder. The lift to install Backstage is non-trivial (a Node.js app with plugins, Postgres, GitHub integration), but the alternative is a wiki page that goes stale in six weeks. Port and OpsLevel are the SaaS shortcuts; pick one if you can't dedicate two engineers to running Backstage." },
                { type: "h3", content: "Pull-model GitOps" },
                { type: "p", content: "ArgoCD or Flux. The pull model — cluster watches Git, reconciles on drift — is correct for the same reason Kubernetes itself is correct: the desired state lives in a queryable store, the actuator runs continuously, and reality converges on intent. Push-model deploys (CI runs `kubectl apply` over a kubeconfig) work until your CI doesn't, your cluster context drifts, or someone hand-edits a resource. Pull eliminates an entire class of incident." },
                { type: "h3", content: "OpenTelemetry, not vendor SDKs" },
                { type: "p", content: "Pick one observability vendor today, and you'll instrument with their SDK. Pick OTel today, and the day you change vendors you change one config line. The collector pattern (`otelcol-contrib`) sits between your services and your backends, lets you fan out (Tempo for traces today, Honeycomb tomorrow), and breaks vendor lock-in cleanly." },
                { type: "h2", content: "What's overrated" },
                { type: "h3", content: "Service mesh — for most teams" },
                { type: "p", content: "Istio's data-plane complexity is a genuine cost. Linkerd is gentler but still a layer to operate. If you're using Cilium for networking, you already get mTLS and L7 observability via eBPF without sidecars. The 2024–2026 trend is that 'service mesh' as a category is being absorbed into the network layer (Cilium Service Mesh, Ambient Istio). Don't install Istio in 2026 unless you've concretely identified what you'd lose without it." },
                { type: "h3", content: "Custom CI/CD platforms" },
                { type: "p", content: "Do not write your own CI. GitHub Actions, GitLab CI, or Buildkite — pick one and stop. The platform team's job is to provide great workflow templates and reusable actions, not to maintain a Jenkins fork." },
                { type: "h2", content: "What's underrated" },
                { type: "h3", content: "Crossplane" },
                { type: "p", content: "If you're managing AWS resources from Terraform and Kubernetes resources from Helm/Kustomize, you have two control planes. Crossplane lets you express both as Kubernetes CRDs reconciled by ArgoCD. The XRD/Composition model is the same gitops pull-loop as your apps. Once you've built one Composition for 'create-database-with-readonly-replica', you'll see why Terraform is the boring incumbent and Crossplane is the future." },
                { type: "code", lang: "yaml", content: "# Composition example — one resource you ask for in YAML produces 5\napiVersion: apiextensions.crossplane.io/v1\nkind: CompositeResourceDefinition\nmetadata:\n  name: xpostgresinstances.platform.example.org\nspec:\n  group: platform.example.org\n  names:\n    kind: XPostgresInstance\n    plural: xpostgresinstances\n  claimNames:\n    kind: PostgresInstance\n    plural: postgresinstances\n  versions:\n    - name: v1alpha1\n      served: true\n      referenceable: true\n      schema: ...\n---\n# An app team writes this:\napiVersion: platform.example.org/v1alpha1\nkind: PostgresInstance\nmetadata:\n  name: orders-db\nspec:\n  size: medium\n  region: eu-west-1\n# ...and gets RDS instance + subnet group + security group + parameter group + IAM role." },
                { type: "h3", content: "FinOps as a Day-2 concern" },
                { type: "p", content: "Most platforms ship without cost attribution and pay for it later. Install Kubecost or OpenCost from day 1. Tag every workload with `team`, `service`, `cost-center`. The team-level dashboards are what get application teams to care about resource limits, autoscaling configs, and idle workloads. A platform that tracks DORA metrics but not dollars per service is missing half the picture." },
                { type: "h2", content: "The skip list — what most teams shouldn't add yet" },
                { type: "list", items: [
                    "Multi-cluster federation. One cluster per environment, treated as cattle, beats five clusters with a federation layer for almost everyone under 200 services.",
                    "GPU operator complexity. If you're doing AI inference, that workload deserves its own dedicated cluster — don't entangle GPU scheduling with your stateless web tier.",
                    "WASM workloads on K8s (yet). Compelling future, brittle present. Revisit in 2027.",
                    "Custom internal CRDs for everything. Every CRD you ship is something your platform team has to upgrade through Kubernetes versions forever. Be parsimonious.",
                    "Microservices for stateless web apps under 5 engineers. The distributed-monolith trap is still real."
                ] },
                { type: "h2", content: "How to know if your platform is working" },
                { type: "p", content: "The honest measure isn't tooling depth, Lighthouse scores, or how many CNCF projects are in the stack. It's whether application teams can answer 'how do I ship a new service?' with one sentence and a link to the catalog. If they can, you have a platform. If they have to ask the platform team, you have an SRE consultancy with a fancy logo." },
                { type: "p", content: "The reference stack above is a starting point. Your platform's job is to turn it into your team's lived experience — boringly, predictably, and so well that nobody notices it." },
                { type: "h2", content: "Three things to do this week if you're starting now" },
                { type: "ordered", items: [
                    "Decide on a software catalog. Backstage if you have engineers; Port or OpsLevel if you don't. Get one service into it by Friday.",
                    "Pick GitOps direction. ArgoCD or Flux, pull-model, declarative manifests in a single platform repo. Stop letting CI hold cluster credentials.",
                    "Instrument one service end-to-end with OpenTelemetry. Send traces to Tempo (or any OTel-compatible vendor). The first trace through a real request is the moment your team understands what observability actually buys you."
                ] }
            ]
        },
        ru: {
            title: "Эталонный стек платформы на 2026",
            excerpt: "Как сейчас выглядит достоверная внутренняя платформа: стек, компромиссы, и что перестаёт быть опциональным после 30 сервисов.",
            sections: [
                { type: "p", content: "Три года назад «платформа» была Helm-чартом, Jenkinsfile и Slack-каналом, где SRE отвечали на вопросы. Те команды, кто пережил ту эпоху, делали одну вещь правильно: постоянно спрашивали, какие абстракции реально окупаются. Те, кто не пережил, добавляли по инструменту за квартал и получили стек настолько тяжёлый, что никто не понимал его целиком. Обе крайности обычны. Ни одна не платформа." },
                { type: "p", content: "К 2026 ответ на «как должна выглядеть внутренняя платформа?» сошёлся достаточно, чтобы набросать достоверную референсную архитектуру на салфетке. Эта статья — та самая салфетка, с расписанными компромиссами, чтобы вы могли решить, что пропустить." },
                { type: "h2", content: "Зачем платформа — в одном предложении" },
                { type: "quote", content: "Платформа существует для того, чтобы команда приложения могла выкатить типичное изменение, не изучая новый инструмент, не открывая тикет и не сообщаясь с другим человеком." },
                { type: "p", content: "Всё ниже зарабатывает место в стеке, только если продвигает эту цель. Инструменты, которые не продвигают, — театр." },
                { type: "h2", content: "Семь слоёв, которые есть в большинстве достоверных платформ" },
                { type: "ordered", items: [
                    "Source-of-truth: Git-monorepo или polyrepo с software catalog (Backstage, Port или Cortex). У каждого сервиса свой `catalog-info.yaml` и одна владеющая команда.",
                    "Container build: BuildKit + стратегия кэша слоёв. SBOM через Syft, подпись Cosign, сканирование Trivy на каждом push.",
                    "Кластерная подложка: Kubernetes (managed если можно — EKS, GKE, AKS; self-hosted только если есть SRE-команда, которой можно позвонить в 3 ночи).",
                    "Примитивы control plane: Cilium для сети + observability, Crossplane для infrastructure-as-data, External Secrets для секретов.",
                    "Доставка: ArgoCD ApplicationSets, идущие от каталога. Argo Rollouts (или Flagger) для canary / blue-green.",
                    "Observability: OpenTelemetry SDK в каждом сервисе, Tempo для трейсов, Loki для логов, Mimir или ванильный Prometheus для метрик. Grafana сверху.",
                    "Поверхность для разработчика: Backstage как парадная. Локальный flow `tilt up` или `devbox`, отражающий production."
                ] },
                { type: "p", content: "Если у вас уже 7 из 7 — поздравляем, у вас то, что большинство респондентов CNCF survey назвали бы платформой Tier 1. Если 4 из 7 — обычная платформа компании средней стадии. Если 2 из 7 — то, что есть у 60% команд, называющих себя «platform engineering», и это нормально, просто будьте честны." },
                { type: "h2", content: "За что стоит сражаться" },
                { type: "h3", content: "Реальный software catalog" },
                { type: "p", content: "Если ваша платформа не знает, какие сервисы существуют, кто ими владеет и какая версия в prod — ничего другого не может быть надёжным. Соглашение Backstage `catalog-info.yaml` победило тем, что скучное и Git-native — каталог не БД, а папка. Подъём установки Backstage нетривиален (Node.js-приложение с плагинами, Postgres, интеграция GitHub), но альтернатива — вики-страница, которая устаревает за шесть недель. Port и OpsLevel — SaaS-сокращения; берите если не можете выделить двух инженеров на содержание Backstage." },
                { type: "h3", content: "Pull-model GitOps" },
                { type: "p", content: "ArgoCD или Flux. Pull-модель — кластер смотрит Git, реконсилит дрейф — корректна по той же причине, что и сам Kubernetes: желаемое состояние в queryable-хранилище, актуатор работает непрерывно, реальность сходится с намерением. Push-деплои (CI делает `kubectl apply` через kubeconfig) работают, пока не сломается CI, не уплывёт контекст кластера или кто-то не отредактирует ресурс руками. Pull убирает целый класс инцидентов." },
                { type: "h3", content: "OpenTelemetry, не вендорский SDK" },
                { type: "p", content: "Выберите observability-вендора сегодня — будете инструментировать их SDK. Выберите OTel сегодня — день смены вендора это одна строчка конфига. Паттерн коллектора (`otelcol-contrib`) сидит между вашими сервисами и бэкендами, позволяет фан-аут (Tempo для трейсов сегодня, Honeycomb завтра) и чисто ломает vendor lock-in." },
                { type: "h2", content: "Что переоценено" },
                { type: "h3", content: "Service mesh — для большинства команд" },
                { type: "p", content: "Сложность data plane Istio — реальная цена. Linkerd мягче, но всё ещё слой, который надо эксплуатировать. Если вы на Cilium — у вас уже mTLS и L7 observability через eBPF без sidecar'ов. Тренд 2024–2026: «service mesh» как категория поглощается сетевым слоем (Cilium Service Mesh, Ambient Istio). Не ставьте Istio в 2026, пока конкретно не определите, что потеряете без него." },
                { type: "h3", content: "Кастомные CI/CD платформы" },
                { type: "p", content: "Не пишите свой CI. GitHub Actions, GitLab CI или Buildkite — выберите один и остановитесь. Работа платформ-команды — давать отличные шаблоны workflow и reusable-actions, а не поддерживать форк Jenkins." },
                { type: "h2", content: "Что недооценено" },
                { type: "h3", content: "Crossplane" },
                { type: "p", content: "Если вы управляете AWS-ресурсами через Terraform, а Kubernetes-ресурсами через Helm/Kustomize — у вас два control plane. Crossplane позволяет выражать оба как Kubernetes CRD, реконсилируемые ArgoCD. Модель XRD/Composition — тот же gitops pull-loop, что и ваши приложения. Стоит построить одну Composition «create-database-with-readonly-replica», и видно, почему Terraform — скучный действующий чемпион, а Crossplane — будущее." },
                { type: "code", lang: "yaml", content: "# Composition: один ресурс в YAML создаёт 5\napiVersion: apiextensions.crossplane.io/v1\nkind: CompositeResourceDefinition\nmetadata:\n  name: xpostgresinstances.platform.example.org\nspec:\n  group: platform.example.org\n  names:\n    kind: XPostgresInstance\n  claimNames:\n    kind: PostgresInstance\n  versions:\n    - name: v1alpha1\n      served: true\n      referenceable: true\n---\n# Команда приложения пишет это:\napiVersion: platform.example.org/v1alpha1\nkind: PostgresInstance\nmetadata:\n  name: orders-db\nspec:\n  size: medium\n  region: eu-west-1\n# ...получает RDS instance + subnet group + security group + parameter group + IAM role." },
                { type: "h3", content: "FinOps как Day-2 забота" },
                { type: "p", content: "Большинство платформ выходят без cost attribution и платят потом. Поставьте Kubecost или OpenCost с первого дня. Тегируйте каждый workload — `team`, `service`, `cost-center`. Дашборды на уровне команды — это то, что заставляет команды приложений беспокоиться о resource limits, конфигах автоскейлинга, простаивающих workload'ах. Платформа, которая трекает DORA-метрики, но не доллары на сервис, упускает половину картины." },
                { type: "h2", content: "Skip-лист — что большинство команд пока не должны добавлять" },
                { type: "list", items: [
                    "Мульти-кластер федерация. Один кластер на окружение, как cattle, бьёт пять кластеров с федерацией для почти всех под 200 сервисов.",
                    "Сложность GPU-оператора. Если делаете AI inference — этому workload'у заслуженно нужен свой кластер; не путайте GPU-планирование со stateless веб-слоем.",
                    "WASM workloads в K8s (пока). Привлекательное будущее, хрупкое настоящее. Возвращайтесь в 2027.",
                    "Кастомные внутренние CRD на всё. Каждая CRD — это то, что платформ-команде придётся апгрейдить через версии Kubernetes вечно. Будьте экономны.",
                    "Микросервисы для stateless веб-приложений до 5 инженеров. Ловушка распределённого монолита всё ещё реальна."
                ] },
                { type: "h2", content: "Как понять, что платформа работает" },
                { type: "p", content: "Честный показатель — не глубина инструментов, не Lighthouse-скоры, не количество CNCF-проектов в стеке. А может ли команда приложения ответить «как мне выкатить новый сервис?» одним предложением и ссылкой на каталог. Если да — у вас платформа. Если им надо спросить платформ-команду — у вас SRE-консалтинг с красивым логотипом." },
                { type: "p", content: "Референсный стек выше — стартовая точка. Работа вашей платформы — превратить его в опыт вашей команды: скучно, предсказуемо и так хорошо, чтобы никто не замечал." },
                { type: "h2", content: "Три действия на этой неделе, если стартуете сейчас" },
                { type: "ordered", items: [
                    "Решите по software catalog. Backstage если есть инженеры; Port или OpsLevel если нет. Заведите туда один сервис до пятницы.",
                    "Выберите направление GitOps. ArgoCD или Flux, pull-модель, декларативные манифесты в одном platform-репо. Перестаньте позволять CI держать креды кластера.",
                    "Инструментируйте один сервис end-to-end через OpenTelemetry. Отправьте трейсы в Tempo (или любой OTel-совместимый бэкенд). Первый трейс через реальный запрос — момент, когда команда понимает, что реально покупает observability."
                ] }
            ]
        }
    },

    /* ─── 02. Backstage IDPs ────────────────────────────────────── */
    {
        slug: "backstage-idp-2026",
        date: "2026-09-22",
        readMinutes: 12,
        tags: ["Platform Engineering", "Backstage", "Developer Experience"],
        en: {
            title: "Backstage and What an Internal Developer Portal Actually Buys You",
            excerpt: "Internal developer portals are the most-talked-about platform layer of 2025–2026 — and the most over-installed. Here's what Backstage actually does, and when not to.",
            sections: [
                { type: "p", content: "Every platform team since 2023 has heard the same suggestion: 'install Backstage'. Some did and got a working software catalog in three weeks. Some did and spent six months on Node.js plugins and Postgres upgrades, ending with a portal nobody opens. Both outcomes are real. The difference isn't team skill; it's whether the team had a problem Backstage solves." },
                { type: "h2", content: "What an Internal Developer Portal is" },
                { type: "p", content: "A portal is a single web surface where engineers can answer four questions about your software estate: what services exist, who owns them, how they relate, and how to do common tasks. Backstage is the dominant open-source implementation of this idea, originally built at Spotify and graduated CNCF in 2024. Port, Cortex, and OpsLevel are the SaaS competitors." },
                { type: "p", content: "The reason these portals exist now and not in 2017: microservice estates outgrew tribal knowledge. When you have 15 services, the wiki is fine. When you have 80, the wiki lies, the README files are stale, and onboarding takes two months because nobody knows where anything lives. The portal is the canonical answer to 'where is the source of truth?' — and the answer is 'in Git, indexed by the portal'." },
                { type: "h2", content: "The four jobs Backstage actually does" },
                { type: "h3", content: "1. Software catalog" },
                { type: "p", content: "Every service has a `catalog-info.yaml` file in its repo. Backstage indexes them and renders a graph: services, components, APIs, resources, owning teams. This is the unglamorous core, and it's what 90% of the value comes from." },
                { type: "code", lang: "yaml", content: "# catalog-info.yaml in your service repo\napiVersion: backstage.io/v1alpha1\nkind: Component\nmetadata:\n  name: orders-api\n  description: Order processing REST API\n  annotations:\n    github.com/project-slug: example/orders-api\n    grafana/dashboard-selector: 'tags=orders'\n    pagerduty.com/integration-key: PXXXXX\n  tags: ['production', 'tier-1']\nspec:\n  type: service\n  lifecycle: production\n  owner: team-orders\n  system: orders-platform\n  providesApis:\n    - orders-api-v1\n  dependsOn:\n    - resource:postgres-orders\n    - component:auth-service" },
                { type: "h3", content: "2. Software templates (scaffolder)" },
                { type: "p", content: "A button: 'Create new Go service'. The template clones a starter repo, replaces variables, sets up CI, registers the service in the catalog, creates the database in Crossplane, and opens a PR with infrastructure changes. The first one takes a week to write. After that, every new service comes online in 20 minutes instead of three days." },
                { type: "h3", content: "3. TechDocs" },
                { type: "p", content: "Markdown lives next to the code. MkDocs renders it. Backstage indexes and serves it under each component. Docs that are next to the code stay current; wiki pages don't." },
                { type: "h3", content: "4. Plugin ecosystem" },
                { type: "p", content: "Each component page can show: build status (GitHub Actions plugin), runtime metrics (Grafana embed), recent incidents (PagerDuty), open PRs (GitHub). The plugin pattern is the killer feature — instead of switching between 8 dashboards, you see all 8 inline on the service page." },
                { type: "h2", content: "Where Backstage breaks down" },
                { type: "p", content: "It's a Node.js monorepo with a Postgres dependency. You're now operating it. Plugin updates can collide. The frontend is built on Material UI, which most teams will eventually want to restyle. Authentication is configurable but never trivial. None of this is unmanageable, but if your platform team is two people, you're spending 20% of their time on Backstage itself, not on the platform." },
                { type: "p", content: "Watch out for the 'install and forget' anti-pattern. Backstage installed but unloved is worse than no portal — it actively misleads engineers about what's authoritative. The hardest work isn't the install; it's keeping the catalog accurate as services are renamed, deprecated, and merged." },
                { type: "h2", content: "When SaaS portals win" },
                { type: "p", content: "Port and OpsLevel are SaaS portals with tighter scope. They lose the open-plugin ecosystem but gain: nothing to host, opinionated UX, faster scorecard features (where they actually beat Backstage), and integrations that Just Work. If your platform team is small, the SaaS path is genuinely the right call. The Spotify-style 'we'll customize the portal to fit our culture' argument applies at >30 services and >100 engineers, not before." },
                { type: "h2", content: "Scorecards: the most underused IDP feature" },
                { type: "p", content: "A scorecard is a checklist applied to every service in the catalog: has runbook, has on-call rotation, has CI passing, OpenTelemetry-instrumented, error rate under 0.5%, no critical CVEs in last scan. The portal computes pass/fail per service and ranks teams by compliance." },
                { type: "p", content: "Scorecards do something pull requests can't: they make platform investments visible. When the 'Has OpenTelemetry' compliance jumps from 12% to 78% in a quarter, that's a metric the platform team can put in front of a VP. Without scorecards, platform work looks invisible." },
                { type: "h3", content: "Example scorecard rules" },
                { type: "list", items: [
                    "Service has a `catalog-info.yaml` with a non-empty `owner` field",
                    "Repository has a `.github/workflows/` directory with a passing build in the last 7 days",
                    "PagerDuty integration key set in catalog annotations",
                    "Service emits OpenTelemetry traces (verified by querying Tempo for the service name)",
                    "P95 latency under defined SLO threshold over the last 30 days",
                    "No critical CVEs in latest container scan"
                ] },
                { type: "h2", content: "How to evaluate if you need a portal" },
                { type: "p", content: "Three honest questions:" },
                { type: "ordered", items: [
                    "Can a new engineer find which team owns a given service in under a minute? If yes, your README + wiki may be enough for now.",
                    "How long does it take to spin up a new service end-to-end (repo, CI, deploy, database, observability)? If under 30 minutes, you have implicit templates and you don't need scaffolder yet.",
                    "Do you have services that nobody owns? If yes, a portal won't fix that — but it'll make it humiliatingly visible, which is the first step."
                ] },
                { type: "p", content: "If two of three are no, a portal is overdue. If two of three are yes, you can wait — buy yourself another quarter and revisit." },
                { type: "h2", content: "The migration story nobody tells" },
                { type: "p", content: "Once you have a catalog, you'll discover services nobody runs anymore, services owned by teams that no longer exist, services with no recorded SLO, and services that don't exist on paper but absolutely run in production. The portal doesn't create that inventory — it surfaces what was always there." },
                { type: "p", content: "This is the real reason senior leadership eventually loves IDPs. Not because of the slick UI. Because the portal is the first audit-able answer to 'what are we running, and who's responsible?'. That answer is what makes platform investment funded." }
            ]
        },
        ru: {
            title: "Backstage и что реально покупает Internal Developer Portal",
            excerpt: "Internal Developer Portal — самый обсуждаемый слой платформы 2025–2026 и самый часто бесполезно установленный. Что Backstage реально делает и когда не стоит.",
            sections: [
                { type: "p", content: "Каждая платформ-команда с 2023 слышит одно и то же: «поставьте Backstage». Кто-то поставил и получил рабочий software catalog за три недели. Кто-то поставил и потратил полгода на Node.js-плагины и апгрейды Postgres, закончив порталом, который никто не открывает. Оба исхода реальны. Разница не в скилле — в том, была ли у команды задача, которую Backstage решает." },
                { type: "h2", content: "Что такое Internal Developer Portal" },
                { type: "p", content: "Портал — единая веб-поверхность, где инженеры могут ответить на четыре вопроса о вашем софт-эстейте: какие сервисы существуют, кто ими владеет, как они связаны и как делать типичные задачи. Backstage — доминантная open-source реализация этой идеи, изначально построенная в Spotify, вошедшая в CNCF graduation в 2024. Port, Cortex и OpsLevel — SaaS-конкуренты." },
                { type: "p", content: "Почему эти порталы существуют сейчас, а не в 2017: микросервисные эстейты переросли племенное знание. На 15 сервисах wiki нормально. На 80 — wiki врёт, README устарели, онбординг занимает два месяца, потому что никто не знает, где что живёт. Портал — канонический ответ на «где source of truth?» — и ответ: «в Git, индексировано порталом»." },
                { type: "h2", content: "Четыре задачи, которые реально делает Backstage" },
                { type: "h3", content: "1. Software catalog" },
                { type: "p", content: "У каждого сервиса свой `catalog-info.yaml` в репо. Backstage индексирует и рендерит граф: сервисы, компоненты, API, ресурсы, владеющие команды. Это негламурное ядро — и из него идёт 90% ценности." },
                { type: "code", lang: "yaml", content: "# catalog-info.yaml в репо сервиса\napiVersion: backstage.io/v1alpha1\nkind: Component\nmetadata:\n  name: orders-api\n  description: Order processing REST API\n  annotations:\n    github.com/project-slug: example/orders-api\n    grafana/dashboard-selector: 'tags=orders'\n    pagerduty.com/integration-key: PXXXXX\n  tags: ['production', 'tier-1']\nspec:\n  type: service\n  lifecycle: production\n  owner: team-orders\n  system: orders-platform\n  providesApis:\n    - orders-api-v1\n  dependsOn:\n    - resource:postgres-orders\n    - component:auth-service" },
                { type: "h3", content: "2. Software templates (scaffolder)" },
                { type: "p", content: "Кнопка: «Создать новый Go-сервис». Шаблон клонирует starter-репо, подставляет переменные, ставит CI, регистрирует сервис в каталоге, создаёт базу через Crossplane и открывает PR с инфраструктурой. Первый шаблон пишется неделю. Дальше каждый новый сервис подключается за 20 минут вместо трёх дней." },
                { type: "h3", content: "3. TechDocs" },
                { type: "p", content: "Markdown лежит рядом с кодом. MkDocs рендерит. Backstage индексирует и отдаёт под каждым компонентом. Доки рядом с кодом остаются актуальными; wiki-страницы — нет." },
                { type: "h3", content: "4. Экосистема плагинов" },
                { type: "p", content: "Страница компонента может показывать: статус сборки (плагин GitHub Actions), runtime-метрики (Grafana embed), последние инциденты (PagerDuty), открытые PR (GitHub). Паттерн плагинов — killer-фича: вместо переключения между 8 дашбордами все 8 встроены прямо на страницу сервиса." },
                { type: "h2", content: "Где Backstage ломается" },
                { type: "p", content: "Это Node.js-монорепо с зависимостью на Postgres. Теперь вы его эксплуатируете. Обновления плагинов могут конфликтовать. Фронтенд на Material UI — большинство команд рано или поздно захотят перестилизовать. Аутентификация настраивается, но никогда не тривиальна. Ничего из этого не неуправляемо, но если платформ-команда из двух человек — 20% времени уходит на сам Backstage, не на платформу." },
                { type: "p", content: "Берегитесь анти-паттерна «install and forget». Установленный, но нелюбимый Backstage хуже, чем отсутствие портала — он активно вводит инженеров в заблуждение о том, что авторитетно. Сложная работа — не установка; это поддержание каталога точным по мере того, как сервисы переименовываются, депрекейтятся и сливаются." },
                { type: "h2", content: "Когда SaaS-порталы выигрывают" },
                { type: "p", content: "Port и OpsLevel — SaaS-порталы с более узким scope. Теряют экосистему open-плагинов, но получают: нечего хостить, opinionated UX, быстрые scorecard-фичи (где реально бьют Backstage) и интеграции, которые Just Work. Если платформ-команда маленькая — SaaS-путь действительно правильный. Аргумент в стиле Spotify «кастомизируем портал под нашу культуру» применим на >30 сервисов и >100 инженеров, не раньше." },
                { type: "h2", content: "Scorecards — самая недоиспользуемая фича IDP" },
                { type: "p", content: "Scorecard — чек-лист, применяемый к каждому сервису в каталоге: есть runbook, есть on-call ротация, CI зелёный, инструментирован OpenTelemetry, error rate под 0.5%, нет критических CVE в последнем скане. Портал считает pass/fail по сервису и ранжирует команды по compliance." },
                { type: "p", content: "Scorecards делают то, чего не могут pull request'ы: делают платформенные инвестиции видимыми. Когда compliance «Has OpenTelemetry» прыгает с 12% до 78% за квартал — это метрика, которую платформ-команда может показать VP. Без scorecards платформенная работа выглядит невидимой." },
                { type: "h3", content: "Примеры правил scorecard" },
                { type: "list", items: [
                    "У сервиса есть `catalog-info.yaml` с непустым полем `owner`",
                    "В репозитории есть `.github/workflows/` с зелёным билдом за последние 7 дней",
                    "PagerDuty integration key выставлен в аннотациях каталога",
                    "Сервис эмитит OpenTelemetry-трейсы (проверка через Tempo по имени сервиса)",
                    "P95 latency под определённым SLO-порогом за последние 30 дней",
                    "Нет критических CVE в последнем скане контейнера"
                ] },
                { type: "h2", content: "Как оценить, нужен ли портал" },
                { type: "p", content: "Три честных вопроса:" },
                { type: "ordered", items: [
                    "Может ли новый инженер найти, какая команда владеет данным сервисом, за минуту? Если да — README + wiki, может, пока хватает.",
                    "Сколько времени занимает поднять новый сервис end-to-end (репо, CI, деплой, база, observability)? Если под 30 минут — у вас неявные шаблоны, scaffolder пока не нужен.",
                    "Есть ли сервисы, которыми никто не владеет? Если да — портал это не починит, но сделает унизительно видимым, что и есть первый шаг."
                ] },
                { type: "p", content: "Если два из трёх — нет, портал давно нужен. Если два из трёх — да, можно подождать — купите себе ещё квартал и вернитесь." },
                { type: "h2", content: "Миграционная история, которую никто не рассказывает" },
                { type: "p", content: "Когда у вас появится каталог — обнаружите сервисы, которые никто не запускает; сервисы, владельцы которых уже не в компании; сервисы без записанного SLO; и сервисы, которых нет на бумаге, но абсолютно есть в production. Портал не создаёт этот инвентарь — он вытаскивает то, что всегда было." },
                { type: "p", content: "Это и есть настоящая причина, по которой senior leadership рано или поздно полюбит IDP. Не из-за гладкого UI. Потому что портал — первый поддающийся аудиту ответ на «что мы запускаем и кто отвечает?». Этот ответ — то, что обеспечивает финансирование платформенных инвестиций." }
            ]
        }
    },

    /* ─── 03. Platform Eng vs DevOps ────────────────────────────── */
    {
        slug: "platform-engineering-not-devops-renamed",
        date: "2026-09-08",
        readMinutes: 11,
        tags: ["Platform Engineering", "DevOps", "Team Topologies", "Career"],
        en: {
            title: "Platform Engineering Is Not 'DevOps Renamed' — Here's What Actually Changed",
            excerpt: "The real shift isn't a job title. It's a model where platform teams ship products to internal customers, and 'you build it you run it' gets a big asterisk.",
            sections: [
                { type: "p", content: "Every six months a tweet goes viral claiming platform engineering is just DevOps with a new badge. The takes are tired and miss what changed. Job titles are downstream of organizational structure, and the structure that produced 'platform engineer' is genuinely different from the one that produced 'DevOps engineer'. Both can be the same person on the same team. They imply different operating models." },
                { type: "h2", content: "DevOps was a movement; platform engineering is a team topology" },
                { type: "p", content: "DevOps as a movement (2009-ish) was the fight against the dev-vs-ops wall. The thesis: software teams should own their software end-to-end, including ops. The slogan: 'you build it, you run it'. The implementations: shared on-call, infrastructure as code, CI/CD pipelines owned by application teams. It worked." },
                { type: "p", content: "Then it didn't. Or rather: it scaled badly. By the time most companies had 30+ services, application teams were spending 30%+ of their time on platform concerns — Kubernetes manifests, observability instrumentation, SBOMs, secrets rotation, RBAC tuning. Each team was reinventing the same stack, badly. The cognitive load was crushing them, and the ops outcomes were getting worse, not better." },
                { type: "p", content: "Team Topologies (Skelton & Pais, 2019) named the failure pattern: when every team has full ownership without supporting infrastructure, you don't get autonomy, you get duplication and burnout. The fix wasn't to undo DevOps. It was to introduce a different kind of team — a platform team — that absorbs the boring, repeated infrastructure work and serves it back to application teams as a product." },
                { type: "h2", content: "What 'platform-as-a-product' actually means" },
                { type: "p", content: "The big mental shift is treating internal engineers as customers. A platform team has users (other engineers), a product (the platform), a roadmap, support channels, and adoption metrics. They don't have tickets — they have user research." },
                { type: "p", content: "This sounds like consultant-speak. It isn't. Concretely it changes:" },
                { type: "list", items: [
                    "What gets built. The platform team's roadmap is determined by what application teams keep doing manually. They watch — Slack channels, Jira, the catalog scorecards — for repetition and turn it into self-service.",
                    "How success is measured. Not 'cluster uptime' (table stakes) but 'time from new-service-decision to production' (the user-facing metric).",
                    "Who's in charge. Application teams remain accountable for their software. Platform teams are accountable for the paved road being smooth enough that nobody wants to leave it."
                ] },
                { type: "quote", content: "If application teams keep going off-road, your paved road is wrong. That's a product problem, not a compliance problem." },
                { type: "h2", content: "The 'you build it, you run it' update" },
                { type: "p", content: "The old slogan still applies, with a footnote. App teams own their service's correctness, performance, on-call, and bug fixes. They don't own:" },
                { type: "list", items: [
                    "How container images are built (the platform provides BuildKit + Cosign + scanning).",
                    "How deployment happens (the platform provides ArgoCD + Argo Rollouts).",
                    "Where logs/metrics/traces go (the platform provides OpenTelemetry config + backends).",
                    "How secrets are stored (the platform provides External Secrets + a vault).",
                    "What runtime they get (the platform provides Kubernetes + node pools)."
                ] },
                { type: "p", content: "If an app team disagrees with the paved road, they can leave it — but they then accept the operational burden of running their own version. This 'paved road plus exit ramps' model is the practical shape of you-build-it-you-run-it in 2026." },
                { type: "h2", content: "Three operating-model patterns" },
                { type: "h3", content: "1. The platform team as enablement" },
                { type: "p", content: "Small org (~50 engineers). One or two platform engineers, often part-time SRE. Their job is mostly choosing tools (Argo over Spinnaker, Backstage over wiki) and shipping templates. They don't operate much; the cloud provider does. This works up to ~30 services or so." },
                { type: "h3", content: "2. The platform team as product" },
                { type: "p", content: "Mid-stage company. 4–10 platform engineers running an internal platform that 50–200 app engineers depend on. They have a product manager. They publish quarterly OKRs. They run user interviews with app teams. The platform is a real product with real adoption metrics." },
                { type: "h3", content: "3. The platform team as multiple specialized teams" },
                { type: "p", content: "Large org. The 'platform' breaks into a delivery team (CI/CD, GitOps), an observability team, a developer-experience team (Backstage, IDE tooling), a foundation team (cluster operators, networking), and possibly a security/compliance team. Each is its own product with its own customer." },
                { type: "p", content: "The pattern is the same at every size: someone owns the paved road, with a budget, a roadmap, and a 'no' button when application teams ask for snowflakes." },
                { type: "h2", content: "Where the term 'platform engineer' breaks down" },
                { type: "p", content: "Two complaints are valid." },
                { type: "p", content: "First: in companies with no platform team, 'platform engineer' is just a fashionable title for the SRE who happens to also write Terraform. That's fine; it's a CV signal more than a role description. Don't expect deep meaning from a job title in a 50-person company." },
                { type: "p", content: "Second: 'platform engineering' has been over-marketed to the point that some teams install Backstage and ArgoCD without ever asking what the application teams actually need. This is the same trap as installing a service mesh because the conference said you should. The question is always: what specific friction in our app teams' day are we removing?" },
                { type: "h2", content: "The DORA / SPACE / DevEx connection" },
                { type: "p", content: "Platform engineering teams need ways to prove they're working. The metric stacks that have emerged:" },
                { type: "list", items: [
                    "DORA (deploy frequency, lead time for changes, change failure rate, MTTR). Old but still load-bearing.",
                    "SPACE (Satisfaction, Performance, Activity, Communication, Efficiency). Adds the qualitative side that DORA misses.",
                    "DevEx framework (Feedback Loops, Cognitive Load, Flow State). The most platform-engineering-aligned because it explicitly names cognitive load as the thing platforms reduce."
                ] },
                { type: "p", content: "Most credible 2025–2026 platform teams report some mix of DORA + DevEx. The DORA numbers tell you whether the system is shipping; the DevEx numbers tell you whether engineers feel like they have a future at the company." },
                { type: "h2", content: "Practical takeaways" },
                { type: "ordered", items: [
                    "If you're a 'DevOps engineer' at a 200-person company and your work is choosing tools and shipping shared templates — you're a platform engineer, regardless of title.",
                    "If you're a 'platform engineer' at a 30-person company and your work is provisioning AWS resources for whichever team asks — you're an SRE/DevOps engineer, regardless of title.",
                    "Treat your internal users as users. The platform's success is downstream of how engineers feel using it on a Tuesday afternoon, not how impressive the architecture diagram looks in a conference talk."
                ] },
                { type: "p", content: "The job title doesn't matter. The operating model does. Platform engineering, when it works, is the discipline of treating internal infrastructure as a product. When it doesn't work, it's a rebrand. Pick the work that lets you be the former." }
            ]
        },
        ru: {
            title: "Platform Engineering — это не «DevOps переименовали»: что реально изменилось",
            excerpt: "Реальный сдвиг — не в названии должности. В модели, где платформ-команды отгружают продукт внутренним клиентам, а у «you build it you run it» появляется большая звёздочка.",
            sections: [
                { type: "p", content: "Каждые полгода вирусится твит, что platform engineering — это просто DevOps с новой биркой. Тейки уставшие и упускают что изменилось. Названия должностей — следствие организационной структуры, а структура, которая родила «platform engineer», по-настоящему отличается от той, что родила «DevOps engineer». Оба могут быть одним человеком в одной команде. Они подразумевают разные operating models." },
                { type: "h2", content: "DevOps был движением; platform engineering — это team topology" },
                { type: "p", content: "DevOps как движение (примерно 2009) — это бой со стеной dev-vs-ops. Тезис: софт-команды должны владеть своим софтом end-to-end, включая ops. Слоган: «you build it, you run it». Реализации: общий on-call, infrastructure as code, CI/CD пайплайны во владении команд приложений. Сработало." },
                { type: "p", content: "А потом перестало. Точнее — плохо масштабировалось. К моменту, когда у большинства компаний стало 30+ сервисов, команды приложений тратили 30%+ времени на платформенные заботы — манифесты Kubernetes, инструментирование observability, SBOM, ротация секретов, тюнинг RBAC. Каждая команда переизобретала один и тот же стек, плохо. Когнитивная нагрузка их давила, а ops-результаты не улучшались, а ухудшались." },
                { type: "p", content: "Team Topologies (Skelton & Pais, 2019) назвали failure-паттерн: когда у каждой команды полное ownership без поддерживающей инфраструктуры — вы получаете не автономию, а дублирование и выгорание. Фикс — не отменить DevOps. Завести другой тип команды — платформ-команду — которая поглощает скучную повторяющуюся инфраструктурную работу и отдаёт её команде приложений как продукт." },
                { type: "h2", content: "Что значит «platform-as-a-product»" },
                { type: "p", content: "Большой ментальный сдвиг — относиться к внутренним инженерам как к клиентам. У платформ-команды есть пользователи (другие инженеры), продукт (платформа), roadmap, каналы поддержки, метрики adoption. У них нет тикетов — у них user research." },
                { type: "p", content: "Звучит как консультантский жаргон. Это не так. Конкретно это меняет:" },
                { type: "list", items: [
                    "Что строится. Roadmap платформ-команды задаётся тем, что команды приложений продолжают делать руками. Они смотрят — Slack-каналы, Jira, scorecard каталога — на повторение и превращают его в self-service.",
                    "Как меряется успех. Не «uptime кластера» (это база), а «время от решения о новом сервисе до production» (метрика на стороне пользователя).",
                    "Кто отвечает. Команды приложений остаются accountable за свой софт. Платформ-команды — за то, чтобы paved road была достаточно гладкой, чтобы никто не хотел съехать."
                ] },
                { type: "quote", content: "Если команды приложений продолжают съезжать с дороги — ваша paved road неправильная. Это продуктовая проблема, не compliance-проблема." },
                { type: "h2", content: "Апдейт «you build it, you run it»" },
                { type: "p", content: "Старый слоган всё ещё применим, с примечанием. Команды приложений владеют корректностью своего сервиса, производительностью, on-call, фиксами багов. Они НЕ владеют:" },
                { type: "list", items: [
                    "Как собираются образы контейнеров (платформа предоставляет BuildKit + Cosign + сканирование).",
                    "Как происходит деплой (платформа предоставляет ArgoCD + Argo Rollouts).",
                    "Куда идут логи/метрики/трейсы (платформа предоставляет OpenTelemetry конфиг + бэкенды).",
                    "Как хранятся секреты (платформа предоставляет External Secrets + vault).",
                    "Какой runtime получают (платформа предоставляет Kubernetes + node pools)."
                ] },
                { type: "p", content: "Если команда приложения не согласна с paved road — может съехать, но принимает на себя operational бремя содержания своей версии. Эта модель «paved road plus exit ramps» — практическая форма you-build-it-you-run-it в 2026." },
                { type: "h2", content: "Три паттерна operating model" },
                { type: "h3", content: "1. Платформ-команда как enablement" },
                { type: "p", content: "Маленькая организация (~50 инженеров). Один-два платформ-инженера, часто part-time SRE. Их работа — выбор инструментов (Argo вместо Spinnaker, Backstage вместо wiki) и шипинг шаблонов. Эксплуатируют немного; провайдер облака делает большую часть. Работает до ~30 сервисов." },
                { type: "h3", content: "2. Платформ-команда как product" },
                { type: "p", content: "Mid-stage компания. 4–10 платформ-инженеров, эксплуатирующих внутреннюю платформу, от которой зависят 50–200 инженеров приложений. У них product manager. Публикуют квартальные OKR. Проводят user-интервью с командами приложений. Платформа — реальный продукт с реальными метриками adoption." },
                { type: "h3", content: "3. Платформа как несколько специализированных команд" },
                { type: "p", content: "Большая организация. «Платформа» разбивается на delivery-команду (CI/CD, GitOps), observability-команду, developer-experience команду (Backstage, IDE-инструменты), foundation-команду (операторы кластера, сеть), возможно security/compliance. Каждая — свой продукт со своим клиентом." },
                { type: "p", content: "Паттерн один и тот же на любом масштабе: кто-то владеет paved road, с бюджетом, roadmap'ом и кнопкой «нет», когда команды приложений просят снежинки." },
                { type: "h2", content: "Где термин «platform engineer» ломается" },
                { type: "p", content: "Две жалобы валидны." },
                { type: "p", content: "Первая: в компаниях без платформ-команды «platform engineer» — просто модное название для SRE, который ещё пишет Terraform. Это нормально; CV-сигнал больше, чем описание роли. Не ожидайте глубокого смысла от названия должности в компании на 50 человек." },
                { type: "p", content: "Вторая: «platform engineering» переmarketing'нули до того, что некоторые команды ставят Backstage и ArgoCD, ни разу не спросив, что командам приложений реально нужно. Это та же ловушка, что и установка service mesh, потому что на конференции сказали. Вопрос всегда: какое конкретное трение в дне команды приложения мы убираем?" },
                { type: "h2", content: "Связь с DORA / SPACE / DevEx" },
                { type: "p", content: "Платформ-командам нужны способы доказывать, что они работают. Появившиеся метрические стеки:" },
                { type: "list", items: [
                    "DORA (deploy frequency, lead time, change failure rate, MTTR). Старое, но несущее.",
                    "SPACE (Satisfaction, Performance, Activity, Communication, Efficiency). Добавляет качественную сторону, которую DORA пропускает.",
                    "DevEx framework (Feedback Loops, Cognitive Load, Flow State). Самый platform-engineering-aligned — явно называет cognitive load как то, что платформы сокращают."
                ] },
                { type: "p", content: "Большинство достоверных платформ-команд 2025–2026 репортят какой-то микс DORA + DevEx. DORA-числа говорят, шипит ли система; DevEx-числа — чувствуют ли инженеры, что у них есть будущее в компании." },
                { type: "h2", content: "Практические выводы" },
                { type: "ordered", items: [
                    "Если вы «DevOps engineer» в компании на 200 человек и ваша работа — выбирать инструменты и шипить общие шаблоны — вы platform engineer, независимо от названия.",
                    "Если вы «platform engineer» в компании на 30 человек и провижените AWS-ресурсы для команды, которая попросила — вы SRE/DevOps engineer, независимо от названия.",
                    "Относитесь к внутренним пользователям как к пользователям. Успех платформы — следствие того, как инженеры чувствуют себя, используя её во вторник днём; не того, как впечатляюще архитектурная диаграмма выглядит на конференции."
                ] },
                { type: "p", content: "Название должности не важно. Operating model важна. Platform engineering, когда работает, — дисциплина обращения с внутренней инфраструктурой как с продуктом. Когда не работает — это ребрендинг. Выбирайте работу, которая позволит вам быть первым." }
            ]
        }
    },

    /* ─── 04. GitOps ArgoCD vs Flux ─────────────────────────────── */
    {
        slug: "gitops-argocd-vs-flux-2026",
        date: "2026-08-25",
        readMinutes: 12,
        tags: ["GitOps", "Kubernetes", "ArgoCD", "Flux", "DevOps"],
        en: {
            title: "GitOps in 2026: ArgoCD vs Flux, and Why the Pull Model Won",
            excerpt: "The push-vs-pull debate is over. The argo-vs-flux debate isn't. Here's how the two have diverged in 2025–2026 and which one actually fits which team.",
            sections: [
                { type: "p", content: "Five years ago you could pick your delivery system based on whatever your team already used: Jenkins if you were big and old, Spinnaker if you were Netflix-flavored, Drone if you were small. Today the only credible answer for Kubernetes deployment is GitOps, and the only credible debate is which GitOps tool — ArgoCD or Flux. Both are CNCF graduated. Both are mature. They are not interchangeable." },
                { type: "h2", content: "The push-vs-pull debate (resolved)" },
                { type: "p", content: "Push CI/CD: your CI pipeline holds a kubeconfig, runs `kubectl apply` on success. Pull GitOps: an in-cluster agent watches a Git repo and reconciles cluster state to match. The pull model wins for three concrete reasons that aren't ideological:" },
                { type: "ordered", items: [
                    "Credentials don't leave the cluster. The agent has read access to Git; CI never sees cluster credentials. Half of post-mortems involving CI compromise stop being possible.",
                    "Drift detection is automatic. If someone hand-edits a resource in production, the agent sees the difference and re-applies the Git state. No special tooling required; it's the default behavior.",
                    "The deployed state is queryable from Git. Want to know what's in production? `git log` the manifests repo. No 'last deploy' database to consult."
                ] },
                { type: "p", content: "If your team is still on push-based deploys in 2026, the migration is high-leverage. Even small teams benefit from the moment they have more than one cluster." },
                { type: "h2", content: "Where ArgoCD and Flux genuinely differ" },
                { type: "h3", content: "Mental model" },
                { type: "p", content: "ArgoCD is application-centric. The unit is an `Application` resource pointing at a path in a Git repo. The dashboard is the central concept — a tree of applications, sync states, diff views. Engineers spend time in the UI." },
                { type: "p", content: "Flux is reconciler-centric. The units are `GitRepository` (a source) and `Kustomization` or `HelmRelease` (a reconciler reading from that source). The CLI and Kubernetes resources are the interface; there's no native UI shipped with Flux (Weave GitOps adds one). Engineers spend time in `kubectl get` and `flux get`." },
                { type: "p", content: "The difference matters more than people admit. ArgoCD-shop engineers pull up the UI to debug. Flux-shop engineers `kubectl describe`. Both work, but they shape habits." },
                { type: "h3", content: "Multi-tenancy" },
                { type: "p", content: "Flux's controller architecture (separate controllers for source, kustomize, helm, image automation, notifications) makes per-namespace tenancy clean. You can give a tenant their own `GitRepository` and `Kustomization`, scoped via RBAC, with no shared blast radius." },
                { type: "p", content: "ArgoCD's `AppProject` resource adds tenancy on top of the Application model. It works, but the boundaries are looser, and a misconfigured `AppProject` can let one team see another's apps. The 2.x/3.x line has tightened this; pre-2.10 multi-tenancy was thinner." },
                { type: "h3", content: "ApplicationSets vs Image Automation" },
                { type: "p", content: "ArgoCD's `ApplicationSet` is the killer feature for platforms with many similar apps. A single `ApplicationSet` resource can generate hundreds of `Application` resources from a Git directory list, a cluster list, or a custom generator." },
                { type: "code", lang: "yaml", content: "# One ApplicationSet → one Application per tenant cluster\napiVersion: argoproj.io/v1alpha1\nkind: ApplicationSet\nmetadata:\n  name: shared-monitoring\nspec:\n  generators:\n    - clusters: {}\n  template:\n    metadata:\n      name: 'monitoring-{{name}}'\n    spec:\n      project: platform\n      source:\n        repoURL: https://github.com/example/platform\n        path: monitoring/overlays/{{metadata.labels.tier}}\n        targetRevision: HEAD\n      destination:\n        server: '{{server}}'\n        namespace: monitoring" },
                { type: "p", content: "Flux's image-automation feature does something different and arguably more valuable for app teams: it watches container registries, automatically updates manifests when a new image is pushed, and commits the change back to Git. Argo Image Updater offers similar capability but is less integrated. If image-driven flow is core to your workflow, Flux has the edge." },
                { type: "h3", content: "Helm story" },
                { type: "p", content: "ArgoCD treats Helm as one of several manifest sources. It renders the chart and applies the resulting manifests. Most Helm features work, but ArgoCD doesn't actually run `helm install` — it inlines the chart output into its sync." },
                { type: "p", content: "Flux's `HelmRelease` controller really is Helm. It runs Helm operations, supports rollbacks via Helm history, and supports the full Helm test/hook lifecycle. If your charts depend on Helm-specific behavior (post-install hooks, Helm test, complex `--values` chains), Flux gives less friction." },
                { type: "h3", content: "Notifications" },
                { type: "p", content: "ArgoCD has a notifications controller with Slack/Discord/Teams/PagerDuty integrations and templated messages." },
                { type: "p", content: "Flux has a separate `Alert` and `Provider` resource model that's more verbose but more flexible. Configurable per-namespace, supports more sinks, and the CRDs are easier to inspect." },
                { type: "h2", content: "The honest decision tree" },
                { type: "p", content: "Pick ArgoCD if:" },
                { type: "list", items: [
                    "Your engineers (and execs) want a UI to look at sync states and diffs.",
                    "You have many similar apps across tenants — ApplicationSets save you weeks of manifest copy-paste.",
                    "You want to onboard non-platform engineers to GitOps quickly. ArgoCD's UI is the gentler ramp.",
                    "You'd rather have one polished tool than four sharp ones."
                ] },
                { type: "p", content: "Pick Flux if:" },
                { type: "list", items: [
                    "You like Kubernetes-native everything: every concern is a separate controller and a separate CRD.",
                    "Multi-tenant cluster sharing is core to your platform.",
                    "Your delivery is image-driven (push image → auto-update manifest → reconcile).",
                    "Your charts depend on Helm specifics that ArgoCD's manifest rendering misses.",
                    "You'd rather have four sharp tools than one polished one."
                ] },
                { type: "p", content: "Pick neither yet if you're under 5 services. The complexity-to-benefit ratio doesn't pay until you have multiple environments and at least a handful of services. A `make deploy` shell script and `kubectl apply -f` is genuinely fine for tiny scale." },
                { type: "h2", content: "Patterns both tools share that you should adopt regardless" },
                { type: "h3", content: "App-of-apps / kustomize-of-kustomizes" },
                { type: "p", content: "Don't register every Application individually. Have one root `Application` (or `Kustomization`) that points at a folder of more applications. Adding a new app becomes 'commit a new YAML file to a folder', not 'click in the UI'. Self-service follows automatically." },
                { type: "h3", content: "Image registry and Git separation" },
                { type: "p", content: "The deployment manifest in Git references an image tag. CI publishes the image and updates the tag in Git via PR. The deploy controller watches Git, not the registry. This separation is what makes rollbacks work — `git revert` is the deploy rollback." },
                { type: "h3", content: "Sealed secrets or external secrets" },
                { type: "p", content: "Don't put plaintext secrets in Git. Either use Bitnami Sealed Secrets (encrypted CRDs in Git, decrypted only by the cluster's controller) or External Secrets Operator (manifests in Git reference secrets stored externally — Vault, AWS Secrets Manager, GCP Secret Manager). The second pattern has won; it scales better and decouples secret storage from manifest storage." },
                { type: "h2", content: "Migration paths" },
                { type: "p", content: "From push CI to GitOps: pick one app, add an ArgoCD or Flux Application/Kustomization, point it at the same manifest you already have, and disable the CI deploy step. If sync goes green, you're done with that one. Repeat 50 times. There's no way to migrate everything at once; the gradient is the strategy." },
                { type: "p", content: "From ArgoCD to Flux (or back): rare in practice. The migration is genuinely costly because each tool's resources don't translate directly. The teams that do this usually had outgrown the original tool's mental model." },
                { type: "h2", content: "What's coming" },
                { type: "p", content: "OpenGitOps (the spec, CNCF) is converging the two ecosystems on shared definitions of what 'GitOps' means. Watch for tighter Kubernetes Resource Model alignment. Argo and Flux both support OCI artifacts as a Git alternative — useful for air-gapped environments. The 'GitOps without Git' future (Pulumi-style stack states, Crossplane-style CRDs as truth) is interesting but doesn't replace the pull-model architecture; it just changes what the source of truth looks like." },
                { type: "p", content: "Pick one tool. Onboard your platform manifests first, your apps second, your infrastructure (via Crossplane) third. Stop letting CI hold cluster credentials. The rest is detail." }
            ]
        },
        ru: {
            title: "GitOps в 2026: ArgoCD vs Flux и почему pull-модель победила",
            excerpt: "Дебаты push-vs-pull закончены. Argo-vs-Flux — ещё нет. Как они разошлись в 2025–2026 и кому какой реально подходит.",
            sections: [
                { type: "p", content: "Пять лет назад можно было выбрать систему доставки по тому, чем уже пользовалась команда: Jenkins если большие и старые, Spinnaker если в стиле Netflix, Drone если маленькие. Сегодня единственный достоверный ответ для деплоя Kubernetes — GitOps, и единственные достоверные дебаты — какой инструмент GitOps: ArgoCD или Flux. Оба — CNCF graduated. Оба зрелые. Не взаимозаменяемы." },
                { type: "h2", content: "Дебаты push-vs-pull (решены)" },
                { type: "p", content: "Push CI/CD: ваш CI-пайплайн держит kubeconfig, выполняет `kubectl apply` при успехе. Pull GitOps: внутрикластерный агент смотрит Git-репо и реконсилит состояние кластера. Pull-модель побеждает по трём конкретным причинам — не идеологическим:" },
                { type: "ordered", items: [
                    "Креды не покидают кластер. У агента read-доступ к Git; CI никогда не видит кредов кластера. Половина post-mortem'ов о компрометации CI перестаёт быть возможной.",
                    "Drift detection автоматический. Если кто-то правит ресурс в production руками — агент видит разницу и переприменяет Git-состояние. Никакого специального тулинга; поведение по умолчанию.",
                    "Развёрнутое состояние queryable из Git. Хотите знать, что в production? `git log` репо манифестов. Нет «last deploy» БД для запроса."
                ] },
                { type: "p", content: "Если команда в 2026 ещё на push-based деплое — миграция high-leverage. Даже маленькие команды выигрывают с момента, когда у них больше одного кластера." },
                { type: "h2", content: "Где ArgoCD и Flux реально расходятся" },
                { type: "h3", content: "Ментальная модель" },
                { type: "p", content: "ArgoCD app-центричен. Единица — ресурс `Application`, указывающий на путь в Git-репо. Дашборд — центральное понятие: дерево приложений, состояния синка, diff. Инженеры проводят время в UI." },
                { type: "p", content: "Flux reconciler-центричен. Единицы — `GitRepository` (источник) и `Kustomization` или `HelmRelease` (reconciler, читающий из источника). CLI и Kubernetes-ресурсы — интерфейс; native UI с Flux не идёт (Weave GitOps добавляет). Инженеры проводят время в `kubectl get` и `flux get`." },
                { type: "p", content: "Разница важнее, чем признают. ArgoCD-инженеры открывают UI для дебага. Flux-инженеры `kubectl describe`. Оба работают, но формируют привычки." },
                { type: "h3", content: "Мульти-tenancy" },
                { type: "p", content: "Контроллерная архитектура Flux (отдельные контроллеры под source, kustomize, helm, image automation, notifications) делает per-namespace tenancy чистым. Можно дать tenant'у свой `GitRepository` и `Kustomization`, ограничив через RBAC, без общего blast radius." },
                { type: "p", content: "Ресурс `AppProject` ArgoCD добавляет tenancy поверх модели Application. Работает, но границы слабее, и misconfigured `AppProject` может дать одной команде видеть приложения другой. Линия 2.x/3.x ужесточила это; до 2.10 multi-tenancy был тоньше." },
                { type: "h3", content: "ApplicationSets vs Image Automation" },
                { type: "p", content: "`ApplicationSet` ArgoCD — killer-фича для платформ с многими похожими приложениями. Один ресурс `ApplicationSet` может сгенерировать сотни `Application` из списка папок Git, списка кластеров или кастомного генератора." },
                { type: "code", lang: "yaml", content: "# Один ApplicationSet → одно Application на tenant-кластер\napiVersion: argoproj.io/v1alpha1\nkind: ApplicationSet\nmetadata:\n  name: shared-monitoring\nspec:\n  generators:\n    - clusters: {}\n  template:\n    metadata:\n      name: 'monitoring-{{name}}'\n    spec:\n      project: platform\n      source:\n        repoURL: https://github.com/example/platform\n        path: monitoring/overlays/{{metadata.labels.tier}}\n      destination:\n        server: '{{server}}'\n        namespace: monitoring" },
                { type: "p", content: "Image-automation Flux делает другое и, возможно, более ценное для команд приложений: смотрит container-registries, автоматически обновляет манифесты при push нового образа и коммитит изменение обратно в Git. Argo Image Updater предлагает похожее, но менее интегрировано. Если image-driven flow — ядро воркфлоу, у Flux преимущество." },
                { type: "h3", content: "История с Helm" },
                { type: "p", content: "ArgoCD относится к Helm как к одному из источников манифестов. Рендерит чарт и применяет манифесты. Большинство Helm-фич работают, но ArgoCD не запускает `helm install` — он инлайнит вывод чарта в свой sync." },
                { type: "p", content: "Контроллер `HelmRelease` Flux — это реально Helm. Запускает Helm-операции, поддерживает rollback через Helm history и полный test/hook lifecycle Helm. Если ваши чарты зависят от специфики Helm (post-install hooks, Helm test, сложные цепочки `--values`) — у Flux меньше трения." },
                { type: "h3", content: "Уведомления" },
                { type: "p", content: "У ArgoCD контроллер уведомлений с интеграциями Slack/Discord/Teams/PagerDuty и шаблонными сообщениями." },
                { type: "p", content: "У Flux отдельная модель ресурсов `Alert` и `Provider` — более многословно, но гибче. Настраивается per-namespace, поддерживает больше sink'ов, CRD проще инспектить." },
                { type: "h2", content: "Честное дерево решений" },
                { type: "p", content: "Берите ArgoCD если:" },
                { type: "list", items: [
                    "Инженерам (и руководству) нужен UI, чтобы смотреть состояния sync и diff.",
                    "Много похожих приложений по tenant'ам — ApplicationSets экономит недели copy-paste манифестов.",
                    "Хотите быстро онбордить не-платформенных инженеров на GitOps. UI ArgoCD — мягче рампа.",
                    "Скорее один отполированный инструмент, чем четыре острых."
                ] },
                { type: "p", content: "Берите Flux если:" },
                { type: "list", items: [
                    "Любите Kubernetes-native всё: каждая забота — отдельный контроллер и отдельный CRD.",
                    "Multi-tenant cluster sharing — ядро платформы.",
                    "Доставка image-driven (push image → авто-обновление манифеста → reconcile).",
                    "Ваши чарты зависят от specifics Helm, которые рендеринг манифестов ArgoCD упускает.",
                    "Скорее четыре острых инструмента, чем один отполированный."
                ] },
                { type: "p", content: "Не берите пока ни тот ни другой, если у вас меньше 5 сервисов. Соотношение сложность-польза не окупается, пока не появилось несколько окружений и хотя бы горстка сервисов. Скрипт `make deploy` и `kubectl apply -f` реально нормально для крошечного масштаба." },
                { type: "h2", content: "Паттерны, которые стоит принять независимо от выбора" },
                { type: "h3", content: "App-of-apps / kustomize-of-kustomizes" },
                { type: "p", content: "Не регистрируйте каждое Application индивидуально. Имейте один корневой `Application` (или `Kustomization`), указывающий на папку с другими. Добавление нового приложения становится «коммит нового YAML в папку», а не «клик в UI». Self-service следует автоматически." },
                { type: "h3", content: "Разделение image registry и Git" },
                { type: "p", content: "Deploy-манифест в Git ссылается на image tag. CI публикует образ и обновляет тег в Git через PR. Deploy-контроллер смотрит Git, не registry. Это разделение — то, что делает rollback'и работающими: `git revert` — это deploy rollback." },
                { type: "h3", content: "Sealed secrets или external secrets" },
                { type: "p", content: "Не кладите plaintext-секреты в Git. Либо Bitnami Sealed Secrets (зашифрованные CRD в Git, расшифровываемые только контроллером кластера), либо External Secrets Operator (манифесты в Git ссылаются на секреты, хранящиеся внешне — Vault, AWS Secrets Manager, GCP Secret Manager). Второй паттерн победил; масштабируется лучше и развязывает хранение секретов от хранения манифестов." },
                { type: "h2", content: "Пути миграции" },
                { type: "p", content: "От push CI к GitOps: возьмите одно приложение, добавьте ArgoCD или Flux Application/Kustomization, укажите на тот же манифест, что уже есть, и отключите CI-step деплоя. Если sync зелёный — с этим закончили. Повторите 50 раз. Способа мигрировать всё разом нет; градиент — стратегия." },
                { type: "p", content: "От ArgoCD к Flux (или обратно): редко на практике. Миграция реально дорогая, потому что ресурсы каждого инструмента не переводятся напрямую. Команды, которые это делают, обычно переросли ментальную модель исходного." },
                { type: "h2", content: "Что грядёт" },
                { type: "p", content: "OpenGitOps (спецификация, CNCF) сводит обе экосистемы на общих определениях «GitOps». Ждите более тесного выравнивания с Kubernetes Resource Model. Argo и Flux оба поддерживают OCI-артефакты как альтернативу Git — полезно для air-gapped окружений. «GitOps без Git» (стейты Pulumi-style, CRD-as-truth Crossplane-style) интересно, но не заменяет архитектуру pull-модели; меняет лишь, как выглядит source of truth." },
                { type: "p", content: "Выберите один инструмент. Заведите сначала platform-манифесты, потом приложения, потом инфраструктуру (через Crossplane). Перестаньте позволять CI держать креды кластера. Остальное — детали." }
            ]
        }
    },

    /* ─── 05. OpenTelemetry ─────────────────────────────────────── */
    {
        slug: "opentelemetry-observability-foundation-2026",
        date: "2026-08-11",
        readMinutes: 13,
        tags: ["Observability", "OpenTelemetry", "Platform Engineering", "DevOps"],
        en: {
            title: "OpenTelemetry as the Observability Foundation: Replacing the Prometheus-Only Era",
            excerpt: "OpenTelemetry quietly became the OS-of-observability between 2023 and 2026. If your platform still runs vendor-specific SDKs, you're paying twice and locked into one.",
            sections: [
                { type: "p", content: "The 2018-era observability stack was three tools, three SDKs, three dashboards: Prometheus for metrics, ELK for logs, Jaeger for traces. Each was good at its thing. None talked to the others. Engineers wrote three sets of instrumentation per service, paid three vendors, and joined data manually in Grafana." },
                { type: "p", content: "By 2026, OpenTelemetry has absorbed all three signal types, the SDK story is unified across 11 languages, and the wire protocol (OTLP) is supported by every credible observability vendor. The era of choosing your SDK based on your vendor is over. The era of choosing your vendor without changing your code has begun." },
                { type: "h2", content: "What OpenTelemetry actually is" },
                { type: "p", content: "OpenTelemetry (OTel) is three things bundled under one name:" },
                { type: "ordered", items: [
                    "A specification: how traces, metrics, and logs are structured. The spec is vendor-neutral, governed by CNCF.",
                    "Per-language SDKs: instrumentation libraries for Go, Java, Python, Node.js, Rust, .NET, Ruby, PHP, JavaScript, Swift, and Erlang. They emit the spec's format.",
                    "A protocol (OTLP) and a reference Collector: a binary daemon that receives OTLP, transforms it, and forwards to backends."
                ] },
                { type: "p", content: "Critically, OTel does not store data. There is no 'OpenTelemetry database'. Storage is your choice: Tempo, Jaeger, Zipkin, Honeycomb, Datadog, New Relic, Grafana Cloud, Elastic, Splunk, AWS X-Ray, GCP Cloud Trace. They all speak OTLP." },
                { type: "h2", content: "The collector is the point" },
                { type: "p", content: "If you read one part of OTel's architecture carefully, make it the Collector. It's a small, deployable binary (`otelcol-contrib`) that sits between your services and your backends." },
                { type: "code", lang: "yaml", content: "# otel-collector-config.yaml — minimal collector setup\nreceivers:\n  otlp:\n    protocols:\n      grpc: { endpoint: '0.0.0.0:4317' }\n      http: { endpoint: '0.0.0.0:4318' }\n\nprocessors:\n  batch:\n    timeout: 5s\n  memory_limiter:\n    check_interval: 1s\n    limit_mib: 512\n  resource:\n    attributes:\n      - key: cluster\n        value: prod-eu-west\n        action: insert\n\nexporters:\n  otlp/tempo:\n    endpoint: tempo:4317\n    tls: { insecure: true }\n  prometheusremotewrite:\n    endpoint: http://mimir:9009/api/v1/push\n  loki:\n    endpoint: http://loki:3100/loki/api/v1/push\n\nservice:\n  pipelines:\n    traces:\n      receivers: [otlp]\n      processors: [memory_limiter, resource, batch]\n      exporters: [otlp/tempo]\n    metrics:\n      receivers: [otlp]\n      processors: [memory_limiter, resource, batch]\n      exporters: [prometheusremotewrite]\n    logs:\n      receivers: [otlp]\n      processors: [memory_limiter, resource, batch]\n      exporters: [loki]" },
                { type: "p", content: "What this gives you: services emit OTLP to the collector. The collector adds resource attributes (cluster name, region, environment), batches, applies sampling, and forwards. To switch from Tempo to Honeycomb, you change one exporter line. Services don't redeploy. SDKs don't change." },
                { type: "h2", content: "Three signals, one model" },
                { type: "h3", content: "Traces" },
                { type: "p", content: "A trace is a tree of spans. Each span has a name, a start/end time, attributes, events, and a parent. OTel's trace model is the W3C Trace Context standard — what Jaeger and Zipkin both already used. Nothing new conceptually; the win is that emit-side, every language SDK produces the same wire format." },
                { type: "h3", content: "Metrics" },
                { type: "p", content: "OTel metrics support counters, gauges, histograms, and exponential histograms. The exponential histogram type is genuinely new and important: it gives you accurate p50/p95/p99 with bounded memory, replacing the bucket-tuning gymnastics Prometheus required. If you've ever written histogram buckets by hand, you understand why this matters." },
                { type: "h3", content: "Logs" },
                { type: "p", content: "OTel's log model arrived later than traces and metrics — the spec stabilized in 2023. Most teams still send logs via Filebeat or Fluentd to Loki/ELK, then optionally enrich with OTel resource attributes. The pure-OTel log story works but is the least mature of the three signals. Don't fight your existing log pipeline to switch unless you specifically need cross-signal correlation." },
                { type: "h2", content: "Auto-instrumentation: free wins" },
                { type: "p", content: "Most popular libraries — HTTP servers, gRPC, database drivers, queue clients — have OTel auto-instrumentation packages. Drop them in, and you get spans for every request, query, and message without writing a line of tracing code." },
                { type: "code", lang: "python", content: "# Python FastAPI auto-instrumented end-to-end\nfrom fastapi import FastAPI\nfrom opentelemetry import trace\nfrom opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter\nfrom opentelemetry.sdk.resources import Resource, SERVICE_NAME\nfrom opentelemetry.sdk.trace import TracerProvider\nfrom opentelemetry.sdk.trace.export import BatchSpanProcessor\nfrom opentelemetry.instrumentation.fastapi import FastAPIInstrumentor\nfrom opentelemetry.instrumentation.requests import RequestsInstrumentor\nfrom opentelemetry.instrumentation.psycopg2 import Psycopg2Instrumentor\n\nresource = Resource.create({SERVICE_NAME: 'orders-api'})\nprovider = TracerProvider(resource=resource)\nprovider.add_span_processor(\n    BatchSpanProcessor(OTLPSpanExporter(endpoint='otel-collector:4317', insecure=True))\n)\ntrace.set_tracer_provider(provider)\n\napp = FastAPI()\nFastAPIInstrumentor.instrument_app(app)\nRequestsInstrumentor().instrument()\nPsycopg2Instrumentor().instrument()\n\n# Every HTTP request, outbound HTTP call, and DB query is now a span.\n# No further code changes needed for baseline tracing." },
                { type: "p", content: "The auto-instrumentation is the gateway drug. Once it's in place, manual spans become additions, not the foundation. Most teams discover that 80% of their tracing value comes from auto-instrumentation alone." },
                { type: "h2", content: "Sampling, the operational reality" },
                { type: "p", content: "Tracing every request is expensive. Most teams sample. Two approaches:" },
                { type: "list", items: [
                    "Head-based sampling: at trace start, decide whether to sample. Simple, predictable, but you lose visibility into whatever isn't sampled.",
                    "Tail-based sampling: emit all spans to the collector, let the collector decide based on whole-trace properties (was there an error? was latency high? does it match a customer segment?). More expensive in collector capacity, but you keep the interesting traces and drop the boring ones."
                ] },
                { type: "p", content: "Tail-based sampling has won as the default for production systems above moderate volume. The OTel Collector's `tail_sampling` processor is the canonical implementation. Configure it to keep 100% of error traces, 100% of high-latency traces, and 1–5% of healthy traces. Storage costs drop ~90%; signal quality stays high." },
                { type: "h2", content: "Semantic conventions: the second-order win" },
                { type: "p", content: "OTel ships a spec called Semantic Conventions: standardized attribute names. `http.method`, `http.status_code`, `db.system`, `db.statement`, `messaging.system`, `service.name`, `cloud.region`. When every service emits these consistently, vendor-neutral dashboards become possible. The query 'show me HTTP error rate by service over the last hour' is the same regardless of vendor." },
                { type: "p", content: "If you're rolling out OTel, enforce semantic-convention compliance early. The 'we'll standardize later' instinct ends with 50 services using 50 attribute names for the same concept. Cleanup is painful." },
                { type: "h2", content: "Common migration mistakes" },
                { type: "ordered", items: [
                    "Running vendor SDK and OTel SDK side by side. The double-instrumentation tax is real. Pick one and migrate; don't run both.",
                    "Not deploying a Collector. SDKs talking directly to backend works for hello-world but not production. The Collector is your batching, retry, transformation, and sampling layer.",
                    "Auto-instrumenting everything without sampling. You'll generate 10x your previous span volume. Set up tail-based sampling before you turn on auto-instrumentation in production.",
                    "Treating OTel as a tracing-only project. Metrics and logs are the silent half of the win. The cross-signal correlation is what justifies the migration.",
                    "Choosing a vendor first, then OTel. The whole point is vendor-second."
                ] },
                { type: "h2", content: "What to do this quarter if you're starting" },
                { type: "ordered", items: [
                    "Deploy an OTel Collector in your cluster, exporting to whatever observability backend you already have (Datadog accepts OTLP, so does New Relic, Honeycomb, Grafana Cloud, Splunk).",
                    "Pick one service. Add auto-instrumentation. Send traces and metrics to the collector. Verify the data flows.",
                    "Roll out to one team's services. Update your runbooks to reference OTel attribute names.",
                    "Enable tail-based sampling once volume goes above ~100 traces/second.",
                    "Eighteen months later, swap your vendor without changing a single line of service code. That's when you'll feel why OTel won."
                ] },
                { type: "p", content: "OpenTelemetry isn't sexy. It's not a 'rip and replace' migration with a dramatic before/after slide. It's slow, deliberate plumbing work that makes everything downstream easier and breaks vendor lock-in cleanly. Five years from now, the platforms that bet on OTel early will have engineers who never had to learn vendor-specific instrumentation. That's the win." }
            ]
        },
        ru: {
            title: "OpenTelemetry как фундамент observability: конец эпохи Prometheus-only",
            excerpt: "OpenTelemetry тихо стал ОС observability в 2023–2026. Если ваша платформа всё ещё на vendor-specific SDK — платите дважды и заперты в одном вендоре.",
            sections: [
                { type: "p", content: "Observability-стек 2018-го — три инструмента, три SDK, три дашборда: Prometheus для метрик, ELK для логов, Jaeger для трейсов. Каждый хорош в своём. Никто ни с кем не разговаривает. Инженеры писали три набора инструментирования на сервис, платили трём вендорам и сводили данные руками в Grafana." },
                { type: "p", content: "К 2026 OpenTelemetry поглотил все три типа сигналов, история SDK единая для 11 языков, а wire-протокол (OTLP) поддерживается любым достоверным observability-вендором. Эпоха выбора SDK по вендору закончилась. Началась эпоха смены вендора без правки кода." },
                { type: "h2", content: "Что такое OpenTelemetry на самом деле" },
                { type: "p", content: "OpenTelemetry (OTel) — три вещи под одним именем:" },
                { type: "ordered", items: [
                    "Спецификация: как структурированы трейсы, метрики, логи. Спека vendor-neutral, под управлением CNCF.",
                    "Per-language SDK: библиотеки инструментирования для Go, Java, Python, Node.js, Rust, .NET, Ruby, PHP, JavaScript, Swift и Erlang. Эмитят формат спеки.",
                    "Протокол (OTLP) и референсный Collector: бинарный демон, принимает OTLP, трансформирует, форвардит в бэкенды."
                ] },
                { type: "p", content: "Критично: OTel не хранит данные. Нет «OpenTelemetry-БД». Хранилище — ваш выбор: Tempo, Jaeger, Zipkin, Honeycomb, Datadog, New Relic, Grafana Cloud, Elastic, Splunk, AWS X-Ray, GCP Cloud Trace. Все говорят OTLP." },
                { type: "h2", content: "Collector — это вся суть" },
                { type: "p", content: "Если читаете одну часть архитектуры OTel внимательно — пусть это будет Collector. Маленький деплоймент-бинарник (`otelcol-contrib`), сидящий между сервисами и бэкендами." },
                { type: "code", lang: "yaml", content: "# otel-collector-config.yaml — минимальный setup\nreceivers:\n  otlp:\n    protocols:\n      grpc: { endpoint: '0.0.0.0:4317' }\n      http: { endpoint: '0.0.0.0:4318' }\n\nprocessors:\n  batch: { timeout: 5s }\n  memory_limiter: { check_interval: 1s, limit_mib: 512 }\n  resource:\n    attributes:\n      - { key: cluster, value: prod-eu-west, action: insert }\n\nexporters:\n  otlp/tempo:\n    endpoint: tempo:4317\n    tls: { insecure: true }\n  prometheusremotewrite:\n    endpoint: http://mimir:9009/api/v1/push\n  loki:\n    endpoint: http://loki:3100/loki/api/v1/push\n\nservice:\n  pipelines:\n    traces:\n      receivers: [otlp]\n      processors: [memory_limiter, resource, batch]\n      exporters: [otlp/tempo]\n    metrics:\n      receivers: [otlp]\n      processors: [memory_limiter, resource, batch]\n      exporters: [prometheusremotewrite]\n    logs:\n      receivers: [otlp]\n      processors: [memory_limiter, resource, batch]\n      exporters: [loki]" },
                { type: "p", content: "Что это даёт: сервисы эмитят OTLP в коллектор. Коллектор добавляет resource-атрибуты (cluster, region, environment), батчит, применяет sampling и форвардит. Чтобы переехать с Tempo на Honeycomb — меняете одну строчку exporter'а. Сервисы не редеплоятся. SDK не меняются." },
                { type: "h2", content: "Три сигнала, одна модель" },
                { type: "h3", content: "Trace'ы" },
                { type: "p", content: "Трейс — дерево span'ов. У каждого span'а имя, время старта/конца, атрибуты, события и родитель. Trace-модель OTel — стандарт W3C Trace Context — то, что Jaeger и Zipkin уже использовали. Концептуально нового нет; победа в том, что на emit-стороне каждый языковой SDK производит один и тот же wire-формат." },
                { type: "h3", content: "Метрики" },
                { type: "p", content: "Метрики OTel поддерживают counter, gauge, histogram и exponential histogram. Тип exponential histogram реально новый и важный: даёт точные p50/p95/p99 с ограниченной памятью, заменяя гимнастику тюнинга bucket'ов Prometheus. Если когда-нибудь писали histogram-bucket'ы руками — поймёте, почему это важно." },
                { type: "h3", content: "Логи" },
                { type: "p", content: "Log-модель OTel пришла позже трейсов и метрик — спека стабилизировалась в 2023. Большинство команд всё ещё шлют логи через Filebeat или Fluentd в Loki/ELK, опционально обогащая OTel resource-атрибутами. Чисто-OTel log-история работает, но самая незрелая из трёх сигналов. Не ломайте существующий log-пайплайн, если конкретно не нужна cross-signal корреляция." },
                { type: "h2", content: "Auto-instrumentation: бесплатные победы" },
                { type: "p", content: "У большинства популярных библиотек — HTTP-серверы, gRPC, БД-драйверы, queue-клиенты — есть OTel auto-instrumentation пакеты. Подключите — получите span'ы на каждый запрос, query, сообщение без единой строчки tracing-кода." },
                { type: "code", lang: "python", content: "# Python FastAPI auto-инструментирован end-to-end\nfrom fastapi import FastAPI\nfrom opentelemetry import trace\nfrom opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter\nfrom opentelemetry.sdk.resources import Resource, SERVICE_NAME\nfrom opentelemetry.sdk.trace import TracerProvider\nfrom opentelemetry.sdk.trace.export import BatchSpanProcessor\nfrom opentelemetry.instrumentation.fastapi import FastAPIInstrumentor\nfrom opentelemetry.instrumentation.requests import RequestsInstrumentor\nfrom opentelemetry.instrumentation.psycopg2 import Psycopg2Instrumentor\n\nresource = Resource.create({SERVICE_NAME: 'orders-api'})\nprovider = TracerProvider(resource=resource)\nprovider.add_span_processor(\n    BatchSpanProcessor(OTLPSpanExporter(endpoint='otel-collector:4317', insecure=True))\n)\ntrace.set_tracer_provider(provider)\n\napp = FastAPI()\nFastAPIInstrumentor.instrument_app(app)\nRequestsInstrumentor().instrument()\nPsycopg2Instrumentor().instrument()\n\n# Каждый HTTP-запрос, outbound HTTP-вызов и DB-query — теперь span.\n# Дальше для baseline tracing менять код не надо." },
                { type: "p", content: "Auto-instrumentation — gateway-drug. Когда оно есть — ручные span'ы становятся дополнениями, не основой. Большинство команд обнаруживают, что 80% ценности tracing'а приходит из одного auto-instrumentation." },
                { type: "h2", content: "Sampling — операционная реальность" },
                { type: "p", content: "Трейсить каждый запрос дорого. Большинство команд сэмплируют. Два подхода:" },
                { type: "list", items: [
                    "Head-based sampling: на старте трейса решаем, сэмплировать или нет. Просто, предсказуемо, но теряем видимость того, что не выбрано.",
                    "Tail-based sampling: эмитим все span'ы в коллектор, коллектор решает по свойствам всего трейса (была ошибка? высокая latency? клиентский сегмент?). Дороже по capacity коллектора, но интересные трейсы остаются, скучные дропаются."
                ] },
                { type: "p", content: "Tail-based sampling победил как дефолт для production-систем выше умеренного volume. Процессор `tail_sampling` OTel Collector — каноническая реализация. Настройте на 100% error-трейсов, 100% high-latency-трейсов, 1–5% healthy. Стоимость хранения падает ~90%; качество сигнала остаётся." },
                { type: "h2", content: "Semantic conventions — победа второго порядка" },
                { type: "p", content: "OTel поставляет спеку Semantic Conventions: стандартизированные имена атрибутов. `http.method`, `http.status_code`, `db.system`, `db.statement`, `messaging.system`, `service.name`, `cloud.region`. Когда каждый сервис эмитит их consistently — становятся возможны vendor-neutral дашборды. Запрос «покажи HTTP error rate по сервисам за последний час» одинаков независимо от вендора." },
                { type: "p", content: "Если катите OTel — обеспечивайте compliance с semantic conventions рано. Инстинкт «стандартизируем потом» заканчивается 50 сервисами с 50 именами атрибутов для одного концепта. Cleanup болезненный." },
                { type: "h2", content: "Частые ошибки миграции" },
                { type: "ordered", items: [
                    "Запуск vendor SDK и OTel SDK параллельно. Double-instrumentation tax реален. Выбирайте один и мигрируйте; не запускайте оба.",
                    "Не разворачивать Collector. SDK напрямую к бэкенду работает для hello-world, не для production. Collector — слой батчинга, ретраев, трансформации и sampling.",
                    "Auto-инструментировать всё без sampling. Сгенерируете 10x прежнего объёма span'ов. Поставьте tail-based sampling до того, как включите auto-instrumentation в production.",
                    "Относиться к OTel как к проекту только трейсов. Метрики и логи — тихая половина победы. Cross-signal корреляция — то, что обосновывает миграцию.",
                    "Выбирать вендора первым, OTel вторым. Вся суть — вендор второй."
                ] },
                { type: "h2", content: "Что сделать в этом квартале, если стартуете" },
                { type: "ordered", items: [
                    "Развернуть OTel Collector в кластере, экспортируя в любой existing observability-бэкенд (Datadog принимает OTLP, как и New Relic, Honeycomb, Grafana Cloud, Splunk).",
                    "Выбрать один сервис. Добавить auto-instrumentation. Отправить трейсы и метрики в коллектор. Проверить, что данные текут.",
                    "Накатить на сервисы одной команды. Обновить runbook'и, чтобы ссылались на OTel attribute names.",
                    "Включить tail-based sampling, когда volume превысит ~100 trace/sec.",
                    "Через восемнадцать месяцев — поменять вендора без правки строки сервисного кода. Тогда поймёте, почему OTel победил."
                ] },
                { type: "p", content: "OpenTelemetry не сексуальный. Не миграция «rip and replace» с драматичным до/после. Это медленная, осознанная сантехническая работа, делающая всё downstream проще и чисто ломающая vendor lock-in. Через пять лет платформы, ставшие на OTel рано, будут с инженерами, которым никогда не пришлось учить vendor-specific инструментирование. Это и есть победа." }
            ]
        }
    },

    /* ─── 06. eBPF in production ────────────────────────────────── */
    {
        slug: "ebpf-in-production-2026",
        date: "2026-07-28",
        readMinutes: 12,
        tags: ["eBPF", "Cilium", "Kubernetes", "Observability", "Networking"],
        en: {
            title: "eBPF in Production: One Kernel API That Killed Three Sidecars",
            excerpt: "eBPF stopped being a research curiosity around 2023. By 2026 it's how serious platforms do networking, security, and observability — without sidecars.",
            sections: [
                { type: "p", content: "The first time most engineers heard about eBPF was a Brendan Gregg talk where flame graphs lit up like fireworks. The reaction was 'cool demo, probably not for me'. Then Cilium ate the Kubernetes networking market. Then Pixie shipped an observability platform that needed zero instrumentation. Then Tetragon and Falco rebuilt runtime security on the same primitive. By 2026, if your platform isn't using eBPF somewhere, you're probably running a service mesh or sidecar setup that eBPF would have made unnecessary." },
                { type: "h2", content: "What eBPF is, with as little kernel-speak as possible" },
                { type: "p", content: "eBPF is a tiny VM inside the Linux kernel. You write programs in a restricted C dialect, compile to eBPF bytecode, and load them at specific kernel attach points: syscall entry, packet receive, function entry/exit, scheduler events. The kernel verifies the program won't crash (the verifier is the genius part — it proves the program halts and is memory-safe before letting it run). Then the program runs in-kernel whenever the attach point fires." },
                { type: "p", content: "Crucially, eBPF can talk back to userspace via maps — shared data structures readable from both kernel and user processes. This is how you do everything from packet filtering to performance counters to security policy enforcement without ever leaving the kernel." },
                { type: "p", content: "Why this matters for platforms: anything that previously required a userspace agent intercepting traffic (sidecar proxy, network policy enforcer, observability tap) can now run in-kernel with measurably lower overhead. We're talking microseconds vs milliseconds, no context switches, no extra container per pod." },
                { type: "h2", content: "Cilium: networking without sidecars" },
                { type: "p", content: "Cilium is the most consequential eBPF project. It replaces kube-proxy and CNI plugins with eBPF programs that run in the kernel. The wins are concrete:" },
                { type: "list", items: [
                    "Service routing: kube-proxy's iptables-based load balancing scales O(n) with services and breaks down past ~5000. Cilium's eBPF socket-LB is O(1) and doesn't degrade.",
                    "Network policies: KubeNetworkPolicy enforcement at L3/L4 with eBPF programs attached at the socket layer. Faster than iptables, more expressive, optionally including L7 policies (HTTP method, gRPC service).",
                    "mTLS without a sidecar: Cilium Service Mesh (and the newer Cilium-managed Istio Ambient mode) does mTLS in eBPF + per-node Envoy, without a sidecar in every pod. The sidecar tax — 200MB extra memory per pod, scaling linearly with pod count — disappears.",
                    "Hubble: an observability layer showing every service-to-service call with HTTP method, status, latency, and policy decision. Built on the same eBPF programs that enforce policy. No instrumentation needed in services."
                ] },
                { type: "p", content: "If you're starting a Kubernetes platform in 2026, Cilium is the default CNI choice. The non-Cilium path requires explaining why you didn't pick it." },
                { type: "h2", content: "Observability without instrumentation: Pixie, Beyla, Coroot" },
                { type: "p", content: "OpenTelemetry instrumentation is great, but it requires services to emit traces. eBPF lets you observe traffic that no service has been instrumented for." },
                { type: "p", content: "Pixie (CNCF graduated) attaches eBPF programs to syscalls and network functions, captures HTTP/gRPC/database traffic at the kernel level, and parses common protocols. You get service maps, request rates, and latency distributions for services that have zero application-level tracing. The auto-protocol-detection is what makes this magical: it identifies HTTP, MySQL, Postgres, Redis, Kafka, MongoDB, AMQP traffic from the wire alone." },
                { type: "p", content: "Beyla (Grafana) is the more focused alternative: it auto-instruments services for HTTP and gRPC, generates RED metrics and traces, and emits OTel. No code changes. No SDK. Drop the agent on the node, get golden signals." },
                { type: "p", content: "Coroot does similar work for service maps and SLO tracking. The whole category exists because eBPF makes it cheap to observe traffic that wasn't designed to be observable." },
                { type: "h2", content: "Runtime security: Tetragon, Falco" },
                { type: "p", content: "Falco was the original eBPF security tool: it watches syscalls and alerts on suspicious patterns (a shell spawning inside a container, file reads outside an expected path). Tetragon, by Cilium's parent company Isovalent, extends this to enforcement — not just observation. Tetragon can kill processes that match a policy, in-kernel, before the syscall completes." },
                { type: "p", content: "The shift from 'detect after the fact' to 'prevent in the kernel' is significant. A container exploit that tries to run `curl attacker.com` can be killed by an eBPF program that observes the exec syscall, decides it's not whitelisted for that workload, and returns -EPERM. Userspace never sees it." },
                { type: "h2", content: "When eBPF is a trap" },
                { type: "h3", content: "Kernel version requirements" },
                { type: "p", content: "Modern eBPF features (CO-RE, BTF, kfuncs) need kernel ≥ 5.10 ideally, ≥ 5.4 minimum. RHEL 7 and ancient Ubuntu LTS variants don't have what's needed. Most managed Kubernetes (GKE, EKS, AKS) is fine; self-managed clusters running pre-2021 distros are not." },
                { type: "h3", content: "Debugging is harder than userspace" },
                { type: "p", content: "When an eBPF program misbehaves, you don't get stack traces in your APM. You get verifier rejections at load time, or strange kernel logs. The tooling has improved (libbpf, BumbleBee, Inspektor Gadget) but it's not as good as Go's debugger. If your platform team has zero kernel experience, plan for one engineer to develop expertise." },
                { type: "h3", content: "Vendor lock-in via eBPF" },
                { type: "p", content: "Some eBPF-powered tools have proprietary userspace components even though the in-kernel program is open. Read the licenses. The 'eBPF-based' label doesn't automatically mean open source." },
                { type: "h2", content: "What 'we use eBPF' means in practice for a 2026 platform" },
                { type: "ordered", items: [
                    "CNI: Cilium. Replaces kube-proxy + flannel/calico/weave. Service routing, network policies, NetworkPolicy CRDs, observability via Hubble.",
                    "mTLS: Cilium Service Mesh OR Istio Ambient (which itself uses eBPF underneath). No per-pod sidecar.",
                    "L7 observability: Hubble or Pixie. Unified service map for services that don't ship traces yet.",
                    "Runtime security: Falco or Tetragon. Kill or alert on syscall anomalies.",
                    "Profile-guided performance: occasional Parca / Polar Signals run on the fleet to find CPU hot spots without instrumenting code."
                ] },
                { type: "p", content: "If your platform has 4 of these, you're in the modern eBPF camp. If you have 1, you're probably running Cilium and don't realize how much eBPF is doing under the hood. Either is fine. The anti-pattern is running sidecar Envoys for L7 policy in 2026 — that's a Cilium-shaped hole in your stack." },
                { type: "h2", content: "Reading material" },
                { type: "p", content: "If you're going to use eBPF tools, read the Cilium docs on the eBPF datapath at least once. The book 'Learning eBPF' by Liz Rice is the gentlest introduction. The Brendan Gregg performance work — particularly bcc tools — is what convinced most senior engineers this category was real, even if your team will use Cilium and Pixie at the surface, not write programs from scratch." },
                { type: "p", content: "The platforms that figure out eBPF early in the 2025–2027 window will spend a third of what their sidecar-heavy peers spend on observability and networking infra by 2030. The performance and operational simplicity wins compound. The one-time learning cost is real but bounded — once one engineer on your team understands the model, the rest of the team uses Cilium and Pixie without ever writing a kernel program." }
            ]
        },
        ru: {
            title: "eBPF в production: один kernel API, убивший три sidecar'а",
            excerpt: "eBPF перестал быть исследовательской диковинкой около 2023. К 2026 это то, как серьёзные платформы делают сеть, безопасность и observability — без sidecar'ов.",
            sections: [
                { type: "p", content: "Большинство инженеров впервые слышали про eBPF на докладе Брендана Грегга, где flame graph'ы вспыхивали как фейерверк. Реакция была: «крутое демо, мне точно не надо». Потом Cilium съел рынок Kubernetes-сети. Потом Pixie выкатил observability-платформу, которой не нужно никакого инструментирования. Потом Tetragon и Falco перестроили runtime-security на том же примитиве. К 2026, если ваша платформа не использует eBPF где-то — вы скорее всего гоняете service mesh или sidecar-сетап, который eBPF сделал бы ненужным." },
                { type: "h2", content: "Что такое eBPF — с минимумом kernel-сленга" },
                { type: "p", content: "eBPF — крошечная VM внутри ядра Linux. Программы пишутся на ограниченном диалекте C, компилируются в eBPF-bytecode, грузятся в конкретные attach-points ядра: вход syscall'а, приём пакета, вход/выход функции, события планировщика. Ядро верифицирует, что программа не упадёт (verifier — гениальная часть: доказывает, что программа останавливается и memory-safe, до запуска). Дальше программа выполняется in-kernel при срабатывании attach-point." },
                { type: "p", content: "Критично: eBPF может говорить с userspace через maps — shared-структуры данных, читаемые и из ядра и из user-процессов. Так делается всё — от фильтрации пакетов до performance-счётчиков и enforcement security-политик — не покидая ядра." },
                { type: "p", content: "Почему важно для платформ: всё, что раньше требовало userspace-агента, перехватывающего трафик (sidecar-proxy, enforcer сетевых политик, observability-tap), теперь может идти in-kernel с измеримо меньшим overhead. Микросекунды vs миллисекунды, без context-switch'ей, без лишнего контейнера на pod." },
                { type: "h2", content: "Cilium: сеть без sidecar'ов" },
                { type: "p", content: "Cilium — самый последовательный eBPF-проект. Заменяет kube-proxy и CNI-плагины eBPF-программами в ядре. Победы конкретные:" },
                { type: "list", items: [
                    "Service routing: iptables-based балансировка kube-proxy масштабируется O(n) по сервисам и ломается после ~5000. eBPF socket-LB Cilium — O(1) и не деградирует.",
                    "Network policies: enforcement KubeNetworkPolicy на L3/L4 через eBPF-программы на socket-слое. Быстрее iptables, выразительнее, опционально с L7 (HTTP-method, gRPC-service).",
                    "mTLS без sidecar'а: Cilium Service Mesh (и более новый Cilium-managed Istio Ambient) делает mTLS в eBPF + per-node Envoy, без sidecar'а в каждом pod'е. Sidecar-tax — 200MB лишней памяти на pod, линейно по числу pod'ов — исчезает.",
                    "Hubble: observability-слой, показывающий каждый service-to-service вызов с HTTP-method, статусом, latency и решением политики. Построен на тех же eBPF-программах, что enforce политики. В сервисах инструментирование не нужно."
                ] },
                { type: "p", content: "Если вы стартуете Kubernetes-платформу в 2026 — Cilium дефолтный выбор CNI. Не-Cilium путь требует объяснения, почему не выбрали его." },
                { type: "h2", content: "Observability без инструментирования: Pixie, Beyla, Coroot" },
                { type: "p", content: "Инструментирование OpenTelemetry — отлично, но требует, чтобы сервисы эмитили трейсы. eBPF позволяет наблюдать трафик, который никаким сервисом не инструментирован." },
                { type: "p", content: "Pixie (CNCF graduated) цепляет eBPF-программы к syscall'ам и сетевым функциям, захватывает HTTP/gRPC/database-трафик на kernel-уровне, парсит частые протоколы. Получаете service-карты, request rate'ы и распределения latency для сервисов с нулевым application-level tracing'ом. Auto-detection протоколов — то, что делает это магическим: определяет HTTP, MySQL, Postgres, Redis, Kafka, MongoDB, AMQP трафик из одного провода." },
                { type: "p", content: "Beyla (Grafana) — более узкая альтернатива: авто-инструментирует сервисы под HTTP и gRPC, генерирует RED-метрики и трейсы, эмитит OTel. Без правки кода. Без SDK. Поставьте agent на node — получите golden signals." },
                { type: "p", content: "Coroot делает похожее для service-map и SLO-tracking. Категория существует потому, что eBPF делает дешёвым наблюдение трафика, не задизайненного под наблюдение." },
                { type: "h2", content: "Runtime-безопасность: Tetragon, Falco" },
                { type: "p", content: "Falco — изначальный eBPF-security инструмент: смотрит syscall'ы и алертит на подозрительные паттерны (shell внутри контейнера, чтение файлов вне ожидаемого пути). Tetragon от родительской компании Cilium — Isovalent — расширяет до enforcement: не только наблюдение. Tetragon может убить процесс, матчащий политику, in-kernel, до завершения syscall'а." },
                { type: "p", content: "Сдвиг от «обнаруживать постфактум» к «предотвращать в ядре» значителен. Эксплойт контейнера, пытающийся запустить `curl attacker.com`, может быть убит eBPF-программой, наблюдающей exec-syscall, решающей, что не whitelisted для этого workload'а, и возвращающей -EPERM. Userspace его никогда не видит." },
                { type: "h2", content: "Когда eBPF — ловушка" },
                { type: "h3", content: "Требования к версии ядра" },
                { type: "p", content: "Современные eBPF-фичи (CO-RE, BTF, kfuncs) нужны ядро ≥ 5.10 в идеале, ≥ 5.4 минимум. У RHEL 7 и древних Ubuntu LTS нет нужного. Большинство managed Kubernetes (GKE, EKS, AKS) ок; self-managed кластера на pre-2021 дистрах — нет." },
                { type: "h3", content: "Дебаг сложнее, чем userspace" },
                { type: "p", content: "Когда eBPF-программа неправильно ведёт себя — вы не получите stack trace в APM. Получите verifier rejection при загрузке или странные логи ядра. Тулинг улучшился (libbpf, BumbleBee, Inspektor Gadget), но не настолько хорош, как debugger Go. Если у платформ-команды ноль kernel-опыта — планируйте, что один инженер будет развивать экспертизу." },
                { type: "h3", content: "Vendor lock-in через eBPF" },
                { type: "p", content: "У некоторых eBPF-tools проприетарные userspace-компоненты, хотя in-kernel программа открыта. Читайте лицензии. Ярлык «на eBPF» автоматически не значит open source." },
                { type: "h2", content: "Что значит «мы используем eBPF» на практике для платформы 2026" },
                { type: "ordered", items: [
                    "CNI: Cilium. Заменяет kube-proxy + flannel/calico/weave. Service routing, network policies, NetworkPolicy CRD, observability через Hubble.",
                    "mTLS: Cilium Service Mesh ИЛИ Istio Ambient (использует eBPF под капотом). Без per-pod sidecar'а.",
                    "L7 observability: Hubble или Pixie. Единая service-карта для сервисов, ещё не отдающих трейсы.",
                    "Runtime-security: Falco или Tetragon. Убить или алертить на syscall-аномалии.",
                    "Profile-guided performance: периодический прогон Parca / Polar Signals по флоту, чтобы найти CPU hot spots без инструментирования кода."
                ] },
                { type: "p", content: "Если у вас 4 из этих — вы в современном eBPF-лагере. Если 1 — скорее всего гоняете Cilium и не понимаете, как много eBPF делает под капотом. Любое нормально. Анти-паттерн — гонять sidecar Envoy для L7-политик в 2026; это Cilium-shaped дыра в стеке." },
                { type: "h2", content: "Что почитать" },
                { type: "p", content: "Если будете использовать eBPF-инструменты — прочитайте доку Cilium про eBPF-datapath хоть раз. Книга «Learning eBPF» Лиз Райс — самое мягкое введение. Performance-работа Брендана Грегга — особенно bcc tools — то, что убедило большинство senior-инженеров, что категория реальна, даже если ваша команда будет использовать Cilium и Pixie на поверхности, не писать программы с нуля." },
                { type: "p", content: "Платформы, разобравшиеся с eBPF рано в окне 2025–2027, будут тратить треть того, что их sidecar-heavy сверстники, на observability и сетевую инфру к 2030. Победы по производительности и операционной простоте складываются. Одноразовая стоимость обучения реальна, но ограничена — когда один инженер в команде понимает модель, остальные используют Cilium и Pixie, не написав ни одной kernel-программы." }
            ]
        }
    },

    /* ─── 07. Crossplane ─────────────────────────────────────────── */
    {
        slug: "crossplane-infrastructure-as-data",
        date: "2026-07-14",
        readMinutes: 11,
        tags: ["Crossplane", "Infrastructure as Code", "Kubernetes", "Platform Engineering"],
        en: {
            title: "Crossplane and the Rise of Infrastructure-as-Data",
            excerpt: "Terraform spawned the IaC era. Crossplane is what comes next: cloud resources as Kubernetes objects, reconciled by the same loop that runs your apps.",
            sections: [
                { type: "p", content: "Terraform shaped how the industry thinks about infrastructure for a decade. Declarative HCL, a state file as the source of truth, plans previewed before applies. It worked because it forced teams to stop SSH-ing into servers and start versioning their cloud. The trade-off was a separate control plane: Terraform state lived outside the systems it managed, plans ran in CI, drift was detected by `terraform plan`. Three things that always felt slightly off." },
                { type: "p", content: "Crossplane's pitch is simple: make infrastructure a Kubernetes object. The same control loop that reconciles your Pod count to your Deployment's `replicas: 3` reconciles your AWS database to your `RDSInstance` CRD. Drift detection is automatic. The state lives in etcd. GitOps tooling works on infrastructure for free." },
                { type: "h2", content: "What Crossplane actually is" },
                { type: "p", content: "Three layers:" },
                { type: "ordered", items: [
                    "Providers — like Terraform providers, but installed as Kubernetes operators. `crossplane-contrib/provider-aws` registers ~700 CRDs covering EC2, RDS, IAM, S3, etc. Each CRD is a Kubernetes type whose controller talks to the AWS API.",
                    "Composite Resource Definitions (XRDs) and Compositions — a way to bundle several primitive resources into one higher-level resource that platform consumers ask for. The user creates a `PostgresInstance`; Crossplane creates an RDS instance, subnet group, security group, parameter group, and IAM role.",
                    "Claims — namespace-scoped requests for a Composite Resource. The app team writes a small YAML in their namespace; the platform team's Composition does the work."
                ] },
                { type: "p", content: "If you've ever wished Terraform modules were a real thing rather than a copy-paste pattern, Compositions are that. They're versioned, validated against a schema, and reconciled by a controller you can monitor with the same tools you use for app workloads." },
                { type: "h2", content: "Crossplane vs Terraform: where each wins" },
                { type: "h3", content: "Terraform wins" },
                { type: "list", items: [
                    "Maturity. Tens of thousands of modules. Every cloud provider has first-class support. The 'I'll grab a Terraform module from GitHub' workflow has no Crossplane equivalent.",
                    "Plan/apply previews. `terraform plan` showing exactly what will change, with required confirmations, is genuinely useful for risk-averse changes. Crossplane reconciles continuously; the equivalent is `kubectl diff`, which is less polished.",
                    "Stateless workflows. CI runners with read-only credentials, no daemons, no clusters. For one-shot infrastructure provisioning, Terraform's batch model is simpler.",
                    "OpenTofu / Pulumi alternatives. The IaC ecosystem outside Crossplane is rich; the inside-Crossplane ecosystem is smaller."
                ] },
                { type: "h3", content: "Crossplane wins" },
                { type: "list", items: [
                    "Drift correction is automatic. Someone manually edits a security group? The Crossplane controller notices and reverts within seconds. Terraform requires you to run `plan` to even see the drift.",
                    "Same control loop as your apps. The team operating ArgoCD already has the mental model for Crossplane. No 'Terraform team' separate from the platform team.",
                    "Compositions are real abstractions. Once you've written a Composition for 'a database that gets backups, monitoring, and a dev replica', requesting one is one CRD. Terraform modules can do similar work but require more discipline to keep clean.",
                    "Claim-based self-service. App teams write a 5-line YAML in their namespace. The Composition explodes it into 20 cloud resources. The platform team controls the Composition; app teams don't need cloud credentials."
                ] },
                { type: "h2", content: "What a Composition looks like in practice" },
                { type: "code", lang: "yaml", content: "# Platform-team-authored Composition\napiVersion: apiextensions.crossplane.io/v1\nkind: Composition\nmetadata:\n  name: postgres-medium-eu-west-1\n  labels:\n    provider: aws\n    size: medium\nspec:\n  compositeTypeRef:\n    apiVersion: platform.example.org/v1alpha1\n    kind: XPostgresInstance\n  resources:\n    - name: rds-instance\n      base:\n        apiVersion: rds.aws.upbound.io/v1beta1\n        kind: Instance\n        spec:\n          forProvider:\n            engine: postgres\n            engineVersion: '16'\n            instanceClass: db.m6g.large\n            allocatedStorage: 100\n            backupRetentionPeriod: 30\n            multiAz: true\n            storageEncrypted: true\n            region: eu-west-1\n      patches:\n        - fromFieldPath: spec.parameters.name\n          toFieldPath: spec.forProvider.dbName\n        - fromFieldPath: metadata.uid\n          toFieldPath: spec.forProvider.tags.crossplane-uid\n    - name: subnet-group\n      base: { apiVersion: rds.aws.upbound.io/v1beta1, kind: SubnetGroup, ... }\n    - name: security-group\n      base: { apiVersion: ec2.aws.upbound.io/v1beta1, kind: SecurityGroup, ... }\n    - name: parameter-group\n      base: { apiVersion: rds.aws.upbound.io/v1beta1, kind: ParameterGroup, ... }\n---\n# App-team-authored claim, written in their namespace\napiVersion: platform.example.org/v1alpha1\nkind: PostgresInstance\nmetadata:\n  name: orders-db\n  namespace: team-orders\nspec:\n  parameters:\n    name: orders\n  compositionSelector:\n    matchLabels:\n      provider: aws\n      size: medium" },
                { type: "p", content: "The app team's claim is 12 lines. The Composition does 100 lines of cloud-resource work. The platform team owns the Composition and can update defaults, change instance classes, or add features (snapshot exports, pgvector extension) without the app teams editing anything." },
                { type: "h2", content: "Compositions Functions: the v2 evolution" },
                { type: "p", content: "Crossplane's original Compositions were YAML-only with a patch syntax. As Compositions got complex, the YAML got unwieldy. Compositions Functions (introduced in Crossplane 1.14, made the default in 2.x) lets you write Composition logic as a real program — Go, Python, or KCL — that takes the user's claim as input and emits cloud resources." },
                { type: "p", content: "The result: complex Compositions become readable code instead of 600-line patch chains. If you're starting with Crossplane in 2026, use Functions from day 1. The pure-YAML Composition syntax is being de-emphasized." },
                { type: "h2", content: "When Crossplane is the wrong choice" },
                { type: "h3", content: "You don't have Kubernetes" },
                { type: "p", content: "Crossplane runs in a Kubernetes cluster. If you're an all-Lambda or all-Cloud-Run shop with no K8s, installing K8s just to run Crossplane is the tail wagging the dog. Use Terraform/OpenTofu/Pulumi." },
                { type: "h3", content: "Provider coverage gaps" },
                { type: "p", content: "Crossplane's providers cover the big three clouds well, but specialized SaaS APIs lag behind Terraform. If you're heavily using PagerDuty, Snowflake, Datadog, GitHub, and similar via Terraform — Crossplane's providers exist but may be less polished. Mix-and-match (Terraform for SaaS, Crossplane for cloud) works." },
                { type: "h3", content: "Strict change-window cultures" },
                { type: "p", content: "Crossplane reconciles continuously. If your org culture requires every infrastructure change to go through a CAB with a frozen plan output, the always-on reconciler can feel like a loss of control. You can pause it, but you're fighting the tool's design." },
                { type: "h2", content: "The migration path" },
                { type: "p", content: "Don't migrate everything. The credible pattern: keep existing Terraform-managed infrastructure where it is, and make Crossplane the path for new platform-as-a-product abstractions." },
                { type: "ordered", items: [
                    "Pick one self-service offering — say, 'create a Postgres database with monitoring and backups'. Build a Composition for it.",
                    "Migrate one app team to claiming via Crossplane. Their Terraform stack stays for everything else.",
                    "After a quarter, count the time saved on database provisioning tickets. The platform-team-time savings are usually visible within weeks.",
                    "Decide on a per-category basis whether to keep Terraform or migrate. Rarely is the answer 'all in on Crossplane' or 'reject Crossplane entirely'."
                ] },
                { type: "h2", content: "What to read" },
                { type: "p", content: "The Crossplane docs are unusually good — start there. The book 'Crossplane in Action' (Manning, 2024) is the deep dive. The Upbound Composition Functions cookbook is the practical reference for v2 patterns. If you're choosing between Terraform and Crossplane for a new platform, the most honest framing: Terraform is the boring incumbent that always works; Crossplane is the bet on Kubernetes-as-control-plane. The bet has been paying off for early adopters." }
            ]
        },
        ru: {
            title: "Crossplane и подъём infrastructure-as-data",
            excerpt: "Terraform породил эру IaC. Crossplane — следующая глава: облачные ресурсы как Kubernetes-объекты, reconcil'ятся тем же циклом, что и приложения.",
            sections: [
                { type: "p", content: "Terraform формировал индустриальное мышление об инфраструктуре десятилетие. Декларативный HCL, state-файл как source of truth, plan'ы перед apply. Сработало — потому что заставило команды перестать ssh'иться на серверы и начать версионировать облако. Цена — отдельная control plane: Terraform-state жил вне систем, которыми управлял, plan'ы шли в CI, drift детектился через `terraform plan`. Три вещи, которые всегда чуть «ныли»." },
                { type: "p", content: "Питч Crossplane прост: сделать инфраструктуру Kubernetes-объектом. Тот же control loop, который реконсилит число Pod'ов до `replicas: 3` Deployment'а, реконсилит вашу AWS-базу до CRD `RDSInstance`. Drift detection автоматический. State в etcd. GitOps-инструменты работают по инфраструктуре бесплатно." },
                { type: "h2", content: "Что такое Crossplane" },
                { type: "p", content: "Три слоя:" },
                { type: "ordered", items: [
                    "Provider'ы — как у Terraform, но ставятся как Kubernetes-операторы. `crossplane-contrib/provider-aws` регистрирует ~700 CRD по EC2, RDS, IAM, S3 и т.д. Каждый CRD — Kubernetes-тип, чей контроллер говорит с AWS API.",
                    "Composite Resource Definitions (XRD) и Compositions — способ собрать несколько примитивных ресурсов в один высокоуровневый, который запрашивает потребитель платформы. Пользователь создаёт `PostgresInstance`; Crossplane создаёт RDS, subnet group, security group, parameter group и IAM-роль.",
                    "Claims — namespace-scoped запросы Composite Resource. Команда приложения пишет небольшой YAML в своём namespace; Composition платформ-команды делает работу."
                ] },
                { type: "p", content: "Если когда-нибудь хотели, чтобы Terraform-модули были реальной вещью, а не copy-paste паттерном — Compositions это. Версионируются, валидируются по схеме и реконсилятся контроллером, который можно мониторить теми же тулами, что и app-workloads." },
                { type: "h2", content: "Crossplane vs Terraform: где каждый побеждает" },
                { type: "h3", content: "Terraform побеждает" },
                { type: "list", items: [
                    "Зрелость. Десятки тысяч модулей. У каждого облака first-class support. Воркфлоу «возьму Terraform-модуль с GitHub» в Crossplane эквивалента не имеет.",
                    "Plan/apply preview. `terraform plan`, показывающий, что именно изменится, с обязательным confirm — реально полезен для risk-averse-изменений. Crossplane реконсилит непрерывно; эквивалент `kubectl diff` менее отполирован.",
                    "Stateless воркфлоу. CI-раннеры с read-only кредами, без демонов, без кластеров. Для one-shot-провижининга batch-модель Terraform проще.",
                    "OpenTofu / Pulumi. Экосистема IaC вне Crossplane богата; внутри-Crossplane экосистема меньше."
                ] },
                { type: "h3", content: "Crossplane побеждает" },
                { type: "list", items: [
                    "Drift correction автоматический. Кто-то вручную правит security group? Crossplane-контроллер замечает и откатывает за секунды. Terraform требует запускать `plan` хотя бы чтобы увидеть drift.",
                    "Тот же control loop, что и приложения. Команда, эксплуатирующая ArgoCD, уже владеет ментальной моделью Crossplane. Нет «Terraform-команды» отдельно от платформ-команды.",
                    "Compositions — реальные абстракции. Когда написана Composition «база с бэкапами, мониторингом и dev-репликой» — запрос — это один CRD. Terraform-модули могут похожее, но требуют больше дисциплины, чтобы оставаться чистыми.",
                    "Claim-based self-service. Команды приложений пишут 5 строк YAML в своём namespace. Composition разворачивает в 20 облачных ресурсов. Платформ-команда контролирует Composition; командам приложений не нужны облачные креды."
                ] },
                { type: "h2", content: "Как Composition выглядит на практике" },
                { type: "code", lang: "yaml", content: "# Composition, написанный платформ-командой\napiVersion: apiextensions.crossplane.io/v1\nkind: Composition\nmetadata:\n  name: postgres-medium-eu-west-1\n  labels:\n    provider: aws\n    size: medium\nspec:\n  compositeTypeRef:\n    apiVersion: platform.example.org/v1alpha1\n    kind: XPostgresInstance\n  resources:\n    - name: rds-instance\n      base:\n        apiVersion: rds.aws.upbound.io/v1beta1\n        kind: Instance\n        spec:\n          forProvider:\n            engine: postgres\n            engineVersion: '16'\n            instanceClass: db.m6g.large\n            allocatedStorage: 100\n            backupRetentionPeriod: 30\n            multiAz: true\n            storageEncrypted: true\n            region: eu-west-1\n      patches:\n        - fromFieldPath: spec.parameters.name\n          toFieldPath: spec.forProvider.dbName\n    - name: subnet-group\n      base: { apiVersion: rds.aws.upbound.io/v1beta1, kind: SubnetGroup, ... }\n    - name: security-group\n      base: { apiVersion: ec2.aws.upbound.io/v1beta1, kind: SecurityGroup, ... }\n---\n# Claim, написанный командой приложения в их namespace\napiVersion: platform.example.org/v1alpha1\nkind: PostgresInstance\nmetadata:\n  name: orders-db\n  namespace: team-orders\nspec:\n  parameters:\n    name: orders\n  compositionSelector:\n    matchLabels:\n      provider: aws\n      size: medium" },
                { type: "p", content: "Claim команды приложения — 12 строк. Composition делает 100 строк работы по cloud-ресурсам. Платформ-команда владеет Composition и может обновлять дефолты, менять instance class или добавлять фичи (snapshot exports, расширение pgvector) без правки команд приложений." },
                { type: "h2", content: "Compositions Functions: эволюция v2" },
                { type: "p", content: "Изначальные Compositions Crossplane были YAML-only с patch-синтаксисом. По мере усложнения YAML стал неподъёмным. Compositions Functions (введены в Crossplane 1.14, дефолтны в 2.x) позволяют писать логику Composition как реальную программу — Go, Python или KCL — которая принимает claim пользователя и эмитит облачные ресурсы." },
                { type: "p", content: "Результат: сложные Compositions становятся читаемым кодом вместо 600-строчных patch-цепочек. Если стартуете с Crossplane в 2026 — используйте Functions с первого дня. Чисто-YAML синтаксис Composition de-emphasized." },
                { type: "h2", content: "Когда Crossplane — неправильный выбор" },
                { type: "h3", content: "У вас нет Kubernetes" },
                { type: "p", content: "Crossplane живёт в Kubernetes-кластере. Если вы all-Lambda или all-Cloud-Run без K8s, ставить K8s только ради Crossplane — хвост виляет собакой. Берите Terraform/OpenTofu/Pulumi." },
                { type: "h3", content: "Пробелы в покрытии provider'ов" },
                { type: "p", content: "Provider'ы Crossplane хорошо покрывают большую тройку облаков, но специализированные SaaS-API отстают от Terraform. Если активно используете PagerDuty, Snowflake, Datadog, GitHub через Terraform — provider'ы Crossplane есть, но менее отполированы. Mix-and-match (Terraform для SaaS, Crossplane для облака) работает." },
                { type: "h3", content: "Жёсткие культуры change window" },
                { type: "p", content: "Crossplane реконсилит непрерывно. Если культура требует, чтобы каждое инфра-изменение шло через CAB с замороженным plan-выводом — always-on reconciler может ощущаться как потеря контроля. Можно ставить на паузу, но воюете с дизайном инструмента." },
                { type: "h2", content: "Путь миграции" },
                { type: "p", content: "Не мигрируйте всё. Достоверный паттерн: оставить существующую Terraform-managed инфру где есть, и сделать Crossplane путём для новых platform-as-a-product абстракций." },
                { type: "ordered", items: [
                    "Выберите один self-service offering — скажем, «база Postgres с мониторингом и бэкапами». Постройте Composition.",
                    "Мигрируйте одну команду приложения на claim через Crossplane. Их Terraform-стек остаётся для остального.",
                    "После квартала посчитайте сэкономленное время на тикетах провижининга баз. Экономия времени платформ-команды обычно видна за недели.",
                    "Решайте per-category — оставлять Terraform или мигрировать. Редко ответ «всё в Crossplane» или «отвергаем целиком»."
                ] },
                { type: "h2", content: "Что почитать" },
                { type: "p", content: "Доки Crossplane необычно хорошие — стартуйте с них. Книга «Crossplane in Action» (Manning, 2024) — глубокий dive. Cookbook Upbound по Composition Functions — практический референс для v2-паттернов. Если выбираете между Terraform и Crossplane для новой платформы — самая честная рамка: Terraform — скучный действующий чемпион, всегда работает; Crossplane — ставка на Kubernetes-как-control-plane. Ставка для ранних принимающих окупается." }
            ]
        }
    },

    /* ─── 08. FinOps ─────────────────────────────────────────────── */
    {
        slug: "finops-platform-teams-2026",
        date: "2026-06-30",
        readMinutes: 11,
        tags: ["FinOps", "Platform Engineering", "Kubernetes", "Cost Optimization"],
        en: {
            title: "FinOps for Platform Teams: Cost Engineering as Day-2 Work",
            excerpt: "Cloud bills get 20% bigger every year while CTOs ask why. FinOps used to be a finance-team concern; in 2026 it's platform-team territory.",
            sections: [
                { type: "p", content: "There's a familiar pattern in growing engineering orgs. Year one, the cloud bill is a rounding error. Year two, somebody notices it doubled. Year three, finance asks engineering for an annual cost review and engineering responds with a shrug because nobody knows which service costs what. Year four, a contractor is hired, costs drop 30% in a quarter, and the savings prove the bill was 30% waste the whole time. The contractor leaves; costs creep back; the cycle restarts." },
                { type: "p", content: "FinOps — Financial Operations — is the discipline that breaks this cycle. The FinOps Foundation publishes the framework; Kubecost and OpenCost ship the tooling. By 2026, every credible platform team has at least basic cost attribution running. The teams that don't are the same teams hiring contractors every 18 months." },
                { type: "h2", content: "Why FinOps moved to the platform team" },
                { type: "p", content: "Finance teams can read invoices but can't trace them to engineering decisions. Engineering teams can change the architecture but don't see the bill. The platform team sits between — they own the deployment surface where cost decisions are made (instance types, replicas, autoscaler configs, retention policies) and have the data to attribute spend. This makes them the right owner of the cost discipline." },
                { type: "p", content: "Practically: in 2026, when a CTO walks in and says 'why is the cloud bill up 22%?', the answer should come from the platform team in the form of a tagged dashboard, not from finance in the form of an Excel pivot." },
                { type: "h2", content: "The minimum viable FinOps stack" },
                { type: "ordered", items: [
                    "Cloud-native cost data. AWS Cost and Usage Reports (CUR), GCP Billing Export to BigQuery, Azure Cost Management Exports. All three publish line-item data; ingest one of them.",
                    "FOCUS standard format. The Finops Open Cost and Usage Specification (FOCUS) — released 1.0 in 2024 — is a vendor-neutral schema. Most cost tools now export FOCUS; the standard makes multi-cloud aggregation tractable.",
                    "Kubernetes-aware attribution. Kubecost or OpenCost (the open-source upstream). They watch K8s metrics, infer per-pod / per-namespace cost from node prices and resource usage, and produce real attribution.",
                    "A tagging policy. Every workload tagged with `team`, `service`, `environment`, `cost-center`. Without this, attribution is guesswork.",
                    "A monthly cadence. A 30-minute meeting where the platform team and finance look at top movers. Without the meeting, dashboards go unread."
                ] },
                { type: "h2", content: "Where Kubernetes hides cost" },
                { type: "h3", content: "Idle resource requests" },
                { type: "p", content: "A pod requests 1 CPU and 1Gi RAM. The actual usage is 0.05 CPU and 200Mi RAM. The cluster autoscaler reserves the requested capacity; you pay for it; nothing uses it. This is the single largest source of K8s waste in 2026 — Datadog's annual State of Containers reports it consistently in the 60-80% range across surveyed orgs." },
                { type: "p", content: "Vertical Pod Autoscaler in 'recommendation' mode produces actionable resource-request suggestions without applying them automatically. Goldilocks (Fairwinds) wraps VPA with a per-namespace dashboard. Either way, the workflow is: VPA observes, engineer reviews, deployment manifest gets updated." },
                { type: "h3", content: "Persistent volumes that aren't being read" },
                { type: "p", content: "An old service got deprecated; the deployment was deleted; the PersistentVolume wasn't. EBS / PD volumes accumulate and get billed silently. Run `kubectl get pv` and look for unbound volumes. Most tools surface this." },
                { type: "h3", content: "Cross-AZ traffic" },
                { type: "p", content: "Pod in zone-a talks to pod in zone-b. AWS bills $0.01 per GB transferred. At scale this is invisible until it isn't. Topology-aware routing (`topologyKeys`, Service `internalTrafficPolicy`) and zone-aligned deployments cut this dramatically." },
                { type: "h3", content: "Egress and NAT gateways" },
                { type: "p", content: "Outbound traffic to the internet, to other accounts, to peered VPCs — all has different pricing. Egress is often the surprising line on the bill. VPC endpoints for S3, ECR, and similar AWS services eliminate NAT-gateway data charges for those flows. Check your CUR for top egress flows; the savings can be enormous." },
                { type: "h3", content: "Spot instances avoided" },
                { type: "p", content: "Stateless workloads tolerant of interruption can run on spot at 60-90% discount. Most teams use 0% spot. The first step is identifying interruption-tolerant workloads (queue consumers, batch jobs, async API workers) and putting them on a node pool with spot instances. Cluster Autoscaler with mixed pools (spot + on-demand fallback) is mature." },
                { type: "h2", content: "The savings ladder" },
                { type: "p", content: "A common framework — pick savings in this order, easiest first:" },
                { type: "ordered", items: [
                    "Right-sizing existing workloads (VPA recommendations applied to deployments). Typical savings: 20-40% on those workloads.",
                    "Cluster autoscaling tuned (sane min/max, bin-packing aware). Typical savings: 10-20%.",
                    "Storage cleanup (orphan volumes, oversized volumes, infrequent-access tier for cold data). Typical savings: 5-15% of storage line.",
                    "Spot instances for tolerant workloads. Typical savings: 60-80% on those workloads, 10-25% of total compute.",
                    "Reserved Instances / Savings Plans / Committed Use Discounts on stable baseline. Typical savings: 30-60% on the committed portion. Requires forecasting confidence.",
                    "Architecture-level changes (managed services, serverless for spiky workloads, multi-region rationalization). High savings, high effort, longest payback."
                ] },
                { type: "p", content: "Most platforms are not even on rung 1. The first 90 days of FinOps work usually pay for the next 5 years of FinOps tooling." },
                { type: "h2", content: "Showback vs chargeback" },
                { type: "p", content: "Showback: dashboards visible to each team showing their cost, no money actually moves. Chargeback: each team's cloud spend is billed against their budget, finance does cross-charges." },
                { type: "p", content: "Showback first. It changes behavior as much as chargeback in most companies, with a fraction of the political overhead. Engineers who see their team is spending $14,000/month on a service that processes 200 requests/day will figure it out without finance writing them a memo. Chargeback adds value when teams have real budget authority and the bill needs to actually move; before that, it's just paperwork." },
                { type: "h2", content: "What to ignore" },
                { type: "h3", content: "Picosecond-precision attribution" },
                { type: "p", content: "Some FinOps tools advertise sub-second cost granularity. For platform decisions, monthly attribution at the namespace/service level is enough. The marginal value of finer granularity rarely justifies the added complexity." },
                { type: "h3", content: "Multi-cloud cost arbitrage" },
                { type: "p", content: "'AWS is more expensive than GCP for X workload' analyses. The implied move (run X on the cheaper cloud) usually costs more in operational complexity than the saved compute. Multi-cloud is a strategy decision, not a cost-optimization tactic." },
                { type: "h3", content: "Aggressive spot for stateful workloads" },
                { type: "p", content: "Putting Postgres on spot instances saves 60% — until the instance gets reclaimed mid-write. The category of 'workloads that should never be on spot' is real. Don't let cost pressure push you across that line." },
                { type: "h2", content: "What good looks like in 2026" },
                { type: "p", content: "A platform team running mature FinOps:" },
                { type: "list", items: [
                    "Tags every workload at deploy time, automatically (admission webhook, OPA policy, or Backstage scaffolder).",
                    "Has a Kubecost dashboard showing cost-per-team, cost-per-service, cost-per-environment for the last 30/90 days.",
                    "Reviews top movers with finance monthly. Acts on the top 3-5 each cycle.",
                    "Applies VPA recommendations quarterly across the fleet. Idle waste under 30%.",
                    "Has Reserved Instances or Savings Plans covering ~70% of stable baseline.",
                    "Runs interruption-tolerant workloads on spot pools.",
                    "Surfaces cost in Backstage scorecards — services that exceed their budget appear in compliance reports."
                ] },
                { type: "p", content: "If your platform does 4 of those 7, you're ahead of most. If you do 0 of 7, the first quarter of investment will show savings that pay for the entire FinOps program for the next decade. There is no other platform initiative with that kind of payback. That's why FinOps moved to the platform team." }
            ]
        },
        ru: {
            title: "FinOps для платформ-команд: cost engineering как Day-2 работа",
            excerpt: "Облачные счета растут на 20% в год, CTO спрашивает почему. FinOps был заботой финотдела; в 2026 это территория платформ-команды.",
            sections: [
                { type: "p", content: "Знакомый паттерн в растущих eng-организациях. Год один — облачный счёт это погрешность округления. Год два — кто-то замечает, что он удвоился. Год три — финансы просят eng сделать ежегодный cost review, eng пожимает плечами, потому что никто не знает, какой сервис чего стоит. Год четыре — нанимается контрактор, расходы падают на 30% за квартал, экономия доказывает, что счёт всё это время был на 30% мусором. Контрактор уходит; расходы ползут вверх; цикл начинается снова." },
                { type: "p", content: "FinOps — Financial Operations — дисциплина, ломающая этот цикл. FinOps Foundation публикует фреймворк; Kubecost и OpenCost дают тулинг. К 2026 у каждой достоверной платформ-команды хотя бы базовая cost-атрибуция работает. Те, у кого нет — те же команды, что нанимают контракторов каждые 18 месяцев." },
                { type: "h2", content: "Почему FinOps переехал в платформ-команду" },
                { type: "p", content: "Финансы могут читать инвойсы, но не трассируют их к eng-решениям. Eng-команды могут менять архитектуру, но не видят счёт. Платформ-команда сидит посередине — владеет deployment-surface, где принимаются cost-решения (типы инстансов, реплики, конфиги автоскейлера, retention-политики), и имеет данные для атрибуции. Это делает её правильным владельцем cost-дисциплины." },
                { type: "p", content: "Практически: в 2026, когда CTO заходит и говорит «почему облачный счёт вырос на 22%?» — ответ должен прийти от платформ-команды в виде размеченного дашборда, не от финансов в виде Excel-pivot." },
                { type: "h2", content: "MVP-стек FinOps" },
                { type: "ordered", items: [
                    "Cost-данные от облака. AWS Cost and Usage Reports (CUR), GCP Billing Export в BigQuery, Azure Cost Management Exports. Все трое публикуют line-item данные; интегрируйте один.",
                    "Формат FOCUS. Finops Open Cost and Usage Specification (FOCUS) — релиз 1.0 в 2024 — vendor-neutral схема. Большинство cost-тулов теперь экспортирует в FOCUS; стандарт делает multi-cloud агрегацию посильной.",
                    "K8s-aware атрибуция. Kubecost или OpenCost (open-source upstream). Смотрят K8s-метрики, выводят per-pod / per-namespace cost из цен на ноды и использования ресурсов.",
                    "Политика тегирования. Каждый workload теги: `team`, `service`, `environment`, `cost-center`. Без этого атрибуция — догадки.",
                    "Месячная каденция. 30-минутный митинг, где платформ-команда и финансы смотрят top movers. Без митинга дашборды не читаются."
                ] },
                { type: "h2", content: "Где Kubernetes прячет затраты" },
                { type: "h3", content: "Idle resource requests" },
                { type: "p", content: "Pod просит 1 CPU и 1Gi RAM. Реальное использование — 0.05 CPU и 200Mi RAM. Cluster autoscaler резервирует запрошенную capacity; вы платите; ничто не использует. Это самый большой источник K8s-waste в 2026 — Datadog State of Containers последовательно репортит 60-80% по опрошенным организациям." },
                { type: "p", content: "Vertical Pod Autoscaler в режиме «recommendation» производит actionable-предложения без авто-применения. Goldilocks (Fairwinds) оборачивает VPA per-namespace дашбордом. Воркфлоу: VPA наблюдает, инженер ревьюит, deployment-манифест обновляется." },
                { type: "h3", content: "PV, которые не читаются" },
                { type: "p", content: "Старый сервис задепрекейчен; deployment удалён; PersistentVolume — нет. EBS / PD volumes накапливаются и тихо биллятся. `kubectl get pv` и смотрите unbound. Большинство тулов это вытаскивают." },
                { type: "h3", content: "Cross-AZ трафик" },
                { type: "p", content: "Pod в zone-a говорит с pod в zone-b. AWS биллит $0.01 за GB переноса. На масштабе это невидимо, пока не становится видимо. Topology-aware routing (`topologyKeys`, Service `internalTrafficPolicy`) и zone-aligned деплои режут это драматически." },
                { type: "h3", content: "Egress и NAT gateways" },
                { type: "p", content: "Outbound в интернет, в другие аккаунты, в peered VPC — у всех разные цены. Egress часто удивительная строчка в счёте. VPC endpoints для S3, ECR и подобных AWS-сервисов убирают NAT-gateway data charges для этих потоков. Смотрите CUR на top egress-потоки; экономия может быть огромной." },
                { type: "h3", content: "Избегаемые spot-инстансы" },
                { type: "p", content: "Stateless workload'ы, толерантные к interruption, могут идти на spot со скидкой 60-90%. Большинство команд используют 0% spot. Первый шаг — определить interruption-tolerant workload'ы (queue consumers, batch jobs, async API workers) и положить на node pool со spot. Cluster Autoscaler с mixed pools (spot + on-demand fallback) зрелый." },
                { type: "h2", content: "Лестница экономии" },
                { type: "p", content: "Обычная рамка — выбирайте экономию в этом порядке, проще сначала:" },
                { type: "ordered", items: [
                    "Right-sizing существующих workload'ов (VPA-рекомендации применены). Типичная экономия: 20-40% по этим workload'ам.",
                    "Тонко настроенный cluster autoscaling (вменяемые min/max, осознание bin-packing). Типичная экономия: 10-20%.",
                    "Cleanup хранилища (orphan volumes, oversized volumes, infrequent-access tier для холодных). Типичная экономия: 5-15% строки storage.",
                    "Spot-инстансы для толерантных workload'ов. Типичная экономия: 60-80% по этим workload'ам, 10-25% общего compute.",
                    "Reserved Instances / Savings Plans / Committed Use Discounts на стабильный baseline. Типичная экономия: 30-60% на committed-части. Требует уверенности в прогнозе.",
                    "Архитектурные изменения (managed-сервисы, serverless для spiky-workload'ов, рационализация multi-region). Большая экономия, большие усилия, longest payback."
                ] },
                { type: "p", content: "Большинство платформ даже не на ступени 1. Первые 90 дней FinOps-работы обычно окупают следующие 5 лет FinOps-тулинга." },
                { type: "h2", content: "Showback vs chargeback" },
                { type: "p", content: "Showback: дашборды, видимые каждой команде, показывающие их cost; деньги фактически не двигаются. Chargeback: cloud spend каждой команды биллится против их бюджета, финансы делают cross-charges." },
                { type: "p", content: "Сначала showback. Меняет поведение почти так же, как chargeback в большинстве компаний, с долей политического overhead'а. Инженеры, видящие, что их команда тратит $14,000/мес на сервис, обрабатывающий 200 запросов/день, разберутся без меморандума финансов. Chargeback приносит ценность, когда у команд реальная бюджетная власть и счёт должен реально двигаться; до этого — просто бумажная работа." },
                { type: "h2", content: "Что игнорировать" },
                { type: "h3", content: "Picosecond-precision атрибуция" },
                { type: "p", content: "Некоторые FinOps-тулы рекламируют sub-second cost granularity. Для платформенных решений месячной атрибуции на уровне namespace/сервис достаточно. Маржинальная ценность более тонкой granularity редко оправдывает добавленную сложность." },
                { type: "h3", content: "Multi-cloud cost arbitrage" },
                { type: "p", content: "Анализ «AWS дороже GCP для X workload». Подразумеваемый ход (запустить X на дешёвом облаке) обычно стоит больше операционной сложности, чем сэкономленный compute. Multi-cloud — стратегическое решение, не cost-оптимизация." },
                { type: "h3", content: "Агрессивный spot для stateful" },
                { type: "p", content: "Postgres на spot-инстансах экономит 60% — пока инстанс не reclaim'нут посреди записи. Категория «workload'ов, которые никогда не должны быть на spot» реальна. Не позволяйте cost-давлению переехать эту линию." },
                { type: "h2", content: "Как выглядит хорошо в 2026" },
                { type: "p", content: "Платформ-команда со зрелым FinOps:" },
                { type: "list", items: [
                    "Тегирует каждый workload на деплое автоматически (admission webhook, OPA-политика, или Backstage scaffolder).",
                    "Имеет Kubecost-дашборд: cost-per-team, cost-per-service, cost-per-environment за последние 30/90 дней.",
                    "Месячно ревьюит top movers с финансами. Действует по топ-3-5 каждого цикла.",
                    "Применяет VPA-рекомендации квартально по флоту. Idle waste под 30%.",
                    "Имеет Reserved Instances или Savings Plans, покрывающие ~70% стабильного baseline.",
                    "Гоняет interruption-tolerant workload'ы на spot-pool'ах.",
                    "Выносит cost в Backstage scorecards — сервисы, превысившие бюджет, появляются в compliance-отчётах."
                ] },
                { type: "p", content: "Если ваша платформа делает 4 из 7 — вы впереди большинства. Если 0 из 7 — первый квартал инвестиций покажет экономию, оплачивающую всю FinOps-программу на следующее десятилетие. Нет другой платформенной инициативы с таким payback. Поэтому FinOps переехал в платформ-команду." }
            ]
        }
    },

    /* ─── 09. Self-hosted Coolify ────────────────────────────────── */
    {
        slug: "self-hosted-cloud-coolify-2026",
        date: "2026-06-16",
        readMinutes: 11,
        tags: ["Self-Hosted", "Coolify", "Docker", "Platform Engineering", "DevOps"],
        en: {
            title: "Self-Hosted Cloud in 2026: Coolify, Dokku, Caprover, and Why I Run My Own",
            excerpt: "Vercel and Railway made deployment easy. They also made the bill scale linearly with traffic. The 2025–2026 self-hosted PaaS scene quietly got good — here's the honest comparison.",
            sections: [
                { type: "p", content: "I run a Coolify instance on a single GCP VM that hosts every personal project I have — this portfolio, a WhatsApp RAG bot, an analytics API, three databases, and a Uptime Kuma monitor. The whole platform costs me about $30/month. The same workloads on Vercel + Railway + Supabase would cost me roughly $120 + $40 + $25 = $185/month at current usage, scaling worse with growth. The choice was easy. The journey to make that choice work was less easy. This is the honest picture in 2026." },
                { type: "h2", content: "Why self-hosted PaaS got viable" },
                { type: "p", content: "The 2018-era self-hosted-PaaS choice was Dokku, and it was fine if you liked tinkering with `dokku-letsencrypt` plugins. The 2024-2026 choice is broader and more polished. The key shift was Coolify reaching v4 with a real UI, automatic SSL via Cloudflare or Let's Encrypt, GitHub deploy hooks, and a service catalog of one-click installs (Postgres, Redis, MinIO, Plausible, Uptime Kuma). The friction dropped enough that 'self-hosting my services' became a 90-minute setup, not a weekend project." },
                { type: "p", content: "The economic case is also stronger than it was. Vercel's free tier shrank in 2024. Railway's hobby tier shrank in 2025. Heroku's free tier vanished in 2022. The 'just use the platform' answer became expensive at the exact moment the self-hosted options got good. Predictable timing." },
                { type: "h2", content: "The 2026 self-hosted PaaS landscape" },
                { type: "h3", content: "Coolify" },
                { type: "p", content: "PHP/Laravel + Livewire under the hood. The dominant self-hosted PaaS in 2025–2026. Strong UI, supports Docker, Docker Compose, Static, and Database service types out of the box. Server Manager handles multiple servers (you can centralize one Coolify control plane and have it deploy to several VPSes). One-click services: Postgres, MySQL, Redis, MinIO, MeiliSearch, Plausible, Umami, Uptime Kuma, n8n, Listmonk, NocoDB, and ~30 more." },
                { type: "p", content: "Wins: best UI of the lot, active maintainer, fast feature shipping, business model is transparent (paid cloud edition, free self-hosted). Cons: PHP stack scares some engineers (it shouldn't — it works fine); the platform itself is more complex internally than alternatives, so debugging when things break requires reading PHP." },
                { type: "h3", content: "Dokku" },
                { type: "p", content: "The original. A bash-and-docker port of Heroku's buildpack model. Almost no UI; everything is `dokku <command>`. Buildpack support means you can deploy a Node app with a `git push dokku main` and it Just Works without writing a Dockerfile. Plugins handle databases, SSL, monitoring." },
                { type: "p", content: "Wins: most UNIX-philosophy of the bunch, lightweight, twelve-year-old project that won't disappear, single-server simplicity, easy to script. Cons: no UI to speak of (the Dokku Pro UI exists but is paid), single-server orientation makes multi-server harder, plugins quality varies." },
                { type: "h3", content: "Caprover" },
                { type: "p", content: "Docker Swarm under the hood (which dates it but isn't broken). Web UI, one-click app deploys from `captain-definition` files, automatic SSL via Let's Encrypt, supports clustering across multiple servers via Swarm." },
                { type: "p", content: "Wins: cleanest multi-server story (Swarm handles it), proven for production, decent UI, app templates ecosystem. Cons: Docker Swarm is in maintenance mode upstream; not as actively developed as Coolify; UI is functional but feels older." },
                { type: "h3", content: "Dokploy" },
                { type: "p", content: "Newer entrant (2023). TypeScript/Next.js stack. Very Coolify-like in approach but lighter. Native Docker support, multi-server via SSH, similar one-click services. Smaller ecosystem so far but design is sharp." },
                { type: "p", content: "Wins: modern stack appeals to TS-fluent platform engineers, code is readable, fewer moving parts than Coolify. Cons: smaller community, fewer third-party integrations, less battle-tested." },
                { type: "h3", content: "Yunohost" },
                { type: "p", content: "Different category — this is a self-hosted application server for non-engineers, with a giant catalog of pre-packaged apps (Nextcloud, Mastodon, Wallabag). Worth knowing, but it's optimized for 'I want to run my own Nextcloud', not for 'I want to deploy my own services'." },
                { type: "h2", content: "What 'self-hosted' really costs" },
                { type: "p", content: "Cloud bill: ~$25-40/month for a 4 vCPU / 8 GB RAM VM that comfortably hosts 8-15 small services. Compare to ~$200/month worth of equivalent workloads on Vercel + Railway + Supabase tiers." },
                { type: "p", content: "Time cost: 4-6 hours initial setup. After that, maybe 1-2 hours/month maintenance — applying updates, looking at logs, occasional 'why did this service restart' debugging. The long-tail time is real but bounded." },
                { type: "p", content: "Reliability cost: you are now your own SRE. The VM goes down at 3am, you fix it. Cloudflare's network does the heavy lifting on availability for cached endpoints, but origin uptime is on you. For personal projects this is fine. For production with paying customers, the math is different — managed PaaS earns its premium when downtime is expensive." },
                { type: "h2", content: "What works well in 2026" },
                { type: "p", content: "Things that just work, that wouldn't have in 2018:" },
                { type: "list", items: [
                    "Wildcard SSL via Cloudflare DNS-01 challenges. Set up once; every subdomain you create gets HTTPS automatically.",
                    "GitHub deploy webhooks. Push to main → image builds → Coolify deploys → service rolls. About as smooth as Vercel's flow for the things Coolify supports.",
                    "Backup pipelines. Coolify's database service backups to S3-compatible storage on a schedule. Set once, forget.",
                    "Logs. Both Coolify and Caprover surface container logs in the UI. For deeper observability, plug in OpenTelemetry — drop a Beyla daemon onto the host and you get traces and metrics for HTTP traffic without any service code changes.",
                    "Resource limits. The UI lets you cap CPU/memory per service; useful for hosting many small services on a small VM without one runaway pod evicting others."
                ] },
                { type: "h2", content: "What still doesn't" },
                { type: "list", items: [
                    "Multi-region. None of the self-hosted options give you Vercel-style edge deployment. If your audience is global and latency-sensitive, you need a CDN in front (Cloudflare's free tier is enough for most cases).",
                    "Auto-scaling under traffic spikes. You sized the VM; the VM is the limit. Vertical scaling means SSH'ing in and resizing.",
                    "Build farms. Most self-hosted PaaS builds on the same VM that runs the apps. A heavy build can starve running services. Coolify supports remote build servers, but it's manual.",
                    "Compliance theater. SOC 2 / ISO 27001 / HIPAA stories — the managed providers' value proposition. Self-hosted buys flexibility, not certifications.",
                    "Onboarding new engineers. Vercel takes 5 minutes to explain. A Coolify setup takes 30 minutes to understand. The cognitive cost of self-hosting is real for teams larger than one."
                ] },
                { type: "h2", content: "When self-hosting is right" },
                { type: "ordered", items: [
                    "Personal projects. Slam-dunk. Cost beats free tiers, control is total, learning value is high.",
                    "Side businesses with predictable, modest traffic. The economics are very favorable up to ~$1k MRR-ish.",
                    "Internal tools at any company. The tradeoff calculation differs from public-facing apps; SLO needs are usually lower.",
                    "Workloads that are awkward on serverless: long-running background workers, anything with persistent connections, anything with unusual binaries."
                ] },
                { type: "h2", content: "When it's not" },
                { type: "ordered", items: [
                    "Customer-facing production apps with real revenue at stake. Pay for the managed platform; the engineering hours saved on incidents pay for it.",
                    "Teams without one infrastructure-comfortable engineer. Someone has to be the 3am person.",
                    "Workloads requiring strict compliance certifications you don't have time to acquire.",
                    "Companies where engineering velocity matters more than monthly cost. Vercel deploys take seconds; Coolify deploys take minutes; for fast-iteration teams that adds up."
                ] },
                { type: "h2", content: "How to decide in 30 minutes" },
                { type: "p", content: "Estimate three numbers: monthly cost on managed (look at your current Vercel/Railway/Supabase bills, project to 12 months), one-time setup cost in your hours (treat self-hosting setup as 6 hours @ your loaded rate), and ongoing maintenance (1.5h/month). If the managed cost is less than $1500/year, stay managed — the time isn't worth it. If it's between $1500 and $5000/year, self-hosted is reasonable but not urgent. Above $5000/year, self-hosted savings become significant and the 6-hour setup pays for itself the first month." },
                { type: "p", content: "Most personal portfolios and indie projects fall in the third category once you add up everything. Most early-stage startups fall in the first or second category and shouldn't bother. The middle is where individual taste decides." }
            ]
        },
        ru: {
            title: "Self-hosted облако в 2026: Coolify, Dokku, Caprover и почему я запускаю своё",
            excerpt: "Vercel и Railway сделали деплой простым. Они же сделали счёт линейно растущим с трафиком. Сцена self-hosted PaaS 2025–2026 тихо стала хорошей — честное сравнение.",
            sections: [
                { type: "p", content: "Я запускаю Coolify на одной GCP VM, которая хостит каждый мой персональный проект — это портфолио, WhatsApp RAG-бота, analytics API, три базы и Uptime Kuma монитор. Вся платформа стоит мне ~$30/месяц. Те же workload'ы на Vercel + Railway + Supabase обошлись бы ~$120 + $40 + $25 = $185/месяц при текущем использовании, масштабируясь хуже с ростом. Выбор был лёгким. Путь, чтобы сделать этот выбор работающим — менее лёгким. Вот честная картина 2026." },
                { type: "h2", content: "Почему self-hosted PaaS стал жизнеспособным" },
                { type: "p", content: "Self-hosted-PaaS выбор 2018-го был Dokku, и было нормально, если вы любили возиться с плагинами `dokku-letsencrypt`. Выбор 2024-2026 шире и отполированнее. Ключевой сдвиг — Coolify дошёл до v4 с реальным UI, автоматическим SSL через Cloudflare или Let's Encrypt, GitHub deploy hooks и service-каталогом one-click установок (Postgres, Redis, MinIO, Plausible, Uptime Kuma). Трение упало настолько, что «self-host моих сервисов» стало 90-минутной настройкой, не weekend-проектом." },
                { type: "p", content: "Экономика тоже сильнее, чем была. Free tier Vercel сжался в 2024. Hobby tier Railway сжался в 2025. Free tier Heroku исчез в 2022. «Просто используй платформу» стало дорогим ровно в момент, когда self-hosted опции стали хорошими. Предсказуемый тайминг." },
                { type: "h2", content: "Self-hosted PaaS-ландшафт 2026" },
                { type: "h3", content: "Coolify" },
                { type: "p", content: "Под капотом PHP/Laravel + Livewire. Доминантный self-hosted PaaS 2025–2026. Сильный UI, поддерживает Docker, Docker Compose, Static и Database service-типы из коробки. Server Manager обрабатывает множество серверов (можно центральный Coolify control plane разворачивать на несколько VPS). One-click сервисы: Postgres, MySQL, Redis, MinIO, MeiliSearch, Plausible, Umami, Uptime Kuma, n8n, Listmonk, NocoDB и ~30 ещё." },
                { type: "p", content: "Победы: лучший UI, активный мейнтейнер, быстрый шипинг фич, прозрачная бизнес-модель (платная cloud-редакция, бесплатный self-hosted). Минусы: PHP-стек пугает некоторых инженеров (зря — работает нормально); сама платформа сложнее внутри, чем альтернативы, дебаг при поломках требует чтения PHP." },
                { type: "h3", content: "Dokku" },
                { type: "p", content: "Оригинал. Bash-and-docker порт buildpack-модели Heroku. Почти нет UI; всё через `dokku <command>`. Поддержка buildpack означает, что Node-app деплоится через `git push dokku main` и работает без Dockerfile. Плагины обрабатывают БД, SSL, мониторинг." },
                { type: "p", content: "Победы: самый UNIX-philosophy, лёгкий, 12-летний проект, который не исчезнет, простота одного сервера, легко скриптовать. Минусы: UI почти нет (Dokku Pro UI существует, но платный), single-server ориентация усложняет мульти-сервер, качество плагинов варьируется." },
                { type: "h3", content: "Caprover" },
                { type: "p", content: "Под капотом Docker Swarm (что датирует, но не сломано). Web UI, one-click app deploy из `captain-definition` файлов, автоматический SSL через Let's Encrypt, поддерживает кластеризацию через Swarm." },
                { type: "p", content: "Победы: чистейшая мульти-серверная история (Swarm справляется), proven для production, приличный UI, экосистема app-шаблонов. Минусы: Docker Swarm в maintenance mode upstream; не так активно развивается, как Coolify; UI функционален, но кажется старым." },
                { type: "h3", content: "Dokploy" },
                { type: "p", content: "Новее (2023). Стек TypeScript/Next.js. Очень Coolify-подобен по подходу, но легче. Нативный Docker support, мульти-сервер через SSH, похожие one-click сервисы. Меньше экосистемы, но дизайн острый." },
                { type: "p", content: "Победы: современный стек привлекает TS-беглых платформ-инженеров, код читаемый, меньше движущихся частей, чем Coolify. Минусы: меньше community, меньше third-party интеграций, менее обкатан." },
                { type: "h3", content: "Yunohost" },
                { type: "p", content: "Другая категория — self-hosted application-сервер для не-инженеров, с гигантским каталогом готовых приложений (Nextcloud, Mastodon, Wallabag). Знать стоит, но он оптимизирован под «хочу свой Nextcloud», не под «хочу деплоить свои сервисы»." },
                { type: "h2", content: "Что реально стоит self-hosted" },
                { type: "p", content: "Облачный счёт: ~$25-40/мес за 4 vCPU / 8 GB RAM VM, комфортно хостящую 8-15 маленьких сервисов. Сравните с ~$200/мес эквивалентных workload'ов на tier'ах Vercel + Railway + Supabase." },
                { type: "p", content: "Time cost: 4-6 часов первоначальной настройки. Дальше — 1-2 часа/месяц поддержки: накатывать апдейты, смотреть логи, разбираться «почему этот сервис перезапустился». Long-tail время реально, но ограничено." },
                { type: "p", content: "Reliability cost: теперь вы сами SRE. VM падает в 3 ночи — вы чините. Сеть Cloudflare делает heavy lifting по availability для кэшированных endpoint'ов, но uptime origin — на вас. Для личных проектов нормально. Для production с платящими клиентами математика другая — managed PaaS отрабатывает свою премию, когда downtime дорогой." },
                { type: "h2", content: "Что хорошо работает в 2026" },
                { type: "p", content: "Вещи, которые просто работают и не работали в 2018:" },
                { type: "list", items: [
                    "Wildcard SSL через Cloudflare DNS-01 challenges. Настройте раз; каждый создаваемый поддомен автоматически получает HTTPS.",
                    "GitHub deploy webhooks. Push в main → собирается image → Coolify деплоит → сервис ролится. Примерно так же гладко, как Vercel-flow для вещей, которые Coolify поддерживает.",
                    "Pipeline'ы бэкапов. Coolify database-сервис бэкапит в S3-совместимое хранилище по расписанию. Настройте раз, забудьте.",
                    "Логи. И Coolify, и Caprover показывают логи контейнеров в UI. Для глубже observability — подключите OpenTelemetry: поставьте Beyla-демона на хост и получите трейсы и метрики HTTP-трафика без правки сервисного кода.",
                    "Resource-лимиты. UI позволяет лимитировать CPU/memory per service; полезно для хостинга многих маленьких сервисов на маленькой VM, чтобы один runaway-pod не вытеснял остальные."
                ] },
                { type: "h2", content: "Что всё ещё не работает" },
                { type: "list", items: [
                    "Multi-region. Ни одна self-hosted опция не даёт Vercel-style edge-деплой. Если аудитория глобальная и latency-чувствительная — нужен CDN перед (Cloudflare free tier для большинства случаев достаточно).",
                    "Авто-скейлинг под trafic-spike. Размерили VM; VM — предел. Вертикальный скейлинг — SSH и resize.",
                    "Build-фермы. Большинство self-hosted PaaS собирает на той же VM, где гоняются приложения. Тяжёлый билд может starvить running-сервисы. Coolify поддерживает remote build-серверы, но руками.",
                    "Compliance-театр. SOC 2 / ISO 27001 / HIPAA — value proposition managed-провайдеров. Self-hosted покупает гибкость, не сертификаты.",
                    "Онбординг новых инженеров. Vercel объясняется за 5 минут. Coolify-настройку понять — 30 минут. Когнитивная цена self-hosting'а реальна для команд больше одного."
                ] },
                { type: "h2", content: "Когда self-hosting прав" },
                { type: "ordered", items: [
                    "Личные проекты. Slam-dunk. Стоимость бьёт free tier'ы, контроль полный, learning-ценность высокая.",
                    "Side-бизнесы с предсказуемым умеренным трафиком. Экономика очень благоприятна до ~$1k MRR.",
                    "Внутренние tools в любой компании. Расчёт компромисса отличается от public-facing; SLO-потребности обычно ниже.",
                    "Workload'ы, неудобные на serverless: long-running background workers, всё с persistent connections, всё с необычными бинарями."
                ] },
                { type: "h2", content: "Когда не прав" },
                { type: "ordered", items: [
                    "Customer-facing production-приложения с реальной выручкой. Платите за managed-платформу; eng-часы, сэкономленные на инцидентах, окупают.",
                    "Команды без одного infrastructure-comfortable инженера. Кто-то должен быть 3am-человеком.",
                    "Workload'ы, требующие строгих compliance-сертификаций, на которые нет времени.",
                    "Компании, где eng-velocity важнее месячного cost. Vercel-деплои за секунды; Coolify-деплои за минуты; для fast-iteration команд это складывается."
                ] },
                { type: "h2", content: "Как решить за 30 минут" },
                { type: "p", content: "Прикиньте три числа: месячная стоимость на managed (посмотрите текущие счета Vercel/Railway/Supabase, спроецируйте на 12 месяцев), one-time стоимость setup'а в ваших часах (считайте self-hosting-setup как 6 часов × вашу loaded rate) и постоянное обслуживание (1.5h/месяц). Если managed-cost меньше $1500/год — оставайтесь на managed; время не стоит. Если между $1500 и $5000/год — self-hosted разумен, но не срочен. Выше $5000/год — self-hosted-экономия становится значительной, и 6-часовой setup окупается за первый месяц." },
                { type: "p", content: "Большинство личных портфолио и indie-проектов попадают в третью категорию, когда суммируете всё. Большинство early-stage стартапов в первой или второй и не должны заморачиваться. Середина — где решает индивидуальный вкус." }
            ]
        }
    },

    /* ─── 10. Progressive Delivery ───────────────────────────────── */
    {
        slug: "progressive-delivery-2026",
        date: "2026-06-02",
        readMinutes: 12,
        tags: ["Progressive Delivery", "Argo Rollouts", "Flagger", "Kubernetes", "DevOps"],
        en: {
            title: "Progressive Delivery: Argo Rollouts, Flagger, and the Death of 'git push to prod'",
            excerpt: "Continuous deployment shipped your code on green CI. Progressive delivery decides whether prod traffic should actually reach it. By 2026 the second is what credible teams ship.",
            sections: [
                { type: "p", content: "Continuous Deployment promised that green CI meant 'in production'. For most teams, what actually happened: green CI meant 'rolled to all replicas, all users, all at once'. The first 30 seconds of a bad deploy could take down the whole user base. Rollback meant the next CI run, six minutes later. The damage in those six minutes was the cost of belief that CI passing was enough." },
                { type: "p", content: "Progressive Delivery is the answer the industry converged on between 2021 and 2026. Same continuous-deployment ethos, but the deploy is no longer atomic. New code reaches 1% of traffic, the system measures, and based on signals decides to widen, hold, or roll back. By 2026, this is how serious teams ship — not because of fashion, but because the tooling finally got cheap." },
                { type: "h2", content: "What Progressive Delivery actually means" },
                { type: "p", content: "Three patterns under one umbrella:" },
                { type: "ordered", items: [
                    "Canary: a small percentage of traffic hits the new version. Metrics decide whether to widen.",
                    "Blue-green: two copies of the service exist (current 'blue', new 'green'). Switch traffic with a load-balancer flip; roll back by flipping again.",
                    "A/B: a percentage based on user attribute (header, cookie, user ID hash). Different from canary because it's deterministic per user, not random per request."
                ] },
                { type: "p", content: "Canary is the dominant choice for stateless web/API services. Blue-green is the choice for services with cold-start cost (databases, caches, services with heavy in-memory state). A/B is for product experiments more than safety." },
                { type: "h2", content: "Argo Rollouts vs Flagger" },
                { type: "p", content: "Two CNCF projects, both well-maintained, slightly different philosophies." },
                { type: "h3", content: "Argo Rollouts" },
                { type: "p", content: "From the Argo project family — pairs naturally with ArgoCD. Replaces the Kubernetes Deployment with a `Rollout` resource that supports `canary` and `blueGreen` strategies natively. Traffic shifting is via Service mesh integrations (Istio, Linkerd, AWS App Mesh) or Ingress controllers (Nginx, Contour, Traefik, ALB)." },
                { type: "code", lang: "yaml", content: "apiVersion: argoproj.io/v1alpha1\nkind: Rollout\nmetadata:\n  name: orders-api\nspec:\n  replicas: 6\n  strategy:\n    canary:\n      canaryService: orders-api-canary\n      stableService: orders-api-stable\n      trafficRouting:\n        nginx:\n          stableIngress: orders-api\n      steps:\n        - setWeight: 5\n        - pause: { duration: 2m }\n        - analysis:\n            templates:\n              - templateName: success-rate\n        - setWeight: 25\n        - pause: { duration: 5m }\n        - analysis:\n            templates:\n              - templateName: success-rate\n        - setWeight: 50\n        - pause: { duration: 10m }\n        - setWeight: 100\n  selector:\n    matchLabels:\n      app: orders-api\n  template: { ... standard Deployment template ... }" },
                { type: "p", content: "The `analysis` step is where this gets interesting. An `AnalysisTemplate` runs a Prometheus query (or Datadog, NewRelic, CloudWatch, custom metric provider). If the query returns a value above the success threshold, the rollout continues. If not, it auto-rolls-back." },
                { type: "code", lang: "yaml", content: "apiVersion: argoproj.io/v1alpha1\nkind: AnalysisTemplate\nmetadata:\n  name: success-rate\nspec:\n  metrics:\n    - name: success-rate\n      interval: 30s\n      successCondition: result[0] >= 0.99\n      failureLimit: 3\n      provider:\n        prometheus:\n          address: http://prometheus.monitoring:9090\n          query: |\n            sum(rate(http_requests_total{service=\"orders-api\",status!~\"5..\"}[2m]))\n            /\n            sum(rate(http_requests_total{service=\"orders-api\"}[2m]))" },
                { type: "p", content: "The rollout pauses, queries Prometheus, and only proceeds if 99% of requests in the last 2 minutes were non-5xx. If the query fails 3 times, the rollout rolls back automatically." },
                { type: "h3", content: "Flagger" },
                { type: "p", content: "From Weaveworks, now under the Flux project. Mesh-first design — Flagger requires a service mesh (Istio, Linkerd, App Mesh) or a compatible ingress (Contour, Gloo, NGINX) for traffic shifting. The `Canary` resource is the unit." },
                { type: "code", lang: "yaml", content: "apiVersion: flagger.app/v1beta1\nkind: Canary\nmetadata:\n  name: orders-api\nspec:\n  targetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: orders-api\n  service:\n    port: 8080\n  analysis:\n    interval: 1m\n    threshold: 5\n    maxWeight: 50\n    stepWeight: 10\n    metrics:\n      - name: request-success-rate\n        thresholdRange: { min: 99 }\n        interval: 1m\n      - name: request-duration\n        thresholdRange: { max: 500 }\n        interval: 1m\n    webhooks:\n      - name: load-test\n        url: http://flagger-loadtester.test/\n        timeout: 5s\n        metadata:\n          cmd: 'hey -z 1m -q 10 -c 2 http://orders-api-canary:8080/'" },
                { type: "p", content: "Flagger's killer feature is webhooks: pre-rollout, during-rollout, post-rollout hooks that can call external services. The example above runs a load-tester against the canary while traffic is being shifted, ensuring it's actually being exercised. Argo Rollouts has analogous capability via experiments but Flagger's hook ergonomics are cleaner." },
                { type: "h3", content: "Choosing" },
                { type: "p", content: "Argo Rollouts wins if you're already in the Argo ecosystem (ArgoCD), don't want a service mesh, and prefer a more comprehensive controller. Flagger wins if you have a service mesh, want hook-driven workflows, and prefer the Flux ecosystem. Both are mature in 2026; either works. The choice is mostly about which sister tools you've already adopted." },
                { type: "h2", content: "What good metrics look like" },
                { type: "p", content: "The hard part of progressive delivery is choosing the right success signals. The bad pattern: 'roll out if no one calls the on-call'. The good pattern: a small set of proxy metrics that reliably detect breakage early." },
                { type: "p", content: "The four signals most credible teams use:" },
                { type: "ordered", items: [
                    "Success rate (5xx vs total). The blunt instrument. Above 99% in normal operation; if it drops, something is broken.",
                    "Latency p99. New code that ships with a regression on tail latency is invisible to averages but real to users. p99 catches it.",
                    "Custom business metric. For orders: 'rate of orders successfully placed'. For login: 'rate of successful logins'. The application-specific signal is what tells you the system is doing its job, not just returning 200s.",
                    "Error budget burn rate. If your service has an SLO, the burn rate (how fast you're consuming the error budget) is the most actionable single metric. A canary that doubles burn rate during ramp is a regression."
                ] },
                { type: "p", content: "Avoid: too many metrics (analysis paralysis), metrics with high variance (false rollbacks), metrics that lag (rolled out 100% before signal stabilizes)." },
                { type: "h2", content: "Feature flags + progressive delivery: the full picture" },
                { type: "p", content: "Progressive delivery moves traffic to new code. Feature flags move users to new behavior. The two compose:" },
                { type: "ordered", items: [
                    "Code is shipped progressively to all pods (canary / blue-green) using Argo Rollouts. Code paths are inert because the new feature is gated behind a flag.",
                    "Once 100% of pods have the new code, the feature flag is enabled progressively to users (1%, 10%, 50%, 100%) using LaunchDarkly, Unleash, or PostHog.",
                    "If the new feature behaves badly, flip the flag off — instantly, without a redeploy. The code is still there; users just don't hit it."
                ] },
                { type: "p", content: "This separation — code rollout from feature rollout — is the key insight. Rollback becomes flag flip, not git revert. The pattern matters because shipping the same artifact for two weeks while you ramp a flag is much safer than redeploying for every flag change." },
                { type: "h2", content: "Common mistakes" },
                { type: "h3", content: "Skipping the pause windows" },
                { type: "p", content: "A canary that ramps from 1% to 100% in 30 seconds isn't a canary, it's a fast deploy. The whole point is to give metrics time to stabilize at each step. The 'right' duration depends on your traffic — but it's never seconds." },
                { type: "h3", content: "Rolling out everything progressively" },
                { type: "p", content: "Hot fixes for outages should bypass the canary system. The whole point of a hot fix is speed; a 30-minute canary defeats it. Build a 'force' annotation that skips analysis, and use it sparingly." },
                { type: "h3", content: "Ignoring stateful workloads" },
                { type: "p", content: "Database migrations don't fit progressive delivery. Schema changes need to be applied once, not 1% then 100%. The canary applies to the application code consuming the schema, not to the schema itself. Migrate forward in two-phase patterns: deploy schema-tolerant code first, run migration, deploy schema-using code second." },
                { type: "h3", content: "Trusting your own metrics provider too much" },
                { type: "p", content: "If Datadog goes down during a rollout and your AnalysisTemplate queries Datadog, the rollout pauses indefinitely. Make the failure mode of your analysis pipeline a known incident type, with operational answers (manual override, fallback to a different metric source)." },
                { type: "h2", content: "What 'good' looks like in 2026" },
                { type: "p", content: "A platform team running mature progressive delivery:" },
                { type: "list", items: [
                    "All production deployments via Argo Rollouts or Flagger by default. Plain `kubectl apply` for a Deployment is the exception, used only with justification.",
                    "Canary steps: 5% → 25% → 50% → 100% with 2-10 minute analysis windows.",
                    "Three or four production-grade analysis templates that any service can opt into (success rate, latency, error budget, business metric).",
                    "Auto-rollback wired on analysis failure, with on-call notification.",
                    "Feature flags integrated for behavior rollout (LaunchDarkly, Unleash, OpenFeature).",
                    "Hot-path bypass annotation for emergency deploys, audit-logged."
                ] },
                { type: "p", content: "If you ship even three of those, the production-incident frequency drops measurably. The ROI on progressive delivery is one prevented incident every quarter or two; below that frequency, plain CD is fine. Above that, the gap widens until progressive becomes the only credible answer. Most teams cross that threshold somewhere between 10 and 50 services. By 2026, the question is no longer 'should we?' but 'which tool, and when do we onboard the next service?'." }
            ]
        },
        ru: {
            title: "Progressive Delivery: Argo Rollouts, Flagger и смерть «git push в прод»",
            excerpt: "Continuous Deployment отгружал ваш код на зелёном CI. Progressive Delivery решает, должен ли prod-трафик реально до него дойти. К 2026 второе — это то, как шипят достоверные команды.",
            sections: [
                { type: "p", content: "Continuous Deployment обещал, что зелёный CI значит «в production». Для большинства команд реально получалось: зелёный CI значил «выкатано на все реплики, всех пользователей, разом». Первые 30 секунд плохого деплоя могли уронить всю user base. Rollback — это следующий CI-run через шесть минут. Ущерб в эти шесть минут — цена веры в то, что прохождение CI достаточно." },
                { type: "p", content: "Progressive Delivery — ответ, на котором индустрия сошлась между 2021 и 2026. Тот же ethos continuous-deployment, но деплой больше не атомарен. Новый код доходит до 1% трафика, система меряет, и по сигналам решает — расширять, держать или откатывать. К 2026 серьёзные команды шипят так — не из-за моды, а потому что тулинг наконец стал дешёвым." },
                { type: "h2", content: "Что значит Progressive Delivery" },
                { type: "p", content: "Три паттерна под одним зонтом:" },
                { type: "ordered", items: [
                    "Canary: маленький процент трафика идёт на новую версию. Метрики решают, расширять ли.",
                    "Blue-green: две копии сервиса (текущая 'blue', новая 'green'). Переключение трафика — flip балансировщика; rollback — flip обратно.",
                    "A/B: процент по атрибуту пользователя (header, cookie, hash user ID). Отличается от canary тем, что детерминирован per-user, а не случаен per-request."
                ] },
                { type: "p", content: "Canary — доминантный выбор для stateless web/API. Blue-green — для сервисов с cold-start стоимостью (БД, кэши, сервисы с тяжёлым in-memory state). A/B — больше для продуктовых экспериментов, чем для безопасности." },
                { type: "h2", content: "Argo Rollouts vs Flagger" },
                { type: "p", content: "Два CNCF-проекта, оба хорошо поддерживаемые, философии чуть разные." },
                { type: "h3", content: "Argo Rollouts" },
                { type: "p", content: "Из семьи Argo — естественно пара с ArgoCD. Заменяет Kubernetes Deployment ресурсом `Rollout`, поддерживающим стратегии `canary` и `blueGreen` нативно. Traffic shifting — через интеграции с service mesh (Istio, Linkerd, AWS App Mesh) или ingress-контроллеры (Nginx, Contour, Traefik, ALB)." },
                { type: "code", lang: "yaml", content: "apiVersion: argoproj.io/v1alpha1\nkind: Rollout\nmetadata:\n  name: orders-api\nspec:\n  replicas: 6\n  strategy:\n    canary:\n      canaryService: orders-api-canary\n      stableService: orders-api-stable\n      trafficRouting:\n        nginx: { stableIngress: orders-api }\n      steps:\n        - setWeight: 5\n        - pause: { duration: 2m }\n        - analysis: { templates: [{ templateName: success-rate }] }\n        - setWeight: 25\n        - pause: { duration: 5m }\n        - analysis: { templates: [{ templateName: success-rate }] }\n        - setWeight: 50\n        - pause: { duration: 10m }\n        - setWeight: 100" },
                { type: "p", content: "Шаг `analysis` — где становится интересно. `AnalysisTemplate` гоняет Prometheus-запрос (или Datadog, NewRelic, CloudWatch, кастомный provider). Если запрос возвращает значение выше success-threshold — rollout продолжается. Если нет — авто-откат." },
                { type: "code", lang: "yaml", content: "apiVersion: argoproj.io/v1alpha1\nkind: AnalysisTemplate\nmetadata:\n  name: success-rate\nspec:\n  metrics:\n    - name: success-rate\n      interval: 30s\n      successCondition: result[0] >= 0.99\n      failureLimit: 3\n      provider:\n        prometheus:\n          address: http://prometheus.monitoring:9090\n          query: |\n            sum(rate(http_requests_total{service=\"orders-api\",status!~\"5..\"}[2m]))\n            /\n            sum(rate(http_requests_total{service=\"orders-api\"}[2m]))" },
                { type: "p", content: "Rollout паузится, запрашивает Prometheus, и продолжает только если 99% запросов за последние 2 минуты были не-5xx. Если запрос фейлится 3 раза — rollout откатывается автоматически." },
                { type: "h3", content: "Flagger" },
                { type: "p", content: "От Weaveworks, теперь под проектом Flux. Mesh-first дизайн — Flagger требует service mesh (Istio, Linkerd, App Mesh) или совместимый ingress (Contour, Gloo, NGINX) для traffic shifting. Единица — ресурс `Canary`." },
                { type: "code", lang: "yaml", content: "apiVersion: flagger.app/v1beta1\nkind: Canary\nmetadata:\n  name: orders-api\nspec:\n  targetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: orders-api\n  service: { port: 8080 }\n  analysis:\n    interval: 1m\n    threshold: 5\n    maxWeight: 50\n    stepWeight: 10\n    metrics:\n      - name: request-success-rate\n        thresholdRange: { min: 99 }\n        interval: 1m\n      - name: request-duration\n        thresholdRange: { max: 500 }\n        interval: 1m\n    webhooks:\n      - name: load-test\n        url: http://flagger-loadtester.test/\n        metadata:\n          cmd: 'hey -z 1m -q 10 -c 2 http://orders-api-canary:8080/'" },
                { type: "p", content: "Killer-фича Flagger — webhooks: pre-rollout, during-rollout, post-rollout хуки, способные звать внешние сервисы. Пример выше гоняет load-tester против canary, пока трафик сдвигается — гарантирует, что его реально упражняют. У Argo Rollouts аналогичная возможность через experiments, но эргономика хуков Flagger чище." },
                { type: "h3", content: "Выбор" },
                { type: "p", content: "Argo Rollouts побеждает, если уже в Argo-экосистеме (ArgoCD), не хотите service mesh и предпочитаете более комплексный контроллер. Flagger побеждает, если есть service mesh, нужны hook-driven workflows и предпочитаете Flux-экосистему. Оба зрелы в 2026; любой работает. Выбор в основном — какие сестринские инструменты уже приняли." },
                { type: "h2", content: "Как выглядят хорошие метрики" },
                { type: "p", content: "Сложная часть progressive delivery — выбрать правильные success-сигналы. Плохой паттерн: «выкатить, если никто не звонит on-call». Хороший: маленький набор proxy-метрик, надёжно детектирующих поломку рано." },
                { type: "p", content: "Четыре сигнала, которые используют большинство достоверных команд:" },
                { type: "ordered", items: [
                    "Success rate (5xx vs total). Тупой инструмент. Выше 99% в норме; если падает — что-то сломано.",
                    "Latency p99. Новый код с регрессией tail latency невидим для среднего, но реален для пользователей. p99 ловит.",
                    "Кастомная бизнес-метрика. Для orders: «rate of orders successfully placed». Для login: «rate of successful logins». Application-specific сигнал — то, что говорит, что система делает свою работу, а не просто возвращает 200.",
                    "Error budget burn rate. Если у сервиса есть SLO, burn rate (как быстро потребляется error budget) — самая actionable метрика. Canary, удваивающая burn rate в ramp, — регрессия."
                ] },
                { type: "p", content: "Избегайте: слишком много метрик (analysis paralysis), метрики с высокой дисперсией (ложные откаты), метрики с лагом (выкатилось 100% до стабилизации сигнала)." },
                { type: "h2", content: "Feature flags + progressive delivery: полная картина" },
                { type: "p", content: "Progressive delivery двигает трафик к новому коду. Feature flags двигают пользователей к новому поведению. Две вещи комбинируются:" },
                { type: "ordered", items: [
                    "Код шипится прогрессивно на все pod'ы (canary / blue-green) через Argo Rollouts. Code-paths инертны, потому что фича за флагом.",
                    "Когда 100% pod'ов имеют новый код — флаг включается прогрессивно пользователям (1%, 10%, 50%, 100%) через LaunchDarkly, Unleash, PostHog.",
                    "Если новая фича ведёт себя плохо — flip флага в off — мгновенно, без редеплоя. Код остаётся; пользователи просто не попадают."
                ] },
                { type: "p", content: "Это разделение — rollout кода от rollout фичи — ключевой инсайт. Rollback становится flip флага, не git revert. Паттерн важен, потому что шиповать один артефакт две недели, пока ramp'ишь флаг, гораздо безопаснее, чем редеплоить на каждое изменение флага." },
                { type: "h2", content: "Частые ошибки" },
                { type: "h3", content: "Пропускать pause-окна" },
                { type: "p", content: "Canary, ramp'ящаяся с 1% до 100% за 30 секунд — не canary, а быстрый деплой. Весь смысл — дать метрикам время стабилизироваться на каждом шаге. «Правильная» длительность зависит от трафика — но это никогда не секунды." },
                { type: "h3", content: "Выкатывать всё прогрессивно" },
                { type: "p", content: "Hot-fix для outage'а должен обходить canary-систему. Весь смысл hot fix'а — скорость; 30-минутная canary его убивает. Постройте «force»-аннотацию, пропускающую analysis, и используйте экономно." },
                { type: "h3", content: "Игнорировать stateful workload'ы" },
                { type: "p", content: "Миграции БД не вписываются в progressive delivery. Изменения схемы применяются один раз, не 1% потом 100%. Canary применяется к application-коду, использующему схему, не к схеме. Мигрируйте вперёд в two-phase паттернах: задеплойте schema-tolerant код первым, прогоните миграцию, задеплойте schema-using код вторым." },
                { type: "h3", content: "Доверять своему metrics-provider слишком" },
                { type: "p", content: "Если Datadog лежит во время rollout, а ваш AnalysisTemplate запрашивает Datadog — rollout паузится бесконечно. Сделайте failure mode вашего analysis-пайплайна известным типом инцидента с операционными ответами (manual override, fallback на другой источник метрик)." },
                { type: "h2", content: "Как выглядит «хорошо» в 2026" },
                { type: "p", content: "Платформ-команда со зрелым progressive delivery:" },
                { type: "list", items: [
                    "Все production-деплои через Argo Rollouts или Flagger по умолчанию. Plain `kubectl apply` для Deployment — исключение, только с обоснованием.",
                    "Canary-шаги: 5% → 25% → 50% → 100% с окнами анализа 2-10 минут.",
                    "Три-четыре production-grade analysis-шаблона, на которые любой сервис может opt-in (success rate, latency, error budget, business metric).",
                    "Авто-откат на failure анализа, с on-call уведомлением.",
                    "Feature flags интегрированы для rollout поведения (LaunchDarkly, Unleash, OpenFeature).",
                    "Hot-path bypass-аннотация для emergency-деплоев, audit-залогирована."
                ] },
                { type: "p", content: "Если шипите даже три из этих — частота production-инцидентов измеримо падает. ROI progressive delivery — один предотвращённый инцидент каждые квартал-два; ниже этой частоты обычный CD нормально. Выше — gap расширяется, пока progressive не становится единственным достоверным ответом. Большинство команд пересекают этот порог между 10 и 50 сервисами. К 2026 вопрос больше не «должны ли мы?», а «какой инструмент и когда онбордим следующий сервис?»." }
            ]
        }
    }
];



