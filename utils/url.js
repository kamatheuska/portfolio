const { URL } = require('url');

function getHostNameFromUrl(url = '') {
  return /^(?:f|ht)tps?\:\/\//.test(url)
    ? new URL(url).hostname
    : url;
}


function addHttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = 'http://' + url;
  }
  
  return url;
}

/**
 * @param {Object} request - express request Object
 * 
 * @return {string} full path of api
 */
function getFullUrlFromRequest(request) {
  const { protocol, hostname, path } = request;
  return protocol + "://" + hostname + path;
}

exports.getHostNameFromUrl = getHostNameFromUrl
exports.getFullUrlFromRequest = getFullUrlFromRequest
exports.addHttp = addHttp