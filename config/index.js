const dotenv = require('dotenv');
const path = require('path');
const { logDebug } = require('../services/logger');
const ConfigUtils = require('../utils/config');

const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

let $config;

const getNodeEnvIndependentEnvs = () => ({
    port: ConfigUtils.getEnvVar('PORT', 5000, Number),
    nodeEnv: ConfigUtils.getEnvVar('NODE_ENV', 'development'),
    debugMode: ConfigUtils.getEnvVar('DEBUG_MODE', 'false', Boolean),
    staticsFolder: path.join(__dirname, '..', 'public'),
    db: {
        url: {
            documentLimit: ConfigUtils.getEnvVar('DB_URL_DOCUMENT_LIMIT', 100, Number),
        },
    },
    cors: {
        fccOptions: {
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        },
    },
});

function buildConfigByEnvironment() {
    let mongoDbUri;

    if (isTest) {
        mongoDbUri = 'mongodb://localhost:27017/portfolio-test';
    } else if (isDevelopment) {
        mongoDbUri = ConfigUtils.getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/portfolio');
    } else {
        mongoDbUri = ConfigUtils.getEnvVar('MONGODB_URI');
    }

    return {
        ...getNodeEnvIndependentEnvs(),
        isTest,
        isDevelopment,
        isProduction,
        mongoDbUri,
    };
}

function initConfig() {
    dotenv.config();
    $config = buildConfigByEnvironment();

    logDebug('initConfig', 'INITIAL CONFIG', $config);
}

exports.getConfig = () => $config;
exports.initConfig = initConfig;
