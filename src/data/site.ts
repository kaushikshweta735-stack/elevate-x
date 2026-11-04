/**
 * Single source of truth for Elevate X Thrift business information.
 * Anything customer-facing that isn't stock data belongs here.
 */
export const SITE = {
  brandName: "ELEVATE X THRIFT",
  brandShort: "ELEVATE",
  brandLockup: { first: "ELEVATE", cross: "x", last: "THRIFT" },
  tagline: "Buy • Wear • Repeat",
  businessType: "Men's Thrift Fashion Store",
  shortDescription:
    "A men's thrift store in Panipat, Haryana — vintage, streetwear, denim, shirts, tees, jackets, trousers and accessories.",
  location: "Panipat, Haryana, India",
  city: "Panipat",
  state: "Haryana",
  country: "India",
  email: "kartiktyagi970@gmail.com",
  emailHref: "mailto:kartiktyagi970@gmail.com",
  instagramHandle: "@elevatex_thrift108",
  instagramUrl: "https://www.instagram.com/elevatex_thrift108/",
  /** WhatsApp number in international format, digits only (91 = India). */
  whatsapp: "918571064108",
  /** How the number is displayed on the site. */
  whatsappDisplay: "+91 85710 64108",
  /** Canonical public URL — used for SEO tags. */
  url: "https://elevatexthrift.vercel.app",
} as const;

export const waLink = (message?: string) =>
  `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
