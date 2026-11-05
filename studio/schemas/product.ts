import { defineArrayMember, defineField, defineType } from "sanity";

const CATEGORIES = ["Vintage", "Streetwear", "Denim", "Shirts", "T-shirts", "Jackets", "Trousers", "Accessories"];

export const product = defineType({
  name: "product",
  title: "Piece",
  type: "document",
  groups: [
    { name: "basics", title: "Details", default: true },
    { name: "photos", title: "Photos" },
    { name: "condition", title: "Condition & size" },
    { name: "stock", title: "Stock" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      group: "basics",
      validation: (r) => r.required().max(80),
      description: "e.g. Sunset Denim Jacket",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "basics",
      options: { source: "name", maxLength: 60 },
      validation: (r) => r.required(),
      description: "Used in the product link, e.g. /product/sunset-denim-jacket",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "basics",
      options: { list: CATEGORIES, layout: "radio", direction: "horizontal" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Selling price (₹)",
      type: "number",
      group: "basics",
      validation: (r) => r.required().positive().integer(),
    }),
    defineField({
      name: "mrp",
      title: "Original / MRP price (₹) — optional",
      type: "number",
      group: "basics",
      description:
        "Only fill this if you genuinely know the original price. Leave blank and no discount badge appears.",
      validation: (r) => r.min(0).integer(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "basics",
      description: "Fit, styling, why it's worth buying. Plain text.",
    }),
    defineField({
      name: "tag",
      title: "Badge (optional)",
      type: "string",
      group: "basics",
      description: "e.g. Bestseller, Rare find, 1 of 1",
      options: { list: ["Bestseller", "Rare find", "1 of 1", "Trending", "Premium"] },
    }),

    /* ---------------- photos ---------------- */
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      group: "photos",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "kind",
              title: "View",
              type: "string",
              options: {
                list: [
                  { title: "Front", value: "front" },
                  { title: "Back", value: "back" },
                  { title: "Detail", value: "detail" },
                  { title: "Fabric close-up", value: "fabric" },
                  { title: "Label / tag", value: "label" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "front",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Describe the photo for screen readers and Google.",
            }),
          ],
          preview: {
            select: { media: "asset", kind: "kind", alt: "alt" },
            prepare: ({ media, kind, alt }) => ({
              title: alt || `(${kind ?? "front"} view)`,
              subtitle: kind,
              media,
            }),
          },
        }),
      ],
      description:
        "First photo is the card thumbnail. Recommended: 4:5 portrait, ~1200px wide. Shoot front, back, a detail and a fabric close-up.",
      validation: (r) => r.max(8),
    }),

    /* ---------------- condition & size ---------------- */
    defineField({
      name: "condition",
      title: "Condition",
      type: "string",
      group: "condition",
      options: {
        list: [
          { title: "Like New", value: "Like New" },
          { title: "Excellent", value: "Excellent" },
          { title: "Good", value: "Good" },
          { title: "Vintage", value: "Vintage" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "Excellent",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "size",
      title: "Size on the label",
      type: "string",
      group: "condition",
      validation: (r) => r.required(),
      description: 'e.g. M, L, XL, 32, Free',
    }),
    defineField({
      name: "era",
      title: "Era",
      type: "string",
      group: "condition",
      description: "e.g. 90s, Y2K, 80s",
    }),
    defineField({
      name: "measurements",
      title: "Measurements (inches, measured flat)",
      type: "array",
      group: "condition",
      of: [
        defineArrayMember({
          type: "object",
          name: "measurement",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              options: { list: ["Chest", "Length", "Shoulder", "Sleeve", "Waist", "Inseam", "Rise", "Hip"] },
              validation: (r) => r.required(),
            }),
            defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
      description: "Optional but strongly recommended — customers ask for these constantly.",
    }),
    defineField({ name: "fabric", title: "Fabric / material", type: "string", group: "condition", description: "Only if you know it, e.g. 100% cotton denim" }),
    defineField({
      name: "flaws",
      title: "Flaws & notes",
      type: "array",
      group: "condition",
      of: [defineArrayMember({ type: "string" })],
      description: "List any marks, repairs or fading. Being upfront sells pieces faster.",
    }),

    /* ---------------- stock ---------------- */
    defineField({
      name: "availability",
      title: "Stock status",
      type: "string",
      group: "stock",
      options: {
        list: [
          { title: "✅ In stock — visible and buyable", value: "in-stock" },
          { title: "⏸ On hold — reserved for a customer", value: "reserved" },
          { title: "🚫 Sold out — cannot be added to a bag", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "in-stock",
      validation: (r) => r.required(),
      description: "Switch to Sold out the moment a piece is paid for. It stays on the site marked Sold.",
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      group: "stock",
      description: "Lower numbers appear first. Leave blank to use newest first.",
    }),
    defineField({
      name: "addedAt",
      title: "Date added",
      type: "date",
      group: "stock",
      initialValue: () => new Date().toISOString().slice(0, 10),
      description: "Drives the New Arrivals filter (last 14 days).",
    }),
  ],
  orderings: [
    { title: "In stock first", name: "stock", by: [{ field: "availability", direction: "asc" }, { field: "_createdAt", direction: "desc" }] },
    { title: "Newest", name: "newest", by: [{ field: "_createdAt", direction: "desc" }] },
    { title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "availability", price: "price", media: "images.0" },
    prepare: ({ title, subtitle, price, media }) => ({
      title,
      subtitle: `${subtitle === "sold" ? "SOLD · " : subtitle === "reserved" ? "ON HOLD · " : ""}₹${price ?? "—"}`,
      media,
    }),
  },
});
