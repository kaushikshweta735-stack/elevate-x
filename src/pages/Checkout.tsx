import { useMemo, useRef, useState } from "react";
import { DELIVERY, INDIAN_STATES } from "../data/shop";
import { SITE, waLink } from "../data/site";
import { inr } from "../lib/format";
import { buildOrderMessage, deliveryLabel, formatAddress, makeReference, recordOrder, whatsappOrderLink } from "../lib/order";
import { digitsOnly, isValidEmail, isValidPhone, isValidPin } from "../lib/validate";
import { useShop, type CheckoutDetails } from "../store/shop";
import { ProductMedia } from "../components/ProductMedia";
import { IconArrow, IconCheck, IconWhatsApp, Spinner, Stepper } from "../components/ui";

type Step = "details" | "review" | "sent";
type Errors = Partial<Record<keyof CheckoutDetails, string>>;

const REQUIRED: (keyof CheckoutDetails)[] = ["fullName", "phone", "email", "house", "street", "city", "state", "pin"];

function validate(d: CheckoutDetails): Errors {
  const e: Errors = {};
  if (!d.fullName.trim()) e.fullName = "Please enter your full name.";
  if (!d.phone.trim()) e.phone = "Please enter your mobile number.";
  else if (!isValidPhone(d.phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!d.email.trim()) e.email = "Please enter your email address.";
  else if (!isValidEmail(d.email)) e.email = "That email doesn't look right.";
  if (!d.house.trim()) e.house = "House / flat number is required.";
  if (!d.street.trim()) e.street = "Street or area is required.";
  if (!d.city.trim()) e.city = "City or district is required.";
  if (!d.state.trim()) e.state = "Please select your state.";
  if (!d.pin.trim()) e.pin = "PIN code is required.";
  else if (!isValidPin(d.pin)) e.pin = "PIN code must be 6 digits.";
  return e;
}


/**
 * Field lives at module scope on purpose: declaring it inside Checkout would
 * give it a new component identity every render, remounting the input and
 * stealing focus after each keystroke.
 */
function Field({
  id, label, value, onChange, onBlur, error, required, ...rest
}: {
  id: keyof CheckoutDetails;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "value" | "onChange" | "onBlur">) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="field-label">
        {label}{required && <span className="ml-1 text-[#D81F2A]">*</span>}
      </label>
      <input
        id={`field-${id}`}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `error-${id}` : undefined}
        className="field"
        {...rest}
      />
      {error && <p id={`error-${id}`} className="field-error">{error}</p>}
    </div>
  );
}

