import { useEffect, useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { openUri } from "./ui";

const links = [
  { href: "#work", label: "Work" },
  { href: "#live", label: "Live apps" },
  { href: "#startup", label: "Startup" },
  { href: "#playbook", label: "Playbook" },
  { href: "#insights", label: "Notes" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
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
      className={`fixed inset-x-0 top-0 px-4 pt-3 sm:px-6 sm:pt-4 ${
        open ? "z-[80]" : "z-50"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-1 py-1.5 transition-all duration-500 ${
          scrolled
            ? "border border-[#e7e2d8] bg-white/85 px-4 shadow-[0_10px_30px_rgba(20,24,40,0.06)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <a
          href="#home"
          className={`font-serif text-[27px] leading-none tracking-tight transition-colors ${
            scrolled ? "text-ink" : "text-white"
          }`}
          aria-label="Ather Sama — home"
        >
          ather<span className="text-[#d4f562]">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[11.5px] font-medium transition-colors ${
                scrolled ? "text-ink/60 hover:text-ink" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openUri}
            className={`uri-trigger hidden items-center gap-1.5 rounded-full px-3 py-2 text-[10.5px] font-semibold transition sm:inline-flex ${
              scrolled
                ? "text-ink/60 hover:bg-ink/5 hover:text-ink"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Sparkles size={12} />
            Ask URI
          </button>
          <a
            href="#contact"
            className={`hidden rounded-full px-4 py-2.5 text-[11px] font-semibold transition sm:inline-flex ${
              scrolled
                ? "bg-ink text-white hover:bg-black"
                : "bg-white text-ink shadow-[0_8px_20px_rgba(8,20,55,0.18)] hover:bg-white/90"
            }`}
          >
            Contact
          </a>
          <button
            type="button"
            onClick={openUri}
            className={`uri-trigger grid h-9 w-9 place-items-center rounded-full transition sm:hidden ${
              scrolled ? "text-ink hover:bg-ink/5" : "text-white hover:bg-white/10"
            }`}
            aria-label="Ask URI"
          >
            <Sparkles size={17} />
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`grid h-9 w-9 place-items-center rounded-full transition md:hidden ${
              scrolled ? "text-ink hover:bg-ink/5" : "text-white hover:bg-white/10"
            }`}
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[90] flex flex-col bg-[#fbfaf7] px-6 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <a href="#home" onClick={() => setOpen(false)} className="font-serif text-[30px] leading-none">
              ather<span className="text-[#7c9a1f]">.</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#e7e2d8] bg-white"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="mt-14 flex flex-col gap-5" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display text-[38px] leading-none"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="display text-[38px] leading-none">
              Contact
            </a>
          </nav>

          <div className="mt-auto space-y-3 border-t border-[#e7e2d8] pt-6">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openUri();
              }}
              className="uri-trigger btn-dark w-full"
            >
              <Sparkles size={14} /> Ask URI
            </button>
            <a href="#live" onClick={() => setOpen(false)} className="btn-outline w-full">
              Open the live apps
            </a>
            <p className="pt-2 text-center text-[11px] text-[#8a867d]">
              peerather07@gmail.com · +91 91031-07882
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
