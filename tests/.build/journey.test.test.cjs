"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/data/shop.ts
var DELIVERY, CONDITIONS, CONDITION_GUIDE, INDIAN_STATES;
var init_shop = __esm({
  "src/data/shop.ts"() {
    "use strict";
    DELIVERY = {
      /** Flat delivery charge in ₹. `null` = confirmed on WhatsApp. */
      deliveryCharge: null,
      /** Order value above which delivery is free (₹). `null` = not offered. */
      freeDeliveryAbove: null,
      /** Shown next to the delivery line. */
      note: "Delivery is calculated by PIN code and confirmed on WhatsApp before payment."
    };
    CONDITIONS = ["Excellent", "Like New", "Good", "Vintage"];
    CONDITION_GUIDE = [
      { label: "Like New", copy: "No visible wear. Looks unworn, may be without tags." },
      { label: "Excellent", copy: "Minor signs of wear that are not noticeable when worn." },
      { label: "Good", copy: "Honest wear \u2014 fading, small marks or repairs, all listed on the product page." },
      { label: "Vintage", copy: "Genuinely old piece with the character, fade and quirks that come with age." }
    ];
    INDIAN_STATES = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra & Nagar Haveli and Daman & Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu & Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal"
    ];
  }
});

// src/lib/format.ts
var inr, cx;
var init_format = __esm({
  "src/lib/format.ts"() {
    "use strict";
    inr = (n) => "\u20B9" + n.toLocaleString("en-IN");
    cx = (...parts) => parts.filter(Boolean).join(" ");
  }
});

// src/data/products.ts
var products_exports = {};
__export(products_exports, {
  CATEGORIES: () => CATEGORIES,
  PRODUCTS: () => PRODUCTS,
  PRODUCT_BY_SLUG: () => PRODUCT_BY_SLUG,
  discountPercent: () => discountPercent,
  hasPhotos: () => hasPhotos,
  isAvailable: () => isAvailable,
  isNewArrival: () => isNewArrival
});
function discountPercent(p) {
  if (!p.mrp || p.mrp <= p.price) return null;
  return Math.round((1 - p.price / p.mrp) * 100);
}
function isNewArrival(p, now = /* @__PURE__ */ new Date()) {
  if (!p.addedAt) return false;
  const added = new Date(p.addedAt).getTime();
  if (Number.isNaN(added)) return false;
  return now.getTime() - added <= NEW_ARRIVAL_WINDOW_DAYS * 24 * 60 * 60 * 1e3;
}
var CATEGORIES, NEW_ARRIVAL_WINDOW_DAYS, BASE_PRODUCTS, DEMO_PHOTOS, PRODUCTS, PRODUCT_BY_SLUG, isAvailable, hasPhotos;
var init_products = __esm({
  "src/data/products.ts"() {
    "use strict";
    CATEGORIES = [
      "Vintage",
      "Streetwear",
      "Denim",
      "Shirts",
      "T-shirts",
      "Jackets",
      "Trousers",
      "Accessories"
    ];
    NEW_ARRIVAL_WINDOW_DAYS = 14;
    BASE_PRODUCTS = [
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
        tag: "Bestseller"
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
        tag: "1 of 1"
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
        tag: "Rare find"
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
        accent: "#F2CC8F"
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
        tag: "Trending"
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
        accent: "#2A9D8F"
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
        accent: "#3D405B"
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
        accent: "#40916C"
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
        tag: "Premium"
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
        accent: "#F15BB5"
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
        accent: "#FF6B35"
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
        tag: "Rare find"
      }
    ];
    DEMO_PHOTOS = false ? [
      { src: "/products/demo-front.svg", kind: "front", alt: "Front view (demo placeholder, not real stock)" },
      { src: "/products/demo-back.svg", kind: "back", alt: "Back view (demo placeholder, not real stock)" },
      { src: "/products/demo-detail.svg", kind: "detail", alt: "Detail close-up (demo placeholder, not real stock)" },
      { src: "/products/demo-fabric.svg", kind: "fabric", alt: "Fabric close-up (demo placeholder, not real stock)" }
    ] : [];
    PRODUCTS = BASE_PRODUCTS.map((p, i) => ({
      ...p,
      // demo gallery on the first few products so the gallery UI is visible in dev
      images: i < 4 ? DEMO_PHOTOS : p.images
    }));
    PRODUCT_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));
    isAvailable = (p) => p.availability === "in-stock";
    hasPhotos = (p) => p.images.length > 0;
  }
});

// src/lib/cms.ts
function normaliseProduct(raw) {
  if (!raw?.name || !raw?.slug) return null;
  const category = CATEGORIES.includes(raw.category ?? "") ? raw.category : "Vintage";
  const condition = CONDITIONS2.includes(raw.condition ?? "") ? raw.condition : "Good";
  const images = (raw.images ?? []).filter((i) => Boolean(i?.src)).map((i) => ({
    src: i.src,
    kind: KINDS.includes(i.kind ?? "") ? i.kind : "front",
    alt: i.alt
  }));
  return {
    slug: raw.slug,
    name: raw.name,
    category,
    price: Number(raw.price) || 0,
    mrp: raw.mrp ? Number(raw.mrp) : void 0,
    size: raw.size ?? "\u2014",
    condition,
    era: raw.era ?? "",
    availability: AVAILABILITY.includes(raw.availability) ? raw.availability : "in-stock",
    images,
    measurements: (raw.measurements ?? []).filter((m) => m?.label && m?.value).map((m) => ({ label: m.label, value: m.value })),
    fabric: raw.fabric,
    flaws: raw.flaws,
    description: raw.description,
    tag: raw.tag,
    addedAt: raw.addedAt,
    // illustration fallback styling (only used if the piece has no photo)
    garment: "shirt",
    bg: "#E9DFCE",
    ink: "#3a2c28",
    accent: "#D81F2A"
  };
}
function useCatalogue() {
  const [state, setState] = (0, import_react.useState)(
    () => cmsEnabled() ? { ...builtIn(), status: "loading" } : builtIn()
  );
  (0, import_react.useEffect)(() => {
    if (!cmsEnabled()) return;
    let cancelled = false;
    const cacheKey = "elevate.catalogue.v1";
    try {
      const cached = window.localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setState({
            products: parsed,
            bySlug: new Map(parsed.map((p) => [p.slug, p])),
            source: "cms",
            status: "ready"
          });
        }
      }
    } catch {
    }
    const url = `https://${SANITY.projectId}.apicdn.sanity.io/v${SANITY.apiVersion}/data/query/${SANITY.dataset}?query=${encodeURIComponent(QUERY)}`;
    fetch(url).then((r) => {
      if (!r.ok) throw new Error(`CMS responded ${r.status}`);
      return r.json();
    }).then((json) => {
      if (cancelled) return;
      const products = (json.result ?? []).map(normaliseProduct).filter(Boolean);
      if (products.length === 0) {
        setState({ ...builtIn(), error: "The CMS has no published products yet." });
        return;
      }
      setState({
        products,
        bySlug: new Map(products.map((p) => [p.slug, p])),
        source: "cms",
        status: "ready"
      });
      try {
        window.localStorage.setItem(cacheKey, JSON.stringify(products));
      } catch {
      }
    }).catch((err) => {
      if (cancelled) return;
      setState((prev) => ({
        ...prev,
        status: "ready",
        error: prev.source === "cms" ? void 0 : `CMS unavailable (${err.message}); showing the built-in catalogue.`
      }));
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}
var import_react, SANITY, cmsEnabled, QUERY, KINDS, CONDITIONS2, AVAILABILITY, builtIn;
var init_cms = __esm({
  "src/lib/cms.ts"() {
    "use strict";
    import_react = require("react");
    init_products();
    SANITY = {
      projectId: "",
      dataset: "production",
      apiVersion: "2024-10-01"
    };
    cmsEnabled = () => SANITY.projectId.length > 0;
    QUERY = `*[_type == "product" && !(_id in path("drafts.**"))] | order(order asc, _createdAt desc) {
  "slug": slug.current,
  name,
  category,
  price,
  mrp,
  size,
  condition,
  era,
  availability,
  description,
  fabric,
  flaws,
  measurements[]{label, value},
  tag,
  addedAt,
  "images": images[]{ "src": asset->url, kind, alt }
}`;
    KINDS = ["front", "back", "detail", "fabric", "label"];
    CONDITIONS2 = ["Excellent", "Like New", "Good", "Vintage"];
    AVAILABILITY = ["in-stock", "reserved", "sold"];
    builtIn = () => ({
      products: PRODUCTS,
      bySlug: new Map(PRODUCTS.map((p) => [p.slug, p])),
      source: "built-in",
      status: "ready"
    });
  }
});

// src/store/shop.tsx
function reducer(state, action) {
  switch (action.type) {
    case "hydrate":
      return { ...state, ...action.state, hydrated: true };
    case "add": {
      const id = lineId(action.slug, action.size);
      const existing = state.lines.find((l) => l.id === id);
      const qty = action.qty ?? 1;
      if (existing) {
        return {
          ...state,
          lines: state.lines.map(
            (l) => l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l
          )
        };
      }
      return { ...state, lines: [...state.lines, { id, slug: action.slug, size: action.size, qty: Math.min(MAX_QTY, qty) }] };
    }
    case "qty": {
      if (action.qty <= 0) return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
      return {
        ...state,
        lines: state.lines.map(
          (l) => l.id === action.id ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l
        )
      };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
    case "clear":
      return { ...state, lines: [] };
    case "prune": {
      const valid = new Set(action.validSlugs);
      const sold = new Set(action.soldSlugs);
      const lines = state.lines.filter((l) => valid.has(l.slug) && !sold.has(l.slug));
      const saved = state.saved.filter((s) => valid.has(s));
      if (lines.length === state.lines.length && saved.length === state.saved.length) return state;
      return { ...state, lines, saved };
    }
    case "wishlist": {
      const has = state.saved.includes(action.slug);
      return {
        ...state,
        saved: has ? state.saved.filter((s) => s !== action.slug) : [...state.saved, action.slug]
      };
    }
    default:
      return state;
  }
}
function readStored() {
  if (typeof window === "undefined") return {};
  try {
    const rawCart = window.localStorage.getItem(CART_KEY);
    const rawSaved = window.localStorage.getItem(SAVED_KEY);
    const lines = rawCart ? JSON.parse(rawCart) : [];
    const saved = rawSaved ? JSON.parse(rawSaved) : [];
    return {
      // structure is validated here; existence/sold-out is reconciled once the
      // catalogue has loaded (see the `prune` effect in ShopProvider)
      lines: Array.isArray(lines) ? lines.filter((l) => l && typeof l.slug === "string" && typeof l.size === "string").filter((l) => Number.isFinite(l.qty) && l.qty > 0).map((l) => ({ ...l, id: lineId(l.slug, l.size), qty: Math.min(MAX_QTY, Math.round(l.qty)) })) : [],
      saved: Array.isArray(saved) ? saved.filter((s) => typeof s === "string") : []
    };
  } catch {
    return {};
  }
}
function ShopProvider({ children }) {
  const catalogue = useCatalogue();
  const [state, dispatch] = (0, import_react2.useReducer)(reducer, { lines: [], saved: [], hydrated: false });
  const [toast, setToast] = (0, import_react2.useState)("");
  const [details, setDetailsState] = (0, import_react2.useState)(EMPTY_DETAILS);
  const toastTimer = (0, import_react2.useRef)(void 0);
  (0, import_react2.useEffect)(() => {
    dispatch({ type: "hydrate", state: readStored() });
    try {
      const raw = window.localStorage.getItem(DETAILS_KEY);
      if (raw) setDetailsState({ ...EMPTY_DETAILS, ...JSON.parse(raw) });
    } catch {
    }
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(state.lines));
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(state.saved));
    } catch {
    }
  }, [state.lines, state.saved, state.hydrated]);
  const setDetails = (0, import_react2.useCallback)((d) => {
    setDetailsState(d);
    try {
      window.localStorage.setItem(DETAILS_KEY, JSON.stringify(d));
    } catch {
    }
  }, []);
  const notify = (0, import_react2.useCallback)((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2600);
  }, []);
  const addToBag = (0, import_react2.useCallback)((p, opts) => {
    const size = opts?.size ?? p.size;
    dispatch({ type: "add", slug: p.slug, size, qty: opts?.qty });
    if (!opts?.silent) notify(`${p.name} added to bag`);
  }, [notify]);
  (0, import_react2.useEffect)(() => {
    if (!state.hydrated || catalogue.status !== "ready") return;
    dispatch({
      type: "prune",
      validSlugs: catalogue.products.map((p) => p.slug),
      soldSlugs: catalogue.products.filter((p) => p.availability === "sold").map((p) => p.slug)
    });
  }, [state.hydrated, catalogue.status, catalogue.products]);
  const lines = (0, import_react2.useMemo)(
    () => state.lines.flatMap((l) => {
      const product = catalogue.bySlug.get(l.slug);
      if (!product) return [];
      return [{ ...l, product, lineTotal: product.price * l.qty }];
    }),
    [state.lines, catalogue.bySlug]
  );
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const deliveryCharge = (0, import_react2.useMemo)(() => {
    if (lines.length === 0) return 0;
    const { deliveryCharge: flat, freeDeliveryAbove } = DELIVERY;
    if (freeDeliveryAbove !== null && subtotal >= freeDeliveryAbove) return 0;
    return flat;
  }, [lines.length, subtotal]);
  const total = deliveryCharge === null ? null : subtotal + deliveryCharge;
  const value = {
    products: catalogue.products,
    bySlug: catalogue.bySlug,
    catalogueSource: catalogue.source,
    catalogueStatus: catalogue.status,
    catalogueError: catalogue.error,
    hydrated: state.hydrated,
    lines,
    count,
    subtotal,
    deliveryCharge,
    total,
    addToBag,
    setQty: (id, qty) => dispatch({ type: "qty", id, qty }),
    removeLine: (id) => dispatch({ type: "remove", id }),
    clearCart: () => dispatch({ type: "clear" }),
    saved: state.saved,
    toggleSaved: (slug) => dispatch({ type: "wishlist", slug }),
    isSaved: (slug) => state.saved.includes(slug),
    details,
    setDetails,
    toast,
    notify
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopContext.Provider, { value, children });
}
function useShop() {
  const ctx = (0, import_react2.useContext)(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
var import_react2, import_jsx_runtime, lineId, MAX_QTY, CART_KEY, SAVED_KEY, EMPTY_DETAILS, DETAILS_KEY, ShopContext;
var init_shop2 = __esm({
  "src/store/shop.tsx"() {
    "use strict";
    import_react2 = require("react");
    init_shop();
    init_cms();
    import_jsx_runtime = require("react/jsx-runtime");
    lineId = (slug, size) => `${slug}::${size}`;
    MAX_QTY = 5;
    CART_KEY = "elevate.cart.v1";
    SAVED_KEY = "elevate.wishlist.v1";
    EMPTY_DETAILS = {
      fullName: "",
      phone: "",
      email: "",
      house: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      pin: "",
      country: "India",
      notes: ""
    };
    DETAILS_KEY = "elevate.checkout.v1";
    ShopContext = (0, import_react2.createContext)(null);
  }
});

// src/components/GarmentArt.tsx
function GarmentArt({ garment, ink, accent }) {
  const common = { fill: ink, stroke: "#111", strokeWidth: 2, strokeLinejoin: "round" };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { viewBox: "0 0 200 200", className: "garment-art h-full w-full drop-shadow-[0_18px_20px_rgba(0,0,0,0.18)]", role: "img", "aria-label": garment, children: [
    garment === "jacket" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M70 30 L40 45 L28 95 L52 100 L52 170 L148 170 L148 100 L172 95 L160 45 L130 30 Q100 48 70 30Z", ...common }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M100 48 L100 170", stroke: accent, strokeWidth: "5" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "88", cy: "80", r: "4", fill: accent }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "88", cy: "105", r: "4", fill: accent }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M52 130 h34 M114 130 h34", stroke: "#111", strokeWidth: "3" })
    ] }),
    garment === "tee" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M70 35 L35 55 L50 90 L68 82 L68 168 L132 168 L132 82 L150 90 L165 55 L130 35 Q100 55 70 35Z", ...common }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "100", cy: "108", r: "24", fill: accent, stroke: "#111", strokeWidth: "2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: "100", y: "115", textAnchor: "middle", fontSize: "16", fontWeight: "800", fill: "#111", children: "X" })
    ] }),
    garment === "hoodie" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M100 22 Q65 22 62 55 L40 70 L32 115 L56 120 L56 172 L144 172 L144 120 L168 115 L160 70 L138 55 Q135 22 100 22Z", ...common }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M78 58 Q100 78 122 58", fill: "none", stroke: accent, strokeWidth: "5" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "78", y: "135", width: "44", height: "24", rx: "6", fill: accent, stroke: "#111", strokeWidth: "2" })
    ] }),
    garment === "jeans" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M62 28 L138 28 L146 172 L112 172 L100 78 L88 172 L54 172Z", ...common }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M62 48 h76 M75 28 v28 M125 28 v28", stroke: accent, strokeWidth: "4", fill: "none" })
    ] }),
    garment === "shirt" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M70 32 L38 50 L30 92 L54 98 L54 170 L146 170 L146 98 L170 92 L162 50 L130 32 Q100 50 70 32Z", ...common }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M70 70 h60 M70 105 h60 M70 140 h60 M85 32 v138 M115 32 v138", stroke: accent, strokeWidth: "3", opacity: ".7" })
    ] }),
    garment === "bag" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("g", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M55 72 L145 72 L138 172 L62 172Z", ...common }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M75 72 Q75 38 100 38 Q125 38 125 72", fill: "none", stroke: "#111", strokeWidth: "7" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "100", cy: "118", r: "20", fill: accent, stroke: "#111", strokeWidth: "2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: "100", y: "125", textAnchor: "middle", fontSize: "15", fontWeight: "800", fill: "#111", children: "EX" })
    ] })
  ] });
}
var import_jsx_runtime2;
var init_GarmentArt = __esm({
  "src/components/GarmentArt.tsx"() {
    "use strict";
    import_jsx_runtime2 = require("react/jsx-runtime");
  }
});

