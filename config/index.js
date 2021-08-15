import dotenv from 'dotenv';
import { logDebug } from '../services/logger';
import ConfigHelper from '../helpers/config';

const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = process.env.NODE_ENV === 'development';
let $config;

const getNodeEnvIndependentEnvs = () => ({
    port: ConfigHelper.getEnvVar('PORT', 5000, Number),
    nodeEnv: ConfigHelper.getEnvVar('NODE_ENV', 'development'),
    debugMode: ConfigHelper.getEnvVar('DEBUG_MODE', 'false', Boolean),
    db: {
        url: {
            documentLimit: ConfigHelper.getEnvVar('DB_URL_DOCUMENT_LIMIT', 100, Number),
        },
    },
});

export function buildConfigByEnvironment() {
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

export function initConfig() {
    dotenv.config();
    $config = buildConfigByEnvironment();

    logDebug('initConfig', 'INITIAL CONFIG', $config);
}

export const getConfig = () => $config;
