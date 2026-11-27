import { BarChart3, Bot, Brain, Search, Workflow } from "lucide-react";
import { Kicker, Reveal } from "./ui";

/* Five capabilities, fanned out from a large centre card the way a hand of
   cards fans in the reference: each step out drops lower and crops at the
   section's edge, so the deck reads as one object rising from the fold. */
const services = [
  { label: "Agentic AI", note: "Tool-using agents with real guardrails.", tint: "crimson", Icon: Bot, step: 3 },
  { label: "Applied ML", note: "Models built from first principles.", tint: "sage", Icon: Brain, step: 2 },
  {
    label: "RAG & Search",
    note: "Retrieval that cites what it used — 15 shipped systems.",
    tint: "pink",
    Icon: Search,
    step: 0,
    centre: true,
  },
  { label: "Automation", note: "Workflows that run without you.", tint: "cobalt", Icon: Workflow, step: 1 },
  { label: "Data Intelligence", note: "SQL and analytics that answer.", tint: "violet", Icon: BarChart3, step: 4 },
];

export default function Services() {
  return (
    <section id="services" className="aw-services">
      <div className="aw-container">
        <Reveal>
          <div className="aw-deck-head">
            <Kicker>Capabilities</Kicker>
            <h2 className="aw-h2">
              Where engineering
              <br />
              meets <em className="aw-italic">craft.</em>
            </h2>
            <p className="aw-deck-sub">
              Five things I do end to end — retrieval, agents, applied ML, automation and the data
              underneath them.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="aw-container aw-deck-wrap">
        <Reveal delay={0.05}>
          <ul className="aw-deck">
            {services.map(({ label, note, tint, Icon, step, centre }, i) => (
              <li
                key={label}
                className={`aw-deck-card aw-deck-card--${tint}${centre ? " is-centre" : ""}`}
                style={{ ["--step" as string]: `${step * 34}px`, ["--i" as string]: i }}
              >
                <span className="aw-deck-top">
                  <Icon size={centre ? 20 : 17} strokeWidth={1.6} />
                  <span className="aw-deck-index">{String(i + 1).padStart(2, "0")}</span>
                </span>

                <span className="aw-deck-foot">
                  <span className="aw-deck-label">{label}</span>
                  <span className="aw-deck-note">{note}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="aw-container">
        <Reveal delay={0.12}>
          <p className="aw-stack-line">Python · FAISS · FastAPI · Groq · Streamlit · Vercel</p>
        </Reveal>
      </div>
    </section>
  );
}
