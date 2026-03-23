export default {
  "*.{ts,mts,cts,js,mjs,cjs}": "oxlint",
  "*.{md,json,json5,jsonc}": "eslint",
  "package.json": "npmPkgJsonLint -c ./node_modules/@ogs-gmbh/linter/package-json-open-source.rules.json"
};
