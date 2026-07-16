import { FlatCompat } from "@eslint/eslintrc";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const nextConfigDirectory = dirname(
  require.resolve("eslint-config-next/package.json"),
);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: nextConfigDirectory,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
