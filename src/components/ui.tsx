import type { ReactNode } from "react";
import { cx } from "../lib/format";
import type { Availability } from "../data/products";

/* ---------------- Icons (inline, no icon dependency) ---------------- */
type IconProps = { className?: string };
const base = "h-5 w-5";

export const IconSearch = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" />
  </svg>
);
export const IconHeart = ({ className = base, filled = false }: IconProps & { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 3.2C19.5 15.4 12 20 12 20Z" strokeLinejoin="round" />
  </svg>
);
export const IconBag = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M4.5 8h15l-1.2 11.2a1.5 1.5 0 0 1-1.5 1.3H7.2a1.5 1.5 0 0 1-1.5-1.3L4.5 8Z" strokeLinejoin="round" />
    <path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8" strokeLinecap="round" />
  </svg>
);
export const IconClose = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
);
export const IconMenu = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
  </svg>
);
export const IconArrow = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconChevron = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconCheck = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconWhatsApp = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.31-1.93 1.36-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.2-4.94-4.4-.14-.19-1.16-1.55-1.16-2.95s.73-2.09 1-2.38c.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
  </svg>
);
export const IconInstagram = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
export const IconMail = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconPin = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M12 21s6.5-6.1 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 14.9 12 21 12 21Z" strokeLinejoin="round" />
    <circle cx="12" cy="10.5" r="2.4" />
  </svg>
);
export const IconTruck = ({ className = base }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
    <path d="M2.5 7.5h10v9h-10zM12.5 11h4l3 3v2.5h-7z" strokeLinejoin="round" />
    <circle cx="6.5" cy="18" r="1.6" /><circle cx="16.5" cy="18" r="1.6" />
  </svg>
);

/* ---------------- Small building blocks ---------------- */

export function Badge({ children, tone = "bone", className }: { children: ReactNode; tone?: "bone" | "red" | "muted"; className?: string }) {
  const tones = {
    bone: "bg-[#EDE5D5]/12 text-[#EDE5D5] border-[#EDE5D5]/18",
    red: "bg-[#D81F2A] text-white border-transparent",
    muted: "bg-white/5 text-[#EDE5D5]/60 border-white/10",
  } as const;
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-[0.08em] uppercase", tones[tone], className)}>
      {children}
    </span>
  );
}

export function AvailabilityNote({ availability }: { availability: Availability }) {
  const map = {
    "in-stock": { dot: "bg-[#57b26a]", label: "In stock" },
    reserved: { dot: "bg-[#d8a423]", label: "On hold" },
    sold: { dot: "bg-[#8b8380]", label: "Sold" },
  } as const;
  const s = map[availability];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EDE5D5]/65">
      <span className={cx("h-1.5 w-1.5 rounded-full", s.dot)} aria-hidden="true" />
      {s.label}
    </span>
  );
}

export function Stepper({ qty, onChange, label, max = 5, disabled }: { qty: number; onChange: (q: number) => void; label: string; max?: number; disabled?: boolean }) {
  return (
    <div className="inline-flex items-center rounded-full border border-[#EDE5D5]/18 bg-white/[0.04]" role="group" aria-label={`Quantity for ${label}`}>
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        disabled={disabled}
        aria-label={`Decrease quantity of ${label}`}
        className="flex h-8 w-8 items-center justify-center rounded-full text-base text-[#EDE5D5]/75 transition hover:bg-white/10 disabled:opacity-40"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-bold tabular-nums" aria-live="polite">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={disabled || qty >= max}
        aria-label={`Increase quantity of ${label}`}
        className="flex h-8 w-8 items-center justify-center rounded-full text-base text-[#EDE5D5]/75 transition hover:bg-white/10 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-2 text-[#D81F2A]">{eyebrow}</p>}
        <h2 className="display-lg text-3xl sm:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Spinner({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={cx("animate-spin", className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
