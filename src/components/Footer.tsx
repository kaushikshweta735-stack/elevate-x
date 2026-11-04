import { SITE, waLink } from "../data/site";
import { CATEGORIES } from "../data/products";
import SiteMark from "./SiteMark";
import { IconInstagram, IconMail, IconPin, IconWhatsApp } from "./ui";

export default function Footer({ navigate }: { navigate: (to: string) => void }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[#EDE5D5]/10 bg-[#0a080b]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <SiteMark className="h-14 w-14 rounded-full ring-1 ring-[#EDE5D5]/20" />
              <div>
                <p className="font-display text-2xl font-extrabold tracking-wide uppercase">Elevate <span className="font-script text-xl text-[#D81F2A]">x</span> Thrift</p>
                <p className="text-[10px] font-bold tracking-[0.24em] text-[#EDE5D5]/40 uppercase">{SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#EDE5D5]/50">
              {SITE.businessType} in {SITE.city}, {SITE.state}. Hand-picked, one-of-one pre-loved menswear — quality checked before it goes on the rack.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={waLink("Hi Elevate X Thrift! I'd like to know more about your pieces.")} target="_blank" rel="noreferrer" className="btn btn-ghost px-4 py-2 text-xs">
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </a>
              <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="btn btn-ghost px-4 py-2 text-xs">
                <IconInstagram className="h-4 w-4" /> Instagram
              </a>
              <a href={SITE.emailHref} className="btn btn-ghost px-4 py-2 text-xs">
                <IconMail className="h-4 w-4" /> Email
              </a>
            </div>
          </div>

          {/* Shop */}
          <nav aria-label="Shop categories">
            <p className="eyebrow mb-3 text-[#EDE5D5]/40">Shop</p>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop" className="text-[#EDE5D5]/65 hover:text-[#EDE5D5]">All products</a></li>
              <li><a href="/shop?new=1" className="text-[#EDE5D5]/65 hover:text-[#EDE5D5]">New arrivals</a></li>
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <a href={`/shop?category=${encodeURIComponent(c)}`} className="text-[#EDE5D5]/65 hover:text-[#EDE5D5]">{c}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info */}
          <div>
            <p className="eyebrow mb-3 text-[#EDE5D5]/40">Visit &amp; contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-[#EDE5D5]/65 hover:text-[#EDE5D5]">
                  <IconWhatsApp className="mt-0.5 h-4 w-4 shrink-0" /> {SITE.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-[#EDE5D5]/65 hover:text-[#EDE5D5]">
                  <IconInstagram className="mt-0.5 h-4 w-4 shrink-0" /> {SITE.instagramHandle}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="flex items-start gap-2 break-all text-[#EDE5D5]/65 hover:text-[#EDE5D5]">
                  <IconMail className="mt-0.5 h-4 w-4 shrink-0" /> {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#EDE5D5]/65">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0" /> {SITE.location}
              </li>
            </ul>
            <ul className="mt-5 space-y-2 text-sm">
              <li><a href="/about" className="text-[#EDE5D5]/65 hover:text-[#EDE5D5]">About us</a></li>
              <li>
                <button onClick={() => navigate("/contact")} className="text-left text-[#EDE5D5]/65 hover:text-[#EDE5D5]">
                  Contact &amp; delivery info
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#EDE5D5]/10 pt-6 text-xs text-[#EDE5D5]/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.brandName}. All pieces are pre-loved and quality checked.</p>
          <p className="sm:text-right">Men's thrift only · Shipping across India · Prices in INR</p>
        </div>
      </div>
    </footer>
  );
}
