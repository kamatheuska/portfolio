
const { URL } = require('url');

function getHostNameFromUrl(url) {
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

exports.getHostNameFromUrl = getHostNameFromUrl
exports.addHttp = addHttp