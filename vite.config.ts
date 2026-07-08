import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Raise warning threshold — 3D/animation libs are inherently large
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Vite 8 / Rolldown: use function form for manualChunks
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("three") || id.includes("@react-three")) {
              return "vendor-three";
            }
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("highlight.js") || id.includes("marked")) {
              return "vendor-markdown";
            }
            if (id.includes("react-dom") || id.includes("react-router")) {
              return "vendor-react";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }
          }
        },
      },
    },
  },
});
