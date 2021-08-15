import { URL } from 'url';
import { PROTOCOL_REGEX } from '../constants';

export function getHostNameFromUrl(url = '') {
    return PROTOCOL_REGEX.test(url) ? new URL(url).hostname : url;
}

export const addHttp = (url) => {
    return !PROTOCOL_REGEX.test(url) ? `http://${url}` : url;
}

/**
 * @param {Object} request - express request Object
 *
 * @return {string} full path of api
 */
export function getFullUrlFromRequest(request) {
    const { protocol, hostname, path } = request;
    return `${protocol}://${hostname}${path}`;
}
export default 'defaultExport';