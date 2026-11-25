import { ArrowUpRight } from "lucide-react";
import { CircleArrow, Kicker, Reveal } from "./ui";
import { caseStudies, featuredCases, otherCases } from "./projectData";

function statusClass(status: string) {
  if (status === "Paused") return "aw-status aw-status--paused";
  if (status === "Code" || status === "Case study" || status === "Ongoing")
    return "aw-status aw-status--dev";
  return "aw-status";
}

export default function Work() {
  return (
    <section id="work" className="aw-section aw-work">
      <div className="aw-container">
        <Reveal>
          <div className="aw-section-head">
            <Kicker>Selected work</Kicker>
            <h2 className="aw-h2">
              Systems shipped,
              <br />
              <em className="aw-italic">explained properly.</em>
            </h2>
            <p className="aw-lead">
              Three flagship systems below, then twelve more case studies. Every card opens a
              write-up: the problem, the build, what shipped and what comes next.
            </p>
          </div>
        </Reveal>

        <div className="aw-feature-grid">
          {featuredCases.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 0.07}
              className={project.tint === "dark" ? "aw-feature-span" : ""}
            >
              <a
                href={`#/work/${project.slug}`}
                className={`aw-feature-card aw-feature-card--${project.tint}`}
              >
                <div className="aw-feature-top">
                  <span className="aw-feature-index">{project.index}</span>
                  <span className={statusClass(project.status)}>{project.status}</span>
                </div>

                <div className="aw-feature-main">
                  <p className="aw-feature-category">{project.category}</p>
                  <h3 className="aw-feature-title">
                    {project.title} <em className="aw-italic">{project.accent}</em>
                  </h3>
                  <p className="aw-feature-summary">{project.summary}</p>
                </div>

                <div className="aw-feature-metrics">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className="aw-feature-bottom">
                  <span className="aw-feature-read">
                    Read case study <CircleArrow tone={project.tint === "dark" ? "light" : "dark"} size={22} />
                  </span>
                  <div className="aw-tags">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="aw-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="aw-index-head">
            <div>
              <Kicker>All case studies</Kicker>
              <h3 className="aw-index-title">
                Twelve more, <em className="aw-italic">all documented.</em>
              </h3>
            </div>
            <p className="aw-index-count">
              {caseStudies.length} projects · every one documented
            </p>
          </div>
        </Reveal>

        <div className="aw-project-grid">
          {otherCases.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.03, 0.2)}>
              <a
                href={`#/work/${project.slug}`}
                className={`aw-project-card aw-project-card--${project.tint}`}
              >
                <div className="aw-project-top">
                  <span className="aw-project-index">{project.index}</span>
                  <span className={statusClass(project.status)}>{project.status}</span>
                </div>
                <p className="aw-project-category">{project.category}</p>
                <h3 className="aw-project-title">
                  {project.title} <em className="aw-italic">{project.accent}</em>
                </h3>
                <p className="aw-project-summary">{project.summary}</p>
                <div className="aw-project-foot">
                  <div className="aw-tags">
                    {project.stack.slice(0, 2).map((tech) => (
                      <span key={tech} className="aw-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="aw-project-arrow">
                    <ArrowUpRight size={13} strokeWidth={1.7} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
