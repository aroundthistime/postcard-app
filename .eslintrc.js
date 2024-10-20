module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  plugins: [
    '@typescript-eslint',
    'prettier',
    'react-hooks'
  ],
  rules: {
    'prettier/prettier': 'error', // Show Prettier formatting issues as ESLint errors
  },
};