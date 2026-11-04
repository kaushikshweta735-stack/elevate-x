import { SITE } from "../data/site";
import SiteMark from "../components/SiteMark";
import { IconCheck, IconWhatsApp } from "../components/ui";

export default function About({ navigate }: { navigate: (to: string) => void }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16">
      <header className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <SiteMark className="h-20 w-20 rounded-full ring-1 ring-[#EDE5D5]/20" />
        <div>
          <p className="eyebrow text-[#D81F2A]">About us</p>
          <h1 className="display-lg mt-1 text-4xl sm:text-5xl">Elevate <span className="font-script text-3xl text-[#D81F2A]">x</span> Thrift</h1>
          <p className="mt-1 text-sm font-semibold tracking-[0.2em] text-[#EDE5D5]/40 uppercase">{SITE.tagline}</p>
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5 text-[15px] leading-relaxed text-[#EDE5D5]/70">
          <p>
            Elevate X Thrift is a men's thrift store in {SITE.city}, {SITE.state}. We sell pre-loved menswear —
            vintage, streetwear, denim, shirts, tees, jackets, trousers and accessories — one piece at a time.
          </p>
          <p>
            The idea is simple. Good clothing shouldn't be disposable. There is already more than enough well-made
            menswear in the world; it usually just needs to find the right person. So instead of adding to the pile,
            we find good pieces, check them properly, photograph them honestly and pass them on at a price that
            makes sense.
          </p>
          <p>
            Everything here is single-piece stock. No sizes to restock, no colour options, no waiting for a
            re-delivery — what you see is what exists. When a piece sells, it's gone for good.
          </p>
          <p>
            We're a small, in-person operation. That means we can tell you the actual measurements of a jacket,
            point out a small mark on the cuff, or hold a piece for you while you decide. Message us on WhatsApp
            and you're talking to the shop, not a support queue.
          </p>

          <h2 className="font-display pt-2 text-2xl font-extrabold uppercase">What we look for</h2>
          <ul className="space-y-2.5">
            {[
              "Pieces with real character — vintage cuts, honest fade, good labels.",
              "Fabric and construction that hold up, not fast-fashion throwaways.",
              "Anything we'd wear ourselves, priced so it actually sells.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <IconCheck className="mt-1 h-4 w-4 shrink-0 text-[#D81F2A]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-display pt-2 text-2xl font-extrabold uppercase">How it works</h2>
          <ol className="space-y-3">
            {[
              ["Browse the rack", "Every listing is a single piece with its true size, condition and — where we've measured it — exact measurements."],
              ["Add to bag", "Pick what you want and head to checkout. We ask for your delivery details once, then keep them for next time."],
              ["Confirm on WhatsApp", "Your order is sent to us as a WhatsApp message with everything we need. We reply to confirm stock, delivery cost and payment."],
              ["It arrives, you wear it", "Ships across India. If something isn't right, talk to us — we'd rather sort it out than lose a customer."],
            ].map(([title, body], i) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#EDE5D5]/20 text-[11px] font-bold text-[#EDE5D5]/70">{i + 1}</span>
                <div>
                  <p className="font-bold text-[#EDE5D5]">{title}</p>
                  <p className="text-sm text-[#EDE5D5]/55">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5">
            <p className="eyebrow text-[#EDE5D5]/40">The shop</p>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div><dt className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Business</dt><dd className="font-semibold">{SITE.businessType}</dd></div>
              <div><dt className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Location</dt><dd className="font-semibold">{SITE.location}</dd></div>
              <div><dt className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">WhatsApp</dt><dd><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2 hover:text-white">{SITE.whatsappDisplay}</a></dd></div>
              <div><dt className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Instagram</dt><dd><a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2 hover:text-white">{SITE.instagramHandle}</a></dd></div>
              <div><dt className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Email</dt><dd><a href={SITE.emailHref} className="font-semibold break-all underline underline-offset-2 hover:text-white">{SITE.email}</a></dd></div>
            </dl>
          </div>

          <div className="space-y-2">
            <button onClick={() => navigate("/shop")} className="btn btn-cream w-full py-3 text-sm">Shop the rack</button>
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-ghost w-full py-3 text-sm">
              <IconWhatsApp className="h-4 w-4" /> Ask us anything
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
