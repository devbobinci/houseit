import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://imxbartus.github.io/real-estate-houseit/",
  plugins: [react()],
  server: { port: 3000 },
});
