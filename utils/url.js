const { URL } = require('url');
const { PROTOCOL_REGEX } = require('../constants');

function getHostNameFromUrl(url = '') {
    return PROTOCOL_REGEX.test(url) ? new URL(url).hostname : url;
}

function addHttp(url) {
    let newUrl;
    if (!PROTOCOL_REGEX.test(url)) {
        newUrl = `http://${url}`;
    }

    return newUrl;
}

/**
 * @param {Object} request - express request Object
 *
 * @return {string} full path of api
 */
function getFullUrlFromRequest(request) {
    const { protocol, hostname, path } = request;
    return `${protocol}://${hostname}${path}`;
}

exports.getHostNameFromUrl = getHostNameFromUrl;
exports.getFullUrlFromRequest = getFullUrlFromRequest;
exports.addHttp = addHttp;
