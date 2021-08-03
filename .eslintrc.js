module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['prettier'],
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
                jsxBracketSameLine: true,
                arrowParens: 'always',
                endOfLine: 'auto',
            },
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    },
    ignorePatterns: ['/'],
};
