import { uriFallbackChips, uriIntro, uriKnowledge, type UriEntry } from "./uriKnowledge";

export type UriLink = { label: string; href: string };

export type UriReply = {
  id: string;
  scope: string;
  text: string;
  chips: string[];
  link?: UriLink;
  links?: UriLink[];
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
    scope: "Ather Sama's assistant",
    text:
      "Hi — I'm URI, Ather Sama's assistant. I run entirely in your browser, and I only answer from his CV, GitHub and Atherva facts: projects, live app links, the startup, stack, achievements, education, contact and availability.\n\nAsk me anything — including \"show me the best project\" or \"give me the app links\" — or start with a suggestion below.",
    chips: ["What is Atherva?", "Which apps are live?", "What is his best project?", "Is he available?"],
  };
}

function helpReply(): UriReply {
  return {
    id: "help",
    scope: "Ather Sama's assistant",
    text:
      "I can answer almost anything about Ather, with links where they exist:\n\n• Projects — PayPal Copilot, Amazn AI, Xpect AI, PulseMesh, Atlas Agent, ML from scratch, SQL and analytics\n• Live apps — all nine deployments, with direct demo links and which ones are asleep or under maintenance\n• Best project — ask \"which project should I open first?\" and I'll pick one and justify it\n• Startup — Atherva Automations, its services, and the products Alerti and Marketify\n• Skills — languages, ML, RAG, agents, APIs and tooling\n• Proof — Amazon ML Summer School, Since AI Hackathon, Tata/Forage, GitHub contributions, LeetCode\n• Education, courses, availability, location and contact details\n\nNo API key, no network call — just structured answers from the CV, GitHub and Atherva.",
    chips: uriFallbackChips,
  };
}

function nudgeReply(): UriReply {
  return {
    id: "smalltalk-nudge",
    scope: "Ather Sama's assistant",
    text:
      "I'm here — just say what you need.\n\nI can answer anything about Ather: the best project to open first, live app links, Atherva Automations, his stack, achievements, education, availability and contact details.",
    chips: ["What is his best project?", "Send me the app links", "What is Atherva?", "Is he available?"],
  };
}

function thanksReply(): UriReply {
  return {
    id: "thanks",
    scope: "Ather Sama's assistant",
    text: "Anytime. If you're hiring, the fastest route is peerather07@gmail.com or WhatsApp +91 91031-07882 — he usually replies within 24 hours.\n\nWant the short version? Ask \"what is his best project\" or \"send me the app links\".",
    chips: ["What is his best project?", "Send me the app links", "Is he available?"],
  };
}

function fallbackReply(): UriReply {
  return {
    id: "fallback",
    scope: "Ather Sama's assistant",
    text:
      "That one isn't in the Ather Sama knowledge base — CV, GitHub and Atherva facts — so I won't guess.\n\nI can answer questions about his projects (PayPal Copilot, Amazn AI, Xpect AI, PulseMesh, Atlas Agent), live app links, his startup Atherva Automations and its products Alerti and Marketify, his stack (Python, FAISS, SentenceTransformers, Groq, smolagents, scikit-learn), his achievements (Amazon ML Summer School, Since AI Hackathon), education, GitHub numbers, availability and contact details.\n\nTry naming a project, the startup, a skill, or ask for the best project or the app links.",
    chips: uriFallbackChips,
  };
}

export function generateIntro(): UriReply {
  return {
    id: "welcome",
    scope: "Ather Sama's assistant",
    text: uriIntro,
    chips: ["What is Atherva?", "Which apps are live?", "What is his best project?", "Is he available?"],
  };
}

function howAreYouReply(): UriReply {
  return {
    id: "smalltalk-how-are-you",
    scope: "URI",
    text:
      "Doing well — I'm a local assistant, so no bad days and no API bills.\n\nI'm here to answer anything about Ather: projects, live app links, Atherva Automations, the stack, achievements, availability or contact details. What do you want to know?",
    chips: ["What is his best project?", "Which apps are live?", "What is Atherva?", "Is he available?"],
  };
}

