import { BarChart3, Bot, Brain, Search, Workflow } from "lucide-react";
import { Kicker, Reveal } from "./ui";

const services = [
  { label: "RAG & Search", tint: "lav", Icon: Search },
  { label: "Agentic AI", tint: "pink", Icon: Bot },
  { label: "Applied ML", tint: "blue", Icon: Brain },
  { label: "Automation", tint: "peach", Icon: Workflow },
  { label: "Data Intelligence", tint: "green", Icon: BarChart3 },
];

export default function Services() {
  return (
    <section id="services" className="aw-services">
      <div className="aw-container">
        <Reveal>
          <div className="aw-section-head">
            <Kicker>Capabilities</Kicker>
            <h2 className="aw-h2">
              Where engineering
              <br />
              meets <em className="aw-italic">craft.</em>
            </h2>
          </div>
        </Reveal>

        <div className="aw-service-grid">
          {services.map(({ label, tint, Icon }, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <article className={`aw-service-card aw-service-card--${tint}`}>
                <span className="aw-service-icon">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <span className="aw-service-label">{label}</span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="aw-stack-line">
            Python · FAISS · FastAPI · Groq · Streamlit · Vercel
          </p>
        </Reveal>
      </div>
    </section>
  );
}
