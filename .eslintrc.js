module.exports = {
  root: true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    'vue',
    "@typescript-eslint",
    "prettier"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  "rules": {
    "no-console": 1,       // Means warning
    "prettier/prettier": 2 // Means error
  }
}
