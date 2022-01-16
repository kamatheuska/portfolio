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
        additionalData: `
          @import './src/assets/styles/abstracts/variables';
          @import './src/assets/styles/abstracts/animations';
          @import './src/assets/styles/abstracts/mixins';
        `,
      },
    },
  },
};
