import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from 'path';
import svgr from "vite-plugin-svgr";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), dts(), svgr({
      svgrOptions: { icon: true },
    }),],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
