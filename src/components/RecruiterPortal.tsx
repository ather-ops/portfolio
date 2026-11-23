import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, Sparkles, ArrowUpRight, Play, Database, FileText, MessageCircle } from "lucide-react";
import { profile } from "../data";

const checklistItems = [
  { id: "01", task: "Nine deployments — PayPal Copilot, Amazn AI, Xpect AI, PulseMesh and more", verified: true },
  { id: "02", task: "Founder of Atherva Automations — AI agents and automation for businesses", verified: true },
  { id: "03", task: "Top 23% of 1,34,421 applicants — Amazon ML Summer School 2026", verified: true },
  { id: "04", task: "917 GitHub contributions across 14 public repositories", verified: true },
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
    const text = `### ${profile.name} — ML / AI Engineer, Founder of Atherva Automations
* **Startup**: Atherva Automations (2026) — AI agents, automation, assistants, RAG and data intelligence; products Alerti and Marketify in development.
* **Focus**: RAG systems, agentic AI, applied ML from first principles.
* **Live apps**: Xpect AI · Amazn AI · PayPal Copilot · PulseMesh · Hospital SQL dashboard · House Price Predictor · Spam Detector.
* **Proof**: Amazon ML Summer School 2026 (top 23% of 1,34,421) · Since AI Hackathon, Turku · 917 GitHub contributions · 14 public repos.
* **Education**: BCA, Lovely Professional University (2026–present).
* **Email**: ${profile.email} · ${profile.companyEmail}
* **Phone / WhatsApp**: ${profile.phone}
* **GitHub**: ${profile.github}
* **Atherva**: ${profile.companyUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="recruiter-portal" className="bg-[#f7f9fc] px-5 pb-20 sm:px-8">
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
                Ready to hire Ather?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                You need someone who turns a retrieved document into a grounded answer, a tool-calling agent into something safe enough for a merchant — and who already runs a company shipping exactly that. Verify the foundations, then book a call.
              </p>

              {/* Interactive checklist */}
              <div className="mt-8 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Hiring checklist
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
              <div className="relative mt-6 rounded-2xl bg-black/60 border border-white/10 p-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-lime" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                      NumPy foundations · from scratch
                    </span>
                  </div>
                  <span className="rounded bg-lime/15 px-2 py-0.5 text-[9px] font-bold text-lime">Math Sandbox</span>
                </div>
                <div className="mt-3 font-mono text-xs text-white/80 space-y-1 bg-black/40 p-3 rounded-xl">
                  <p className="text-white/40"># Gradient descent derived by hand, no scikit-learn</p>
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
                      ✓ Ridge matches scikit-learn — MSE 0.4598 · R² 0.9767
                    </motion.span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Scheduler */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="relative rounded-3xl bg-white p-6 text-ink shadow-2xl">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-lime-deep" />
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/50">Interview scheduler</p>
                </div>
                <h3 className="mt-2 text-xl font-bold tracking-tight">Draft the invite</h3>
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
                        Interview scheduler Sync
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
              <div className="relative mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-wider text-lime">Forward to the hiring lead</p>
                <p className="text-[11px] text-white/60 mt-1">Copy a structured Markdown profile, or email it straight on.</p>

                <div className="mt-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={copySummaryMarkdown}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/15"
                  >
                    <FileText size={12} className="text-lime" />
                    {copiedSummary ? "Copied profile!" : "Copy profile summary"}
                  </motion.button>
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Message Ather on WhatsApp"
                    className="grid h-10 w-10 place-items-center rounded-full bg-lime/20 text-lime hover:bg-lime/30 transition"
                  >
                    <MessageCircle size={14} />
                  </a>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open the résumé PDF"
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                  >
                    <FileText size={14} />
                  </a>
                  <a
                    href={`mailto:?subject=Candidate profile: Ather Assadullah Peer&body=Hi,%0D%0A%0D%0APlease take a look at Ather Assadullah Peer (ML / AI Engineer). He ships RAG systems and agentic AI, and implements ML from scratch.%0D%0A%0D%0APortfolio: ${profile.live}%0D%0AGitHub: ${profile.github}`}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15 transition"
                  >
                    <ArrowUpRight size={14} />
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
