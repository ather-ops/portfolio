import { ArrowUpRight } from "lucide-react";
import { AwButton, Kicker, Reveal, StarMark } from "./ui";

const steps = [
  {
    num: "01",
    title: "Scope",
    body: "One problem, one source, a written definition of done.",
  },
  {
    num: "02",
    title: "Build",
    body: "Retrieval, tools and guardrails — with tests, retries and fallbacks.",
  },
  {
    num: "03",
    title: "Evaluate",
    body: "Held-out cases and real queries. Fix what fails before launch.",
  },
  {
    num: "04",
    title: "Ship",
    body: "Deployed on Streamlit, Render or Vercel — documented and demoable.",
  },
];

export default function About() {
  return (
    <section id="about" className="aw-about">
      <div className="aw-container aw-about-grid">
        <Reveal className="aw-about-copy">
          <Kicker>About</Kicker>
          <h2 className="aw-h2">
            A one-person studio for <em className="aw-italic">intelligent systems.</em>
          </h2>
          <p>
            I&apos;m Ather Sama, an ML / AI engineer in Srinagar and the founder of Atherva
            Automations. I build the retrieval, the interface, the deployment and the docs — then
            keep the system running in public.
          </p>
          <div className="aw-facts">
            <span className="aw-fact">Srinagar, India</span>
            <span className="aw-fact">Remote-first</span>
            <span className="aw-fact">Open to AI/ML roles</span>
          </div>
          <AwButton href="mailto:peerather07@gmail.com" variant="dark">
            Work with Ather
          </AwButton>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="aw-about-panel">
            <div className="aw-panel-top">
              <span className="aw-panel-brand">
                <StarMark size={11} /> atherva automations
              </span>
              <span className="aw-panel-badge">Founder</span>
            </div>

            <p className="aw-panel-quote">
              Research → build → evaluate → <em className="aw-italic">ship.</em>
            </p>

            <div className="aw-process-grid">
              {steps.map((step) => (
                <div key={step.num} className="aw-process-card">
                  <span className="aw-process-num">{step.num}</span>
                  <p className="aw-process-title">{step.title}</p>
                  <p className="aw-process-body">{step.body}</p>
                </div>
              ))}
            </div>

            <a
              href="https://atherva-automations.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="aw-panel-link"
            >
              Visit Atherva <ArrowUpRight size={12} strokeWidth={1.8} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
