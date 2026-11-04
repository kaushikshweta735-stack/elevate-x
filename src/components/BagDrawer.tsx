import { useEffect } from "react";
import { DELIVERY } from "../data/shop";
import { inr } from "../lib/format";
import { useShop } from "../store/shop";
import { ProductMedia } from "./ProductMedia";
import { IconBag, IconClose, IconWhatsApp, Stepper } from "./ui";

export default function BagDrawer({
  open,
  onClose,
  navigate,
}: {
  open: boolean;
  onClose: () => void;
  navigate: (to: string) => void;
}) {
  const { lines, count, subtotal, deliveryCharge, setQty, removeLine } = useShop();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />
      <aside className="drawer-in absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-[#EDE5D5]/12 bg-[#0c0a0e] shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#EDE5D5]/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <IconBag className="h-5 w-5 text-[#EDE5D5]/60" />
            <h2 className="font-display text-2xl font-extrabold tracking-wide uppercase">Your bag</h2>
            <span className="rounded-full bg-white/8 px-2 py-0.5 text-xs font-bold text-[#EDE5D5]/70">{count}</span>
          </div>
          <button onClick={onClose} aria-label="Close bag" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-[#EDE5D5] transition hover:bg-white/15">
            <IconClose className="h-4 w-4" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#EDE5D5]/12 bg-white/[0.03]">
              <IconBag className="h-7 w-7 text-[#EDE5D5]/35" />
            </div>
            <p className="mt-4 text-lg font-bold">Your bag is empty</p>
            <p className="mt-1 max-w-[16rem] text-sm text-[#EDE5D5]/50">Every piece is one of one. When it sells, it's gone.</p>
            <button
              onClick={() => { onClose(); navigate("/shop"); }}
              className="btn btn-cream mt-6 px-6 py-3 text-sm"
            >
              Browse the rack
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-3">
                {lines.map(({ id, product, size, qty, lineTotal }) => (
                  <li key={id} className="flex gap-3 rounded-xl border border-[#EDE5D5]/10 bg-white/[0.02] p-2.5">
                    <button
                      onClick={() => { onClose(); navigate(`/product/${product.slug}`); }}
                      className="product-frame w-20 shrink-0 overflow-hidden rounded-lg"
                      aria-label={`View ${product.name}`}
                    >
                      <ProductMedia product={product} sizes="80px" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-bold">{product.name}</p>
                        <button
                          onClick={() => removeLine(id)}
                          aria-label={`Remove ${product.name} from bag`}
                          className="shrink-0 text-[#EDE5D5]/40 transition hover:text-[#ff8b92]"
                        >
                          <IconClose className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-[11px] font-semibold tracking-wide text-[#EDE5D5]/45 uppercase">
                        Size {size} · {product.condition}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <Stepper qty={qty} onChange={(q) => setQty(id, q)} label={product.name} />
                        <span className="font-display text-lg font-extrabold">{inr(lineTotal)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={`/shop`}
                onClick={(e) => { e.preventDefault(); onClose(); navigate("/shop"); }}
                className="mt-4 inline-block text-xs font-bold tracking-wide text-[#EDE5D5]/50 underline-offset-4 uppercase hover:text-[#EDE5D5] hover:underline"
              >
                Continue shopping
              </a>
            </div>

            <footer className="border-t border-[#EDE5D5]/10 bg-[#0a090c] px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#EDE5D5]/60">Subtotal</span>
                <span className="font-display text-2xl font-extrabold">{inr(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[#EDE5D5]/40">
                {deliveryCharge === null ? DELIVERY.note : deliveryCharge === 0 ? "Delivery free on this order." : `Delivery ${inr(deliveryCharge)} — confirmed at checkout.`}
              </p>
              <button
                onClick={() => { onClose(); navigate("/checkout"); }}
                className="btn btn-primary mt-3 w-full py-3.5 text-sm"
              >
                Place order
              </button>
              <a
                href={`https://wa.me/918571064108`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost mt-2 w-full py-3 text-xs"
              >
                <IconWhatsApp className="h-4 w-4" /> Ask about your bag first
              </a>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
