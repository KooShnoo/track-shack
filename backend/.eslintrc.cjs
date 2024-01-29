/* eslint-env node */
module.exports = {
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'only-warn'],
  root: true,
  rules: {
    'no-undef': [
      "warn",
    ],
    'semi': [
      "warn",
      "always"
    ],
    "@typescript-eslint/no-unused-vars": [
      "off",
    ],
  },
};