import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const ASSET_URL = process.env.ASSET_URL || "";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://imxbartus.github.io/real-estate-houseit",
  plugins: [react()],
  server: { port: 3000 },
});
