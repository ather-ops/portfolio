import { Eye, FileCheck2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Label, Reveal } from "./ui";

const rows = [
  {
    icon: ShieldCheck,
    title: "You decide what ships",
    body: "Scope, timeline and what counts as done are written down before work starts. The boundaries are yours, not the model's.",
  },
  {
    icon: LockKeyhole,
    title: "Nothing deploys unchecked",
    body: "Models never publish or act without a human review step. Every recommendation is inspectable and reversible.",
  },
  {
    icon: Eye,
    title: "Full visibility",
    body: "Code, data handling and retention are documented. Exports only, no passwords, and data deleted 90 days after an engagement.",
  },
  {
    icon: FileCheck2,
    title: "Illustrative, never invented",
    body: "Blueprints and demos describe real work. No fake client logos, no borrowed screenshots, no made-up outcomes.",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="px-5 pb-0 pt-20 sm:px-8 sm:pt-24">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="max-w-[760px]">
            <Label>Design for trust</Label>
            <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="tj-display max-w-[620px] text-[40px] leading-[1.02] sm:text-[48px]">
                Your work. Built on your terms.
              </h2>
              <span className="tj-pill tj-pill--mint shrink-0">Open process</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-0 border-t border-[var(--tj-line)] pt-0 lg:grid-cols-12">
          <div className="tj-trust-image relative min-h-[220px] border-b border-[var(--tj-line)] lg:col-span-3 lg:min-h-[430px] lg:border-b-0 lg:border-r">
            <span className="tj-label absolute bottom-4 left-4 text-[9px] text-[rgba(38,50,66,0.55)]">
              Built in the open
            </span>
          </div>

          <div className="border-b border-[var(--tj-line)] lg:col-span-9">
            {rows.map((row, index) => {
              const Icon = row.icon;
              return (
                <Reveal key={row.title} delay={index * 0.05}>
                  <div className={`tj-trust-row flex items-start gap-4 py-6 sm:gap-6 sm:py-7 ${index === 0 ? "border-t-0" : ""}`}>
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--tj-line-strong)] text-[var(--tj-navy)]">
                      <Icon size={14} strokeWidth={1.6} />
                    </span>
                    <div>
                      <h3 className="tj-display text-[21px] leading-none">{row.title}</h3>
                      <p className="tj-serif mt-2 max-w-[660px] text-[15px] leading-[1.3] text-[rgba(31,42,56,0.68)]">
                        {row.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
