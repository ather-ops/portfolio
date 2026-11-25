import { useEffect, useState } from "react";

export type Route = { page: "home" } | { page: "project"; slug: string };

export function readRoute(): Route {
  if (typeof window === "undefined") return { page: "home" };
  const match = window.location.hash.match(/^#\/work\/([^/?#]+)/);
  return match ? { page: "project", slug: match[1] } : { page: "home" };
}

export function useRoute() {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}
