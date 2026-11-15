import { useEffect, useState } from "react";

export type RoutePath = "/" | "/services" | "/technology" | "/about" | "/contact";

export const routes: { path: RoutePath; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/technology", label: "Technology" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact" },
];

export type RouteState = { path: RoutePath; section?: string };

function parse(): RouteState {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [p, q] = raw.split("?");
  const match = routes.find((r) => r.path === p);
  const section = new URLSearchParams(q || "").get("s") || undefined;
  return { path: match ? match.path : "/", section };
}

/** Hash routing keeps the single-file build working from file:// and any static host. */
export function useHashRoute(): RouteState {
  const [state, setState] = useState<RouteState>(() => parse());
  useEffect(() => {
    const onChange = () => setState(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return state;
}

export const href = (path: RoutePath, section?: string) => `#${path}${section ? `?s=${section}` : ""}`;

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;
  const delta = el.getBoundingClientRect().top - 24;
  if (Math.abs(delta) < 4) return true;
  window.scrollTo({ top: delta + window.scrollY, behavior });
  return false;
}