function byeReply(): UriReply {
  return {
    id: "smalltalk-bye",
    scope: "URI",
    text:
      "Goodbye — thanks for reading. If you want the fastest route back: the live apps and Atherva links are in the Live apps section, and email is peerather07@gmail.com.\n\nI'll be floating in the corner if you think of another question.",
    chips: ["Send me the app links", "Contact details", "What is his best project?"],
  };
}

function identityReply(): UriReply {
  return {
    id: "smalltalk-identity",
    scope: "URI",
    text:
      "I'm URI — a deterministic, in-browser assistant built by Ather for this portfolio. No LLM API, no network call: I match your question against a structured knowledge base and stream the answer back.\n\nThat means I'm honest about limits: I only know the CV, GitHub and Atherva facts. Ask me about a project, the startup or the app links.",
    chips: ["What can you answer?", "What is Atherva?", "Which apps are live?"],
  };
}

function jokeReply(): UriReply {
  return {
    id: "smalltalk-joke",
    scope: "URI",
    text:
      "I'm built for facts, not punchlines — but here's a true one: a 384-dimension embedding of 8,807 film titles can find your next watch without knowing a single genre label.\n\nIf you want the actually impressive version, ask me for the best project or the live links.",
    chips: ["What is his best project?", "Send me the app links", "Tell me about Xpect AI"],
  };
}

/** Local, deterministic retrieval over the résumé knowledge base. */
export function askUri(rawQuery: string): UriReply {
  const query = normalize(rawQuery);
  if (!query) return nudgeReply();

  // Bare ellipses, punctuation or "hmm"-style filler still get a friendly prompt.
  if (/^[.\-–—'\/+#]+$/.test(query)) return nudgeReply();
  if (/^h+m+$/.test(query)) return nudgeReply();

  const rawTokens = query.split(" ").filter(Boolean);
  const short = rawTokens.length <= 8;
  const isGreeting =
    rawTokens.length <= 4 &&
    /^(h+i+y*a*|h+ey+a+|h+y+|hey+|heyy+|h+e+l+o+|h+l+o+|hallo|h+o+|y+o+|hola|howdy|sup|wassup|namaste|namaskar|namastey|good (morning|afternoon|evening)|salaam|assalam|greetings)\b/.test(
      query
    );

  if (isGreeting) return introReply();
  if (/^(how are you|how're you|how are things|how is it going|how's it going|how you doing|you good|how do you do|whats up|what's up|wassup)\b/.test(query)) {
    return howAreYouReply();
  }
  if (/^(bye|byee|goodbye|good bye|see ya|see you|later|good ?night|gn)\b/.test(query) && rawTokens.length <= 5) {
    return byeReply();
  }
  if (/(are you (a |an )?(real|human|ai|bot|robot)|who (made|built|created) you|are you (chatgpt|gpt|claude)|what model)/.test(query) && short) {
    return identityReply();
  }
  if (/(tell me a joke|joke|make me laugh|something funny)/.test(query) && short) {
    return jokeReply();
  }
  if (/^(thanks|thank you|thx|cheers|great|nice|awesome|perfect|cool)\b/.test(query) && rawTokens.length <= 5) {
    return thanksReply();
  }
  if (
    /(what can you (do|answer)|what can uri (do|answer)|how can you help|what do you know|help|topics|who are you|your name)/.test(
      query
    ) &&
    rawTokens.length <= 8
  ) {
    return helpReply();
  }
  if (/^(what is|whats) (this|uri)$/.test(query)) return introReply();
  if (/^what are you$/.test(query)) return helpReply();
  if (/^uri$/.test(query)) return helpReply();
  if (/^(ok|okay|k|cool|nice|got it|i see)\b/.test(query) && rawTokens.length <= 2) {
    return {
      id: "smalltalk-ack",
      scope: "URI",
      text: "Got it. Ask me anything else — or jump straight to the strongest project, the live links or Atherva.",
      chips: ["What is his best project?", "Send me the app links", "What is Atherva?"],
    };
  }

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
    links: best.links,
  };
}

export const uriSuggestions = uriFallbackChips;
