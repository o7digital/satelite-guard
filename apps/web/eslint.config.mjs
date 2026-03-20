import { defineConfig, globalIgnores } from "eslint/config";
import { withBaseConfig } from "@satelite-guard/config/eslint/base";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = withBaseConfig(
  defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    ".next_copied_backup/**",
    ".node_modules_copied_backup/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ]),
);

export default eslintConfig;
