import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      'import/no-unused-modules': 'off',
      // '@typescript-eslint/no-unused-vars': ['off', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
      // 'no-unused-vars': [
      //   'warn',
      //   {
      //     vars: 'all', // Проверять все переменные
      //     args: 'after-used', // Проверять аргументы, которые не используются
      //     ignoreRestSiblings: true, // Игнорировать rest-операторы
      //
      //   },
      // ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off"
    },
  },
];



export default eslintConfig;
