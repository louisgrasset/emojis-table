import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportType: "named",
      jsxRuntime: "classic",
    }),
    crx({ manifest }),
  ],
});
