import { useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { SITE } from "../data/site";
import { CATEGORIES, hasPhotos, isNewArrival } from "../data/products";
import { useShop } from "../store/shop";
import { ProductMedia } from "../components/ProductMedia";
import { IconArrow, IconInstagram, IconTruck, IconWhatsApp, IconCheck } from "../components/ui";

export default function Home({ navigate }: { navigate: (to: string) => void }) {
  const { products } = useShop();

  const fresh = useMemo(() => {
    const newlyAdded = products.filter((p) => isNewArrival(p));
    return (newlyAdded.length > 0 ? newlyAdded : products).slice(0, 4);
  }, [products]);

  const featured = useMemo(() => products.slice(0, 8), [products]);
  const heroPiece = useMemo(() => products.find(hasPhotos) ?? products[0] ?? null, [products]);
  const photoCount = useMemo(() => products.filter(hasPhotos).length, [products]);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden border-b border-[#EDE5D5]/10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
          <div className="fade-up">
            <p className="eyebrow flex items-center gap-2 text-[#EDE5D5]/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D81F2A]" /> Men's thrift · {SITE.city}, {SITE.state}
            </p>
            <h1 className="display-xl mt-4 text-[clamp(3.25rem,11vw,6.5rem)]">
              Buy.<br />Wear.<br /><span className="text-[#D81F2A]">Repeat.</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#EDE5D5]/60 sm:text-base">
              One-of-one pre-loved menswear — vintage, streetwear, denim and workwear.
              Hand-picked, checked piece by piece, and priced for real life.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => navigate("/shop")} className="btn btn-cream px-6 py-3.5 text-sm">
                Shop the rack <IconArrow className="h-4 w-4" />
              </button>
              <button onClick={() => navigate("/shop?new=1")} className="btn btn-ghost px-6 py-3.5 text-sm">
                New arrivals
              </button>
            </div>

            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-[#EDE5D5]/10 pt-5">
              {[
                ["1 of 1", "Every piece"],
                ["Checked", "Before listing"],
                ["India-wide", "Delivery"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-xl font-extrabold text-[#EDE5D5]">{v}</dt>
                  <dd className="mt-0.5 text-[10px] font-semibold tracking-[0.14em] text-[#EDE5D5]/35 uppercase">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Editorial panel — real photo when available, illustration otherwise */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-[#EDE5D5]/14 bg-[#121014]">
              <div className="product-frame">
                {heroPiece ? (
                  <ProductMedia product={heroPiece} priority sizes="(max-width: 1024px) 100vw, 45vw" />
                ) : (
                  <div className="h-full w-full animate-pulse bg-white/5" aria-hidden="true" />
                )}
              </div>
              {heroPiece && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4">
                  <p className="eyebrow text-[#EDE5D5]/55">{photoCount > 0 ? "On the rack" : "The rack, illustrated"}</p>
                  <p className="mt-0.5 font-display text-2xl font-extrabold">{heroPiece.name}</p>
                  <button
                    onClick={() => navigate(`/product/${heroPiece.slug}`)}
                    className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-[#EDE5D5]/80 uppercase hover:text-white"
                  >
                    View piece <IconArrow className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute -top-3 -left-3 rounded-full border border-[#D81F2A]/40 bg-[#D81F2A] px-3 py-1 text-[10px] font-extrabold tracking-[0.16em] text-white uppercase">
              New drop weekly
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Trust strip ---------------- */}
      <section aria-label="How ordering works" className="border-b border-[#EDE5D5]/10 bg-[#0b090d]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6">
          {[
            { icon: <IconCheck className="h-4 w-4" />, t: "Quality checked", d: "Each piece inspected, flaws listed honestly" },
            { icon: <IconTruck className="h-4 w-4" />, t: "Ships across India", d: "Delivery confirmed by PIN code at checkout" },
            { icon: <IconWhatsApp className="h-4 w-4" />, t: "Order on WhatsApp", d: "Send your order, we confirm stock personally" },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#EDE5D5]/15 bg-white/[0.03] text-[#EDE5D5]/70">
                {f.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-[#EDE5D5]">{f.t}</p>
                <p className="text-xs text-[#EDE5D5]/45">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-[#D81F2A]">Browse</p>
            <h2 className="display-lg text-2xl sm:text-3xl">Shop by category</h2>
          </div>
          <button onClick={() => navigate("/shop")} className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]">
            All pieces <IconArrow className="h-4 w-4" />
          </button>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => navigate(`/shop?category=${encodeURIComponent(c)}`)}
              className="shrink-0 rounded-full border border-[#EDE5D5]/15 bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-[#EDE5D5]/75 transition hover:border-[#EDE5D5]/35 hover:text-[#EDE5D5]"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- New arrivals ---------------- */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-[#D81F2A]">Fresh on the rack</p>
            <h2 className="display-lg text-2xl sm:text-3xl">Latest additions</h2>
          </div>
          <button onClick={() => navigate("/shop?new=1")} className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]">
            View all <IconArrow className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {fresh.map((p) => <ProductCard key={p.slug} product={p} onOpen={(s) => navigate(`/product/${s}`)} priority />)}
        </div>
      </section>

      {/* ---------------- About teaser ---------------- */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 rounded-2xl border border-[#EDE5D5]/12 bg-gradient-to-br from-[#4a1017]/40 to-transparent p-6 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="eyebrow text-[#EDE5D5]/45">The shop</p>
            <h2 className="display-lg mt-2 text-3xl sm:text-4xl">Thrift, done properly</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#EDE5D5]/60">
              Elevate X Thrift started with a simple idea: good clothing shouldn't be disposable. Every piece is
              sourced and checked in Panipat, measured by hand and listed once — no mass production, no restocks,
              no two the same.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => navigate("/about")} className="btn btn-cream px-5 py-3 text-sm">Our story</button>
              <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="btn btn-ghost px-5 py-3 text-sm">
                <IconInstagram className="h-4 w-4" /> {SITE.instagramHandle}
              </a>
            </div>
          </div>
          <ul className="grid gap-2.5 text-sm">
            {[
              "One-of-one pieces — when it's gone, it's gone",
              "Honest condition grading and listed flaws",
              "Listed once, exactly as it is",
              "Reusing quality clothing instead of buying new",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[#EDE5D5]/70">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D81F2A]" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Featured ---------------- */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-[#D81F2A]">Handpicked</p>
            <h2 className="display-lg text-2xl sm:text-3xl">Featured pieces</h2>
          </div>
          <button onClick={() => navigate("/shop")} className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]">
            Shop all <IconArrow className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.slug} product={p} onOpen={(s) => navigate(`/product/${s}`)} />)}
        </div>
      </section>

      {/* ---------------- Contact strip ---------------- */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#EDE5D5]/12 bg-[#0d0b0f] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="eyebrow text-[#EDE5D5]/40">Questions before you buy?</p>
            <p className="mt-1 font-display text-2xl font-extrabold uppercase">Talk to us directly</p>
            <p className="mt-1 text-sm text-[#EDE5D5]/50">Sizes, measurements, holds or delivery — we usually reply within a few hours.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Elevate X Thrift! I have a question about a piece.")}`} target="_blank" rel="noreferrer" className="btn btn-whatsapp px-5 py-3 text-sm">
              <IconWhatsApp className="h-4 w-4" /> WhatsApp
            </a>
            <a href={SITE.emailHref} className="btn btn-ghost px-5 py-3 text-sm">Email</a>
          </div>
        </div>
      </section>
    </>
  );
}
