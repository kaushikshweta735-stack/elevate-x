import { useState } from "react";

/**
 * The official Elevate x Thrift crest.
 * Files live in /public — `crest-160.png` is the raster fallback,
 * `crest-512.webp` is used where a larger source helps (footers, hero).
 */
export default function SiteMark({ className = "h-12 w-12" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    // graceful fallback: the crossed-X monogram, drawn inline
    return (
      <svg viewBox="0 0 64 64" className={className} aria-label="Elevate x Thrift" role="img">
        <circle cx="32" cy="32" r="30" fill="#0A0A0B" stroke="#EDE5D5" strokeOpacity=".5" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="#E02330" strokeWidth="1.5" />
        <path d="M20 20h6l6 9 6-9h6l-9 12 9 12h-6l-6-9-6 9h-6l9-12z" fill="#E02330" />
      </svg>
    );
  }
  return (
    <picture>
      <source srcSet={`${import.meta.env.BASE_URL}crest-512.webp`} type="image/webp" />
      <img
        src={`${import.meta.env.BASE_URL}crest-160.png`}
        alt="Elevate x Thrift crest — Buy. Wear. Repeat."
        width={512}
        height={512}
        onError={() => setFailed(true)}
        className={`${className} object-contain`}
      />
    </picture>
  );
}
