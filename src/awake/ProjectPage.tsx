import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { caseStudies, getCase } from "./projectData";
import Header from "./Header";
import { AwButton, CircleArrow, Kicker, Reveal } from "./ui";
import Cta from "./Cta";
import { CaseTicket } from "./ticket";

export default function ProjectPage({ slug }: { slug: string }) {
  const project = getCase(slug);

  if (!project) {
    return (
      <section className="aw-case-hero">
        <Header initialActive="#work" />
        <div className="aw-container aw-case-missing">
          <Kicker>404 · Case study</Kicker>
          <h1 className="aw-case-title">
            This page wasn’t <em className="aw-italic">shipped.</em>
          </h1>
          <p className="aw-case-lede">The project you’re looking for doesn’t exist — or it moved.</p>
          <AwButton href="#work" variant="dark">
            Back to all work
          </AwButton>
        </div>
      </section>
    );
  }

  const index = caseStudies.findIndex((item) => item.slug === project.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const first = project.links[0];
  const second = project.links[1];
  const extra = project.links.slice(2);

  return (
    <>
      <section className="aw-case-hero">
        <Header initialActive="#work" />

        <div className="aw-container">
          <a href="#work" className="aw-case-back">
            <ArrowLeft size={12} strokeWidth={1.8} /> All work
          </a>

          <div className="aw-case-head">
            <div>
              <Kicker>
                Case study {project.index} / {project.category}
              </Kicker>
              <h1 className="aw-case-title">
                {project.title} <em className="aw-italic">{project.accent}</em>
              </h1>
              <p className="aw-case-lede">{project.intro}</p>

              <div className="aw-case-actions">
                {!first && (
                  <AwButton href="#work" variant="dark" arrow={false}>
                    Back to all work
                  </AwButton>
                )}
                {first && (
                  <AwButton href={first.href} variant="dark" external>
                    {first.label}
                  </AwButton>
                )}
                {second && (
                  <AwButton href={second.href} variant="light" external arrow={false}>
                    {second.label}
                  </AwButton>
                )}
              </div>
            </div>

            <aside className="aw-case-aside">
              <CaseTicket project={project} total={String(caseStudies.length).padStart(2, "0")} />
            </aside>
          </div>
        </div>
      </section>

      <div className="aw-container aw-case-metrics">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="aw-case-metric">
            <span className="aw-case-metric-value">{metric.value}</span>
            <span className="aw-case-metric-label">{metric.label}</span>
          </div>
        ))}
      </div>

      <main id="project-content" className="aw-container aw-case-body">
        <div className="aw-case-main">
          <Reveal>
            <section className="aw-case-section">
              <Kicker>01 · The problem</Kicker>
              <h2>What needed to change.</h2>
              <p>{project.problem}</p>
            </section>
          </Reveal>

          <Reveal>
            <section className="aw-case-section">
              <Kicker>02 · The approach</Kicker>
              <h2>How it was built.</h2>
              <div className="aw-case-steps">
                {project.approach.map((step, i) => (
                  <div key={step.title} className="aw-case-step">
                    <span className="aw-case-step-num">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="aw-case-section">
              <Kicker>03 · What shipped</Kicker>
              <h2>The parts that exist.</h2>
              <ul className="aw-case-list">
                {project.shipped.map((item) => (
                  <li key={item}>
                    <span className="aw-case-check">
                      <Check size={11} strokeWidth={2.2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <blockquote className="aw-case-outcome">{project.outcome}</blockquote>
            </section>
          </Reveal>

          <Reveal>
            <section className="aw-case-section aw-case-section--next">
              <Kicker>04 · What’s next</Kicker>
              <h2>The honest next step.</h2>
              <p>{project.next}</p>
            </section>
          </Reveal>
        </div>

        <aside className="aw-case-side">
          <div className="aw-case-side-card">
            <p className="aw-kicker">Explore</p>
            <p className="aw-case-side-title">{project.name}</p>
            <p className="aw-case-side-body">
              {project.status === "Live"
                ? "A working system. Open the demo or read the code."
                : project.status === "Paused"
                  ? "The deployment is paused; the code is public."
                  : "Read the implementation and the decisions behind it."}
            </p>
            <div className="aw-case-side-links">
              {project.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ArrowUpRight size={11} />
                </a>
              ))}
              {project.links.length === 0 && <span>Case study — no public repository</span>}
            </div>
            <a href="#work" className="aw-case-side-all">
              All case studies <CircleArrow tone="dark" size={20} />
            </a>
          </div>
        </aside>
      </main>

      <section className="aw-container aw-case-next">
        <a href={`#/work/${next.slug}`} className="aw-case-next-card">
          <span className="aw-case-next-copy">
            <span className="aw-case-next-kicker">Next case study · {next.index}</span>
            <span className="aw-case-next-title">
              {next.title} <em className="aw-italic">{next.accent}</em>
            </span>
          </span>
          <span className="aw-case-next-arrow">
            <ArrowUpRight size={18} strokeWidth={1.6} />
          </span>
        </a>
      </section>

      <Cta />
    </>
  );
}