// src/components/ProductMedia.tsx
function ProductMedia({
  product,
  image,
  className,
  sizes = "(max-width: 640px) 50vw, 25vw",
  priority = false
}) {
  const [failed, setFailed] = (0, import_react3.useState)(false);
  const primary = image ?? product.images[0];
  const src = primary ? "/" + primary.src.replace(/^\//, "") : null;
  if (src && !failed) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "img",
      {
        src,
        alt: primary?.alt ?? product.name,
        loading: priority ? "eager" : "lazy",
        decoding: "async",
        sizes,
        onError: () => setFailed(true),
        className: cx("h-full w-full object-cover object-top", className)
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: cx("flex h-full w-full items-center justify-center p-4", className), style: { background: `linear-gradient(160deg, ${product.bg} 0%, #efe7d8 100%)` }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "h-full w-full", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(GarmentArt, { garment: product.garment, ink: product.ink, accent: product.accent }) }) });
}
function NoPhotoHint({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: cx("pointer-events-none absolute left-2.5 bottom-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-bold tracking-[0.1em] text-[#EDE5D5]/70 uppercase backdrop-blur", className), children: "Illustration" });
}
var import_react3, import_jsx_runtime3;
var init_ProductMedia = __esm({
  "src/components/ProductMedia.tsx"() {
    "use strict";
    import_react3 = require("react");
    init_GarmentArt();
    init_format();
    import_jsx_runtime3 = require("react/jsx-runtime");
  }
});

// src/components/ui.tsx
function Badge({ children, tone = "bone", className }) {
  const tones = {
    bone: "bg-[#EDE5D5]/12 text-[#EDE5D5] border-[#EDE5D5]/18",
    red: "bg-[#D81F2A] text-white border-transparent",
    muted: "bg-white/5 text-[#EDE5D5]/60 border-white/10"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: cx("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-[0.08em] uppercase", tones[tone], className), children });
}
function AvailabilityNote({ availability }) {
  const map = {
    "in-stock": { dot: "bg-[#57b26a]", label: "In stock" },
    reserved: { dot: "bg-[#d8a423]", label: "On hold" },
    sold: { dot: "bg-[#8b8380]", label: "Sold" }
  };
  const s = map[availability];
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-[#EDE5D5]/65", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: cx("h-1.5 w-1.5 rounded-full", s.dot), "aria-hidden": "true" }),
    s.label
  ] });
}
function Stepper({ qty, onChange, label, max = 5, disabled }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "inline-flex items-center rounded-full border border-[#EDE5D5]/18 bg-white/[0.04]", role: "group", "aria-label": `Quantity for ${label}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "button",
      {
        type: "button",
        onClick: () => onChange(qty - 1),
        disabled,
        "aria-label": `Decrease quantity of ${label}`,
        className: "flex h-8 w-8 items-center justify-center rounded-full text-base text-[#EDE5D5]/75 transition hover:bg-white/10 disabled:opacity-40",
        children: "\u2212"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "min-w-6 text-center text-sm font-bold tabular-nums", "aria-live": "polite", children: qty }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "button",
      {
        type: "button",
        onClick: () => onChange(qty + 1),
        disabled: disabled || qty >= max,
        "aria-label": `Increase quantity of ${label}`,
        className: "flex h-8 w-8 items-center justify-center rounded-full text-base text-[#EDE5D5]/75 transition hover:bg-white/10 disabled:opacity-40",
        children: "+"
      }
    )
  ] });
}
function Spinner({ className = "h-5 w-5" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { className: cx("animate-spin", className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeOpacity: "0.25", strokeWidth: "3" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M21 12a9 9 0 0 0-9-9", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round" })
  ] });
}
var import_jsx_runtime4, base, IconSearch, IconHeart, IconBag, IconClose, IconMenu, IconArrow, IconCheck, IconWhatsApp, IconInstagram, IconMail, IconPin, IconTruck;
var init_ui = __esm({
  "src/components/ui.tsx"() {
    "use strict";
    init_format();
    import_jsx_runtime4 = require("react/jsx-runtime");
    base = "h-5 w-5";
    IconSearch = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "11", cy: "11", r: "7" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m20 20-3.5-3.5", strokeLinecap: "round" })
    ] });
    IconHeart = ({ className = base, filled = false }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 24 24", fill: filled ? "currentColor" : "none", stroke: "currentColor", strokeWidth: "1.7", className, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 3.2C19.5 15.4 12 20 12 20Z", strokeLinejoin: "round" }) });
    IconBag = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M4.5 8h15l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.2a1.5 1.5 0 0 1-1.5-1.3L4.5 8Z", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8", strokeLinecap: "round" })
    ] });
    IconClose = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", className, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m6 6 12 12M18 6 6 18", strokeLinecap: "round" }) });
    IconMenu = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", className, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M4 7h16M4 12h16M4 17h16", strokeLinecap: "round" }) });
    IconArrow = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", className, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M5 12h14M13 6l6 6-6 6", strokeLinecap: "round", strokeLinejoin: "round" }) });
    IconCheck = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", className, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m5 12.5 4.5 4.5L19 7", strokeLinecap: "round", strokeLinejoin: "round" }) });
    IconWhatsApp = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.31-1.93 1.36-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.2-4.94-4.4-.14-.19-1.16-1.55-1.16-2.95s.73-2.09 1-2.38c.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z" }) });
    IconInstagram = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "3.5", y: "3.5", width: "17", height: "17", rx: "5" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "12", cy: "12", r: "4" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "17.2", cy: "6.8", r: "1", fill: "currentColor", stroke: "none" })
    ] });
    IconMail = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "3", y: "5.5", width: "18", height: "13", rx: "2.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m4 7 8 6 8-6", strokeLinecap: "round", strokeLinejoin: "round" })
    ] });
    IconPin = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 21s6.5-6.1 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 14.9 12 21 12 21Z", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "12", cy: "10.5", r: "2.4" })
    ] });
    IconTruck = ({ className = base }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", className, "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M2.5 7.5h10v9h-10zM12.5 11h4l3 3v2.5h-7z", strokeLinejoin: "round" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "6.5", cy: "18", r: "1.6" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "16.5", cy: "18", r: "1.6" })
    ] });
  }
});

// src/components/BagDrawer.tsx
function BagDrawer({
  open,
  onClose,
  navigate
}) {
  const { lines, count, subtotal, deliveryCharge, setQty, removeLine } = useShop();
  (0, import_react4.useEffect)(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "fixed inset-0 z-50", role: "dialog", "aria-modal": "true", "aria-label": "Shopping bag", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute inset-0 bg-black/65 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("aside", { className: "drawer-in absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-[#EDE5D5]/12 bg-[#0c0a0e] shadow-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("header", { className: "flex items-center justify-between border-b border-[#EDE5D5]/10 px-5 py-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconBag, { className: "h-5 w-5 text-[#EDE5D5]/60" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "font-display text-2xl font-extrabold tracking-wide uppercase", children: "Your bag" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "rounded-full bg-white/8 px-2 py-0.5 text-xs font-bold text-[#EDE5D5]/70", children: count })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { onClick: onClose, "aria-label": "Close bag", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-[#EDE5D5] transition hover:bg-white/15", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconClose, { className: "h-4 w-4" }) })
      ] }),
      lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-1 flex-col items-center justify-center px-6 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex h-16 w-16 items-center justify-center rounded-full border border-[#EDE5D5]/12 bg-white/[0.03]", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconBag, { className: "h-7 w-7 text-[#EDE5D5]/35" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mt-4 text-lg font-bold", children: "Your bag is empty" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mt-1 max-w-[16rem] text-sm text-[#EDE5D5]/50", children: "Every piece is one of one. When it sells, it's gone." }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            onClick: () => {
              onClose();
              navigate("/shop");
            },
            className: "btn btn-cream mt-6 px-6 py-3 text-sm",
            children: "Browse the rack"
          }
        )
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-1 overflow-y-auto px-5 py-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("ul", { className: "space-y-3", children: lines.map(({ id, product, size, qty, lineTotal }) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { className: "flex gap-3 rounded-xl border border-[#EDE5D5]/10 bg-white/[0.02] p-2.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                onClick: () => {
                  onClose();
                  navigate(`/product/${product.slug}`);
                },
                className: "product-frame w-20 shrink-0 overflow-hidden rounded-lg",
                "aria-label": `View ${product.name}`,
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ProductMedia, { product, sizes: "80px" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "truncate text-sm font-bold", children: product.name }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "button",
                  {
                    onClick: () => removeLine(id),
                    "aria-label": `Remove ${product.name} from bag`,
                    className: "shrink-0 text-[#EDE5D5]/40 transition hover:text-[#ff8b92]",
                    children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconClose, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "mt-0.5 text-[11px] font-semibold tracking-wide text-[#EDE5D5]/45 uppercase", children: [
                "Size ",
                size,
                " \xB7 ",
                product.condition
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mt-2 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Stepper, { qty, onChange: (q) => setQty(id, q), label: product.name }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-display text-lg font-extrabold", children: inr(lineTotal) })
              ] })
            ] })
          ] }, id)) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "a",
            {
              href: `/shop`,
              onClick: (e) => {
                e.preventDefault();
                onClose();
                navigate("/shop");
              },
              className: "mt-4 inline-block text-xs font-bold tracking-wide text-[#EDE5D5]/50 underline-offset-4 uppercase hover:text-[#EDE5D5] hover:underline",
              children: "Continue shopping"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("footer", { className: "border-t border-[#EDE5D5]/10 bg-[#0a090c] px-5 py-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-[#EDE5D5]/60", children: "Subtotal" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-display text-2xl font-extrabold", children: inr(subtotal) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mt-1 text-[11px] leading-relaxed text-[#EDE5D5]/40", children: deliveryCharge === null ? DELIVERY.note : deliveryCharge === 0 ? "Delivery free on this order." : `Delivery ${inr(deliveryCharge)} \u2014 confirmed at checkout.` }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              onClick: () => {
                onClose();
                navigate("/checkout");
              },
              className: "btn btn-primary mt-3 w-full py-3.5 text-sm",
              children: "Place order"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "a",
            {
              href: `https://wa.me/918571064108`,
              target: "_blank",
              rel: "noreferrer",
              className: "btn btn-ghost mt-2 w-full py-3 text-xs",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconWhatsApp, { className: "h-4 w-4" }),
                " Ask about your bag first"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
var import_react4, import_jsx_runtime5;
var init_BagDrawer = __esm({
  "src/components/BagDrawer.tsx"() {
    "use strict";
    import_react4 = require("react");
    init_shop();
    init_format();
    init_shop2();
    init_ProductMedia();
    init_ui();
    import_jsx_runtime5 = require("react/jsx-runtime");
  }
});

