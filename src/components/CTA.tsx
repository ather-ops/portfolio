import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    q: "What has he actually shipped?",
    a: "Nine deployments. PayPal Copilot (dispute agent on Groq function calling), Amazn AI (multi-tool agent with two FAISS indexes), Xpect AI (semantic search over 8,807 titles, shipped in 15 days), PulseMesh (async API engine with a FastAPI backend), a Hospital SQL reporting dashboard, two from-scratch ML demos, Atlas Agent (under maintenance) and the Atherva site. Every link is on this page."
  },
  {
    q: "What is Atherva Automations?",
    a: "It is Ather's company, founded in 2026 in India. Atherva builds AI agents, automation systems, assistants, RAG search and data intelligence for businesses, startups and individuals. Alerti (Shopify catalog monitoring) and Marketify (a planned open-source multi-agent marketing platform) are in development, and there is a 3–7 day free trial at atherva-automations.vercel.app."
  },
  {
    q: "Does he know the math, or only the libraries?",
    a: "Both. Linear and logistic regression, KNN, Naive Bayes, SVM, Ridge, Lasso, decision trees and random forests are implemented in pure NumPy first — Ridge matches scikit-learn exactly at MSE 0.4598 / R² 0.9767, and a Titanic random forest holds 80.9% test accuracy — then rebuilt with scikit-learn for production."
  },
  {
    q: "How does he stop an agent from going off the rails?",
    a: "Explicit boundaries: a three-tool allowlist and a five-round cap in PayPal Copilot at temperature 0.1, a 2-step fast agent with a 10-step fallback plus three retries and a 60-second timeout in Amazn AI, read-only order access, and pytest coverage for auth, disputes, policy search and the agent loop."
  },
  {
    q: "What is he available for right now?",
    a: "AI/ML internships and remote roles, available immediately — plus client work through Atherva Automations. He is in the first year of a BCA at Lovely Professional University and works on IST (UTC+5:30). Email peerather07@gmail.com, or helloatherva@gmail.com for company work."
  }
];

export default function CTA() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="cta" ref={ref} className="bg-white px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Accordion Layout Grid precisamente modeled after Rise Plasma */}
        <div className="grid gap-12 lg:grid-cols-2">

          {/* Header */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]">
              · FAQ SECTION
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
              All the details.
              <br />
              <span className="font-serif italic font-normal text-[#5c85d6]">Or just ask URI.</span>
            </h2>
            <p className="mt-4 text-sm text-ink/60">
              Straight answers about the systems, the guardrails and the availability. The floating bot can answer the rest about Ather Sama.
            </p>
            <div className="mt-8">
              <a
                href="#recruiter-portal"
                className="rounded-full bg-ink text-white px-6 py-3 text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-1.5 w-max"
              >
                Hire Ather <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Accordion container */}
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-line pb-4">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between text-left py-3 text-sm sm:text-base font-bold text-ink hover:text-[#5c85d6] transition-all"
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
        <div className="mt-28 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#7ea6f2] via-[#b3cdef] to-[#fcdcd3] p-8 text-center text-white shadow-2xl">

          <div className="relative z-10 max-w-xl mx-auto py-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">OPEN TO AI / ML INTERNSHIPS</p>
            <h3 className="text-3xl sm:text-5xl font-semibold mt-4 tracking-tight leading-tight">
              If it needs retrieval, it needs doing properly.
            </h3>
            <p className="text-sm text-white/80 mt-4 leading-relaxed">
              Send the role, the corpus or the broken demo — to Ather directly, or to Atherva Automations for company work. RAG pipelines, tool-calling agents and the evaluation that keeps them honest.
            </p>
            <div className="mt-8 flex justify-center">
              <motion.a
                href="#recruiter-portal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-ink shadow-xl"
              >
                Hire Ather today
              </motion.a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
