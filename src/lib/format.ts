export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");

/** 4:5 stock photo → ask suppliers to keep this ratio so the grid stays even. */
export const IMAGE_RATIO = "4 / 5";