// src/data/site.ts
var SITE, waLink;
var init_site = __esm({
  "src/data/site.ts"() {
    "use strict";
    SITE = {
      brandName: "ELEVATE X THRIFT",
      brandShort: "ELEVATE",
      brandLockup: { first: "ELEVATE", cross: "x", last: "THRIFT" },
      tagline: "Buy \u2022 Wear \u2022 Repeat",
      businessType: "Men's Thrift Fashion Store",
      shortDescription: "A men's thrift store in Panipat, Haryana \u2014 vintage, streetwear, denim, shirts, tees, jackets, trousers and accessories.",
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
      url: "https://elevatexthrift.vercel.app"
    };
    waLink = (message) => `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  }
});

// src/components/SiteMark.tsx
function SiteMark({ className = "h-12 w-12" }) {
  const [failed, setFailed] = (0, import_react5.useState)(false);
  if (failed) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { viewBox: "0 0 64 64", className, "aria-label": "Elevate x Thrift", role: "img", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "32", cy: "32", r: "30", fill: "#0A0A0B", stroke: "#EDE5D5", strokeOpacity: ".5", strokeWidth: "1.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { cx: "32", cy: "32", r: "26", fill: "none", stroke: "#E02330", strokeWidth: "1.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M20 20h6l6 9 6-9h6l-9 12 9 12h-6l-6-9-6 9h-6l9-12z", fill: "#E02330" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("picture", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("source", { srcSet: `${"/"}crest-512.webp`, type: "image/webp" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "img",
      {
        src: `${"/"}crest-160.png`,
        alt: "Elevate x Thrift crest \u2014 Buy. Wear. Repeat.",
        width: 512,
        height: 512,
        onError: () => setFailed(true),
        className: `${className} object-contain`
      }
    )
  ] });
}
var import_react5, import_jsx_runtime6;
var init_SiteMark = __esm({
  "src/components/SiteMark.tsx"() {
    "use strict";
    import_react5 = require("react");
    import_jsx_runtime6 = require("react/jsx-runtime");
  }
});

// src/components/Footer.tsx
function Footer({ navigate }) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("footer", { className: "mt-20 border-t border-[#EDE5D5]/10 bg-[#0a080b]", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SiteMark, { className: "h-14 w-14 rounded-full ring-1 ring-[#EDE5D5]/20" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "font-display text-2xl font-extrabold tracking-wide uppercase", children: [
              "Elevate ",
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "font-script text-xl text-[#D81F2A]", children: "x" }),
              " Thrift"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-[10px] font-bold tracking-[0.24em] text-[#EDE5D5]/40 uppercase", children: SITE.tagline })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "mt-4 max-w-sm text-sm leading-relaxed text-[#EDE5D5]/50", children: [
          SITE.businessType,
          " in ",
          SITE.city,
          ", ",
          SITE.state,
          ". Hand-picked, one-of-one pre-loved menswear \u2014 quality checked before it goes on the rack."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "mt-5 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { href: waLink("Hi Elevate X Thrift! I'd like to know more about your pieces."), target: "_blank", rel: "noreferrer", className: "btn btn-ghost px-4 py-2 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconWhatsApp, { className: "h-4 w-4" }),
            " WhatsApp"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { href: SITE.instagramUrl, target: "_blank", rel: "noreferrer", className: "btn btn-ghost px-4 py-2 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconInstagram, { className: "h-4 w-4" }),
            " Instagram"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { href: SITE.emailHref, className: "btn btn-ghost px-4 py-2 text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconMail, { className: "h-4 w-4" }),
            " Email"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("nav", { "aria-label": "Shop categories", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "eyebrow mb-3 text-[#EDE5D5]/40", children: "Shop" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("a", { href: "/shop", className: "text-[#EDE5D5]/65 hover:text-[#EDE5D5]", children: "All products" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("a", { href: "/shop?new=1", className: "text-[#EDE5D5]/65 hover:text-[#EDE5D5]", children: "New arrivals" }) }),
          CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("a", { href: `/shop?category=${encodeURIComponent(c)}`, className: "text-[#EDE5D5]/65 hover:text-[#EDE5D5]", children: c }) }, c))
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "eyebrow mb-3 text-[#EDE5D5]/40", children: "Visit & contact" }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("ul", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { href: waLink(), target: "_blank", rel: "noreferrer", className: "flex items-start gap-2 text-[#EDE5D5]/65 hover:text-[#EDE5D5]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconWhatsApp, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            " ",
            SITE.whatsappDisplay
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { href: SITE.instagramUrl, target: "_blank", rel: "noreferrer", className: "flex items-start gap-2 text-[#EDE5D5]/65 hover:text-[#EDE5D5]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconInstagram, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            " ",
            SITE.instagramHandle
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { href: SITE.emailHref, className: "flex items-start gap-2 break-all text-[#EDE5D5]/65 hover:text-[#EDE5D5]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconMail, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            " ",
            SITE.email
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("li", { className: "flex items-start gap-2 text-[#EDE5D5]/65", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconPin, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            " ",
            SITE.location
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("ul", { className: "mt-5 space-y-2 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("a", { href: "/about", className: "text-[#EDE5D5]/65 hover:text-[#EDE5D5]", children: "About us" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { onClick: () => navigate("/contact"), className: "text-left text-[#EDE5D5]/65 hover:text-[#EDE5D5]", children: "Contact & delivery info" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "mt-10 flex flex-col gap-3 border-t border-[#EDE5D5]/10 pt-6 text-xs text-[#EDE5D5]/35 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { children: [
        "\xA9 ",
        year,
        " ",
        SITE.brandName,
        ". All pieces are pre-loved and quality checked."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "sm:text-right", children: "Men's thrift only \xB7 Shipping across India \xB7 Prices in INR" })
    ] })
  ] }) });
}
var import_jsx_runtime7;
var init_Footer = __esm({
  "src/components/Footer.tsx"() {
    "use strict";
    init_site();
    init_products();
    init_SiteMark();
    init_ui();
    import_jsx_runtime7 = require("react/jsx-runtime");
  }
});

// src/components/Header.tsx
function Header({
  route,
  navigate,
  onOpenBag,
  query,
  onQuery
}) {
  const { count, saved } = useShop();
  const [menuOpen, setMenuOpen] = (0, import_react6.useState)(false);
  const [searchOpen, setSearchOpen] = (0, import_react6.useState)(false);
  const searchRef = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);
  (0, import_react6.useEffect)(() => {
    setMenuOpen(false);
  }, [route]);
  (0, import_react6.useEffect)(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  const isActive = (to) => {
    const path = to.split("?")[0];
    if (path === "/") return route === "home";
    if (path === "/shop") return route === "shop";
    return route === path.replace("/", "");
  };
  const submitSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("header", { className: "sticky top-0 z-40 bg-[#08070a]/85 backdrop-blur-xl", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "border-b border-[#EDE5D5]/10", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-[72px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("a", { href: "/", className: "flex shrink-0 items-center gap-2.5", "aria-label": `${SITE.brandName} \u2014 home`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SiteMark, { className: "h-10 w-10 rounded-full ring-1 ring-[#EDE5D5]/20" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "hidden leading-none sm:block", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "block font-display text-2xl font-extrabold tracking-[0.02em] uppercase", children: [
            "Elevate ",
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "font-script text-lg text-[#D81F2A]", children: "x" }),
            " Thrift"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "mt-1 block text-[9px] font-bold tracking-[0.28em] text-[#EDE5D5]/35 uppercase", children: "Buy \u2022 Wear \u2022 Repeat" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("nav", { "aria-label": "Main", className: "ml-6 hidden items-center gap-1 lg:flex", children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "a",
        {
          href: l.to,
          "aria-current": isActive(l.to) ? "page" : void 0,
          className: `rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide transition ${isActive(l.to) ? "bg-white/8 text-[#EDE5D5]" : "text-[#EDE5D5]/60 hover:bg-white/5 hover:text-[#EDE5D5]"}`,
          children: l.label
        },
        l.to
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "ml-auto flex items-center gap-1 sm:gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("form", { onSubmit: submitSearch, className: "hidden md:block", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { htmlFor: "header-search", className: "sr-only", children: "Search all products" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconSearch, { className: "pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#EDE5D5]/40" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "input",
              {
                id: "header-search",
                type: "search",
                value: query,
                onChange: (e) => onQuery(e.target.value),
                placeholder: "Search",
                className: "w-40 rounded-full border border-[#EDE5D5]/14 bg-white/[0.04] py-2 pr-3 pl-9 text-sm text-[#EDE5D5] placeholder:text-[#EDE5D5]/35 focus:border-[#EDE5D5]/35 focus:outline-none lg:w-52"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setSearchOpen(true),
            "aria-label": "Open search",
            className: "flex h-10 w-10 items-center justify-center rounded-full text-[#EDE5D5]/70 transition hover:bg-white/8 hover:text-[#EDE5D5] md:hidden",
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconSearch, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "a",
          {
            href: "/shop?wishlist=1",
            "aria-label": `Wishlist${saved.length ? `, ${saved.length} saved` : ""}`,
            className: "relative flex h-10 w-10 items-center justify-center rounded-full text-[#EDE5D5]/70 transition hover:bg-white/8 hover:text-[#EDE5D5]",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconHeart, {}),
              saved.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D81F2A] px-1 text-[10px] font-bold text-white", children: saved.length })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "button",
          {
            type: "button",
            onClick: onOpenBag,
            className: "relative flex items-center gap-2 rounded-full bg-[#EDE5D5] px-3.5 py-2.5 text-[13px] font-bold text-[#0b0a0c] transition hover:bg-white",
            "aria-label": `Open shopping bag${count ? `, ${count} items` : ", empty"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconBag, { className: "h-4 w-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "hidden sm:inline", children: "Bag" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "span",
                {
                  "data-testid": "bag-count",
                  className: `flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-extrabold ${count > 0 ? "bg-[#D81F2A] text-white" : "bg-black/15 text-[#0b0a0c]/70"}`,
                  children: count
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setMenuOpen(true),
            "aria-label": "Open menu",
            "aria-expanded": menuOpen,
            className: "flex h-10 w-10 items-center justify-center rounded-full text-[#EDE5D5]/80 transition hover:bg-white/8 lg:hidden",
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconMenu, {})
          }
        )
      ] })
    ] }) }) }),
    searchOpen && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "fixed inset-0 z-50 md:hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: () => setSearchOpen(false) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("form", { onSubmit: submitSearch, className: "relative m-4 rounded-2xl border border-[#EDE5D5]/15 bg-[#121014] p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconSearch, { className: "h-5 w-5 shrink-0 text-[#EDE5D5]/45" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "input",
            {
              ref: searchRef,
              type: "search",
              value: query,
              onChange: (e) => onQuery(e.target.value),
              placeholder: "Search jackets, denim, tees\u2026",
              "aria-label": "Search all products",
              className: "field"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => setSearchOpen(false), "aria-label": "Close search", className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#EDE5D5]/70", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconClose, {}) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "submit", className: "btn btn-primary mt-3 w-full py-2.5 text-sm", children: "Search" })
      ] })
    ] }),
    menuOpen && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "absolute inset-0 bg-black/65 backdrop-blur-sm", onClick: () => setMenuOpen(false) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
        "nav",
        {
          "aria-label": "Mobile",
          className: "drawer-in absolute top-0 right-0 flex h-full w-[86%] max-w-xs flex-col border-l border-[#EDE5D5]/12 bg-[#0d0b0f] p-5",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "eyebrow text-[#EDE5D5]/45", children: "Menu" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", onClick: () => setMenuOpen(false), "aria-label": "Close menu", className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-[#EDE5D5]", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconClose, { className: "h-4 w-4" }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mt-6 flex flex-col", children: [
              LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "a",
                {
                  href: l.to,
                  className: "border-b border-[#EDE5D5]/8 py-3.5 font-display text-2xl font-bold tracking-wide uppercase text-[#EDE5D5] hover:text-white",
                  children: l.label
                },
                l.to
              )),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("a", { href: "/shop?wishlist=1", className: "border-b border-[#EDE5D5]/8 py-3.5 font-display text-2xl font-bold tracking-wide uppercase text-[#EDE5D5] hover:text-white", children: [
                "Wishlist ",
                saved.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "text-[#D81F2A]", children: [
                  "(",
                  saved.length,
                  ")"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mt-auto space-y-2 pt-6", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("a", { href: waLink("Hi Elevate X Thrift! I have a question about a piece on your site."), target: "_blank", rel: "noreferrer", className: "btn btn-whatsapp w-full py-3 text-sm", children: "Chat on WhatsApp" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("a", { href: SITE.instagramUrl, target: "_blank", rel: "noreferrer", className: "btn btn-ghost w-full py-3 text-sm", children: SITE.instagramHandle })
            ] })
          ]
        }
      )
    ] })
  ] });
}
var import_react6, import_jsx_runtime8, LINKS;
var init_Header = __esm({
  "src/components/Header.tsx"() {
    "use strict";
    import_react6 = require("react");
    init_site();
    init_shop2();
    init_SiteMark();
    init_ui();
    import_jsx_runtime8 = require("react/jsx-runtime");
    LINKS = [
      { label: "Home", to: "/" },
      { label: "Shop", to: "/shop" },
      { label: "New Arrivals", to: "/shop?new=1" },
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" }
    ];
  }
});

// src/lib/router.tsx
function parseRoute(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return { name: "home" };
  if (path === "/shop" || path === "/new-arrivals") return { name: "shop" };
  if (path === "/checkout") return { name: "checkout" };
  if (path === "/about") return { name: "about" };
  if (path === "/contact") return { name: "contact" };
  const product = path.match(/^\/product\/([A-Za-z0-9-_]+)$/);
  if (product) return { name: "product", slug: product[1] };
  return { name: "notfound" };
}
function useRouter() {
  const readUrl = () => typeof window === "undefined" ? "/" : window.location.pathname + window.location.search;
  const [url, setUrl] = (0, import_react7.useState)(readUrl);
  (0, import_react7.useEffect)(() => {
    const onPop = () => setUrl(readUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (0, import_react7.useCallback)((to, opts = {}) => {
    const [, hash] = to.split("#");
    if (opts.replace) window.history.replaceState({}, "", to);
    else window.history.pushState({}, "", to);
    setUrl(window.location.pathname + window.location.search);
    if (!opts.keepScroll) {
      if (hash) {
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          else window.scrollTo({ top: 0 });
        });
      } else {
        window.scrollTo({ top: 0 });
      }
    }
  }, []);
  const [pathname, search] = url.split("?");
  const route = parseRoute(pathname);
  const params = new URLSearchParams(search ?? "");
  (0, import_react7.useEffect)(() => {
    document.title = ROUTE_TITLES[route.name] ?? ROUTE_TITLES.home;
  }, [route.name]);
  (0, import_react7.useEffect)(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || target === "_blank" || anchor.hasAttribute("download")) return;
      if (!href.startsWith("/") || href.startsWith("//")) return;
      event.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);
  return { route, navigate, pathname, params, url };
}
var import_react7, ROUTE_TITLES;
var init_router = __esm({
  "src/lib/router.tsx"() {
    "use strict";
    import_react7 = require("react");
    ROUTE_TITLES = {
      home: "Elevate X Thrift \u2014 Men's Thrift Fashion | Panipat, Haryana",
      shop: "Shop \u2014 Elevate X Thrift",
      product: "Elevate X Thrift",
      checkout: "Checkout \u2014 Elevate X Thrift",
      about: "About \u2014 Elevate X Thrift",
      contact: "Contact \u2014 Elevate X Thrift",
      notfound: "Page not found \u2014 Elevate X Thrift"
    };
  }
});

