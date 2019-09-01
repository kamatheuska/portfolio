const getEnvVar = function (key, defaultValue = null) {
    if (process.env[key]) {
        return process.env[key]
    }
    if (defaultValue) {
        return defaultValue
    }
    throw new Error(`Required but not defined : Env Variable ${key}.`)
}

module.exports = {
    port: getEnvVar('PORT', 5000),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
    darkskyUrl: getEnvVar('DARKSKY_URL'),
    geocodeApiKey: getEnvVar('GEOCODE_API_KEY'),
    geocodeUrl: getEnvVar('GEOCODE_URL'),
    twitch: {
        id: getEnvVar('TWITCH_CLIENT_ID'),
        baseUrl: getEnvVar('TWITCH_API_URL', 'https://api.twitch.tv/helix'),
        users: [
            'ESL_SC2',
            'OgamingSC2',
            'cretetion',
            'freecodecamp',
            'storbeck',
            'habathcx',
            'RobotCaleb',
            'noobs2ninjas'
        ]
    }
}
