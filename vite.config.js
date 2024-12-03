import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    host: "localhost", // Specificera host
    port: 5173, // Specificera port
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**"], // Uteslut stora mappar
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Förkompilera tunga beroenden
  },
  build: {
    target: "esnext", // För modern JavaScript
    cssCodeSplit: true, // För bättre hantering av CSS
    sourcemap: true, // För enklare felsökning
  },
});
