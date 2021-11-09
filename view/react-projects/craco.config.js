const path = require('path');

module.exports = {
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        sassLoaderOptions.sourceMap = true;
        return sassLoaderOptions;
      },
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      paths.appBuild = webpackConfig.output.path = path.resolve(
        __dirname,
        '..',
        '..',
        'public/react-projects'
      );

      return webpackConfig;
    },
  },
};
