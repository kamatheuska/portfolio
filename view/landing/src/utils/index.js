import { PROD_HOSTNAME, environments } from '@/constants';
import { ENVIRONMENT } from '@/constants/envs';

// eslint-disable-next-line import/prefer-default-export
export function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export const isProd = ({ globalWindow = window, env = ENVIRONMENT } = {}) =>
    globalWindow.location.hostname === PROD_HOSTNAME ? true : env === environments.PROD;
