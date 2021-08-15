import { init } from './app';
import { logError } from './services/logger';

init().catch((error) => logError('init', error));
