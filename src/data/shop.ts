/**
 * Store configuration that is deliberately *not* invented.
 * Delivery cost is unknown until the shop quotes it, so it stays `null`
 * and the UI says so plainly instead of inventing a number.
 * Set `deliveryCharge` (and optionally `freeDeliveryAbove`) to a real value
 * once you know your courier rates and the UI switches to a fixed charge.
 */
export const DELIVERY = {
  /** Flat delivery charge in ₹. `null` = confirmed on WhatsApp. */
  deliveryCharge: null as number | null,
  /** Order value above which delivery is free (₹). `null` = not offered. */
  freeDeliveryAbove: null as number | null,
  /** Shown next to the delivery line. */
  note: "Delivery is calculated by PIN code and confirmed on WhatsApp before payment.",
} as const;

export const CONDITIONS = ["Excellent", "Like New", "Good", "Vintage"] as const;
export type Condition = (typeof CONDITIONS)[number];

export const CONDITION_GUIDE: { label: Condition; copy: string }[] = [
  { label: "Like New", copy: "No visible wear. Looks unworn, may be without tags." },
  { label: "Excellent", copy: "Minor signs of wear that are not noticeable when worn." },
  { label: "Good", copy: "Honest wear — fading, small marks or repairs, all listed on the product page." },
  { label: "Vintage", copy: "Genuinely old piece with the character, fade and quirks that come with age." },
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh",
  "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
] as const;
