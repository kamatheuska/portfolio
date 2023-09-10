import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';
import ExperienceView from './views/ExperienceView.vue';
import StoriesView from './views/StoriesView.vue';

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
        path: '/stories',
        name: 'Stories',
        component: StoriesView,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router as appRouter };
