import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const ASSET_URL = process.env.ASSET_URL || "";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
    server: { port: 3000 },
  };

  if (command !== "serve") {
    config.base = "/real-estate-houseit/";
  }

  return config;
});
