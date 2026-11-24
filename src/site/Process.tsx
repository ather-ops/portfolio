import { Reveal, SectionHead } from "./ui";

const steps = [
  {
    n: "01",
    title: "Scope the problem",
    body: "One problem, one data source, a written definition of done. If the answer cannot be checked, it is not in scope.",
  },
  {
    n: "02",
    title: "Build the system",
    body: "Retrieval, tools and guardrails — with tests, retries and a fallback path instead of a happy-path demo.",
  },
  {
    n: "03",
    title: "Ship it",
    body: "Deployed on Streamlit, Render or Vercel, documented, and demoable by anyone with the link.",
  },
];

const phases = ["Discover", "Design", "Build", "Integrate", "Test & validate", "Improve"];

export default function Process() {
  return (
    <section id="playbook" className="px-5 py-24 sm:px-8">
      <div className="mx-auto flex max-w-md items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="art-tile h-28 w-24 -rotate-6 translate-x-6 rounded-[18px] bg-[radial-gradient(130%_130%_at_20%_0%,#f4ebff_0%,#dcd8ff_40%,#a8b4f7_80%)] shadow-[0_16px_30px_rgba(38,30,80,0.12)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0">
            <span className="display absolute inset-0 grid place-items-center text-[38px] text-[#2b2b2b]/25">X</span>
          </div>
          <div className="art-tile z-10 -mx-4 h-32 w-[104px] rounded-[20px] bg-[radial-gradient(130%_130%_at_20%_0%,#fff6eb_0%,#ffe0cd_42%,#ffbe9f_85%)] shadow-[0_20px_36px_rgba(80,45,20,0.14)] transition-transform duration-500 hover:-translate-y-2">
            <span className="display absolute inset-0 grid place-items-center text-[42px] text-[#2b2b2b]/25">A</span>
          </div>
          <div className="art-tile h-28 w-24 rotate-6 -translate-x-6 rounded-[18px] bg-[radial-gradient(130%_130%_at_20%_0%,#f2fff9_0%,#d4f5e6_42%,#9edcc6_85%)] shadow-[0_16px_30px_rgba(20,70,50,0.12)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0">
            <span className="display absolute inset-0 grid place-items-center text-[38px] text-[#2b2b2b]/25">P</span>
          </div>
        </div>
      </div>

      <SectionHead
        eyebrow="Playbook"
        title="How it works"
        sub="The same six steps run on client work, portfolio builds and hackathon prototypes."
        className="mt-10 max-w-md"
      />

      <div className="mx-auto mt-9 grid max-w-4xl gap-3.5 sm:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.n} delay={index * 0.06}>
            <article className="surface h-full p-6">
              <span className="pill">{step.n}</span>
              <h3 className="display mt-4 text-[22px] leading-tight">{step.title}</h3>
              <p className="mt-2 text-[11.5px] leading-relaxed text-[#6d6a62]">{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="surface-soft mx-auto mt-4 flex max-w-4xl flex-wrap items-center justify-center gap-x-1 gap-y-2 px-4 py-4">
          {phases.map((phase, index) => (
            <span key={phase} className="flex items-center gap-1">
              <span className="rounded-full bg-white/80 px-3 py-1.5 text-[10.5px] font-medium text-[#55524b]">
                <span className="mr-1.5 font-mono text-[9px] text-[#9b968c]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {phase}
              </span>
              {index < phases.length - 1 ? (
                <span className="text-[10px] text-[#b8b2a5]">→</span>
              ) : null}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
