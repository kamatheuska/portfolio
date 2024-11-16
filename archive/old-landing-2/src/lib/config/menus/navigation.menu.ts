import { NavigationRoute } from './menu.types';

export const navigationConfig: NavigationRoute[] = [
    {
        href: '/home?new=false',
        label: 'Home',
    },
    {
        href: '/about',
        label: 'About',
    },
    {
        label: 'Stories',
        href: '/stories',
    },
    {
        label: 'Portfolio',
        href: '/portfolio',
    },
];
