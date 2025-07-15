import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended']
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        languageOptions: { globals: globals.browser }
    },
    tseslint.configs.recommended,
    {
        rules: {
            // single quotes
            quotes: ['error', 'single', { avoidEscape: false }],
            // 4 spaces for indentation
            indent: ['error', 4, { SwitchCase: 0 }],
            // no semicolons
            semi: ['error', 'never'],
            // no trailing commas
            'comma-dangle': ['error', 'never'],
            // spaces after curly braces
            'object-curly-spacing': ['error', 'always'],
            // no trailing whitespace
            'no-trailing-spaces': 'error',
            // space after commas
            'comma-spacing': ['error', { before: false, after: true }]
        }
    }
])