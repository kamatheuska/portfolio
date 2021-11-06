
module.exports = {
  style: {
    sass: {
      loaderOptions: (sassLoaderOptions, { env, paths }) => {
        sassLoaderOptions.sourceMap = true;
        return sassLoaderOptions; 
      }
    },
  }
}