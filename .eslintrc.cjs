module.exports = {
  root: true,
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/playwright-report/**',
    'atelier-heritage-signup.html',
  ],
  overrides: [
    {
      files: ['front/src/**/*.{js,jsx}', 'front/tests/**/*.js'],
      env: { browser: true, es2022: true, node: true },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
      ],
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      plugins: ['react-refresh'],
      settings: { react: { version: '18.2' } },
      rules: {
        'react/prop-types': 'off',
        'react-refresh/only-export-components': 'warn',
      },
    },
    {
      files: ['back/**/*.js'],
      excludedFiles: ['back/node_modules/**'],
      env: { node: true, es2022: true, jest: true },
      extends: ['eslint:recommended'],
      parserOptions: { ecmaVersion: 'latest', sourceType: 'script' },
      rules: {
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      },
    },
  ],
};