// src/pages/About.tsx
function About({ navigate }) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("header", { className: "flex flex-col items-start gap-5 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SiteMark, { className: "h-20 w-20 rounded-full ring-1 ring-[#EDE5D5]/20" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "eyebrow text-[#D81F2A]", children: "About us" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("h1", { className: "display-lg mt-1 text-4xl sm:text-5xl", children: [
          "Elevate ",
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "font-script text-3xl text-[#D81F2A]", children: "x" }),
          " Thrift"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "mt-1 text-sm font-semibold tracking-[0.2em] text-[#EDE5D5]/40 uppercase", children: SITE.tagline })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "space-y-5 text-[15px] leading-relaxed text-[#EDE5D5]/70", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { children: [
          "Elevate X Thrift is a men's thrift store in ",
          SITE.city,
          ", ",
          SITE.state,
          ". We sell pre-loved menswear \u2014 vintage, streetwear, denim, shirts, tees, jackets, trousers and accessories \u2014 one piece at a time."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "The idea is simple. Good clothing shouldn't be disposable. There is already more than enough well-made menswear in the world; it usually just needs to find the right person. So instead of adding to the pile, we find good pieces, check them properly, photograph them honestly and pass them on at a price that makes sense." }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Everything here is single-piece stock. No sizes to restock, no colour options, no waiting for a re-delivery \u2014 what you see is what exists. When a piece sells, it's gone for good." }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "We're a small, in-person operation. That means we can tell you the actual measurements of a jacket, point out a small mark on the cuff, or hold a piece for you while you decide. Message us on WhatsApp and you're talking to the shop, not a support queue." }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", { className: "font-display pt-2 text-2xl font-extrabold uppercase", children: "What we look for" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ul", { className: "space-y-2.5", children: [
          "Pieces with real character \u2014 vintage cuts, honest fade, good labels.",
          "Fabric and construction that hold up, not fast-fashion throwaways.",
          "Anything we'd wear ourselves, priced so it actually sells."
        ].map((t) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("li", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(IconCheck, { className: "mt-1 h-4 w-4 shrink-0 text-[#D81F2A]" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: t })
        ] }, t)) }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h2", { className: "font-display pt-2 text-2xl font-extrabold uppercase", children: "How it works" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("ol", { className: "space-y-3", children: [
          ["Browse the rack", "Every listing is a single piece with its true size, condition and \u2014 where we've measured it \u2014 exact measurements."],
          ["Add to bag", "Pick what you want and head to checkout. We ask for your delivery details once, then keep them for next time."],
          ["Confirm on WhatsApp", "Your order is sent to us as a WhatsApp message with everything we need. We reply to confirm stock, delivery cost and payment."],
          ["It arrives, you wear it", "Ships across India. If something isn't right, talk to us \u2014 we'd rather sort it out than lose a customer."]
        ].map(([title, body], i) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("li", { className: "flex gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#EDE5D5]/20 text-[11px] font-bold text-[#EDE5D5]/70", children: i + 1 }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "font-bold text-[#EDE5D5]", children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-sm text-[#EDE5D5]/55", children: body })
          ] })
        ] }, title)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("aside", { className: "space-y-4 lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "eyebrow text-[#EDE5D5]/40", children: "The shop" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("dl", { className: "mt-3 space-y-2.5 text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Business" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { className: "font-semibold", children: SITE.businessType })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Location" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { className: "font-semibold", children: SITE.location })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "WhatsApp" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: `https://wa.me/${SITE.whatsapp}`, target: "_blank", rel: "noreferrer", className: "font-semibold underline underline-offset-2 hover:text-white", children: SITE.whatsappDisplay }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Instagram" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: SITE.instagramUrl, target: "_blank", rel: "noreferrer", className: "font-semibold underline underline-offset-2 hover:text-white", children: SITE.instagramHandle }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dt", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Email" }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("a", { href: SITE.emailHref, className: "font-semibold break-all underline underline-offset-2 hover:text-white", children: SITE.email }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { onClick: () => navigate("/shop"), className: "btn btn-cream w-full py-3 text-sm", children: "Shop the rack" }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("a", { href: `https://wa.me/${SITE.whatsapp}`, target: "_blank", rel: "noreferrer", className: "btn btn-ghost w-full py-3 text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(IconWhatsApp, { className: "h-4 w-4" }),
            " Ask us anything"
          ] })
        ] })
      ] })
    ] })
  ] });
}
var import_jsx_runtime9;
var init_About = __esm({
  "src/pages/About.tsx"() {
    "use strict";
    init_site();
    init_SiteMark();
    init_ui();
    import_jsx_runtime9 = require("react/jsx-runtime");
  }
});

// src/lib/order.ts
var order_exports = {};
__export(order_exports, {
  DELIVERY: () => DELIVERY,
  ORDERS_KEY: () => ORDERS_KEY,
  buildOrderMessage: () => buildOrderMessage,
  deliveryLabel: () => deliveryLabel,
  formatAddress: () => formatAddress,
  loadOrders: () => loadOrders,
  makeReference: () => makeReference,
  recordOrder: () => recordOrder,
  whatsappOrderLink: () => whatsappOrderLink
});
function makeReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = new Uint8Array(5);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < 5; i++) bytes[i] = Math.floor(Math.random() * 256);
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `ET-${out}`;
}
function formatAddress(d) {
  const parts = [
    [d.house, d.street].filter(Boolean).join(", "),
    d.landmark ? `Near ${d.landmark}` : "",
    [d.city, d.state].filter(Boolean).join(", "),
    `${d.pin}`,
    d.country
  ].filter(Boolean);
  return parts.join("\n");
}
function buildOrderMessage(order) {
  const { details: d, lines, subtotal, deliveryCharge, total, reference } = order;
  const items = lines.map(
    (l, i) => `${i + 1}. ${l.product.name}
   Size: ${l.size}  \xD7  ${l.qty}  =  ${inr2(l.lineTotal)}` + (l.product.availability === "reserved" ? "  (on hold)" : "")
  );
  const delivery = deliveryCharge === null ? "To be confirmed (by PIN code)" : deliveryCharge === 0 ? "Free" : inr2(deliveryCharge);
  return [
    `NEW ORDER \u2014 ${SITE.brandName}`,
    `Ref: ${reference}`,
    "",
    `Name: ${d.fullName}`,
    `Mobile: ${d.phone}`,
    `Email: ${d.email}`,
    "",
    "DELIVERY ADDRESS",
    formatAddress(d),
    "",
    "ITEMS",
    ...items,
    "",
    `Subtotal: ${inr2(subtotal)}`,
    `Delivery: ${delivery}`,
    total === null ? "Total: Subtotal + delivery (to be confirmed)" : `Total: ${inr2(total)}`,
    d.notes.trim() ? `
Order notes: ${d.notes.trim()}` : "",
    "",
    "Please confirm availability, delivery charge and payment details."
  ].filter((l) => l !== void 0).join("\n");
}
function whatsappOrderLink(order) {
  return waLink(buildOrderMessage(order));
}
async function recordOrder(order) {
  const record = {
    reference: order.reference,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    status: "whatsapp-opened",
    message: buildOrderMessage(order),
    details: order.details,
    items: order.lines.map((l) => ({
      slug: l.product.slug,
      name: l.product.name,
      size: l.size,
      qty: l.qty,
      price: l.product.price
    })),
    subtotal: order.subtotal,
    deliveryCharge: order.deliveryCharge,
    total: order.total
  };
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify([record, ...existing].slice(0, 25)));
  } catch {
  }
  const endpoint = void 0;
  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });
    } catch {
    }
  }
}
function loadOrders() {
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
var inr2, ORDERS_KEY, deliveryLabel;
var init_order = __esm({
  "src/lib/order.ts"() {
    "use strict";
    init_site();
    init_shop();
    inr2 = (n) => "\u20B9" + n.toLocaleString("en-IN");
    ORDERS_KEY = "elevate.orders.v1";
    deliveryLabel = (charge) => charge === null ? "Confirmed on WhatsApp" : charge === 0 ? "Free" : inr2(charge);
  }
});

// src/lib/validate.ts
var validate_exports = {};
__export(validate_exports, {
  INPUT_BASE: () => INPUT_BASE,
  digitsOnly: () => digitsOnly,
  isValidEmail: () => isValidEmail,
  isValidPhone: () => isValidPhone,
  isValidPin: () => isValidPin,
  normalisePhone: () => normalisePhone,
  required: () => required
});
function normalisePhone(raw) {
  return raw.replace(/[^\d]/g, "").replace(/^(91)(?=\d{10}$)/, "").replace(/^0(?=\d{10}$)/, "");
}
function isValidPhone(raw) {
  const digits = normalisePhone(raw);
  return /^[6-9]\d{9}$/.test(digits);
}
function isValidPin(raw) {
  return /^[1-9]\d{5}$/.test(raw.trim());
}
function isValidEmail(raw) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(raw.trim());
}
function digitsOnly(v, max) {
  return v.replace(/\D/g, "").slice(0, max);
}
var required, INPUT_BASE;
var init_validate = __esm({
  "src/lib/validate.ts"() {
    "use strict";
    required = (v) => v.trim().length > 0;
    INPUT_BASE = "w-full rounded-xl border bg-[#141315] px-4 py-3 text-base text-[#EDE5D5] placeholder:text-[#EDE5D5]/30 transition focus:outline-none";
  }
});

