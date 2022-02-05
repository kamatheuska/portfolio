const { throwNewError } = require('./errors');
const { isString, isObject } = require('../helpers');
const { getApiPayload, sendApiRequest } = require('../utils');

function forceSsl(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        const { logInfo } = res.locals;
        logInfo('Redireting to https')
        return res.redirect(301, ['https://', req.get('Host'), req.url].join(''));
    }
    next();
}

function validateWeatherPayload(req, res, next) {
    if (!isObject(req.body)) {
        throwNewError('Payload is not an Object', 'ValidationError');
    }
    const payload = req.body;
    const payloadKeys = Object.keys(payload);
    payloadKeys.forEach((key) => {
        if (!isString(payload[key])) {
            throwNewError('Error on Payload', 'ValidationError');
        }
    });

    next();
}

function buildWeatherPayload(req, res, next) {
    const { url, config } = getApiPayload()(req.body);
    Object.defineProperty(req, 'axiosPayload', { value: { url, config } });
    next();
}

function getGeocodeData(req, res, next) {
    if (!isString(req.body.address)) {
        throwNewError('Address in request is not a string', 'ValidationError');
    }
    const { address } = req.body;
    sendApiRequest('geocode')(address)
        .then((response) => {
            const coords = response.body.features[0].geometry.coordinates;
            Object.defineProperty(req, 'axiosPayload', {
                value: getApiPayload()({
                    lng: coords[0],
                    lat: coords[1],
                }),
            });
            next();
        })
        .catch(next);
}

module.exports = {
    buildWeatherPayload,
    forceSsl,
    getGeocodeData,
    validateWeatherPayload,
};
