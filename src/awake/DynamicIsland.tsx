import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { openUri } from "./ui";
import ThemeToggle from "./ThemeToggle";
import { StarMark } from "./ui";

const links = [
  { href: "#home", label: "Home", short: "Home" },
  { href: "#work", label: "Work", short: "Work" },
  { href: "#skills", label: "Skills", short: "Skills" },
  { href: "#awards", label: "Awards", short: "Awards" },
  { href: "#about", label: "About", short: "About" },
  { href: "#contact", label: "Contact", short: "Contact" },
];

/**
 * Glass "dynamic island": a floating pill that drops in once you start
 * scrolling and stays with you over every section, on desktop and mobile.
 */
export default function DynamicIsland({ routeKey }: { routeKey: string }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("#home");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      lastY.current = y;

      if (y < 140) {
        setVisible(false);
        return;
      }
      // Show while scrolling down, keep it while resting mid-page,
      // and retract a touch near the very top.
      if (goingDown || y > 260) setVisible(true);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setVisible(false);
    window.scrollTo(0, 0);
  }, [routeKey]);

  useEffect(() => {
    const ids = links.map((link) => link.href.slice(1));
    const onScroll = () => {
      let current = "#home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 160) current = `#${id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [routeKey]);

  return (
    <div className="aw-island-wrap">
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ opacity: 0, y: -18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="aw-island"
            aria-label="Quick navigation"
          >
            <a href="#home" className="aw-island-brand" aria-label="Back to top">
              <StarMark size={15} />
            </a>

            <span className="aw-island-divider" aria-hidden="true" />

            <div className="aw-island-links">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={active === link.href ? "is-active" : ""}
                  aria-current={active === link.href ? "true" : undefined}
                >
                  <span className="aw-island-label-full">{link.label}</span>
                  <span className="aw-island-label-short">{link.short}</span>
                </a>
              ))}
            </div>

            <span className="aw-island-divider" aria-hidden="true" />

            <div className="aw-island-actions">
              <button
                type="button"
                onClick={openUri}
                className="aw-island-btn aw-island-btn--uri uri-trigger"
                aria-label="Ask URI"
              >
                <Sparkles size={13} />
                <span className="aw-island-uri-label">Ask URI</span>
              </button>

              <ThemeToggle className="aw-island-theme" compact />

              <a href="#contact" className="aw-island-cta" aria-label="Contact Ather">
                Hire
                <ArrowUpRight size={12} strokeWidth={2} />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
