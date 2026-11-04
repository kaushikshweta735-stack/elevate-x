import { useCallback, useEffect, useState } from "react";
import BagDrawer from "./components/BagDrawer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useRouter } from "./lib/router";
import { ShopProvider, useShop } from "./store/shop";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";

function Shell() {
  const { route, navigate, params, url } = useRouter();
  const { toast, count } = useShop();
  const [bagOpen, setBagOpen] = useState(false);
  const [query, setQuery] = useState("");

  /* Search box value follows ?q= so the header stays in sync. */
  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [url]);

  const setParams = useCallback((next: Record<string, string | null>) => {
    const p = new URLSearchParams(window.location.search);
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === "") p.delete(k);
      else p.set(k, v);
    }
    const qs = p.toString();
    navigate(`${window.location.pathname}${qs ? `?${qs}` : ""}`, { keepScroll: true });
  }, [navigate]);

  /* Bag shortcut + escape closes */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setBagOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col">
      <a href="#main" className="skip-link">Skip to content</a>

      <Header
        route={route.name}
        navigate={navigate}
        onOpenBag={() => setBagOpen(true)}
        query={query}
        onQuery={(q) => { setQuery(q); }}
      />

      <main id="main" className="flex-1">
        {route.name === "home" && <Home navigate={navigate} />}
        {route.name === "shop" && (
          <Shop
            navigate={navigate}
            params={params}
            setParams={setParams}
            headingOverride={
              window.location.pathname === "/new-arrivals"
                ? { eyebrow: "Fresh on the rack", title: "New arrivals", blurb: "The most recent pieces to land on the rack." }
                : undefined
            }
          />
        )}
        {route.name === "product" && <ProductPage key={route.slug} slug={route.slug} navigate={navigate} />}
        {route.name === "checkout" && <Checkout navigate={navigate} />}
        {route.name === "about" && <About navigate={navigate} />}
        {route.name === "contact" && <Contact />}
        {route.name === "notfound" && (
          <div className="mx-auto max-w-lg px-4 py-24 text-center">
            <p className="eyebrow text-[#D81F2A]">404</p>
            <h1 className="display-lg mt-2 text-4xl">This page doesn't exist</h1>
            <p className="mt-3 text-sm text-[#EDE5D5]/55">The link may be old, or the piece may have sold.</p>
            <button onClick={() => navigate("/shop")} className="btn btn-cream mt-6 px-6 py-3 text-sm">Browse the rack</button>
          </div>
        )}
      </main>

      <Footer navigate={navigate} />

      <BagDrawer open={bagOpen} onClose={() => setBagOpen(false)} navigate={navigate} />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/918571064108?text=Hi%20Elevate%20X%20Thrift!%20I%20have%20a%20question%20about%20a%20piece."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Elevate X Thrift on WhatsApp"
        className={`fixed right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#1fb457] text-[#04150a] shadow-lg shadow-black/50 transition hover:bg-[#24c962] sm:right-6 sm:bottom-6 sm:h-14 sm:w-14 ${
          count > 0 && !bagOpen ? "bottom-20" : "bottom-4"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.31-1.93 1.36-.53.05-1.03.24-3.47-.72-2.94-1.16-4.79-4.2-4.94-4.4-.14-.19-1.16-1.55-1.16-2.95s.73-2.09 1-2.38c.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
        </svg>
      </a>

      {/* Mobile bag bar */}
      {count > 0 && !bagOpen && (
        <button
          onClick={() => setBagOpen(true)}
          className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-full bg-[#EDE5D5] px-5 py-3 text-sm font-bold text-[#0b0a0c] shadow-xl shadow-black/60 sm:hidden"
        >
          <span>{count} {count === 1 ? "piece" : "pieces"} in bag</span>
          <span>View bag →</span>
        </button>
      )}

      {/* Toast */}
      <div aria-live="polite" aria-atomic="true">
        {toast && (
          <div className="toast-in fixed bottom-20 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-[#EDE5D5]/15 bg-[#131116] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[#EDE5D5] shadow-xl sm:bottom-6">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Shell />
    </ShopProvider>
  );
}
