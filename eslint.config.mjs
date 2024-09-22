// eslint.config.mjs
import prettier from 'prettier';

export default [
  {
    files: ['*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { args: 'none' }],
      eqeqeq: ['error', 'always'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
  {
    files: ['*.js', '*.ts'],
    plugins: {
      prettier: prettier,
    },
    rules: {},
  },
];
