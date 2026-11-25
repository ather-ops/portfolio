import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { openUri, StarMark, TjButton } from "./ui";

const links = [
  { href: "#work", label: "Work" },
  { href: "#live", label: "Live apps" },
  { href: "#playbook", label: "Playbook" },
  { href: "#notes", label: "Notes" },
  { href: "#about", label: "About" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`tj-header fixed inset-x-0 top-0 z-50 px-4 sm:px-6 ${
        open ? "z-[80]" : ""
      } ${scrolled ? "tj-header--scrolled" : ""}`}
    >
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between gap-4">
        <a href="#home" className="flex shrink-0 items-center gap-2 text-[var(--tj-navy)]" aria-label="Ather Sama — home">
          <StarMark size={18} />
          <span className="tj-display text-[23px] font-semibold leading-none tracking-[-0.05em]">
            ather<span className="text-[var(--tj-peach-strong)]">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="tj-nav-link inline-flex items-center gap-0.5">
              {link.label}
              {(link.label === "Playbook" || link.label === "Notes") && (
                <ArrowUpRight size={10} className="opacity-60" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openUri}
            aria-label="Ask URI"
            className="uri-trigger grid h-8 w-8 place-items-center rounded-full border border-[var(--tj-line-strong)] text-[var(--tj-navy)] transition hover:bg-[rgba(255,254,249,0.7)]"
          >
            <Sparkles size={13} />
          </button>
          <span className="hidden sm:inline-flex">
            <a href="#contact" className="tj-btn tj-btn--peach tj-btn--sm">
              Get in touch
            </a>
          </span>
          <span className="hidden md:inline-flex">
            <a
              href="/ather-assadullah-peer-resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="tj-btn tj-btn--light tj-btn--sm"
            >
              Résumé
            </a>
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-8 w-8 place-items-center rounded-full border border-[var(--tj-line-strong)] text-[var(--tj-navy)] lg:hidden"
          >
            <Menu size={17} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-[var(--tj-cream)] px-6 py-5 lg:hidden">
          <div className="flex items-center justify-between">
            <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <StarMark size={19} />
              <span className="tj-display text-[24px] font-semibold tracking-[-0.05em]">
                ather<span className="text-[var(--tj-peach-strong)]">.</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--tj-line-strong)] bg-[var(--tj-paper)]"
            >
              <X size={17} />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-3" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="tj-display flex items-center gap-2 text-[44px] leading-none text-[var(--tj-navy)]"
              >
                {link.label}
                {(link.label === "Playbook" || link.label === "Notes") && (
                  <ArrowUpRight size={24} className="text-[var(--tj-peach-strong)]" />
                )}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="tj-display text-[44px] leading-none text-[var(--tj-navy)]"
            >
              Contact
            </a>
          </nav>

          <div className="mt-auto space-y-3 border-t border-[var(--tj-line)] pt-6">
            <TjButton
              variant="peach"
              className="uri-trigger w-full"
              onClick={() => {
                setOpen(false);
                openUri();
              }}
            >
              <Sparkles size={14} /> Ask URI
            </TjButton>
            <TjButton href="#contact" variant="navy" className="w-full" onClick={() => setOpen(false)}>
              Get in touch
            </TjButton>
            <div className="flex items-center justify-between pt-2">
              <a href="mailto:peerather07@gmail.com" className="tj-serif text-[13px] text-[var(--tj-navy)]/70">
                peerather07@gmail.com
              </a>
              <a
                href="/ather-assadullah-peer-resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="tj-label underline decoration-[var(--tj-line-strong)] underline-offset-4"
              >
                Résumé
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
