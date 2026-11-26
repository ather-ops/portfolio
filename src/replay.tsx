/* Film mode: turns the site into a deterministic, replayable motion take.
   Loaded only by replay.html (never by the portfolio itself).

   The recorder drives the take through window.__film:
     __film.ready()            -> promise resolved once layout + fonts are stable
     __film.height()           -> current scroll height in CSS px
     __film.seek(px)           -> move the virtual scroll head, paint, return
     __film.cursor(x, y)       -> move the pointer to a point
     __film.click(x, y)        -> press visual + ripple on the pointer
     __film.theme("dark")      -> theme flip
     __film.route("#/work/…")  -> hash route change, rewound to the top

   Nothing here touches the real scroll position: the page is translated on
   the compositor instead, so offsets are exact and no smooth-scroll easing
   gets in the way of a 30 fps capture. */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./awake.css";
import "./replay.css";

import App from "./App";
import { initTheme } from "./theme";

const root = document.documentElement;
const film = { y: 0 };

const height = () =>
  Math.max(
    0,
    (document.querySelector(".aw-page")?.scrollHeight ?? document.body.scrollHeight) -
      window.innerHeight,
  );

const paint = () =>
  new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

const settle = async () => {
  if (document.fonts?.ready) await document.fonts.ready;
  await paint();
  await paint();
};

const apply = (y) => {
  film.y = Math.max(0, Math.min(y, height()));
  document.querySelector(".aw-replay")?.style.setProperty("--replay-y", `${film.y}px`);
};

/* ── macOS-style pointer, drawn in the page so it lands in the capture ── */
const cursorEl = document.createElement("div");
cursorEl.className = "aw-cursor";
cursorEl.setAttribute("aria-hidden", "true");
cursorEl.innerHTML =
  '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4.4 2.3 19.6 12l-6.4 1.2 3.1 6.6-2.6 1.2-3.1-6.5-4.2 4.2z" fill="#131313" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>';
document.body.appendChild(cursorEl);

const point = { x: window.innerWidth * 0.62, y: window.innerHeight * 0.72 };
const setCursor = (x, y) => {
  point.x = x;
  point.y = y;
  cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};
setCursor(point.x, point.y);

const ripple = (x, y) => {
  const el = document.createElement("span");
  el.className = "aw-cursor-ripple";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  window.setTimeout(() => el.remove(), 640);
};

const press = (down) => cursorEl.classList.toggle("is-press", down);

/* Real pointer mode: the capture moves a concrete pointer into the page with
   real mouse events, so hover, focus and click states are the browser's own
   rather than CSS we imitate. Used by the windowed take. */
const realCursor = document.createElement("div");
realCursor.className = "aw-cursor aw-cursor--real";
realCursor.setAttribute("aria-hidden", "true");
realCursor.innerHTML =
  '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4.4 2.3 19.6 12l-6.4 1.2 3.1 6.6-2.6 1.2-3.1-6.5-4.2 4.2z" fill="#131313" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>';
document.body.appendChild(realCursor);
realCursor.style.transition = "none";

window.__film = {
  ready: async () => {
    await settle();
    return { height: height(), width: window.innerWidth, vh: window.innerHeight };
  },
  height,
  get _y() {
    return film.y;
  },
  seek: async (y) => {
    apply(y);
    await paint();
    return film.y;
  },
  cursor: setCursor,
  real: (x, y) => {
    realCursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  },
  realPress: (down) => realCursor.classList.toggle("is-press", down),
  /* centre + box of any element in viewport coordinates */
  box: (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height };
  },
  press,
  click: (x, y) => {
    if (typeof x === "number") setCursor(x, y);
    ripple(point.x, point.y);
    press(true);
    window.setTimeout(() => press(false), 130);
  },
  theme: (t) => {
    root.dataset.theme = t;
    root.style.colorScheme = t;
    try {
      localStorage.setItem("aw-theme", t);
    } catch (e) {
      /* ignore */
    }
  },
  settle,
  route: async (hash) => {
    window.location.hash = hash;
    await new Promise((r) => setTimeout(r, 380));
    apply(0);
    await settle();
    return height();
  },
};

/* keyboard nudges, handy when eyeballing a take by hand */
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault();
    apply(film.y + 320);
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    apply(film.y - 320);
  }
});

/* ── boot ─────────────────────────────────────────────────────────────── */
initTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/* ── stage mode ───────────────────────────────────────────────────────────
   ?stage=1 puts the site inside a fixed browser window on a dark backdrop.
   Scrolling is then the real thing (wheel input), so hover, sticky headers
   and the island all behave exactly as they do for a visitor. */
const stage = new URLSearchParams(window.location.search).has("stage");

const attach = () => {
  const site = document.querySelector(".aw-site");
  if (!site) {
    window.setTimeout(attach, 40);
    return;
  }
  if (stage) {
    document.body.classList.add("aw-film-stage");
    site.style.overflow = "scroll";
    site.scrollTop = 0;

    /* Real window chrome: a title bar with working back / forward / theme.
       The site's own header scrolls away with the page, which is honest but
       makes for a jumpy take, so the frame owns the persistent controls. */
    const bar = document.createElement("div");
    bar.className = "aw-stage-bar";
    bar.innerHTML = `
      <span class="aw-stage-dots"><i></i><i></i><i></i></span>
      <span class="aw-stage-url">ather-assadullah.vercel.app</span>
      <span class="aw-stage-tools">
        <button type="button" class="aw-stage-btn" data-act="up" aria-label="Back to top">↑</button>
        <button type="button" class="aw-stage-btn" data-act="theme" aria-label="Toggle theme">◐</button>
      </span>`;
    document.body.appendChild(bar);

    bar.querySelector('[data-act="theme"]')?.addEventListener("click", () => {
      const el = site as HTMLElement;
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      el.style.background = next === "dark" ? "#0d0e11" : "#ffffff";
    });
    bar.querySelector('[data-act="up"]')?.addEventListener("click", () => {
      (site as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
    });

    window.__stageThemeBtn = () => bar.querySelector('[data-act="theme"]');

    /* a pointer drawn for the capture: it tracks the real mouse position, so
       hover and clicks are genuine while the audience still sees a cursor */
    const pointer = document.createElement("div");
    pointer.className = "aw-stage-pointer";
    pointer.innerHTML =
      '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4.4 2.3 19.6 12l-6.4 1.2 3.1 6.6-2.6 1.2-3.1-6.5-4.2 4.2z" fill="#131313" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg>';
    document.body.appendChild(pointer);

    const track = (x: number, y: number) => {
      pointer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.__stagePointer = track;

    document.addEventListener("mousemove", (event) => track(event.clientX, event.clientY));
    return;
  }
  site.classList.add("aw-replay");
  apply(0);
};
attach();
