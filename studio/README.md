# Elevate X Thrift — Admin (Sanity Studio)

The admin panel for the shop. Add pieces, upload photos, set sizes/condition and
mark stock as **In stock / On hold / Sold out**. Changes go live on the website
within a minute — no code, no redeploy.

## One-time setup

1. Create a free account at <https://sanity.io> and a new project (free tier: no
   credit card, projects do **not** pause from inactivity).
2. In <https://sanity.io/manage> → your project → **API**, note the **Project ID**
   and that the dataset is `production` (create it if it isn't there).
3. Add your shop's domain to **API → CORS origins**:
   - `http://localhost:5173` (local dev)
   - `https://elevatexthrift.vercel.app` (live site)
   Tick **Allow credentials** off — the site only reads public content.

## Run the admin

```bash
cd studio
cp .env.example .env      # then paste your project id
npm install
npm run dev
```

Open the printed URL (usually <http://localhost:3333>) and log in with the account
you created. Bookmark it — this is your admin.

To host the admin at a permanent URL instead of running it locally:

```bash
npx sanity deploy       # gives you https://elevate-x-thrift.sanity.studio
```

## Connect the website

In Vercel → your project → **Settings → Environment Variables**, add:

| Name | Value |
| --- | --- |
| `VITE_SANITY_PROJECT_ID` | your Project ID |
| `VITE_SANITY_DATASET` | `production` |

Redeploy. The site now reads the catalogue from the CMS. If the CMS is ever
unreachable it falls back to the built-in catalogue and shows a small notice, so
the shop never goes blank.

## Daily use

- **New piece**: Create → Piece → fill name, slug (Generate), category, price,
  upload photos, set size/condition, leave stock as *In stock* → **Publish**.
- **Sold**: open the piece → Stock status → *Sold out* → **Publish**. It does not
  disappear; it stays visible marked "Sold" and customers can't add it to a bag.
- **Reserved**: use *On hold* while someone is deciding.
- Photos: first image is the card thumbnail. Shoot 4:5 portrait, front + back +
  a detail + a fabric close-up.

> Until you publish at least one piece, the website keeps showing the built-in
> catalogue — an empty CMS never blanks the shop.
