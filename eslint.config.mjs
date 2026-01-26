import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import unusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '**/node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      '**/dist/**',
      'next-env.d.ts',
      'scripts/**',
      '.vercel/**',
      'tests/**',
      'disabled-features/**',
      'mcp-servers/**',
      'prisma/**',
      '*.d.ts',
      'src/generated/**',
      'src/__tests__/**',
      '*.js',
      '*.cjs',
      '*.mjs',
      '*.ts',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // Auto-fix unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      // Disable the original rule to avoid conflicts
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'no-var': 'error',
      'prefer-const': 'error',

      // Important rules - warn level (upgrade to error after cleanup)
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-namespace': 'warn',
      'prefer-rest-params': 'warn',
      'react/jsx-no-undef': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',

      // Disabled rules (with justification)
      'import/no-anonymous-default-export': 'off', // Next.js convention
      'react/no-unescaped-entities': 'off', // Too strict for content-heavy site
      '@typescript-eslint/no-require-imports': 'off', // Needed for some dynamic imports

      // Console statements - error in production
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]

export default eslintConfig
