import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Accordion, type AccordionItem, Reveal } from "./ui";

const items: AccordionItem[] = [
  {
    title: "RAG & semantic search",
    meta: "Retrieval",
    body: "384-dim all-MiniLM-L6-v2 embeddings, FAISS indexes and prompts that refuse to answer outside the retrieved context.",
    bullets: ["8,807 titles indexed for Xpect AI", "Policy retrieval for PayPal Copilot", "PDF, SQL and document corpora"],
  },
  {
    title: "Agentic automation",
    meta: "Agents",
    body: "Groq function-calling loops and smolagents CodeAgents that route tools, chain results and fail gracefully under timeouts.",
    bullets: ["Three-tool allowlist on PayPal", "Read-only Sheets order lookup", "Retries, timeouts and a fallback agent"],
  },
  {
    title: "Applied ML & data",
    meta: "Foundations",
    body: "Classical algorithms written in NumPy before scikit-learn, plus SQL analytics and dashboards that answer a business question.",
    bullets: ["Ridge matching scikit-learn to MSE 0.4598", "Trees and forests from scratch", "Hospital SQL reporting app"],
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="px-5 pb-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <Reveal>
            <span className="eyebrow">Use cases</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-[40px] leading-[0.98] sm:text-[50px]">
              Built for{" "}
              <br />
              every layer
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[280px] text-[12.5px] leading-relaxed text-[#6d6a62]">
              Retrieval, agents and applied ML — the three layers every AI product needs, each one
              shipped rather than described.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="#contact" className="btn-dark mt-6">
              Talk about a build <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="surface p-2.5">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden rounded-[22px] sm:min-h-[330px]">
                <img
                  src="/img/orange-bloom.jpg"
                  alt="A single orange poppy on a cream background"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="pill absolute bottom-3 left-3 bg-white/90 backdrop-blur">
                  Three layers · one system
                </span>
              </div>
              <div className="flex h-full flex-col p-1 sm:p-2">
                <Accordion items={items} open={open} setOpen={setOpen} />
                <p className="mt-auto px-2 pt-3 text-[9.5px] leading-relaxed text-[#a9a397]">
                  Each layer has shipped: Xpect AI for retrieval, PayPal Copilot for agents,
                  Hospital Management SQL for data.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
