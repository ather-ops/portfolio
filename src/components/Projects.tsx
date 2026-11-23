import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Activity, Heart, Layers, ShieldAlert, ExternalLink } from "lucide-react";
import { allRepos, projects } from "../data";

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("01");
  const [clickedCardId, setClickedCardId] = useState<string | null>(null);

  const folderTabs = [
    {
      id: "01",
      title: "PayPal Copilot",
      heading: "Structured. Grounded. Human-reviewed.",
      highlightColor: "from-blue-500 to-indigo-600",
      accentBg: "bg-blue-500/10 text-blue-500",
      pillText: "An agent that reads disputes, not vibes.",
      sideBlockTitle: "Five answers a merchant can defend.",
      sideBlockDesc:
        "FIGHT, REFUND, OFFER, GATHER_MORE_EVIDENCE or ESCALATE — retrieved from policy on FAISS, limited by a three-tool allowlist, and handed to a human.",
      bottomLogo: "paypalcopilot",
      icon: <ShieldAlert size={18} className="text-blue-500" />,
    },
    {
      id: "02",
      title: "Amazn AI",
      heading: "Two indexes. Three tools. One answer.",
      highlightColor: "from-amber-400 to-rose-500",
      accentBg: "bg-rose-500/10 text-rose-500",
      pillText: "Route the question, then chain the tools.",
      sideBlockTitle: "Product RAG, support RAG, live orders.",
      sideBlockDesc:
        "A smolagents CodeAgent picks the right tool, chains results into a single reply, and falls back from a 2-step to a 10-step agent when the question is hard.",
      bottomLogo: "amaznai",
      icon: <Activity size={18} className="text-rose-500" />,
    },
    {
      id: "03",
      title: "Xpect AI",
      heading: "Semantic. Exact. Fifteen days.",
      highlightColor: "from-pink-500 to-violet-600",
      accentBg: "bg-pink-500/10 text-pink-500",
      pillText: "8,807 titles, 384 dimensions, top-5 matches.",
      sideBlockTitle: "Retrieval rebuilt from scratch.",
      sideBlockDesc:
        "ChromaDB and NLTK replaced with FAISS and pure-Python preprocessing; Gemini swapped for Groq. Answers stay inside retrieved context, always.",
      bottomLogo: "xpectai",
      icon: <Heart size={18} className="text-pink-500" />,
    },
    {
      id: "04",
      title: "PulseMesh",
      heading: "Many APIs. One normalized answer.",
      highlightColor: "from-cyan-400 to-blue-600",
      accentBg: "bg-cyan-500/10 text-cyan-600",
      pillText: "Concurrency that survives individual failures.",
      sideBlockTitle: "FastAPI fan-out, per-call retries.",
      sideBlockDesc:
        "asyncio and aiohttp call many APIs at once; each request gets its own timeout and retry, then a Pydantic-validated response reports success and failure counts.",
      bottomLogo: "pulsemesh",
      icon: <Layers size={18} className="text-cyan-600" />,
    },
  ];

  const currentTab = folderTabs.find((t) => t.id === activeTab) || folderTabs[0];
  const currentProject = projects.find((p) => p.id === activeTab);

  return (
    <section id="work" ref={ref} className="bg-white px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]">
            · SELECTED SYSTEMS
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Shipped, not sketched.
          </h2>
          <p className="mt-4 text-sm text-ink/60">
            Six systems with working deployments — four flagship tabs here, then every public
            repository and its live link below.
          </p>
        </div>

        {/* ── INTERACTIVE TABBED FOLDER CARD ── */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-6 bg-gradient-to-tr from-[#7ea6f2]/10 via-[#e8cef2]/10 to-[#fcdcd3]/10 blur-3xl rounded-[40px] pointer-events-none" />

          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 max-w-4xl mx-auto mb-4">
            {/* Search pill */}
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#fafafa] border border-line px-4 py-2.5 shadow-sm max-w-md w-full">
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

            {/* Brand sticker */}
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#eaf1ff] to-[#f0fbdf] border border-[#cfe0ff] rounded-xl px-3 py-2 shadow-sm">
              <span className="font-serif font-extrabold text-[#5c85d6]">ather</span>
              <span className="h-1.5 w-1.5 rounded-full bg-lime-deep animate-pulse" />
            </div>
          </div>

          {/* Folder tabs */}
          <div className="relative z-10 flex gap-2 max-w-4xl mx-auto px-6 overflow-x-auto hide-scrollbar">
            {folderTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative shrink-0 px-4 py-3.5 rounded-t-2xl font-bold text-[11px] uppercase tracking-widest border-t border-x border-line transition-all duration-300 flex items-center gap-2 ${
                  activeTab === t.id
                    ? "bg-[#0c0e12] text-white border-transparent z-15 shadow-[0_-8px_20px_rgba(0,0,0,0.06)]"
                    : "bg-[#e8f0fd] text-[#5c85d6] hover:bg-[#fafafc] z-10"
                }`}
              >
                {t.icon}
                <span>{t.title}</span>
                {activeTab === t.id && (
                  <span
                    className={`absolute bottom-[-1px] left-0 right-0 h-1 bg-gradient-to-r ${t.highlightColor}`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Folder body */}
          <div className="relative z-10 rounded-[36px] bg-[#0c0e12] text-white p-8 sm:p-12 min-h-[460px] flex flex-col justify-between overflow-hidden shadow-2xl border border-white/5">
            <div
              className={`absolute -bottom-24 -left-12 h-80 w-80 rounded-full bg-gradient-to-tr ${currentTab.highlightColor} opacity-15 blur-3xl pointer-events-none`}
            />

            <div className="relative z-10 grid gap-10 md:grid-cols-12 items-center">
              <div className="md:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/60">
                      {currentProject?.kind} · {currentProject?.status}
                    </span>
                    <h3 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-white max-w-md">
                      {currentTab.heading}
                    </h3>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {currentProject?.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-semibold text-white/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="md:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="rounded-3xl bg-[#fcdcd3] text-[#0c0e12] p-6 shadow-xl"
                  >
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${currentTab.accentBg}`}
                    >
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

            <div className="relative z-10 mt-12 flex flex-wrap justify-between items-end gap-4 border-t border-white/10 pt-8">
              <span className="text-5xl sm:text-6xl font-serif font-extrabold text-white/5 lowercase tracking-tight">
                {currentTab.bottomLogo}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {currentProject?.live && (
                  <a
                    href={currentProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-full bg-lime px-5 py-3 text-xs font-bold uppercase tracking-widest text-ink transition hover:bg-lime-deep flex items-center gap-1.5"
                  >
                    {currentProject.status === "Live" ? "Live demo" : "Demo (maintenance)"}
                    <ExternalLink size={13} />
                  </a>
                )}
                <a
                  href={currentProject?.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-full bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/10 hover:bg-white hover:text-ink transition flex items-center gap-1.5"
                >
                  <span>Inspect repository</span>
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── PROJECT CATALOGUE ── */}
        <div className="mt-28">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]">
            · THE CATALOGUE
          </p>
          <h3 className="mt-3 text-center text-2xl font-semibold text-ink">
            Six builds, each with a live link
          </h3>
          <p className="text-center text-xs text-ink/50 mt-1">
            Tap a card for the gradient outline and stacked shadow, then open the app or the code.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => {
              const isClicked = clickedCardId === p.id;

              return (
                <motion.div
                  key={p.id}
                  onClick={() => setClickedCardId(isClicked ? null : p.id)}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative rounded-[32px] p-6 cursor-pointer border transition-all duration-300 block ${
                    isClicked ? "border-transparent bg-white" : "border-line bg-white/70"
                  }`}
                  style={{
                    boxShadow: isClicked
                      ? "0 4px 10px rgba(0,0,0,0.02), 0 12px 30px rgba(126,166,242,0.15), 0 32px 64px rgba(232,206,242,0.25)"
                      : "0 10px 30px rgba(31,45,71,0.03)",
                  }}
                >
                  {isClicked && (
                    <motion.div
                      layoutId="gradient-glowing-outline"
                      className="absolute -inset-[2px] rounded-[34px] bg-gradient-to-r from-[#7ea6f2] via-[#e8cef2] to-[#fcdcd3] -z-10"
                      transition={{ duration: 0.4 }}
                    />
                  )}

                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold text-[#5c85d6]">
                      PROJECT_0{p.id}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        p.status === "Live"
                          ? "bg-emerald-500/12 text-emerald-700"
                          : isClicked
                            ? "bg-lime text-ink"
                            : "bg-black/5 text-ink/60"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold tracking-tight mt-6 text-ink">{p.name}</h4>
                  <p className="text-xs text-ink/60 mt-2 leading-relaxed">{p.blurb}</p>

                  <div className="mt-5 flex flex-wrap gap-1">
                    {p.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded bg-black/5 px-2 py-0.5 text-[9px] font-semibold text-ink/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    {p.status === "Live" ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#3f6fc4] transition hover:text-[#7ea6f2]"
                      >
                        Live app
                        <ExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-600">
                        Deployment paused
                      </span>
                    )}
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/45 transition hover:text-ink"
                    >
                      Code
                      <ArrowUpRight size={11} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── FULL REPOSITORY INDEX ── */}
        <div className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]">
                · EVERY PUBLIC REPOSITORY
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">All 14 repos, live links marked</h3>
            </div>
            <a
              href="#live"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5c85d6] transition hover:text-[#7ea6f2]"
            >
              Jump to live apps <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-line bg-white/70">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                Repository index · ather-ops
              </p>
              <a
                href="https://github.com/ather-ops?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="text-[12px] font-semibold text-[#5c85d6] hover:text-[#7ea6f2]"
              >
                View GitHub ↗
              </a>
            </div>
            <ul>
              {allRepos.map((repo) => (
                <li key={repo.name} className="border-t border-line">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 transition hover:bg-[#fafafc]">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group min-w-0"
                    >
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm font-semibold text-ink transition group-hover:text-[#5c85d6]">
                          {repo.name}
                        </span>
                        {repo.stars > 0 && (
                          <span className="rounded bg-black/5 px-1.5 py-0.5 text-[9px] font-bold text-ink/50">
                            ★ {repo.stars}
                          </span>
                        )}
                        {repo.live && (
                          <span className="rounded-full bg-emerald-500/12 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-700">
                            Live
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink/45">{repo.desc}</span>
                    </a>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-ink/40">
                        {repo.lang}
                      </span>
                      {repo.live && (
                        <a
                          href={repo.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${repo.name} live`}
                          className="grid h-7 w-7 place-items-center rounded-full bg-lime text-ink transition hover:bg-lime-deep"
                        >
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
