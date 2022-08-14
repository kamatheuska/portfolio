const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    indent: ['error', 2],
    'no-console': [isProd ? 'error' : 'warn', { allow: ['error', 'warn'] }],
    'no-debugger': isProd ? 'warn' : 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/export': 0,
    'import/prefer-default-export': 0,
    'consistent-return': 0,
    'vue/require-default-prop': 0,
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')], // https://stackoverflow.com/q/39114446/2771889  
    'max-len': ['error', {
      code: 120,
      ignoreTemplateLiterals: true,
      ignoreStrings: true,
      ignorePattern: 'd=".+',
    }],
  },
};
