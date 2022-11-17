const PROTOCOL_REGEX = /^(?:f|ht)tps?:\/\//;

const hasHttpProtocol = url => PROTOCOL_REGEX.test(url);

export function addHttp(url) {
	return hasHttpProtocol(url) ? url : `http://${url}`;
}

export function getHostNameFromUrl(url = '') {
	return hasHttpProtocol(url) ? new URL(url).hostname : url;
}
