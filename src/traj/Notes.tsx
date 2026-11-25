import { ArrowUpRight } from "lucide-react";
import { insights } from "../data";
import { Label, Reveal } from "./ui";

const extra = {
  kicker: "Atherva",
  title: "Two products in development, one approval gate",
  href: "https://atherva-automations.vercel.app/",
};

export default function Notes() {
  const notes = [
    ...insights.map((note) => ({ kicker: note.kicker, title: note.title, href: note.href })),
    extra,
  ];

  return (
    <section id="notes" className="px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Label light>Field notes</Label>
              <h2 className="tj-display mt-4 text-[36px] leading-[1.02] text-[var(--tj-cream)] sm:text-[48px]">
                Notes from the build.
              </h2>
            </div>
            <p className="tj-serif hidden max-w-[280px] text-right text-[15px] leading-[1.3] text-[rgba(248,249,233,0.56)] sm:block">
              Short write-ups on retrieval, agents and shipping systems that stay up.
            </p>
          </div>
        </Reveal>

        <div className="mt-9 border-t border-[rgba(248,249,233,0.16)]">
          {notes.map((note, index) => (
            <Reveal key={note.title} delay={index * 0.04}>
              <a
                href={note.href}
                target={note.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group grid grid-cols-[26px_1fr_auto] items-center gap-3 border-b border-[rgba(248,249,233,0.14)] py-5 sm:grid-cols-[42px_1fr_auto] sm:gap-5 sm:py-6"
              >
                <span className="tj-label tj-label--light text-[9px]">0{index + 1}</span>
                <div className="min-w-0">
                  <span className="tj-pill tj-pill--mint mb-2 inline-block">{note.kicker}</span>
                  <h3 className="tj-display text-[20px] leading-[1.12] text-[var(--tj-cream)] transition-colors group-hover:text-[var(--tj-peach)] sm:text-[26px]">
                    {note.title}
                  </h3>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(248,249,233,0.24)] text-[var(--tj-cream)] transition group-hover:border-[var(--tj-peach)] group-hover:bg-[var(--tj-peach)] group-hover:text-[var(--tj-navy)] sm:h-10 sm:w-10">
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="tj-serif text-[15px] text-[rgba(248,249,233,0.54)]">
              More commits than posts — the repositories are the long-form version.
            </p>
            <a
              href="https://github.com/ather-ops"
              target="_blank"
              rel="noreferrer"
              className="tj-btn tj-btn--light tj-btn--sm"
            >
              Browse the repositories <ArrowUpRight size={12} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
