import { discountPercent, isAvailable, type Product } from "../data/products";
import { inr } from "../lib/format";
import { useShop } from "../store/shop";
import { NoPhotoHint, ProductMedia } from "./ProductMedia";
import { AvailabilityNote, Badge, IconHeart } from "./ui";

export default function ProductCard({
  product,
  onOpen,
  priority = false,
}: {
  product: Product;
  onOpen: (slug: string) => void;
  priority?: boolean;
}) {
  const { addToBag, toggleSaved, isSaved } = useShop();
  const off = discountPercent(product);
  const available = isAvailable(product);
  const saved = isSaved(product.slug);

  return (
    <article className="group fade-up flex h-full flex-col overflow-hidden rounded-2xl border border-[#EDE5D5]/12 bg-[#121014]/80 transition-colors hover:border-[#EDE5D5]/25">
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpen(product.slug)}
          aria-label={`View ${product.name}`}
          className="product-frame block w-full text-left"
        >
          <ProductMedia product={product} priority={priority} sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 23vw" />
        </button>

        {product.images.length === 0 && <NoPhotoHint />}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2.5">
          <div className="flex flex-col items-start gap-1.5">
            {product.tag && <Badge tone="bone" className="backdrop-blur">{product.tag}</Badge>}
            {product.availability === "sold" && <Badge tone="red">Sold</Badge>}
          </div>
          {off !== null && <Badge tone="red">−{off}%</Badge>}
        </div>

        <button
          type="button"
          onClick={() => toggleSaved(product.slug)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={saved}
          className={`absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
            saved
              ? "border-[#D81F2A] bg-[#D81F2A] text-white"
              : "border-white/25 bg-black/40 text-[#EDE5D5] hover:bg-black/60"
          }`}
        >
          <IconHeart className="h-4 w-4" filled={saved} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-bold tracking-[0.14em] text-[#EDE5D5]/40 uppercase">{product.category}</p>
          <AvailabilityNote availability={product.availability} />
        </div>

        <h3 className="mt-1.5 text-[15px] leading-snug font-bold text-[#EDE5D5]">
          <button type="button" onClick={() => onOpen(product.slug)} className="text-left hover:text-white">
            {product.name}
          </button>
        </h3>

        <p className="mt-1 text-[11px] font-semibold tracking-wide text-[#EDE5D5]/45 uppercase">
          {product.condition} · Size {product.size}
          {product.era ? ` · ${product.era}` : ""}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-display text-xl leading-none font-extrabold text-[#EDE5D5]">{inr(product.price)}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-xs text-[#EDE5D5]/35 line-through">{inr(product.mrp)}</span>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-3">
          <button
            type="button"
            onClick={() => onOpen(product.slug)}
            className="btn btn-ghost flex-1 px-3 py-2 text-xs"
          >
            View details
          </button>
          <button
            type="button"
            onClick={() => addToBag(product)}
            disabled={!available}
            className="btn btn-primary flex-1 px-3 py-2 text-xs"
          >
            {available ? "Add to bag" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
