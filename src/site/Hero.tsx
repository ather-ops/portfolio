import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { openUri } from "./ui";

const appMarks = [
  { label: "X", tone: "bg-[#1d3fbf]" },
  { label: "P", tone: "bg-[#0f5c4a]" },
  { label: "A", tone: "bg-[#8a4a2a]" },
  { label: "M", tone: "bg-[#6b4bb0]" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden bg-[#0b1f5e]">
      <img
        src="/img/hero-bloom.jpg"
        alt="An iridescent pink flower floating against a deep blue sky"
        className="hero-photo absolute inset-0 h-full w-full"
        fetchPriority="high"
      />
      <div className="hero-shade absolute inset-0" />
      <div className="hero-dots absolute inset-0 opacity-50" />
      <div className="hero-fade absolute inset-x-0 bottom-0 h-24" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-32 sm:px-8 sm:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70"
        >
          Ather Sama · ML / AI engineer · Founder, Atherva Automations
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="hero-copy display mt-4 max-w-[780px] text-[46px] text-white sm:text-[64px] lg:text-[78px]"
        >
          Building AI that{" "}
          <br />
          ships, not demos.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="hero-copy mt-5 max-w-[420px] text-[13px] leading-relaxed text-white/80 sm:text-[14px]"
        >
          Live RAG systems, multi-tool agents and ML from first principles — nine deployments,
          seven public demos, and a company building the same thing for businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44 }}
          className="mt-7 flex flex-wrap items-center gap-2.5"
        >
          <a href="#live" className="btn-light">
            Explore the live work
          </a>
          <button
            type="button"
            onClick={openUri}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-4 py-3 text-[12px] font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <Sparkles size={13} /> Ask URI
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-end justify-between gap-5 border-t border-white/15 pt-5 sm:mt-16 hero-proof"
        >
          <div className="flex items-center gap-2 text-[11px] text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b9ef74] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9f68b]" />
            </span>
            Open to AI/ML internships &amp; remote roles
            <span className="hidden text-white/35 sm:inline">·</span>
            <span className="hidden text-white/50 sm:inline">Available immediately</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {appMarks.map((mark) => (
                <span
                  key={mark.label}
                  className={`grid h-8 w-8 place-items-center rounded-full border-2 border-white/80 text-[10px] font-semibold text-white ${mark.tone}`}
                >
                  {mark.label}
                </span>
              ))}
            </div>
            <div className="text-[11px] leading-tight text-white/70">
              <p className="font-semibold text-white">9 deployments</p>
              <p>7 demo apps · 1 paused</p>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#start"
        aria-label="Scroll to the work"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-white/45 transition hover:text-white/80 sm:block"
      >
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
