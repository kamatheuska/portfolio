// const axios = require('axios');
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

// const _exclude = 'minutely,hourly,daily,alerts,flags';
// const geocodingClient = mbxGeocoding({ accessToken: geocodeApiKey })

function hasProperty(parent, prop) {
    return Object.prototype.hasOwnProperty.call(parent, prop);
}

function getNonConsecutiveInteger(minimum, maximum) {
    let previousValue;

    return function random() {
        const number = Math.floor(Math.random() * (maximum - minimum + 1) + minimum);

        previousValue = number === previousValue && minimum !== maximum ? random() : number;

        return previousValue;
    };
}
function getRandomItemFromList(list) {
    const random = getNonConsecutiveInteger(0, list.length - 1);
    return () => list[random()];
}

exports.hasProperty = hasProperty;
exports.getRandomItemFromList = getRandomItemFromList;

module.exports = {
    hasProperty,
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
};
