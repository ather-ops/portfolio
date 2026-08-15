import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Sparkles, Server, Terminal, Award, Play } from "lucide-react";
import { profile } from "../data";

interface GravityBlock {
  id: string;
  name: string;
  color: string;
  x: number;
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [waitlistStatus, setWaitlistStatus] = useState("Join Waitlist");
  const [successPopup, setSuccessPopup] = useState(false);
  
  // Interactive Prompt states
  const [promptText, setPromptText] = useState("Describe what you want to build...");
  const [category, setPromptCategory] = useState("Web Design");
  const [blocks, setBlocks] = useState<GravityBlock[]>([
    { id: "1", name: "Embedding Space", color: "bg-lime text-ink", x: 12 },
    { id: "2", name: "ChromaDB Matrix", color: "bg-sky-400 text-white", x: 38 },
    { id: "3", name: "Euclidean Nodes", color: "bg-purple-500 text-white", x: 62 },
  ]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Soft Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const textYSpring = useSpring(textY, { stiffness: 70, damping: 25 });
  const cardsYSpring = useSpring(cardsY, { stiffness: 80, damping: 26 });

  const handleJoin = () => {
    if (waitlistStatus === "Join Waitlist") {
      setWaitlistStatus("Offer Extended! ✓");
      setSuccessPopup(true);
      setTimeout(() => setSuccessPopup(false), 5000);
    }
  };

  const spawnGravityBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    const randomX = Math.floor(Math.random() * 70) + 10;
    const newBlock: GravityBlock = {
      id: Date.now().toString(),
      name: promptText.length > 20 ? promptText.slice(0, 18) + "..." : promptText,
      color: category === "Web Design" ? "bg-lime text-ink" : "bg-purple-500 text-white",
      x: randomX,
    };

    setBlocks((prev) => [...prev, newBlock]);
    setPromptText("");
  };

