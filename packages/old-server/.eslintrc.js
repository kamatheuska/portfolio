module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base', 'prettier', 'plugin:security/recommended'],
    // parserOptions: {
    //     ecmaVersion: 12,
    // },
    plugins: ['prettier', 'security'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                useTabs: false,
                printWidth: 100,
                semi: true,
                singleQuote: true,
                quoteProps: 'consistent',
                trailingComma: 'all',
                bracketSpacing: true,
                arrowParens: 'always',
                endOfLine: 'auto',
            },
        ],
        'global-require': 0,
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'consistent-return': 0,
        'radix': ['error', 'as-needed'],
        'security/detect-object-injection': 0,
        'no-underscore-dangle': [
            'error',
            {
                allow: ['_id'],
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.test.js'],
            env: {
                jest: true, // now **/*.test.js files' env has both es6 *and* jest
            },
            // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
            extends: ['plugin:jest/recommended'],
            plugins: ['jest'],
            rules: {
                'jest/no-disabled-tests': 'warn',
                'jest/no-focused-tests': 'error',
                'jest/no-identical-title': 'error',
                'jest/prefer-to-have-length': 'warn',
                'jest/valid-expect': 'error',
            },
        },
    ],
};
