const js = require("@eslint/js");
const raycast = require("@raycast/eslint-config");
const ts = require("typescript-eslint");
const unicorn = require("eslint-plugin-unicorn").default;

const sharedRules = {
  curly: ["error", "all"],
  "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
  "max-lines-per-function": ["error", { max: 30, skipBlankLines: true, skipComments: true }],
  complexity: ["error", 10],
  "no-restricted-imports": [
    "error",
    {
      patterns: [
        {
          group: ["../utils/*", "./utils/*", "../../utils/*"],
          message: "Use a named domain or feature module instead of utils.",
        },
      ],
    },
  ],
  "padding-line-between-statements": [
    "error",
    { blankLine: "always", prev: "*", next: "return" },
    { blankLine: "always", prev: "*", next: "if" },
    { blankLine: "always", prev: "if", next: "*" },
    { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
    { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
  ],
  "unicorn/prevent-abbreviations": [
    "error",
    {
      checkFilenames: false,
      replacements: {
        config: false,
        env: false,
        params: false,
        props: false,
        ref: false,
        args: false,
        id: false,
        iso: false,
      },
    },
  ],
};

module.exports = ts.config(
  {
    files: ["src/**/*.{ts,tsx}", "vitest.config.ts"],
    ignores: ["**/node_modules/**", "**/dist/**", "raycast-env.d.ts"],
    extends: [
      js.configs.recommended,
      ...ts.configs.strictTypeChecked,
      ...ts.configs.stylisticTypeChecked,
      unicorn.configs["flat/recommended"],
      ...raycast,
    ],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["vitest.config.ts"],
        },
        tsconfigRootDir: __dirname,
      },
    },
    rules: sharedRules,
  },
  {
    files: ["scripts/**/*.mjs"],
    extends: [js.configs.recommended, unicorn.configs["flat/recommended"]],
    rules: sharedRules,
  },
  {
    files: ["**/*.tsx"],
    rules: {
      "unicorn/filename-case": ["error", { cases: { pascalCase: true, kebabCase: true } }],
    },
  },
  {
    files: ["src/__tests__/**/*"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },
);
