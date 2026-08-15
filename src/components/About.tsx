import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats, profile } from "../data";
import { Sparkles, Calendar, BookOpen, Clock } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 220, damping: 24, delay },
  },
});

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="bg-[#f0f3f6] dark:bg-[#0b0c10] px-5 py-24 sm:px-10 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime"
        >
          · ROUTINE WITH RESULTS
        </motion.p>
        <motion.h2
          variants={fadeUp(0.08)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mx-auto mt-4 max-w-3xl text-center text-3xl font-medium leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          Every pipeline is a routine
          <br />
          <span className="font-serif italic font-normal text-[#5c85d6] dark:text-lime-deep">built for pure mathematical safety.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp(0.14)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-ink/60"
        >
          I schedule rigor. 1.5 years of pure-numpy derivations, customized vector indices, and robust agentic systems shipped directly into live Streamlit environments.
        </motion.p>

        {/* Immersive Claymorphic Stats & Visual Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Main big clay card */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="clay-card lg:col-span-8 p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lime text-ink">
                <Sparkles size={16} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#5c85d6]">RAG Verification</p>
                <p className="text-sm font-semibold text-ink">Strict Semantic Chunking</p>
              </div>
            </div>

            <div className="my-8">
              <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">8.8k+ titles</p>
              <p className="text-xs sm:text-sm text-ink/60 mt-2 max-w-lg">
                Ingested, chunked, and mapped using sentence-transformers into a dense ChromaDB vector index in under 15 days. Deployed live with zero latency.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-auto">
              <span className="rounded-full bg-white/60 dark:bg-black/20 px-3 py-1 text-xs font-semibold text-ink">ChromaDB</span>
              <span className="rounded-full bg-white/60 dark:bg-black/20 px-3 py-1 text-xs font-semibold text-ink">SentenceTransformers</span>
              <span className="rounded-full bg-white/60 dark:bg-black/20 px-3 py-1 text-xs font-semibold text-ink">Gemini LLM</span>
            </div>
          </motion.div>

          {/* Side clay card */}
          <motion.div
            variants={fadeUp(0.26)}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="clay-card lg:col-span-4 p-8 flex flex-col justify-between min-h-[320px] bg-gradient-to-br from-white/60 to-[#e8cef2]/20 dark:from-white/5 dark:to-transparent"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-purple-400">MATH INTEGRITY</p>
              <p className="text-5xl font-extrabold tracking-tight text-ink mt-3">100%</p>
              <p className="text-sm text-ink/60 mt-2">
                Derivations Derived by Hand — no shortcuts, no simple scikit-learn calls until gradients are understood.
              </p>
            </div>

            <div className="flex items-center gap-2.5 mt-6 border-t border-line pt-4">
              <img src={profile.photo} alt="" className="h-8 w-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-ink">{profile.name}</p>
                <p className="text-[10px] text-ink/40">BCA AI/ML • LPU</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Small stats cards grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              variants={fadeUp(0.3 + idx * 0.08)}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              whileHover={{ y: -6, scale: 1.02 }}
              className="clay-card p-6 flex flex-col justify-between"
            >
              <div>
                {idx === 0 && <BookOpen className="text-lime-deep mb-4" size={20} />}
                {idx === 1 && <Clock className="text-lime-deep mb-4" size={20} />}
                {idx === 2 && <Sparkles className="text-lime-deep mb-4" size={20} />}
                {idx === 3 && <Calendar className="text-lime-deep mb-4" size={20} />}
                <p className="text-3xl font-bold tracking-tight text-ink">{s.value}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-ink">{s.label}</p>
                <p className="text-xs text-ink/50 mt-1">{s.hint}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
