/// <reference types="vite/client" />
/**
 * Catalogue source.
 *
 * Products can come from two places:
 *   1. Sanity (CMS) — when VITE_SANITY_PROJECT_ID is set. Managed in /studio.
 *   2. src/data/products.ts — the built-in fallback, used when no project is
 *      configured, on the first paint, or if the CMS request fails.
 *
 * The site never breaks because the CMS is unreachable: it falls back to the
 * bundled catalogue and shows a small "showing built-in catalogue" notice.
 */
import { useEffect, useState } from "react";
import type { Availability, Category, Product, ProductImage } from "../data/products";
import { CATEGORIES, PRODUCTS as BUILT_IN } from "../data/products";

export const SANITY = {
  projectId: (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined)?.trim() || "",
  dataset: (import.meta.env.VITE_SANITY_DATASET as string | undefined)?.trim() || "production",
  apiVersion: "2024-10-01",
} as const;

export const cmsEnabled = () => SANITY.projectId.length > 0;

const QUERY = `*[_type == "product" && !(_id in path("drafts.**"))] | order(order asc, _createdAt desc) {
  "slug": slug.current,
  name,
  category,
  price,
  mrp,
  size,
  condition,
  era,
  availability,
  description,
  fabric,
  flaws,
  measurements[]{label, value},
  tag,
  addedAt,
  "images": images[]{ "src": asset->url, kind, alt }
}`;

interface RawProduct {
  slug?: string;
  name?: string;
  category?: string;
  price?: number;
  mrp?: number;
  size?: string;
  condition?: string;
  era?: string;
  availability?: string;
  description?: string;
  fabric?: string;
  flaws?: string[];
  measurements?: { label?: string; value?: string }[];
  tag?: string;
  addedAt?: string;
  images?: { src?: string; kind?: string; alt?: string }[];
}

const KINDS = ["front", "back", "detail", "fabric", "label"] as const;
const CONDITIONS = ["Excellent", "Like New", "Good", "Vintage"] as const;
const AVAILABILITY: Availability[] = ["in-stock", "reserved", "sold"];

/** Defensive mapping: bad CMS content degrades to a sensible default, never a crash. */
export function normaliseProduct(raw: RawProduct): Product | null {
  if (!raw?.name || !raw?.slug) return null;
  const category = (CATEGORIES as readonly string[]).includes(raw.category ?? "")
    ? (raw.category as Category)
    : "Vintage";
  const condition = (CONDITIONS as readonly string[]).includes(raw.condition ?? "")
    ? (raw.condition as Product["condition"])
    : "Good";

  const images: ProductImage[] = (raw.images ?? [])
    .filter((i): i is { src: string; kind?: string; alt?: string } => Boolean(i?.src))
    .map((i) => ({
      src: i.src,
      kind: (KINDS as readonly string[]).includes(i.kind ?? "") ? (i.kind as ProductImage["kind"]) : "front",
      alt: i.alt,
    }));

  return {
    slug: raw.slug,
    name: raw.name,
    category,
    price: Number(raw.price) || 0,
    mrp: raw.mrp ? Number(raw.mrp) : undefined,
    size: raw.size ?? "—",
    condition,
    era: raw.era ?? "",
    availability: AVAILABILITY.includes(raw.availability as Availability)
      ? (raw.availability as Availability)
      : "in-stock",
    images,
    measurements: (raw.measurements ?? [])
      .filter((m) => m?.label && m?.value)
      .map((m) => ({ label: m.label as string, value: m.value as string })),
    fabric: raw.fabric,
    flaws: raw.flaws,
    description: raw.description,
    tag: raw.tag,
    addedAt: raw.addedAt,
    // illustration fallback styling (only used if the piece has no photo)
    garment: "shirt",
    bg: "#E9DFCE",
    ink: "#3a2c28",
    accent: "#D81F2A",
  };
}

export interface Catalogue {
  products: Product[];
  bySlug: Map<string, Product>;
  source: "cms" | "built-in";
  status: "loading" | "ready";
  error?: string;
}

const builtIn = (): Catalogue => ({
  products: BUILT_IN,
  bySlug: new Map(BUILT_IN.map((p) => [p.slug, p])),
  source: "built-in",
  status: "ready",
});

/**
 * Loads the catalogue once per session. Starts from the built-in list so the
 * first paint is instant, then swaps in CMS content when it arrives.
 */
export function useCatalogue(): Catalogue {
  const [state, setState] = useState<Catalogue>(() =>
    cmsEnabled() ? { ...builtIn(), status: "loading" } : builtIn(),
  );

  useEffect(() => {
    if (!cmsEnabled()) return;
    let cancelled = false;

    // Remember sold pieces the shop has already marked in the CMS so a stale
    // built-in list never offers something that has gone.
    const cacheKey = "elevate.catalogue.v1";
    try {
      const cached = window.localStorage.getItem(cacheKey);
      if (cached) {
        const parsed: Product[] = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setState({
            products: parsed,
            bySlug: new Map(parsed.map((p) => [p.slug, p])),
            source: "cms",
            status: "ready",
          });
        }
      }
    } catch {
      /* ignore corrupt cache */
    }

    const url =
      `https://${SANITY.projectId}.apicdn.sanity.io/v${SANITY.apiVersion}/data/query/` +
      `${SANITY.dataset}?query=${encodeURIComponent(QUERY)}`;

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`CMS responded ${r.status}`);
        return r.json();
      })
      .then((json: { result?: RawProduct[] }) => {
        if (cancelled) return;
        const products = (json.result ?? []).map(normaliseProduct).filter(Boolean) as Product[];
        if (products.length === 0) {
          // An empty dataset would hide the whole shop — keep the fallback.
          setState({ ...builtIn(), error: "The CMS has no published products yet." });
          return;
        }
        setState({
          products,
          bySlug: new Map(products.map((p) => [p.slug, p])),
          source: "cms",
          status: "ready",
        });
        try {
          window.localStorage.setItem(cacheKey, JSON.stringify(products));
        } catch {
          /* storage full — not fatal */
        }
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          status: "ready",
          error: prev.source === "cms" ? undefined : `CMS unavailable (${err.message}); showing the built-in catalogue.`,
        }));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
