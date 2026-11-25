import { ArrowUpRight, Lock } from "lucide-react";
import { CircleArrow, Kicker, Reveal } from "./ui";

const projects = [
  {
    name: "Xpect AI",
    meta: "Product · RAG",
    status: "Live",
    tint: "lav",
    image: "/img/projects/xpect.jpg",
    title: "Semantic search over 8,807 titles.",
    body: "Ask for a film in plain English. Get five grounded matches from a FAISS index, ranked by meaning.",
    tags: ["FAISS", "MiniLM", "Groq"],
    href: "https://x-ai-test.streamlit.app",
  },
  {
    name: "PayPal Copilot",
    meta: "Agentic RAG",
    status: "Live",
    tint: "blue",
    image: "/img/projects/paypal.jpg",
    title: "Dispute recommendations a human can defend.",
    body: "A three-agent copilot that retrieves policy, checks evidence and drafts the next best action.",
    tags: ["Agents", "RAG", "Streamlit"],
    href: "https://paypal-copilot-agenta.streamlit.app",
  },
  {
    name: "AMAZN AI",
    meta: "Multi-agent",
    status: "Live",
    tint: "green",
    image: "/img/projects/amazn.jpg",
    title: "Three tools, one routed answer.",
    body: "A router agent over product search, reviews and price tools, with memory held across turns.",
    tags: ["Router", "Tools", "Memory"],
    href: "https://amazn-agentic-ai.streamlit.app",
  },
];

const more = [
  {
    name: "PulseMesh",
    note: "Real-time signal intelligence",
    status: "Live",
    href: "https://pulsh-mesh.streamlit.app",
  },
  {
    name: "Hospital SQL",
    note: "Natural-language analytics",
    status: "Live",
    href: "https://hospital-management--agent.streamlit.app",
  },
  {
    name: "Atlas Agent",
    note: "Research agent · code only",
    status: "Paused",
  },
  {
    name: "Alerti Intelligence",
    note: "Alert triage for ops teams",
    status: "In development",
    href: "https://atherva-automations.vercel.app/alerti",
  },
  {
    name: "Marketify",
    note: "Go-to-market workspace",
    status: "In development",
    href: "https://atherva-automations.vercel.app/marketify",
  },
];

function statusClass(status: string) {
  if (status === "Paused") return "aw-status aw-status--paused";
  if (status === "In development") return "aw-status aw-status--dev";
  return "aw-status";
}

export default function Work() {
  return (
    <section id="work" className="aw-section">
      <div className="aw-container">
        <Reveal>
          <div className="aw-section-head">
            <Kicker>Selected work</Kicker>
            <h2 className="aw-h2">
              Systems shipped,
              <br />
              <em className="aw-italic">still running.</em>
            </h2>
            <p className="aw-lead">
              Three live builds below, plus the rest of the stack — every link goes somewhere real.
            </p>
          </div>
        </Reveal>

        <div className="aw-work-grid">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.08}>
              <article className={`aw-work-card aw-work-card--${project.tint}`}>
                <div className="aw-work-top">
                  <div>
                    <h3 className="aw-work-name">{project.name}</h3>
                    <p className="aw-work-meta">{project.meta}</p>
                  </div>
                  <span className="aw-status">Live</span>
                </div>

                <div className="aw-work-cover">
                  <img src={project.image} alt={`${project.name} project preview`} loading="lazy" />
                </div>

                <h4 className="aw-work-title">{project.title}</h4>
                <p className="aw-work-body">{project.body}</p>

                <div className="aw-work-bottom">
                  <div className="aw-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="aw-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={project.href} target="_blank" rel="noreferrer" className="aw-work-link">
                    Open live <CircleArrow tone="light" size={20} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="aw-more">
          {more.map((item, i) => {
            const content = (
              <>
                <span className="aw-more-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="aw-more-name">
                  {item.name}
                  <span className="aw-more-note">{item.note}</span>
                </span>
                <span className={statusClass(item.status)}>{item.status}</span>
                <span className="aw-more-arrow">
                  {item.href ? (
                    <ArrowUpRight size={13} strokeWidth={1.7} />
                  ) : (
                    <Lock size={11} strokeWidth={1.7} />
                  )}
                </span>
              </>
            );

            return item.href ? (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="aw-more-row"
              >
                {content}
              </a>
            ) : (
              <div key={item.name} className="aw-more-row">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
