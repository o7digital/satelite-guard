import { defineConfig } from "eslint/config";

export const baseIgnores = [
  "dist/**",
  ".next/**",
  "coverage/**",
  "node_modules/**",
];

export function withBaseConfig(config) {
  return defineConfig([{ ignores: baseIgnores }, ...config]);
}
