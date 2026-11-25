import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "aw-theme";
const listeners = new Set<() => void>();

function readDocument(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

let current: Theme = readDocument();

function paint(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0b0c0e" : "#ffffff");
}

export function setTheme(theme: Theme, persist = true) {
  current = theme;
  paint(theme);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage can be blocked — the in-memory theme still applies */
    }
  }
  listeners.forEach((listener) => listener());
}

export function toggleTheme() {
  setTheme(current === "dark" ? "light" : "dark");
}

export function initTheme() {
  paint(current);
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, () => current, () => "light" as Theme);
}
