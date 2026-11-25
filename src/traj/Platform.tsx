import { useState } from "react";
import { Blocks, Gauge, Rocket, ScanLine } from "lucide-react";
import { Label, Reveal } from "./ui";

const steps = [
  {
    n: "1",
    title: "Scope",
    body: "One problem, one data source, a written definition of done. If the answer cannot be checked, it is not in scope.",
    output: "One-page brief",
    icon: ScanLine,
    h: 250,
  },
  {
    n: "2",
    title: "Build",
    body: "Retrieval, tools and guardrails, with tests, retries and a fallback path instead of a happy-path demo.",
    output: "Working repository",
    icon: Blocks,
    h: 310,
  },
  {
    n: "3",
    title: "Evaluate",
    body: "Answers are checked against held-out cases. What fails gets fixed before anyone sees a launch link.",
    output: "Held-out report",
    icon: Gauge,
    h: 386,
  },
  {
    n: "4",
    title: "Ship",
    body: "Deployed on Streamlit, Render or Vercel — documented and demoable by anyone with the link.",
    output: "Live demo",
    icon: Rocket,
    h: 310,
  },
];

export default function Platform() {
  const [active, setActive] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches ? 0 : 2
  );

  return (
    <section id="playbook" className="border-y border-[var(--tj-line)] bg-[var(--tj-paper)] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <Label>The playbook</Label>
            <h2 className="tj-display mt-4 text-[40px] leading-[1.02] sm:text-[54px]">
              A working surface for the work.
            </h2>
            <p className="tj-serif mx-auto mt-4 max-w-[640px] text-[18px] leading-[1.3] text-[rgba(31,42,56,0.72)] sm:text-[19px]">
              This is where a fuzzy request becomes a deployed system: observe the problem, direct
              the build, check the behaviour, then ship it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tj-rail mt-12 flex items-end gap-3 overflow-x-auto pb-1">
            {steps.map((step, index) => {
              const on = active === index;
              const Icon = step.icon;
              return (
                <button
                  key={step.n}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-expanded={on}
                  style={{ minHeight: step.h }}
                  className={`tj-step-card tj-rail-card relative flex w-[74vw] shrink-0 flex-col p-5 text-left sm:w-auto sm:flex-1 sm:p-6 ${
                    on ? "tj-step-card--active" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={`tj-display text-[26px] leading-none ${on ? "text-[var(--tj-navy)]" : "text-[rgba(38,50,66,0.25)]"}`}>
                      {step.n}
                    </span>
                    <span className="tj-label text-[8.5px]">0{step.n} of 04</span>
                  </div>
                  <h3 className="tj-display mt-5 text-[24px] leading-none">{step.title}</h3>
                  <p className={`tj-serif mt-3 max-w-[220px] text-[15px] leading-[1.28] ${on ? "text-[rgba(31,42,56,0.78)]" : "text-[rgba(31,42,56,0.55)]"}`}>
                    {step.body}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                    <div>
                      <p className="tj-label text-[8px] text-[rgba(38,50,66,0.45)]">Output</p>
                      <p className="tj-serif mt-0.5 text-[15px] leading-none text-[rgba(31,42,56,0.7)]">
                        {step.output}
                      </p>
                    </div>
                    <Icon
                      size={26}
                      strokeWidth={1.1}
                      className={on ? "text-[rgba(38,50,66,0.5)]" : "text-[rgba(38,50,66,0.24)]"}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
