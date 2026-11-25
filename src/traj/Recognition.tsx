import { stats } from "../data";
import { Label, Reveal } from "./ui";

export default function Recognition() {
  return (
    <section className="px-5 pb-20 pt-14 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-t border-[var(--tj-line)] pt-5">
            <Label>Recognition &amp; proof</Label>
            <p className="tj-serif hidden text-right text-[14px] text-[rgba(31,42,56,0.52)] sm:block">
              Public, checkable signals — no borrowed numbers.
            </p>
          </div>
        </Reveal>
        <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div>
                <p className="tj-display text-[38px] leading-none sm:text-[44px]">{stat.value}</p>
                <p className="tj-label mt-3 text-[9px]">{stat.label}</p>
                <p className="tj-serif mt-1.5 max-w-[230px] text-[13px] leading-[1.25] text-[rgba(31,42,56,0.56)]">
                  {stat.hint}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
