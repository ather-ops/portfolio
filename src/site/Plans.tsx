import { Check } from "lucide-react";
import { plans, profile } from "../data";
import { Reveal, SectionHead } from "./ui";

const mailto = (subject: string) =>
  `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

export default function Plans() {
  return (
    <section id="plans" className="px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          align="left"
          eyebrow="Pricing"
          title={
            <>
              Flexible ways{" "}
              <br />
              to work together
            </>
          }
          sub="Start with a free trial or an email. Scope, timeline and retention are written down before any work starts."
          className="max-w-lg"
        />

        <div className="mt-8 grid gap-3.5 md:grid-cols-3">
          {plans.map((plan, index) => {
            const featured = "featured" in plan && plan.featured;
            const href =
              "href" in plan && plan.href
                ? plan.href
                : mailto(`Atherva enquiry — ${plan.name}`);
            return (
              <Reveal key={plan.name} delay={index * 0.05}>
                <article
                  className={`flex h-full flex-col rounded-[26px] border p-6 ${
                    featured
                      ? "border-[#ded8cb] bg-[#fffdf8] shadow-[0_18px_40px_rgba(30,30,20,0.06)]"
                      : "border-[#e7e2d8] bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="display text-[26px] leading-none">{plan.name}</h3>
                    <span className="pill">{plan.badge}</span>
                  </div>

                  <p className="mt-5 flex items-end gap-1">
                    <span className="display text-[38px] leading-none">{plan.price}</span>
                    <span className="pb-1 text-[10px] text-[#8a867d]">/ {plan.period}</span>
                  </p>

                  <p className="mt-3 text-[11.5px] leading-relaxed text-[#6d6a62]">{plan.desc}</p>

                  <ul className="mt-5 space-y-2">
                    {plan.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[10.5px] text-[#5f5c55]">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#ddd7ca] bg-white">
                          <Check size={9} strokeWidth={2.4} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className={`mt-7 w-full ${featured ? "btn-dark" : "btn-outline"}`}
                  >
                    {"cta" in plan && plan.cta ? plan.cta : "Email Ather"}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-5 text-center text-[9.5px] leading-relaxed text-[#a9a397]">
          Atherva terms: 3–7 day free trial, fixed-fee sprint or retainer, exports only, data deleted
          90 days after an engagement.{" "}
          <a
            href={profile.companyUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-[#d8d2c5] underline-offset-2 hover:text-ink"
          >
            Read the full terms
          </a>
          .
        </p>
      </div>
    </section>
  );
}
