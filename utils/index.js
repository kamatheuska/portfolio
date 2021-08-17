// const axios = require('axios');
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

// const _exclude = 'minutely,hourly,daily,alerts,flags';
// const geocodingClient = mbxGeocoding({ accessToken: geocodeApiKey })

function isString(el) {
    return typeof el === 'string' && !!el.trim();
}

function hasProperty(parent, prop) {
    return Object.prototype.hasOwnProperty.call(parent, prop);
}

/**
 * @param {BooleanValues} str
 * @param {Function} isStringFn
 */
function toBoolean(str, isStringFn = isString) {
    return isStringFn(str) && str === 'true';
}

function getRandomInteger(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

function filterListByTruthyField(list, field, { hasPropertyFn = hasProperty } = {}) {
    return Array.isArray(list)
        ? list.filter((item) => hasPropertyFn(item, field) && !!item[field])
        : [];
}

exports.isString = isString;
exports.hasProperty = hasProperty;
exports.toBoolean = toBoolean;
exports.getRandomInteger = getRandomInteger;
exports.filterListByTruthyField = filterListByTruthyField;

// getApiPayload (type = 'weather') {
//     switch (type) {
//         case 'weather': {
//             return ({ lat, lng, units = 'si', exclude = _exclude } = {}) => {
//                 if (!truthyArguments([lat, lng, units, exclude])) {
//                     let errMessage = 'latitude or longitude not defined'
//                     throwNewError(errMessage, 'ValidationError')
//                 }
//                 return {
//                     url: `${darkskyUrl}${lat},${lng}`,
//                     config: {
//                         params: { units, exclude }
//                     }
//                 }
//             }
//         }

//         case 'twitch': {
//             return (params = { login: twitch.users }, target = 'users') => {
//                 return {
//                     url: `${twitch.baseUrl}/${target}`,
//                     config: {
//                         params,
//                         headers: {
//                             'Client-ID': twitch.id
//                         }
//                     }
//                 }
//             }
//         }
//     }
// },
// sendApiRequest (type = 'weather') {
//     switch (type) {
//         case 'geocode': {
//             return (address) => {
//                 if (!isTruthy(address)) {
//                     throwNewError('Address not defined on sendApiRequest', 'ValidationError')
//                 }
//                 return geocodingClient
//                     .forwardGeocode({ query: address })
//                     .send()
//             }
//         }

//         case 'weather': {
//             return (url, config) => {
//                 if (!truthyArguments([ url, config ])) {
//                     throwNewError('Missing arguments on sendApiRequest', 'ValidationError')
//                 }
//                 return axios
//                     .create()
//                     .get(url, config)
//             }
//         }

//         case 'twitch': {
//             return (url, config) => {
//                 if (!truthyArguments([ url, config ])) {
//                     throwNewError('Missing arguments on sendApiRequest', 'ValidationError')
//                 }
//                 return axios
//                     .create()
//                     .get(url, config)
//             }
//         }
//     }
// }
