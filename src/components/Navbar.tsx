import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { profile } from "../data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#live", label: "Live apps" },
  { href: "#startup", label: "Startup" },
  { href: "#expertise", label: "Skills" },
];

export const openUri = () => window.dispatchEvent(new CustomEvent("uri:open"));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = links.map((l) => document.querySelector(l.href));
      const found = sections.findIndex((s) => {
        if (!s) return false;
        const rect = s.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });
      if (found !== -1) setActive(links[found].href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.1 }}
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "glass-white shadow-lg shadow-sky-900/5"
            : "bg-white/10 backdrop-blur-md border border-white/25"
        }`}
      >
        {/* Logo — profile photo circle */}
        <a href="#home" className="flex items-center gap-2.5 pl-1">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative h-9 w-9 shrink-0"
          >
            <span className="absolute -inset-0.5 animate-ping rounded-full border border-lime opacity-40" />
            <span className="absolute -inset-0.5 rounded-full border-2 border-lime/60" />
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white/60"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className={`text-[14px] font-bold tracking-tight ${scrolled ? "text-ink" : "text-white"}`}
          >
            {profile.shortName}
          </motion.span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.06, type: "spring", stiffness: 300, damping: 24 }}
            >
              <a
                href={l.href}
                className={`relative text-[11px] font-semibold uppercase tracking-[0.15em] transition ${
                  scrolled ? "text-ink/70 hover:text-ink" : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-lime"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Ask URI + CTA + Hamburger */}
        <div className="flex items-center gap-2.5">
          <motion.button
            type="button"
            onClick={openUri}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`hidden items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition sm:inline-flex ${
              scrolled
                ? "border border-[#7ea6f2]/40 bg-white/70 text-[#3f6fc4] hover:border-[#7ea6f2]/70 hover:text-ink"
                : "border border-white/30 bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            <Sparkles size={12} />
            Ask URI
          </motion.button>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="hidden items-center gap-1 rounded-full bg-lime px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-ink transition hover:bg-lime-deep sm:inline-flex"
          >
            Contact me
          </motion.a>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${
              scrolled ? "bg-ink/5 text-ink" : "bg-white/20 text-white"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="glass-white mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl p-4 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 340, damping: 26 }}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-ink/80 hover:bg-ink/5"
                >
                  {l.label}
                </motion.a>
              ))}

              <button
                type="button"
                onClick={() => {
                  openUri();
                  setOpen(false);
                }}
                className="mt-1 flex items-center justify-center gap-2 rounded-full border border-[#7ea6f2]/40 bg-[#eef4ff] px-4 py-3 text-sm font-semibold text-[#3f6fc4]"
              >
                <Sparkles size={14} />
                Ask URI about the résumé
              </button>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-full bg-ink px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Contact me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
