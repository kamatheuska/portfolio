const {
    buildNewShortUrl,
    checkHostnameValidity,
    saveUrl,
    createUrlObject,
} = require('../services/urlShortener');
const { getHostNameFromUrl } = require('../utils/url');

async function createUrl(req, res, next) {
    const { url } = req.body;
    const hostname = getHostNameFromUrl(url);
    try {
        await checkHostnameValidity(hostname);
        const model = await buildNewShortUrl(url);
        const doc = await saveUrl(model);

        res.locals.urlData = createUrlObject(doc, req);

        next();
    } catch (error) {
        next(error);
    }
}

exports.createUrl = createUrl;
