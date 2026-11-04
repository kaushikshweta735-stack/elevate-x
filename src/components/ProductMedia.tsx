import { useState } from "react";
import GarmentArt from "./GarmentArt";
import type { Product, ProductImage } from "../data/products";
import { cx } from "../lib/format";

/**
 * Renders real photography when it exists, and the illustrated garment when it
 * does not — the illustration is clearly a placeholder, never a fake photo.
 */
export function ProductMedia({
  product,
  image,
  className,
  sizes = "(max-width: 640px) 50vw, 25vw",
  priority = false,
}: {
  product: Product;
  image?: ProductImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const primary = image ?? product.images[0];
  const src = primary ? import.meta.env.BASE_URL + primary.src.replace(/^\//, "") : null;

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={primary?.alt ?? product.name}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        onError={() => setFailed(true)}
        className={cx("h-full w-full object-cover object-top", className)}
      />
    );
  }

  return (
    <div className={cx("flex h-full w-full items-center justify-center p-4", className)} style={{ background: `linear-gradient(160deg, ${product.bg} 0%, #efe7d8 100%)` }}>
      <div className="h-full w-full"><GarmentArt garment={product.garment} ink={product.ink} accent={product.accent} /></div>
    </div>
  );
}

export function NoPhotoHint({ className }: { className?: string }) {
  return (
    <span className={cx("pointer-events-none absolute left-2.5 bottom-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-bold tracking-[0.1em] text-[#EDE5D5]/70 uppercase backdrop-blur", className)}>
      Illustration
    </span>
  );
}
