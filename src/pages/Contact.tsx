import { SITE } from "../data/site";
import { IconInstagram, IconMail, IconPin, IconWhatsApp } from "../components/ui";

export default function Contact() {
  const cards = [
    {
      icon: <IconWhatsApp className="h-5 w-5" />,
      label: "WhatsApp",
      value: SITE.whatsappDisplay,
      hint: "Fastest for stock, sizes and delivery questions",
      href: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Elevate X Thrift! I have a question about a piece on your site.")}`,
      external: true,
    },
    {
      icon: <IconInstagram className="h-5 w-5" />,
      label: "Instagram",
      value: SITE.instagramHandle,
      hint: "New drops, reels and stock updates",
      href: SITE.instagramUrl,
      external: true,
    },
    {
      icon: <IconMail className="h-5 w-5" />,
      label: "Email",
      value: SITE.email,
      hint: "Orders, bulk enquiries and partnerships",
      href: SITE.emailHref,
      external: false,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16">
      <p className="eyebrow text-[#D81F2A]">Contact</p>
      <h1 className="display-lg mt-1 text-4xl sm:text-5xl">Talk to the shop</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#EDE5D5]/55">
        We're a small operation based in {SITE.city}, {SITE.state}. WhatsApp is the quickest way to reach us —
        we usually reply within a few hours during shop hours.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noreferrer" : undefined}
            className="group rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5 transition hover:border-[#EDE5D5]/28 hover:bg-white/[0.04]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EDE5D5]/15 bg-white/[0.03] text-[#EDE5D5]/75 transition group-hover:text-white">
              {c.icon}
            </span>
            <p className="mt-3 text-[11px] font-bold tracking-[0.16em] text-[#EDE5D5]/40 uppercase">{c.label}</p>
            <p className="mt-0.5 text-sm font-bold break-all text-[#EDE5D5]">{c.value}</p>
            <p className="mt-1 text-xs text-[#EDE5D5]/45">{c.hint}</p>
          </a>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 text-[#EDE5D5]/75"><IconPin className="h-5 w-5" /><p className="text-[11px] font-bold tracking-[0.16em] uppercase">Location</p></div>
          <p className="mt-2 text-sm font-bold">{SITE.location}</p>
          <p className="mt-1 text-xs text-[#EDE5D5]/45">
            We trade online and in person by appointment. Message us before visiting.
          </p>
        </div>
        <div className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5">
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#EDE5D5]/40 uppercase">Business</p>
          <p className="mt-2 text-sm font-bold">{SITE.brandName}</p>
          <p className="text-xs text-[#EDE5D5]/45">{SITE.businessType}</p>
          <p className="mt-3 text-[11px] font-bold tracking-[0.16em] text-[#EDE5D5]/40 uppercase">Slogan</p>
          <p className="text-sm font-semibold text-[#EDE5D5]/80">{SITE.tagline}</p>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-[#EDE5D5]/12 bg-[#0d0b0f] p-6 sm:p-8">
        <h2 className="font-display text-2xl font-extrabold uppercase">Ordering &amp; delivery</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-bold text-[#EDE5D5]">How ordering works</dt>
            <dd className="mt-1 leading-relaxed text-[#EDE5D5]/55">
              Add pieces to your bag, enter your delivery details at checkout and confirm. Your order reaches us on
              WhatsApp, where we confirm the piece is still available, quote delivery and share payment details.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-[#EDE5D5]">Delivery</dt>
            <dd className="mt-1 leading-relaxed text-[#EDE5D5]/55">
              We ship across India. Delivery cost depends on your PIN code and is confirmed before you pay — it is
              never charged up front on this site.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-[#EDE5D5]">Payment</dt>
            <dd className="mt-1 leading-relaxed text-[#EDE5D5]/55">
              No card details are collected here. Once your order is confirmed we share a UPI / bank payment link.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-[#EDE5D5]">Single-piece stock</dt>
            <dd className="mt-1 leading-relaxed text-[#EDE5D5]/55">
              Every listing is one physical piece. Sizes and measurements are of that exact garment — there are no
              other sizes, colours or restocks.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
