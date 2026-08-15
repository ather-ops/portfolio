import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Layers, RefreshCw } from "lucide-react";

const textToChunk = "Artificial Intelligence has moved from classical heuristic rules to deep neural architectures. The core of any production-grade RAG pipeline starts with semantically sound document chunking. Instead of raw character length limits, we chunk at boundary limits where sentences shift semantic context. These clean slices prevent downstream hallucinations.";

export default function Services() {
  const [chunked, setChunked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const chunks = [
    "Artificial Intelligence has moved from classical heuristic rules to deep neural architectures.",
    "The core of any production-grade RAG pipeline starts with semantically sound document chunking.",
    "Instead of raw character length limits, we chunk at boundary limits where sentences shift semantic context.",
    "These clean slices prevent downstream hallucinations."
  ];

  return (
    <section id="services" className="bg-white dark:bg-[#07080a] px-5 py-24 sm:px-10 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Informative description block */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime">
              · LEARN MORE
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              What is a semantic chunk?
              <br />
              <span className="font-serif italic font-normal text-[#5c85d6] dark:text-lime-deep">What happens to it? Where does it go?</span>
            </h2>
            
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-ink/60">
              A semantic chunk is a clean, contextual block of input documents. Our pipelines segment raw PDFs not by character limit, but by cognitive shifts in topic. 
              These are then encoded into multidimensional coordinate points inside vector stores.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setChunked(!chunked)}
                className="rounded-full bg-ink dark:bg-white text-white dark:text-ink px-6 py-3 text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2"
              >
                <RefreshCw size={14} className={chunked ? "animate-spin" : ""} />
                {chunked ? "Reset Document" : "Demonstrate Chunking"}
              </motion.button>
              
              <a
                href="#recruiter-portal"
                className="text-xs font-bold uppercase tracking-widest text-[#5c85d6] hover:text-[#7ea6f2] transition flex items-center gap-1.5"
              >
                Skip to Direct Sync <Sparkles size={12} />
              </a>
            </div>
          </div>

          {/* Interactive Semantic Chunker Visualizer */}
          <div className="relative">
            {/* Cluttered decorative blobs */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#7ea6f2]/10 to-[#e8cef2]/10 blur-3xl -z-10 rounded-full" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="clay-card p-6 min-h-[380px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-[#5c85d6]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/45">Semantic Embedder Visual</span>
                </div>
                <span className="rounded-full bg-lime/10 px-2.5 py-0.5 text-[9px] font-bold text-lime-deep">LIVE SIMULATION</span>
              </div>

              <div className="my-6 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!chunked ? (
                    <motion.div
                      key="original"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm leading-relaxed text-ink/80 bg-[#f7f9fc] dark:bg-black/30 p-5 rounded-2xl border border-line"
                    >
                      <p className="font-mono text-xs text-ink/40 mb-2"># RAW DOCUMENT CORPUS</p>
                      {textToChunk}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="chunked"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <p className="font-mono text-xs text-[#5c85d6] mb-1"># CHUNK SPLITS (SENTENCE TRANSFORMERS)</p>
                      {chunks.map((chk, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="text-xs leading-relaxed text-ink/70 bg-[#d4f562]/10 dark:bg-lime/5 border-l-4 border-lime-deep p-3 rounded-r-xl"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-lime-deep">CHUNK_0{i + 1}</span>
                            <span className="font-mono text-[9px] text-ink/40">VECTOR_SPACE_768_DIM</span>
                          </div>
                          {chk}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between border-t border-line pt-4 text-xs text-ink/40 font-mono">
                <span>Loss: 0.0004</span>
                <span>Dim: 768 Vector</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
