module.exports = {
  root: true,
  extends: [
    '@react-native-community', // react-native
    'prettier', // pretier
    'plugin:react/recommended' // eslint-plugin-react
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint', // typescript
    'prettier', // prettier
    'jest', // jest
    'djzhang' // customize
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // 'ycode'
        'djzhang/no-low-tags': 'error',
        'djzhang/tw-original-classname': 'error',
        // eslint-plugin-react
        'react/no-unknown-property': ['error', { ignore: ['css'] }], // Upper 'class' to 'className'
        // Common
        'no-bitwise': 0,
        'prefer-const': 'warn',
        'prettier/prettier': [
          'error',
          {
            printWidth: 120,
            quoteProps: 'preserve',
            singleQuote: true,
            tabWidth: 2,
            trailingComma: 'none',
            useTabs: false
          }
        ],
        quotes: [2, 'single', { avoidEscape: true }],
        '@typescript-eslint/quotes': [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: true
          }
        ],
        semi: 0,
        'object-curly-newline': 'off',
        // note you must disable the base rule as it can report incorrect errors
        'object-curly-spacing': 'off',
        // 'object-curly-spacing': [2, 'always'],
        '@typescript-eslint/object-curly-spacing': [2, 'always'],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'react/no-unstable-nested-components': 'off'
      }
    }
  ]
}
