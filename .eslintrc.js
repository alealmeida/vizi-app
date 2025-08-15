/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { es2021: true, node: true, jest: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: undefined,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      alias: {
        map: [
          ['@', './src'],
          ['@app', './src/app'],
          ['@modules', './src/modules'],
          ['@shared', './src/shared'],
          ['@graphql', './src/graphql'],
          ['@store', './src/store'],
          ['@assets', './src/assets'],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // TS
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Unused imports
    'unused-imports/no-unused-imports': 'warn',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'android/', 'ios/'],
};