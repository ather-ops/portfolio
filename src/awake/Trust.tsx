import { Crosshair, Eye, ShieldCheck, UserCheck } from "lucide-react";
import { Kicker, Reveal } from "./ui";

const rows = [
  {
    Icon: Crosshair,
    title: "Scope first",
    body: "Agents stay inside the brief — retrieval limits, tool allow-lists and graceful refusals.",
  },
  {
    Icon: UserCheck,
    title: "Human review where it matters",
    body: "Anything client-facing can pause for approval before it sends, books or publishes.",
  },
  {
    Icon: Eye,
    title: "Visible by default",
    body: "Source, prompts and eval cases are handed over. No black boxes, no lock-in.",
  },
  {
    Icon: ShieldCheck,
    title: "No fake proof",
    body: "No invented clients, borrowed logos or placeholder testimonials. If it isn’t live, it’s labelled.",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="aw-trust">
      <div className="aw-container aw-trust-grid">
        <Reveal className="aw-trust-left">
          <Kicker>How I work</Kicker>
          <h2 className="aw-h2">
            Your work.
            <br />
            Built on <em className="aw-italic">your terms.</em>
          </h2>
          <span className="aw-trust-badge">Open process</span>
        </Reveal>

        <div className="aw-trust-rows">
          {rows.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="aw-trust-row">
                <span className="aw-trust-icon">
                  <Icon size={13} strokeWidth={1.7} />
                </span>
                <div>
                  <h3 className="aw-trust-title">{title}</h3>
                  <p className="aw-trust-body">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
