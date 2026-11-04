import { useMemo, useState } from "react";
import GarmentArt from "./components/GarmentArt";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "./data/products";
import { SITE } from "./data/site";

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
type Sort = "featured" | "low" | "high" | "discount";

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
    <div className="min-h-screen overflow-x-clip bg-[#FAF6EE] text-[#111110]">
      {/* Announcement */}
      <div className="bg-[#111110] py-2 text-center text-[11px] font-bold tracking-[0.22em] text-[#C9F169]">MEN'S THRIFT FASHION • PANIPAT, Haryana &nbsp;•&nbsp; FREE SHIPPING OVER ₹999 &nbsp;•&nbsp; NEW DROPS EVERY FRIDAY</div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#FAF6EE]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <a href="#" aria-label="Elevate Thrift — home" className="font-display text-3xl leading-none font-extrabold tracking-tight">ELEVATE<span className="text-[#FF6B35]">&nbsp;THRIFT</span></a>
          <span className="font-script hidden -rotate-3 text-xl text-[#FF6B35] sm:block">thrift</span>
          <div className="ml-auto flex items-center gap-2">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search finds…" className="hidden w-44 rounded-full border border-black/15 bg-white/70 px-4 py-2 text-sm outline-none placeholder:text-black/40 focus:border-black md:block" />
            <button onClick={() => setOnlyFavs(v => !v)} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${onlyFavs ? "bg-[#111110] text-white" : "border-black/15 bg-white/70 hover:bg-white"}`}>♥ {favs.size || ""}</button>
            <button onClick={() => setBagOpen(true)} className="rounded-full bg-[#111110] px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5">Bag {bagCount > 0 && <span className="ml-1 rounded-full bg-[#C9F169] px-2 py-0.5 text-xs text-black">{bagCount}</span>}</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:pt-16">
        <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-[#C9F169]/50 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-20 h-72 w-72 rounded-full bg-[#FF6B35]/25 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div className="pop-in">
            <span className="inline-block -rotate-2 rounded-full bg-[#C9F169] px-4 py-1 text-xs font-extrabold tracking-widest shadow">MEN'S THRIFT • 100% PRE-LOVED • 0% BORING</span>
            <h1 className="font-display mt-5 text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.85] font-extrabold uppercase">Buy.<br/>Wear.<br/><span className="text-[#FF6B35]">Repeat.</span></h1>
            <p className="mt-5 max-w-md text-base text-black/60 sm:text-lg">Panipat's men's thrift fashion store — one-of-one vintage, streetwear, denim & shirts, hand-picked, quality-checked and priced for real life. When it's gone, it's gone.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#shop" className="rounded-full bg-[#111110] px-7 py-3.5 font-bold text-white shadow-xl transition hover:-translate-y-0.5">Shop the drop ↓</a>
              <a href="#why" className="rounded-full border-2 border-black bg-white/60 px-7 py-3.5 font-bold backdrop-blur transition hover:bg-white">Why thrift?</a>
              <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="rounded-full border-2 border-[#FF6B35] bg-[#FF6B35]/10 px-7 py-3.5 font-bold text-[#C2410C] backdrop-blur transition hover:bg-[#FF6B35] hover:text-white">📸 {SITE.instagramHandle}</a>
            </div>
            <div className="mt-8 flex gap-8">
              {[["12k+","Happy thrifters"],["4.9★","Avg. rating"],["60%↓","Vs. MRP prices"]].map(([n,l]) => <div key={l}><div className="font-display text-3xl font-extrabold">{n}</div><div className="text-xs font-semibold tracking-wide text-black/50 uppercase">{l}</div></div>)}
            </div>
          </div>
          <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            {PRODUCTS.slice(0,4).map((p,i) => (
              <div key={p.id} className={`animate-floaty rounded-[1.75rem] border border-black/10 p-4 shadow-xl backdrop-blur ${i%2 ? "translate-y-6" : ""}`} style={{ background: p.bg, animationDelay: `${i*0.7}s` }}>
                <div className="h-36"><GarmentArt garment={p.garment} ink={p.ink} accent={p.accent}/></div>
                <div className="mt-2 flex items-center justify-between"><span className="text-sm font-bold">{p.name}</span><span className="rounded-full bg-black px-2 py-0.5 text-xs font-bold text-white">{inr(p.price)}</span></div>
              </div>))}
            <div className="animate-spin-slow absolute -top-6 -right-2 flex h-24 w-24 items-center justify-center rounded-full bg-[#FF6B35] text-center text-[10px] font-extrabold tracking-widest text-white shadow-xl">NEW DROP • EVERY FRIDAY • </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y-2 border-black bg-[#C9F169] py-2.5 -rotate-1 scale-[1.02]">
        <div className="animate-marquee font-display flex w-max gap-8 text-xl font-bold whitespace-nowrap uppercase">
          {Array.from({length:2}).map((_,k) => <span key={k}>Men's Vintage ✦ Streetwear ✦ Denim ✦ Shirts ✦ Accessories ✦ One-of-one finds ✦ Panipat ✦&nbsp;</span>)}
        </div>
      </div>

      {/* Shop */}
      <main id="shop" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="font-script text-2xl text-[#FF6B35]">fresh on the rack</p><h2 className="font-display text-5xl font-extrabold uppercase sm:text-6xl">Shop the drop</h2></div>
          <select value={sort} onChange={e => setSort(e.target.value as Sort)} className="rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold outline-none">
            <option value="featured">Sort: Featured</option><option value="low">Price: Low → High</option><option value="high">Price: High → Low</option><option value="discount">Biggest discount</option>
          </select>
        </div>

        <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold whitespace-nowrap transition ${category===c ? "bg-[#111110] text-white shadow-lg" : "border border-black/15 bg-white/70 hover:bg-white"}`}>{c}</button>)}
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…" className="min-w-36 rounded-full border border-black/15 bg-white px-4 py-2 text-sm outline-none md:hidden" />
        </div>

        {visible.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-black/20 bg-white/50 py-16 text-center"><p className="font-display text-3xl font-bold">No finds match that 😢</p><p className="mt-2 text-black/50">Try a different category or search.</p><button onClick={() => {setCategory("All"); setQuery(""); setOnlyFavs(false);}} className="mt-5 rounded-full bg-black px-6 py-2.5 font-bold text-white">Clear filters</button></div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {visible.map((p,i) => {
              const off = Math.round((1 - p.price/p.mrp)*100);
              return (
              <article key={p.id} className="pop-in group overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{animationDelay:`${(i%8)*0.05}s`}}>
                <div className="relative h-48 p-5 sm:h-56" style={{background:p.bg}}>
                  <GarmentArt garment={p.garment} ink={p.ink} accent={p.accent}/>
                  {p.tag && <span className="absolute top-3 left-3 -rotate-3 rounded-full bg-[#111110] px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-[#C9F169] uppercase">{p.tag}</span>}
                  <span className="absolute top-3 right-3 rounded-full bg-[#FF6B35] px-2.5 py-1 text-[11px] font-extrabold text-white">-{off}%</span>
                  <button aria-label="favourite" onClick={() => toggleFav(p.id)} className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full shadow transition hover:scale-110 ${favs.has(p.id) ? "bg-[#FF6B35] text-white" : "bg-white/90"}`}>{favs.has(p.id) ? "♥" : "♡"}</button>
                </div>
                <div className="p-4">
                  <div className="flex gap-1.5 text-[10px] font-bold tracking-wide uppercase"><span className="rounded-full bg-black/5 px-2 py-0.5">{p.era}</span><span className="rounded-full bg-black/5 px-2 py-0.5">{p.condition}</span><span className="rounded-full bg-black/5 px-2 py-0.5">Size {p.size}</span></div>
                  <h3 className="mt-2 leading-tight font-bold">{p.name}</h3>
                  <p className="text-xs text-black/45">{p.category}</p>
                  <div className="mt-2 flex items-baseline gap-2"><span className="font-display text-2xl font-extrabold">{inr(p.price)}</span><span className="text-sm text-black/40 line-through">{inr(p.mrp)}</span></div>
                  <button onClick={() => addToBag(p)} className="mt-3 w-full rounded-full bg-[#111110] py-2.5 text-sm font-bold text-white transition hover:bg-[#FF6B35]">Add to Bag</button>
                </div>
              </article>);})}
          </div>
        )}

        {/* Why thrift */}
        <section id="why" className="mt-20 grid gap-4 md:grid-cols-3">
          {[["♻️","Better for the planet","Every pre-loved piece saves water, waste and carbon vs. buying new."],["💸","60% cheaper, 100% original","Designer looks and rare vintage — without the designer price tag."],["✦","Truly one of one","No mass production. When a piece sells, it's gone forever."]].map(([icon,t,d]) => (
            <div key={t} className="rounded-[1.75rem] border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"><div className="text-3xl">{icon}</div><h3 className="font-display mt-3 text-2xl font-extrabold uppercase">{t}</h3><p className="mt-1 text-sm text-black/55">{d}</p></div>
          ))}
        </section>

        {/* Visit / Contact */}
        <section id="contact" className="mt-20 overflow-hidden rounded-[2rem] border border-black/10 bg-[#111110] text-white shadow-2xl">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-script text-2xl text-[#C9F169]">visit us / say hello</p>
              <h3 className="font-display mt-2 text-4xl font-extrabold uppercase sm:text-5xl">Elevate <span className="text-[#FF6B35]">Thrift</span></h3>
              <p className="mt-3 max-w-md text-white/60">{SITE.businessType} — premium pre-loved men's fashion, quality-checked in-store. DM us on Instagram for today's fresh drops, sizes & holds.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5">📸 Follow {SITE.instagramHandle}</a>
                <a href={SITE.emailHref} className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur transition hover:bg-white hover:text-black">✉️ Email us</a>
              </div>
            </div>
            <div className="grid gap-3">
              <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition hover:bg-white/[0.12]"><p className="text-xs font-extrabold tracking-widest text-[#C9F169] uppercase">Instagram</p><p className="mt-1 font-bold break-all">{SITE.instagramHandle}</p><p className="text-sm text-white/50">Daily drops, reels & stock updates</p></a>
              <a href={SITE.emailHref} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur transition hover:bg-white/[0.12]"><p className="text-xs font-extrabold tracking-widest text-[#C9F169] uppercase">Email</p><p className="mt-1 font-bold break-all">{SITE.email}</p><p className="text-sm text-white/50">Orders, bulk & partnership enquiries</p></a>
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur"><p className="text-xs font-extrabold tracking-widest text-[#C9F169] uppercase">Location</p><p className="mt-1 font-bold">{SITE.location}</p><p className="text-sm text-white/50">{SITE.businessType} • Shipping across India</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#111110] py-10 text-center text-white">
        <p className="font-display text-4xl font-extrabold">ELEVATE <span className="text-[#FF6B35]">THRIFT</span></p>
        <p className="font-script mt-1 text-2xl text-[#C9F169]">{SITE.tagline}</p>
        <p className="mt-3 text-sm text-white/55">{SITE.businessType} — {SITE.location} • Shipping across India</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-bold">
          <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 backdrop-blur transition hover:bg-[#FF6B35]">📸 {SITE.instagramHandle}</a>
          <a href={SITE.emailHref} className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 backdrop-blur transition hover:bg-white hover:text-black">✉️ {SITE.email}</a>
          <a href="#contact" className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 backdrop-blur transition hover:bg-white hover:text-black">📍 {SITE.city}, {SITE.state}</a>
        </div>
        <p className="mt-6 text-xs text-white/30">© {new Date().getFullYear()} {SITE.brandName}. All pieces are pre-loved & quality-checked.</p>
      </footer>

      {/* Bag drawer */}
      {bagOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setBagOpen(false)} />
          <aside className="drawer-in absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-[#FAF6EE] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 p-5"><h3 className="font-display text-3xl font-extrabold uppercase">Your Bag ({bagCount})</h3><button onClick={() => setBagOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">✕</button></div>
            <div className="flex-1 overflow-y-auto p-5">
              {bagItems.length===0 ? <div className="py-16 text-center"><p className="text-5xl">🛍️</p><p className="mt-3 font-bold">Your bag is empty</p><p className="text-sm text-black/50">Good finds don't wait around!</p></div>
              : bagItems.map(({p,qty}) => (
                <div key={p.id} className="mb-3 flex gap-3 rounded-3xl border border-black/10 bg-white p-3">
                  <div className="h-20 w-20 shrink-0 rounded-2xl p-2" style={{background:p.bg}}><GarmentArt garment={p.garment} ink={p.ink} accent={p.accent}/></div>
                  <div className="min-w-0 flex-1"><p className="truncate font-bold">{p.name}</p><p className="text-xs text-black/45">Size {p.size} • {p.condition}</p>
                    <div className="mt-2 flex items-center justify-between"><div className="flex items-center gap-2"><button onClick={()=>setQty(p.id,qty-1)} className="h-7 w-7 rounded-full bg-black/5 font-bold">−</button><span className="font-bold">{qty}</span><button onClick={()=>setQty(p.id,qty+1)} className="h-7 w-7 rounded-full bg-black/5 font-bold">+</button></div><span className="font-display text-xl font-extrabold">{inr(p.price*qty)}</span></div>
                  </div>
                </div>))}
            </div>
            {bagItems.length>0 && <div className="border-t border-black/10 p-5">
              <div className="flex justify-between text-sm"><span className="text-black/55">You save vs MRP</span><span className="font-bold text-green-700">− {inr(savings)}</span></div>
              <div className="mt-1 flex justify-between"><span className="font-bold">Total</span><span className="font-display text-3xl font-extrabold">{inr(total)}</span></div>
              <button onClick={() => { setBag(new Map()); setBagOpen(false); showToast("Order placed! Thank you for thrifting ♻️"); }} className="mt-4 w-full rounded-full bg-[#FF6B35] py-3.5 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5">Checkout • {inr(total)}</button>
            </div>}
          </aside>
        </div>
      )}

      <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" aria-label="Elevate Thrift on Instagram" className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B35] text-2xl shadow-2xl transition hover:-translate-y-1 hover:scale-105">📸</a>

      {toast && <div className="toast-in fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#111110] px-6 py-3 text-sm font-bold whitespace-nowrap text-white shadow-2xl">{toast}</div>}
    </div>
  );
}
