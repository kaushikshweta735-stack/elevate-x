import { useCallback, useEffect, useState } from "react";

/**
 * Minimal history-based router — no dependency, works on Vercel thanks to the
 * SPA rewrite in vercel.json. Routes:
 *   /            home
 *   /shop        all products (supports ?category=&q=&sort=&new=1)
 *   /product/:slug
 *   /checkout
 *   /about
 *   /contact
 */
export type Route =
  | { name: "home" }
  | { name: "shop" }
  | { name: "product"; slug: string }
  | { name: "checkout" }
  | { name: "about" }
  | { name: "contact" }
  | { name: "notfound" };

export function parseRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return { name: "home" };
  if (path === "/shop" || path === "/new-arrivals") return { name: "shop" };
  if (path === "/checkout") return { name: "checkout" };
  if (path === "/about") return { name: "about" };
  if (path === "/contact") return { name: "contact" };
  const product = path.match(/^\/product\/([A-Za-z0-9-_]+)$/);
  if (product) return { name: "product", slug: product[1] };
  return { name: "notfound" };
}

const ROUTE_TITLES: Record<string, string> = {
  home: "Elevate X Thrift — Men's Thrift Fashion | Panipat, Haryana",
  shop: "Shop — Elevate X Thrift",
  product: "Elevate X Thrift",
  checkout: "Checkout — Elevate X Thrift",
  about: "About — Elevate X Thrift",
  contact: "Contact — Elevate X Thrift",
  notfound: "Page not found — Elevate X Thrift",
};

export function useRouter() {
  /**
   * Track path *and* search — filtering only changes the query string, and a
   * path-only state would bail out of re-rendering, leaving filters dead.
   */
  const readUrl = () =>
    typeof window === "undefined" ? "/" : window.location.pathname + window.location.search;
  const [url, setUrl] = useState(readUrl);

  useEffect(() => {
    const onPop = () => setUrl(readUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  /** Navigate, preserving scroll behaviour like a real site (top on new page). */
  const navigate = useCallback((to: string, opts: { replace?: boolean; keepScroll?: boolean } = {}) => {
    const [, hash] = to.split("#");
    if (opts.replace) window.history.replaceState({}, "", to);
    else window.history.pushState({}, "", to);
    setUrl(window.location.pathname + window.location.search);
    if (!opts.keepScroll) {
      if (hash) {
        // let the target render first
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          else window.scrollTo({ top: 0 });
        });
      } else {
        window.scrollTo({ top: 0 });
      }
    }
  }, []);

  const [pathname, search] = url.split("?");
  const route = parseRoute(pathname);
  const params = new URLSearchParams(search ?? "");

  useEffect(() => {
    document.title = ROUTE_TITLES[route.name] ?? ROUTE_TITLES.home;
  }, [route.name]);

  /** Intercept internal links so they use the router instead of a full reload. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || target === "_blank" || anchor.hasAttribute("download")) return;
      if (!href.startsWith("/") || href.startsWith("//")) return;
      event.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  return { route, navigate, pathname, params, url };
}
