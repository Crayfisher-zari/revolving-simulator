import { defineConfig } from "vite";
import "dotenv/config";
import vue from "@vitejs/plugin-vue";

const basePath = process.env.BASE_PATH || "/";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "../dist",
  },
  base: basePath,
  plugins: [vue()],
});
