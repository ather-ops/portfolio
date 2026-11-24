import { ArrowUpRight, Code2, Mail } from "lucide-react";
import { profile, startup } from "../data";
import { StarMark } from "./ui";

const index = [
  { label: "Work", href: "#work" },
  { label: "Playbook", href: "#playbook" },
  { label: "Field notes", href: "#notes" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const elsewhere = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "X / Twitter", href: profile.twitter },
  { label: "LeetCode", href: profile.leetcode },
  { label: "Résumé", href: profile.resume },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--tj-line)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-12">
        <div className="col-span-2 lg:col-span-5">
          <div className="flex items-center gap-2">
            <StarMark size={16} className="text-[var(--tj-navy)]" />
            <p className="tj-display text-[23px] leading-none">Ather Sama</p>
          </div>
          <p className="tj-serif mt-4 max-w-[330px] text-[16px] leading-[1.3] text-[rgba(31,42,56,0.66)]">
            ML / AI engineer and founder of Atherva Automations. Building retrieval, agents and
            automation that survive contact with real users.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-flex items-center gap-2 border-b border-[rgba(38,50,66,0.3)] pb-1 tj-serif text-[15px] text-[var(--tj-navy)] transition hover:border-[var(--tj-navy)]"
          >
            <Mail size={13} /> {profile.email}
          </a>
        </div>

        <nav className="lg:col-span-2 lg:border-l lg:border-[var(--tj-line)] lg:pl-6" aria-label="Index">
          <p className="tj-eyebrow">Index</p>
          <ul className="mt-4 space-y-2.5">
            {index.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="tj-serif text-[15px] text-[rgba(31,42,56,0.72)] transition hover:text-[var(--tj-navy)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-2 lg:border-l lg:border-[var(--tj-line)] lg:pl-6" aria-label="Elsewhere">
          <p className="tj-eyebrow">Elsewhere</p>
          <ul className="mt-4 space-y-2.5">
            {elsewhere.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="tj-serif text-[15px] text-[rgba(31,42,56,0.72)] transition hover:text-[var(--tj-navy)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-3 lg:border-l lg:border-[var(--tj-line)] lg:pl-6">
          <p className="tj-eyebrow">The company</p>
          <a
            href={startup.url}
            target="_blank"
            rel="noreferrer"
            className="tj-display mt-4 inline-flex items-center gap-1.5 text-[22px] leading-none transition hover:opacity-70"
          >
            {startup.name} <ArrowUpRight size={14} />
          </a>
          <p className="tj-serif mt-3 max-w-[250px] text-[15px] leading-[1.3] text-[rgba(31,42,56,0.64)]">
            {startup.tagline} Alerti Intelligence and Marketify are in development.
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-8 w-8 place-items-center rounded-full border border-[var(--tj-line-strong)] transition hover:bg-[var(--tj-paper)]"
            >
              <Code2 size={13} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-8 w-8 place-items-center rounded-full border border-[var(--tj-line-strong)] transition hover:bg-[var(--tj-paper)]"
            >
              <span className="tj-ui text-[9px] font-semibold leading-none">in</span>
            </a>
            <a
              href={`mailto:${profile.companyEmail}`}
              aria-label="Email Atherva"
              className="grid h-8 w-8 place-items-center rounded-full border border-[var(--tj-line-strong)] transition hover:bg-[var(--tj-paper)]"
            >
              <Mail size={13} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--tj-line)]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="tj-label text-[9px] text-[rgba(38,50,66,0.5)]">
            © 2026 Ather Sama · All systems documented
          </p>
          <p className="tj-label text-[9px] text-[rgba(38,50,66,0.5)]">
            React · Vite · Tailwind · Deployed on Vercel
          </p>
        </div>
      </div>

      <div className="tj-cloud-band h-[230px] sm:h-[300px] lg:h-[340px]">
        <img src="/img/traj-clouds.jpg" alt="" aria-hidden="true" loading="lazy" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-5 pb-2 sm:px-8">
          <p className="tj-label text-[9px] text-[rgba(38,50,66,0.62)]">
            Srinagar · India · remote-first
          </p>
          <p className="tj-footer-word select-none" aria-hidden="true">
            ather<span className="text-[rgba(255,254,249,0.9)]">.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
