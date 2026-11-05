/**
 * CMS mapping rules — the same code path that turns Sanity documents into
 * products on the site. Guards the "never invent data" rules.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

const { normaliseProduct, cmsEnabled } = require("../src/lib/cms");

test("no project id means the built-in catalogue is used", () => {
  assert.equal(cmsEnabled(), false);
});

test("maps a complete document", () => {
  const p = normaliseProduct({
    slug: "sunset-denim-jacket",
    name: "Sunset Denim Jacket",
    category: "Denim",
    price: 1299,
    mrp: 3499,
    size: "M",
    condition: "Excellent",
    era: "90s",
    availability: "in-stock",
    description: "Boxy fit, faded indigo.",
    fabric: "100% cotton denim",
    flaws: ["Small mark on left cuff"],
    measurements: [{ label: "Chest", value: "22" }],
    tag: "Bestseller",
    addedAt: "2026-10-30",
    images: [{ src: "https://cdn.sanity.io/front.jpg", kind: "front", alt: "Front" }],
  });
  assert.ok(p);
  assert.equal(p.slug, "sunset-denim-jacket");
  assert.equal(p.category, "Denim");
  assert.equal(p.condition, "Excellent");
  assert.deepEqual(p.flaws, ["Small mark on left cuff"]);
  assert.equal(p.images.length, 1);
  assert.equal(p.images[0].kind, "front");
});

test("sold-out pieces come through as sold (so the site can block them)", () => {
  const p = normaliseProduct({ slug: "a", name: "A", price: 100, availability: "sold" });
  assert.equal(p.availability, "sold");
});

test("missing optional fields stay missing — nothing is invented", () => {
  const p = normaliseProduct({ slug: "b", name: "B", price: 500, category: "Shirts" });
  assert.equal(p.mrp, undefined);
  assert.equal(p.fabric, undefined);
  assert.equal(p.measurements.length, 0);
  assert.equal(p.images.length, 0);
  assert.equal(p.availability, "in-stock");
  assert.equal(p.condition, "Good"); // safe default, not a claim
});

test("unknown values degrade safely instead of crashing", () => {
  const p = normaliseProduct({
    slug: "c",
    name: "C",
    price: "899",
    category: "Dresses",        // retired category
    condition: "Mint",
    availability: "maybe",
    images: [{ src: "" }, { src: "https://cdn/x.jpg", kind: "moon" }],
  });
  assert.ok(p);
  assert.equal(p.category, "Vintage");
  assert.equal(p.condition, "Good");
  assert.equal(p.availability, "in-stock");
  assert.equal(p.price, 899);
  assert.equal(p.images.length, 1);          // empty src dropped
  assert.equal(p.images[0].kind, "front");    // unknown kind falls back
});

test("documents without a name or slug are rejected", () => {
  assert.equal(normaliseProduct({ name: "No slug", price: 100 }), null);
  assert.equal(normaliseProduct({ slug: "no-name", price: 100 }), null);
});
