import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-unused-vars": "off", // ここは通常はeslintの"no-unused-vars"よりTypeScriptの方が強いケースが多いです（JSならOK）
      "import/no-dynamic-require": "warn",
      "import/no-nodejs-modules": "warn",
      "import/no-unresolved": "off",
      "react/react-in-jsx-scope": "off", // React17以降は不要なのでoffでOK
    },
    settings: {
      react: {
        version: "detect", // Reactのバージョン自動検出
      },
    },
  },
];
