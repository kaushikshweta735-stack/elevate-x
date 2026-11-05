import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { DELIVERY } from "../data/shop";
import type { Product } from "../data/products";
import { useCatalogue } from "../lib/cms";

/* ------------------------------------------------------------------ */
/* Cart                                                                */
/* ------------------------------------------------------------------ */

export interface CartLine {
  /** Stable key: one line per product+size (thrift pieces are one-of-one). */
  id: string;
  slug: string;
  size: string;
  qty: number;
}

export interface CartLineView extends CartLine {
  product: Product;
  lineTotal: number;
}

interface State {
  lines: CartLine[];
  saved: string[];        // wishlist slugs
  hydrated: boolean;
}

type Action =
  | { type: "hydrate"; state: Partial<State> }
  | { type: "add"; slug: string; size: string; qty?: number }
  | { type: "qty"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "clear" }
  | { type: "wishlist"; slug: string }
  | { type: "prune"; validSlugs: string[]; soldSlugs: string[] };

const lineId = (slug: string, size: string) => `${slug}::${size}`;
const MAX_QTY = 5; // thrift stock is tiny — keep a sane ceiling

function reducer(state: State, action: Action): State {
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
          lines: state.lines.map((l) =>
            l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
          ),
        };
      }
      return { ...state, lines: [...state.lines, { id, slug: action.slug, size: action.size, qty: Math.min(MAX_QTY, qty) }] };
    }
    case "qty": {
      if (action.qty <= 0) return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.id === action.id ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l,
        ),
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
        saved: has ? state.saved.filter((s) => s !== action.slug) : [...state.saved, action.slug],
      };
    }
    default:
      return state;
  }
}

const CART_KEY = "elevate.cart.v1";
const SAVED_KEY = "elevate.wishlist.v1";

function readStored(): Partial<State> {
  if (typeof window === "undefined") return {};
  try {
    const rawCart = window.localStorage.getItem(CART_KEY);
    const rawSaved = window.localStorage.getItem(SAVED_KEY);
    const lines: CartLine[] = rawCart ? JSON.parse(rawCart) : [];
    const saved: string[] = rawSaved ? JSON.parse(rawSaved) : [];
    return {
      // structure is validated here; existence/sold-out is reconciled once the
      // catalogue has loaded (see the `prune` effect in ShopProvider)
      lines: Array.isArray(lines)
        ? lines
            .filter((l) => l && typeof l.slug === "string" && typeof l.size === "string")
            .filter((l) => Number.isFinite(l.qty) && l.qty > 0)
            .map((l) => ({ ...l, id: lineId(l.slug, l.size), qty: Math.min(MAX_QTY, Math.round(l.qty)) }))
        : [],
      saved: Array.isArray(saved) ? saved.filter((s) => typeof s === "string") : [],
    };
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------------ */
/* Checkout details (kept separately so "Edit details" survives)       */
/* ------------------------------------------------------------------ */

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  email: string;
  house: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pin: string;
  country: string;
  notes: string;
}

export const EMPTY_DETAILS: CheckoutDetails = {
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
  notes: "",
};

const DETAILS_KEY = "elevate.checkout.v1";

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

interface ShopContextValue {
  /** Live catalogue — CMS-backed when configured, built-in otherwise. */
  products: Product[];
  bySlug: Map<string, Product>;
  catalogueSource: "cms" | "built-in";
  catalogueStatus: "loading" | "ready";
  catalogueError?: string;
  hydrated: boolean;
  lines: CartLineView[];
  count: number;
  subtotal: number;
  deliveryCharge: number | null;
  total: number | null;
  addToBag: (p: Product, opts?: { size?: string; qty?: number; silent?: boolean }) => void;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  clearCart: () => void;
  saved: string[];
  toggleSaved: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  details: CheckoutDetails;
  setDetails: (d: CheckoutDetails) => void;
  toast: string;
  notify: (message: string) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const catalogue = useCatalogue();
  const [state, dispatch] = useReducer(reducer, { lines: [], saved: [], hydrated: false });
  const [toast, setToast] = useState("");
  const [details, setDetailsState] = useState<CheckoutDetails>(EMPTY_DETAILS);
  const toastTimer = useRef<number | undefined>(undefined);

  // hydrate once from localStorage (after mount, so SSR/static HTML stays clean)
  useEffect(() => {
    dispatch({ type: "hydrate", state: readStored() });
    try {
      const raw = window.localStorage.getItem(DETAILS_KEY);
      if (raw) setDetailsState({ ...EMPTY_DETAILS, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(state.lines));
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(state.saved));
    } catch {
      /* storage may be full or blocked — cart still works for this session */
    }
  }, [state.lines, state.saved, state.hydrated]);

  const setDetails = useCallback((d: CheckoutDetails) => {
    setDetailsState(d);
    try {
      window.localStorage.setItem(DETAILS_KEY, JSON.stringify(d));
    } catch { /* ignore */ }
  }, []);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2600);
  }, []);

  const addToBag = useCallback<ShopContextValue["addToBag"]>((p, opts) => {
    const size = opts?.size ?? p.size;
    dispatch({ type: "add", slug: p.slug, size, qty: opts?.qty });
    if (!opts?.silent) notify(`${p.name} added to bag`);
  }, [notify]);

  /* Drop cart/wishlist entries whose piece no longer exists or has sold. */
  useEffect(() => {
    if (!state.hydrated || catalogue.status !== "ready") return;
    dispatch({
      type: "prune",
      validSlugs: catalogue.products.map((p) => p.slug),
      soldSlugs: catalogue.products.filter((p) => p.availability === "sold").map((p) => p.slug),
    });
  }, [state.hydrated, catalogue.status, catalogue.products]);

  const lines = useMemo<CartLineView[]>(
    () =>
      state.lines.flatMap((l) => {
        const product = catalogue.bySlug.get(l.slug);
        if (!product) return [];
        return [{ ...l, product, lineTotal: product.price * l.qty }];
      }),
    [state.lines, catalogue.bySlug],
  );

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  const deliveryCharge = useMemo(() => {
    if (lines.length === 0) return 0;
    const { deliveryCharge: flat, freeDeliveryAbove } = DELIVERY;
    if (freeDeliveryAbove !== null && subtotal >= freeDeliveryAbove) return 0;
    return flat;
  }, [lines.length, subtotal]);

  const total = deliveryCharge === null ? null : subtotal + deliveryCharge;

  const value: ShopContextValue = {
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
    notify,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
