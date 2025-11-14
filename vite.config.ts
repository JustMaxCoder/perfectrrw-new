import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname, "public"), // 👈 теперь указываем на public
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "public/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"), // 👈 билд в dist/public
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});
