import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle, Mail, Sparkles } from "lucide-react";
import { startup } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Startup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="startup" ref={ref} className="bg-white px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ type: "spring", stiffness: 190, damping: 26 }}
          className="relative rounded-[36px] bg-[#0a0d16] text-white shadow-[0_32px_80px_rgba(8,14,28,0.28)]"
        >
          {/* clipped ambient light */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
            <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#7ea6f2]/25 blur-3xl" />
            <div className="absolute -bottom-28 right-0 h-96 w-96 rounded-full bg-[#d4f562]/15 blur-3xl" />
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="hero-grid-fine absolute inset-0 opacity-15" />
          </div>

          <div className="relative z-10 p-7 sm:p-10 lg:p-12">
            {/* header row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime font-serif text-2xl font-bold text-ink">
                  a
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-lime">
                    {startup.role} · est. {startup.founded}
                  </p>
                  <p className="text-sm font-semibold tracking-tight text-white">
                    {startup.name}
                  </p>
                </div>
              </div>
              <a
                href={startup.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 transition hover:border-lime/50 hover:text-white"
              >
                atherva-automations.vercel.app
                <ArrowUpRight size={12} className="text-lime" />
              </a>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-12">
              {/* left: story */}
              <div className="lg:col-span-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  · MY STARTUP
                </p>
                <h2 className="mt-4 text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
                  Beyond automation.
                  <br />
                  <span className="font-serif italic font-normal text-lime">
                    Into intelligent execution.
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65">
                  {startup.intro}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {startup.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/70"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={startup.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-lime-deep"
                  >
                    <Sparkles size={12} />
                    Visit Atherva
                    <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={`mailto:${startup.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 transition hover:border-white/30 hover:text-white"
                  >
                    <Mail size={12} className="text-lime" />
                    {startup.email}
                  </a>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-white/35">
                  The Atherva site ships its own in-browser assistant, Alyxa — same idea as URI here:
                  a fixed local knowledge base, no access to business systems.
                </p>

                {/* approach */}
                <div className="mt-9 border-t border-white/10 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    How the work runs
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {startup.approach.map((step, i) => (
                      <span key={step} className="flex items-center gap-3">
                        <span className="text-[11px] font-medium text-white/70">
                          <span className="mr-1.5 font-mono text-[9px] text-lime">
                            0{i + 1}
                          </span>
                          {step}
                        </span>
                        {i < startup.approach.length - 1 && (
                          <span className="h-px w-4 bg-white/15" aria-hidden />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* right: products */}
              <div className="lg:col-span-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                  Products in the works
                </p>
                <div className="mt-3 space-y-3">
                  {startup.products.map((product) => (
                    <a
                      key={product.name}
                      href={product.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative block rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold tracking-tight text-white">
                          {product.name}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] ${
                            product.status.startsWith("Planned")
                              ? "bg-violet-400/15 text-violet-300"
                              : "bg-amber-400/15 text-amber-300"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/55">
                        {product.summary}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {product.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2 text-[11px] leading-relaxed text-white/60"
                          >
                            <CheckCircle size={11} className="mt-0.5 shrink-0 text-lime" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-3 flex items-center justify-between text-[10px] font-semibold text-white/35">
                        {product.note}
                        <ArrowUpRight
                          size={12}
                          className="text-white/40 transition group-hover:text-lime"
                        />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* proof row */}
            <div className="mt-10 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-2 lg:grid-cols-4">
              {startup.proof.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-bold tracking-tight text-white">{item.value}</p>
                  <p className="mt-1 text-[11px] font-medium leading-snug text-white/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-2.5 border-t border-white/10 pt-5 sm:grid-cols-2">
              {startup.trust.map((line) => (
                <p
                  key={line}
                  className="flex items-start gap-2 text-[11px] leading-relaxed text-white/50"
                >
                  <CheckCircle size={11} className="mt-0.5 shrink-0 text-lime/80" />
                  {line}
                </p>
              ))}
            </div>

            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.16em] text-white/25">
              {startup.location} · {startup.founded} · Founder-led
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
