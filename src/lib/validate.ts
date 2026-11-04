/** Indian mobile numbers: 10 digits starting 6–9, optional +91 / 0 prefix. */
export function normalisePhone(raw: string): string {
  return raw.replace(/[^\d]/g, "").replace(/^(91)(?=\d{10}$)/, "").replace(/^0(?=\d{10}$)/, "");
}

export function isValidPhone(raw: string): boolean {
  const digits = normalisePhone(raw);
  return /^[6-9]\d{9}$/.test(digits);
}

export function isValidPin(raw: string): boolean {
  return /^[1-9]\d{5}$/.test(raw.trim());
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(raw.trim());
}

export const required = (v: string) => v.trim().length > 0;

export function digitsOnly(v: string, max: number): string {
  return v.replace(/\D/g, "").slice(0, max);
}

/** Prevent iOS zoom-on-focus: inputs must render at >=16px on mobile. */
export const INPUT_BASE =
  "w-full rounded-xl border bg-[#141315] px-4 py-3 text-base text-[#EDE5D5] placeholder:text-[#EDE5D5]/30 transition focus:outline-none";
