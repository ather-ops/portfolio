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
                  <em className="aw-italic">Nine systems.</em>
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
                    09
                  </div>
                  <p className="aw-metric-label">deployments<br />shipped</p>
                </div>

                <div className="aw-team-mini">
                  <div>
                    <strong>08</strong>
                    <span>Live</span>
                  </div>
                  <div>
                    <strong>07</strong>
                    <span>Public demos</span>
                  </div>
                  <div>
                    <strong>01</strong>
                    <span>Paused</span>
                  </div>
                </div>

                <p className="aw-team-recognition">
                  Top 23% screened · Amazon ML Summer School 2026&nbsp;&nbsp;/&nbsp;&nbsp;150+ LeetCode
                  &nbsp;&nbsp;/&nbsp;&nbsp;917 contributions in the last year
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
