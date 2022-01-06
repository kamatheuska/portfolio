import Cookies from 'js-cookie';
import { environments, breakpoints } from '@/constants';
import * as cookies from '@/constants/cookies';

// eslint-disable-next-line import/prefer-default-export
export function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

export const isProd = () => Cookies.get(cookies.STAGE) === environments.PROD;

export const isMobile = () => window.matchMedia(`(max-width: ${breakpoints.SM})`).matches;
export const isMobileXs = () => window.matchMedia(`(max-width: ${breakpoints.XS})`).matches;
export const randomProperty = (obj) => {
    const keys = Object.keys(obj);
    // eslint-disable-next-line no-bitwise
    return obj[keys[(keys.length * Math.random()) << 0]];
};
