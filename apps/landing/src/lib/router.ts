import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';
import PortfolioView from './views/PortfolioView.vue';
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
        path: '/portfolio',
        name: 'Portfolio',
        component: PortfolioView,
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
