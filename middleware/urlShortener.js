const { buildNewUrl, checkAddressValidity, saveUrl } = require('../services/urlShortener');
const { getHostNameFromUrl } = require('../utils/url');

function createUrl (req, res, next) {
  async (req, res, next) => {
    const { url } = req.body;
    const urlHostname = getHostNameFromUrl(url);
    try {
      await checkAddressValidity(urlHostname);
      const urlModel = await buildNewUrl(url);
      const urlData = await saveUrl(urlModel);

      res.locals.urlData = urlData;
      
      next();
    } catch (error) {
      next(error)
    }
  }
}

exports.createUrl = createUrl