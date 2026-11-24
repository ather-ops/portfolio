import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Label, Reveal, StarMark } from "./ui";

type Card = {
  name: string;
  status: string;
  meta: string;
  body: string;
  cover: string;
  coverAlt: string;
  contain?: boolean;
  tags: string[];
  href: string;
  cta: string;
  bg: string;
  nameClass?: string;
};

const cards: Card[] = [
  {
    name: "Xpect AI",
    status: "Live",
    meta: "RAG · semantic search",
    body: "Ask for a film in plain English. Five grounded matches from 8,807 titles, answered from the retrieved context.",
    cover: "/img/projects/xpect.jpg",
    coverAlt: "Xpect AI cover art on graph paper",
    tags: ["FAISS", "MiniLM", "Groq"],
    href: "https://x-ai-test.streamlit.app/",
    cta: "Open demo",
    bg: "#f6ddc7",
    nameClass: "tj-serif text-[32px]",
  },
  {
    name: "PayPal Copilot",
    status: "Live",
    meta: "Agentic · fintech",
    body: "A dispute agent that pulls the case, retrieves policy guidance and returns one of five recommendations for a human to review.",
    cover: "/img/projects/paypal.jpg",
    coverAlt: "PayPal Copilot cover on a peach and lilac gradient",
    tags: ["PayPal API", "FAISS", "Groq"],
    href: "https://paypal-copilot-agenta.streamlit.app/",
    cta: "Open demo",
    bg: "#dfece2",
    nameClass: "tj-serif text-[32px]",
  },
  {
    name: "Amazn AI",
    status: "Live",
    meta: "Flagship · multi-tool",
    body: "A multi-tool agent that routes each question to product RAG, support RAG or a live order lookup, then chains the answer.",
    cover: "/img/projects/amazn.jpg",
    coverAlt: "Amazn AI cover with a green glow",
    tags: ["smolagents", "Google Sheets", "Groq"],
    href: "https://amazn-agentic-ai.streamlit.app/",
    cta: "Open demo",
    bg: "#e0d9ee",
    nameClass: "tj-display text-[27px] font-semibold tracking-[-0.04em]",
  },
  {
    name: "Alerti Intelligence",
    status: "In development",
    meta: "Atherva · catalogue monitoring",
    body: "Watches public Shopify catalogues for price, stock and product changes — with scheduled summaries in Telegram.",
    cover: "/img/logos/alerti.webp",
    coverAlt: "Alerti Intelligence blue glass arrow mark",
    contain: true,
    tags: ["Shopify", "Telegram", "Alerts"],
    href: "https://atherva-automations.vercel.app/alerti",
    cta: "Read the plan",
    bg: "#e5edf7",
    nameClass: "tj-serif text-[26px] sm:text-[30px]",
  },
  {
    name: "Marketify",
    status: "Planned",
    meta: "Atherva · multi-agent marketing",
    body: "Research, strategy, content and campaigns with a human approval gate before anything publishes.",
    cover: "/img/logos/marketify.webp",
    coverAlt: "Marketify blue glass M mark",
    contain: true,
    tags: ["Python", "FastAPI", "PostgreSQL"],
    href: "https://atherva-automations.vercel.app/marketify",
    cta: "Read the plan",
    bg: "#f7f0d7",
    nameClass: "tj-serif text-[28px] sm:text-[32px]",
  },
];

export default function Featured() {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (direction: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".tj-rail-card");
    const step = card ? card.offsetWidth + 14 : 400;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const goTo = (index: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    const left =
      card.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    setActive(index);
    el.scrollTo({ left, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    setActive(
      Math.min(cards.length - 1, Math.round((el.scrollLeft / max) * (cards.length - 1)))
    );
  };

  return (
    <section id="work" className="pb-20 pt-4 sm:pb-24">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Label>Selected deployments</Label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="grid h-8 w-8 place-items-center rounded-full border border-[var(--tj-line-strong)] text-[var(--tj-navy)] transition hover:bg-[var(--tj-paper)]"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="grid h-8 w-8 place-items-center rounded-full border border-[var(--tj-line-strong)] text-[var(--tj-navy)] transition hover:bg-[var(--tj-paper)]"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <Reveal delay={0.05}>
        <div
          ref={rail}
          onScroll={onScroll}
          className="tj-rail tj-feature-rail mt-5 flex gap-3.5 overflow-x-auto pb-2"
        >
          {cards.map((card, index) => (
            <article
              key={card.name}
              className="tj-card tj-rail-card relative flex h-[400px] w-[86vw] shrink-0 flex-col overflow-hidden p-5 sm:h-[430px] sm:w-[500px] sm:p-7 lg:w-[520px]"
              style={{ background: card.bg }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  {index > 2 && <StarMark size={14} className="text-[rgba(38,50,66,0.55)]" />}
                  <h3 className={`${card.nameClass ?? "tj-display text-[27px]"} leading-none`}>
                    {card.name}
                  </h3>
                </div>
                <span
                  className={`tj-pill ${
                    card.status === "Live" ? "tj-pill--mint" : "tj-pill--peach"
                  } bg-[rgba(255,254,249,0.5)]`}
                >
                  {card.status}
                </span>
              </div>
              <p className="tj-label mt-2">{card.meta}</p>

              <p className="tj-serif mt-4 max-w-[335px] text-[20px] leading-[1.2] text-[rgba(31,42,56,0.9)] sm:mt-5 sm:text-[22px]">
                {card.body}
              </p>

              <div className="mt-auto flex items-end justify-between gap-4 pt-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[rgba(38,50,66,0.18)] bg-[rgba(255,254,249,0.35)] px-2 py-0.5 tj-ui text-[9px] font-medium text-[rgba(38,50,66,0.66)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tj-btn tj-btn--light tj-btn--sm mt-4"
                  >
                    {card.cta} <ArrowUpRight size={12} />
                  </a>
                </div>

                <div className="relative h-[124px] w-[150px] shrink-0 overflow-hidden rounded-[4px] border border-[rgba(38,50,66,0.16)] sm:h-[142px] sm:w-[190px]">
                  {card.contain ? (
                    <div className="flex h-full w-full items-center justify-center bg-[rgba(255,254,249,0.55)]">
                      <img
                        src={card.cover}
                        alt={card.coverAlt}
                        className="h-[86%] w-[86%] object-contain drop-shadow-[0_10px_18px_rgba(20,50,110,0.22)]"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <img
                      src={card.cover}
                      alt={card.coverAlt}
                      className="tj-feature-cover h-full w-full"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <div className="mt-6 flex justify-center gap-1.5">
        {cards.map((card, index) => (
          <button
            key={card.name}
            type="button"
            aria-label={`Go to ${card.name}`}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              active === index ? "w-5 bg-[var(--tj-navy)]" : "w-1.5 bg-[rgba(38,50,66,0.22)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