// src/pages/Checkout.tsx
function validate(d) {
  const e = {};
  if (!d.fullName.trim()) e.fullName = "Please enter your full name.";
  if (!d.phone.trim()) e.phone = "Please enter your mobile number.";
  else if (!isValidPhone(d.phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!d.email.trim()) e.email = "Please enter your email address.";
  else if (!isValidEmail(d.email)) e.email = "That email doesn't look right.";
  if (!d.house.trim()) e.house = "House / flat number is required.";
  if (!d.street.trim()) e.street = "Street or area is required.";
  if (!d.city.trim()) e.city = "City or district is required.";
  if (!d.state.trim()) e.state = "Please select your state.";
  if (!d.pin.trim()) e.pin = "PIN code is required.";
  else if (!isValidPin(d.pin)) e.pin = "PIN code must be 6 digits.";
  return e;
}
function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required: required2,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("label", { htmlFor: `field-${id}`, className: "field-label", children: [
      label,
      required2 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "ml-1 text-[#D81F2A]", children: "*" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "input",
      {
        id: `field-${id}`,
        name: id,
        value,
        onChange: (e) => onChange(e.target.value),
        onBlur,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `error-${id}` : void 0,
        className: "field",
        ...rest
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { id: `error-${id}`, className: "field-error", children: error })
  ] });
}
function Checkout({ navigate }) {
  const { lines, subtotal, deliveryCharge, total, setQty, removeLine, details, setDetails, count } = useShop();
  const [step, setStep] = (0, import_react8.useState)("details");
  const [touched, setTouched] = (0, import_react8.useState)({});
  const [submitted, setSubmitted] = (0, import_react8.useState)(false);
  const [opening, setOpening] = (0, import_react8.useState)(false);
  const [reference, setReference] = (0, import_react8.useState)("");
  const orderRef = (0, import_react8.useRef)("");
  const errors = (0, import_react8.useMemo)(() => validate(details), [details]);
  const showError = (k) => (submitted || touched[k]) && errors[k] ? errors[k] : void 0;
  const markTouched = (key) => setTouched((t) => ({ ...t, [key]: true }));
  const update = (key, value) => {
    setDetails({ ...details, [key]: value });
  };
  const scrollToFirstError = () => {
    const first = REQUIRED.find((k) => errors[k]);
    if (!first) return;
    const el = document.getElementById(`field-${first}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  };
  const goReview = (ev) => {
    ev.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) {
      scrollToFirstError();
      return;
    }
    setStep("review");
    window.scrollTo({ top: 0 });
  };
  const order = (0, import_react8.useMemo)(() => {
    if (!reference) return null;
    return {
      lines,
      subtotal,
      deliveryCharge,
      total,
      details,
      reference
    };
  }, [reference, details, subtotal, deliveryCharge, total]);
  const confirm = async () => {
    const ref = orderRef.current || makeReference();
    orderRef.current = ref;
    setReference(ref);
    setOpening(true);
    const draft = { lines, subtotal, deliveryCharge, total, details, reference: ref };
    const href = whatsappOrderLink(draft);
    const win = window.open(href, "_blank", "noopener,noreferrer");
    if (win) await recordOrder(draft);
    setOpening(false);
    setStep(win ? "sent" : "review");
    if (!win) {
      setStep("sent");
    }
    window.scrollTo({ top: 0 });
  };
  if (lines.length === 0 && step !== "sent") {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mx-auto max-w-lg px-4 py-24 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#EDE5D5]/15 bg-white/[0.03]", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(IconArrow, { className: "h-6 w-6 -rotate-180 text-[#EDE5D5]/40" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h1", { className: "display-lg mt-5 text-3xl", children: "Your bag is empty" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "mt-2 text-sm text-[#EDE5D5]/55", children: "Add a piece to your bag and your checkout details will be waiting here." }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { onClick: () => navigate("/shop"), className: "btn btn-cream mt-6 px-6 py-3 text-sm", children: "Browse the rack" })
    ] });
  }
  if (step === "sent") {
    const draft = order ?? { lines, subtotal, deliveryCharge, total, details, reference: orderRef.current };
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mx-auto max-w-2xl px-4 py-12 sm:px-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "rounded-2xl border border-[#EDE5D5]/14 bg-white/[0.03] p-6 sm:p-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#57b26a]/15 text-[#7ed08d]", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(IconCheck, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "eyebrow text-[#EDE5D5]/45", children: [
              "Order request ",
              orderRef.current
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h1", { className: "font-display text-2xl font-extrabold uppercase", children: "Almost there \u2014 press send" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-5 space-y-3 text-sm leading-relaxed text-[#EDE5D5]/75", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { children: [
            "We've opened WhatsApp with your full order details filled in.",
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("strong", { className: "text-[#EDE5D5]", children: " Your order isn't placed until you press Send in WhatsApp" }),
            " and we reply to confirm stock and delivery."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "rounded-xl border border-[#d8a423]/25 bg-[#d8a423]/10 p-3 text-[13px] text-[#f0d79a]", children: "Nothing has been charged. We confirm availability and delivery by PIN code first, then send payment details." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-5 flex flex-col gap-2 sm:flex-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("a", { href: whatsappOrderLink(draft), target: "_blank", rel: "noreferrer", className: "btn btn-whatsapp flex-1 px-5 py-3.5 text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(IconWhatsApp, { className: "h-5 w-5" }),
            " Open WhatsApp again"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { href: `mailto:${SITE.email}?subject=${encodeURIComponent(`Order ${orderRef.current}`)}&body=${encodeURIComponent(buildOrderMessage(draft))}`, className: "btn btn-ghost flex-1 px-5 py-3.5 text-sm", children: "Email the order instead" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("details", { className: "mt-5 rounded-xl border border-[#EDE5D5]/12 bg-black/25 p-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("summary", { className: "cursor-pointer text-xs font-bold tracking-wide text-[#EDE5D5]/60 uppercase", children: "View your order message" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("pre", { className: "mt-3 max-h-72 overflow-auto text-[12px] leading-relaxed whitespace-pre-wrap text-[#EDE5D5]/70", children: buildOrderMessage(draft) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { onClick: () => navigate("/shop"), className: "text-sm font-semibold text-[#EDE5D5]/55 underline underline-offset-4 hover:text-[#EDE5D5]", children: "Keep shopping" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { onClick: () => setStep("review"), className: "text-sm font-semibold text-[#EDE5D5]/55 underline underline-offset-4 hover:text-[#EDE5D5]", children: "Back to order summary" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "mt-4 text-center text-xs text-[#EDE5D5]/35", children: [
        "Your bag is kept until the order is confirmed. Message us on",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("a", { href: waLink(`Hi! Following up on order ${orderRef.current}.`), target: "_blank", rel: "noreferrer", className: "font-semibold text-[#EDE5D5]/70 underline underline-offset-2", children: "WhatsApp" }),
        " ",
        "or ",
        SITE.email,
        " with the reference above."
      ] })
    ] });
  }
  const summary = (compact = false) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("h2", { className: "eyebrow mb-3 text-[#EDE5D5]/40", children: [
      "Order summary (",
      count,
      ")"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ul", { className: "space-y-3", children: lines.map(({ id, product, size, qty, lineTotal }) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("li", { className: "flex gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "product-frame w-14 shrink-0 overflow-hidden rounded-lg", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ProductMedia, { product, sizes: "56px" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "truncate text-sm font-semibold", children: product.name }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "text-[11px] text-[#EDE5D5]/45", children: [
          "Size ",
          size,
          " \xB7 ",
          product.condition
        ] }),
        !compact ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-1.5 flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Stepper, { qty, onChange: (q) => setQty(id, q), label: product.name }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-sm font-bold", children: inr(lineTotal) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-1.5 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "text-[#EDE5D5]/55", children: [
            "Qty ",
            qty,
            " \xD7 ",
            inr(product.price)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "font-bold", children: inr(lineTotal) })
        ] })
      ] }),
      !compact && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { onClick: () => removeLine(id), "aria-label": `Remove ${product.name}`, className: "self-start text-[#EDE5D5]/35 hover:text-[#ff8b92]", children: "\u2715" })
    ] }, id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("dl", { className: "mt-4 space-y-1.5 border-t border-[#EDE5D5]/10 pt-3 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("dt", { className: "text-[#EDE5D5]/55", children: "Subtotal" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("dd", { className: "font-semibold", children: inr(subtotal) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("dt", { className: "text-[#EDE5D5]/55", children: "Delivery" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("dd", { className: "font-semibold", children: deliveryCharge === null ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-[#d8a423]", children: "To be confirmed" }) : deliveryLabel(deliveryCharge) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-baseline justify-between border-t border-[#EDE5D5]/10 pt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("dt", { className: "font-bold", children: total === null ? "Estimated total" : "Total" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("dd", { className: "font-display text-2xl font-extrabold", children: total === null ? inr(subtotal) : inr(total) })
      ] })
    ] }),
    deliveryCharge === null && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "mt-2 text-[11px] leading-relaxed text-[#EDE5D5]/40", children: DELIVERY.note })
  ] });
  if (step === "review") {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mx-auto max-w-5xl px-4 py-8 sm:px-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h1", { className: "display-lg text-3xl sm:text-4xl", children: "Review your order" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "mt-1 text-sm text-[#EDE5D5]/50", children: "Check the delivery details, then confirm to send the order on WhatsApp." }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("section", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h2", { className: "eyebrow text-[#EDE5D5]/40", children: "Delivery details" }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { onClick: () => setStep("details"), className: "text-xs font-bold text-[#EDE5D5] underline underline-offset-4", children: "Edit details" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-3 grid gap-3 text-sm sm:grid-cols-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Name" }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "font-semibold", children: details.fullName })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Mobile" }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "font-semibold", children: details.phone })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Email" }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "font-semibold break-all", children: details.email })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Address" }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "leading-relaxed whitespace-pre-line text-[#EDE5D5]/85", children: formatAddress(details) })
              ] }),
              details.notes.trim() && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase", children: "Notes" }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[#EDE5D5]/85", children: details.notes })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("section", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("h2", { className: "eyebrow mb-3 text-[#EDE5D5]/40", children: [
              "Pieces (",
              count,
              ")"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("ul", { className: "divide-y divide-[#EDE5D5]/8", children: lines.map(({ id, product, size, qty, lineTotal }) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("li", { className: "flex gap-3 py-3 first:pt-0 last:pb-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "product-frame w-16 shrink-0 overflow-hidden rounded-lg", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ProductMedia, { product, sizes: "64px" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-sm font-bold", children: product.name }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "text-[11px] text-[#EDE5D5]/45", children: [
                  "Size ",
                  size,
                  " \xB7 ",
                  product.condition,
                  " \xB7 ",
                  product.availability === "reserved" ? "On hold" : "In stock"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "mt-1 text-xs text-[#EDE5D5]/60", children: [
                  "Qty ",
                  qty,
                  " \xD7 ",
                  inr(product.price)
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-sm font-bold", children: inr(lineTotal) })
            ] }, id)) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "space-y-4", children: [
          summary(true),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { onClick: confirm, disabled: opening, className: "btn btn-primary w-full py-3.5 text-sm", children: opening ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Spinner, { className: "h-4 w-4" }),
              " Opening WhatsApp\u2026"
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(IconWhatsApp, { className: "h-5 w-5" }),
              " Confirm order on WhatsApp"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "mt-2.5 text-center text-[11px] leading-relaxed text-[#EDE5D5]/40", children: "You'll be able to review the message before sending. Your order is only placed once you press Send." }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { onClick: () => setStep("details"), className: "btn btn-ghost mt-2 w-full py-2.5 text-xs", children: "Edit details" })
          ] })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mx-auto max-w-5xl px-4 py-8 sm:px-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h1", { className: "display-lg text-3xl sm:text-4xl", children: "Checkout" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "mt-1 text-sm text-[#EDE5D5]/50", children: "Step 1 of 2 \u2014 where should we send it?" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { onClick: () => navigate("/shop"), className: "text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]", children: "\u2190 Continue shopping" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("form", { onSubmit: goReview, noValidate: true, className: "space-y-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("section", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h2", { className: "eyebrow mb-4 text-[#EDE5D5]/40", children: "Contact information" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { id: "fullName", label: "Full name", required: true, value: details.fullName, onChange: (v) => update("fullName", v), onBlur: () => markTouched("fullName"), error: showError("fullName"), autoComplete: "name", placeholder: "Kartik Tyagi" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { id: "phone", label: "Mobile number", required: true, value: details.phone, onChange: (v) => update("phone", digitsOnly(v, 10)), onBlur: () => markTouched("phone"), error: showError("phone"), type: "tel", inputMode: "numeric", autoComplete: "tel-national", placeholder: "98765 43210" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "sm:col-span-2", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { id: "email", label: "Email address", required: true, value: details.email, onChange: (v) => update("email", v), onBlur: () => markTouched("email"), error: showError("email"), type: "email", inputMode: "email", autoComplete: "email", placeholder: "you@example.com" }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("section", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h2", { className: "eyebrow mb-4 text-[#EDE5D5]/40", children: "Delivery address" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { id: "house", label: "House / flat no.", required: true, value: details.house, onChange: (v) => update("house", v), onBlur: () => markTouched("house"), error: showError("house"), autoComplete: "address-line1", placeholder: "H.No 123" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { id: "street", label: "Street / area / locality", required: true, value: details.street, onChange: (v) => update("street", v), onBlur: () => markTouched("street"), error: showError("street"), autoComplete: "address-line2", placeholder: "Model Town" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { id: "landmark", label: "Landmark (optional)", value: details.landmark, onChange: (v) => update("landmark", v), placeholder: "Near Shiv Mandir" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { id: "city", label: "City / district", required: true, value: details.city, onChange: (v) => update("city", v), onBlur: () => markTouched("city"), error: showError("city"), autoComplete: "address-level2", placeholder: "Panipat" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("label", { htmlFor: "field-state", className: "field-label", children: [
                "State ",
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "ml-1 text-[#D81F2A]", children: "*" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
                "select",
                {
                  id: "field-state",
                  name: "state",
                  value: details.state,
                  onChange: (e) => update("state", e.target.value),
                  onBlur: () => setTouched((t) => ({ ...t, state: true })),
                  "aria-invalid": Boolean(showError("state")),
                  "aria-describedby": showError("state") ? "error-state" : void 0,
                  className: "field",
                  autoComplete: "address-level1",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("option", { value: "", children: "Select state" }),
                    INDIAN_STATES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("option", { value: s, children: s }, s))
                  ]
                }
              ),
              showError("state") && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { id: "error-state", className: "field-error", children: showError("state") })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Field, { id: "pin", label: "PIN code", required: true, value: details.pin, onChange: (v) => update("pin", digitsOnly(v, 6)), onBlur: () => markTouched("pin"), error: showError("pin"), type: "text", inputMode: "numeric", autoComplete: "postal-code", placeholder: "132103" }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("label", { htmlFor: "field-country", className: "field-label", children: "Country" }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("input", { id: "field-country", name: "country", value: details.country, readOnly: true, className: "field opacity-70" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("label", { htmlFor: "field-notes", className: "field-label", children: "Order notes (optional)" }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "textarea",
                {
                  id: "field-notes",
                  name: "notes",
                  value: details.notes,
                  onChange: (e) => update("notes", e.target.value),
                  rows: 3,
                  placeholder: "Delivery instructions, preferred time, questions about a piece\u2026",
                  className: "field resize-y"
                }
              )
            ] })
          ] })
        ] }),
        submitted && Object.keys(errors).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { role: "alert", className: "rounded-xl border border-[#D81F2A]/40 bg-[#D81F2A]/10 p-4 text-sm text-[#ffb3b8]", children: [
          "Please fix the highlighted fields \u2014 ",
          Object.keys(errors).length,
          " ",
          Object.keys(errors).length === 1 ? "field needs" : "fields need",
          " attention."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-col gap-2 sm:flex-row-reverse", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("button", { type: "submit", className: "btn btn-primary flex-1 py-3.5 text-sm", children: [
            "Review order ",
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(IconArrow, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { type: "button", onClick: () => navigate("/shop"), className: "btn btn-ghost flex-1 py-3.5 text-sm", children: "Keep shopping" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-center text-[11px] text-[#EDE5D5]/35", children: "We only use these details to deliver your order. No payment is taken on this site." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "lg:sticky lg:top-24 lg:self-start", children: summary() })
    ] })
  ] });
}
var import_react8, import_jsx_runtime10, REQUIRED;
var init_Checkout = __esm({
  "src/pages/Checkout.tsx"() {
    "use strict";
    import_react8 = require("react");
    init_shop();
    init_site();
    init_format();
    init_order();
    init_validate();
    init_shop2();
    init_ProductMedia();
    init_ui();
    import_jsx_runtime10 = require("react/jsx-runtime");
    REQUIRED = ["fullName", "phone", "email", "house", "street", "city", "state", "pin"];
  }
});

// src/pages/Contact.tsx
function Contact() {
  const cards = [
    {
      icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(IconWhatsApp, { className: "h-5 w-5" }),
      label: "WhatsApp",
      value: SITE.whatsappDisplay,
      hint: "Fastest for stock, sizes and delivery questions",
      href: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Elevate X Thrift! I have a question about a piece on your site.")}`,
      external: true
    },
    {
      icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(IconInstagram, { className: "h-5 w-5" }),
      label: "Instagram",
      value: SITE.instagramHandle,
      hint: "New drops, reels and stock updates",
      href: SITE.instagramUrl,
      external: true
    },
    {
      icon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(IconMail, { className: "h-5 w-5" }),
      label: "Email",
      value: SITE.email,
      hint: "Orders, bulk enquiries and partnerships",
      href: SITE.emailHref,
      external: false
    }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "eyebrow text-[#D81F2A]", children: "Contact" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h1", { className: "display-lg mt-1 text-4xl sm:text-5xl", children: "Talk to the shop" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("p", { className: "mt-2 max-w-xl text-sm leading-relaxed text-[#EDE5D5]/55", children: [
      "We're a small operation based in ",
      SITE.city,
      ", ",
      SITE.state,
      ". WhatsApp is the quickest way to reach us \u2014 we usually reply within a few hours during shop hours."
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "mt-8 grid gap-3 sm:grid-cols-3", children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
      "a",
      {
        href: c.href,
        target: c.external ? "_blank" : void 0,
        rel: c.external ? "noreferrer" : void 0,
        className: "group rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5 transition hover:border-[#EDE5D5]/28 hover:bg-white/[0.04]",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "flex h-10 w-10 items-center justify-center rounded-full border border-[#EDE5D5]/15 bg-white/[0.03] text-[#EDE5D5]/75 transition group-hover:text-white", children: c.icon }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mt-3 text-[11px] font-bold tracking-[0.16em] text-[#EDE5D5]/40 uppercase", children: c.label }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mt-0.5 text-sm font-bold break-all text-[#EDE5D5]", children: c.value }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mt-1 text-xs text-[#EDE5D5]/45", children: c.hint })
        ]
      },
      c.label
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-2 text-[#EDE5D5]/75", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(IconPin, { className: "h-5 w-5" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-[11px] font-bold tracking-[0.16em] uppercase", children: "Location" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mt-2 text-sm font-bold", children: SITE.location }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mt-1 text-xs text-[#EDE5D5]/45", children: "We trade online and in person by appointment. Message us before visiting." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-[11px] font-bold tracking-[0.16em] text-[#EDE5D5]/40 uppercase", children: "Business" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mt-2 text-sm font-bold", children: SITE.brandName }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-xs text-[#EDE5D5]/45", children: SITE.businessType }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "mt-3 text-[11px] font-bold tracking-[0.16em] text-[#EDE5D5]/40 uppercase", children: "Slogan" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-sm font-semibold text-[#EDE5D5]/80", children: SITE.tagline })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("section", { className: "mt-10 rounded-2xl border border-[#EDE5D5]/12 bg-[#0d0b0f] p-6 sm:p-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h2", { className: "font-display text-2xl font-extrabold uppercase", children: "Ordering & delivery" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("dl", { className: "mt-4 grid gap-4 text-sm sm:grid-cols-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dt", { className: "font-bold text-[#EDE5D5]", children: "How ordering works" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dd", { className: "mt-1 leading-relaxed text-[#EDE5D5]/55", children: "Add pieces to your bag, enter your delivery details at checkout and confirm. Your order reaches us on WhatsApp, where we confirm the piece is still available, quote delivery and share payment details." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dt", { className: "font-bold text-[#EDE5D5]", children: "Delivery" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dd", { className: "mt-1 leading-relaxed text-[#EDE5D5]/55", children: "We ship across India. Delivery cost depends on your PIN code and is confirmed before you pay \u2014 it is never charged up front on this site." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dt", { className: "font-bold text-[#EDE5D5]", children: "Payment" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dd", { className: "mt-1 leading-relaxed text-[#EDE5D5]/55", children: "No card details are collected here. Once your order is confirmed we share a UPI / bank payment link." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dt", { className: "font-bold text-[#EDE5D5]", children: "Single-piece stock" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("dd", { className: "mt-1 leading-relaxed text-[#EDE5D5]/55", children: "Every listing is one physical piece. Sizes and measurements are of that exact garment \u2014 there are no other sizes, colours or restocks." })
        ] })
      ] })
    ] })
  ] });
}
var import_jsx_runtime11;
var init_Contact = __esm({
  "src/pages/Contact.tsx"() {
    "use strict";
    init_site();
    init_ui();
    import_jsx_runtime11 = require("react/jsx-runtime");
  }
});

