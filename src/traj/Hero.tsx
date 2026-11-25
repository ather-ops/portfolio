import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { openUri, TjButton } from "./ui";

export default function Hero() {
  return (
    <section id="home" className="tj-hero">
      <img
        src="/img/traj-hero.jpg"
        alt="A paper plane gliding through a pastel dawn sky"
        className="tj-hero-img absolute inset-0 h-full w-full"
        fetchPriority="high"
      />
      <div className="tj-hero-wash" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1280px] flex-col px-5 pb-6 pt-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center pt-8 sm:pt-12"
        >
          <span className="tj-pill bg-[rgba(255,254,249,0.38)] backdrop-blur-sm">
            The portfolio of Ather Sama
          </span>
        </motion.div>

        <div className="flex flex-1 flex-col justify-center py-10 sm:py-14">
          <motion.h1
            aria-label="Intelligence in motion."
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="tj-display tj-hero-title"
          >
            <span className="block">Intelligence</span>{" "}
            <span className="tj-hero-line2">in motion.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex justify-end sm:mt-9"
          >
            <div className="w-full max-w-[368px]">
              <p className="tj-hero-copy">
                Ather builds live RAG systems, multi-agent tools and ML from first principles —
                nine deployments, seven public demos, one company.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <TjButton href="#work" variant="navy">
                  Explore the work
                </TjButton>
                <TjButton onClick={openUri} variant="peach" className="uri-trigger">
                  <Sparkles size={13} /> Ask URI
                </TjButton>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="flex items-center justify-between gap-4 border-t border-[rgba(38,50,66,0.18)] pt-4"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6c9a54] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#6c9a54]" />
            </span>
            <p className="tj-serif text-[13px] text-[rgba(31,42,56,0.72)]">
              Open to AI/ML internships &amp; remote roles
            </p>
          </div>
          <a
            href="#live"
            aria-label="Scroll to the work"
            className="hidden items-center gap-2 text-[rgba(31,42,56,0.55)] transition hover:text-[var(--tj-navy)] sm:flex"
          >
            <span className="tj-label">Scroll</span>
            <span className="grid h-7 w-7 place-items-center rounded-full border border-[rgba(38,50,66,0.28)]">
              <ArrowDown size={12} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
