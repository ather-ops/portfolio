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
      title: "Reliable Pipelines",
      desc: "Get consistently grounded responses. Zero hallucination limits, rigorous sentence splitting, and evaluation baked into the framework.",
      icon: <Layers className="text-[#5c85d6] dark:text-lime-deep" size={24} />,
    },
    {
      title: "Your Stack, Your Way",
      desc: "Seamless integration across complex multi-agent architectures (LangGraph / ReAct), deployed cloud pipelines, and Python environments.",
      icon: <Terminal className="text-[#5c85d6] dark:text-lime-deep" size={24} />,
    },
    {
      title: "Open Source Impact",
      desc: "Clean, verified, open-source repositories designed from first principles with zero hidden abstractions.",
      icon: <Globe className="text-[#5c85d6] dark:text-lime-deep" size={24} />,
    },
  ];

  return (
    <section id="collaborate" ref={ref} className="bg-[#f0f3f6] dark:bg-[#0b0c10] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime"
        >
          · THE BENEFITS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto mt-4 max-w-2xl text-center text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          Intelligence you can count on.
        </motion.h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-ink/60">
          Deploy clean, tested, and highly organized vector spaces without the down-time or mathematical fog.
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
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white dark:bg-black/30 shadow-sm border border-line">
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
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime">
            · HIRE OPTIONS
          </p>
          <h3 className="mt-3 text-center text-2xl font-semibold text-ink">Collaboration structures</h3>

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
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40">{plan.badge} PLAN</p>
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
                  href="#contact"
                  className="mt-8 block rounded-full bg-ink dark:bg-white text-white dark:text-ink py-2.5 text-center text-xs font-bold uppercase tracking-widest hover:bg-ink-soft transition"
                >
                  Initiate Sync
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
