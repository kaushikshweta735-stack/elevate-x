import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Development-only placeholder photography.
 *
 * Served by the dev server so the gallery, front/back/detail labels, zoom and
 * aspect-ratio handling can be exercised before real photos exist. These files
 * are never written to `public/`, so they cannot appear in a production build
 * or be mistaken for real inventory.
 */
function demoPhotos(): Plugin {
  const svg = (label: string, tint: string, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="${tint}"/>
  ${extra}
  <text x="400" y="470" text-anchor="middle" fill="#EDE5D5" font-family="Helvetica,Arial,sans-serif" font-size="52" font-weight="700" letter-spacing="6">${label}</text>
  <text x="400" y="530" text-anchor="middle" fill="#EDE5D5" opacity="0.45" font-family="Helvetica,Arial,sans-serif" font-size="24">demo placeholder — not real stock</text>
  <rect x="24" y="24" width="752" height="952" fill="none" stroke="#EDE5D5" stroke-opacity="0.15" stroke-width="2"/>
</svg>`;

  const files: Record<string, string> = {
    "demo-front.svg": svg("FRONT", "#2a1a1e"),
    "demo-back.svg": svg("BACK", "#171113"),
    "demo-detail.svg": svg("DETAIL", "#1d1512", `<circle cx="400" cy="430" r="140" fill="none" stroke="#D81F2A" stroke-opacity="0.55" stroke-width="4"/>`),
    "demo-fabric.svg": svg("FABRIC", "#241b18", `<pattern id="w" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#241b18"/><path d="M0 0h16M0 8h16" stroke="#3a2c28" stroke-width="3"/></pattern><rect width="800" height="1000" fill="url(#w)"/>`),
  };

  return {
    name: "elevate-demo-photos",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = (req.url ?? "").split("?")[0].split("/").pop() ?? "";
        const hit = files[name];
        if (!hit) return next();
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "no-store");
        res.end(hit);
      });
    },
  };
}

export default defineConfig({
  server: { host: "0.0.0.0", allowedHosts: true },
  preview: { host: "0.0.0.0", allowedHosts: true },
  plugins: [react(), tailwindcss(), demoPhotos(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
