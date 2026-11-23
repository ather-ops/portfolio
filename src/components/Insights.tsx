import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, MapPin, Database } from "lucide-react";

export default function Insights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedCluster, setSelectedCluster] = useState<string | null>("scifi");

  const clusters = [
    { id: "scifi", name: "Sci-Fi/Cosmic Cluster", distance: "0.97", coords: "x: 0.12, y: 0.85", films: ["Interstellar", "Contact", "Gravity"] },
    { id: "action", name: "High-Octane Action", distance: "0.91", coords: "x: -0.42, y: 0.22", films: ["Mad Max", "John Wick", "Gladiator"] },
    { id: "drama", name: "Poignant Drama", distance: "0.85", coords: "x: 0.73, y: -0.35", films: ["The Shawshank Redemption", "Forrest Gump", "Pulp Fiction"] },
    { id: "thriller", name: "Psychological Thriller", distance: "0.81", coords: "x: -0.15, y: -0.62", films: ["Inception", "The Prestige", "Memento"] },
  ];

  return (
    <section id="insights" ref={ref} className="bg-[#f0f3f6] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]"
          >
            · INSIDE THE INDEX
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            The space Xpect AI searches.
          </motion.h2>
          <p className="mt-4 text-sm text-ink/60">
            8,807 Netflix titles embedded at 384 dimensions with all-MiniLM-L6-v2 and indexed in FAISS. Select a cluster to inspect the nearest neighbours returned by top-5 search.
          </p>
        </div>

        {/* 3D Clustered Map Area precisely styled like Rise Plasma Island map */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">

          {/* 3D projection space box */}
          <div className="lg:col-span-8 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#7ea6f2]/10 to-[#e8cef2]/10 blur-3xl rounded-full" />

            {/* Visualizer Island Box */}
            <div className="clay-card relative h-[440px] w-full overflow-hidden bg-gradient-to-b from-[#7ea6f2]/20 via-[#f7f9fc] to-[#fcdcd3]/10 p-8 flex items-center justify-center">

              {/* Grid backdrop */}
              <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
              <div className="absolute inset-0 hero-grid-fine opacity-10 pointer-events-none" />

              {/* Central Globe Core */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute h-56 w-56 rounded-full border border-dashed border-[#5c85d6]/30 flex items-center justify-center"
              >
                <div className="h-44 w-44 rounded-full border border-dashed border-[#5c85d6]/20 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full border border-dashed border-[#5c85d6]/10" />
                </div>
              </motion.div>

              {/* Floating Cluster Pins precisely modeled after Rise map pins */}
              {/* Sci-Fi Pin */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedCluster("scifi")}
                className={`absolute top-[22%] left-[28%] z-10 cursor-pointer flex flex-col items-center`}
              >
                <div className={`p-2.5 rounded-full shadow-lg flex items-center gap-1 border transition-all ${
                  selectedCluster === "scifi" ? "bg-lime text-ink border-lime" : "bg-white text-[#5c85d6] border-line"
                }`}>
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold">Sci-Fi (0.97)</span>
                </div>
                <div className="h-4 w-[1px] bg-ink/10" />
                <div className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
              </motion.div>

              {/* Action Pin */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedCluster("action")}
                className={`absolute top-[48%] left-[16%] z-10 cursor-pointer flex flex-col items-center`}
              >
                <div className={`p-2.5 rounded-full shadow-lg flex items-center gap-1 border transition-all ${
                  selectedCluster === "action" ? "bg-lime text-ink border-lime" : "bg-white text-[#5c85d6] border-line"
                }`}>
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold">Action (0.91)</span>
                </div>
                <div className="h-4 w-[1px] bg-ink/10" />
                <div className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
              </motion.div>

              {/* Drama Pin */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedCluster("drama")}
                className={`absolute top-[32%] right-[18%] z-10 cursor-pointer flex flex-col items-center`}
              >
                <div className={`p-2.5 rounded-full shadow-lg flex items-center gap-1 border transition-all ${
                  selectedCluster === "drama" ? "bg-lime text-ink border-lime" : "bg-white text-[#5c85d6] border-line"
                }`}>
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold">Drama (0.85)</span>
                </div>
                <div className="h-4 w-[1px] bg-ink/10" />
                <div className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
              </motion.div>

              {/* Thriller Pin */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedCluster("thriller")}
                className={`absolute bottom-[22%] right-[32%] z-10 cursor-pointer flex flex-col items-center`}
              >
                <div className={`p-2.5 rounded-full shadow-lg flex items-center gap-1 border transition-all ${
                  selectedCluster === "thriller" ? "bg-lime text-ink border-lime" : "bg-white text-[#5c85d6] border-line"
                }`}>
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold">Thriller (0.81)</span>
                </div>
                <div className="h-4 w-[1px] bg-ink/10" />
                <div className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
              </motion.div>

            </div>
          </div>

          {/* Details / Metric panel card */}
          <div className="lg:col-span-4">
            <div className="clay-card p-6 flex flex-col justify-between h-[440px]">
              <div>
                <div className="flex justify-between items-start text-ink/40">
                  <div className="flex items-center gap-2">
                    <Database size={16} className="text-[#5c85d6]" />
                    <span className="text-xs font-bold uppercase tracking-wider">FAISS index</span>
                  </div>
                  <span className="rounded bg-lime/10 px-2 py-0.5 text-[9px] font-bold text-lime-deep">Active</span>
                </div>

                {selectedCluster ? (
                  <div className="mt-8">
                    <p className="text-xs font-bold text-[#5c85d6] uppercase tracking-wider">Currently Inspected</p>
                    <h3 className="text-2xl font-bold tracking-tight text-ink mt-2">
                      {clusters.find(c => c.id === selectedCluster)?.name}
                    </h3>
                    <p className="text-xs text-ink/40 mt-1 font-mono">
                      Cosine similarity: {clusters.find(c => c.id === selectedCluster)?.distance} · {clusters.find(c => c.id === selectedCluster)?.coords}
                    </p>

                    <div className="mt-6">
                      <p className="text-xs font-bold text-ink/50 uppercase tracking-wider">Nearest neighbours</p>
                      <ul className="mt-3 space-y-2">
                        {clusters.find(c => c.id === selectedCluster)?.films.map((f, i) => (
                          <li key={f} className="flex justify-between items-center bg-[#f7f9fc] p-2.5 rounded-xl border border-line text-xs font-semibold text-ink">
                            <span>{f}</span>
                            <span className="text-lime-deep font-mono">0.9{9 - i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-ink/40 italic mt-8">
                    Click any pin on the vector projection globe space to see Euclidean metrics.
                  </p>
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-line flex items-center gap-1.5 text-xs text-ink/40">
                <Globe size={14} />
                <span>IndexFlatL2 · 8,807 vectors · 384 dims</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
export {};
