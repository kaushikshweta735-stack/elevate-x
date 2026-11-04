import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS, discountPercent, isNewArrival, type CategoryFilter } from "../data/products";
import { CONDITIONS } from "../data/shop";
import { cx } from "../lib/format";
import { useShop } from "../store/shop";

type Sort = "featured" | "low" | "high" | "discount" | "newest";

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "low", label: "Price: low to high" },
  { value: "high", label: "Price: high to low" },
  { value: "discount", label: "Biggest saving" },
];

export default function Shop({
  navigate,
  params,
  setParams,
  headingOverride,
}: {
  navigate: (to: string) => void;
  params: URLSearchParams;
  setParams: (next: Record<string, string | null>) => void;
  headingOverride?: { eyebrow: string; title: string; blurb: string };
}) {
  const { saved } = useShop();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const category = (params.get("category") as CategoryFilter) ?? "All";
  const sort = (params.get("sort") as Sort) ?? "featured";
  const newOnly = params.get("new") === "1";
  const wishlistOnly = params.get("wishlist") === "1";
  const condition = params.get("condition") ?? "";
  const urlQuery = params.get("q") ?? "";

  // keep the local input in sync when the header changes ?q=
  useEffect(() => setQuery(urlQuery), [urlQuery]);

  const results = useMemo(() => {
    const q = urlQuery.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (condition && p.condition !== condition) return false;
      if (newOnly && !isNewArrival(p)) return false;
      if (wishlistOnly && !saved.includes(p.slug)) return false;
      if (!q) return true;
      return [p.name, p.category, p.condition, p.era, p.description ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    switch (sort) {
      case "low": list = [...list].sort((a, b) => a.price - b.price); break;
      case "high": list = [...list].sort((a, b) => b.price - a.price); break;
      case "discount":
        list = [...list].sort((a, b) => (discountPercent(b) ?? -1) - (discountPercent(a) ?? -1));
        break;
      case "newest":
        list = [...list].sort((a, b) => (b.addedAt ?? "").localeCompare(a.addedAt ?? ""));
        break;
      default:
        list = [...list].sort((a, b) => Number(Boolean(b.tag)) - Number(Boolean(a.tag)));
    }
    return list;
  }, [category, condition, newOnly, wishlistOnly, sort, urlQuery, saved]);

  const activeFilters = [
    category !== "All" && { key: "category", label: category },
    condition && { key: "condition", label: condition },
    newOnly && { key: "new", label: "New arrivals" },
    wishlistOnly && { key: "wishlist", label: "Wishlist" },
    urlQuery && { key: "q", label: `“${urlQuery}”` },
  ].filter(Boolean) as { key: string; label: string }[];

  const heading = headingOverride ?? {
    eyebrow: wishlistOnly ? "Saved pieces" : newOnly ? "Fresh on the rack" : "The full rack",
    title: wishlistOnly ? "Your wishlist" : newOnly ? "New arrivals" : "Shop all",
    blurb: wishlistOnly
      ? "Pieces you have your eye on. Saved on this device — message us on WhatsApp to reserve one."
      : "Every piece is one of one, quality checked and priced for real life.",
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setParams({ q: query.trim() || null });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#EDE5D5]/10 pb-6">
        <div>
          <p className="eyebrow mb-2 text-[#D81F2A]">{heading.eyebrow}</p>
          <h1 className="display-lg text-4xl sm:text-5xl">{heading.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-[#EDE5D5]/50">{heading.blurb}</p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="sr-only">Sort products</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setParams({ sort: e.target.value === "featured" ? null : e.target.value })}
            className="rounded-full border border-[#EDE5D5]/16 bg-[#131116] px-4 py-2.5 text-sm font-semibold text-[#EDE5D5] focus:border-[#EDE5D5]/35 focus:outline-none"
          >
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-5 space-y-3">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
          {(["All", ...CATEGORIES] as CategoryFilter[]).map((c) => {
            const active = c === "All" ? category === "All" : category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setParams({ category: c === "All" ? null : c })}
                className={cx(
                  "shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition",
                  active
                    ? "border-transparent bg-[#EDE5D5] text-[#0b0a0c]"
                    : "border-[#EDE5D5]/15 bg-white/[0.03] text-[#EDE5D5]/70 hover:border-[#EDE5D5]/30 hover:text-[#EDE5D5]",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <form onSubmit={submitSearch} className="relative">
            <label htmlFor="shop-search" className="sr-only">Search this collection</label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this collection"
              className="w-full min-w-[13rem] rounded-full border border-[#EDE5D5]/15 bg-white/[0.03] px-4 py-2 text-sm text-[#EDE5D5] placeholder:text-[#EDE5D5]/35 focus:border-[#EDE5D5]/35 focus:outline-none sm:w-64"
            />
          </form>

          <label htmlFor="condition" className="sr-only">Filter by condition</label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setParams({ condition: e.target.value || null })}
            className="rounded-full border border-[#EDE5D5]/15 bg-[#131116] px-4 py-2 text-sm font-semibold text-[#EDE5D5]/80 focus:border-[#EDE5D5]/35 focus:outline-none"
          >
            <option value="">Any condition</option>
            {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <button
            type="button"
            aria-pressed={wishlistOnly}
            onClick={() => setParams({ wishlist: wishlistOnly ? null : "1" })}
            className={cx(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              wishlistOnly
                ? "border-transparent bg-[#D81F2A] text-white"
                : "border-[#EDE5D5]/15 bg-white/[0.03] text-[#EDE5D5]/70 hover:text-[#EDE5D5]",
            )}
          >
            ♥ Wishlist
          </button>

          <span className="ml-auto text-xs text-[#EDE5D5]/40" aria-live="polite">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setParams({ [f.key]: null })}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EDE5D5]/20 bg-white/5 px-3 py-1 text-xs font-semibold text-[#EDE5D5]/80 hover:border-[#EDE5D5]/40"
              >
                {f.label} <span aria-hidden="true">✕</span>
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => { setQuery(""); setParams({ category: null, condition: null, q: null, new: null, wishlist: null, sort: null }); }}
              className="text-xs font-semibold text-[#EDE5D5]/45 underline-offset-4 hover:text-[#EDE5D5] hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      {results.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-[#EDE5D5]/15 bg-white/[0.02] px-6 py-16 text-center">
          <p className="font-display text-3xl font-bold uppercase">
            {wishlistOnly ? "Nothing saved yet" : "No pieces match that"}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-[#EDE5D5]/50">
            {wishlistOnly
              ? "Tap the heart on any piece to save it here."
              : urlQuery
                ? `We couldn't find “${urlQuery}”. Try a broader search or browse a category.`
                : "Try a different category or condition."}
          </p>
          <button
            type="button"
            onClick={() => { setQuery(""); setParams({ category: null, condition: null, q: null, new: null, wishlist: null }); }}
            className="btn btn-cream mt-6 px-6 py-2.5 text-sm"
          >
            Show all pieces
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p, i) => (
            <ProductCard key={p.slug} product={p} onOpen={(slug) => navigate(`/product/${slug}`)} priority={i < 4} />
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-[#EDE5D5]/35">
        Favourites and your bag are saved on this device. Every piece is one of one.
      </p>
    </div>
  );
}
