import { AwButton, Kicker, Reveal, StarMark } from "./ui";

export default function Team() {
  return (
    <section id="team" className="aw-team">
      <div className="aw-container">
        <Reveal>
          <div className="aw-team-panel">
            <div className="aw-team-grid">
              <div>
                <Kicker>Independent studio</Kicker>
                <h2 className="aw-h2">
                  One builder.
                  <br />
                  <em className="aw-italic">Ten-plus systems.</em>
                </h2>
                <p className="aw-team-copy">
                  Atherva Automations is a one-person studio: strategy, retrieval, interface and
                  deployment handled by the same person who answers the email.
                </p>
                <AwButton href="mailto:helloatherva@gmail.com" variant="dark">
                  Work with Ather
                </AwButton>
              </div>

              <div className="aw-team-right">
                <div className="aw-metric">
                  <div className="aw-metric-value">
                    <span className="aw-metric-plus">+</span>
                    10
                  </div>
                  <p className="aw-metric-label">public demos<br />and counting</p>
                </div>

                <div className="aw-team-mini">
                  <div>
                    <strong>1,000+</strong>
                    <span>Contributions</span>
                  </div>
                  <div>
                    <strong>15</strong>
                    <span>Case studies</span>
                  </div>
                  <div>
                    <strong>09</strong>
                    <span>Live apps</span>
                  </div>
                </div>

                <p className="aw-team-recognition">
                  Top 23% screened · Amazon ML Summer School 2026&nbsp;&nbsp;/&nbsp;&nbsp;150+ LeetCode
                  &nbsp;&nbsp;/&nbsp;&nbsp;HF Agents, FastAPI + Docker complete
                </p>
              </div>
            </div>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-5 top-5 text-[var(--aw-purple)] opacity-30"
            >
              <StarMark size={18} />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
