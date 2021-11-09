const dotenv = require('dotenv');
const path = require('path');
const { logDebug } = require('../services/logger');
const ConfigHelper = require('../helpers/config');

const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = process.env.NODE_ENV === 'development';
let $config;

const getNodeEnvIndependentEnvs = () => ({
    port: ConfigHelper.getEnvVar('PORT', 5000, Number),
    nodeEnv: ConfigHelper.getEnvVar('NODE_ENV', 'development'),
    debugMode: ConfigHelper.getEnvVar('DEBUG_MODE', 'false', Boolean),
    staticsFolder: path.join(__dirname, '..', 'public'),
    db: {
        url: {
            documentLimit: ConfigHelper.getEnvVar('DB_URL_DOCUMENT_LIMIT', 100, Number),
        },
    },
});

function buildConfigByEnvironment() {
    let mongoDbUri;

    if (isTest) {
        mongoDbUri = 'mongodb://localhost:27017/portfolio-test';
    } else if (isDevelopment) {
        mongoDbUri = ConfigHelper.getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/portfolio');
    } else {
        mongoDbUri = ConfigHelper.getEnvVar('MONGODB_URI');
    }

    return {
        ...getNodeEnvIndependentEnvs(),
        isTest,
        isDevelopment,
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
