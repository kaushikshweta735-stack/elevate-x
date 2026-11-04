# Elevate Thrift

A responsive men's thrift store storefront built with React, TypeScript, Vite, and Tailwind CSS. It features a glassmorphism-inspired visual style, animated garment illustrations, category filters, favourites, and a shopping bag drawer.

## Business information

- **Brand:** ELEVATE THRIFT
- **Business type:** Men's Thrift Fashion Store
- **Location:** Panipat, Haryana, India
- **Email:** kartiktyagi970@gmail.com
- **Instagram:** [@elevatex_thrift108](https://www.instagram.com/elevatex_thrift108/)

> Shopify note: business details are centralised in `src/data/site.ts` — when migrating, map them to Shopify *Settings → Store details / Social links* and reuse the same values in theme settings (`config/settings_data.json`). Product fields in `src/data/products.ts` (title, price, compare-at price/MRP, size, condition, category) mirror Shopify product/variant fields.

## Run locally

You’ll need Node.js `20.19+` or `22.12+`.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To create a production build, run:

```bash
npm run build
```

## Push to GitHub

Create an empty repository on GitHub, then open a terminal in this project folder and run:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your repository’s HTTPS URL. If you already added a remote, skip the `git remote add origin` line.

## Scripts

- `npm run dev` — start the local development server
- `npm run build` — build the site into `dist/`
- `npm run preview` — preview the production build locally

## Assets & ordering

- **Logo** — the official crest is in `public/`: `crest-160.png` / `crest-240.webp` / `crest-512.webp` (transparent surround) and the favicons (`favicon.ico`, `icon-16/32/192/512.png`, `apple-touch-icon.png`, `site.webmanifest`). Swap those files to rebrand; no code changes needed.
- **Product photos** — drop images into `public/products/` and set the matching `image` field in `src/data/products.ts`, e.g. `image: "/products/sunset-denim-jacket.jpg"`. Any product without an `image` automatically falls back to the built-in garment illustration.
- **Ordering** — checkout builds a pre-filled WhatsApp message with the bag contents and opens it in `wa.me`. The number lives in `src/data/site.ts` (`whatsapp`, digits only with country code; `whatsappDisplay` for on-page display). Instagram DM is offered as a fallback.
