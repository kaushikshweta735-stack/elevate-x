import { SITE, waLink } from "../data/site";
import { DELIVERY } from "../data/shop";
import type { Product } from "../data/products";
import type { CheckoutDetails } from "../store/shop";

export interface OrderLine {
  product: Product;
  size: string;
  qty: number;
  lineTotal: number;
}

export interface OrderDraft {
  lines: OrderLine[];
  subtotal: number;
  deliveryCharge: number | null;
  total: number | null;
  details: CheckoutDetails;
  /** Short human-readable reference, e.g. ET-4F7K2. */
  reference: string;
}

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

/**
 * Short, readable order reference so a customer and the shop can match the
 * WhatsApp message to a record. Not a database id — there is no database yet.
 */
export function makeReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = new Uint8Array(5);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < 5; i++) bytes[i] = Math.floor(Math.random() * 256);
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `ET-${out}`;
}

export function formatAddress(d: CheckoutDetails): string {
  const parts = [
    [d.house, d.street].filter(Boolean).join(", "),
    d.landmark ? `Near ${d.landmark}` : "",
    [d.city, d.state].filter(Boolean).join(", "),
    `${d.pin}`,
    d.country,
  ].filter(Boolean);
  return parts.join("\n");
}

/** Plain-text order — used for the WhatsApp message and local order record. */
export function buildOrderMessage(order: OrderDraft): string {
  const { details: d, lines, subtotal, deliveryCharge, total, reference } = order;

  const items = lines.map(
    (l, i) =>
      `${i + 1}. ${l.product.name}\n   Size: ${l.size}  ×  ${l.qty}  =  ${inr(l.lineTotal)}` +
      (l.product.availability === "reserved" ? "  (on hold)" : ""),
  );

  const delivery =
    deliveryCharge === null
      ? "To be confirmed (by PIN code)"
      : deliveryCharge === 0
        ? "Free"
        : inr(deliveryCharge);

  return [
    `NEW ORDER — ${SITE.brandName}`,
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
    `Subtotal: ${inr(subtotal)}`,
    `Delivery: ${delivery}`,
    total === null ? "Total: Subtotal + delivery (to be confirmed)" : `Total: ${inr(total)}`,
    d.notes.trim() ? `\nOrder notes: ${d.notes.trim()}` : "",
    "",
    "Please confirm availability, delivery charge and payment details.",
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}

export function whatsappOrderLink(order: OrderDraft): string {
  return waLink(buildOrderMessage(order));
}

/* ------------------------------------------------------------------ */
/* Order record                                                        */
/* ------------------------------------------------------------------ */

export const ORDERS_KEY = "elevate.orders.v1";

export interface StoredOrder {
  reference: string;
  createdAt: string;
  status: "whatsapp-opened";
  message: string;
  details: CheckoutDetails;
  items: { slug: string; name: string; size: string; qty: number; price: number }[];
  subtotal: number;
  deliveryCharge: number | null;
  total: number | null;
}

/**
 * We are honest about what this is: a copy of the order request kept on the
 * customer's device, created only *after* they actually open WhatsApp.
 * It is a convenience record, not server-side order capture.
 *
 * ── Adding a real backend later ──────────────────────────────────────
 * Set VITE_ORDERS_ENDPOINT to a POST endpoint (e.g. a Vercel function in
 * /api that writes to a database) and every order will also be sent there.
 * Keep secrets on the server — never in a VITE_ env var.
 */
export async function recordOrder(order: OrderDraft): Promise<void> {
  const record: StoredOrder = {
    reference: order.reference,
    createdAt: new Date().toISOString(),
    status: "whatsapp-opened",
    message: buildOrderMessage(order),
    details: order.details,
    items: order.lines.map((l) => ({
      slug: l.product.slug,
      name: l.product.name,
      size: l.size,
      qty: l.qty,
      price: l.product.price,
    })),
    subtotal: order.subtotal,
    deliveryCharge: order.deliveryCharge,
    total: order.total,
  };

  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    const existing: StoredOrder[] = raw ? JSON.parse(raw) : [];
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify([record, ...existing].slice(0, 25)));
  } catch {
    /* storage blocked — the WhatsApp message is still the source of truth */
  }

  const endpoint = import.meta.env.VITE_ORDERS_ENDPOINT as string | undefined;
  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch {
      /* a failed request must not block the WhatsApp hand-off */
    }
  }
}

export function loadOrders(): StoredOrder[] {
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const deliveryLabel = (charge: number | null) =>
  charge === null ? "Confirmed on WhatsApp" : charge === 0 ? "Free" : inr(charge);

export { DELIVERY };
