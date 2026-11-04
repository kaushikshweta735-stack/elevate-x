/**
 * End-to-end style journey tests, run in jsdom.
 * Covers the flows listed in the brief: add to bag, quantity, persistence,
 * checkout validation, order summary, WhatsApp hand-off and men's-only catalogue.
 */
import { JSDOM } from "jsdom";
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, test } from "node:test";

/* tiny expect() shim so the suite reads clearly without another dependency */
const expect = (actual: any) => ({
  toBe: (expected: any) => assert.equal(actual, expected),
  toEqual: (expected: any) => assert.deepEqual(actual, expected),
  toBeTruthy: () => assert.ok(actual, `expected truthy, got ${actual}`),
  toBeNull: () => assert.equal(actual, null),
  toBeGreaterThan: (n: number) => assert.ok(actual > n, `expected > ${n}, got ${actual}`),
  toContain: (v: any) => assert.ok(actual.includes(v), `expected to contain ${v}`),
  toMatch: (re: RegExp) => assert.match(String(actual), re),
  not: { toMatch: (re: RegExp) => assert.doesNotMatch(String(actual), re) },
});

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/" });
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
try { Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true }); } catch { /* node 22 defines navigator */ }
(globalThis as any).HTMLElement = dom.window.HTMLElement;
(globalThis as any).HTMLInputElement = dom.window.HTMLInputElement;
(globalThis as any).HTMLTextAreaElement = dom.window.HTMLTextAreaElement;
(globalThis as any).HTMLSelectElement = dom.window.HTMLSelectElement;
(globalThis as any).Node = dom.window.Node;
(globalThis as any).Event = dom.window.Event;
(globalThis as any).MouseEvent = dom.window.MouseEvent;
(globalThis as any).KeyboardEvent = dom.window.KeyboardEvent;
(globalThis as any).getComputedStyle = dom.window.getComputedStyle;
(globalThis as any).requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
Object.defineProperty(dom.window, "scrollTo", { value: () => {}, writable: true });
Object.defineProperty(dom.window.HTMLElement.prototype, "scrollIntoView", { value: () => {}, writable: true });

const { render, screen, fireEvent, cleanup, waitFor, within } = require("@testing-library/react");
const React = require("react");
const App = require("../src/App").default;
const { PRODUCTS, CATEGORIES } = require("../src/data/products");
const { buildOrderMessage, makeReference } = require("../src/lib/order");
const { isValidPhone, isValidPin } = require("../src/lib/validate");

const mount = (path = "/") => {
  dom.window.history.replaceState({}, "", path);
  return render(React.createElement(App));
};

const bagCount = () => screen.getByTestId("bag-count").textContent;

beforeEach(() => { dom.window.localStorage.clear(); });
afterEach(() => { cleanup(); });

describe("catalogue", () => {
  test("contains no women's categories or garments", () => {
    const banned = ["dress", "skirt", "women", "womens", "female"];
    for (const c of CATEGORIES) {
      expect(banned.some((b) => c.toLowerCase().includes(b))).toBe(false);
    }
    for (const p of PRODUCTS) {
      const hay = `${p.name} ${p.category} ${p.description ?? ""}`.toLowerCase();
      expect(banned.some((b) => hay.includes(b))).toBe(false);
    }
    expect(PRODUCTS.length).toBeGreaterThan(0);
  });

  test("every product has honest, required fields", () => {
    for (const p of PRODUCTS) {
      expect(p.slug).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(["Excellent", "Like New", "Good", "Vintage"]).toContain(p.condition);
      expect(["in-stock", "reserved", "sold"]).toContain(p.availability);
      // MRP must always be above the selling price when present
      if (p.mrp) expect(p.mrp).toBeGreaterThan(p.price);
    }
  });
});

