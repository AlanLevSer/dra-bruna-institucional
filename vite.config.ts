import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    react(),
    mcpPlugin(),
    mode === "development" && componentTagger(),

    mode === "development" &&
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: "dist/stats.html",
      }),
  ].filter(Boolean),
  // Use esbuild to drop console/debugger in build without terser
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
          if (["react", "react-dom", "react-router-dom"].some((name) => moduleId.includes(`/node_modules/${name}/`))) return "vendor-react";
          if (moduleId.includes("/node_modules/@radix-ui/")) return "vendor-ui";
          if (["react-hook-form", "@hookform/resolvers", "zod"].some((name) => moduleId.includes(`/node_modules/${name}/`))) return "vendor-form";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
}));
