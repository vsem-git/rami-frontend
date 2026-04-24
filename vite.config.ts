import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { prerenderRoutes } from "./src/shared/seo/routes";
import { editablePlugin } from "./plugins/editable";

const require = createRequire(import.meta.url);
const prerender = require("vite-plugin-prerender");
const configDir = path.dirname(fileURLToPath(import.meta.url));
const isVercelBuild = process.env.VERCEL === "1";
const isCi = process.env.CI === "true";
const shouldRunPrerender = process.env.PRERENDER !== "false" && !isVercelBuild && !isCi;

const reactPlugin = react({
    babel: { plugins: [editablePlugin] },
});

// https://vite.dev/config/
export default defineConfig({
    plugins: shouldRunPrerender
        ? [
              reactPlugin,
              tailwindcss(),
              prerender({
                  staticDir: path.resolve(configDir, "dist"),
                  outputDir: path.resolve(configDir, "dist"),
                  routes: prerenderRoutes,
                  rendererOptions: {
                      renderAfterDocumentEvent: "seo-ready",
                      timeout: 15000,
                  },
              }),
          ]
        : [reactPlugin, tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(configDir, "src"),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
    },
});
