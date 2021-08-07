const dotenv = require('dotenv');
const { Exception } = require('../services/exceptions');

const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = process.env.NODE_ENV === 'development';
let $config;

function getEnvVar(key, defaultValue = null, type) {
    if (process.env[key]) {
        if (type === Boolean) return process.env[key] === 'true'; // Coerce to boolean
        if (type === Number) return +process.env[key]; // Coerce to number
        return process.env[key];
    }
    if (defaultValue) {
        return defaultValue;
    }

    throw new Exception('init.getEnvVar', `Required but not defined : Env Variable ${key}.`);
}

function initConfig() {
    dotenv.config();

    let mongoDbUri;
    if (isTest) {
        mongoDbUri = getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/portfolio-test');
    } else if (isDevelopment) {
        mongoDbUri = getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/portfolio');
    } else {
        mongoDbUri = getEnvVar('MONGODB_URI');
    }

    $config = {
        port: getEnvVar('PORT', 5000, Number),
        nodeEnv: getEnvVar('NODE_ENV', 'development'),
        debugMode: getEnvVar('DEBUG_MODE', 'false', Boolean),
        db: {
            url: {
                documentLimit: getEnvVar('DB_URL_DOCUMENT_LIMIT', 100, Number),
            },
        },
        mongoDbUri,
    };
}
exports.getConfig = () => $config;
exports.initConfig = initConfig;
