import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { expertise, skillGroups } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const askAboutStack = () =>
  window.dispatchEvent(
    new CustomEvent("uri:ask", { detail: "What are his technical skills?" })
  );

export default function Expertise() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="expertise" ref={ref} className="bg-[#f0f3f6] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]"
          >
            · SKILLS & SYSTEMS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            The stack behind
            <br />
            <span className="font-serif italic font-normal text-[#5c85d6]">the shipping.</span>
          </motion.h2>
          <p className="mt-4 text-sm text-ink/60">
            Four systems in production or in progress, and the tooling that carries them. Anything
            still being learned is labelled as such.
          </p>
        </div>

        {/* Project-focused capability cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((item, i) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 24 }}
              whileHover={{ y: -6 }}
              className="clay-card p-6 flex flex-col justify-between min-h-[230px]"
            >
              <div>
                <span className="inline-flex rounded-full bg-lime/25 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/70">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/60">{item.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Full skills matrix */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 26 }}
          className="clay-card mt-6 overflow-hidden p-8 sm:p-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7ea6f2]">
                Technical skills
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Everything on the résumé, nothing off it.
              </h3>
            </div>
            <button
              type="button"
              onClick={askAboutStack}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-ink-soft"
            >
              <Sparkles size={12} className="text-lime" />
              Ask URI about the stack
            </button>
          </div>

          <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5c85d6]">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-deep" />
                  {group.title}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/65">{group.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <p className="text-[11px] font-medium text-ink/45">
              Currently learning: AWS (EC2, S3, Lambda) · Advanced Python · PyTorch · LangGraph
            </p>
            <a
              href="#work"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5c85d6] transition hover:text-[#7ea6f2]"
            >
              See the systems <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
