import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'next-env.d.ts',
    '*.config.js',
    '*.config.mjs',
    '*.config.ts',
  ]),
  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-nested-ternary': 'warn',

      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintConfigPrettier,
]);

export default eslintConfig;
