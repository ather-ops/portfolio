import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    q: "How did he shortlist for the Amazon ML Summer School?",
    a: "After a thorough peer-reviewed Statement of Purpose (SOP) evaluation, Ather was shortlisted into the top 23% out of 134,000+ global applicants for the Selection Assessment, studying directly under Amazon research scientists."
  },
  {
    q: "Why NumPy from first principles instead of just calling scikit-learn?",
    a: "Calling libraries is trivial. Deriving gradients, cost optimization paths, and tree structures from scratch in raw Numpy ensures Ather knows exactly what the underlying math does before production-grade deployment."
  },
  {
    q: "Can he build full-stack FastAPI + Streamlit applications?",
    a: "Absolutely. His selected works (Xpect AI, CORTEX, Atlas Agent) are fully deployed with clean async FastAPI routing, semantic indexing on ChromaDB, and real-time Streamlit interfaces."
  },
  {
    q: "What roles and timelines is he available for?",
    a: "Ather is actively available for AI/ML engineering, research assistantships, and full-stack development internships or full-time remote roles immediately."
  }
];

export default function CTA() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="cta" ref={ref} className="bg-white dark:bg-[#07080a] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        
        {/* Accordion Layout Grid precisamente modeled after Rise Plasma */}
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Header */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime">
              · FAQ SECTION
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
              All the details.
              <br />
              <span className="font-serif italic font-normal text-[#5c85d6] dark:text-lime-deep">Got a question?</span>
            </h2>
            <p className="mt-4 text-sm text-ink/60">
              Honest answers to clear doubts about Ather's capabilities, goals, and technical foundations.
            </p>
            <div className="mt-8">
              <a
                href="#recruiter-portal"
                className="rounded-full bg-ink dark:bg-white text-white dark:text-ink px-6 py-3 text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-1.5 w-max"
              >
                Hire Ather Now <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Accordion container */}
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-line pb-4">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between text-left py-3 text-sm sm:text-base font-bold text-ink hover:text-[#5c85d6] dark:hover:text-lime-deep transition-all"
                >
                  <span>{f.q}</span>
                  {openIdx === i ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden text-xs sm:text-sm text-ink/60 leading-relaxed mt-2"
                    >
                      {f.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>

        {/* Big Bottom CTA Panel strictly modeled after "Get paid for doing good." */}
        <div className="mt-28 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#7ea6f2] via-[#b3cdef] to-[#fcdcd3] dark:from-indigo-950 dark:via-indigo-900 dark:to-slate-900 p-8 text-center text-white shadow-2xl">
          <div className="absolute inset-0 hero-grid opacity-30" />
          <div className="absolute inset-0 hero-grid-fine opacity-20" />
          
          <div className="relative z-10 max-w-xl mx-auto py-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">START NOW</p>
            <h3 className="text-3xl sm:text-5xl font-semibold mt-4 tracking-tight leading-tight">
              Build intelligence for doing good.
            </h3>
            <p className="text-sm text-white/80 mt-4 leading-relaxed">
              We'll deploy directly into your cloud server. Get ready to start scaling clean machine learning pipelines immediately.
            </p>
            <div className="mt-8 flex justify-center">
              <motion.a
                href="#recruiter-portal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-ink shadow-xl"
              >
                Hire Ather Today
              </motion.a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
