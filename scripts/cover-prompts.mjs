/**
 * Per-post image prompts for Nano Banana / Imagen 4.
 *
 * Aesthetic kept consistent across all posts so the journal feels cohesive:
 *   - Dark background near #0b080c with warm ink tones
 *   - Lavender/violet accent (~#c2a4ff) used sparingly as punctuation
 *   - Ivory cream highlights (~#f4ede0)
 *   - Editorial / magazine cover feel — abstract, conceptual, not literal screenshots
 *   - 16:9, cinematic, soft grain, generous negative space
 *
 * If you add a new post to blog.ts, add its slug + prompt here. Posts without
 * an entry get a generic editorial fallback derived from the title.
 */

const HOUSE_STYLE =
    "editorial magazine cover style, cinematic dark composition, deep ink-black background near #0b080c with warm undertones, " +
    "subtle film grain and faint paper texture, lavender violet accent #c2a4ff used sparingly as punctuation, " +
    "ivory cream #f4ede0 highlights, generous negative space, asymmetric composition, soft volumetric light, " +
    "no text, no watermark, no logos, no people's faces, refined, sophisticated, 16:9 aspect ratio, ultra high detail";

export const HOUSE_STYLE_TAIL = HOUSE_STYLE;

export const coverPrompts = {
    // ─── System Design series ───
    "reading-source-code-as-a-skill":
        "an open antique book floating in dark space, its pages dissolving into intricate glowing circuit-board traces and tiny constellations of code, soft ivory glow from the spine, conceptual",
    "postgres-storage-internals":
        "an architectural cross-section of stacked translucent data pages, geometric tablets layered with depth and shadow, blueprint precision, faint indexing lines connecting stacked layers",
    "why-redis-is-fast":
        "a single laser-thin beam of lavender light cutting cleanly through atmospheric haze in a vast empty hall, minimalist, focused, suggestive of a single thread of execution",
    "inside-kafka-distributed-log":
        "endless horizontal log lines stretching to a vanishing point, paper strips flowing in parallel through dark space, replicated forms slightly offset, sense of an append-only river",
    "vllm-continuous-batching":
        "abstract tokens or particles flowing through a pipeline of glowing portals, continuous stream rather than batched chunks, cinematic motion blur, GPU-warm light",
    "caching-patterns-real-traffic":
        "layered glass panels with refracted lavender light, depth and reflection between strata, suggestion of fast hot layer over slower cold layer underneath, architectural",
    "picking-a-queue":
        "an elegant branching path of luminous fibers diverging into four distinct directions, decision-tree feel, each branch with subtly different texture, calm and precise",
    "idempotency-and-dead-letters":
        "a single sealed envelope at center with subtle wax seal, surrounded by floating duplicate envelopes fading into shadow, suggestion of mail integrity and quiet drop-letters",
    "graceful-degradation-playbook":
        "a stone bridge fractured at one keystone but suspended by glowing threads, structural resilience, cinematic dawn light, sense of holding together under pressure",
    "monolith-to-services":
        "a massive monolithic obsidian block mid-fracture, splitting into smaller polished blocks that float apart, geological precision, dust and light particles between fragments",
    "frappe-erpnext-internals":
        "a technical schematic of interconnected geometric modules, blueprint-style line drawings overlaid on dark paper, exploded-view of a complex framework",

    // ─── Earlier original posts ───
    "rise-of-mcp-2026":
        "a single universal connector at center radiating glowing fibers outward to surrounding shadowed devices, suggestion of a USB-C of AI tools, conceptual and clean",
    "production-rag-beyond-demo":
        "a beam of soft light passing through translucent stacked documents, particles of relevant text catching the light, suggestion of retrieval and grounding",
    "go-vs-node-realtime-2026":
        "two parallel channels of flowing light in counterpoint, one disciplined steady stream and one rapid scattering, abstract dual rivers in dark space",
    "agentic-ai-workflows-2026":
        "a sleek silhouetted automaton mid-step, surrounded by floating tool icons orbiting like satellites, sense of decision and motion in dark editorial space",
    "modern-data-stack-2026":
        "rapids of fast clear water cascading over geometric stones, contrasted with murky stagnant pool below, minimalist allegory of fast vs slow data tooling",
    "vector-db-comparison-2026":
        "a constellation of glowing points connected by faint lines in deep n-dimensional space, with four distinct cluster regions implying four database options, cosmic and precise",
    "nextjs-15-app-router-patterns":
        "a translucent boundary line dividing dark space, with one side showing crystalline server-rendered geometry and the other showing fluid client interaction patterns",
    "freelance-developer-ai-toolkit":
        "a refined wooden workshop table from above, scattered with sleek modern tools made of glass and metal, soft warm overhead light, sense of craft",
    "websockets-at-scale-pbsi":
        "a network of glowing nodes pulsing in synchrony, packets traveling between them as small bright comets, dark editorial space, real-time energy",
    "prototype-to-production-llm":
        "a polished prototype object inside a glass display case, evolving into a robust industrial-scale machine on the right, sense of transformation across stages"
};

/**
 * Generate a complete prompt for a given post.
 * If `slug` has no curated entry, falls back to a generic prompt derived
 * from the title and primary tag.
 */
export function buildPrompt({ slug, title, tags }) {
    const concept = coverPrompts[slug];
    if (concept) {
        return `${concept}, ${HOUSE_STYLE}`;
    }
    // Generic fallback
    const topic = (tags && tags[0]) || "engineering";
    return `abstract editorial illustration evoking ${topic} and the idea of "${title}", conceptual, no literal screenshots, ${HOUSE_STYLE}`;
}