  return (
    <section ref={ref} id="home" className="relative isolate overflow-hidden sky-bg min-h-screen pt-32 pb-24 px-5 sm:px-10 lg:pt-40 lg:pb-32">
      {/* Dynamic Grid Overlay */}
      <div className="hero-grid absolute inset-0 opacity-40 pointer-events-none" />
      <div className="hero-grid-fine absolute inset-0 opacity-20 pointer-events-none" />
      <div className="noise absolute inset-0" />

      {/* ── Fluffy Dreamy 3D Clouds ── */}
      <div className="absolute top-[12%] -left-12 hidden md:block">
        <div className="relative">
          <div className="cloud-bubble h-28 w-44 rounded-full" />
          <div className="cloud-bubble absolute -top-6 left-12 h-20 w-32 rounded-full" />
          <div className="cloud-bubble absolute top-6 left-20 h-16 w-24 rounded-full" />
          <span className="absolute top-10 left-12 z-25 rounded-xl bg-lime px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink rotate-[-12deg] shadow-lg border border-white/20">
            NUMPY SCRATCH
          </span>
        </div>
      </div>

      <div className="absolute top-[16%] -right-16 hidden md:block">
        <div className="relative">
          <div className="cloud-bubble h-32 w-52 rounded-full" />
          <div className="cloud-bubble absolute -top-8 right-16 h-22 w-36 rounded-full" />
          <div className="cloud-bubble absolute top-8 right-24 h-16 w-28 rounded-full" />
        </div>
      </div>

      <div className="absolute bottom-[20%] left-[-4%] hidden lg:block opacity-75">
        <div className="relative">
          <div className="cloud-bubble h-24 w-40 rounded-full" />
          <div className="cloud-bubble absolute -top-4 left-10 h-16 w-28 rounded-full" />
        </div>
      </div>

      {/* Hero content container */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-sm border border-white/35"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          SEE YOU FALL 2026
        </motion.p>

        <motion.h1
          style={{ y: textYSpring }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.1 }}
          className="mx-auto max-w-4xl text-[44px] font-medium leading-[1.02] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(30,60,110,0.18)] sm:text-6xl lg:text-[88px]"
        >
          Build intelligence, get
          <br />
          <span className="font-serif italic font-normal text-white">deployed, and do good.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/90 sm:text-base"
        >
          Turn your data corpora into production-ready RAG pipelines, autonomous agents, and mathematically derived ML algorithms. Pure numpy, zero shortcuts.
        </motion.p>

        {/* Dynamic waitlist call action + LeetCode Direct Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleJoin}
            className="rounded-full bg-white px-7 py-3 text-[13px] font-bold uppercase tracking-widest text-ink shadow-[0_12px_36px_rgba(20,50,90,0.15)] hover:bg-[#fafafc] transition"
          >
            {waitlistStatus}
          </motion.button>
          
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-lime px-6 py-3 text-[13px] font-bold uppercase tracking-widest text-ink shadow-[0_12px_36px_rgba(20,50,90,0.15)] flex items-center gap-2 hover:bg-lime-deep transition animate-bounce"
          >
            <Award size={14} /> Verify LeetCode Profile
          </a>

          <a
            href="#recruiter-portal"
            className="rounded-full bg-white/15 px-6 py-3 text-[13px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/20 hover:bg-white/25 transition"
          >
            HR Direct Hub
          </a>
        </motion.div>

        {/* ── Floating Claymorphic Assets (Old what we had) ── */}
        <motion.div
          style={{ y: cardsYSpring }}
          className="relative mt-16 w-full max-w-5xl mx-auto lg:mt-24 min-h-[420px]"
        >
          {/* Card 1: Ather's Dev Cash Card */}
          <GravityCard
            className="absolute left-[3%] top-12 w-[220px] rotate-[-12deg] bg-gradient-to-tr from-[#7ea6f2] to-[#b3cdef] border-white/40 shadow-2xl"
            delay={0.4}
            floatDelay={0}
          >
            <div className="flex justify-between items-start text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Ather Dev Card</span>
              <Terminal size={14} className="opacity-80" />
            </div>
            <p className="mt-8 text-2xl font-bold font-mono tracking-wider text-white">99.7%</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/70 mt-1">Accuracy Score</p>
            <div className="mt-8 flex justify-between items-end">
              <span className="text-[10px] font-medium text-white/50">LLM REASONING</span>
              <span className="h-4 w-7 bg-white/20 rounded-md border border-white/10" />
            </div>
          </GravityCard>

          {/* Card 2: Clustered Datacenter / Ather's ML Lab */}
          <GravityCard
            className="absolute left-[24%] top-0 w-[210px] rotate-[-4deg] bg-white/95"
            delay={0.5}
            floatDelay={1.2}
          >
            <div className="flex items-center gap-1.5 text-lime-deep">
              <Server size={14} />
              <span className="text-[9px] font-bold uppercase tracking-wider text-ink/40">Lab Module</span>
            </div>
            <p className="mt-3 text-lg font-semibold tracking-tight text-ink">Ather's ML Lab</p>
            <div className="mt-4 space-y-2">
              {["Agentic Loop", "Vector Search", "Gradient Descent"].map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  <span className="text-[11px] font-medium text-ink/60">{tag}</span>
                </div>
              ))}
            </div>
            <span className="absolute -top-3 -right-3 rounded-full bg-lime px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-ink shadow-md">
              ACTIVE
            </span>
          </GravityCard>

          {/* Card 3: Live Avatar Shower Card */}
          <GravityCard
            className="absolute left-1/2 top-4 w-[230px] -translate-x-1/2 bg-white text-ink border-white/60"
            delay={0.55}
            floatDelay={0.6}
          >
            <div className="relative h-28 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 p-3">
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, 80], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.2 }}
                  className="absolute text-lime font-mono text-[9px] font-bold"
                  style={{ left: `${15 + i * 16}%`, top: 4 }}
                >
                  {"{"}0.97{"}"}
                </motion.span>
              ))}
              <img
                src={profile.photo}
                alt={profile.name}
                className="mx-auto h-20 w-20 rounded-full border-4 border-lime object-cover shadow-xl mt-2"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink/40">Tokens Completed</p>
                <p className="text-sm font-bold text-ink">You just got deployed!</p>
              </div>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-ink">
                <Sparkles size={12} />
              </span>
            </div>
          </GravityCard>

          {/* Card 4: Amazon MLSS Shortlist Success */}
          <GravityCard
            className="absolute right-[22%] top-8 w-[210px] rotate-[6deg] bg-indigo-950 text-white border-white/10"
            delay={0.6}
            floatDelay={1.8}
            darkBg
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-lime">Amazon 2026</p>
            <p className="mt-2 text-md font-semibold leading-snug">ML Summer School Shortlist</p>
            <p className="text-[11px] text-white/50 mt-1">SOP shortlists out of 134k+ applicants</p>
            <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1 }}
                className="h-full bg-lime rounded-full"
              />
            </div>
            <p className="mt-2 text-[9px] font-bold text-lime">CONGRATULATIONS ✓</p>
          </GravityCard>

          {/* Card 5: Hospital SQL Visualizer */}
          <GravityCard
            className="absolute right-[2%] top-16 w-[210px] rotate-[10deg] bg-white text-ink border-white/60"
            delay={0.65}
            floatDelay={2.4}
          >
            <div className="flex items-center justify-between text-ink/40">
              <span className="text-[10px] font-bold uppercase tracking-wider">Hospital Management SQL</span>
              <Terminal size={12} />
            </div>
            <p className="mt-3 text-[11px] text-ink/60">Fully normalized relational database query latency:</p>
            <div className="mt-4 flex h-16 items-end gap-1.5 border-b border-line pb-1">
              {[45, 62, 33, 85, 48, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.5 + i * 0.1, type: "spring" }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-sky-400 to-indigo-600"
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-ink/40 mt-2 font-mono">
              <span>q01</span><span>q06</span>
            </div>
          </GravityCard>
        </motion.div>

        {/* ── Make.Design Interactive Gravity Sandbox Mockup Screen ── */}
        <motion.div
          style={{ y: cardsYSpring }}
          className="relative mt-20 w-full max-w-4xl mx-auto rounded-[32px] overflow-hidden p-8 flex flex-col justify-between min-h-[520px] shadow-2xl border border-white/40"
        >
          {/* Real world sky, clouds, and green wildflower plants background overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/37891511/pexels-photo-37891511.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Real sky and wildflower plants"
              className="w-full h-full object-cover select-none"
            />
            {/* Real sky / glass overlay */}
            <div className="absolute inset-0 bg-sky-900/10 backdrop-blur-[1px]" />
          </div>

          <div className="absolute inset-0 bg-[#f7f9fc]/10 dark:bg-black/10 pointer-events-none z-0" />
          
          {/* Mockup Header tab */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/20 pb-4 mb-6">
            <span className="text-xs font-bold text-white tracking-wide">make.design / make.ml</span>
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
          </div>

          <div className="relative z-10 text-center max-w-xl mx-auto my-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">Make Design</h2>
            <p className="text-xs text-white/90 font-medium mt-2 drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
              Describe what you want to build, and we handle the rest. From idea to stunning design in seconds.
            </p>
          </div>

          {/* Prompt Form & Selector */}
          <form onSubmit={spawnGravityBlock} className="relative max-w-xl w-full mx-auto bg-white/70 dark:bg-black/40 p-4 rounded-2xl border border-line shadow-lg mt-4 z-20">
            <input
              required
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Describe what you want to build..."
              className="w-full text-sm bg-transparent border-none text-ink placeholder:text-ink/40 p-2"
            />
            <div className="flex items-center justify-between border-t border-line pt-3 mt-3">
              <select
                value={category}
                onChange={(e) => setPromptCategory(e.target.value)}
                className="text-xs font-bold uppercase tracking-wider text-ink/60 bg-transparent border-none focus:outline-none cursor-pointer"
              >
                <option value="Web Design">Web Design</option>
                <option value="ML Pipeline">ML Pipeline</option>
              </select>

              <button
                type="submit"
                className="grid h-8 w-8 place-items-center rounded-full bg-ink dark:bg-white text-white dark:text-ink hover:scale-115 transition"
              >
                <Play size={12} className="ml-0.5" />
              </button>
            </div>
          </form>

          {/* ── GRAVITY COLLISION CONTAINER ── */}
          <div className="relative flex-1 w-full min-h-[220px] overflow-hidden mt-8 border-t border-dashed border-line">
            <AnimatePresence>
              {blocks.map((b) => (
                <motion.div
                  key={b.id}
                  initial={{ y: -180, opacity: 0, rotate: -20 }}
                  animate={{
                    y: 140,
                    opacity: 1,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 120,
                      damping: 10,
                      mass: 1.4,
                    }
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`absolute rounded-xl px-4 py-2 text-xs font-bold shadow-lg border border-white/20 cursor-pointer ${b.color}`}
                  style={{ left: `${b.x}%` }}
                >
                  {b.name}
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="absolute bottom-0 inset-x-0 h-4 border-t-2 border-dashed border-line bg-gradient-to-b from-[#fcdcd3]/5 to-transparent flex justify-between px-6 text-[9px] text-ink/30 font-mono">
              <span>GROUND PLANE (y = 140px)</span>
              <span>GRAVITY: 9.81 m/s²</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notification animation */}
      <AnimatePresence>
        {successPopup && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 rounded-2xl bg-white p-4 shadow-2xl border border-line flex items-center gap-3"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-lime text-ink">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-ink">Offer Extended!</p>
              <p className="text-xs text-ink/60">Thank you for visiting Ather's dynamic hub.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Gravity-spring floating card ─────────────────────────────────────── */
function GravityCard({
  children,
  className = "",
  delay = 0,
  floatDelay = 0,
  rotateInit = 0,
  darkBg = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  floatDelay?: number;
  rotateInit?: number;
  darkBg?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -90, rotate: rotateInit * 2, scale: 0.8 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotateInit,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 18,
        mass: 1.1,
        delay,
      }}
      whileHover={{
        scale: 1.05,
        rotate: rotateInit * 0.5,
        boxShadow: "0 30px 64px rgba(20,50,90,0.2)",
        transition: { type: "spring", stiffness: 360, damping: 20 },
      }}
      className={`rounded-3xl border p-5 text-left shadow-[0_22px_52px_rgba(20,50,90,0.12)] backdrop-blur-xl ${
        darkBg ? "bg-[#0b0c10]/85 text-white" : "bg-white/65"
      } ${className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          repeat: Infinity,
          duration: 5.5 + floatDelay * 0.5,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
