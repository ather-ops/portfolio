import { ArrowUpRight, Check } from "lucide-react";
import { githubStats, profile, stats } from "../data";
import { ArrowLink, ArtTile, MockApp, Reveal, SectionHead } from "./ui";

export function StartHere() {
  return (
    <section id="start" className="bg-[#fbfaf7] px-5 py-24 sm:px-8 sm:py-28">
      <SectionHead
        eyebrow="Free to explore"
        title={
          <>
            Open the{" "}
            <br />
            strongest work
          </>
        }
        sub="Two places to start. No signup, no sales call — the demo is the pitch."
        className="max-w-md"
      />

      <div className="mx-auto mt-11 grid max-w-4xl gap-4 sm:grid-cols-2">
        <Reveal>
          <article className="surface group h-full p-2.5">
            <ArtTile tone="blue" className="h-52 rounded-[20px] sm:h-56">
              <MockApp variant="search" title="xpect.ai" />
            </ArtTile>
            <div className="px-4 pb-5 pt-6 text-center">
              <span className="pill">Best first look</span>
              <h3 className="display mt-3 text-[32px] leading-none">Xpect AI</h3>
              <p className="mx-auto mt-2.5 max-w-[240px] text-[11.5px] leading-relaxed text-[#6d6a62]">
                8,807 Netflix titles, 384-dim embeddings, FAISS top-5. Zero to deployed in 15 days.
              </p>
              <a
                href="https://x-ai-test.streamlit.app/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-ink transition group-hover:gap-1.5"
              >
                Open the demo <ArrowUpRight size={13} />
              </a>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="surface group h-full p-2.5">
            <ArtTile tone="cream" className="h-52 rounded-[20px] sm:h-56">
              <img
                src="/img/pearl.jpg"
                alt="A pearl-and-chrome abstract sculpture"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </ArtTile>
            <div className="px-4 pb-5 pt-6 text-center">
              <span className="pill">The company</span>
              <h3 className="display mt-3 text-[32px] leading-none">Atherva</h3>
              <p className="mx-auto mt-2.5 max-w-[240px] text-[11.5px] leading-relaxed text-[#6d6a62]">
                AI agents, automation and RAG for businesses — Alerti and Marketify in development.
              </p>
              <a
                href={profile.companyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-ink transition group-hover:gap-1.5"
              >
                Visit Atherva <ArrowUpRight size={13} />
              </a>
            </div>
          </article>
        </Reveal>
      </div>

      <div className="mt-8 text-center">
        <a href="#projects" className="btn-dark">
          See all six projects
        </a>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section id="about" className="px-4 pb-6 pt-2 sm:px-6">
      <div className="surface mx-auto max-w-6xl p-2.5 sm:p-3">
        <div className="grid gap-2.5 lg:grid-cols-2">
          <div className="relative min-h-[340px] overflow-hidden rounded-[24px] sm:min-h-[420px]">
            <img
              src="/img/crystal.jpg"
              alt="Translucent crystals on a violet gradient"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="pill absolute left-4 top-4 bg-white/90 backdrop-blur">
              Founder · Atherva Automations
            </span>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#160b2e]/55 to-transparent p-5 pt-16">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Since 2026 · India, remote-first
              </p>
              <p className="display mt-1 text-[22px] text-white">Beyond automation.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-4 py-8 sm:px-8 lg:px-12">
            <span className="eyebrow w-fit">Why this work</span>
            <h2 className="display mt-5 text-[40px] leading-[0.98] sm:text-[50px]">
              From notebook{" "}
              <br />
              to production.
            </h2>
            <p className="mt-4 max-w-sm text-[12.5px] leading-relaxed text-[#6d6a62]">
              {profile.subhead}
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Retrieval answers stay inside the retrieved context.",
                "Agents run behind allowlists, retries and fallback paths.",
                "Every build is deployed, documented and demoable.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[11.5px] text-[#57544d]">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink text-white">
                    <Check size={9} strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#eee9df] pt-5 text-[11px] text-[#7a766d]">
              <span>
                <strong className="font-semibold text-ink">{stats[0].value}</strong> deployments
              </span>
              <span>
                <strong className="font-semibold text-ink">{githubStats.repositories}</strong> public repos
              </span>
              <span>
                <strong className="font-semibold text-ink">{githubStats.stars}</strong> stars
              </span>
              <ArrowLink href="#playbook" className="ml-auto">
                Read the playbook
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const statTags = ["Live", "GitHub", "DSA", "Proof"];

export function Stats() {
  return (
    <section id="recognition" className="px-5 pb-24 pt-6 sm:px-8">
      <div className="mx-auto grid max-w-5xl gap-3.5 sm:grid-cols-2">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.05}>
            <div className="surface flex h-full min-h-[190px] flex-col p-7">
              <p className="display text-[44px] leading-none sm:text-[52px]">{stat.value}</p>
              <p className="display mt-3 text-[22px] leading-tight">{stat.label}</p>
              <p className="mt-2 max-w-[280px] text-[11.5px] leading-relaxed text-[#6d6a62]">
                {stat.hint}
              </p>
              <span className="pill mt-auto w-fit">{statTags[index]}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
