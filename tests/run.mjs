import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import path from "node:path";

const files = process.argv.slice(2);
const targets = files.length ? files : ["tests/journey.test.tsx", "tests/layout.test.tsx", "tests/interaction.test.tsx", "tests/cms.test.tsx"];
const outputs = [];
for (const target of targets) {
  const out = path.resolve(`tests/.build/${path.basename(target, ".tsx")}.test.cjs`);
  outputs.push(out);
  await build({
  entryPoints: [target],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: out,
  external: ["jsdom", "node:test", "@testing-library/react", "@testing-library/dom", "react", "react-dom", "react-dom/client"],
  jsx: "automatic",
  logLevel: "error",
  define: {
    "import.meta.env.BASE_URL": '"/"',
    "import.meta.env.DEV": "false",
    "import.meta.env.PROD": "true",
    "import.meta.env.VITE_ORDERS_ENDPOINT": "undefined",
    "import.meta.env.VITE_SANITY_PROJECT_ID": "undefined",
    "import.meta.env.VITE_SANITY_DATASET": "undefined",
  },
  });
}
const res = spawnSync(process.execPath, ["--test", ...outputs], { stdio: "inherit" });
process.exit(res.status ?? 1);
