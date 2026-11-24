import { useEffect } from "react";
import Header from "./traj/Header";
import Hero from "./traj/Hero";
import LogoStrip from "./traj/LogoStrip";
import Featured from "./traj/Featured";
import Vision from "./traj/Vision";
import Platform from "./traj/Platform";
import Trust from "./traj/Trust";
import Team from "./traj/Team";
import Recognition from "./traj/Recognition";
import Notes from "./traj/Notes";
import Cta from "./traj/Cta";
import Footer from "./traj/Footer";
import Uri from "./components/Uri";

export default function App() {
  useEffect(() => {
    const timers = new WeakMap<HTMLElement, number>();

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const el = target?.closest<HTMLElement>(".uri-trigger, .edge-lit, .surface");
      if (!el) return;

      el.classList.remove("is-click-glowing");
      void el.offsetWidth;
      el.classList.add("is-click-glowing");

      const previous = timers.get(el);
      if (previous) window.clearTimeout(previous);
      timers.set(
        el,
        window.setTimeout(() => {
          el.classList.remove("is-click-glowing");
          timers.delete(el);
        }, 950)
      );
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="tj-site">
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-[var(--tj-navy)] focus:px-3 focus:py-2 focus:text-[13px] focus:text-[var(--tj-cream)]"
      >
        Skip to the work
      </a>
      <Header />
      <main>
        <Hero />
        <LogoStrip />
        <Featured />
        <Vision />
        <Platform />
        <Trust />
        <div className="tj-dark-band tj-dark-band--full">
          <Team />
          <Notes />
        </div>
        <Recognition />
        <Cta />
      </main>
      <Footer />
      <Uri />
    </div>
  );
}
