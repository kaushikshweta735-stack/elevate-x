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
