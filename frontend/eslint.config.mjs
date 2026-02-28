import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "out/**",
      "*.config.*"
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/ban-ts-comment": "warn",
    },
  },
]);
