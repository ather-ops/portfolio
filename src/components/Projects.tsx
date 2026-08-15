import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Activity, Heart, ShieldAlert } from "lucide-react";
import { projects, moreProjects } from "../data";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("01");
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);

  // Healthpoint Tab Content mappings
  const folderTabs = [
    {
      id: "01",
      title: "Atlas Agent",
      heading: "Autonomous. Empathetic. Orchestrated.",
      highlightColor: "from-blue-500 to-indigo-600",
      accentBg: "bg-blue-500/10 text-blue-400",
      pillText: "Redefining task workflows, one loop at a time.",
      sideBlockTitle: "Personalized agency, at every node.",
      sideBlockDesc: "Where every complex action is met with rigorous reasoning and every tool execution is fully sandbox-validated.",
      bottomLogo: "atlasagent",
      icon: <Activity size={18} className="text-blue-400 animate-pulse" />,
    },
    {
      id: "02",
      title: "Xpect AI",
      heading: "Semantic. Nearest-Neighbor. Instant.",
      highlightColor: "from-pink-500 to-rose-600",
      accentBg: "bg-pink-500/10 text-pink-400",
      pillText: "Redefining movie matching, one coordinate at a time.",
      sideBlockTitle: "Personalized search, at every point.",
      sideBlockDesc: "Where 8.8k+ film corpora are mathematically mapped into dense vector spaces to resolve preferences flawlessly.",
      bottomLogo: "xpectai",
      icon: <Heart size={18} className="text-pink-400" />,
    },
    {
      id: "03",
      title: "Hospital SQL",
      heading: "Inclusive. Relational. Normalized.",
      highlightColor: "from-yellow-400 to-amber-500",
      accentBg: "bg-yellow-500/10 text-yellow-400",
      pillText: "Redefining relational databases, one patient at a time.",
      sideBlockTitle: "Personalized health, at every query.",
      sideBlockDesc: "Where patients, doctors, and complex billing loops are fully structured with complete analytical safety.",
      bottomLogo: "hospitalpoint",
      icon: <ShieldAlert size={18} className="text-yellow-400" />,
    },
  ];

  const currentTab = folderTabs.find((t) => t.id === activeTab) || folderTabs[0];

  return (
    <section id="work" ref={ref} className="bg-white dark:bg-[#07080a] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime">
            · INTERACTIVE DEMOS
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Selected Systems Layer
          </h2>
          <p className="mt-4 text-sm text-ink/60">
            Ather's flagship architectures presented in an interactive, clay-morphic folder layout modeled precisely after Healthpoint. Click tabs to switch systems!
          </p>
        </div>

        {/* ── HEALTHPOINT STYLE INTERACTIVE TABBED FOLDER CARD ── */}
        <div className="relative max-w-5xl mx-auto">
          {/* Ambient Glow Gradient background */}
          <div className="absolute -inset-6 bg-gradient-to-tr from-[#7ea6f2]/10 via-[#e8cef2]/10 to-[#fcdcd3]/10 blur-3xl rounded-[40px] pointer-events-none" />

          {/* Floating Top Labeled pill and indicator */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 max-w-4xl mx-auto mb-4">
            {/* Search Pill */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#fafafa] dark:bg-black/30 border border-line px-4 py-2.5 shadow-sm max-w-md w-full">
              <Search size={14} className="text-[#5c85d6]" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs font-medium text-ink/70"
                >
                  {currentTab.pillText}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Letter brand sticker */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 border border-purple-200 dark:border-purple-900 rounded-xl px-3 py-2 shadow-sm">
              <span className="font-serif font-extrabold text-[#5c85d6]">h</span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            </div>
          </div>

          {/* Interactive tabs sticking out of the folder precisely as pictured */}
          <div className="relative z-10 flex gap-2 max-w-4xl mx-auto px-6">
            {folderTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative px-5 py-3.5 rounded-t-2xl font-bold text-xs uppercase tracking-widest border-t border-x border-line transition-all duration-300 flex items-center gap-2 ${
                  activeTab === t.id
                    ? "bg-[#0c0e12] text-white border-transparent z-15 shadow-[0_-8px_20px_rgba(0,0,0,0.06)]"
                    : "bg-[#e8f0fd] dark:bg-black/20 text-[#5c85d6] hover:bg-[#fafafc] z-10"
                }`}
              >
                {t.icon}
                <span>{t.title}</span>
                {activeTab === t.id && (
                  <span className={`absolute bottom-[-1px] left-0 right-0 h-1 bg-gradient-to-r ${t.highlightColor}`} />
                )}
              </button>
            ))}
          </div>

          {/* Core Folder Body Block */}
          <div className="relative z-10 rounded-[36px] bg-[#0c0e12] text-white p-8 sm:p-12 min-h-[460px] flex flex-col justify-between overflow-hidden shadow-2xl border border-white/5">
            
            {/* Ambient inner soft background glow */}
            <div className={`absolute -bottom-24 -left-12 h-80 w-80 rounded-full bg-gradient-to-tr ${currentTab.highlightColor} opacity-15 blur-3xl pointer-events-none`} />

            <div className="relative z-10 grid gap-10 md:grid-cols-12 items-center">
              {/* Left Column: Bold headings */}
              <div className="md:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-white max-w-md">
                      {currentTab.heading}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Light side card precise replica of Healthpoint right card */}
              <div className="md:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="rounded-3xl bg-[#fcdcd3] text-[#0c0e12] p-6 shadow-xl"
                  >
                    <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${currentTab.accentBg}`}>
                      SYSTEM_{currentTab.id}
                    </span>
                    <h4 className="text-lg font-bold tracking-tight mt-4">{currentTab.sideBlockTitle}</h4>
                    <p className="text-xs text-[#0c0e12]/70 mt-2 leading-relaxed">
                      {currentTab.sideBlockDesc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Section: Translucent big signature brand watermark */}
            <div className="relative z-10 mt-12 flex justify-between items-end border-t border-white/10 pt-8">
              <span className="text-5xl sm:text-6xl font-serif font-extrabold text-white/5 lowercase tracking-tight">
                {currentTab.bottomLogo}
              </span>
              
              <a
                href={projects.find((p) => p.id === activeTab)?.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-full bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/10 hover:bg-white hover:text-ink transition flex items-center gap-1.5"
              >
                <span>Inspect Repository</span>
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </a>
            </div>

          </div>
        </div>

        {/* ── DYNAMIC GRADIENT & MULTIPLE SHADOW CLICKABLE CARDS GRID ── */}
        <div className="mt-28">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2] dark:text-lime">
            · GRADIENT & MULTIPLY SHADOW SHOWER
          </p>
          <h3 className="mt-3 text-center text-2xl font-semibold text-ink">
            Interactive Project Catalogue
          </h3>
          <p className="text-center text-xs text-ink/50 mt-1">
            Click on any catalog card to trigger custom vibrant gradient glowing lines and stacked multiple drop-shadow offset physics!
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => {
              const isClicked = clickedCardId === p.id;
              
              return (
                <motion.div
                  key={p.id}
                  onClick={() => setClickedCardId(isClicked ? null : p.id)}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative rounded-[32px] p-6 cursor-pointer border transition-all duration-300 ${
                    isClicked
                      ? "border-transparent bg-white dark:bg-[#12141c]"
                      : "border-line bg-white/70 dark:bg-black/20"
                  }`}
                  // Dynamic multiply shadow offset styling when clicked
                  style={{
                    boxShadow: isClicked
                      ? "0 4px 10px rgba(0,0,0,0.02), 0 12px 30px rgba(126,166,242,0.15), 0 32px 64px rgba(232,206,242,0.25)"
                      : "0 10px 30px rgba(31,45,71,0.03)",
                  }}
                >
                  {/* Dynamic outline gradient loop */}
                  {isClicked && (
                    <motion.div
                      layoutId="gradient-glowing-outline"
                      className="absolute -inset-[2px] rounded-[34px] bg-gradient-to-r from-[#7ea6f2] via-[#e8cef2] to-[#fcdcd3] -z-10"
                      transition={{ duration: 0.4 }}
                    />
                  )}

                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold text-[#5c85d6]">PROJECT_0{p.id}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                      isClicked ? "bg-lime text-ink" : "bg-black/5 dark:bg-white/5 text-ink/60"
                    }`}>
                      {isClicked ? "ACTIVE EFFECT ✓" : "CLICK ME"}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold tracking-tight mt-6 text-ink">{p.name}</h4>
                  <p className="text-xs text-ink/60 mt-2 leading-relaxed">{p.blurb}</p>

                  <div className="mt-6 flex flex-wrap gap-1">
                    {p.stack.slice(0, 2).map((s) => (
                      <span key={s} className="rounded bg-black/5 dark:bg-white/5 px-2 py-0.5 text-[9px] font-semibold text-ink/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Repo index */}
          <div className="mt-8 overflow-hidden rounded-[28px] border border-line bg-white/70 dark:bg-black/30">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                Repository index · ather-ops
              </p>
              <a href="https://github.com/ather-ops" target="_blank" rel="noreferrer" className="text-[12px] font-semibold text-[#5c85d6] hover:text-[#7ea6f2]">
                View GitHub ↗
              </a>
            </div>
            <ul>
              {moreProjects.map((p) => (
                <li key={p.id} className="border-t border-line">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid grid-cols-[48px_1fr_auto] items-center gap-4 px-6 py-4 hover:bg-[#fafafc] dark:hover:bg-white/5 transition"
                  >
                    <span className="text-xs font-semibold text-ink/35">{p.id}</span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-ink/45">{p.desc}</span>
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-ink/40">{p.lang}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
export {};
