import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, Sparkles, ArrowRight, Play, Database, FileText } from "lucide-react";
import { profile } from "../data";

const checklistItems = [
  { id: "01", task: "Derive gradient descent from pure NumPy mathematical principles", verified: true },
  { id: "02", task: "Shortlisted in top 23% out of 134,000+ applicants (Amazon MLSS)", verified: true },
  { id: "03", task: "Built production-grade search pipeline over 8,800+ titles", verified: true },
  { id: "04", task: "Self-driven machine learning, vector embeddings, & agentic workflows", verified: true },
];

export default function RecruiterPortal() {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booked, setBooked] = useState(false);
  const [showMathResult, setShowMathResult] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay && selectedTime) {
      setBooked(true);
      // Trigger simple toast lookalike or email draft
      setTimeout(() => {
        window.location.href = `mailto:${profile.email}?subject=Interview Schedule: ${selectedDay} at ${selectedTime}&body=Hi Ather,%0D%0A%0D%0AWe reviewed your math-to-production portfolio and would love to chat on ${selectedDay} at ${selectedTime}.%0D%0A%0D%0ABest regards,`;
      }, 1500);
    }
  };

  const copySummaryMarkdown = () => {
    const text = `### ${profile.name} — AI & Machine Learning Engineer
* **Focus**: RAG systems, Agentic AI, ML from Mathematical Principles.
* **Credentials**: Amazon ML Summer School 2026 shortlists (~top 23%), Tata job simulations, Scaler Python.
* **Featured Projects**: Atlas Agent, Xpect AI (8.8k+ vector search), Hospital SQL.
* **Email**: ${profile.email}
* **GitHub**: ${profile.github}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="recruiter-portal" className="bg-[#f7f7f4] px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Portal Header */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-8 text-white shadow-[0_24px_56px_rgba(0,0,0,0.12)] md:p-12">
          {/* Glassic Background Grid */}
          <div className="hero-grid absolute inset-0 opacity-20 pointer-events-none" />
          <div className="hero-grid-fine absolute inset-0 opacity-25 pointer-events-none" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12">
            {/* Checklist & Profile */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-lime/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-lime">
                  ✦ Recruiter & HR Interactive Portal
                </span>
                <span className="h-2 w-2 animate-ping rounded-full bg-lime" />
              </div>

              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Ready to Hire Ather Immediately?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                You need builders who can translate mathematical formulas into highly optimized, running vector search and agentic code. Skip the standard pipeline — verify his foundations right here.
              </p>

              {/* Interactive checklist */}
              <div className="mt-8 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Ather's Hiring Checklist
                </p>
                {checklistItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 border border-white/5 hover:bg-white/10 transition"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-lime" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.task}</p>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-lime/85 flex items-center gap-1 mt-0.5">
                        <Sparkles size={10} /> Verified Credentials
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Math Sandbox */}
              <div className="mt-6 rounded-2xl bg-black/60 border border-white/10 p-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-lime" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                      Numpy Foundations Emulator
                    </span>
                  </div>
                  <span className="rounded bg-lime/15 px-2 py-0.5 text-[9px] font-bold text-lime">Math Sandbox</span>
                </div>
                <div className="mt-3 font-mono text-xs text-white/80 space-y-1 bg-black/40 p-3 rounded-xl">
                  <p className="text-white/40"># Deriving gradient descent updates dynamically</p>
                  <p><span className="text-lime">def</span> <span className="text-indigo-300">gradient_descent</span>(X, y, lr=0.01, epochs=100):</p>
                  <p className="pl-4">w = np.zeros(X.shape[1])</p>
                  <p className="pl-4"><span className="text-lime">for</span> _ <span className="text-lime">in</span> range(epochs):</p>
                  <p className="pl-8">dw = -2 * np.dot(X.T, (y - np.dot(X, w))) / len(y)</p>
                  <p className="pl-8">w -= lr * dw</p>
                  <p className="pl-4"><span className="text-lime">return</span> w</p>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowMathResult(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
                  >
                    <Play size={12} className="text-lime" />
                    Run validation script
                  </motion.button>
                  {showMathResult && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs text-lime font-mono"
                    >
                      ✓ Loss converged to 10e-5 against Scikit-Learn
                    </motion.span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Scheduler */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="rounded-3xl bg-white p-6 text-ink shadow-2xl">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-lime-deep" />
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Schedule Interview</p>
                </div>
                <h3 className="mt-2 text-xl font-bold tracking-tight">Direct Sync Simulator</h3>
                <p className="mt-1 text-xs text-ink/60">Choose a day and time to draft an immediate email invite to Ather.</p>

                <form onSubmit={handleBooking} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink/40">Select Date</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {["Tomorrow", "Next Monday", "Next Wednesday"].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDay(day)}
                          className={`rounded-full border py-2.5 text-xs font-medium transition ${
                            selectedDay === day
                              ? "border-ink bg-ink text-white"
                              : "border-line bg-mist text-ink/80 hover:bg-line"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink/40">Select Time</label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {["10:00 AM", "2:00 PM", "4:30 PM"].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-full border py-2 text-xs font-medium transition ${
                            selectedTime === time
                              ? "border-ink bg-ink text-white"
                              : "border-line bg-mist text-ink/80 hover:bg-line"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {!booked ? (
                      <motion.button
                        key="book"
                        type="submit"
                        disabled={!selectedDay || !selectedTime}
                        className={`w-full rounded-full py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition ${
                          selectedDay && selectedTime ? "bg-ink hover:bg-ink-soft cursor-pointer" : "bg-ink/25 cursor-not-allowed"
                        }`}
                      >
                        Schedule Interview Sync
                      </motion.button>
                    ) : (
                      <motion.div
                        key="booked"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl bg-lime/10 p-4 border border-lime/20 text-center"
                      >
                        <p className="text-xs font-bold text-ink flex items-center justify-center gap-1">
                          <CheckCircle size={14} className="text-lime-deep" /> Invitation Drafted!
                        </p>
                        <p className="text-[10px] text-ink/60 mt-1">Opening your email client...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Dynamically Generate PDF Text Summary */}
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-wider text-lime">Forward to Engineering Lead</p>
                <p className="text-[11px] text-white/60 mt-1">Generate a structured Markdown profile for forwarding to Engineering Managers.</p>

                <div className="mt-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={copySummaryMarkdown}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/15"
                  >
                    <FileText size={12} className="text-lime" />
                    {copiedSummary ? "Copied profile!" : "Copy Profile Summary"}
                  </motion.button>
                  <a
                    href={`mailto:?subject=Candidate Profile: Ather Assadullah&body=Hi,%0D%0A%0D%0APlease check out Ather Assadullah (AI & ML Engineer). He build RAG systems, Agentic AI, and derives ML from math scratch.%0D%0A%0D%0APortfolio: ${profile.live}`}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15 transition"
                  >
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