export default function Checkout({ navigate }: { navigate: (to: string) => void }) {
  const { lines, subtotal, deliveryCharge, total, setQty, removeLine, details, setDetails, count } = useShop();
  const [step, setStep] = useState<Step>("details");
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutDetails, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [opening, setOpening] = useState(false);
  const [reference, setReference] = useState("");
  const orderRef = useRef("");

  const errors = useMemo(() => validate(details), [details]);
  const showError = (k: keyof CheckoutDetails) =>
    (submitted || touched[k]) && errors[k] ? errors[k] : undefined;

  const markTouched = (key: keyof CheckoutDetails) =>
    setTouched((t) => ({ ...t, [key]: true }));

  const update = (key: keyof CheckoutDetails, value: string) => {
    setDetails({ ...details, [key]: value });
  };

  const scrollToFirstError = () => {
    const first = REQUIRED.find((k) => errors[k]);
    if (!first) return;
    const el = document.getElementById(`field-${first}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    (el as HTMLInputElement | null)?.focus({ preventScroll: true });
  };

  const goReview = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) {
      scrollToFirstError();
      return;
    }
    setStep("review");
    window.scrollTo({ top: 0 });
  };

  const order = useMemo(() => {
    if (!reference) return null;
    return {
      lines,
      subtotal,
      deliveryCharge,
      total,
      details,
      reference,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, details, subtotal, deliveryCharge, total]);

  const confirm = async () => {
    const ref = orderRef.current || makeReference();
    orderRef.current = ref;
    setReference(ref);
    setOpening(true);

    const draft = { lines, subtotal, deliveryCharge, total, details, reference: ref };
    const href = whatsappOrderLink(draft);

    // Open WhatsApp immediately — a popup blocker must not be able to swallow it
    const win = window.open(href, "_blank", "noopener,noreferrer");
    if (win) await recordOrder(draft);
    setOpening(false);
    setStep(win ? "sent" : "review");
    if (!win) {
      // popup blocked: let them use the plain link instead
      setStep("sent");
    }
    window.scrollTo({ top: 0 });
  };

  /* ---------------- Empty bag ---------------- */
  if (lines.length === 0 && step !== "sent") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#EDE5D5]/15 bg-white/[0.03]">
          <IconArrow className="h-6 w-6 -rotate-180 text-[#EDE5D5]/40" />
        </div>
        <h1 className="display-lg mt-5 text-3xl">Your bag is empty</h1>
        <p className="mt-2 text-sm text-[#EDE5D5]/55">Add a piece to your bag and your checkout details will be waiting here.</p>
        <button onClick={() => navigate("/shop")} className="btn btn-cream mt-6 px-6 py-3 text-sm">Browse the rack</button>
      </div>
    );
  }

  /* ---------------- Sent / confirmation ---------------- */
  if (step === "sent") {
    const draft = order ?? { lines, subtotal, deliveryCharge, total, details, reference: orderRef.current };
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-[#EDE5D5]/14 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#57b26a]/15 text-[#7ed08d]">
              <IconCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow text-[#EDE5D5]/45">Order request {orderRef.current}</p>
              <h1 className="font-display text-2xl font-extrabold uppercase">Almost there — press send</h1>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#EDE5D5]/75">
            <p>
              We've opened WhatsApp with your full order details filled in.
              <strong className="text-[#EDE5D5]"> Your order isn't placed until you press Send in WhatsApp</strong> and we reply to confirm stock and delivery.
            </p>
            <p className="rounded-xl border border-[#d8a423]/25 bg-[#d8a423]/10 p-3 text-[13px] text-[#f0d79a]">
              Nothing has been charged. We confirm availability and delivery by PIN code first, then send payment details.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a href={whatsappOrderLink(draft)} target="_blank" rel="noreferrer" className="btn btn-whatsapp flex-1 px-5 py-3.5 text-sm">
              <IconWhatsApp className="h-5 w-5" /> Open WhatsApp again
            </a>
            <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Order ${orderRef.current}`)}&body=${encodeURIComponent(buildOrderMessage(draft))}`} className="btn btn-ghost flex-1 px-5 py-3.5 text-sm">
              Email the order instead
            </a>
          </div>

          <details className="mt-5 rounded-xl border border-[#EDE5D5]/12 bg-black/25 p-4">
            <summary className="cursor-pointer text-xs font-bold tracking-wide text-[#EDE5D5]/60 uppercase">View your order message</summary>
            <pre className="mt-3 max-h-72 overflow-auto text-[12px] leading-relaxed whitespace-pre-wrap text-[#EDE5D5]/70">{buildOrderMessage(draft)}</pre>
          </details>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => navigate("/shop")} className="text-sm font-semibold text-[#EDE5D5]/55 underline underline-offset-4 hover:text-[#EDE5D5]">
              Keep shopping
            </button>
            <button onClick={() => setStep("review")} className="text-sm font-semibold text-[#EDE5D5]/55 underline underline-offset-4 hover:text-[#EDE5D5]">
              Back to order summary
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-[#EDE5D5]/35">
          Your bag is kept until the order is confirmed. Message us on{" "}
          <a href={waLink(`Hi! Following up on order ${orderRef.current}.`)} target="_blank" rel="noreferrer" className="font-semibold text-[#EDE5D5]/70 underline underline-offset-2">WhatsApp</a>{" "}
          or {SITE.email} with the reference above.
        </p>
      </div>
    );
  }

  const summary = (compact = false) => (
    <div className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-4">
      <h2 className="eyebrow mb-3 text-[#EDE5D5]/40">Order summary ({count})</h2>
      <ul className="space-y-3">
        {lines.map(({ id, product, size, qty, lineTotal }) => (
          <li key={id} className="flex gap-3">
            <div className="product-frame w-14 shrink-0 overflow-hidden rounded-lg">
              <ProductMedia product={product} sizes="56px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{product.name}</p>
              <p className="text-[11px] text-[#EDE5D5]/45">Size {size} · {product.condition}</p>
              {!compact ? (
                <div className="mt-1.5 flex items-center justify-between">
                  <Stepper qty={qty} onChange={(q) => setQty(id, q)} label={product.name} />
                  <span className="text-sm font-bold">{inr(lineTotal)}</span>
                </div>
              ) : (
                <div className="mt-1.5 flex items-center justify-between text-sm">
                  <span className="text-[#EDE5D5]/55">Qty {qty} × {inr(product.price)}</span>
                  <span className="font-bold">{inr(lineTotal)}</span>
                </div>
              )}
            </div>
            {!compact && (
              <button onClick={() => removeLine(id)} aria-label={`Remove ${product.name}`} className="self-start text-[#EDE5D5]/35 hover:text-[#ff8b92]">✕</button>
            )}
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-1.5 border-t border-[#EDE5D5]/10 pt-3 text-sm">
        <div className="flex justify-between"><dt className="text-[#EDE5D5]/55">Subtotal</dt><dd className="font-semibold">{inr(subtotal)}</dd></div>
        <div className="flex justify-between">
          <dt className="text-[#EDE5D5]/55">Delivery</dt>
          <dd className="font-semibold">{deliveryCharge === null ? <span className="text-[#d8a423]">To be confirmed</span> : deliveryLabel(deliveryCharge)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-[#EDE5D5]/10 pt-2">
          <dt className="font-bold">{total === null ? "Estimated total" : "Total"}</dt>
          <dd className="font-display text-2xl font-extrabold">{total === null ? inr(subtotal) : inr(total)}</dd>
        </div>
      </dl>
      {deliveryCharge === null && (
        <p className="mt-2 text-[11px] leading-relaxed text-[#EDE5D5]/40">{DELIVERY.note}</p>
      )}
    </div>
  );

  /* ---------------- Review ---------------- */
  if (step === "review") {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="display-lg text-3xl sm:text-4xl">Review your order</h1>
        <p className="mt-1 text-sm text-[#EDE5D5]/50">Check the delivery details, then confirm to send the order on WhatsApp.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <section className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="eyebrow text-[#EDE5D5]/40">Delivery details</h2>
                <button onClick={() => setStep("details")} className="text-xs font-bold text-[#EDE5D5] underline underline-offset-4">Edit details</button>
              </div>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div><p className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Name</p><p className="font-semibold">{details.fullName}</p></div>
                <div><p className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Mobile</p><p className="font-semibold">{details.phone}</p></div>
                <div className="sm:col-span-2"><p className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Email</p><p className="font-semibold break-all">{details.email}</p></div>
                <div className="sm:col-span-2"><p className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Address</p>
                  <p className="leading-relaxed whitespace-pre-line text-[#EDE5D5]/85">{formatAddress(details)}</p>
                </div>
                {details.notes.trim() && (
                  <div className="sm:col-span-2"><p className="text-[11px] tracking-wide text-[#EDE5D5]/40 uppercase">Notes</p><p className="text-[#EDE5D5]/85">{details.notes}</p></div>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5">
              <h2 className="eyebrow mb-3 text-[#EDE5D5]/40">Pieces ({count})</h2>
              <ul className="divide-y divide-[#EDE5D5]/8">
                {lines.map(({ id, product, size, qty, lineTotal }) => (
                  <li key={id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                    <div className="product-frame w-16 shrink-0 overflow-hidden rounded-lg">
                      <ProductMedia product={product} sizes="64px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold">{product.name}</p>
                      <p className="text-[11px] text-[#EDE5D5]/45">Size {size} · {product.condition} · {product.availability === "reserved" ? "On hold" : "In stock"}</p>
                      <p className="mt-1 text-xs text-[#EDE5D5]/60">Qty {qty} × {inr(product.price)}</p>
                    </div>
                    <span className="text-sm font-bold">{inr(lineTotal)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-4">
            {summary(true)}
            <div className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-4">
              <button onClick={confirm} disabled={opening} className="btn btn-primary w-full py-3.5 text-sm">
                {opening ? <><Spinner className="h-4 w-4" /> Opening WhatsApp…</> : <><IconWhatsApp className="h-5 w-5" /> Confirm order on WhatsApp</>}
              </button>
              <p className="mt-2.5 text-center text-[11px] leading-relaxed text-[#EDE5D5]/40">
                You'll be able to review the message before sending. Your order is only placed once you press Send.
              </p>
              <button onClick={() => setStep("details")} className="btn btn-ghost mt-2 w-full py-2.5 text-xs">Edit details</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Details ---------------- */
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="display-lg text-3xl sm:text-4xl">Checkout</h1>
          <p className="mt-1 text-sm text-[#EDE5D5]/50">Step 1 of 2 — where should we send it?</p>
        </div>
        <button onClick={() => navigate("/shop")} className="text-xs font-bold tracking-wide text-[#EDE5D5]/50 uppercase hover:text-[#EDE5D5]">← Continue shopping</button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <form onSubmit={goReview} noValidate className="space-y-5">
          <section className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5">
            <h2 className="eyebrow mb-4 text-[#EDE5D5]/40">Contact information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="fullName" label="Full name" required value={details.fullName} onChange={(v) => update("fullName", v)} onBlur={() => markTouched("fullName")} error={showError("fullName")} autoComplete="name" placeholder="Kartik Tyagi" />
              <Field id="phone" label="Mobile number" required value={details.phone} onChange={(v) => update("phone", digitsOnly(v, 10))} onBlur={() => markTouched("phone")} error={showError("phone")} type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" />
              <div className="sm:col-span-2">
                <Field id="email" label="Email address" required value={details.email} onChange={(v) => update("email", v)} onBlur={() => markTouched("email")} error={showError("email")} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#EDE5D5]/12 bg-white/[0.02] p-5">
            <h2 className="eyebrow mb-4 text-[#EDE5D5]/40">Delivery address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="house" label="House / flat no." required value={details.house} onChange={(v) => update("house", v)} onBlur={() => markTouched("house")} error={showError("house")} autoComplete="address-line1" placeholder="H.No 123" />
              <Field id="street" label="Street / area / locality" required value={details.street} onChange={(v) => update("street", v)} onBlur={() => markTouched("street")} error={showError("street")} autoComplete="address-line2" placeholder="Model Town" />
              <Field id="landmark" label="Landmark (optional)" value={details.landmark} onChange={(v) => update("landmark", v)} placeholder="Near Shiv Mandir" />
              <Field id="city" label="City / district" required value={details.city} onChange={(v) => update("city", v)} onBlur={() => markTouched("city")} error={showError("city")} autoComplete="address-level2" placeholder="Panipat" />
              <div>
                <label htmlFor="field-state" className="field-label">State <span className="ml-1 text-[#D81F2A]">*</span></label>
                <select
                  id="field-state"
                  name="state"
                  value={details.state}
                  onChange={(e) => update("state", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, state: true }))}
                  aria-invalid={Boolean(showError("state"))}
                  aria-describedby={showError("state") ? "error-state" : undefined}
                  className="field"
                  autoComplete="address-level1"
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {showError("state") && <p id="error-state" className="field-error">{showError("state")}</p>}
              </div>
              <Field id="pin" label="PIN code" required value={details.pin} onChange={(v) => update("pin", digitsOnly(v, 6))} onBlur={() => markTouched("pin")} error={showError("pin")} type="text" inputMode="numeric" autoComplete="postal-code" placeholder="132103" />
              <div>
                <label htmlFor="field-country" className="field-label">Country</label>
                <input id="field-country" name="country" value={details.country} readOnly className="field opacity-70" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="field-notes" className="field-label">Order notes (optional)</label>
                <textarea
                  id="field-notes"
                  name="notes"
                  value={details.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={3}
                  placeholder="Delivery instructions, preferred time, questions about a piece…"
                  className="field resize-y"
                />
              </div>
            </div>
          </section>

          {submitted && Object.keys(errors).length > 0 && (
            <div role="alert" className="rounded-xl border border-[#D81F2A]/40 bg-[#D81F2A]/10 p-4 text-sm text-[#ffb3b8]">
              Please fix the highlighted fields — {Object.keys(errors).length} {Object.keys(errors).length === 1 ? "field needs" : "fields need"} attention.
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row-reverse">
            <button type="submit" className="btn btn-primary flex-1 py-3.5 text-sm">
              Review order <IconArrow className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => navigate("/shop")} className="btn btn-ghost flex-1 py-3.5 text-sm">
              Keep shopping
            </button>
          </div>

          <p className="text-center text-[11px] text-[#EDE5D5]/35">
            We only use these details to deliver your order. No payment is taken on this site.
          </p>
        </form>

        <div className="lg:sticky lg:top-24 lg:self-start">{summary()}</div>
      </div>
    </div>
  );
}
