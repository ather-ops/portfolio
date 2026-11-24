import { ArrowUpRight, Check } from "lucide-react";
import { profile, startup } from "../data";
import { ArtTile, Reveal, SectionHead } from "./ui";

const art = ["/img/pearl.jpg", "/img/bloom.jpg"];

export default function Startup() {
  return (
    <section id="startup" className="px-5 pb-24 sm:px-8">
      <SectionHead
        eyebrow="Startup"
        title="Atherva Automations"
        sub={startup.tagline}
        className="max-w-lg"
      />

      <p className="mx-auto mt-3 max-w-lg text-center text-[12px] leading-relaxed text-[#6d6a62]">
        {startup.intro}
      </p>

      <div className="mx-auto mt-9 grid max-w-4xl gap-4 sm:grid-cols-2">
        {startup.products.map((product, index) => (
          <Reveal key={product.name} delay={index * 0.06}>
            <article className="surface flex h-full flex-col p-2.5">
              <ArtTile
                tone={index === 0 ? "cream" : "pink"}
                className="h-40 rounded-[20px] sm:h-44"
              >
                <img
                  src={art[index % art.length]}
                  alt={index === 0 ? "Pearl sculpture" : "Pink flower on a blue sky"}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="pill absolute right-3 top-3 bg-white/90 backdrop-blur">
                  Product 0{index + 1}
                </span>
              </ArtTile>

              <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                <span className="pill w-fit text-[#a5672c]">{product.status}</span>
                <h3 className="display mt-3 text-[26px] leading-none">{product.name}</h3>
                <p className="mt-2 text-[11.5px] leading-relaxed text-[#6d6a62]">{product.summary}</p>

                <ul className="mt-3 space-y-1.5">
                  {product.points.map((point) => (
                    <li key={point} className="flex items-start gap-1.5 text-[10.5px] leading-relaxed text-[#5f5c55]">
                      <Check size={10} className="mt-0.5 shrink-0 text-ink/50" />
                      {point}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-[9px] leading-relaxed text-[#b0aa9e]">{product.note}</p>
                <div className="mt-auto pt-4">
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-ink hover:gap-1.5"
                  >
                    Read the plan <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-between gap-4 rounded-[24px] border border-[#e7e2d8] bg-white/60 px-5 py-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[10.5px] text-[#7a766d]">
          {startup.proof.slice(0, 3).map((item) => (
            <span key={item.label}>
              <strong className="font-semibold text-ink">{item.value}</strong> {item.label}
            </span>
          ))}
        </div>
        <a href={profile.companyUrl} target="_blank" rel="noreferrer" className="btn-dark">
          Visit Atherva <ArrowUpRight size={13} />
        </a>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-[9.5px] leading-relaxed text-[#a9a397]">
        Case studies on the Atherva site are illustrative blueprints — never invented client outcomes.
        Alerti and Marketify are labelled in development until they ship.
      </p>
    </section>
  );
}
