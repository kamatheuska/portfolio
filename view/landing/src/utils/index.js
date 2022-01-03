import Cookies from 'js-cookie';
import { environments, breakpoints } from '@/constants';
import * as cookies from '@/constants/cookies';

// eslint-disable-next-line import/prefer-default-export
export function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export const isProd = () => Cookies.get(cookies.STAGE) === environments.PROD;

export const isMobile = () => window.matchMedia(`(max-width: ${breakpoints.MOBILE})`).matches;
