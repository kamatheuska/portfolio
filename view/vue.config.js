const path = require('path');

module.exports = {
    outputDir: '../server/public',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        }
    }
}
