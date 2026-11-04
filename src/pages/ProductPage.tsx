import { useEffect, useMemo, useState } from "react";
import { CONDITION_GUIDE, DELIVERY } from "../data/shop";
import { PRODUCTS, PRODUCT_BY_SLUG, discountPercent, isAvailable, type ProductImage } from "../data/products";
import { inr } from "../lib/format";
import { useShop } from "../store/shop";
import { ProductMedia } from "../components/ProductMedia";
import { AvailabilityNote, Badge, IconArrow, IconHeart, IconTruck, IconWhatsApp, Stepper } from "../components/ui";
import ProductCard from "../components/ProductCard";
import { waLink } from "../data/site";

const KIND_LABEL: Record<ProductImage["kind"], string> = {
  front: "Front",
  back: "Back",
  detail: "Detail",
  fabric: "Fabric",
  label: "Label",
};

export default function ProductPage({
  slug,
  navigate,
}: {
  slug: string;
  navigate: (to: string) => void;
}) {
  const product = PRODUCT_BY_SLUG.get(slug);
  const { addToBag, toggleSaved, isSaved, notify } = useShop();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setActive(0);
    setQty(1);
    setZoom(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="eyebrow text-[#D81F2A]">404</p>
        <h1 className="display-lg mt-2 text-4xl">We couldn't find that piece</h1>
        <p className="mt-3 text-sm text-[#EDE5D5]/55">It may have sold — every piece is one of one.</p>
        <button onClick={() => navigate("/shop")} className="btn btn-cream mt-6 px-6 py-3 text-sm">Browse the rack</button>
      </div>
    );
  }

  const off = discountPercent(product);
  const available = isAvailable(product);
  const saved = isSaved(product.slug);
  const image = product.images[active];

  const related = useMemo(
    () =>
      PRODUCTS.filter((p) => p.slug !== product.slug)
        .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
        .slice(0, 4),
    [product.slug, product.category],
  );

  const guide = CONDITION_GUIDE.find((g) => g.label === product.condition);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs text-[#EDE5D5]/40">
        <a href="/" className="hover:text-[#EDE5D5]">Home</a>
        <span aria-hidden="true">/</span>
        <a href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#EDE5D5]">{product.category}</a>
        <span aria-hidden="true">/</span>
        <span className="truncate text-[#EDE5D5]/60">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-2xl border border-[#EDE5D5]/12 bg-[#121014]">
            <button
              type="button"
              onClick={() => setZoom((z) => !z)}
              aria-label={zoom ? "Reset image zoom" : "Zoom image"}
              className="product-frame block w-full cursor-zoom-in overflow-hidden"
              style={{ aspectRatio: "4 / 5" }}
            >
              <ProductMedia product={product} image={image} priority sizes="(max-width: 1024px) 100vw, 55vw" className={zoom ? "scale-150 cursor-zoom-out transition-transform duration-500" : "transition-transform duration-500"} />
            </button>
            {product.images.length === 0 && (
              <p className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#EDE5D5]/70 uppercase backdrop-blur">
                Illustration — photo coming soon
              </p>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5" role="group" aria-label="Product images">
              {product.images.map((img, i) => (
                <button
                  key={img.src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${KIND_LABEL[img.kind]} image`}
                  aria-pressed={i === active}
                  className={`product-frame overflow-hidden rounded-lg border transition ${i === active ? "border-[#EDE5D5]" : "border-[#EDE5D5]/15 opacity-70 hover:opacity-100"}`}
                >
                  <ProductMedia product={product} image={img} sizes="120px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow text-[#D81F2A]">{product.category}</p>
            {product.tag && <Badge tone="bone">{product.tag}</Badge>}
          </div>

          <h1 className="display-lg mt-2 text-4xl sm:text-5xl">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl font-extrabold">{inr(product.price)}</span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span className="text-base text-[#EDE5D5]/35 line-through">{inr(product.mrp)}</span>
                <Badge tone="red">{off}% off MRP</Badge>
              </>
            )}
          </div>
          <p className="mt-1 text-[11px] text-[#EDE5D5]/35">Inclusive of all taxes. Delivery confirmed at checkout.</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[#EDE5D5]/10 py-3">
            <AvailabilityNote availability={product.availability} />
            <span className="text-xs text-[#EDE5D5]/40">·</span>
            <span className="text-xs font-semibold text-[#EDE5D5]/65">Condition: {product.condition}</span>
            <span className="text-xs text-[#EDE5D5]/40">·</span>
            <span className="text-xs font-semibold text-[#EDE5D5]/65">Size {product.size}</span>
            {product.era && (
              <>
                <span className="text-xs text-[#EDE5D5]/40">·</span>
                <span className="text-xs font-semibold text-[#EDE5D5]/65">{product.era}</span>
              </>
            )}
          </div>

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-[#EDE5D5]/65">{product.description}</p>
          )}

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Stepper qty={qty} onChange={setQty} label={product.name} max={available ? 5 : 1} disabled={!available} />
            <button
              type="button"
              disabled={!available}
              onClick={() => { addToBag(product, { qty }); setQty(1); }}
              className="btn btn-primary flex-1 px-6 py-3.5 text-sm"
            >
              {available ? "Add to bag" : "Unavailable"}
            </button>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => { toggleSaved(product.slug); notify(saved ? "Removed from wishlist" : "Saved to wishlist"); }}
              aria-pressed={saved}
              className={`btn flex-1 px-5 py-3 text-sm ${saved ? "border border-[#D81F2A] bg-[#D81F2A]/15 text-[#ff9ba1]" : "btn-ghost"}`}
            >
              <IconHeart className="h-4 w-4" filled={saved} /> {saved ? "Saved" : "Save"}
            </button>
            <a
              href={waLink(`Hi! I'm interested in "${product.name}" (Size ${product.size}, ${inr(product.price)}) — is it still available?`)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost flex-1 px-5 py-3 text-sm"
            >
              <IconWhatsApp className="h-4 w-4" /> Ask about this
            </a>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#EDE5D5]/40">
            <IconTruck className="h-4 w-4" /> {DELIVERY.note}
          </p>

          {/* Condition & material */}
          <dl className="mt-6 divide-y divide-[#EDE5D5]/8 rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02]">
            <div className="flex items-start justify-between gap-4 p-4">
              <dt className="text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase">Condition</dt>
              <dd className="max-w-[62%] text-right text-sm text-[#EDE5D5]/80">
                <span className="font-bold">{product.condition}</span>
                {guide && <span className="mt-0.5 block text-xs text-[#EDE5D5]/45">{guide.copy}</span>}
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 p-4">
              <dt className="text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase">Size</dt>
              <dd className="text-right text-sm font-bold text-[#EDE5D5]/85">{product.size}</dd>
            </div>

            {product.measurements && product.measurements.length > 0 ? (
              <div className="p-4">
                <dt className="text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase">Measurements</dt>
                <dd className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-[#EDE5D5]/75">
                  {product.measurements.map((m) => (
                    <div key={m.label} className="flex justify-between gap-3 border-b border-dashed border-[#EDE5D5]/10 pb-1">
                      <span className="text-[#EDE5D5]/50">{m.label}</span>
                      <span className="font-semibold">{m.value}</span>
                    </div>
                  ))}
                </dd>
                <p className="mt-2 text-[11px] text-[#EDE5D5]/35">Measured flat, in inches. Allow ~0.5&quot; tolerance.</p>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4 p-4">
                <dt className="text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase">Measurements</dt>
                <dd className="max-w-[62%] text-right text-sm text-[#EDE5D5]/55">
                  Not measured yet —{" "}
                  <a href={waLink(`Hi! Can you share measurements for "${product.name}"?`)} target="_blank" rel="noreferrer" className="font-semibold text-[#EDE5D5] underline underline-offset-2">
                    ask us on WhatsApp
                  </a>
                </dd>
              </div>
            )}

            {product.fabric && (
              <div className="flex items-start justify-between gap-4 p-4">
                <dt className="text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase">Fabric</dt>
                <dd className="max-w-[62%] text-right text-sm text-[#EDE5D5]/80">{product.fabric}</dd>
              </div>
            )}

            <div className="p-4">
              <dt className="text-xs font-bold tracking-wide text-[#EDE5D5]/45 uppercase">Flaws &amp; notes</dt>
              <dd className="mt-1 text-sm text-[#EDE5D5]/70">
                {product.flaws && product.flaws.length > 0 ? (
                  <ul className="list-inside list-disc space-y-1">
                    {product.flaws.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                ) : (
                  <span className="text-[#EDE5D5]/50">No notable flaws found during our check. As a pre-loved piece it may show light signs of wear.</span>
                )}
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-[11px] leading-relaxed text-[#EDE5D5]/35">
            One-of-one piece. Photos and details describe this exact garment — nothing is a stock image or a re-order.
          </p>
        </div>
      </div>

      {/* Related */}
      <section className="mt-16" aria-labelledby="related-heading">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="related-heading" className="display-lg text-2xl sm:text-3xl">More from the rack</h2>
          <a href="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]">
            View all <IconArrow className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} onOpen={(s) => navigate(`/product/${s}`)} />
          ))}
        </div>
      </section>
    </div>
  );
}
