const {
    buildNewShortUrl,
    checkHostnameValidity,
    saveUrl,
    createUrlObject,
    getUrlById,
} = require('../services/urlShortener');
const { toBoolean } = require('../utils');
const { isInvalidRequestException } = require('../utils/errors');
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

        const urlData = createUrlObject(doc, url);

        res.send(urlData);
    } catch (error) {
        if (isInvalidRequestException(error)) {
            res.status(400).send({ error: 'invalid url' });
        } else {
            next(error);
        }
    }
}

async function getUrl(req, res, next) {
    const { id } = req.params;
    const { json } = req.query;
    const { logInfo } = res.locals;
    const JSONResponse = toBoolean(json);

    try {
        const url = await getUrlById(id);
        logInfo('Url found', url);

        if (JSONResponse) {
            logInfo('Sending JSON response', url);
            return res.send({
                original: url.original,
                short: url.short,
            });
        }

        logInfo('Redirecting to: ', url.original);
        res.redirect(302, url.original);
    } catch (error) {
        next(error);
    }
}

exports.createUrl = createUrl;
exports.getUrl = getUrl;
