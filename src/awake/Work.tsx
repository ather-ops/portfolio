import { Kicker, Reveal } from "./ui";
import { caseStudies, featuredCases, otherCases } from "./projectData";
import { Ticket } from "./ticket";

const TOTAL = String(caseStudies.length).padStart(2, "0");

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
              <Ticket project={project} total={TOTAL} large />
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
              <Ticket project={project} total={TOTAL} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
