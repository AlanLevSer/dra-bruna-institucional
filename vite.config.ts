import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    react(),

    mode === "development" &&
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: "dist/stats.html",
      }),
  ].filter(Boolean),
  esbuild: {
    drop: ["console", "debugger"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(moduleId) {
          if (["react", "react-dom", "react-router-dom"].some((n) => moduleId.includes(`/node_modules/${n}/`))) return "vendor-react";
          if (moduleId.includes("/node_modules/@radix-ui/")) return "vendor-ui";
          if (["react-hook-form", "@hookform/resolvers", "zod"].some((n) => moduleId.includes(`/node_modules/${n}/`))) return "vendor-form";
          if (moduleId.includes("/node_modules/@supabase/") || moduleId.includes("/node_modules/supabase")) return "vendor-supabase";
          if (moduleId.includes("/node_modules/embla-carousel")) return "vendor-carousel";
          if (moduleId.includes("/node_modules/lucide-react")) return "vendor-icons";
          if (moduleId.includes("/node_modules/canvas-confetti")) return "vendor-confetti";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
}));
