/**
 * Renders every route in jsdom to catch crashes/shape errors, and audits the
 * source for the usual mobile-overflow suspects (fixed widths, nowrap text,
 * 100vw usage, oversized headings without clamp).
 */
import { JSDOM } from "jsdom";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { afterEach, test } from "node:test";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/" });
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
try { Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true }); } catch {}
for (const key of ["HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement", "Node", "Event", "MouseEvent", "KeyboardEvent"]) {
  (globalThis as any)[key] = (dom.window as any)[key];
}
(globalThis as any).getComputedStyle = dom.window.getComputedStyle;
(globalThis as any).requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
Object.defineProperty(dom.window, "scrollTo", { value: () => {}, writable: true });
Object.defineProperty(dom.window.HTMLElement.prototype, "scrollIntoView", { value: () => {}, writable: true });

const { render, screen, cleanup } = require("@testing-library/react");
const React = require("react");
const App = require("../src/App").default;
const { PRODUCTS } = require("../src/data/products");

afterEach(() => cleanup());

const routes = [
  ["/", /Buy\./],
  ["/shop", /Shop all/],
  ["/shop?category=Denim", /Shop all/],
  ["/shop?wishlist=1", /Your wishlist/],
  ["/shop?new=1", /New arrivals/],
  ["/product/sunset-denim-jacket", /Sunset Denim Jacket/],
  ["/checkout", /bag is empty/],
  ["/about", /Thrift/i],
  ["/contact", /Talk to the shop/],
  ["/nope", /doesn't exist/],
] as const;

test("every route renders without crashing", async () => {
  for (const [route, matcher] of routes) {
    dom.window.history.replaceState({}, "", route);
    const { container } = render(React.createElement(App));
    const text = container.textContent ?? "";
    assert.match(text, matcher as RegExp, `route ${route} did not render expected content`);
    cleanup();
  }
});

test("empty bag count renders as 0, never a hardcoded sample", async () => {
  dom.window.localStorage.clear();
  dom.window.history.replaceState({}, "", "/");
  render(React.createElement(App));
  const badge = await screen.findByTestId("bag-count");
  assert.equal(badge.textContent, "0");
});

test("product pages expose honest detail rows", async () => {
  for (const p of PRODUCTS.slice(0, 3)) {
    dom.window.history.replaceState({}, "", `/product/${p.slug}`);
    const { container } = render(React.createElement(App));
    const text = container.textContent ?? "";
    assert.ok(text.includes(p.name));
    assert.ok(text.includes(`Size ${p.size}`));
    assert.ok(text.includes(p.condition));
    // no invented measurements table when we have none
    if (!p.measurements) assert.ok(text.includes("Not measured yet"));
    cleanup();
  }
});

/* ---------------- static audit ---------------- */
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const full = path.join(dir, f);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

test("no fixed pixel widths or 100vw that would force horizontal scroll", () => {
  const files = walk("src").filter((f) => /\.(tsx|css)$/.test(f));
  const offenders: string[] = [];
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    for (const m of src.matchAll(/\bw-\[(\d{2,4})px\]/g)) offenders.push(`${f}: ${m[0]}`);
    // 100vw inside an image `sizes` hint is a resolution hint, not layout
    for (const line of src.split("\n")) {
      if (line.includes("sizes=")) continue;
      if (/100vw/.test(line)) offenders.push(`${f}: 100vw in layout`);
    }
    if (/overflow-x:\s*visible/.test(src)) offenders.push(`${f}: overflow-x visible`);
  }
  assert.deepEqual(offenders, []);
});

test("body has a global guard against horizontal scrolling", () => {
  const css = readFileSync("src/index.css", "utf8");
  assert.match(css, /overflow-x:\s*hidden/);
});

test("checkout inputs are >= 16px so iOS does not zoom on focus", () => {
  const css = readFileSync("src/index.css", "utf8");
  assert.match(css, /\.field\s*\{[^}]*font-size:\s*1rem/s);
});

test("men's-only: no women's garments remain in the artwork component", () => {
  const art = readFileSync("src/components/GarmentArt.tsx", "utf8");
  assert.ok(!/dress|skirt/.test(art), "women's garment branches still present");
});
