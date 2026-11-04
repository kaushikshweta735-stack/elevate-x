/**
 * Single source of truth for Elevate Thrift business information.
 * When migrating to Shopify, map these values to Shop settings
 * (Settings → Store details / Social links) and theme settings.
 */
export const SITE = {
  brandName: "ELEVATE THRIFT",
  brandShort: "ELEVATE",
  tagline: "Buy. Wear. Repeat.",
  businessType: "Men's Thrift Fashion Store",
  location: "Panipat, Haryana, India",
  city: "Panipat",
  state: "Haryana",
  country: "India",
  email: "kartiktyagi970@gmail.com",
  emailHref: "mailto:kartiktyagi970@gmail.com",
  instagramHandle: "@elevatex_thrift108",
  instagramUrl: "https://www.instagram.com/elevatex_thrift108/",
  /** WhatsApp number in international format, digits only (91 = India). Used for order messages. */
  whatsapp: "918571064108",
  /** How the number is displayed on the site. */
  whatsappDisplay: "+91 85710 64108",
} as const;
