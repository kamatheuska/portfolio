module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:5000',
            },
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import './src/assets/styles/abstracts/animations';
                    @import './src/assets/styles/abstracts/mixins';
                    @import './src/assets/styles/abstracts/variables';
                `,
            },
        },
    },
};
