import util from 'util';
import dns from 'dns';

const PROTOCOL_REGEX = /^(?:f|ht)tps?:\/\//;
const hasHttpProtocol = url => PROTOCOL_REGEX.test(url);
const lookup = util.promisify(dns.lookup);

export function addHttp(url) {
  return hasHttpProtocol(url) ? url : `http://${url}`;
}

export function getHostNameFromUrl(url = '') {
  return hasHttpProtocol(url) ? new URL(url).hostname : url;
}

export async function validateUrl(url) {
  const hostname = getHostNameFromUrl(url);

  if (!hostname) {
    throw new Error('invalid url');
  }

  await validateHostname(hostname);
}

export async function validateHostname(hostname = '') {
  try {
    await lookup(hostname);
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      throw new Error('invalid url');
    }

    throw error;
  }
}
