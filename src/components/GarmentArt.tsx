import type { Garment } from "../data/products";

/** Lightweight animated garment illustrations (no external images needed). */
export default function GarmentArt({ garment, ink, accent }: { garment: Garment; ink: string; accent: string }) {
  const common = { fill: ink, stroke: "#111", strokeWidth: 2, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 200 200" className="garment-art h-full w-full drop-shadow-[0_18px_20px_rgba(0,0,0,0.18)]" role="img" aria-label={garment}>
      {garment === "jacket" && (<g><path d="M70 30 L40 45 L28 95 L52 100 L52 170 L148 170 L148 100 L172 95 L160 45 L130 30 Q100 48 70 30Z" {...common}/><path d="M100 48 L100 170" stroke={accent} strokeWidth="5"/><circle cx="88" cy="80" r="4" fill={accent}/><circle cx="88" cy="105" r="4" fill={accent}/><path d="M52 130 h34 M114 130 h34" stroke="#111" strokeWidth="3"/></g>)}
      {garment === "tee" && (<g><path d="M70 35 L35 55 L50 90 L68 82 L68 168 L132 168 L132 82 L150 90 L165 55 L130 35 Q100 55 70 35Z" {...common}/><circle cx="100" cy="108" r="24" fill={accent} stroke="#111" strokeWidth="2"/><text x="100" y="115" textAnchor="middle" fontSize="16" fontWeight="800" fill="#111">X</text></g>)}
      {garment === "hoodie" && (<g><path d="M100 22 Q65 22 62 55 L40 70 L32 115 L56 120 L56 172 L144 172 L144 120 L168 115 L160 70 L138 55 Q135 22 100 22Z" {...common}/><path d="M78 58 Q100 78 122 58" fill="none" stroke={accent} strokeWidth="5"/><rect x="78" y="135" width="44" height="24" rx="6" fill={accent} stroke="#111" strokeWidth="2"/></g>)}
      {garment === "dress" && (<g><path d="M78 28 L95 28 L100 60 L105 28 L122 28 L112 78 L140 172 L60 172 L88 78Z" {...common}/><path d="M88 78 h24 M72 135 h56 M66 155 h68" stroke={accent} strokeWidth="5"/></g>)}
      {garment === "jeans" && (<g><path d="M62 28 L138 28 L146 172 L112 172 L100 78 L88 172 L54 172Z" {...common}/><path d="M62 48 h76 M75 28 v28 M125 28 v28" stroke={accent} strokeWidth="4" fill="none"/></g>)}
      {garment === "shirt" && (<g><path d="M70 32 L38 50 L30 92 L54 98 L54 170 L146 170 L146 98 L170 92 L162 50 L130 32 Q100 50 70 32Z" {...common}/><path d="M70 70 h60 M70 105 h60 M70 140 h60 M85 32 v138 M115 32 v138" stroke={accent} strokeWidth="3" opacity=".7"/></g>)}
      {garment === "skirt" && (<g><path d="M64 45 L136 45 L152 165 L48 165Z" {...common}/><path d="M64 62 h72 M80 45 L72 165 M100 45 V165 M120 45 L128 165" stroke={accent} strokeWidth="4"/></g>)}
      {garment === "bag" && (<g><path d="M55 72 L145 72 L138 172 L62 172Z" {...common}/><path d="M75 72 Q75 38 100 38 Q125 38 125 72" fill="none" stroke="#111" strokeWidth="7"/><circle cx="100" cy="118" r="20" fill={accent} stroke="#111" strokeWidth="2"/><text x="100" y="125" textAnchor="middle" fontSize="15" fontWeight="800" fill="#111">EX</text></g>)}
    </svg>
  );
}
