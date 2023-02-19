import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from './views/home/HomeView.vue';

const routes: readonly RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: HomeView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router as appRouter };
