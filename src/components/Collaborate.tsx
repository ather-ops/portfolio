import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Terminal, Layers, Globe } from "lucide-react";
import { plans } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Collaborate() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const benefits = [
    {
      title: "Answers that cite",
      desc: "Retrieval happens before generation. FAISS indexes, top-5 context and a prompt that forbids outside knowledge keep every answer on the page it came from.",
      icon: <Layers className="text-[#5c85d6]" size={24} />,
    },
    {
      title: "Agents with guardrails",
      desc: "Allowlisted tools, capped tool rounds, retries and timeouts. When something fails the agent degrades gracefully instead of inventing a result.",
      icon: <Terminal className="text-[#5c85d6]" size={24} />,
    },
    {
      title: "Code you can read",
      desc: "Documented Python repositories, pytest where it matters, and no hidden abstraction between you and the mathematics underneath.",
      icon: <Globe className="text-[#5c85d6]" size={24} />,
    },
  ];

  return (
    <section id="collaborate" ref={ref} className="bg-[#f0f3f6] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]"
        >
          · WHAT WORKING TOGETHER LOOKS LIKE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto mt-4 max-w-2xl text-center text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          Systems you can audit.
        </motion.h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-ink/60">
          Retrieval, tools and evaluation designed so a reviewer can trace every answer back to its source.
        </p>

        {/* Benefits Grid precisamente modeled after Rise Plasma */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeUp}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="clay-card p-8 flex flex-col justify-between min-h-[260px]"
            >
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm border border-line">
                  {b.icon}
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-tight text-ink">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plans row */}
        <div className="mt-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]">
            · ENGAGEMENT OPTIONS
          </p>
          <h3 className="mt-3 text-center text-2xl font-semibold text-ink">Ways to work together</h3>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                whileHover={{ y: -6 }}
                className={`clay-card p-8 flex flex-col justify-between ${
                  plan.featured ? "border-ink border-2" : ""
                }`}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40">
                    {plan.badge === "Company" ? "My company" : `${plan.badge} plan`}
                  </p>
                  <h4 className="text-2xl font-bold tracking-tight text-ink mt-2">{plan.name}</h4>
                  <p className="mt-3 text-xs text-ink/55">{plan.desc}</p>
                  <p className="mt-6 text-4xl font-extrabold tracking-tight text-ink">
                    {plan.price}
                    <span className="text-xs font-semibold text-ink/40">/{plan.period}</span>
                  </p>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {plan.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-ink/70">
                      <CheckCircle className="text-[#5c85d6] mt-0.5 shrink-0" size={14} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href ?? "#contact"}
                  {...(plan.href ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`mt-8 block rounded-full py-2.5 text-center text-xs font-bold uppercase tracking-widest transition ${
                    plan.featured
                      ? "bg-lime text-ink hover:bg-lime-deep"
                      : "bg-ink text-white hover:bg-ink-soft"
                  }`}
                >
                  {plan.cta ?? "Start a conversation"}
                </a>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
export {};
