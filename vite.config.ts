import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { prerenderRoutes } from "./src/shared/seo/routes";

const require = createRequire(import.meta.url);
const prerender = require("vite-plugin-prerender");
const configDir = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        prerender({
            staticDir: path.resolve(configDir, "dist"),
            outputDir: path.resolve(configDir, "dist"),
            routes: prerenderRoutes,
        }),
    ],
    server: {
        host: "0.0.0.0",
        port: 5173,
    },
});
