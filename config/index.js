const { Exception } = require('../services/exceptions');

const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = process.env.NODE_ENV === 'development';
let _config;

function initConfig() {
    require('dotenv').config();

    let mongoDbUri;
    if (isTest) {
        mongoDbUri = getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/portfolio-test');
    } else if (isDevelopment) {
        mongoDbUri = getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/portfolio');
    } else {
        mongoDbUri = getEnvVar('MONGODB_URI');
    }

    _config = {
        port: getEnvVar('PORT', 5000),
        nodeEnv: getEnvVar('NODE_ENV', 'development'),
        mongoDbUri,
    };
}

function getEnvVar(key, defaultValue = null) {
    if (process.env[key]) {
        return process.env[key];
    }
    if (defaultValue) {
        return defaultValue;
    }
    throw new Exception('init.getEnvVar', `Required but not defined : Env Variable ${key}.`);
}

exports.getConfig = () => _config;
exports.initConfig = initConfig;
