module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'comma-dangle': ['error', 'never'],
    trailingComma: 0,
    semi: 'off',
    'react-native/no-inline-styles': 'off',
    'react-hooks/exhaustive-deps': 'off',
    curly: ['error', 'multi-line'],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        tabWidth: 2,
        singleQuote: true,
        bracketSameLine: true,
        bracketSpacing: true,
        printWidth: 80,
        endOfLine: 'auto',
        semi: false,
        trailingComma: 'none'
      }
    ]
  }
}
