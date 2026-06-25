import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   resolve: {
    alias: {
      "@core":         path.resolve(__dirname, "src/core"),
      "@shared":       path.resolve(__dirname, "src/shared"),
      "@modules":      path.resolve(__dirname, "src/modules"),
      "@store":        path.resolve(__dirname, "src/store"),
      "@theme":        path.resolve(__dirname, "src/theme"),
      "@":             path.resolve(__dirname, "src"),
    },
  },
});
