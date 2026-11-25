import { useEffect } from "react";
import Hero from "./awake/Hero";
import Intro from "./awake/Intro";
import Work from "./awake/Work";
import Services from "./awake/Services";
import Skills from "./awake/Skills";
import Achievements from "./awake/Achievements";
import About from "./awake/About";
import Trust from "./awake/Trust";
import Team from "./awake/Team";
import Notes from "./awake/Notes";
import Cta from "./awake/Cta";
import Footer from "./awake/Footer";
import ProjectPage from "./awake/ProjectPage";
import { useRoute } from "./awake/router";
import { getCase } from "./awake/projectData";
import Uri from "./components/Uri";
import DynamicIsland from "./awake/DynamicIsland";
import { initTheme } from "./theme";

const BASE_TITLE = "Ather Assadullah Peer — ML/AI Engineer & Founder, Atherva Automations";

export default function App() {
  const route = useRoute();
  const routeKey = route.page === "project" ? route.slug : "home";

  useEffect(initTheme, []);

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

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let retry = 0;

    const instantScroll = (run: () => void) => {
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      run();
      root.style.scrollBehavior = previous;
    };

    const jumpToTop = () => instantScroll(() => window.scrollTo(0, 0));

    if (route.page === "project") {
      const project = getCase(route.slug);
      document.title = project ? `${project.name} — Ather Sama` : "Case study — Ather Sama";
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(jumpToTop);
      });
    } else {
      document.title = BASE_TITLE;
      const hash = window.location.hash;

      if (!hash || hash === "#home" || hash === "#/" || hash.startsWith("#/")) {
        firstFrame = window.requestAnimationFrame(() => {
          secondFrame = window.requestAnimationFrame(jumpToTop);
        });
      } else {
        const target = document.getElementById(hash.slice(1));
        if (target) {
          const jumpToTarget = () =>
            instantScroll(() => target.scrollIntoView({ block: "start" }));

          firstFrame = window.requestAnimationFrame(() => {
            secondFrame = window.requestAnimationFrame(jumpToTarget);
          });
          retry = window.setTimeout(jumpToTarget, 180);
        }
      }
    }

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(retry);
    };
  }, [routeKey]);

  return (
    <div className="aw-site">
      <div className="aw-page">
        {route.page === "home" && (
          <a
            href="#work"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-[var(--aw-ink)] focus:px-3 focus:py-2 focus:text-[13px] focus:text-white"
          >
            Skip to the work
          </a>
        )}

        {route.page === "project" ? (
          <ProjectPage slug={route.slug} />
        ) : (
          <main>
            <Hero />
            <Intro />
            <Work />
            <Services />
            <Skills />
            <Achievements />
            <About />
            <Trust />
            <Team />
            <Notes />
            <Cta />
          </main>
        )}

        <Footer />
      </div>
      <DynamicIsland routeKey={routeKey} />
      <Uri />
    </div>
  );
}
