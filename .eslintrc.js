/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  rules: {
    "import/order": ["error", {
      "alphabetize": { order: "asc", caseInsensitive: true },
      "newlines-between": "always",
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"]
    }]
  }
};