// src/components/ProductCard.tsx
function ProductCard({
  product,
  onOpen,
  priority = false
}) {
  const { addToBag, toggleSaved, isSaved } = useShop();
  const off = discountPercent(product);
  const available = isAvailable(product);
  const saved = isSaved(product.slug);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("article", { className: "group fade-up flex h-full flex-col overflow-hidden rounded-2xl border border-[#EDE5D5]/12 bg-[#121014]/80 transition-colors hover:border-[#EDE5D5]/25", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "button",
        {
          type: "button",
          onClick: () => onOpen(product.slug),
          "aria-label": `View ${product.name}`,
          className: "product-frame block w-full text-left",
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ProductMedia, { product, priority, sizes: "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 23vw" })
        }
      ),
      product.images.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(NoPhotoHint, {}),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex flex-col items-start gap-1.5", children: [
          product.tag && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Badge, { tone: "bone", className: "backdrop-blur", children: product.tag }),
          product.availability === "sold" && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Badge, { tone: "red", children: "Sold" })
        ] }),
        off !== null && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(Badge, { tone: "red", children: [
          "\u2212",
          off,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        "button",
        {
          type: "button",
          onClick: () => toggleSaved(product.slug),
          "aria-label": saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`,
          "aria-pressed": saved,
          className: `absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${saved ? "border-[#D81F2A] bg-[#D81F2A] text-white" : "border-white/25 bg-black/40 text-[#EDE5D5] hover:bg-black/60"}`,
          children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(IconHeart, { className: "h-4 w-4", filled: saved })
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex flex-1 flex-col p-3.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-[10px] font-bold tracking-[0.14em] text-[#EDE5D5]/40 uppercase", children: product.category }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(AvailabilityNote, { availability: product.availability })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "mt-1.5 text-[15px] leading-snug font-bold text-[#EDE5D5]", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", onClick: () => onOpen(product.slug), className: "text-left hover:text-white", children: product.name }) }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "mt-1 text-[11px] font-semibold tracking-wide text-[#EDE5D5]/45 uppercase", children: [
        product.condition,
        " \xB7 Size ",
        product.size,
        product.era ? ` \xB7 ${product.era}` : ""
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "font-display text-xl leading-none font-extrabold text-[#EDE5D5]", children: inr(product.price) }),
        product.mrp && product.mrp > product.price && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "text-xs text-[#EDE5D5]/35 line-through", children: inr(product.mrp) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mt-auto flex gap-2 pt-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "button",
          {
            type: "button",
            onClick: () => onOpen(product.slug),
            className: "btn btn-ghost flex-1 px-3 py-2 text-xs",
            children: "View details"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "button",
          {
            type: "button",
            onClick: () => addToBag(product),
            disabled: !available,
            className: "btn btn-primary flex-1 px-3 py-2 text-xs",
            children: available ? "Add to bag" : "Unavailable"
          }
        )
      ] })
    ] })
  ] });
}
var import_jsx_runtime12;
var init_ProductCard = __esm({
  "src/components/ProductCard.tsx"() {
    "use strict";
    init_products();
    init_format();
    init_shop2();
    init_ProductMedia();
    init_ui();
    import_jsx_runtime12 = require("react/jsx-runtime");
  }
});

// src/pages/Home.tsx
function Home({ navigate }) {
  const { products } = useShop();
  const fresh = (0, import_react9.useMemo)(() => {
    const newlyAdded = products.filter((p) => isNewArrival(p));
    return (newlyAdded.length > 0 ? newlyAdded : products).slice(0, 4);
  }, [products]);
  const featured = (0, import_react9.useMemo)(() => products.slice(0, 8), [products]);
  const heroPiece = (0, import_react9.useMemo)(() => products.find(hasPhotos) ?? products[0] ?? null, [products]);
  const photoCount = (0, import_react9.useMemo)(() => products.filter(hasPhotos).length, [products]);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("section", { className: "relative overflow-hidden border-b border-[#EDE5D5]/10", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "fade-up", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "eyebrow flex items-center gap-2 text-[#EDE5D5]/50", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-[#D81F2A]" }),
          " Men's thrift \xB7 ",
          SITE.city,
          ", ",
          SITE.state
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("h1", { className: "display-xl mt-4 text-[clamp(3.25rem,11vw,6.5rem)]", children: [
          "Buy.",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("br", {}),
          "Wear.",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "text-[#D81F2A]", children: "Repeat." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-5 max-w-md text-[15px] leading-relaxed text-[#EDE5D5]/60 sm:text-base", children: "One-of-one pre-loved menswear \u2014 vintage, streetwear, denim and workwear. Hand-picked, checked piece by piece, and priced for real life." }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("button", { onClick: () => navigate("/shop"), className: "btn btn-cream px-6 py-3.5 text-sm", children: [
            "Shop the rack ",
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconArrow, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { onClick: () => navigate("/shop?new=1"), className: "btn btn-ghost px-6 py-3.5 text-sm", children: "New arrivals" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("dl", { className: "mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-[#EDE5D5]/10 pt-5", children: [
          ["1 of 1", "Every piece"],
          ["Checked", "Before listing"],
          ["India-wide", "Delivery"]
        ].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("dt", { className: "font-display text-xl font-extrabold text-[#EDE5D5]", children: v }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("dd", { className: "mt-0.5 text-[10px] font-semibold tracking-[0.14em] text-[#EDE5D5]/35 uppercase", children: l })
        ] }, l)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "relative overflow-hidden rounded-2xl border border-[#EDE5D5]/14 bg-[#121014]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "product-frame", children: heroPiece ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ProductMedia, { product: heroPiece, priority: true, sizes: "(max-width: 1024px) 100vw, 45vw" }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "h-full w-full animate-pulse bg-white/5", "aria-hidden": "true" }) }),
          heroPiece && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "eyebrow text-[#EDE5D5]/55", children: photoCount > 0 ? "On the rack" : "The rack, illustrated" }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-0.5 font-display text-2xl font-extrabold", children: heroPiece.name }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              "button",
              {
                onClick: () => navigate(`/product/${heroPiece.slug}`),
                className: "mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-[#EDE5D5]/80 uppercase hover:text-white",
                children: [
                  "View piece ",
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconArrow, { className: "h-3.5 w-3.5" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "pointer-events-none absolute -top-3 -left-3 rounded-full border border-[#D81F2A]/40 bg-[#D81F2A] px-3 py-1 text-[10px] font-extrabold tracking-[0.16em] text-white uppercase", children: "New drop weekly" })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("section", { "aria-label": "How ordering works", className: "border-b border-[#EDE5D5]/10 bg-[#0b090d]", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6", children: [
      { icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconCheck, { className: "h-4 w-4" }), t: "Quality checked", d: "Each piece inspected, flaws listed honestly" },
      { icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconTruck, { className: "h-4 w-4" }), t: "Ships across India", d: "Delivery confirmed by PIN code at checkout" },
      { icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconWhatsApp, { className: "h-4 w-4" }), t: "Order on WhatsApp", d: "Send your order, we confirm stock personally" }
    ].map((f) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#EDE5D5]/15 bg-white/[0.03] text-[#EDE5D5]/70", children: f.icon }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-sm font-bold text-[#EDE5D5]", children: f.t }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-xs text-[#EDE5D5]/45", children: f.d })
      ] })
    ] }, f.t)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("section", { className: "mx-auto max-w-7xl px-4 pt-12 sm:px-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mb-5 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "eyebrow mb-2 text-[#D81F2A]", children: "Browse" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "display-lg text-2xl sm:text-3xl", children: "Shop by category" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("button", { onClick: () => navigate("/shop"), className: "inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]", children: [
          "All pieces ",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconArrow, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0", children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        "button",
        {
          onClick: () => navigate(`/shop?category=${encodeURIComponent(c)}`),
          className: "shrink-0 rounded-full border border-[#EDE5D5]/15 bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-[#EDE5D5]/75 transition hover:border-[#EDE5D5]/35 hover:text-[#EDE5D5]",
          children: c
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("section", { className: "mx-auto max-w-7xl px-4 pt-10 sm:px-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mb-5 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "eyebrow mb-2 text-[#D81F2A]", children: "Fresh on the rack" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "display-lg text-2xl sm:text-3xl", children: "Latest additions" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("button", { onClick: () => navigate("/shop?new=1"), className: "inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]", children: [
          "View all ",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconArrow, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", children: fresh.map((p) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ProductCard, { product: p, onOpen: (s) => navigate(`/product/${s}`), priority: true }, p.slug)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("section", { className: "mx-auto mt-16 max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "grid gap-8 rounded-2xl border border-[#EDE5D5]/12 bg-gradient-to-br from-[#4a1017]/40 to-transparent p-6 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "eyebrow text-[#EDE5D5]/45", children: "The shop" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "display-lg mt-2 text-3xl sm:text-4xl", children: "Thrift, done properly" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-3 max-w-xl text-sm leading-relaxed text-[#EDE5D5]/60", children: "Elevate X Thrift started with a simple idea: good clothing shouldn't be disposable. Every piece is sourced and checked in Panipat, measured by hand and listed once \u2014 no mass production, no restocks, no two the same." }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mt-5 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { onClick: () => navigate("/about"), className: "btn btn-cream px-5 py-3 text-sm", children: "Our story" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("a", { href: SITE.instagramUrl, target: "_blank", rel: "noreferrer", className: "btn btn-ghost px-5 py-3 text-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconInstagram, { className: "h-4 w-4" }),
            " ",
            SITE.instagramHandle
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("ul", { className: "grid gap-2.5 text-sm", children: [
        "One-of-one pieces \u2014 when it's gone, it's gone",
        "Honest condition grading and listed flaws",
        "Listed once, exactly as it is",
        "Reusing quality clothing instead of buying new"
      ].map((t) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("li", { className: "flex items-start gap-2.5 text-[#EDE5D5]/70", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-[#D81F2A]" }),
        " ",
        t
      ] }, t)) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("section", { className: "mx-auto max-w-7xl px-4 pt-14 sm:px-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mb-5 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "eyebrow mb-2 text-[#D81F2A]", children: "Handpicked" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "display-lg text-2xl sm:text-3xl", children: "Featured pieces" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("button", { onClick: () => navigate("/shop"), className: "inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]", children: [
          "Shop all ",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconArrow, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ProductCard, { product: p, onOpen: (s) => navigate(`/product/${s}`) }, p.slug)) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("section", { className: "mx-auto mt-16 max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#EDE5D5]/12 bg-[#0d0b0f] p-6 sm:flex-row sm:items-center sm:p-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "eyebrow text-[#EDE5D5]/40", children: "Questions before you buy?" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-1 font-display text-2xl font-extrabold uppercase", children: "Talk to us directly" }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "mt-1 text-sm text-[#EDE5D5]/50", children: "Sizes, measurements, holds or delivery \u2014 we usually reply within a few hours." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("a", { href: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Elevate X Thrift! I have a question about a piece.")}`, target: "_blank", rel: "noreferrer", className: "btn btn-whatsapp px-5 py-3 text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconWhatsApp, { className: "h-4 w-4" }),
          " WhatsApp"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("a", { href: SITE.emailHref, className: "btn btn-ghost px-5 py-3 text-sm", children: "Email" })
      ] })
    ] }) })
  ] });
}
var import_react9, import_jsx_runtime13;
var init_Home = __esm({
  "src/pages/Home.tsx"() {
    "use strict";
    import_react9 = require("react");
    init_ProductCard();
    init_site();
    init_products();
    init_shop2();
    init_ProductMedia();
    init_ui();
    import_jsx_runtime13 = require("react/jsx-runtime");
  }
});

