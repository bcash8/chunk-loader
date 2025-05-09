import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintconfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js, "@typescript-eslint": tsPlugin },
    ignores: ["eslint.config.mjs", "node_modules", "dist"],
    extends: ["js/recommended"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      "@typescript-eslint/await-thenable": "warn",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/consistent-type-assertions": ["warn", { assertionStyle: "never" }],
      "@typescript-eslint/no-confusing-void-expression": ["warn", { ignoreArrowShorthand: true }],
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-implied-eval": "error",
      "@typescript-eslint/no-import-type-side-effects": "warn",
      "@typescript-eslint/no-inferrable-types": ["warn", { ignoreParameters: true }],
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/require-await": "warn",
      "@typescript-eslint/restrict-plus-operands": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/typedef": ["warn", { parameter: true }],
      "func-style": ["warn", "declaration", { allowArrowFunctions: false }],
      "no-constant-condition": "warn",
      "no-dupe-else-if": "warn",
      "no-duplicate-imports": "warn",
      "no-implied-eval": "off",
      "no-prototype-builtins": "warn",
      "no-restricted-exports": ["warn", { restrictDefaultExports: { direct: true } }],
      "prefer-const": "warn",
      "@typescript-eslint/consistent-type-imports": "warn"
    }
  },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,

  eslintconfigPrettier
]);
