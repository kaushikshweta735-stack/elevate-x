/**
 * Product catalogue.
 *
 * Images: drop photos into `public/products/` and list them in `images`.
 *   - first image = card thumbnail / primary
 *   - add as many as you like; the product page shows them all in a gallery
 *   - recommended: 4:5 portrait, ~1200px wide, consistently framed
 *   - `kind` marks what the photo shows so the gallery can label it honestly
 *
 * Anything unverified stays absent — measurements, fabric, MRP, stock levels.
 * The UI hides fields that are not set rather than inventing them.
 */

export const CATEGORIES = [
  "Vintage",
  "Streetwear",
  "Denim",
  "Shirts",
  "T-shirts",
  "Jackets",
  "Trousers",
  "Accessories",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategoryFilter = "All" | Category;

export type Garment = "jacket" | "tee" | "jeans" | "hoodie" | "bag" | "shirt" | "trousers";

export type ImageKind = "front" | "back" | "detail" | "fabric" | "label";

export interface ProductImage {
  src: string;
  kind: ImageKind;
  alt?: string;
}

export type Availability = "in-stock" | "reserved" | "sold";

export interface Product {
  /** URL-safe id, also used as the cart line key. */
  slug: string;
  name: string;
  category: Category;
  /** Selling price in ₹. */
  price: number;
  /** Original / MRP price — ONLY set when genuinely known, otherwise omit. */
  mrp?: number;
  /** Size as labelled on the garment, e.g. "M", "32", "Free". */
  size: string;
  condition: "Excellent" | "Like New" | "Good" | "Vintage";
  era: string;
  availability: Availability;
  /** Garment photography, first = primary. Empty = illustration fallback. */
  images: ProductImage[];
  /** Only set when known — inches, taken flat. */
  measurements?: { label: string; value: string }[];
  fabric?: string;
  /** Honest list of flaws. Empty = none worth noting. */
  flaws?: string[];
  description?: string;
  /** Illustration fallback + card tint (used until real photos are added). */
  garment: Garment;
  bg: string;
  ink: string;
  accent: string;
  tag?: string;
  /** Set for pieces added in the last 14 days. */
  addedAt?: string;
}

/** Date used for "New Arrivals" when a product has no `addedAt`. */
const NEW_ARRIVAL_WINDOW_DAYS = 14;

const BASE_PRODUCTS: Product[] = [
  {
    slug: "sunset-denim-jacket",
    name: "Sunset Denim Jacket",
    category: "Denim",
    price: 1299,
    mrp: 3499,
    size: "M",
    condition: "Excellent",
    era: "90s",
    availability: "in-stock",
    images: [],
    garment: "jacket",
    bg: "#FFE8D6",
    ink: "#2F5D8A",
    accent: "#FF6B35",
    tag: "Bestseller",
  },
  {
    slug: "retro-graphic-tee",
    name: "Retro Graphic Tee",
    category: "T-shirts",
    price: 549,
    mrp: 1499,
    size: "L",
    condition: "Good",
    era: "Y2K",
    availability: "in-stock",
    images: [],
    garment: "tee",
    bg: "#E4F0D0",
    ink: "#F4F1DE",
    accent: "#E07A5F",
    tag: "1 of 1",
  },
  {
    slug: "corduroy-overshirt",
    name: "Corduroy Overshirt",
    category: "Shirts",
    price: 999,
    mrp: 2799,
    size: "M",
    condition: "Like New",
    era: "80s",
    availability: "in-stock",
    images: [],
    garment: "shirt",
    bg: "#FDE2E4",
    ink: "#8A5A44",
    accent: "#FFC94D",
    tag: "Rare find",
  },
  {
    slug: "classic-straight-jeans",
    name: "Classic Straight Jeans",
    category: "Denim",
    price: 899,
    mrp: 2299,
    size: "32",
    condition: "Excellent",
    era: "90s",
    availability: "in-stock",
    images: [],
    garment: "jeans",
    bg: "#DDE8F5",
    ink: "#33526E",
    accent: "#F2CC8F",
  },
  {
    slug: "oversized-hoodie",
    name: "Oversized Hoodie",
    category: "Streetwear",
    price: 799,
    mrp: 1999,
    size: "XL",
    condition: "Like New",
    era: "Y2K",
    availability: "in-stock",
    images: [],
    garment: "hoodie",
    bg: "#E8E0F5",
    ink: "#6C5B9E",
    accent: "#E02330",
    tag: "Trending",
  },
  {
    slug: "canvas-crossbody-bag",
    name: "Canvas Crossbody Bag",
    category: "Accessories",
    price: 349,
    mrp: 999,
    size: "Free",
    condition: "Excellent",
    era: "Modern",
    availability: "in-stock",
    images: [],
    garment: "bag",
    bg: "#FFF3C9",
    ink: "#E9C46A",
    accent: "#2A9D8F",
  },
  {
    slug: "plaid-flannel-shirt",
    name: "Plaid Flannel Shirt",
    category: "Vintage",
    price: 699,
    mrp: 1799,
    size: "M",
    condition: "Good",
    era: "90s",
    availability: "in-stock",
    images: [],
    garment: "shirt",
    bg: "#F5DFC9",
    ink: "#A44A3F",
    accent: "#3D405B",
  },
  {
    slug: "baggy-cargo-jeans",
    name: "Baggy Cargo Jeans",
    category: "Denim",
    price: 949,
    mrp: 2499,
    size: "32",
    condition: "Like New",
    era: "Y2K",
    availability: "in-stock",
    images: [],
    garment: "jeans",
    bg: "#D8F3DC",
    ink: "#5F7161",
    accent: "#40916C",
  },
  {
    slug: "vintage-bomber-jacket",
    name: "Vintage Bomber Jacket",
    category: "Jackets",
    price: 1599,
    mrp: 4999,
    size: "L",
    condition: "Excellent",
    era: "80s",
    availability: "in-stock",
    images: [],
    garment: "jacket",
    bg: "#FFE5EC",
    ink: "#5A4A3A",
    accent: "#FF8FA3",
    tag: "Premium",
  },
  {
    slug: "tie-dye-street-tee",
    name: "Tie-Dye Street Tee",
    category: "T-shirts",
    price: 599,
    mrp: 1399,
    size: "M",
    condition: "Good",
    era: "Y2K",
    availability: "in-stock",
    images: [],
    garment: "tee",
    bg: "#CFF4FC",
    ink: "#7FB3D5",
    accent: "#F15BB5",
  },
  {
    slug: "relaxed-fit-jeans",
    name: "Relaxed Fit Jeans",
    category: "Trousers",
    price: 849,
    mrp: 2199,
    size: "30",
    condition: "Excellent",
    era: "90s",
    availability: "in-stock",
    images: [],
    garment: "jeans",
    bg: "#FFF0E6",
    ink: "#5B7FA6",
    accent: "#FF6B35",
  },
  {
    slug: "checked-casual-shirt",
    name: "Checked Casual Shirt",
    category: "Shirts",
    price: 749,
    mrp: 1899,
    size: "L",
    condition: "Like New",
    era: "70s",
    availability: "in-stock",
    images: [],
    garment: "shirt",
    bg: "#FEF3D8",
    ink: "#D97B3F",
    accent: "#606C38",
    tag: "Rare find",
  },
];

/**
 * DEMO PHOTOGRAPHY — development aid only.
 *
 * Served by the Vite dev server (see `demoPhotos()` in vite.config.ts) and
 * compiled out of production builds. Never real Elevate X Thrift stock: the
 * placeholders say so in the image itself. Real photos go in `public/products/`
 * and are listed in each product's `images`.
 */
const DEMO_PHOTOS: ProductImage[] = import.meta.env.DEV
  ? [
      { src: "/products/demo-front.svg", kind: "front", alt: "Front view (demo placeholder, not real stock)" },
      { src: "/products/demo-back.svg", kind: "back", alt: "Back view (demo placeholder, not real stock)" },
      { src: "/products/demo-detail.svg", kind: "detail", alt: "Detail close-up (demo placeholder, not real stock)" },
      { src: "/products/demo-fabric.svg", kind: "fabric", alt: "Fabric close-up (demo placeholder, not real stock)" },
    ]
  : [];

export const PRODUCTS: Product[] = BASE_PRODUCTS.map((p, i) => ({
  ...p,
  // demo gallery on the first few products so the gallery UI is visible in dev
  images: i < 4 ? DEMO_PHOTOS : p.images,
}));

export const PRODUCT_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export const isAvailable = (p: Product) => p.availability === "in-stock";

/** Genuine discount only — computed from a real MRP, never invented. */
export function discountPercent(p: Product): number | null {
  if (!p.mrp || p.mrp <= p.price) return null;
  return Math.round((1 - p.price / p.mrp) * 100);
}

export function isNewArrival(p: Product, now = new Date()): boolean {
  if (!p.addedAt) return false;
  const added = new Date(p.addedAt).getTime();
  if (Number.isNaN(added)) return false;
  return now.getTime() - added <= NEW_ARRIVAL_WINDOW_DAYS * 24 * 60 * 60 * 1000;
}

/** Products that actually have photography — used for editorial sections. */
export const hasPhotos = (p: Product) => p.images.length > 0;
