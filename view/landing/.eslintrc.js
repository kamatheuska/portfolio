module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: ['plugin:vue/essential', '@vue/airbnb', 'plugin:prettier/recommended'],

    parserOptions: {
        parser: 'babel-eslint',
    },

    rules: {
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                useTabs: false,
                printWidth: 120,
                semi: true,
                singleQuote: true,
                quoteProps: 'consistent',
                trailingComma: 'all',
                bracketSpacing: true,
                arrowParens: 'always',
                endOfLine: 'auto',
            },
        ],
        'no-console': ['error', { allow: ['error', 'warn'] }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'import/export': 0,
        'import/prefer-default-export': 0,
        'consistent-return': 0,
    },

    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/mocks/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            extends: ['plugin:jest/recommended'],
            plugins: ['jest'],
            rules: {
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'error',
            },
            env: {
                jest: true,
            },
        },
    ],
};