// src/pages/ProductPage.tsx
function ProductPage({
  slug,
  navigate
}) {
  const { products, bySlug, addToBag, toggleSaved, isSaved, notify } = useShop();
  const product = bySlug.get(slug);
  const [active, setActive] = (0, import_react10.useState)(0);
  const [qty, setQty] = (0, import_react10.useState)(1);
  const [zoom, setZoom] = (0, import_react10.useState)(false);
  (0, import_react10.useEffect)(() => {
    setActive(0);
    setQty(1);
    setZoom(false);
  }, [slug]);
  if (!product) {
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mx-auto max-w-3xl px-4 py-24 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "eyebrow text-[#D81F2A]", children: "404" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h1", { className: "display-lg mt-2 text-4xl", children: "We couldn't find that piece" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mt-3 text-sm text-[#EDE5D5]/55", children: "It may have sold \u2014 every piece is one of one." }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { onClick: () => navigate("/shop"), className: "btn btn-cream mt-6 px-6 py-3 text-sm", children: "Browse the rack" })
    ] });
  }
  const off = discountPercent(product);
  const available = isAvailable(product);
  const saved = isSaved(product.slug);
  const image = product.images[active];
  const related = (0, import_react10.useMemo)(
    () => products.filter((p) => p.slug !== product.slug).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 4),
    [products, product.slug, product.category]
  );
  const guide = CONDITION_GUIDE.find((g) => g.label === product.condition);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("nav", { "aria-label": "Breadcrumb", className: "mb-5 flex items-center gap-1.5 text-xs text-[#EDE5D5]/40", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: "/", className: "hover:text-[#EDE5D5]", children: "Home" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { "aria-hidden": "true", children: "/" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: `/shop?category=${encodeURIComponent(product.category)}`, className: "hover:text-[#EDE5D5]", children: product.category }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { "aria-hidden": "true", children: "/" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "truncate text-[#EDE5D5]/60", children: product.name })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "relative overflow-hidden rounded-2xl border border-[#EDE5D5]/12 bg-[#121014]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "button",
            {
              type: "button",
              onClick: () => setZoom((z) => !z),
              "aria-label": zoom ? "Reset image zoom" : "Zoom image",
              className: "product-frame block w-full cursor-zoom-in overflow-hidden",
              style: { aspectRatio: "4 / 5" },
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ProductMedia, { product, image, priority: true, sizes: "(max-width: 1024px) 100vw, 55vw", className: zoom ? "scale-150 cursor-zoom-out transition-transform duration-500" : "transition-transform duration-500" })
            }
          ),
          product.images.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#EDE5D5]/70 uppercase backdrop-blur", children: "Illustration \u2014 photo coming soon" })
        ] }),
        product.images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5", role: "group", "aria-label": "Product images", children: product.images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setActive(i),
            "aria-label": `Show ${KIND_LABEL[img.kind]} image`,
            "aria-pressed": i === active,
            className: `product-frame overflow-hidden rounded-lg border transition ${i === active ? "border-[#EDE5D5]" : "border-[#EDE5D5]/15 opacity-70 hover:opacity-100"}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ProductMedia, { product, image: img, sizes: "120px" })
          },
          img.src + i
        )) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "eyebrow text-[#D81F2A]", children: product.category }),
          product.tag && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Badge, { tone: "bone", children: product.tag })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h1", { className: "display-lg mt-2 text-4xl sm:text-5xl", children: product.name }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mt-3 flex flex-wrap items-baseline gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "font-display text-3xl font-extrabold", children: inr(product.price) }),
          product.mrp && product.mrp > product.price && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-base text-[#EDE5D5]/35 line-through", children: inr(product.mrp) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(Badge, { tone: "red", children: [
              off,
              "% off MRP"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mt-1 text-[11px] text-[#EDE5D5]/35", children: "Inclusive of all taxes. Delivery confirmed at checkout." }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[#EDE5D5]/10 py-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(AvailabilityNote, { availability: product.availability }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-xs text-[#EDE5D5]/40", children: "\xB7" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "text-xs font-semibold text-[#EDE5D5]/65", children: [
            "Condition: ",
            product.condition
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-xs text-[#EDE5D5]/40", children: "\xB7" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "text-xs font-semibold text-[#EDE5D5]/65", children: [
            "Size ",
            product.size
          ] }),
          product.era && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-xs text-[#EDE5D5]/40", children: "\xB7" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-xs font-semibold text-[#EDE5D5]/65", children: product.era })
          ] })
        ] }),
        product.description && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mt-4 text-sm leading-relaxed text-[#EDE5D5]/65", children: product.description }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Stepper, { qty, onChange: setQty, label: product.name, max: available ? 5 : 1, disabled: !available }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "button",
            {
              type: "button",
              disabled: !available,
              onClick: () => {
                addToBag(product, { qty });
                setQty(1);
              },
              className: "btn btn-primary flex-1 px-6 py-3.5 text-sm",
              children: available ? "Add to bag" : "Unavailable"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mt-2 flex gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "button",
            {
              type: "button",
              onClick: () => {
                toggleSaved(product.slug);
                notify(saved ? "Removed from wishlist" : "Saved to wishlist");
              },
              "aria-pressed": saved,
              className: `btn flex-1 px-5 py-3 text-sm ${saved ? "border border-[#D81F2A] bg-[#D81F2A]/15 text-[#ff9ba1]" : "btn-ghost"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconHeart, { className: "h-4 w-4", filled: saved }),
                " ",
                saved ? "Saved" : "Save"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "a",
            {
              href: waLink(`Hi! I'm interested in "${product.name}" (Size ${product.size}, ${inr(product.price)}) \u2014 is it still available?`),
              target: "_blank",
              rel: "noreferrer",
              className: "btn btn-ghost flex-1 px-5 py-3 text-sm",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconWhatsApp, { className: "h-4 w-4" }),
                " Ask about this"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { className: "mt-2 flex items-center gap-1.5 text-[11px] text-[#EDE5D5]/40", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconTruck, { className: "h-4 w-4" }),
          " ",
          DELIVERY.note
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("dl", { className: "mt-6 divide-y divide-[#EDE5D5]/8 rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-start justify-between gap-4 p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase", children: "Condition" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("dd", { className: "max-w-[62%] text-right text-sm text-[#EDE5D5]/80", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "font-bold", children: product.condition }),
              guide && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "mt-0.5 block text-xs text-[#EDE5D5]/45", children: guide.copy })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-start justify-between gap-4 p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase", children: "Size" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "text-right text-sm font-bold text-[#EDE5D5]/85", children: product.size })
          ] }),
          product.measurements && product.measurements.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase", children: "Measurements" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-[#EDE5D5]/75", children: product.measurements.map((m) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between gap-3 border-b border-dashed border-[#EDE5D5]/10 pb-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-[#EDE5D5]/50", children: m.label }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "font-semibold", children: m.value })
            ] }, m.label)) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "mt-2 text-[11px] text-[#EDE5D5]/35", children: 'Measured flat, in inches. Allow ~0.5" tolerance.' })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-start justify-between gap-4 p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase", children: "Measurements" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("dd", { className: "max-w-[62%] text-right text-sm text-[#EDE5D5]/55", children: [
              "Not measured yet \u2014",
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: waLink(`Hi! Can you share measurements for "${product.name}"?`), target: "_blank", rel: "noreferrer", className: "font-semibold text-[#EDE5D5] underline underline-offset-2", children: "ask us on WhatsApp" })
            ] })
          ] }),
          product.fabric && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-start justify-between gap-4 p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase", children: "Fabric" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "max-w-[62%] text-right text-sm text-[#EDE5D5]/80", children: product.fabric })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dt", { className: "text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase", children: "Flaws & notes" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("dd", { className: "mt-1 text-sm text-[#EDE5D5]/70", children: product.flaws && product.flaws.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ul", { className: "list-inside list-disc space-y-1", children: product.flaws.map((f) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("li", { children: f }, f)) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-[#EDE5D5]/50", children: "No notable flaws found during our check. As a pre-loved piece it may show light signs of wear." }) })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { className: "mt-4 text-[11px] leading-relaxed text-[#EDE5D5]/35", children: [
          "One-of-one piece \u2014 the size, condition and details describe this exact garment.",
          " ",
          product.images.length > 0 ? "Photographs show this piece; there is no stock imagery or re-order." : "Photographs are being added; the illustration above is a placeholder, not the garment."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("section", { className: "mt-16", "aria-labelledby": "related-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mb-5 flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { id: "related-heading", className: "display-lg text-2xl sm:text-3xl", children: "More from the rack" }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("a", { href: "/shop", className: "inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]", children: [
          "View all ",
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(IconArrow, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ProductCard, { product: p, onOpen: (s) => navigate(`/product/${s}`) }, p.slug)) })
    ] })
  ] });
}
var import_react10, import_jsx_runtime14, KIND_LABEL;
var init_ProductPage = __esm({
  "src/pages/ProductPage.tsx"() {
    "use strict";
    import_react10 = require("react");
    init_shop();
    init_products();
    init_format();
    init_shop2();
    init_ProductMedia();
    init_ui();
    init_ProductCard();
    init_site();
    import_jsx_runtime14 = require("react/jsx-runtime");
    KIND_LABEL = {
      front: "Front",
      back: "Back",
      detail: "Detail",
      fabric: "Fabric",
      label: "Label"
    };
  }
});

// src/pages/Shop.tsx
function Shop({
  navigate,
  params,
  setParams,
  headingOverride
}) {
  const { saved, products, catalogueStatus } = useShop();
  const [query, setQuery] = (0, import_react11.useState)(params.get("q") ?? "");
  const category = params.get("category") ?? "All";
  const sort = params.get("sort") ?? "featured";
  const newOnly = params.get("new") === "1";
  const wishlistOnly = params.get("wishlist") === "1";
  const condition = params.get("condition") ?? "";
  const urlQuery = params.get("q") ?? "";
  (0, import_react11.useEffect)(() => setQuery(urlQuery), [urlQuery]);
  const results = (0, import_react11.useMemo)(() => {
    const q = urlQuery.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (condition && p.condition !== condition) return false;
      if (newOnly && !isNewArrival(p)) return false;
      if (wishlistOnly && !saved.includes(p.slug)) return false;
      if (!q) return true;
      return [p.name, p.category, p.condition, p.era, p.description ?? ""].join(" ").toLowerCase().includes(q);
    });
    switch (sort) {
      case "low":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "high":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "discount":
        list = [...list].sort((a, b) => (discountPercent(b) ?? -1) - (discountPercent(a) ?? -1));
        break;
      case "newest":
        list = [...list].sort((a, b) => (b.addedAt ?? "").localeCompare(a.addedAt ?? ""));
        break;
      default:
        list = [...list].sort((a, b) => Number(Boolean(b.tag)) - Number(Boolean(a.tag)));
    }
    return list;
  }, [category, condition, newOnly, wishlistOnly, sort, urlQuery, saved, products]);
  const activeFilters = [
    category !== "All" && { key: "category", label: category },
    condition && { key: "condition", label: condition },
    newOnly && { key: "new", label: "New arrivals" },
    wishlistOnly && { key: "wishlist", label: "Wishlist" },
    urlQuery && { key: "q", label: `\u201C${urlQuery}\u201D` }
  ].filter(Boolean);
  const heading = headingOverride ?? {
    eyebrow: wishlistOnly ? "Saved pieces" : newOnly ? "Fresh on the rack" : "The full rack",
    title: wishlistOnly ? "Your wishlist" : newOnly ? "New arrivals" : "Shop all",
    blurb: wishlistOnly ? "Pieces you have your eye on. Saved on this device \u2014 message us on WhatsApp to reserve one." : "Every piece is one of one, quality checked and priced for real life."
  };
  const submitSearch = (e) => {
    e.preventDefault();
    setParams({ q: query.trim() || null });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex flex-wrap items-end justify-between gap-5 border-b border-[#EDE5D5]/10 pb-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "eyebrow mb-2 text-[#D81F2A]", children: heading.eyebrow }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h1", { className: "display-lg text-4xl sm:text-5xl", children: heading.title }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-2 max-w-xl text-sm text-[#EDE5D5]/50", children: heading.blurb })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("label", { htmlFor: "sort", className: "sr-only", children: "Sort products" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "select",
          {
            id: "sort",
            value: sort,
            onChange: (e) => setParams({ sort: e.target.value === "featured" ? null : e.target.value }),
            className: "rounded-full border border-[#EDE5D5]/16 bg-[#131116] px-4 py-2.5 text-sm font-semibold text-[#EDE5D5] focus:border-[#EDE5D5]/35 focus:outline-none",
            children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("option", { value: s.value, children: s.label }, s.value))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mt-5 space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0", role: "group", "aria-label": "Filter by category", children: ["All", ...CATEGORIES].map((c) => {
        const active = c === "All" ? category === "All" : category === c;
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "button",
          {
            type: "button",
            "aria-pressed": active,
            onClick: () => setParams({ category: c === "All" ? null : c }),
            className: cx(
              "shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition",
              active ? "border-transparent bg-[#EDE5D5] text-[#0b0a0c]" : "border-[#EDE5D5]/15 bg-white/[0.03] text-[#EDE5D5]/70 hover:border-[#EDE5D5]/30 hover:text-[#EDE5D5]"
            ),
            children: c
          },
          c
        );
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("form", { onSubmit: submitSearch, className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("label", { htmlFor: "shop-search", className: "sr-only", children: "Search this collection" }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            "input",
            {
              id: "shop-search",
              type: "search",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Search this collection",
              className: "w-full min-w-[13rem] rounded-full border border-[#EDE5D5]/15 bg-white/[0.03] px-4 py-2 text-sm text-[#EDE5D5] placeholder:text-[#EDE5D5]/35 focus:border-[#EDE5D5]/35 focus:outline-none sm:w-64"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("label", { htmlFor: "condition", className: "sr-only", children: "Filter by condition" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
          "select",
          {
            id: "condition",
            value: condition,
            onChange: (e) => setParams({ condition: e.target.value || null }),
            className: "rounded-full border border-[#EDE5D5]/15 bg-[#131116] px-4 py-2 text-sm font-semibold text-[#EDE5D5]/80 focus:border-[#EDE5D5]/35 focus:outline-none",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("option", { value: "", children: "Any condition" }),
              CONDITIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("option", { value: c, children: c }, c))
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "button",
          {
            type: "button",
            "aria-pressed": wishlistOnly,
            onClick: () => setParams({ wishlist: wishlistOnly ? null : "1" }),
            className: cx(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              wishlistOnly ? "border-transparent bg-[#D81F2A] text-white" : "border-[#EDE5D5]/15 bg-white/[0.03] text-[#EDE5D5]/70 hover:text-[#EDE5D5]"
            ),
            children: "\u2665 Wishlist"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("span", { className: "ml-auto text-xs text-[#EDE5D5]/40", "aria-live": "polite", children: [
          results.length,
          " ",
          results.length === 1 ? "piece" : "pieces"
        ] })
      ] }),
      activeFilters.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex flex-wrap items-center gap-2", children: [
        activeFilters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => setParams({ [f.key]: null }),
            className: "inline-flex items-center gap-1.5 rounded-full border border-[#EDE5D5]/20 bg-white/5 px-3 py-1 text-xs font-semibold text-[#EDE5D5]/80 hover:border-[#EDE5D5]/40",
            children: [
              f.label,
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { "aria-hidden": "true", children: "\u2715" }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "sr-only", children: "Remove filter" })
            ]
          },
          f.key
        )),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "button",
          {
            type: "button",
            onClick: () => {
              setQuery("");
              setParams({ category: null, condition: null, q: null, new: null, wishlist: null, sort: null });
            },
            className: "text-xs font-semibold text-[#EDE5D5]/45 underline-offset-4 hover:text-[#EDE5D5] hover:underline",
            children: "Clear all"
          }
        )
      ] })
    ] }),
    catalogueStatus === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4", "aria-hidden": "true", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "overflow-hidden rounded-2xl border border-[#EDE5D5]/10 bg-white/[0.02]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "animate-pulse bg-white/5", style: { aspectRatio: "4 / 5" } }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "space-y-2 p-3.5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "h-2.5 w-1/3 animate-pulse rounded bg-white/10" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "h-3 w-3/4 animate-pulse rounded bg-white/10" }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "h-6 w-1/2 animate-pulse rounded bg-white/10" })
      ] })
    ] }, i)) }) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mt-16 rounded-2xl border border-dashed border-[#EDE5D5]/15 bg-white/[0.02] px-6 py-16 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "font-display text-3xl font-bold uppercase", children: wishlistOnly ? "Nothing saved yet" : "No pieces match that" }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mx-auto mt-2 max-w-sm text-sm text-[#EDE5D5]/50", children: wishlistOnly ? "Tap the heart on any piece to save it here." : urlQuery ? `We couldn't find \u201C${urlQuery}\u201D. Try a broader search or browse a category.` : "Try a different category or condition." }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        "button",
        {
          type: "button",
          onClick: () => {
            setQuery("");
            setParams({ category: null, condition: null, q: null, new: null, wishlist: null });
          },
          className: "btn btn-cream mt-6 px-6 py-2.5 text-sm",
          children: "Show all pieces"
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4", children: results.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ProductCard, { product: p, onOpen: (slug) => navigate(`/product/${slug}`), priority: i < 4 }, p.slug)) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "mt-10 text-center text-xs text-[#EDE5D5]/35", children: "Favourites and your bag are saved on this device. Every piece is one of one." })
  ] });
}
var import_react11, import_jsx_runtime15, SORTS;
var init_Shop = __esm({
  "src/pages/Shop.tsx"() {
    "use strict";
    import_react11 = require("react");
    init_ProductCard();
    init_products();
    init_shop();
    init_format();
    init_shop2();
    import_jsx_runtime15 = require("react/jsx-runtime");
    SORTS = [
      { value: "featured", label: "Featured" },
      { value: "newest", label: "Newest" },
      { value: "low", label: "Price: low to high" },
      { value: "high", label: "Price: high to low" },
      { value: "discount", label: "Biggest saving" }
    ];
  }
});

