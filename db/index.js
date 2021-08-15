import mongoose from 'mongoose';
import { getConfig } from '../config';
import * as exceptions from '../constants/exceptions';
import { logInfo } from '../services/logger';
import { transformErrorToException } from '../utils/errors';

export async function connectToDatabase() {
    const { mongoDbUri } = getConfig();
    const db = mongoose.connection;

    try {
        await mongoose.connect(mongoDbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logInfo('Db.connectToDatabase', 'Connecting succesfully to', mongoDbUri);
    } catch (error) {
        throw transformErrorToException(error, { code: exceptions.MONGOOSE_ERROR });
    }

    db.on('error', (error) => {
        throw transformErrorToException(error, { code: exceptions.MONGOOSE_ERROR });
    });

    return db;
}

export async function disconnectFromDatabase() {
    await mongoose.connection.close();
}
