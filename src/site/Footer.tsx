import { ArrowUp, Code2, Mail } from "lucide-react";
import { profile, startup } from "../data";

const explore = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#live", label: "Live apps" },
  { href: "#startup", label: "Startup" },
  { href: "#playbook", label: "Playbook" },
];

const more = [
  { href: "#expertise", label: "Skills" },
  { href: "#recruiter-portal", label: "Hiring" },
  { href: "#plans", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#insights", label: "Notes" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#e7e2d8] px-5 pb-8 pt-14 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#home" className="font-serif text-[34px] leading-none">
              ather<span className="text-[#7c9a1f]">.</span>
            </a>
            <p className="mt-4 max-w-[300px] text-[11.5px] leading-relaxed text-[#6d6a62]">
              ML / AI engineer and founder of Atherva Automations. Building agents, retrieval and
              applied ML that ship.
            </p>
            <p className="mt-4 max-w-[300px] text-[10.5px] leading-relaxed text-[#9a958a]">
              {startup.tagline}
            </p>

            <div className="mt-6 flex items-center gap-2">
              {[
                { href: profile.github, label: "GitHub", mark: "GH" },
                { href: profile.linkedin, label: "LinkedIn", mark: "in" },
                { href: profile.twitter, label: "X", mark: "X" },
                { href: profile.leetcode, label: "LeetCode", mark: "LC" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#e7e2d8] bg-white text-[10px] font-semibold text-ink/60 transition hover:text-ink"
                >
                  {social.mark}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a9a397]">
                Explore
              </p>
              <ul className="mt-3 space-y-2">
                {explore.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-[11.5px] text-[#57544d] transition hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a9a397]">
                More
              </p>
              <ul className="mt-3 space-y-2">
                {more.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-[11.5px] text-[#57544d] transition hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a9a397]">
                Contact
              </p>
              <ul className="mt-3 space-y-2 text-[11.5px] text-[#57544d]">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 transition hover:text-ink"
                  >
                    <Mail size={11} /> {profile.email}
                  </a>
                </li>
                <li>
                  <a href={profile.phoneHref} className="transition hover:text-ink">
                    {profile.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={profile.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-ink"
                  >
                    Atherva Automations
                  </a>
                </li>
                <li>
                  <a href={profile.resume} download className="transition hover:text-ink">
                    Résumé (PDF)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#e7e2d8] pt-5">
          <p className="text-[9.5px] text-[#a9a397]">
            © 2026 {profile.name} · Atherva Automations · Built with React, Vite and a deterministic
            in-browser assistant.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-[#7a766d] transition hover:text-ink"
          >
            Back to top <ArrowUp size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
}
