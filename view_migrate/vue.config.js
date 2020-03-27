const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        module: {
            rules: [{
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader', {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: path.resolve(__dirname, 'src/assets/styles/*.less'),
                        injector: 'append'
                    }
                }]
            }]
        },
    },
}
