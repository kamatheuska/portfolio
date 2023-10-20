import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';
import ExperienceView from './views/ExperienceView.vue';
import ChallengesView from './views/ChallengesView.vue';
import ShortUrlView from './views/challenges/ShortUrlView.vue';
import TimestampView from './views/challenges/TimestampView.vue';
import FileMetadataView from './views/challenges/FileMetadataView.vue';

const routes: readonly RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/experience',
        name: 'Experience',
        component: ExperienceView,
    },
    {
        path: '/challenges',
        name: 'Challenges',
        component: ChallengesView,
    },
    {
        path: '/challenges/shorturl',
        name: 'ShortUrlChallenge',
        component: ShortUrlView,
    },
    {
        path: '/challenges/timestamp',
        name: 'TimestampChallenge',
        component: TimestampView,
    },
    {
        path: '/challenges/file-metadata',
        name: 'FileMetadataChallenge',
        component: FileMetadataView,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router as appRouter };
