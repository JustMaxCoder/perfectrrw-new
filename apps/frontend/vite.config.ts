import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname, "."),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../../packages/shared"),
      "@database": path.resolve(__dirname, "../../packages/database"),
      "@assets": path.resolve(__dirname, "../../public/assets"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../dist/frontend"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    allowedHosts: [
      '.replit.dev',
      'localhost',
      '127.0.0.1'
    ],
  },
});
