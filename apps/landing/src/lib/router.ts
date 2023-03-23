import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AboutView from './views/AboutView.vue';
import ContactView from './views/ContactView.vue';
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
        path: '/contact',
        name: 'Contact',
        component: ContactView,
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
    history: createWebHistory(),
    routes,
});

export { router as appRouter };
