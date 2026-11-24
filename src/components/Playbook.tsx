import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Layers, Minus, Plus, Search, Sparkles, Terminal } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const questions = [
  {
    q: "What is a RAG pipeline, really?",
    a: "Split source documents on semantic boundaries, embed every chunk at 384 dimensions with all-MiniLM-L6-v2, and index them in FAISS. A question only reaches the model after top-k retrieval, and the system prompt forbids answers outside those chunks.",
  },
  {
    q: "How do you keep an agent bounded?",
    a: "An explicit tool allowlist, a capped number of rounds, retries and a hard timeout. PayPal Copilot runs three tools at temperature 0.1 with a five-round cap; Amazn AI falls back from a two-step fast path to a ten-step agent with a 60-second timeout.",
  },
  {
    q: "Where does the data actually come from?",
    a: "PDFs and support knowledge bases parsed with PyMuPDF, CSVs, SQL tables and read-only APIs — PayPal Sandbox for disputes, Google Sheets for orders. Credentials stay server-side; nothing sensitive reaches the browser.",
  },
  {
    q: "How do you know it works?",
    a: "pytest around auth, retrieval and the agent loop; retrieval checks against known questions; and a deployed demo with a README that states its limits. Every claim on this site links to code or a running app.",
  },
];

const loop = [
  { title: "Chunk", detail: "semantic splits", icon: <Layers size={14} />, tone: "bg-white/10 text-lime" },
  { title: "Embed", detail: "384 dimensions", icon: <Sparkles size={14} />, tone: "bg-white/10 text-[#bcd7ff]" },
  { title: "Retrieve", detail: "FAISS top-k", icon: <Search size={14} />, tone: "bg-white/10 text-[#d4f562]" },
  { title: "Answer", detail: "only from context", icon: <Terminal size={14} />, tone: "bg-lime text-ink" },
];

const phases = [
  {
    id: "01",
    title: "Scope it.",
    tag: "Day 0–2",
    body: "A written brief, a data audit and the success criteria before a model is chosen. If the corpus is weak, that gets said first.",
    icon: <Search size={18} />,
    tile: "bg-lime text-ink",
  },
  {
    id: "02",
    title: "Build it.",
    tag: "Week 1–2",
    body: "Small, testable slices — retrieval first, then the agent, then the interface. Every slice runs before the next one starts.",
    icon: <Layers size={18} />,
    tile: "bg-[#dbeafe] text-[#1d4675]",
  },
  {
    id: "03",
    title: "Ship it.",
    tag: "Week 3",
    body: "A deployed demo, a README and a read-out a non-engineer can follow — plus a revision window after the first walkthrough.",
    icon: <ArrowUpRight size={18} />,
    tile: "bg-[#fcdcd3] text-[#8a4b34]",
  },
];

export default function Playbook() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState(0);

  return (
    <section id="playbook" ref={ref} className="relative overflow-hidden bg-white px-5 py-24 sm:px-10 lg:py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]"
          >
            · THE PLAYBOOK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mt-4 text-3xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            A process you can audit.
            <br />
            <span className="font-serif italic font-normal text-[#5c85d6]">Not a black box.</span>
          </motion.h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/60">
            The same six steps run on every Atherva build — discover, design, build, integrate,
            test, improve. Here is what that looks like when the deliverable is an AI system.
          </p>
        </div>

        {/* ── Big explainer card: accordion + retrieval loop ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 0.05, type: "spring", stiffness: 180, damping: 26 }}
          className="clay-card mt-14 grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:gap-10"
        >
          <div className="lg:col-span-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
              Inside the build
            </p>
            <h3 className="mt-3 max-w-md text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
              What happens between a question and an answer?
            </h3>

            <div className="mt-7 space-y-2.5">
              {questions.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={item.q}
                    className={`overflow-hidden rounded-2xl border transition ${
                      isOpen
                        ? "border-[#7ea6f2]/45 bg-white shadow-[0_12px_30px_rgba(63,110,170,0.10)]"
                        : "border-white/70 bg-white/55 hover:bg-white/85"
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[13px] font-semibold text-ink sm:text-sm">{item.q}</span>
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eef4ff] text-[#3f74a8]">
                        {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-xs leading-relaxed text-ink/60 sm:text-[13px]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Retrieval loop visual */}
          <div className="lg:col-span-5">
            <div className="relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-[28px] bg-[#0c0e12] p-5 text-white shadow-xl sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full border border-dashed border-white/10" />
              <div className="pointer-events-none absolute -bottom-20 -left-14 h-52 w-52 rounded-full bg-[#d4f562]/10 blur-2xl" />

              <div className="relative flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  The retrieval loop
                </p>
                <span className="rounded-full bg-white/8 px-2 py-0.5 font-mono text-[9px] font-bold text-white/70">
                  top_k = 5
                </span>
              </div>

              <div className="relative mt-5 space-y-2.5">
                {loop.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 14 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${step.tone}`}>
                      {step.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                        0{i + 1}
                      </p>
                      <p className="truncate text-[13px] font-semibold text-white">
                        {step.title}
                        <span className="ml-1.5 font-normal text-white/50">· {step.detail}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-4 rounded-2xl bg-lime p-4 text-ink shadow-lg">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60">answer</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/80">
                  “Grounded in the retrieved chunks — or it says it does not know.”
                </p>
              </div>

              <p className="relative mt-auto pt-4 text-[10px] leading-relaxed text-white/40">
                No API keys in the browser. Retrieval, tool calls and keys stay server-side.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Three phases ── */}
        <div className="mt-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]">
            · HOW AN ENGAGEMENT RUNS
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Scope it. Build it. Ship it.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-ink/50">
            Fixed-fee sprint or retainer, with a 3–7 day free trial through Atherva Automations.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {phases.map((phase, i) => (
            <motion.article
              key={phase.id}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 210, damping: 24 }}
              whileHover={{ y: -6 }}
              className="clay-card p-6"
            >
              <div className="flex items-start justify-between">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${phase.tile}`}>
                  {phase.icon}
                </span>
                <span className="rounded-full bg-black/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/45">
                  {phase.tag}
                </span>
              </div>
              <p className="mt-5 font-mono text-[10px] font-bold text-ink/30">{phase.id}</p>
              <h4 className="mt-1 text-xl font-semibold tracking-tight text-ink">{phase.title}</h4>
              <p className="mt-2 text-xs leading-relaxed text-ink/60">{phase.body}</p>
            </motion.article>
          ))}
        </div>

        {/* ── Principle quote ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-20 max-w-3xl text-center"
        >
          <p className="font-serif text-2xl italic leading-snug text-ink sm:text-4xl">
            “Retrieve before you generate. Bound the agent. Measure the answer.”
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-serif text-lg text-lime">
              A
            </span>
            <div className="text-left">
              <p className="text-xs font-bold text-ink">Ather Assadullah Peer</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-ink/40">
                The rule every build starts from
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
