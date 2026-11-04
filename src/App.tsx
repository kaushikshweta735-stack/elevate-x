import { useMemo, useState } from "react";
import GarmentArt from "./components/GarmentArt";
import SiteMark from "./components/SiteMark";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "./data/products";
import { SITE } from "./data/site";

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
type Sort = "featured" | "low" | "high" | "discount";

/** Frosted backdrop: drifting crimson/haze blobs + fine grain behind every glass panel. */
function Backdrop() {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
        <span className="blob blob-d" />
      </div>
      <div className="noise" aria-hidden="true" />
    </>
  );
}

/** Builds the pre-filled WhatsApp order message from the current bag. */
function orderMessage(items: { p: Product; qty: number }[], total: number, savings: number) {
  const lines = items.map(({ p, qty }) => `• ${p.name} — Size ${p.size} × ${qty} = ${inr(p.price * qty)}`);
  return [
    `Hi ${SITE.brandName}! I'd like to place an order 👋`,
    "",
    ...lines,
    "",
    `Subtotal: ${inr(total)}`,
    `You save vs MRP: ${inr(savings)}`,
    "",
    "Please confirm availability and share payment details. Thanks!",
  ].join("\n");
}

export default function App() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [bag, setBag] = useState<Map<number, number>>(new Map());
  const [bagOpen, setBagOpen] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); window.setTimeout(() => setToast(""), 2200); };

  const toggleFav = (id: number) => setFavs(prev => { const n = new Set(prev); if (n.has(id)) { n.delete(id); } else { n.add(id); showToast("Saved to favourites ♥"); } return n; });
  const addToBag = (p: Product) => { setBag(prev => new Map(prev).set(p.id, (prev.get(p.id) ?? 0) + 1)); showToast(`${p.name} added to bag`); };
  const setQty = (id: number, qty: number) => setBag(prev => { const n = new Map(prev); if (qty <= 0) n.delete(id); else n.set(id, qty); return n; });

  const bagCount = [...bag.values()].reduce((a, b) => a + b, 0);
  const bagItems = [...bag.entries()].map(([id, qty]) => ({ p: PRODUCTS.find(x => x.id === id)!, qty }));
  const total = bagItems.reduce((s, { p, qty }) => s + p.price * qty, 0);
  const savings = bagItems.reduce((s, { p, qty }) => s + (p.mrp - p.price) * qty, 0);

  const waHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(orderMessage(bagItems, total, savings))}`;

  const visible = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      (category === "All" || p.category === category) &&
      (!onlyFavs || favs.has(p.id)) &&
      p.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "discount") list = [...list].sort((a, b) => (1 - b.price / b.mrp) - (1 - a.price / a.mrp));
    return list;
  }, [category, query, sort, favs, onlyFavs]);

  return (
    <div className="relative min-h-screen overflow-x-clip text-[#EDE5D5]">
      <Backdrop />

      <div className="relative z-10">
        {/* Announcement */}
        <div className="engrave border-b border-[#EDE5D5]/10 bg-black/50 py-2 text-center text-[11px] font-bold tracking-[0.22em] text-[#EDE5D5]/80 backdrop-blur-xl">
          MEN'S THRIFT FASHION • PANIPAT, HARYANA &nbsp;•&nbsp; <span className="text-[#FF5560]">FREE SHIPPING OVER ₹999</span> &nbsp;•&nbsp; ORDER ON WHATSAPP
        </div>

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-[#EDE5D5]/12 bg-black/35 backdrop-blur-2xl backdrop-saturate-150">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
            <a href="#" aria-label="Elevate Thrift — home" className="inline-flex items-center gap-2.5">
              <SiteMark className="h-11 w-11 shrink-0 rounded-full ring-1 ring-[#EDE5D5]/25 shadow-lg shadow-black/60 transition hover:ring-[#E02330]/70" />
              <span className="hidden leading-none sm:block">
                <span className="block font-display text-2xl font-extrabold tracking-tight uppercase">Elevate <span className="font-script text-xl text-[#E02330]">x</span> Thrift</span>
                <span className="mt-0.5 block text-[9px] font-bold tracking-[0.3em] text-[#EDE5D5]/40 uppercase">Buy • Wear • Repeat</span>
              </span>
            </a>
            <div className="ml-auto flex items-center gap-2">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search finds…" className="glass-field hidden w-40 rounded-full px-4 py-2 text-sm lg:block" />
              <button onClick={() => setOnlyFavs(v => !v)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${onlyFavs ? "bg-[#E02330] text-white shadow-lg shadow-[#E02330]/40" : "glass-pill text-[#EDE5D5]/85 hover:bg-white/12"}`}>♥ {favs.size || ""}</button>
              <button onClick={() => setBagOpen(true)} className="rounded-full bg-[#EDE5D5] px-4 py-2 text-sm font-bold text-[#0A0A0B] shadow-lg shadow-black/50 transition hover:-translate-y-0.5 hover:bg-white">Bag {bagCount > 0 && <span className="ml-1 rounded-full bg-[#E02330] px-2 py-0.5 text-xs text-white">{bagCount}</span>}</button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:pt-16">
          <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-[#E02330]/30 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="pop-in glass sheen rounded-[2.5rem] p-7 sm:p-10">
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <SiteMark className="h-16 w-16 shrink-0 rounded-full ring-1 ring-[#EDE5D5]/20 sm:h-20 sm:w-20" />
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#E02330]/45 bg-[#E02330]/20 px-4 py-1 text-[10px] font-extrabold tracking-[0.18em] text-[#FFC9CC] uppercase backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B47]" /> Men's Thrift • Vintage • Streetwear • More
                  </span>
                </div>
                <h1 className="font-display mt-5 text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.85] font-extrabold uppercase">
                  Buy.<br />Wear.<br /><span className="text-[#E02330]">Repeat.</span>
                </h1>
                <p className="mt-5 max-w-md text-base text-[#EDE5D5]/60 sm:text-lg">Panipat's men's thrift fashion store — one-of-one vintage, streetwear, denim & shirts, hand-picked, quality-checked and priced for real life. When it's gone, it's gone.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#shop" className="rounded-full bg-[#E02330] px-7 py-3.5 font-bold text-white shadow-xl shadow-[#E02330]/35 transition hover:-translate-y-0.5 hover:bg-[#FF3B47]">Shop the drop ↓</a>
                  <a href={waHref} target="_blank" rel="noreferrer" className="glass-pill rounded-full px-7 py-3.5 font-bold text-[#EDE5D5] transition hover:bg-white/15">💬 Order on WhatsApp</a>
                  <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="glass-pill rounded-full px-7 py-3.5 font-bold text-[#EDE5D5]/85 transition hover:bg-white/15">📸 {SITE.instagramHandle}</a>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[["12k+", "Happy thrifters"], ["4.9★", "Avg. rating"], ["60%↓", "Vs. MRP prices"]].map(([n, l]) => (
                    <div key={l} className="glass-soft rounded-2xl px-3 py-2.5 text-center">
                      <div className="font-display text-2xl leading-none font-extrabold text-[#EDE5D5] sm:text-3xl">{n}</div>
                      <div className="mt-1 text-[10px] font-semibold tracking-wide text-[#EDE5D5]/45 uppercase">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
              {PRODUCTS.slice(0, 4).map((p, i) => (
                <div key={p.id} className={`animate-floaty glass sheen rounded-[1.75rem] p-4 transition-shadow hover:shadow-2xl ${i % 2 ? "translate-y-6" : ""}`} style={{ animationDelay: `${i * 0.7}s` }}>
                  <div className="relative z-10">
                    <div className="relative h-32 overflow-hidden rounded-2xl" style={{ background: `linear-gradient(150deg, ${p.bg}, #F3EDE1)` }}>
                      <ProductImage p={p} />
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-bold text-[#EDE5D5]">{p.name}</span>
                      <span className="shrink-0 rounded-full bg-[#E02330] px-2 py-0.5 text-xs font-bold text-white">{inr(p.price)}</span>
                    </div>
                  </div>
                </div>))}
              <div className="animate-spin-slow absolute -top-6 -right-2 flex h-24 w-24 items-center justify-center rounded-full border border-[#FF5560]/60 bg-[#E02330]/90 text-center text-[10px] font-extrabold tracking-widest text-white shadow-xl shadow-[#E02330]/50 backdrop-blur">
                NEW DROP • EVERY FRIDAY •
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="engrave relative my-4 -rotate-1 scale-[1.02] overflow-hidden border-y border-[#FF5560]/35 bg-[#E02330]/25 py-2.5 backdrop-blur-xl">
          <div className="animate-marquee font-display flex w-max gap-8 text-xl font-bold whitespace-nowrap text-[#F6EEE0] uppercase">
            {Array.from({ length: 2 }).map((_, k) => <span key={k}>Men's Vintage ✦ Streetwear ✦ Denim ✦ Shirts ✦ Accessories ✦ One-of-one finds ✦ Panipat ✦&nbsp;</span>)}
          </div>
        </div>

        {/* Shop */}
        <main id="shop" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="glass sheen flex flex-wrap items-end justify-between gap-4 rounded-[2rem] p-6">
            <div className="relative z-10">
              <p className="font-script text-2xl text-[#FF5560]">fresh on the rack</p>
              <h2 className="font-display text-5xl font-extrabold uppercase sm:text-6xl">Shop the drop</h2>
            </div>
            <select value={sort} onChange={e => setSort(e.target.value as Sort)} className="glass-field relative z-10 rounded-full px-4 py-2.5 text-sm font-semibold">
              <option value="featured">Sort: Featured</option><option value="low">Price: Low → High</option><option value="high">Price: High → Low</option><option value="discount">Biggest discount</option>
            </select>
          </div>

          <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto py-1">
            {CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold whitespace-nowrap transition ${category === c ? "bg-[#E02330] text-white shadow-lg shadow-[#E02330]/40" : "glass-pill text-[#EDE5D5]/80 hover:bg-white/12"}`}>{c}</button>)}
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…" className="glass-field min-w-36 rounded-full px-4 py-2 text-sm lg:hidden" />
          </div>

          {visible.length === 0 ? (
            <div className="glass mt-12 rounded-[2rem] border-dashed py-16 text-center"><p className="font-display text-3xl font-bold">No finds match that 😢</p><p className="mt-2 text-[#EDE5D5]/50">Try a different category or search.</p><button onClick={() => { setCategory("All"); setQuery(""); setOnlyFavs(false); }} className="mt-5 rounded-full bg-[#E02330] px-6 py-2.5 font-bold text-white shadow-lg shadow-[#E02330]/40">Clear filters</button></div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {visible.map((p, i) => {
                const off = Math.round((1 - p.price / p.mrp) * 100);
                return (
                  <article key={p.id} className="pop-in glass glass-lift group overflow-hidden rounded-[1.75rem]" style={{ animationDelay: `${(i % 8) * 0.05}s` }}>
                    <div className="relative h-48 p-4 sm:h-56">
                      <div className="absolute inset-3 overflow-hidden rounded-[1.4rem] shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_12px_28px_-16px_rgba(0,0,0,.9)]" style={{ background: `linear-gradient(150deg, ${p.bg}, #F3EDE1)` }}>
                        <ProductImage p={p} className="h-full w-full" />
                      </div>
                      {p.tag && <span className="absolute top-3 left-3 -rotate-3 rounded-full bg-[#0A0A0B]/85 px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-[#EDE5D5] uppercase backdrop-blur">{p.tag}</span>}
                      <span className="absolute top-3 right-3 rounded-full bg-[#E02330]/95 px-2.5 py-1 text-[11px] font-extrabold text-white backdrop-blur">-{off}%</span>
                      <button aria-label="favourite" onClick={() => toggleFav(p.id)} className={`absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition hover:scale-110 ${favs.has(p.id) ? "bg-[#E02330] text-white ring-1 ring-[#FF5560]/70" : "bg-black/35 text-[#EDE5D5] ring-1 ring-white/35"}`}>{favs.has(p.id) ? "♥" : "♡"}</button>
                    </div>
                    <div className="border-t border-[#EDE5D5]/12 p-4">
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-bold tracking-wide text-[#EDE5D5]/75 uppercase">
                        <span className="rounded-full bg-white/8 px-2 py-0.5 ring-1 ring-white/12">{p.era}</span>
                        <span className="rounded-full bg-white/8 px-2 py-0.5 ring-1 ring-white/12">{p.condition}</span>
                        <span className="rounded-full bg-white/8 px-2 py-0.5 ring-1 ring-white/12">Size {p.size}</span>
                      </div>
                      <h3 className="mt-2 leading-tight font-bold text-[#EDE5D5]">{p.name}</h3>
                      <p className="text-xs text-[#EDE5D5]/40">{p.category}</p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display text-2xl font-extrabold text-[#EDE5D5]">{inr(p.price)}</span>
                        <span className="text-sm text-[#EDE5D5]/35 line-through">{inr(p.mrp)}</span>
                      </div>
                      <button onClick={() => addToBag(p)} className="mt-3 w-full rounded-full border border-[#EDE5D5]/25 bg-[#EDE5D5]/10 py-2.5 text-sm font-bold text-[#EDE5D5] transition hover:border-[#E02330] hover:bg-[#E02330] hover:text-white">Add to Bag</button>
                    </div>
                  </article>);
              })}
            </div>
          )}

          {/* Why thrift */}
          <section id="why" className="mt-20 grid gap-4 md:grid-cols-3">
            {[["♻️", "Better for the planet", "Every pre-loved piece saves water, waste and carbon vs. buying new."], ["💸", "60% cheaper, 100% original", "Designer looks and rare vintage — without the designer price tag."], ["✦", "Truly one of one", "No mass production. When a piece sells, it's gone forever."]].map(([icon, t, d]) => (
              <div key={t} className="glass glass-lift sheen rounded-[1.75rem] p-6"><div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E02330]/35 bg-[#E02330]/18 text-2xl backdrop-blur">{icon}</div>
                <h3 className="font-display mt-3 text-2xl font-extrabold uppercase">{t}</h3><p className="mt-1 text-sm text-[#EDE5D5]/55">{d}</p>
              </div></div>
            ))}
          </section>

          {/* Visit / Contact */}
          <section id="contact" className="glass-red mt-20 overflow-hidden rounded-[2rem]">
            <div className="engrave grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="flex items-center gap-4">
                  <SiteMark className="h-24 w-24 shrink-0 rounded-full ring-1 ring-[#EDE5D5]/25 drop-shadow-[0_10px_24px_rgba(0,0,0,.6)]" />
                  <div>
                    <p className="font-script text-2xl text-[#FFC9CC]">visit us / say hello</p>
                    <h3 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">Elevate <span className="text-[#FFD3D6]">x</span> Thrift</h3>
                  </div>
                </div>
                <p className="mt-3 max-w-md text-[#EDE5D5]/70">{SITE.businessType} — premium pre-loved men's fashion, quality-checked in-store. Order on WhatsApp or DM us on Instagram for today's fresh drops, sizes & holds.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={waHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#EDE5D5] px-6 py-3 text-sm font-extrabold text-[#0A0A0B] shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-white">💬 WhatsApp {SITE.whatsappDisplay}</a>
                  <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="glass-pill rounded-full px-6 py-3 text-sm font-bold text-[#EDE5D5] transition hover:bg-white/20">📸 {SITE.instagramHandle}</a>
                  <a href={SITE.emailHref} className="glass-pill rounded-full px-6 py-3 text-sm font-bold text-[#EDE5D5] transition hover:bg-white/20">✉️ Email us</a>
                </div>
              </div>
              <div className="grid gap-3">
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="rounded-3xl border border-[#EDE5D5]/18 bg-black/25 p-5 backdrop-blur-xl transition hover:bg-black/35"><p className="text-xs font-extrabold tracking-widest text-[#FFC9CC] uppercase">WhatsApp</p><p className="mt-1 font-bold">{SITE.whatsappDisplay}</p><p className="text-sm text-[#EDE5D5]/50">Fastest way to order, reserve or ask about a size</p></a>
                <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="rounded-3xl border border-[#EDE5D5]/18 bg-black/25 p-5 backdrop-blur-xl transition hover:bg-black/35"><p className="text-xs font-extrabold tracking-widest text-[#FFC9CC] uppercase">Instagram</p><p className="mt-1 font-bold break-all">{SITE.instagramHandle}</p><p className="text-sm text-[#EDE5D5]/50">Daily drops, reels & stock updates</p></a>
                <div className="rounded-3xl border border-[#EDE5D5]/18 bg-black/25 p-5 backdrop-blur-xl"><p className="text-xs font-extrabold tracking-widest text-[#FFC9CC] uppercase">Location</p><p className="mt-1 font-bold">{SITE.location}</p><p className="text-sm text-[#EDE5D5]/50">{SITE.businessType} • Shipping across India</p></div>
              </div>
            </div>
          </section>
        </main>

        <footer className="engrave mt-10 border-t border-[#EDE5D5]/12 bg-black/40 py-10 text-center backdrop-blur-2xl">
          <SiteMark className="mx-auto h-24 w-24 rounded-full ring-1 ring-[#EDE5D5]/20 drop-shadow-[0_12px_28px_rgba(0,0,0,.75)]" />
          <p className="font-display mt-4 text-4xl font-extrabold">ELEVATE <span className="font-script text-3xl text-[#E02330]">x</span> THRIFT</p>
          <p className="font-script mt-1 text-2xl text-[#FF5560]">{SITE.tagline}</p>
          <p className="mt-3 text-[10px] font-bold tracking-[0.28em] text-[#EDE5D5]/40 uppercase">Thrift store • Vintage • Streetwear • More</p>
          <p className="mt-2 text-sm text-[#EDE5D5]/45">{SITE.businessType} — {SITE.location} • Shipping across India</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="glass-pill rounded-full px-5 py-2.5 text-[#EDE5D5] transition hover:bg-[#E02330] hover:text-white">💬 {SITE.whatsappDisplay}</a>
            <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="glass-pill rounded-full px-5 py-2.5 text-[#EDE5D5] transition hover:bg-white/15">📸 {SITE.instagramHandle}</a>
            <a href={SITE.emailHref} className="glass-pill rounded-full px-5 py-2.5 text-[#EDE5D5] transition hover:bg-white/15">✉️ Email us</a>
            <a href="#contact" className="glass-pill rounded-full px-5 py-2.5 text-[#EDE5D5] transition hover:bg-white/15">📍 {SITE.city}, {SITE.state}</a>
          </div>
          <p className="mt-6 text-xs text-[#EDE5D5]/30">© {new Date().getFullYear()} {SITE.brandName}. All pieces are pre-loved & quality-checked.</p>
        </footer>
      </div>

      {/* Bag drawer */}
      {bagOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/55 backdrop-blur-md" onClick={() => setBagOpen(false)} />
          <aside className="drawer-in absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-[#EDE5D5]/18 bg-[#0A0A0B]/60 text-[#EDE5D5] shadow-2xl backdrop-blur-3xl backdrop-saturate-150">
            <div className="flex items-center justify-between border-b border-[#EDE5D5]/12 bg-white/5 p-5">
              <h3 className="font-display text-3xl font-extrabold uppercase">Your Bag ({bagCount})</h3>
              <button onClick={() => setBagOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDE5D5] text-[#0A0A0B] shadow-lg">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {bagItems.length === 0 ? <div className="py-16 text-center"><p className="text-5xl">🛍️</p><p className="mt-3 font-bold">Your bag is empty</p><p className="text-sm text-[#EDE5D5]/45">Good finds don't wait around!</p></div>
                : bagItems.map(({ p, qty }) => (
                  <div key={p.id} className="glass mb-3 flex gap-3 rounded-3xl p-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl" style={{ background: `linear-gradient(150deg, ${p.bg}, #F3EDE1)` }}><ProductImage p={p} className="h-full w-full" /></div>
                    <div className="min-w-0 flex-1"><p className="truncate font-bold">{p.name}</p><p className="text-xs text-[#EDE5D5]/45">Size {p.size} • {p.condition}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setQty(p.id, qty - 1)} className="h-7 w-7 rounded-full bg-white/10 font-bold ring-1 ring-white/20 backdrop-blur">−</button>
                          <span className="font-bold">{qty}</span>
                          <button onClick={() => setQty(p.id, qty + 1)} className="h-7 w-7 rounded-full bg-white/10 font-bold ring-1 ring-white/20 backdrop-blur">+</button>
                        </div>
                        <span className="font-display text-xl font-extrabold">{inr(p.price * qty)}</span>
                      </div>
                    </div>
                  </div>))}
            </div>
            {bagItems.length > 0 && <div className="border-t border-[#EDE5D5]/12 bg-white/5 p-5">
              <div className="flex justify-between text-sm"><span className="text-[#EDE5D5]/55">You save vs MRP</span><span className="font-bold text-[#8BE28B]">− {inr(savings)}</span></div>
              <div className="mt-1 flex justify-between"><span className="font-bold">Total</span><span className="font-display text-3xl font-extrabold">{inr(total)}</span></div>
              <a href={waHref} target="_blank" rel="noreferrer" onClick={() => showToast("Opening WhatsApp with your order…")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-extrabold text-[#062B14] shadow-lg shadow-[#25D366]/30 transition hover:-translate-y-0.5 hover:brightness-110">
                💬 Checkout on WhatsApp • {inr(total)}
              </a>
              <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-[#EDE5D5]/20 bg-white/5 py-3 text-sm font-bold text-[#EDE5D5]/85 transition hover:bg-white/12">📸 Or DM us on Instagram</a>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-[#EDE5D5]/40">Your bag is sent as a message — we confirm stock, then share secure payment details on WhatsApp.</p>
            </div>}
          </aside>
        </div>
      )}

      <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Elevate Thrift! I have a question about a piece on your site.")}`} target="_blank" rel="noreferrer" aria-label="Chat with Elevate Thrift on WhatsApp" className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-[#25D366]/60 bg-[#25D366] text-2xl shadow-2xl shadow-[#25D366]/40 backdrop-blur-md transition hover:-translate-y-1 hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#062B14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.31-1.93 1.36-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.2-4.94-4.4-.14-.19-1.16-1.55-1.16-2.95s.73-2.09 1-2.38c.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z"/></svg>
      </a>

      {toast && <div className="toast-in fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-[#EDE5D5]/18 bg-black/75 px-6 py-3 text-sm font-bold whitespace-nowrap text-[#EDE5D5] shadow-2xl backdrop-blur-xl">{toast}</div>}
    </div>
  );
}

/**
 * Product image slot: shows the real photo when `p.image` is set,
 * otherwise falls back to the built-in garment illustration.
 */
function ProductImage({ p, className = "h-full w-full" }: { p: Product; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = p.image ? import.meta.env.BASE_URL + p.image.replace(/^\//, "") : null;

  if (src && !failed) {
    return (
      <div className={`${className} photo-wrap`}>
        <img src={src} alt={p.name} loading="lazy" decoding="async" onError={() => setFailed(true)} className="photo" />
      </div>
    );
  }
  return <div className={className}><GarmentArt garment={p.garment} ink={p.ink} accent={p.accent} /></div>;
}
