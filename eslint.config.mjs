import {
  ESLINT_JSON_RULES,
  ESLINT_MARKDOWN_RULES
} from "@ogs-gmbh/linter";
import eslintMarkdown from "@eslint/markdown";
import eslintJsonPlugin from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    plugins: {
      "@markdown": eslintMarkdown,
      "@json": eslintJsonPlugin
    }
  },
  {
    ignores: [
      ".git",
      ".husky",
      ".vscode",
      ".idea",
      "node_modules",
      "dist",
      ".vitepress/.vitepress/cache"
    ]
  },
  {
    files: [ "**/*.json" ],
    language: "@json/json",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.json5" ],
    language: "@json/json5",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.jsonc" ],
    language: "@json/jsonc",
    rules: ESLINT_JSON_RULES
  },
  {
    files: [ "**/*.md" ],
    rules: ESLINT_MARKDOWN_RULES,
    language: "@markdown/gfm",
    languageOptions: {
      frontmatter: "yaml"
    }
  }
);
