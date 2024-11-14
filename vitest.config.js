import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      name: "chromium",
      provider: "playwright",
    },
    testTimeout: 20000
  },
})