import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'], // Target .js, .mjs, .cjs, .ts files
    languageOptions: {
      parser: tsParser, // Use TypeScript parser for TypeScript files
      globals: {
        ...globals.browser, // Include browser globals
        process: 'readonly', // Add 'process' as a global variable
      },
    },
    plugins: {
      '@typescript-eslint': tseslint, // Register the TypeScript plugin
    },
    rules: {
      semi: ['error', 'always'], // Enforce semicolons
      // quotes: ['warn', 'double'], // Enforce double quotes
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ], // Ignore unused variables starting with _
      'no-var': 'error', // Disallow var
      'no-unused-vars': 'error', // Standard unused-vars rule
      'prefer-const': ['warn', { ignoreReadBeforeAssign: true }], // Prefer const for variables
      '@typescript-eslint/no-require-imports': 'off', // Disable the rule that forbids 'require',
      'no-unused-expressions': 'error',
      // 'no-console': 'warn',
      'no-undef': 'error',
    },
    ignores: ['.node_modules/*', 'dist/*', '.gitignore'], // Ignore node_modules and dist directories
  },
  // Manually including the recommended configurations
  {
    rules: {
      ...pluginJs.configs.recommended.rules, // Manually include rules from @eslint/js
      ...tseslint.configs['recommended'].rules, // Manually include TypeScript plugin recommended rules
    },
  },
];