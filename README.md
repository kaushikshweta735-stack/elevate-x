# Elevate X Thrift

Men's thrift fashion storefront for **Elevate X Thrift**, Panipat, Haryana.
React + TypeScript + Vite + Tailwind CSS v4. Built on the original storefront —
same brand, palette, crest and typography — with a working cart, customer-details
checkout and WhatsApp order hand-off.

```
npm ci
npm run dev        # http://localhost:5173
npm run verify     # typecheck + 26 automated journey tests + production build
```

## What's in the box

| Area | Notes |
| --- | --- |
| Catalogue | `src/data/products.ts` — single source of truth, one entry per physical piece |
| Store config | `src/data/shop.ts` — delivery charge, condition guide, Indian states |
| Business info | `src/data/site.ts` — name, WhatsApp, Instagram, email, location |
| Cart / wishlist | `src/store/shop.tsx` — React context + `localStorage` persistence |
| Routing | `src/lib/router.tsx` — tiny history router (no dependency) |
| Order building | `src/lib/order.ts` — WhatsApp message + local order record |
| Validation | `src/lib/validate.ts` — Indian mobile + PIN + email |
| Tests | `tests/` — jsdom journeys run with `npm test` |

Routes: `/`, `/shop`, `/product/:slug`, `/checkout`, `/about`, `/contact`.
`/shop` accepts `?category=`, `?q=`, `?sort=`, `?condition=`, `?new=1`, `?wishlist=1`.

## Adding real product photography

1. Put photos in `public/products/`, e.g. `public/products/sunset-denim-jacket-front.jpg`.
2. List them on the product in `src/data/products.ts`:

```ts
images: [
  { src: "/products/sunset-denim-jacket-front.jpg", kind: "front", alt: "Sunset Denim Jacket, front" },
  { src: "/products/sunset-denim-jacket-back.jpg",  kind: "back" },
  { src: "/products/sunset-denim-jacket-fabric.jpg", kind: "fabric" },
],
```

* First image is the card thumbnail; the product page shows the rest as a gallery
  with front/back/detail/fabric labels and click-to-zoom.
* Shoot **4:5 portrait**, ~1200 px wide, consistent framing — the grid is built
  around that ratio and `object-fit: cover` prevents any stretching.
* Products without `images` fall back to an illustrated garment that is labelled
  "Illustration" in the UI. Nothing is ever presented as a photo it isn't.

While developing, the first four products show clearly-labelled placeholder
images served by `vite.config.ts` (dev only — they are compiled out of
production builds and are not in `public/`).

## Honesty rules baked into the code

* `mrp` is optional. If it isn't set, no discount badge appears — no invented "70% off".
* `measurements`, `fabric` and `flaws` are optional. When absent the product page
  says "Not measured yet — ask us on WhatsApp" instead of guessing.
* `availability` is `in-stock | reserved | sold`; sold pieces can't be added to the bag.
* Delivery is `null` in `src/data/shop.ts`, which renders as "To be confirmed" —
  set `deliveryCharge` (and optionally `freeDeliveryAbove`) to a real number when
  you know your courier rates and the UI switches to a fixed charge automatically.
* The order confirmation screen states plainly that the order is only placed once
  the customer presses Send in WhatsApp.

## Checkout flow

1. **Bag** — quantity stepper, remove, live subtotal, count badge. Persisted in
   `localStorage` (`elevate.cart.v1`) and survives refresh; count is `0` when empty.
2. **Place order** → `/checkout` (never straight to WhatsApp).
3. **Details** — name, mobile, email, house, street, landmark, city, state (34
   Indian states/UTs), PIN, country, notes. Required fields marked, validated on
   blur and on submit, first error scrolled into view.
4. **Review** — items with images, sizes, quantities, prices, subtotal, delivery
   line and total, plus the full delivery address. "Edit details" returns to the
   form with everything preserved (also stored in `localStorage`).
5. **Confirm order on WhatsApp** — opens `wa.me/918571064108` with a complete,
   URL-encoded order message. A copy of the order request is saved locally
   *after* WhatsApp opens, and the success screen tells the customer to press Send.

## Backend / environment variables

There is **no backend in this project** and none is required: orders are handed to
WhatsApp, which is the source of truth. No secrets are used anywhere in the client.

To add a database later, point an endpoint at it:

```
# .env  (optional — never commit real keys)
VITE_ORDERS_ENDPOINT=https://your-api.example.com/orders
```

`recordOrder()` in `src/lib/order.ts` POSTs the order record to that URL when set
and silently continues if the request fails. Keep secrets server-side (a Vercel
`/api` function writing to a DB is the intended path); never put an API key in a
`VITE_` variable, since those are embedded in the public bundle.

## Deploying (Vercel)

Already configured in `vercel.json`: Vite framework, `npm ci`, `dist` output, SPA
rewrites for deep links, long-lived caching for `/products/*` and basic security
headers. Push to `main` and Vercel rebuilds.

Post-deploy checks: `https://elevatexthrift.vercel.app/shop`, a product URL,
`/checkout`, `favicon.ico`, `/site.webmanifest`, `/sitemap.xml`.

## Admin — adding pieces and marking them sold

The shop can be managed from **Sanity Studio** (the admin) instead of editing code.

**One-time setup (5 minutes)**

1. Free account + project at <https://sanity.io> → note the **Project ID** (dataset `production`).
2. In Sanity → **API → CORS origins**, add `http://localhost:5173` and
   `https://elevatexthrift.vercel.app` (credentials not required — read-only public content).
3. `cd studio && cp .env.example .env` → paste the project id → `npm install && npm run dev`.
   That local URL is your admin. `npx sanity deploy` gives you a permanent
   `https://<name>.sanity.studio` address instead.
4. In Vercel → Settings → Environment Variables add `VITE_SANITY_PROJECT_ID` and
   `VITE_SANITY_DATASET=production`, then redeploy.

**Daily use**

* **List a piece** — Create → Piece: name, slug (Generate), category, price, photos
  (front/back/detail/fabric tags), size, condition, measurements, flaws → **Publish**.
* **Sold out** — Stock status → *Sold out* → **Publish**. The piece stays on the site
  marked "Sold" and can no longer be added to a bag; it is also dropped from any
  customer's saved bag on their next visit.
* **On hold** — *On hold* while someone is deciding; still visible, still buyable.

**Safety behaviour**

* No project configured → the site uses the built-in catalogue, exactly as before.
* CMS unreachable or empty → falls back to the built-in catalogue and shows a
  small notice, so the shop never renders blank.
* Last good catalogue is cached locally, so returning visitors see real stock even
  if the CMS is slow.
* The admin is the only place with write access — the browser client is read-only,
  and no API token ever ships to the site.
