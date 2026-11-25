import { useEffect } from "react";
import Hero from "./awake/Hero";
import Intro from "./awake/Intro";
import Work from "./awake/Work";
import Services from "./awake/Services";
import About from "./awake/About";
import Trust from "./awake/Trust";
import Team from "./awake/Team";
import Notes from "./awake/Notes";
import Cta from "./awake/Cta";
import Footer from "./awake/Footer";
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
    <div className="aw-site">
      <div className="aw-page">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-[var(--aw-ink)] focus:px-3 focus:py-2 focus:text-[13px] focus:text-white"
        >
          Skip to the work
        </a>
        <main>
          <Hero />
          <Intro />
          <Work />
          <Services />
          <About />
          <Trust />
          <Team />
          <Notes />
          <Cta />
        </main>
        <Footer />
      </div>
      <Uri />
    </div>
  );
}
