const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        compilerOptions: {
          ...options.compilerOptions,
          isCustomElement: (tag) => tag.startsWith('ion-'),
        },
      }));
  },

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
          @import './src/assets/styles/abstracts/variables';
          @import './src/assets/styles/abstracts/animations';
          @import './src/assets/styles/abstracts/mixins';
        `,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/landing',
  outputDir: path.resolve(__dirname, '..', 'server/public/landing'),
};
