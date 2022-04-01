const path = require('path');

module.exports = {
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions) => {
        sassLoaderOptions.sourceMap = true;
        return sassLoaderOptions;
      },
    },
  },
  webpack: {
    configure: (webpackConfig, { paths }) => {
      paths.appBuild = webpackConfig.output.path = path.resolve(__dirname, '..', 'server/public/react-projects');

      return webpackConfig;
    },
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~constants': path.resolve(__dirname, 'src', 'constants'),
      '~utils': path.resolve(__dirname, 'src', 'utils'),
      '~assets': path.resolve(__dirname, 'src', 'assets'),
      '~projects': path.resolve(__dirname, 'src', 'projects'),
      '~components': path.resolve(__dirname, 'src', 'components'),
      '~routes': path.resolve(__dirname, 'src', 'routes'),
    },
  },
};