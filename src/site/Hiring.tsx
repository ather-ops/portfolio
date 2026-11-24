import { useState } from "react";
import { CheckCircle2, Copy, Mail, Sparkles } from "lucide-react";
import { profile } from "../data";
import { openUri, Reveal } from "./ui";

const checklist = [
  "Nine deployments — PayPal Copilot, Amazn AI, Xpect AI, PulseMesh and more",
  "Founder of Atherva Automations — AI agents and automation for businesses",
  "Amazon ML Summer School 2026 — top 23% of 1,34,421 applicants",
  "917 GitHub contributions across 14 public repositories",
];

const summary = `### ${profile.name} — ML / AI Engineer, Founder of Atherva Automations
* **Startup**: Atherva Automations (2026) — AI agents, automation, RAG and data intelligence; Alerti and Marketify in development.
* **Focus**: RAG systems, agentic AI, applied ML from first principles.
* **Live apps**: Xpect AI · Amazn AI · PayPal Copilot · PulseMesh · Hospital SQL · House Price · Spam Detector.
* **Proof**: Amazon ML Summer School 2026 (top 23% of 1,34,421) · Since AI Hackathon, Turku · 917 contributions · 14 repos.
* **Education**: BCA, Lovely Professional University (in progress).
* **Contact**: ${profile.email} · ${profile.companyEmail} · ${profile.phone}
* **GitHub**: ${profile.github}
* **Atherva**: ${profile.companyUrl}`;

export default function Hiring() {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [requested, setRequested] = useState(false);

  const requestCall = (event: React.FormEvent) => {
    event.preventDefault();
    if (!day || !time) return;
    const subject = `Interview request — ${day} at ${time} IST`;
    const body = `Hi Ather,\n\nWe reviewed your portfolio and would like to talk on ${day} at ${time} IST.\n${
      note ? `\nWhat we'd like to cover: ${note}\n` : ""
    }\nBest regards,\n`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setRequested(true);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="recruiter-portal" className="px-5 pb-24 sm:px-8">
      <div className="surface mx-auto max-w-6xl p-2.5">
        <div className="grid gap-2.5 lg:grid-cols-2">
          <div className="rounded-[24px] bg-[#f4f1ea] p-7 sm:p-10">
            <span className="eyebrow w-fit bg-white/70">Hiring brief</span>
            <h2 className="display mt-5 text-[38px] leading-[0.98] sm:text-[46px]">
              The 60-second{" "}
              <br />
              brief.
            </h2>
            <p className="mt-4 max-w-sm text-[12px] leading-relaxed text-[#6d6a62]">
              Ather is open to AI/ML internships and remote roles, available immediately. Here is
              what is verifiable before you get on a call.
            </p>

            <ul className="mt-6 space-y-2">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-[#e7e2d8]/80 bg-white/70 px-3 py-2.5 text-[11px] leading-relaxed text-[#57544d]"
                >
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#3f7a52]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`mailto:${profile.email}`} className="btn-dark">
                <Mail size={13} /> Email Ather
              </a>
              <a href={profile.resume} download className="btn-outline">
                Download résumé
              </a>
              <button type="button" onClick={openUri} className="btn-outline">
                <Sparkles size={13} /> Ask URI
              </button>
            </div>
          </div>

          <div className="flex flex-col rounded-[24px] border border-[#eee9df] bg-white p-7 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">Book a call</span>
                <h3 className="display mt-4 text-[30px] leading-none">20 minutes, no deck.</h3>
              </div>
              <button
                type="button"
                onClick={copySummary}
                className="inline-flex items-center gap-1 rounded-full border border-[#e7e2d8] px-2.5 py-1.5 text-[9.5px] font-semibold text-[#7a766d] transition hover:text-ink"
              >
                <Copy size={10} /> {copied ? "Copied" : "Copy brief"}
              </button>
            </div>

            <p className="mt-3 text-[11.5px] leading-relaxed text-[#6d6a62]">
              Pick a slot and the form opens a pre-filled email — no calendar API, no account.
            </p>

            <form onSubmit={requestCall} className="mt-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9a958a]">
                    Day
                  </span>
                  <select
                    value={day}
                    onChange={(event) => setDay(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#e7e2d8] bg-[#fbfaf7] px-3 py-2.5 text-[11.5px] text-ink outline-none focus:border-[#c9c2b4]"
                    required
                  >
                    <option value="">Select a day</option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9a958a]">
                    Time (IST)
                  </span>
                  <select
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#e7e2d8] bg-[#fbfaf7] px-3 py-2.5 text-[11.5px] text-ink outline-none focus:border-[#c9c2b4]"
                    required
                  >
                    <option value="">Select a time</option>
                    <option>10:00</option>
                    <option>14:00</option>
                    <option>17:00</option>
                    <option>19:00</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9a958a]">
                  Anything to prepare? (optional)
                </span>
                <input
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Role, team, or a system you want to discuss"
                  className="mt-1.5 w-full rounded-xl border border-[#e7e2d8] bg-[#fbfaf7] px-3 py-2.5 text-[11.5px] text-ink outline-none placeholder:text-[#b3ada1] focus:border-[#c9c2b4]"
                />
              </label>

              <button type="submit" className="btn-dark w-full">
                Request the call
              </button>
            </form>

            <div className="mt-6 grid grid-cols-2 gap-2 border-t border-[#eee9df] pt-4">
              {[
                "20 minutes, no take-home",
                "Bring a role, see deployed work",
                "Reply within 24 hours",
                "Remote-first, IST overlap",
              ].map((item) => (
                <p key={item} className="flex items-start gap-1.5 text-[9.5px] leading-relaxed text-[#7a766d]">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#9a958a]" />
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-auto pt-4">
              {requested ? (
                <p className="rounded-xl bg-[#eef7ef] px-3 py-2 text-[10.5px] text-[#2f6b45]">
                  Your email draft is open. If nothing happened, write to {profile.email} directly.
                </p>
              ) : (
                <p className="text-[9.5px] leading-relaxed text-[#a9a397]">
                  Usually replies within 24 hours · {profile.email} · {profile.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
