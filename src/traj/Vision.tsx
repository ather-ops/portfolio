import { useState } from "react";
import { Label, Reveal } from "./ui";

const steps = [
  {
    n: "1",
    title: "Signal from real usage",
    body: "Every deployment is used, not just launched. Logs, retries and feedback surface what actually worked.",
  },
  {
    n: "2",
    title: "Build the system",
    body: "Retrieval, tools and guardrails — with tests, retries and a fallback path instead of a happy-path demo.",
  },
  {
    n: "3",
    title: "Ship and keep it alive",
    body: "Deployed, documented and monitored. Improvements ship against real behaviour, not a benchmark.",
  },
];

export default function Vision() {
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:flex lg:h-full lg:flex-col">
          <Reveal>
            <Label>The vision</Label>
            <h2 className="tj-display mt-4 max-w-[420px] text-[40px] leading-[1.02] sm:text-[46px]">
              Every project here is a living system.
            </h2>
            <p className="tj-serif mt-4 max-w-[360px] text-[16px] leading-[1.34] text-[rgba(31,42,56,0.68)]">
              I&apos;m Ather Sama — an ML / AI engineer in Srinagar and the founder of Atherva
              Automations. I build retrieval, agents and applied ML, then keep them running in
              public.
            </p>
          </Reveal>

          <div className="mt-12 sm:mt-16 lg:mt-auto">
            {steps.map((step, index) => {
              const on = active === index;
              return (
                <button
                  key={step.n}
                  type="button"
                  onClick={() => setActive(index)}
                  className="flex w-full items-start gap-4 border-t border-[var(--tj-line)] py-5 text-left first:border-t-0 first:pt-0"
                  aria-expanded={on}
                >
                  <span
                    className={`tj-display w-6 shrink-0 text-[27px] leading-none transition-colors ${
                      on ? "text-[var(--tj-navy)]" : "text-[rgba(38,50,66,0.24)]"
                    }`}
                  >
                    {step.n}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`tj-display block text-[18px] leading-tight transition-colors ${
                        on ? "text-[var(--tj-navy)]" : "text-[rgba(38,50,66,0.36)]"
                      }`}
                    >
                      {step.title}
                    </span>
                    {on && (
                      <span className="tj-serif mt-2 block max-w-[300px] text-[15px] leading-[1.28] text-[rgba(31,42,56,0.72)]">
                        {step.body}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="tj-vision-panel min-h-[460px] p-5 sm:min-h-[560px] sm:p-8">
            <div className="flex items-start justify-between">
              <p className="tj-label tj-label--light">Living system · 01</p>
              <p className="tj-label tj-label--light">8 live</p>
            </div>

            <svg
              viewBox="0 0 760 560"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
            >
              <g stroke="rgba(214,234,242,0.085)" strokeWidth="1">
                <line x1="253" y1="0" x2="253" y2="560" />
                <line x1="506" y1="0" x2="506" y2="560" />
                <line x1="0" y1="186" x2="760" y2="186" />
                <line x1="0" y1="373" x2="760" y2="373" />
              </g>
              <path
                className="tj-vision-orbit"
                d="M95 348C170 176 448 120 612 270C722 370 586 484 386 474C238 466 126 424 95 348Z"
              />
              <path
                className="tj-vision-orbit"
                d="M238 402C282 292 470 244 596 326"
                opacity="0.6"
              />
              <circle cx="612" cy="270" r="3" className="tj-vision-node" />
              <circle cx="95" cy="348" r="2.5" className="tj-vision-node" opacity="0.8" />
              <circle cx="386" cy="474" r="2.5" className="tj-vision-node" opacity="0.7" />
              <circle cx="455" cy="208" r="2" className="tj-vision-node" opacity="0.6" />
              <g opacity="0.65" stroke="rgba(214,234,242,0.55)" strokeWidth="1">
                <path d="M160 306L210 276L260 306L210 336Z" />
                <path d="M160 306V360L210 390V336" />
                <path d="M260 306V360L210 390" />
                <path d="M210 276V330L160 360M210 330L260 360" opacity="0.45" />
              </g>
              <g opacity="0.55" stroke="rgba(214,234,242,0.6)" strokeWidth="1">
                <rect x="490" y="392" width="46" height="60" rx="4" transform="rotate(-12 490 392)" fill="rgba(126,166,242,0.08)" />
                <rect x="548" y="372" width="46" height="60" rx="4" transform="rotate(-4 548 372)" fill="rgba(126,166,242,0.1)" />
                <rect x="608" y="350" width="46" height="60" rx="4" transform="rotate(5 608 350)" fill="rgba(126,166,242,0.12)" />
              </g>
            </svg>

            <div className="absolute left-[55%] top-[31%] h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_34%_28%,#e7f6f4_0%,#8cb5c8_32%,#395a72_72%,#1c2b3a_100%)] shadow-[0_0_60px_rgba(133,186,214,0.45),inset_-10px_-12px_24px_rgba(6,16,28,0.55)] sm:h-[120px] sm:w-[120px]">
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_62%_68%,rgba(255,255,255,0.18),transparent_45%)]" />
            </div>

            <div className="absolute left-[17%] top-[57%] h-16 w-16 sm:h-20 sm:w-20">
              <img
                src="/img/projects/icon-xpect.webp"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.4)]"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between border-t border-[rgba(248,249,233,0.14)] pt-4 sm:inset-x-8 sm:bottom-8">
              <p className="tj-serif max-w-[220px] text-[14px] leading-tight text-[rgba(248,249,233,0.68)]">
                Signal → system → ship. Each loop leaves the next build stronger.
              </p>
              <p className="tj-label tj-label--light">917 contributions</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