// src/App.tsx
var App_exports = {};
__export(App_exports, {
  default: () => App
});
function Shell() {
  const { route, navigate, params, url } = useRouter();
  const { toast, count, catalogueError } = useShop();
  const [bagOpen, setBagOpen] = (0, import_react12.useState)(false);
  const [query, setQuery] = (0, import_react12.useState)("");
  (0, import_react12.useEffect)(() => {
    setQuery(params.get("q") ?? "");
  }, [url]);
  const setParams = (0, import_react12.useCallback)((next) => {
    const p = new URLSearchParams(window.location.search);
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === "") p.delete(k);
      else p.set(k, v);
    }
    const qs = p.toString();
    navigate(`${window.location.pathname}${qs ? `?${qs}` : ""}`, { keepScroll: true });
  }, [navigate]);
  (0, import_react12.useEffect)(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setBagOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "relative flex min-h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("a", { href: "#main", className: "skip-link", children: "Skip to content" }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      Header,
      {
        route: route.name,
        navigate,
        onOpenBag: () => setBagOpen(true),
        query,
        onQuery: (q) => {
          setQuery(q);
        }
      }
    ),
    catalogueError && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("p", { role: "status", className: "border-b border-[#d8a423]/25 bg-[#d8a423]/10 px-4 py-2 text-center text-xs text-[#f0d79a]", children: [
      "Showing the built-in catalogue \u2014 ",
      catalogueError
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("main", { id: "main", className: "flex-1", children: [
      route.name === "home" && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Home, { navigate }),
      route.name === "shop" && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        Shop,
        {
          navigate,
          params,
          setParams,
          headingOverride: window.location.pathname === "/new-arrivals" ? { eyebrow: "Fresh on the rack", title: "New arrivals", blurb: "The most recent pieces to land on the rack." } : void 0
        }
      ),
      route.name === "product" && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ProductPage, { slug: route.slug, navigate }, route.slug),
      route.name === "checkout" && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Checkout, { navigate }),
      route.name === "about" && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(About, { navigate }),
      route.name === "contact" && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Contact, {}),
      route.name === "notfound" && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "mx-auto max-w-lg px-4 py-24 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "eyebrow text-[#D81F2A]", children: "404" }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h1", { className: "display-lg mt-2 text-4xl", children: "This page doesn't exist" }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "mt-3 text-sm text-[#EDE5D5]/55", children: "The link may be old, or the piece may have sold." }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("button", { onClick: () => navigate("/shop"), className: "btn btn-cream mt-6 px-6 py-3 text-sm", children: "Browse the rack" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Footer, { navigate }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(BagDrawer, { open: bagOpen, onClose: () => setBagOpen(false), navigate }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "a",
      {
        href: "https://wa.me/918571064108?text=Hi%20Elevate%20X%20Thrift!%20I%20have%20a%20question%20about%20a%20piece.",
        target: "_blank",
        rel: "noreferrer",
        "aria-label": "Chat with Elevate X Thrift on WhatsApp",
        className: `fixed right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#1fb457] text-[#04150a] shadow-lg shadow-black/50 transition hover:bg-[#24c962] sm:right-6 sm:bottom-6 sm:h-14 sm:w-14 ${count > 0 && !bagOpen ? "bottom-20" : "bottom-4"}`,
        children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("svg", { viewBox: "0 0 24 24", className: "h-6 w-6 sm:h-7 sm:w-7", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("path", { d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.31-1.93 1.36-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.2-4.94-4.4-.14-.19-1.16-1.55-1.16-2.95s.73-2.09 1-2.38c.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z" }) })
      }
    ),
    count > 0 && !bagOpen && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      "button",
      {
        onClick: () => setBagOpen(true),
        className: "fixed inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-full bg-[#EDE5D5] px-5 py-3 text-sm font-bold text-[#0b0a0c] shadow-xl shadow-black/60 sm:hidden",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("span", { children: [
            count,
            " ",
            count === 1 ? "piece" : "pieces",
            " in bag"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { children: "View bag \u2192" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { "aria-live": "polite", "aria-atomic": "true", children: toast && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "toast-in fixed bottom-20 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-[#EDE5D5]/15 bg-[#131116] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[#EDE5D5] shadow-xl sm:bottom-6", children: toast }) })
  ] });
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ShopProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Shell, {}) });
}
var import_react12, import_jsx_runtime16;
var init_App = __esm({
  "src/App.tsx"() {
    "use strict";
    import_react12 = require("react");
    init_BagDrawer();
    init_Footer();
    init_Header();
    init_router();
    init_shop2();
    init_About();
    init_Checkout();
    init_Contact();
    init_Home();
    init_ProductPage();
    init_Shop();
    import_jsx_runtime16 = require("react/jsx-runtime");
  }
});

// tests/journey.test.tsx
var import_jsdom = require("jsdom");
var import_strict = __toESM(require("node:assert/strict"), 1);
var import_node_test = require("node:test");
var expect = (actual) => ({
  toBe: (expected) => import_strict.default.equal(actual, expected),
  toEqual: (expected) => import_strict.default.deepEqual(actual, expected),
  toBeTruthy: () => import_strict.default.ok(actual, `expected truthy, got ${actual}`),
  toBeNull: () => import_strict.default.equal(actual, null),
  toBeGreaterThan: (n) => import_strict.default.ok(actual > n, `expected > ${n}, got ${actual}`),
  toContain: (v) => import_strict.default.ok(actual.includes(v), `expected to contain ${v}`),
  toMatch: (re) => import_strict.default.match(String(actual), re),
  not: { toMatch: (re) => import_strict.default.doesNotMatch(String(actual), re) }
});
var dom = new import_jsdom.JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/" });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
try {
  Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
} catch {
}
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.HTMLInputElement = dom.window.HTMLInputElement;
globalThis.HTMLTextAreaElement = dom.window.HTMLTextAreaElement;
globalThis.HTMLSelectElement = dom.window.HTMLSelectElement;
globalThis.Node = dom.window.Node;
globalThis.Event = dom.window.Event;
globalThis.MouseEvent = dom.window.MouseEvent;
globalThis.KeyboardEvent = dom.window.KeyboardEvent;
globalThis.getComputedStyle = dom.window.getComputedStyle;
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
Object.defineProperty(dom.window, "scrollTo", { value: () => {
}, writable: true });
Object.defineProperty(dom.window.HTMLElement.prototype, "scrollIntoView", { value: () => {
}, writable: true });
var { render, screen, fireEvent, cleanup, waitFor, within } = require("@testing-library/react");
var React = require("react");
var App2 = (init_App(), __toCommonJS(App_exports)).default;
var { PRODUCTS: PRODUCTS2, CATEGORIES: CATEGORIES2 } = (init_products(), __toCommonJS(products_exports));
var { buildOrderMessage: buildOrderMessage2, makeReference: makeReference2 } = (init_order(), __toCommonJS(order_exports));
var { isValidPhone: isValidPhone2, isValidPin: isValidPin2 } = (init_validate(), __toCommonJS(validate_exports));
var mount = (path = "/") => {
  dom.window.history.replaceState({}, "", path);
  return render(React.createElement(App2));
};
var bagCount = () => screen.getByTestId("bag-count").textContent;
(0, import_node_test.beforeEach)(() => {
  dom.window.localStorage.clear();
});
(0, import_node_test.afterEach)(() => {
  cleanup();
});
(0, import_node_test.describe)("catalogue", () => {
  (0, import_node_test.test)("contains no women's categories or garments", () => {
    const banned = ["dress", "skirt", "women", "womens", "female"];
    for (const c of CATEGORIES2) {
      expect(banned.some((b) => c.toLowerCase().includes(b))).toBe(false);
    }
    for (const p of PRODUCTS2) {
      const hay = `${p.name} ${p.category} ${p.description ?? ""}`.toLowerCase();
      expect(banned.some((b) => hay.includes(b))).toBe(false);
    }
    expect(PRODUCTS2.length).toBeGreaterThan(0);
  });
  (0, import_node_test.test)("every product has honest, required fields", () => {
    for (const p of PRODUCTS2) {
      expect(p.slug).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(["Excellent", "Like New", "Good", "Vintage"]).toContain(p.condition);
      expect(["in-stock", "reserved", "sold"]).toContain(p.availability);
      if (p.mrp) expect(p.mrp).toBeGreaterThan(p.price);
    }
  });
});
(0, import_node_test.describe)("bag", () => {
  (0, import_node_test.test)("empty bag shows 0, add to bag updates count and subtotal", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    expect(bagCount()).toBe("0");
    const card = screen.getAllByText("Add to bag")[0];
    fireEvent.click(card);
    await waitFor(() => expect(bagCount()).toBe("1"));
    fireEvent.click(screen.getByLabelText(/Open shopping bag/));
    expect(await screen.findByText("Place order")).toBeTruthy();
    expect(screen.getAllByText("\u20B91,299").length).toBeGreaterThan(0);
  });
  (0, import_node_test.test)("quantity change updates the subtotal, removal empties the bag", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    fireEvent.click(screen.getAllByText("Add to bag")[0]);
    fireEvent.click(await screen.findByLabelText(/Open shopping bag/));
    fireEvent.click(await screen.findByLabelText(/Increase quantity of Sunset Denim Jacket/));
    await waitFor(() => expect(bagCount()).toBe("2"));
    expect(screen.getAllByText("\u20B92,598").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByLabelText(/Remove Sunset Denim Jacket from bag/));
    await waitFor(() => expect(bagCount()).toBe("0"));
    expect(await screen.findByText("Your bag is empty")).toBeTruthy();
  });
  (0, import_node_test.test)("cart persists across a reload", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    fireEvent.click(screen.getAllByText("Add to bag")[0]);
    await waitFor(() => expect(bagCount()).toBe("1"));
    cleanup();
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    await waitFor(() => expect(bagCount()).toBe("1"));
  });
});
(0, import_node_test.describe)("checkout", () => {
  const fill = (label, value) => {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  };
  (0, import_node_test.test)("blocks submission and highlights missing fields", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    fireEvent.click(screen.getAllByText("Add to bag")[0]);
    fireEvent.click(await screen.findByLabelText(/Open shopping bag/));
    fireEvent.click(await screen.findByText("Place order"));
    expect(await screen.findByRole("heading", { name: /Checkout/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Review order/ }));
    expect(await screen.findByText(/fields need|field needs/)).toBeTruthy();
    expect(screen.getByText("Please enter your full name.")).toBeTruthy();
    expect(screen.queryByText("Confirm order on WhatsApp")).toBeNull();
  });
  (0, import_node_test.test)("rejects invalid mobile and PIN", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    fireEvent.click(screen.getAllByText("Add to bag")[0]);
    fireEvent.click(await screen.findByLabelText(/Open shopping bag/));
    fireEvent.click(await screen.findByText("Place order"));
    await screen.findByRole("heading", { name: /Checkout/ });
    fill(/Full name/, "Kartik Tyagi");
    fill(/Mobile number/, "12345");
    fill(/Email address/, "not-an-email");
    fill(/House/, "12");
    fill(/Street/, "Model Town");
    fill(/City/, "Panipat");
    fill(/PIN code/, "12");
    fireEvent.click(screen.getByRole("button", { name: /Review order/ }));
    expect(await screen.findByText(/10-digit Indian mobile number/)).toBeTruthy();
    expect(screen.getByText(/email doesn't look right/i)).toBeTruthy();
    expect(screen.getByText(/PIN code must be 6 digits/)).toBeTruthy();
  });
  (0, import_node_test.test)("valid details reach review with the full summary and back to edit", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    fireEvent.click(screen.getAllByText("Add to bag")[0]);
    fireEvent.click(await screen.findByLabelText(/Open shopping bag/));
    fireEvent.click(await screen.findByText("Place order"));
    await screen.findByRole("heading", { name: /Checkout/ });
    fill(/Full name/, "Kartik Tyagi");
    fill(/Mobile number/, "9876543210");
    fill(/Email address/, "kartik@example.com");
    fill(/House/, "12-A");
    fill(/Street/, "Model Town");
    fill(/City/, "Panipat");
    fireEvent.change(screen.getByLabelText(/State/), { target: { value: "Haryana" } });
    fill(/PIN code/, "132103");
    fireEvent.click(screen.getByRole("button", { name: /Review order/ }));
    expect(await screen.findByRole("heading", { name: /Review your order/ })).toBeTruthy();
    expect(screen.getByText("Kartik Tyagi")).toBeTruthy();
    expect(screen.getByText("9876543210")).toBeTruthy();
    expect(screen.getByText(/132103/)).toBeTruthy();
    expect(screen.getByText(/To be confirmed/)).toBeTruthy();
    fireEvent.click(screen.getAllByText("Edit details")[0]);
    expect(await screen.findByRole("heading", { name: /Checkout/ })).toBeTruthy();
    expect(screen.getByLabelText(/Full name/).value).toBe("Kartik Tyagi");
  });
  (0, import_node_test.test)("confirm opens WhatsApp and is explicit that nothing is placed yet", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    fireEvent.click(screen.getAllByText("Add to bag")[0]);
    fireEvent.click(await screen.findByLabelText(/Open shopping bag/));
    fireEvent.click(await screen.findByText("Place order"));
    await screen.findByRole("heading", { name: /Checkout/ });
    fill(/Full name/, "Kartik Tyagi");
    fill(/Mobile number/, "9876543210");
    fill(/Email address/, "kartik@example.com");
    fill(/House/, "12-A");
    fill(/Street/, "Model Town");
    fill(/City/, "Panipat");
    fireEvent.change(screen.getByLabelText(/State/), { target: { value: "Haryana" } });
    fill(/PIN code/, "132103");
    fireEvent.click(screen.getByRole("button", { name: /Review order/ }));
    await screen.findByRole("heading", { name: /Review your order/ });
    let opened = "";
    dom.window.open = (url) => {
      opened = url;
      return {};
    };
    fireEvent.click(screen.getByRole("button", { name: /Confirm order on WhatsApp/ }));
    await screen.findByText(/press Send in WhatsApp/i);
    expect(opened.startsWith("https://wa.me/918571064108?text=")).toBe(true);
    const decoded = decodeURIComponent(opened.split("text=")[1]);
    expect(decoded).toContain("Kartik Tyagi");
    expect(decoded).toContain("9876543210");
    expect(decoded).toContain("kartik@example.com");
    expect(decoded).toContain("Sunset Denim Jacket");
    expect(decoded).toContain("132103");
    expect(decoded).toContain("Subtotal:");
  });
});
(0, import_node_test.describe)("order message", () => {
  (0, import_node_test.test)("contains everything the shop needs and never claims payment", () => {
    const p = PRODUCTS2[0];
    const msg = buildOrderMessage2({
      lines: [{ product: p, size: p.size, qty: 2, lineTotal: p.price * 2 }],
      subtotal: p.price * 2,
      deliveryCharge: null,
      total: null,
      details: {
        fullName: "Kartik",
        phone: "9876543210",
        email: "k@example.com",
        house: "12",
        street: "Model Town",
        landmark: "",
        city: "Panipat",
        state: "Haryana",
        pin: "132103",
        country: "India",
        notes: "Call before delivery"
      },
      reference: makeReference2()
    });
    expect(msg).toMatch(/NEW ORDER/);
    expect(msg).toMatch(/Ref: ET-/);
    expect(msg).toMatch(/Delivery: To be confirmed/);
    expect(msg).toMatch(/Total: Subtotal \+ delivery/);
    expect(msg).toMatch(/Call before delivery/);
    expect(msg.toLowerCase()).not.toMatch(/paid|payment successful|order received/);
  });
});
(0, import_node_test.describe)("validation helpers", () => {
  (0, import_node_test.test)("indian mobile numbers", () => {
    expect(isValidPhone2("9876543210")).toBe(true);
    expect(isValidPhone2("+91 98765 43210")).toBe(true);
    expect(isValidPhone2("09876543210")).toBe(true);
    expect(isValidPhone2("5876543210")).toBe(false);
    expect(isValidPhone2("98765")).toBe(false);
  });
  (0, import_node_test.test)("pin codes", () => {
    expect(isValidPin2("132103")).toBe(true);
    expect(isValidPin2("012103")).toBe(false);
    expect(isValidPin2("13210")).toBe(false);
  });
});