describe("bag", () => {
  test("empty bag shows 0, add to bag updates count and subtotal", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    expect(bagCount()).toBe("0");

    const card = screen.getAllByText("Add to bag")[0];
    fireEvent.click(card);
    await waitFor(() => expect(bagCount()).toBe("1"));

    fireEvent.click(screen.getByLabelText(/Open shopping bag/));
    expect(await screen.findByText("Place order")).toBeTruthy();
    expect(screen.getAllByText("₹1,299").length).toBeGreaterThan(0);
  });

  test("quantity change updates the subtotal, removal empties the bag", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    fireEvent.click(screen.getAllByText("Add to bag")[0]);
    fireEvent.click(await screen.findByLabelText(/Open shopping bag/));

    fireEvent.click(await screen.findByLabelText(/Increase quantity of Sunset Denim Jacket/));
    await waitFor(() => expect(bagCount()).toBe("2"));
    expect(screen.getAllByText("₹2,598").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByLabelText(/Remove Sunset Denim Jacket from bag/));
    await waitFor(() => expect(bagCount()).toBe("0"));
    expect(await screen.findByText("Your bag is empty")).toBeTruthy();
  });

  test("cart persists across a reload", async () => {
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

describe("checkout", () => {
  const fill = (label: RegExp | string, value: string) => {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  };

  test("blocks submission and highlights missing fields", async () => {
    mount("/shop");
    await screen.findAllByText("Sunset Denim Jacket");
    fireEvent.click(screen.getAllByText("Add to bag")[0]);
    fireEvent.click(await screen.findByLabelText(/Open shopping bag/));
    fireEvent.click(await screen.findByText("Place order"));

    expect(await screen.findByRole("heading", { name: /Checkout/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Review order/ }));

    expect(await screen.findByText(/fields need|field needs/)).toBeTruthy();
    expect(screen.getByText("Please enter your full name.")).toBeTruthy();
    // still on the details step
    expect(screen.queryByText("Confirm order on WhatsApp")).toBeNull();
  });

  test("rejects invalid mobile and PIN", async () => {
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

  test("valid details reach review with the full summary and back to edit", async () => {
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
    expect((screen.getByLabelText(/Full name/) as HTMLInputElement).value).toBe("Kartik Tyagi");
  });

  test("confirm opens WhatsApp and is explicit that nothing is placed yet", async () => {
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
    (dom.window as any).open = (url: string) => { opened = url; return {}; };
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

describe("order message", () => {
  test("contains everything the shop needs and never claims payment", () => {
    const p = PRODUCTS[0];
    const msg = buildOrderMessage({
      lines: [{ product: p, size: p.size, qty: 2, lineTotal: p.price * 2 }],
      subtotal: p.price * 2,
      deliveryCharge: null,
      total: null,
      details: {
        fullName: "Kartik", phone: "9876543210", email: "k@example.com",
        house: "12", street: "Model Town", landmark: "", city: "Panipat",
        state: "Haryana", pin: "132103", country: "India", notes: "Call before delivery",
      },
      reference: makeReference(),
    });
    expect(msg).toMatch(/NEW ORDER/);
    expect(msg).toMatch(/Ref: ET-/);
    expect(msg).toMatch(/Delivery: To be confirmed/);
    expect(msg).toMatch(/Total: Subtotal \+ delivery/);
    expect(msg).toMatch(/Call before delivery/);
    expect(msg.toLowerCase()).not.toMatch(/paid|payment successful|order received/);
  });
});

describe("validation helpers", () => {
  test("indian mobile numbers", () => {
    expect(isValidPhone("9876543210")).toBe(true);
    expect(isValidPhone("+91 98765 43210")).toBe(true);
    expect(isValidPhone("09876543210")).toBe(true);
    expect(isValidPhone("5876543210")).toBe(false);
    expect(isValidPhone("98765")).toBe(false);
  });
  test("pin codes", () => {
    expect(isValidPin("132103")).toBe(true);
    expect(isValidPin("012103")).toBe(false);
    expect(isValidPin("13210")).toBe(false);
  });
});
