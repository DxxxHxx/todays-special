import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/blog": {
        target: "https://openapi.naver.com/v1/search/blog",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/blog/, ""),
        secure: false,
        ws: true,
      },
      "/api/local": {
        target: "https://openapi.naver.com/v1/search/local",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/local/, ""),
        secure: false,
        ws: true,
      },
      "/api/delete-account": {
        target:
          "https://secyvyavvwffrkyewhbt.supabase.co/functions/v1/delete-account",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/delete-account/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
