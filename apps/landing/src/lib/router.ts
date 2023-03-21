import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from './views/HomeView.vue';
import AboutView from './views/AboutView.vue';
import StoriesView from './views/StoriesView.vue';
import PortfolioView from './views/PortfolioView.vue';

const routes: readonly RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: HomeView,
    },
    {
        path: '/about',
        component: AboutView,
    },
    {
        path: '/stories',
        component: StoriesView,
    },
    {
        path: '/portfolio',
        component: PortfolioView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router as appRouter };
