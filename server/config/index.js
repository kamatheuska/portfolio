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
}
