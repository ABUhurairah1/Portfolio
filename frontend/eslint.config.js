import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    '**/*.min.js',
    '**/jquery*.js',
    '**/bootstrap*.js',
    '**/gsap*.js',
    '**/swiper*.js',
    '**/odometer*.js',
    '**/ScrollTrigger*.js',
    '**/SplitText*.js',
    '**/splitting*.js',
    '**/ScrollSmooth.js',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        jQuery: 'readonly',
        $: 'readonly',
        Splitting: 'readonly',
        gsap: 'readonly',
        ScrollTrigger: 'readonly',
        SplitText: 'readonly',
        Swiper: 'readonly',
        Odometer: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        define: 'readonly',
        openYourPopup: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
