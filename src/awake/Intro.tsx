import { Reveal, StarMark } from "./ui";

const stats = [
  { value: "10", label: "Public demos" },
  { value: "1K", label: "GitHub contributions" },
  { value: "15", label: "Project write-ups" },
];

export default function Intro() {
  return (
    <section className="aw-intro">
      <div className="aw-container">
        <Reveal>
          <p className="aw-statement">
            From raw data to working systems,
            <br className="hidden sm:block" /> built with
          </p>
          <div className="aw-pill-row">
            <span className="aw-soft-pill aw-soft-pill--blue">
              <StarMark size={10} /> Retrieval
            </span>
            <span className="aw-soft-pill aw-soft-pill--lav">
              <StarMark size={10} /> Agents
            </span>
            <span className="aw-soft-pill aw-soft-pill--peach">
              <StarMark size={10} /> Applied ML
            </span>
            <span className="aw-soft-pill aw-soft-pill--green">
              <StarMark size={10} /> ML from scratch
            </span>
          </div>
        </Reveal>

        <div className="aw-stats">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="aw-stat">
                <div className="aw-stat-value">
                  <span className="aw-stat-plus">+</span>
                  {stat.value}
                </div>
                <p className="aw-stat-label">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
