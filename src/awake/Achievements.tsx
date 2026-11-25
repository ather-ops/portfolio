import { Award, Code2, GraduationCap, Medal, Trophy } from "lucide-react";
import { Kicker, Reveal } from "./ui";

const awards = [
  {
    Icon: Medal,
    value: "Top 23%",
    title: "Amazon ML Summer School 2026",
    body:
      "Selected in the top 23% of 1,34,421 applicants and invited to the online assessment.",
    tone: "lav",
    tag: "Amazon",
  },
  {
    Icon: Trophy,
    value: "72 hrs",
    title: "Since AI Hackathon 2026",
    body:
      "Selected for a 72-hour in-person AI hackathon in Turku, Finland, with 15 company challenges (6–8 Nov 2026).",
    tone: "peach",
    tag: "Turku · Finland",
  },
  {
    Icon: Award,
    value: "Forage",
    title: "Tata Group — GenAI Data Analytics",
    body:
      "Completed the job simulation: EDA and risk profiling, delinquency prediction with AI, and an AI-driven collections strategy.",
    tone: "blue",
    tag: "May–Jun 2026",
  },
  {
    Icon: Code2,
    value: "150+",
    title: "LeetCode problem solver",
    body:
      "150+ problems solved, with the 50-day and 100-day badges earned in 2026. Python is the working language.",
    tone: "green",
    tag: "50 & 100-day badges",
  },
  {
    Icon: GraduationCap,
    value: "BCA",
    title: "Lovely Professional University",
    body:
      "BCA in progress (2026–present), after Class XII in PCM + Biology at 80% and Class X at 80%.",
    tone: "dark",
    tag: "In progress",
  },
];

export default function Achievements() {
  return (
    <section id="awards" className="aw-awards">
      <div className="aw-container">
        <Reveal>
          <div className="aw-awards-head">
            <div>
              <Kicker>Achievements</Kicker>
              <h2 className="aw-h2">
                Proof,
                <br />
                <em className="aw-italic">not promises.</em>
              </h2>
            </div>
            <p className="aw-lead">
              Screened, accepted, completed or shipped — each item has a source. No trophies for
              attendance.
            </p>
          </div>
        </Reveal>

        <div className="aw-award-grid">
          {awards.map(({ Icon, value, title, body, tone, tag }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <article className={`aw-award-card aw-award-card--${tone}`}>
                <div className="aw-award-top">
                  <span className="aw-award-icon">
                    <Icon size={15} strokeWidth={1.7} />
                  </span>
                  <span className="aw-award-tag">{tag}</span>
                </div>
                <span className="aw-award-value">{value}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="aw-award-strip">
            <div>
              <strong>1,000+</strong>
              <span>GitHub contributions</span>
            </div>
            <div>
              <strong>10+</strong>
              <span>Public demos</span>
            </div>
            <div>
              <strong>15</strong>
              <span>Documented projects</span>
            </div>
            <div>
              <strong>14</strong>
              <span>Public repositories</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
