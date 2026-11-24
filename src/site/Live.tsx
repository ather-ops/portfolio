import { ArrowUpRight, Clock3, GitBranch, Sparkles } from "lucide-react";
import { liveApps } from "../data";
import { openUri, Reveal, SectionHead } from "./ui";

const marks = [
  { label: "X", tone: "bg-[#1d3fbf]" },
  { label: "P", tone: "bg-[#0f5c4a]" },
  { label: "A", tone: "bg-[#8a4a2a]" },
  { label: "M", tone: "bg-[#6b4bb0]" },
];

export default function Live() {
  return (
    <section id="live" className="px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            align="left"
            eyebrow="Live apps"
            title={
              <>
                Live, not{" "}
                <br />
                slideware.
              </>
            }
            sub="Nine deployments, seven public demos. Every button below opens the real thing."
            className="max-w-md"
          />

          <Reveal delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {marks.map((mark) => (
                  <span
                    key={mark.label}
                    className={`grid h-8 w-8 place-items-center rounded-full border-2 border-white text-[10px] font-semibold text-white ${mark.tone}`}
                  >
                    {mark.label}
                  </span>
                ))}
              </div>
              <div className="text-[10.5px] leading-tight text-[#7a766d]">
                <p className="font-semibold text-ink">9 deployments</p>
                <p>7 live demos · 1 paused</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {liveApps.map((app, index) => {
            const isLive = app.status === "Live";
            const isPaused = app.status === "Maintenance";
            return (
              <Reveal key={app.id} delay={(index % 3) * 0.04}>
                <article className="surface flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="display text-[24px] leading-none">{app.name}</h3>
                      <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9a958a]">
                        {app.kind}
                      </p>
                    </div>
                    <span
                      className={`mt-1 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] ${
                        isLive
                          ? "bg-[#eaf6ec] text-[#2d7a4a]"
                          : isPaused
                            ? "bg-[#fdf1e3] text-[#a5672c]"
                            : "bg-[#eef1fb] text-[#3b56a8]"
                      }`}
                    >
                      <span
                        className={`h-1 w-1 rounded-full ${
                          isLive ? "bg-[#2d7a4a]" : isPaused ? "bg-[#a5672c]" : "bg-[#3b56a8]"
                        }`}
                      />
                      {isPaused ? "Paused" : "Live"}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-3 text-[11px] leading-relaxed text-[#6d6a62]">
                    {app.blurb}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {app.stack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#eee9df] px-2 py-0.5 text-[8.5px] text-[#7a766d]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                    {isLive ? (
                      <a
                        href={app.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-ink hover:gap-1.5"
                      >
                        {app.name === "Atherva Automations" ? "Open site" : "Open app"}
                        <ArrowUpRight size={11} />
                      </a>
                    ) : (
                      <span className="text-[10.5px] font-medium text-[#a5672c]">
                        Paused — code only
                      </span>
                    )}

                    {app.repo ? (
                      <a
                        href={app.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#8a867d] hover:text-ink"
                      >
                        <GitBranch size={11} /> Code
                      </a>
                    ) : null}

                    {app.extra ? (
                      <a
                        href={app.extra.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#8a867d] hover:text-ink"
                      >
                        {app.extra.label} <ArrowUpRight size={10} />
                      </a>
                    ) : null}
                  </div>

                  {app.sleeps ? (
                    <p className="mt-3 flex items-center gap-1 text-[9px] text-[#b0aa9e]">
                      <Clock3 size={9} /> Wakes on first visit (~20s)
                    </p>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10.5px] text-[#9a958a]">
            Streamlit Community Cloud apps sleep after inactivity. Atlas Agent is paused while it is rebuilt.
          </p>
          <button type="button" onClick={openUri} className="btn-outline">
            <Sparkles size={13} /> Ask URI for the links
          </button>
        </div>
      </div>
    </section>
  );
}
