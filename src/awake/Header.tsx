import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { AwButton, StarMark, openUri } from "./ui";

const links = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#awards", label: "Achievements" },
  { href: "#demos", label: "Live apps" },
  { href: "#notes", label: "Notes" },
  { href: "#about", label: "About" },
];

export default function Header({ initialActive = "#home" }: { initialActive?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => {
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    return links.some((link) => link.href === hash) ? hash : initialActive;
  });

  const close = () => setOpen(false);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      if (links.some((link) => link.href === hash)) setActive(hash);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="aw-header">
        <div className="aw-container aw-header-inner">
          <a href="#home" className="aw-brand" aria-label="Ather Sama — home" onClick={() => setActive("#home")}>
            <span className="aw-brand-mark">
              <StarMark size={22} />
            </span>
            ather.
          </a>

          <nav className="aw-nav" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.href ? "is-active" : ""}
                aria-current={active === link.href ? "page" : undefined}
                onClick={() => setActive(link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="aw-header-actions">
            <button
              type="button"
              onClick={openUri}
              aria-label="Ask URI"
              className="aw-icon-btn aw-ask-btn uri-trigger"
            >
              <Sparkles size={14} />
            </button>
            <AwButton href="#contact" variant="dark" className="aw-header-cta">
              Let&apos;s collaborate
            </AwButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="aw-mobile-menu"
              className="aw-icon-btn aw-menu-btn"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="aw-mobile-menu"
          className="aw-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="aw-mobile-top">
            <a href="#home" className="aw-brand" onClick={close}>
              <span className="aw-brand-mark">
                <StarMark size={22} />
              </span>
              ather.
            </a>
            <button type="button" onClick={close} aria-label="Close menu" className="aw-icon-btn">
              <X size={16} />
            </button>
          </div>

          <nav className="aw-mobile-links" aria-label="Mobile">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={close}>
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={close}>
              Contact
            </a>
          </nav>

          <div className="aw-mobile-bottom">
            <button
              type="button"
              onClick={() => {
                close();
                openUri();
              }}
              className="aw-btn aw-btn--light w-full justify-between"
            >
              Ask URI <ArrowUpRight size={14} />
            </button>
            <AwButton href="#contact" variant="dark" className="w-full" onClick={close}>
              Let&apos;s collaborate
            </AwButton>
          </div>
        </div>
      )}
    </>
  );
}
