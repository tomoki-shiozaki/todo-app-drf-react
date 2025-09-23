/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "vite.config.ts", // Vite 設定
        "eslint.config.js", // ESLint 設定
        "src/vite-env.d.ts", // 型定義ファイル
        "src/main.tsx", // エントリーポイント除外
        "src/types/**", // 型定義除外
      ],
    },
  },
});
