import { ArrowUpRight } from "lucide-react";
import { CircleArrow, StarMark } from "./ui";
import type { CaseStudy } from "./projectData";

/* A barcode with the phase pattern seeded from the slug, so each case differs. */
export function TicketCode({ seed }: { seed: string }) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 99991;

  return (
    <span
      className="aw-tk-code"
      aria-hidden="true"
      style={{
        backgroundPosition: `${hash % 7}px 0, ${(hash >> 4) % 5}px 100%`,
      }}
    />
  );
}

function statusDotClass(status: string) {
  return `aw-tk-dot aw-tk-dot--${status.toLowerCase().replace(" ", "-")}`;
}

function StubMeta({ project, total }: { project: CaseStudy; total: string }) {
  return (
    <div className="aw-tk-stub-meta">
      <div>
        <span className="aw-tk-stub-label">Status</span>
        <span className="aw-tk-stub-value">
          <i className={statusDotClass(project.status)} />
          {project.status}
        </span>
      </div>
      <div>
        <span className="aw-tk-stub-label">Year</span>
        <span className="aw-tk-stub-value">{project.year}</span>
      </div>
      <div>
        <span className="aw-tk-stub-label">Case</span>
        <span className="aw-tk-stub-value">
          {project.index}
          <span className="aw-tk-stub-of">/{total}</span>
        </span>
      </div>
    </div>
  );
}

/* Grid ticket — the card that opens a case study. */
export function Ticket({
  project,
  total,
  large = false,
}: {
  project: CaseStudy;
  total: string;
  large?: boolean;
}) {
  return (
    <a
      href={`#/work/${project.slug}`}
      className={`aw-tk aw-tk--${project.tint}${large ? " aw-tk--lg" : ""}`}
    >
      <div className="aw-tk-body">
        <div className="aw-tk-top">
          <span className="aw-tk-index">{project.index}</span>
          <span className="aw-tk-cat">{project.category}</span>
        </div>

        <h3 className="aw-tk-title">
          {project.title} <em className="aw-italic">{project.accent}</em>
        </h3>
        <p className="aw-tk-summary">{project.summary}</p>

        {large && (
          <div className="aw-tk-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="aw-tk-foot">
          {large ? (
            <span className="aw-tk-read">
              Read case study
              <CircleArrow tone={project.tint === "dark" ? "light" : "dark"} size={20} />
            </span>
          ) : (
            <div className="aw-tags">
              {project.stack.slice(0, 2).map((tech) => (
                <span key={tech} className="aw-tag">
                  {tech}
                </span>
              ))}
            </div>
          )}
          <span className="aw-tk-arrow">
            <ArrowUpRight size={large ? 15 : 13} strokeWidth={1.7} />
          </span>
        </div>
      </div>

      <div className="aw-tk-stub">
        <span className="aw-tk-stub-brand">
          <StarMark size={8} /> {large ? "Case study" : "Case"}
        </span>
        <StubMeta project={project} total={total} />
        <TicketCode seed={project.slug} />
      </div>
    </a>
  );
}

/* Case-page ticket — the same object, now holding the project's own facts. */
export function CaseTicket({ project, total }: { project: CaseStudy; total: string }) {
  const extra = project.links.slice(2);

  return (
    <div className={`aw-tk aw-tk--${project.tint} aw-tk--case`}>
      <div className="aw-tk-body">
        <div className="aw-tk-top">
          <span className="aw-tk-index">{project.index}</span>
          <span className="aw-tk-cat">{project.name}</span>
        </div>

        <dl className="aw-tk-facts">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{project.timeline}</dd>
          </div>
        </dl>

        <p className="aw-tk-stub-label aw-tk-tags-label">Stack</p>
        <div className="aw-tags aw-tk-tags">
          {project.stack.map((tech) => (
            <span key={tech} className="aw-tag">
              {tech}
            </span>
          ))}
        </div>

        {extra.length > 0 && (
          <>
            <p className="aw-tk-stub-label aw-tk-tags-label">Also</p>
            <div className="aw-case-extra">
              {extra.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ArrowUpRight size={10} />
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="aw-tk-stub">
        <span className="aw-tk-stub-brand">
          <StarMark size={8} /> Case study
        </span>
        <StubMeta project={project} total={total} />
        <TicketCode seed={`${project.slug}-case`} />
      </div>
    </div>
  );
}
