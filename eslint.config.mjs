// eslint.config.mjs
import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import { globSync } from 'glob';
import path from 'path';

const tsconfigs = globSync([
  'tsconfig.json',
  'apps/*/tsconfig.json',
  'packages/*/tsconfig.json',
]);

export default [
  js.configs.recommended,

  // Type-aware linting for app/src files
  ...tsconfigs.map((tsconfigPath) => ({
    files: ['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'],
    ignores: ['**/dist/**', '**/node_modules/**'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: path.resolve(tsconfigPath),
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    rules: {
      'prettier/prettier': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  })),

  // Type-unaware fallback (for scripts, tests, configs)
  {
    files: [
      '**/*.js',
      '**/*.jsx',
      '**/*.ts',
      '**/*.tsx',
    ],
    ignores: ['**/dist/**', '**/node_modules/**', '**/*.config.json'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    rules: {
      'prettier/prettier': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  // Specific override for tests
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    rules: {},
    settings: {},
  },
];
