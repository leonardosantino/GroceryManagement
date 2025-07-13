import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "plugin:prettier/recommended",
    ],
    plugins: ["simple-import-sort", "prettier"],
    rules: {
      "no-duplicate-imports": "error",
      "simple-import-sort/imports": "error",
    },
  }),
];

export default eslintConfig;
