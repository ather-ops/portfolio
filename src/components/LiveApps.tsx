import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import { liveApps, profile } from "../data";

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(5px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function LiveApps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const liveNow = liveApps.filter((app) => app.status === "Live").length;

  return (
    <section id="live" ref={ref} className="bg-[#f0f3f6] px-5 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ea6f2]"
          >
            · LIVE APPS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mt-4 text-3xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Nine deployments.
            <br />
            <span className="font-serif italic font-normal text-[#5c85d6]">One link each.</span>
          </motion.h2>
          <p className="mt-4 text-sm text-ink/60">
            {liveNow} apps are live right now across Streamlit Cloud, Render and Vercel — RAG,
            agents, an async API engine, SQL analytics and two models built from scratch. Atlas
            Agent is temporarily under maintenance.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {liveApps.map((app, i) => (
            <motion.article
              key={app.id}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 220, damping: 24 }}
              whileHover={{ y: -6 }}
              className="clay-card flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/55">
                    {app.kind}
                  </span>
                  <span
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${
                      app.status === "Live"
                        ? "bg-emerald-500/12 text-emerald-700"
                        : "bg-amber-500/15 text-amber-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        app.status === "Live" ? "animate-pulse bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    {app.status}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{app.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/60">{app.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {app.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-black/5 px-2 py-0.5 text-[9px] font-semibold text-ink/65"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {app.sleeps && (
                  <p className="mt-2 text-[9px] font-medium text-ink/35">
                    Streamlit app — first visit wakes it (~20s)
                  </p>
                )}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
                {app.status === "Live" ? (
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-ink-soft"
                  >
                    Open app
                    <ArrowUpRight size={12} className="text-lime" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-700">
                    Deployment paused
                  </span>
                )}
                {app.extra && (
                  <a
                    href={app.extra.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5c85d6] transition hover:text-[#7ea6f2]"
                  >
                    {app.extra.label} ↗
                  </a>
                )}
                {app.repo && (
                  <a
                    href={app.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${app.name} source code`}
                    className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-white/70 text-ink/50 transition hover:text-ink"
                  >
                    <Terminal size={13} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[28px] border border-line bg-white/70 p-6 text-center sm:flex-row sm:text-left"
        >
          <p className="max-w-xl text-xs leading-relaxed text-ink/55">
            All links come from the repositories themselves. Streamlit Community Cloud apps sleep
            after inactivity — the first load wakes them in roughly 20 seconds, and Atlas Agent is
            paused while it is rebuilt.
          </p>
          <a
            href={profile.github + "?tab=repositories"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-lime-deep"
          >
            <Sparkles size={12} />
            All 14 repositories
            <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
