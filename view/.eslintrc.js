module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential'],
    rules: {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'quotes': ['error', 'single']
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
};
