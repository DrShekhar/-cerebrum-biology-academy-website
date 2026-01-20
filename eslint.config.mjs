import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "scripts/**",
      ".vercel/**",
      "*.d.ts",
      "src/generated/**",
      "*.js",
      "*.cjs",
      "*.mjs",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Critical rules - error level
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "react-hooks/rules-of-hooks": "error",
      "no-var": "error",
      "prefer-const": "error",

      // Important rules - warn level (upgrade to error after cleanup)
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-namespace": "warn",
      "prefer-rest-params": "warn",
      "react/jsx-no-undef": "warn",
      "@next/next/no-html-link-for-pages": "warn",

      // Disabled rules (with justification)
      "import/no-anonymous-default-export": "off", // Next.js convention
      "react/no-unescaped-entities": "off", // Too strict for content-heavy site
      "@typescript-eslint/no-require-imports": "off", // Needed for some dynamic imports

      // Console statements - error in production
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;
