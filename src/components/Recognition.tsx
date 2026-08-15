import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Terminal, Sparkles, Server } from "lucide-react";
import { certs, journey } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Recognition() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      id: "01",
      title: "Design in seconds, on your stack.",
      desc: "Architect the pipeline flow. We combine LangGraph orchestrators, agentic reasoning, and semantic indices suited for any custom database.",
      icon: <Layers className="text-[#5c85d6] dark:text-lime" size={24} />,
    },
    {
      id: "02",
      title: "Math it out from numpy scratch.",
      desc: "No library shortcuts. We derive gradients, cost updates, and metric validations by hand to guarantee absolute control over matrices.",
      icon: <Terminal className="text-[#5c85d6] dark:text-lime" size={24} />,
    },
    {
      id: "03",
      title: "Deploy & scale - Streamlit/FastAPI.",
      desc: "Expose clean APIs. We serve dense representations to live Streamlit Cloud frontends or lightweight async FastAPI routers on AWS.",
      icon: <Server className="text-[#5c85d6] dark:text-lime" size={24} />,
    },
  ];

  return (
    <section id="recognition" ref={ref} className="bg-white dark:bg-[#07080a] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime"
        >
          · THE PROCESS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mx-auto mt-4 max-w-3xl text-center text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          Design it. Math it. Deployed.
        </motion.h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-ink/60">
          Everything happens through a clean pipeline loop — design, derivation, and deployment.
        </p>

        {/* Steps Precisely Modeled After Rise Plasma Process Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((st, i) => (
            <motion.div
              key={st.id}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              variants={fadeUp}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="clay-card p-8 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f0f3f6] dark:bg-black/30 shadow-sm border border-line">
                  {st.icon}
                </div>
                <h3 className="mt-8 text-xl font-bold tracking-tight text-ink leading-tight">{st.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">{st.desc}</p>
              </div>
              <div className="mt-6 flex justify-between items-center border-t border-line pt-4 text-xs text-ink/40 font-mono">
                <span>STEP {st.id}</span>
                <span className="rounded bg-lime/10 px-2 py-0.5 font-bold text-lime-deep text-[10px]">VERIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials / Academic Journey */}
        <div className="mt-24">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime">
            · ACADEMIC & CERTIFICATIONS
          </p>
          <h3 className="mt-3 text-center text-2xl font-semibold text-ink">Credentials & Journey Index</h3>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certs.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
                whileHover={{ y: -4 }}
                className="clay-card p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#5c85d6]">{c.org} • {c.year}</p>
                  <h4 className="text-sm font-bold text-ink mt-3 leading-tight">{c.title}</h4>
                  <p className="text-xs text-ink/50 mt-2 leading-relaxed">{c.detail}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold text-lime-deep">
                  <Sparkles size={10} /> VERIFIED
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((j, i) => (
              <motion.div
                key={j.year}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08, type: "spring" }}
                whileHover={{ y: -4 }}
                className="clay-card p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">{j.year} • {j.tag}</p>
                  <h4 className="text-sm font-bold text-ink mt-3 leading-tight">{j.title}</h4>
                  <p className="text-xs text-ink/50 mt-2 leading-relaxed">{j.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
export {};
