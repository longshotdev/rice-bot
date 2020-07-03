module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: ["@typescript-eslint/parser", "babel-eslint"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
  },
};
