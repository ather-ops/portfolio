import { ArrowUpRight, GitBranch } from "lucide-react";
import { projects } from "../data";
import { ArtTile, MockApp, Reveal, SectionHead, type MockVariant } from "./ui";

const picks = [
  {
    project: projects[2],
    tone: "blue",
    variant: "search" as MockVariant,
    title: "Semantic search, grounded",
    copy: "Eight thousand titles, one search box. 384-dim embeddings and FAISS exact top-5, with answers held inside the retrieved context.",
  },
  {
    project: projects[0],
    tone: "mint",
    variant: "chat" as MockVariant,
    title: "A fintech agent with a leash",
    copy: "Reads live PayPal Sandbox disputes, retrieves policy guidance, and returns one of five structured recommendations for a human to approve.",
  },
  {
    project: projects[3],
    tone: "lavender",
    variant: "pulse" as MockVariant,
    title: "Many APIs, one response",
    copy: "Concurrent aiohttp calls with per-request timeouts and retries, normalised into a single FastAPI contract and a Streamlit dashboard.",
  },
];

export default function Systems() {
  return (
    <section id="work" className="px-5 py-24 sm:px-8">
      <SectionHead
        eyebrow="Systems"
        title={
          <>
            Three answers{" "}
            <br />
            to three problems
          </>
        }
        sub="Different layers, same rule: the model never gets the last word without a check."
        className="max-w-2xl"
      />

      <div className="mx-auto mt-10 max-w-6xl space-y-4">
        {picks.map((pick, index) => (
          <Reveal key={pick.project.name} delay={index * 0.04}>
            <article className="surface overflow-hidden p-2.5">
              <div className="grid gap-2.5 lg:grid-cols-2">
                <div
                  className={`flex flex-col justify-between px-4 py-7 sm:px-8 sm:py-10 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="pill">{`0${index + 1}`}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a867d]">
                        {pick.project.kind} · {pick.project.status}
                      </span>
                    </div>
                    <h3 className="display mt-4 text-[32px] leading-none sm:text-[40px]">
                      {pick.project.name}
                    </h3>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#9a958a]">
                      {pick.title}
                    </p>
                    <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-[#6d6a62]">
                      {pick.copy}
                    </p>
                  </div>

                  <div className="mt-7">
                    <div className="flex flex-wrap gap-1.5">
                      {pick.project.stack.slice(0, 4).map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      {pick.project.live ? (
                        <a
                          href={pick.project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink hover:gap-1.5"
                        >
                          Open live demo <ArrowUpRight size={13} />
                        </a>
                      ) : null}
                      <a
                        href={pick.project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7a766d] hover:text-ink"
                      >
                        <GitBranch size={12} /> Code
                      </a>
                    </div>
                  </div>
                </div>

                <ArtTile tone={pick.tone} className="min-h-[280px] rounded-[22px] sm:min-h-[340px]">
                  <MockApp variant={pick.variant} title={pick.project.name.toLowerCase()} />
                </ArtTile>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
