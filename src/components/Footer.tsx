import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { currently, profile } from "../data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=Hello Ather&body=${body}`;
    setSent(true);
  };

  return (
    <footer id="contact" className="bg-[#f0f3f6] px-5 pb-5 sm:px-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-[#0b0c12] text-white">

        {/* Contact Form and Nav links */}
        <div className="grid gap-12 px-8 py-14 lg:grid-cols-12 lg:px-12 lg:py-16">

          <div className="lg:col-span-6">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="relative h-9 w-9 shrink-0">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-lime/60"
                />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">{profile.shortName}</span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {profile.title}. {profile.availability}. Usually replies within 24 hours.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
              <a href={`mailto:${profile.email}`} className="hover:text-white transition">
                {profile.email}
              </a>
              <a href={profile.phoneHref} className="hover:text-white transition">
                {profile.phone}
              </a>
              <span className="text-white/35">{profile.location}</span>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-lime transition hover:text-lime-deep"
              >
                Download CV ↓
              </a>
            </div>

            {/* Direct write trigger */}
            <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Write to me
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/25 focus:bg-white/8 transition"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/25 transition"
                />
              </div>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the role, the problem, or the build."
                rows={3}
                className="w-full resize-none rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/25 transition"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, backgroundColor: "#c3e84a" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-ink"
              >
                {sent ? "Opening mail" : "Submit"}
                <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-lime">
                  <ArrowUpRight size={12} />
                </span>
              </motion.button>
            </form>
          </div>

          {/* Navigation link grids */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Navigate</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                {["#home|Home", "#about|About", "#work|Work", "#live|Live apps", "#startup|Startup", "#expertise|Skills", "#insights|Insights"].map((l) => {
                  const [href, label] = l.split("|");
                  return (
                    <motion.li key={href} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                      <a href={href} className="hover:text-white">{label}</a>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Connect</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                {[
                  { href: profile.companyUrl, label: "Atherva" },
                  { href: profile.github, label: "GitHub" },
                  { href: profile.linkedin, label: "LinkedIn" },
                  { href: profile.whatsapp, label: "WhatsApp" },
                  { href: profile.leetcode, label: "LeetCode" },
                  { href: profile.twitter, label: "X / Twitter" },
                ].map((l) => (
                  <motion.li key={l.label} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-white">
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Currently block */}
          <div className="lg:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Currently</p>
            <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-white/55">
              {currently.map((c) => (
                <li key={c} className="flex items-start gap-1.5">
                  <Terminal size={12} className="text-lime mt-0.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Giant, Bold riseplasma style logo at bottom width ── */}
        <div className="relative px-8 lg:px-12 select-none pointer-events-none mt-6 overflow-hidden">
          <h2 className="text-[16vw] font-extrabold tracking-tighter text-center leading-none text-white/5">
            ather.ops
          </h2>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-8 py-5 text-[10px] text-white/35 lg:px-12">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved. · URI answers from the
            résumé, in your browser.
          </p>
          <div className="flex gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <a href={profile.twitter} target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
export {};
