import { uriFallbackChips, uriIntro, uriKnowledge, type UriEntry } from "./uriKnowledge";

export type UriReply = {
  id: string;
  scope: string;
  text: string;
  chips: string[];
  link?: { label: string; href: string };
};

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "do", "does", "did", "of", "to", "in", "on", "for",
  "and", "or", "his", "her", "he", "she", "him", "you", "your", "me", "my", "it", "its", "that",
  "this", "with", "about", "tell", "give", "show", "please", "can", "could", "would", "will",
  "what", "which", "who", "how", "why", "when", "where", "any", "some", "have", "has", "had",
  "i", "we", "us", "they", "them", "at", "by", "from", "as", "be", "been", "being", "there",
  "here", "also", "just", "so", "if", "then", "than", "get", "got", "much", "many", "more", "most",
]);

const SYNONYMS: Record<string, string[]> = {
  tech: ["skills"],
  technology: ["skills"],
  technologies: ["skills"],
  stack: ["skills"],
  knows: ["skills"],
  know: ["skills"],
  knowledge: ["skills"],
  tools: ["skills"],
  proficient: ["skills"],
  built: ["projects"],
  build: ["projects"],
  builds: ["projects"],
  building: ["projects"],
  shipped: ["projects"],
  ship: ["projects"],
  repos: ["github", "repositories"],
  repo: ["github", "repositories"],
  cv: ["resume"],
  resumé: ["resume"],
  employ: ["experience"],
  employed: ["experience"],
  employment: ["experience"],
  worked: ["experience"],
  work: ["projects", "experience"],
  intern: ["internship"],
  interns: ["internship"],
  hiring: ["hire", "availability"],
  available: ["availability"],
  opening: ["availability"],
  openings: ["availability"],
  opportunity: ["availability"],
  opportunities: ["availability"],
  recruit: ["hire", "availability"],
  remote: ["remote", "availability"],
  relocate: ["relocate", "availability"],
  movies: ["movie"],
  films: ["film", "movie"],
  agents: ["agent"],
  embeddings: ["embedding"],
  vectors: ["vector"],
  rag: ["retrieval"],
  vectors_db: ["faiss"],
  scores: ["marks"],
  grades: ["marks"],
  gpa: ["marks"],
  degree: ["education"],
  university: ["education"],
  college: ["education"],
  hackathons: ["hackathon"],
  certifications: ["certification"],
  certificates: ["certification"],
  contact: ["email"],
  reached: ["reach"],
  mail: ["email"],
  tele: ["phone"],
};

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/,/g, "")
    .replace(/[^a-z0-9+#./\s'-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stem(word: string): string {
  if (word.length > 4 && word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.length > 4 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

type Tokenized = {
  /** Words the visitor actually typed (plus stems). Strong signal. */
  direct: Set<string>;
  /** Canonical words pulled in through the synonym map. Weak signal. */
  expanded: Set<string>;
};

function tokenize(input: string): Tokenized {
  const base = normalize(input)
    .split(" ")
    .map((t) => t.replace(/^['-]+|['-]+$/g, ""))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));

  const direct = new Set<string>();
  const expanded = new Set<string>();
  for (const token of base) {
    direct.add(token);
    direct.add(stem(token));
    for (const syn of SYNONYMS[token] ?? []) {
      expanded.add(syn);
      expanded.add(stem(syn));
    }
  }
  return { direct, expanded };
}

/** How many entries each single-word keyword appears in — rare words are stronger evidence. */
const KEYWORD_FREQ = (() => {
  const freq = new Map<string, number>();
  for (const entry of uriKnowledge) {
    const seen = new Set<string>();
    for (const keyword of entry.keywords) {
      const normalized = normalize(keyword);
      if (!normalized || normalized.includes(" ") || seen.has(normalized)) continue;
      seen.add(normalized);
      freq.set(normalized, (freq.get(normalized) ?? 0) + 1);
    }
  }
  return freq;
})();

function specificity(keyword: string): number {
  const count = KEYWORD_FREQ.get(keyword) ?? 1;
  if (count === 1) return 0.18;
  if (count === 2) return 0.06;
  return 0;
}

function scoreEntry(entry: UriEntry, query: string, tokens: Tokenized): number {
  let score = 0;

  for (const rawKeyword of entry.keywords) {
    const keyword = normalize(rawKeyword);
    if (!keyword) continue;

    if (keyword.includes(" ")) {
      if (query.includes(keyword)) score += 8 + Math.min(keyword.length / 10, 2.5);
      continue;
    }

    // Typed words count fully; synonym expansions only nudge.
    if (tokens.direct.has(keyword)) {
      score += 2.6 + specificity(keyword);
      continue;
    }

    if (tokens.expanded.has(keyword)) {
      score += 0.9;
      continue;
    }

    // Light fuzzing: plural / suffix drift on longer words the visitor typed.
    // Skip when the stem already matched directly, otherwise "roles" double-counts "role".
    const stemAlreadyMatched = tokens.direct.has(stem(keyword));
    const close = !stemAlreadyMatched && [...tokens.direct].some(
      (token) =>
        token.length >= 4 &&
        keyword.length >= 4 &&
        (token.startsWith(keyword) || keyword.startsWith(token)) &&
        Math.abs(token.length - keyword.length) <= 3
    );
    if (close) score += 1;
    else if (keyword.length >= 5 && query.includes(keyword)) score += 1.1;
  }

  return score;
}

function introReply(): UriReply {
  return {
    id: "intro",
    scope: "Résumé assistant",
    text:
      "I'm URI — this portfolio's résumé assistant. I run entirely in your browser, and I only answer from Ather's CV, GitHub and Atherva facts: projects, live apps, the startup, stack, achievements, contact and availability.\n\nAsk me anything, or start with one of the suggestions below.",
    chips: ["What is Atherva?", "Which apps are live?", "Tell me about PayPal Copilot", "Is he available?"],
  };
}

function helpReply(): UriReply {
  return {
    id: "help",
    scope: "Résumé assistant",
    text:
      "I can dig into:\n\n• Projects — PayPal Copilot, Amazn AI, Xpect AI, PulseMesh, Atlas Agent, ML from scratch, SQL and analytics work\n• Live apps — all nine deployments, with links and which ones are asleep or under maintenance\n• Startup — Atherva Automations, its services, and the products Alerti and Marketify\n• Skills — languages, ML, RAG, agents, APIs and tooling\n• Proof — Amazon ML Summer School, Since AI Hackathon, Tata/Forage, GitHub contributions, LeetCode\n• Education, courses, availability, location and contact details\n\nNo API key, no network call — just structured answers from the CV, GitHub and Atherva.",
    chips: uriFallbackChips,
  };
}

function thanksReply(): UriReply {
  return {
    id: "thanks",
    scope: "Résumé assistant",
    text: "Anytime. If you're hiring, the fastest route is peerather07@gmail.com or WhatsApp +91 91031-07882 — he usually replies within 24 hours.",
    chips: ["Is he available?", "Contact details", "Show the projects"],
  };
}

function fallbackReply(): UriReply {
  return {
    id: "fallback",
    scope: "Résumé assistant",
    text:
      "That one isn't on the résumé, so I won't guess.\n\nI can answer questions about his projects (PayPal Copilot, Amazn AI, Xpect AI, PulseMesh, Atlas Agent), the live apps, his startup Atherva Automations and its products Alerti and Marketify, his stack (Python, FAISS, SentenceTransformers, Groq, smolagents, scikit-learn), his achievements (Amazon ML Summer School, Since AI Hackathon), education, GitHub numbers, availability and contact details.\n\nTry naming a project, the startup or a skill.",
    chips: uriFallbackChips,
  };
}

export function generateIntro(): UriReply {
  return {
    id: "welcome",
    scope: "Résumé assistant",
    text: uriIntro,
    chips: ["What is Atherva?", "Which apps are live?", "Tell me about PayPal Copilot", "Is he available?"],
  };
}

/** Local, deterministic retrieval over the résumé knowledge base. */
export function askUri(rawQuery: string): UriReply {
  const query = normalize(rawQuery);
  if (!query) return helpReply();

  const rawTokens = query.split(" ").filter(Boolean);
  const isGreeting =
    rawTokens.length <= 4 &&
    /^(hi|hey|hello|yo|hola|namaste|good (morning|evening|afternoon)|salaam|assalam)/.test(query);

  if (isGreeting) return introReply();
  if (/^(thanks|thank you|thx|cheers|great|nice|awesome|perfect|cool)\b/.test(query) && rawTokens.length <= 5) {
    return thanksReply();
  }
  if (
    /(what can you (do|answer)|how can you help|what do you know|help|topics|who are you|what are you|your name|uri)/.test(
      query
    ) &&
    rawTokens.length <= 8
  ) {
    return helpReply();
  }
  if (/^(what is|whats) (this|uri)\b/.test(query)) return introReply();

  const tokens = tokenize(rawQuery);
  let best: UriEntry | null = null;
  let bestScore = 0;

  for (const entry of uriKnowledge) {
    const score = scoreEntry(entry, query, tokens);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore < 2.4) return fallbackReply();

  return {
    id: best.id,
    scope: best.scope,
    text: best.answer,
    chips: best.chips ?? uriFallbackChips,
    link: best.link,
  };
}

export const uriSuggestions = uriFallbackChips;
