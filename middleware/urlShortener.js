const {
    buildNewShortUrl,
    checkHostnameValidity,
    saveUrl,
    createUrlObject,
    getUrlById,
} = require('../services/urlShortener');
const { getHostNameFromUrl } = require('../utils/url');

async function createUrl(req, res, next) {
    const { url } = req.body;
    const { logInfo } = res.locals;
    const hostname = getHostNameFromUrl(url);
    try {
        await checkHostnameValidity(hostname);
        logInfo(`Hostname ${hostname} validated succesfully`);

        const model = await buildNewShortUrl(url);
        logInfo('Saved Url in db', { hostname, newUrl: model });

        const doc = await saveUrl(model);
        logInfo('Saved doc:', doc);

        res.locals.urlData = createUrlObject(doc, url);

        next();
    } catch (error) {
        next(error);
    }
}

async function getUrl(req, res, next) {
    const { id } = req.params;
    const { logInfo } = res.locals;
    try {
        res.locals.url = await getUrlById(id);
        logInfo('Url found', res.locals.url);

        next();
    } catch (error) {
        next(error);
    }
}

exports.createUrl = createUrl;
exports.getUrl = getUrl;
