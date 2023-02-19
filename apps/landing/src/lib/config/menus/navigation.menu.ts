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
        name: 'Stories',
    },
    {
        label: 'Services',
        href: '/miniservices',
        name: 'Miniservices',
    },
    {
        label: 'Projects',
        href: '/projects',
        name: 'Projects',
        children: [
            {
                href: '/projects/react',
                label: 'React Projects',
                isExternal: true,
            },
            {
                href: '/projects/react/drum-machine',
                label: 'Drum Machine',
                isExternal: true,
            },
            {
                href: '/projects/react/markdown-previewer',
                label: 'Markdown Previewer',
                isExternal: true,
            },
            {
                href: '/projects/react/calculator',
                label: 'JS Calculator',
                isExternal: true,
            },
            {
                href: '/projects/react/drum-machine',
                label: 'Drum Machine',
                isExternal: true,
            },
            {
                href: '/miniservices/urlshortener',
                label: 'URL Shortener',
                name: 'UrlShortener',
            },
            {
                href: '/miniservices/timestamp',
                label: 'Timestamp Generator',
                name: 'Timestamp',
            },
            {
                href: '/miniservices/Whoami',
                label: 'Who Am I',
                name: 'Whoami',
            },
            {
                href: '/stories/concertos',
                label: 'Geometric Concertos',
                name: 'Concertos',
            },
        ],
    },
];
