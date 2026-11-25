import { ArrowUpRight } from "lucide-react";
import { profile, startup } from "../data";
import { StarMark } from "./ui";

const index = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#awards" },
  { label: "Live apps", href: "#demos" },
  { label: "Services", href: "#services" },
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
    <footer className="aw-footer">
      <div className="aw-container">
        <div className="aw-footer-grid">
          <div className="aw-footer-brand">
            <a href="#home" className="aw-brand">
              <span className="aw-brand-mark">
                <StarMark size={20} />
              </span>
              ather.
            </a>
            <p>
              ML / AI engineer and founder of Atherva Automations. Building retrieval, agents and
              automation that survive contact with real users.
            </p>
            <a href={`mailto:${profile.email}`} className="aw-footer-mail">
              {profile.email}
            </a>
          </div>

          <nav aria-label="Index">
            <p className="aw-footer-label">Index</p>
            <div className="aw-footer-links">
              {index.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <nav aria-label="Elsewhere">
            <p className="aw-footer-label">Elsewhere</p>
            <div className="aw-footer-links">
              {elsewhere.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="aw-footer-company">
            <p className="aw-footer-label">The company</p>
            <a href={startup.url} target="_blank" rel="noreferrer">
              Atherva Automations <ArrowUpRight size={11} className="inline" />
            </a>
            <p className="mt-3">
              Intelligent automation studio. Alerti Intelligence and Marketify are in development.
            </p>
            <a href={`mailto:${startup.email}`}>{startup.email}</a>
          </div>
        </div>

        <p className="aw-footer-word select-none" aria-hidden="true">
          ather<span>.</span>
        </p>

        <div className="aw-footer-legal">
          <p>© 2026 Ather Sama · All rights reserved</p>
          <p>Srinagar · India · remote-first</p>
          <p>React · Vite · Tailwind · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
