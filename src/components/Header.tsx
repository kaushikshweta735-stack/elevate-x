import { useEffect, useRef, useState } from "react";
import { SITE, waLink } from "../data/site";
import { useShop } from "../store/shop";
import SiteMark from "./SiteMark";
import { IconBag, IconClose, IconHeart, IconMenu, IconSearch } from "./ui";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "New Arrivals", to: "/shop?new=1" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header({
  route,
  navigate,
  onOpenBag,
  query,
  onQuery,
}: {
  route: string;
  navigate: (to: string) => void;
  onOpenBag: () => void;
  query: string;
  onQuery: (q: string) => void;
}) {
  const { count, saved } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (to: string) => {
    const path = to.split("?")[0];
    if (path === "/") return route === "home";
    if (path === "/shop") return route === "shop";
    return route === path.replace("/", "");
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#08070a]/85 backdrop-blur-xl">
        <div className="border-b border-[#EDE5D5]/10">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-[72px]">
            {/* Brand */}
            <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label={`${SITE.brandName} — home`}>
              <SiteMark className="h-10 w-10 rounded-full ring-1 ring-[#EDE5D5]/20" />
              <span className="hidden leading-none sm:block">
                <span className="block font-display text-2xl font-extrabold tracking-[0.02em] uppercase">
                  Elevate <span className="font-script text-lg text-[#D81F2A]">x</span> Thrift
                </span>
                <span className="mt-1 block text-[9px] font-bold tracking-[0.28em] text-[#EDE5D5]/35 uppercase">Buy • Wear • Repeat</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  aria-current={isActive(l.to) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide transition ${
                    isActive(l.to)
                      ? "bg-white/8 text-[#EDE5D5]"
                      : "text-[#EDE5D5]/60 hover:bg-white/5 hover:text-[#EDE5D5]"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <form onSubmit={submitSearch} className="hidden md:block">
                <label htmlFor="header-search" className="sr-only">Search all products</label>
                <div className="relative">
                  <IconSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#EDE5D5]/40" />
                  <input
                    id="header-search"
                    type="search"
                    value={query}
                    onChange={(e) => onQuery(e.target.value)}
                    placeholder="Search"
                    className="w-40 rounded-full border border-[#EDE5D5]/14 bg-white/[0.04] py-2 pr-3 pl-9 text-sm text-[#EDE5D5] placeholder:text-[#EDE5D5]/35 focus:border-[#EDE5D5]/35 focus:outline-none lg:w-52"
                  />
                </div>
              </form>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#EDE5D5]/70 transition hover:bg-white/8 hover:text-[#EDE5D5] md:hidden"
              >
                <IconSearch />
              </button>

              <a
                href="/shop?wishlist=1"
                aria-label={`Wishlist${saved.length ? `, ${saved.length} saved` : ""}`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#EDE5D5]/70 transition hover:bg-white/8 hover:text-[#EDE5D5]"
              >
                <IconHeart />
                {saved.length > 0 && (
                  <span className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D81F2A] px-1 text-[10px] font-bold text-white">
                    {saved.length}
                  </span>
                )}
              </a>

              <button
                type="button"
                onClick={onOpenBag}
                className="relative flex items-center gap-2 rounded-full bg-[#EDE5D5] px-3.5 py-2.5 text-[13px] font-bold text-[#0b0a0c] transition hover:bg-white"
                aria-label={`Open shopping bag${count ? `, ${count} items` : ", empty"}`}
              >
                <IconBag className="h-4 w-4" />
                <span className="hidden sm:inline">Bag</span>
                <span
                  data-testid="bag-count"
                  className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-extrabold ${
                    count > 0 ? "bg-[#D81F2A] text-white" : "bg-black/15 text-[#0b0a0c]/70"
                  }`}
                >
                  {count}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#EDE5D5]/80 transition hover:bg-white/8 lg:hidden"
              >
                <IconMenu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile search sheet */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <form onSubmit={submitSearch} className="relative m-4 rounded-2xl border border-[#EDE5D5]/15 bg-[#121014] p-4">
            <div className="flex items-center gap-2">
              <IconSearch className="h-5 w-5 shrink-0 text-[#EDE5D5]/45" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="Search jackets, denim, tees…"
                aria-label="Search all products"
                className="field"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#EDE5D5]/70">
                <IconClose />
              </button>
            </div>
            <button type="submit" className="btn btn-primary mt-3 w-full py-2.5 text-sm">Search</button>
          </form>
        </div>
      )}

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <nav
            aria-label="Mobile"
            className="drawer-in absolute top-0 right-0 flex h-full w-[86%] max-w-xs flex-col border-l border-[#EDE5D5]/12 bg-[#0d0b0f] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[#EDE5D5]/45">Menu</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-[#EDE5D5]">
                <IconClose className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  className="border-b border-[#EDE5D5]/8 py-3.5 font-display text-2xl font-bold tracking-wide uppercase text-[#EDE5D5] hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a href="/shop?wishlist=1" className="border-b border-[#EDE5D5]/8 py-3.5 font-display text-2xl font-bold tracking-wide uppercase text-[#EDE5D5] hover:text-white">
                Wishlist {saved.length > 0 && <span className="text-[#D81F2A]">({saved.length})</span>}
              </a>
            </div>
            <div className="mt-auto space-y-2 pt-6">
              <a href={waLink("Hi Elevate X Thrift! I have a question about a piece on your site.")} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full py-3 text-sm">
                Chat on WhatsApp
              </a>
              <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="btn btn-ghost w-full py-3 text-sm">
                {SITE.instagramHandle}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
