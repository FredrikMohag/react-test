import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default {
  extends: [
    js.configs.recommended, // ESLint: Default config for JavaScript
    "plugin:react/recommended", // Lägg till React-specifik konfiguration
  ],
  files: ["**/*.{js,jsx}"], // Vi använder nu .js och .jsx istället för .ts och .tsx
  languageOptions: {
    ecmaVersion: 2020, // Stöd för modern JavaScript (ES2020)
    globals: globals.browser, // Globala variabler för webbläsaren
  },
  plugins: {
    "react-hooks": reactHooks, // ESLint-plugin för React hooks
    "react-refresh": reactRefresh, // ESLint-plugin för React Refresh (Fast Refresh)
  },
  rules: {
    ...reactHooks.configs.recommended.rules, // React Hooks-rekommendationer
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ], // React Refresh-regel för att endast exportera komponenter
    "react/react-in-jsx-scope": "off", // Stänger av den gamla regeln för React 17+ (det är inte längre nödvändigt att importera React)
  },
};
