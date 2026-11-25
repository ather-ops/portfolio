import { ArrowUpRight } from "lucide-react";
import { Kicker, Reveal } from "./ui";

const notes = [
  {
    title: "Turning 8,807 titles into semantic neighbours",
    tag: "RAG",
    tone: { background: "#f1e7ff", color: "#8e5bc9" },
    href: "https://github.com/ather-ops/Xpect-AI",
  },
  {
    title: "Five recommendations a merchant can defend",
    tag: "Agents",
    tone: { background: "#e4f1ff", color: "#4f8fc9" },
    href: "https://github.com/ather-ops/paypal-copilot",
  },
  {
    title: "Every gradient derived before the library call",
    tag: "ML",
    tone: { background: "#fff0dd", color: "#c7833f" },
    href: "https://github.com/ather-ops/Supervised-ML-from-scratch",
  },
  {
    title: "Two products in development, one approval gate",
    tag: "Studio",
    tone: { background: "#e9f8e3", color: "#5f9952" },
    href: "https://atherva-automations.vercel.app/",
  },
];

export default function Notes() {
  return (
    <section id="notes" className="aw-notes">
      <div className="aw-container">
        <Reveal>
          <div className="aw-notes-head">
            <div>
              <Kicker>Field notes</Kicker>
              <h2 className="aw-h2">
                Notes from
                <br />
                <em className="aw-italic">the build.</em>
              </h2>
            </div>
            <p className="aw-lead">
              Short, specific write-ups on retrieval, agents and shipping systems that stay up.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            {notes.map((note, i) => (
              <a key={note.title} href={note.href} target="_blank" rel="noreferrer" className="aw-note-row">
                <span className="aw-note-index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="aw-note-title">{note.title}</h3>
                <span className="aw-note-tag" style={note.tone}>
                  {note.tag}
                </span>
                <span className="aw-note-arrow">
                  <ArrowUpRight size={13} strokeWidth={1.7} />
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[10.5px] text-[var(--aw-muted)]">
              More commits than posts — the repositories are the long-form version.
            </p>
            <a
              href="https://github.com/ather-ops"
              target="_blank"
              rel="noreferrer"
              className="aw-btn aw-btn--light"
            >
              Browse the repositories <ArrowUpRight size={12} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
