/** Filtering, sorting, search, wishlist and routing behaviour. */
import { JSDOM } from "jsdom";
import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/shop" });
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

const { render, screen, fireEvent, cleanup, waitFor } = require("@testing-library/react");
const React = require("react");
const App = require("../src/App").default;
const { PRODUCTS } = require("../src/data/products");

beforeEach(() => { dom.window.localStorage.clear(); });
afterEach(() => { cleanup(); });

const at = (path: string) => {
  dom.window.history.replaceState({}, "", path);
  return render(React.createElement(App));
};

test("category filter narrows the grid and is reflected in the URL", async () => {
  const { container } = at("/shop");
  await screen.findByText("Shop all");
  fireEvent.click(screen.getByRole("button", { name: "Denim" }));

  await waitFor(() => assert.match(dom.window.location.search, /category=Denim/));
  await waitFor(() => {
    assert.ok(container.textContent.includes("Sunset Denim Jacket"));
    assert.ok(!container.textContent.includes("Oversized Hoodie"));
  });
});

test("condition filter and sort change the order", async () => {
  const { container } = at("/shop");
  await screen.findByText("Shop all");

  fireEvent.change(screen.getByLabelText(/Filter by condition/), { target: { value: "Good" } });
  await waitFor(() => {
    assert.ok(container.textContent.includes("Retro Graphic Tee"));
    assert.ok(!container.textContent.includes("Sunset Denim Jacket"));
  });

  fireEvent.change(screen.getByLabelText(/Filter by condition/), { target: { value: "" } });
  fireEvent.change(screen.getByLabelText(/Sort products/), { target: { value: "low" } });

  await waitFor(() => {
    const names = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    const prices = names.map((n) => PRODUCTS.find((p) => p.name === n)?.price ?? 0);
    assert.deepEqual(prices, [...prices].sort((a, b) => a - b));
  });
});

test("search finds pieces and shows an empty state for nonsense", async () => {
  const { container } = at("/shop");
  await screen.findByText("Shop all");

  const input = screen.getByLabelText("Search all products") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "hoodie" } });
  fireEvent.submit(input.closest("form")!);
  await waitFor(() => assert.ok(container.textContent.includes("Oversized Hoodie")));
  await waitFor(() => assert.ok(!container.textContent.includes("Sunset Denim Jacket")));

  fireEvent.change(screen.getByLabelText("Search this collection"), { target: { value: "zzzz" } });
  fireEvent.submit(screen.getByLabelText("Search this collection").closest("form")!);
  await waitFor(() => assert.ok(container.textContent.includes("No pieces match that")));
});

test("wishlist saves and survives a reload", async () => {
  at("/shop");
  await screen.findByText("Shop all");
  fireEvent.click(screen.getAllByLabelText(/Save .* to wishlist/)[0]);
  await waitFor(() => assert.ok(dom.window.localStorage.getItem("elevate.wishlist.v1")?.length));

  cleanup();
  const { container } = at("/shop?wishlist=1");
  await screen.findByText("Your wishlist");
  await waitFor(() => assert.ok(container.textContent.includes("Sunset Denim Jacket")));
});

test("product page add-to-bag respects the quantity stepper", async () => {
  at("/product/classic-straight-jeans");
  await screen.findByRole("heading", { name: /Classic Straight Jeans/i });

  const inc = screen.getByLabelText(/Increase quantity of Classic Straight Jeans/);
  fireEvent.click(inc);
  fireEvent.click(inc);
  const main = document.querySelector("main")!;
  const buttons = Array.from(main.querySelectorAll("button")).filter((b) => /^Add to bag$/.test(b.textContent ?? ""));
  fireEvent.click(buttons[0]);

  await waitFor(() => assert.equal(screen.getByTestId("bag-count").textContent, "3"));
});

test("internal links navigate client-side without a full reload", async () => {
  at("/");
  fireEvent.click(screen.getByRole("link", { name: /^Shop$/ }));
  await waitFor(() => assert.equal(dom.window.location.pathname, "/shop"));
  await screen.findByText("Shop all");
});

test("unknown product shows a friendly 404 with a way out", async () => {
  at("/product/does-not-exist");
  assert.ok((await screen.findByText(/couldn't find that piece/)) !== null);
  assert.ok(screen.getByRole("button", { name: /Browse the rack/ }));
});
